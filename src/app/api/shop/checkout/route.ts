import { NextRequest, NextResponse } from "next/server";
import { base } from "viem/chains";
import {
  createPublicClient,
  decodeEventLog,
  getAddress,
  http,
  isAddress,
  parseAbiItem,
} from "viem";
import { buildCheckout, type CartItemInput } from "@/lib/shop";
import { createQuote, getQuote, isTxHashUsed, markQuotePaid } from "@/lib/x402";

export const runtime = "nodejs";

type CheckoutPayload = {
  items: CartItemInput[];
};

type PaymentProof = {
  quoteId: string;
  txHash: `0x${string}`;
  payer: `0x${string}`;
  chainId?: number;
};

const ACCEPTED_CHAIN = base.id;
const ACCEPTED_NETWORK = `eip155:${base.id}`;
const MERCHANT_ADDRESS = (process.env.MERCHANT_ADDRESS ??
  "0x1111111111111111111111111111111111111111") as `0x${string}`;
const BASE_USDC_ADDRESS = getAddress(
  (process.env.BASE_USDC_ADDRESS ??
    "0x833589fCD6eDb6E08f4c7C32D4f71b54bDa02913") as `0x${string}`,
);
const USDC_DECIMALS = Number(process.env.USDC_DECIMALS ?? "6");
const BASE_RPC_URL = process.env.BASE_RPC_URL ?? base.rpcUrls.default.http[0];
const TRANSFER_EVENT = parseAbiItem(
  "event Transfer(address indexed from, address indexed to, uint256 value)",
);

function paymentRequired(
  quoteId: string,
  amountUsdc: bigint,
  totalUsd: number,
  expiresAt: number,
) {
  return NextResponse.json(
    {
      code: "X402_PAYMENT_REQUIRED",
      message: "Payment required before order fulfillment.",
      payment: {
        network: ACCEPTED_NETWORK,
        chainId: ACCEPTED_CHAIN,
        recipient: MERCHANT_ADDRESS,
        asset: "usdc",
        tokenAddress: BASE_USDC_ADDRESS,
        tokenDecimals: USDC_DECIMALS,
        amountUsdc: amountUsdc.toString(),
        totalUsd,
        quoteId,
        expiresAt,
      },
      x402: {
        version: "1",
        proofHeader: "x-payment",
        settleEndpoint: "/api/shop/checkout",
      },
    },
    {
      status: 402,
      headers: {
        "x-payment-required": "true",
      },
    },
  );
}

async function verifyPaymentOnchain(
  input: PaymentProof,
  expectedTo: `0x${string}`,
  expectedAmountUsdc: bigint,
) {
  const client = createPublicClient({
    chain: base,
    transport: http(BASE_RPC_URL),
  });

  const txHash = input.txHash;
  const receipt = await client.getTransactionReceipt({ hash: txHash });
  if (receipt.status !== "success") {
    throw new Error("交易未成功确认");
  }

  const tx = await client.getTransaction({ hash: txHash });
  if (!tx.to) {
    throw new Error("交易目标地址为空");
  }

  if (getAddress(tx.to) !== BASE_USDC_ADDRESS) {
    throw new Error("交易目标不是 USDC 合约");
  }

  if (tx.value > 0n) {
    throw new Error("USDC 支付交易不应携带原生代币");
  }

  if (getAddress(tx.from) !== getAddress(input.payer)) {
    throw new Error("付款地址与签名地址不一致");
  }

  const normalizedExpectedTo = getAddress(expectedTo);
  const normalizedPayer = getAddress(input.payer);
  let paidAmount = 0n;

  for (const log of receipt.logs) {
    if (getAddress(log.address) !== BASE_USDC_ADDRESS) {
      continue;
    }

    try {
      const decoded = decodeEventLog({
        abi: [TRANSFER_EVENT],
        data: log.data,
        topics: log.topics,
      });

      if (decoded.eventName !== "Transfer") {
        continue;
      }

      const from = getAddress(decoded.args.from);
      const to = getAddress(decoded.args.to);
      if (from === normalizedPayer && to === normalizedExpectedTo) {
        paidAmount += decoded.args.value;
      }
    } catch {
      // ignore non-Transfer logs
    }
  }

  if (paidAmount < expectedAmountUsdc) {
    throw new Error("USDC 支付金额不足或收款地址不匹配");
  }

  return receipt;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CheckoutPayload;
    const checkout = buildCheckout(body.items || []);
    const xPaymentHeader = req.headers.get("x-payment");

    if (!xPaymentHeader) {
      const quote = createQuote({
        chainId: ACCEPTED_CHAIN,
        recipient: MERCHANT_ADDRESS,
        amountUsdc: checkout.amountUsdc,
        totalUsd: checkout.totalUsd,
        items: checkout.lineItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          name: item.name,
        })),
      });

      return paymentRequired(
        quote.quoteId,
        quote.amountUsdc,
        quote.totalUsd,
        quote.expiresAt,
      );
    }

    let proof: PaymentProof;
    try {
      proof = JSON.parse(xPaymentHeader) as PaymentProof;
    } catch {
      return NextResponse.json(
        { message: "x-payment 头格式错误" },
        { status: 400 },
      );
    }

    if (!proof.quoteId || !proof.txHash || !proof.payer) {
      return NextResponse.json(
        { message: "x-payment 缺少必要字段" },
        { status: 400 },
      );
    }

    if (!isAddress(proof.payer)) {
      return NextResponse.json({ message: "payer 地址无效" }, { status: 400 });
    }

    if (proof.chainId && proof.chainId !== ACCEPTED_CHAIN) {
      return NextResponse.json(
        { message: `只支持链 ${ACCEPTED_CHAIN}` },
        { status: 400 },
      );
    }

    if (isTxHashUsed(proof.txHash)) {
      return NextResponse.json(
        { message: "该交易已用于其他订单" },
        { status: 409 },
      );
    }

    const quote = getQuote(proof.quoteId);
    if (!quote) {
      return NextResponse.json({ message: "报价单不存在" }, { status: 404 });
    }

    if (quote.status === "expired") {
      return NextResponse.json(
        { message: "报价单已过期，请重新发起支付" },
        { status: 410 },
      );
    }

    if (quote.status === "paid") {
      return NextResponse.json(
        {
          message: "订单已支付",
          order: {
            quoteId: quote.quoteId,
            txHash: quote.paidTxHash,
            paidBy: quote.paidBy,
          },
        },
        { status: 200 },
      );
    }

    await verifyPaymentOnchain(proof, quote.recipient, quote.amountUsdc);
    const paidQuote = markQuotePaid(
      proof.quoteId,
      proof.txHash,
      getAddress(proof.payer),
    );
    if (!paidQuote) {
      return NextResponse.json(
        { message: "订单状态更新失败" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      message: "支付成功，订单已确认",
      order: {
        orderId: `ord_${paidQuote.quoteId.slice(-12)}`,
        quoteId: paidQuote.quoteId,
        network: ACCEPTED_NETWORK,
        txHash: paidQuote.paidTxHash,
        paidBy: paidQuote.paidBy,
        totalUsd: paidQuote.totalUsd,
        amountUsdc: paidQuote.amountUsdc.toString(),
        items: paidQuote.items,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "未知错误";
    return NextResponse.json({ message }, { status: 400 });
  }
}
