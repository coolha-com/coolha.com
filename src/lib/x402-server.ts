import { HTTPFacilitatorClient } from "@x402/core/server";
import { ExactEvmScheme } from "@x402/evm/exact/server";
import { x402ResourceServer } from "@x402/next";

const FACILITATOR_URL =
  process.env.X402_FACILITATOR_URL ?? "https://facilitator.x402.org";
const BASE_NETWORK = "eip155:8453";

declare global {
  var __shopX402ResourceServer: x402ResourceServer | undefined;
}

export function getShopX402ResourceServer() {
  if (!globalThis.__shopX402ResourceServer) {
    const facilitator = new HTTPFacilitatorClient({ url: FACILITATOR_URL });
    globalThis.__shopX402ResourceServer = new x402ResourceServer(
      facilitator,
    ).register(BASE_NETWORK, new ExactEvmScheme());
  }

  return globalThis.__shopX402ResourceServer;
}
