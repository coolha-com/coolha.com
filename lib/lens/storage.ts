// Grove (Lens Storage) integration skeleton
// NOTE: Replace endpoint paths and headers according to Grove docs.
// We avoid using a traditional backend: all calls are client-side with wallet-based ACL.

export type ProductMetadata = {
  title: string;
  description: string;
  imageUrl?: string;
  price: string; // decimal string, e.g. "0.05" (native token) or token amount
  currency?: string; // e.g. native or ERC20 address
  quantity: number;
  sellerAddress: `0x${string}`;
  createdAt: string;
};

export type OrderRecord = {
  id: string;
  productId: string;
  buyer: `0x${string}`;
  seller: `0x${string}`;
  status: "PENDING" | "PAID" | "FULFILLED" | "CANCELLED";
  amount: string;
  currency?: string;
  createdAt: string;
};

const GROVE_ENDPOINT = process.env.NEXT_PUBLIC_GROVE_ENDPOINT;
const GROVE_KEY = process.env.NEXT_PUBLIC_GROVE_KEY; // optional, if your app uses a storage key

function ensureGrove() {
  if (!GROVE_ENDPOINT) {
    throw new Error(
      "Missing NEXT_PUBLIC_GROVE_ENDPOINT. Please set your Grove endpoint."
    );
  }
}

// Upload product metadata JSON to Grove, returns a lens:// or grove:// URI
export async function uploadProductMetadata(
  meta: ProductMetadata,
  opts?: { aclOwner?: `0x${string}` }
) {
  ensureGrove();
  const payload = {
    data: meta,
    acl: {
      // Example ACL: owner can update/delete; adjust to your needs per Grove docs
      owner: opts?.aclOwner ?? meta.sellerAddress,
      permissions: ["update", "delete"],
    },
  };

  const res = await fetch(`${GROVE_ENDPOINT}/upload-json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(GROVE_KEY ? { Authorization: `Bearer ${GROVE_KEY}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Grove upload failed: ${res.status} ${text}`);
  }

  const json = (await res.json().catch(() => ({}))) as { uri?: string };
  if (!json.uri) throw new Error("Grove upload succeeded but no uri returned");
  return json.uri; // e.g. grove://... or lens://...
}

// Example: create an order record in Grove (off-chain), controlled by ACL (seller+buyer)
export async function createOrderRecord(order: OrderRecord) {
  ensureGrove();
  const res = await fetch(`${GROVE_ENDPOINT}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(GROVE_KEY ? { Authorization: `Bearer ${GROVE_KEY}` } : {}),
    },
    body: JSON.stringify(order),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Grove create order failed: ${res.status} ${text}`);
  }
  const json = await res.json().catch(() => ({}));
  return json;
}

export async function getOrdersBySeller(seller: `0x${string}`) {
  ensureGrove();
  const res = await fetch(`${GROVE_ENDPOINT}/orders?seller=${seller}`, {
    headers: {
      ...(GROVE_KEY ? { Authorization: `Bearer ${GROVE_KEY}` } : {}),
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Grove fetch orders failed: ${res.status} ${text}`);
  }
  const json = (await res.json().catch(() => [])) as OrderRecord[];
  return json;
}

// Product list item returned by Grove product listing endpoint
export type ProductListItem = {
  productId: string;
  metadataUri?: string;
  metadata: ProductMetadata;
};

// Fetch products listed by a seller from Grove
export async function getProductsBySeller(seller: `0x${string}`) {
  ensureGrove();
  const res = await fetch(`${GROVE_ENDPOINT}/products?seller=${seller}`, {
    headers: {
      ...(GROVE_KEY ? { Authorization: `Bearer ${GROVE_KEY}` } : {}),
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Grove fetch products failed: ${res.status} ${text}`);
  }
  const json = (await res.json().catch(() => [])) as ProductListItem[];
  return json;
}
