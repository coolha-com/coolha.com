import { randomUUID } from "crypto";

type QuoteStatus = "pending" | "paid" | "expired";

export type QuoteRecord = {
  quoteId: string;
  chainId: number;
  recipient: `0x${string}`;
  amountUsdc: bigint;
  totalUsd: number;
  items: { productId: string; quantity: number; name: string }[];
  expiresAt: number;
  status: QuoteStatus;
  paidTxHash?: `0x${string}`;
  paidBy?: `0x${string}`;
};

type Store = {
  quotes: Map<string, QuoteRecord>;
  txHashes: Set<string>;
};

declare global {
  var __x402Store: Store | undefined;
}

function getStore(): Store {
  if (!globalThis.__x402Store) {
    globalThis.__x402Store = {
      quotes: new Map<string, QuoteRecord>(),
      txHashes: new Set<string>(),
    };
  }
  return globalThis.__x402Store;
}

export function createQuote(
  input: Omit<QuoteRecord, "quoteId" | "status" | "expiresAt">,
) {
  const quoteId = `q_${randomUUID()}`;
  const expiresAt = Date.now() + 10 * 60 * 1000;
  const quote: QuoteRecord = {
    ...input,
    quoteId,
    status: "pending",
    expiresAt,
  };

  const store = getStore();
  store.quotes.set(quoteId, quote);
  return quote;
}

export function getQuote(quoteId: string) {
  const store = getStore();
  const quote = store.quotes.get(quoteId);
  if (!quote) return undefined;

  if (quote.status === "pending" && quote.expiresAt < Date.now()) {
    quote.status = "expired";
  }

  return quote;
}

export function markQuotePaid(
  quoteId: string,
  txHash: `0x${string}`,
  payer: `0x${string}`,
) {
  const store = getStore();
  const quote = store.quotes.get(quoteId);
  if (!quote) return undefined;

  quote.status = "paid";
  quote.paidTxHash = txHash;
  quote.paidBy = payer;
  store.txHashes.add(txHash.toLowerCase());
  return quote;
}

export function isTxHashUsed(txHash: string) {
  return getStore().txHashes.has(txHash.toLowerCase());
}
