import { NextRequest, NextResponse } from 'next/server'
import { base } from 'viem/chains'
import { withX402 } from '@x402/next'
import { buildCheckout, type CartItemInput } from '@/lib/shop'
import { getShopX402ResourceServer } from '@/lib/x402-server'

export const runtime = 'nodejs'

type CheckoutPayload = {
  items: CartItemInput[]
}

const ACCEPTED_CHAIN = base.id
const ACCEPTED_NETWORK = `eip155:${base.id}` as const
const MERCHANT_ADDRESS = (process.env.MERCHANT_ADDRESS ?? '0x1111111111111111111111111111111111111111') as `0x${string}`
const resourceServer = getShopX402ResourceServer()

async function getCheckoutFromContext(context: { adapter: { getBody?: () => unknown } }) {
  let rawBody: unknown = {}
  try {
    rawBody = context.adapter.getBody ? await Promise.resolve(context.adapter.getBody()) : {}
  } catch {
    rawBody = {}
  }
  const body = rawBody as CheckoutPayload
  return buildCheckout(body.items || [])
}

const handler = async (req: NextRequest) => {
  try {
    const body = (await req.json()) as CheckoutPayload
    const checkout = buildCheckout(body.items || [])

    return NextResponse.json({
      message: '支付成功，订单已确认',
      order: {
        orderId: `ord_${Date.now().toString(36)}`,
        network: ACCEPTED_NETWORK,
        totalUsd: checkout.totalUsd,
        amountUsdc: checkout.amountUsdc.toString(),
        items: checkout.lineItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          name: item.name,
        })),
      },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : '未知错误'
    return NextResponse.json({ message }, { status: 400 })
  }
}

export const POST = withX402(
  handler,
  {
    accepts: {
      scheme: 'exact',
      network: ACCEPTED_NETWORK,
      payTo: MERCHANT_ADDRESS,
      price: async (context) => {
        const checkout = await getCheckoutFromContext(context)
        return `$${checkout.totalUsd.toFixed(2)}`
      },
    },
    description: '购买 Coolha 品牌周边',
    mimeType: 'application/json',
    unpaidResponseBody: async (context) => {
      const checkout = await getCheckoutFromContext(context)
      return {
        contentType: 'application/json',
        body: {
          code: 'X402_PAYMENT_REQUIRED',
          message: 'Payment required before order fulfillment.',
          payment: {
            network: ACCEPTED_NETWORK,
            chainId: ACCEPTED_CHAIN,
            recipient: MERCHANT_ADDRESS,
            asset: 'usdc',
            amountUsdc: checkout.amountUsdc.toString(),
            totalUsd: checkout.totalUsd,
          },
          x402: {
            version: '2',
            proofHeader: 'PAYMENT-SIGNATURE',
            settleHeader: 'PAYMENT-RESPONSE',
          },
        },
      }
    },
  },
  resourceServer,
  undefined,
  undefined,
  false,
)
