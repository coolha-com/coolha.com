import type { FragmentOf } from "@lens-protocol/react";
import { MediaImageFragment } from "@lens-protocol/react";
import { AccountFragment, AccountMetadataFragment } from "./accounts";

// Augment SDK types with our custom fragments so TS knows the shape
declare module "@lens-protocol/react" {
  export interface Account extends FragmentOf<typeof AccountFragment> {}
  export interface AccountMetadata extends FragmentOf<typeof AccountMetadataFragment> {}
  export interface MediaImage extends FragmentOf<typeof MediaImageFragment> {}
}

// Register ONLY root fragments. Dependencies (e.g. AccountMetadata, MediaImage) are resolved automatically.
export const fragments = [AccountFragment];