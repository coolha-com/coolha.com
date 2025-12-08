import { PublicClient, mainnet } from "@lens-protocol/react";
import { fragments } from "./fragments";

// Create a Lens PublicClient for the mainnet environment
export const client = PublicClient.create({
  environment: mainnet,
  fragments,
});