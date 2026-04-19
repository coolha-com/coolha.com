import { parseUnits } from "viem";

export type ShopProduct = {
  id: string;
  name: string;
  description: string;
  image: string;
  priceUsd: number;
  tags: string[];
};

export type CartItemInput = {
  productId: string;
  quantity: number;
};

const CART_ITEM_SEPARATOR = ",";
const CART_VALUE_SEPARATOR = ":";

export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    id: "tee-genesis",
    name: "Coolha Genesis T-Shirt",
    description: "320g 重磅棉，前后双面印花，链上身份限量款。",
    image: "/logo/Coolha-1.png",
    priceUsd: 39,
    tags: ["Apparel", "Limited"],
  },
  {
    id: "cap-base",
    name: "Coolha Base Cap",
    description: "弧形帽檐 + 刺绣 LOGO，适合日常与活动现场。",
    image: "/logo/Coolha-logo.png",
    priceUsd: 25,
    tags: ["Accessory"],
  },
  {
    id: "hoodie-rwa",
    name: "Coolha RWA Hoodie",
    description: "抓绒连帽卫衣，RWA 系列联名纹样。",
    image: "/logo/Coolha黑.png",
    priceUsd: 68,
    tags: ["Apparel", "RWA"],
  },
];

const USDC_DECIMALS = Number(process.env.USDC_DECIMALS ?? "6");

export function buildCheckout(items: CartItemInput[]) {
  const normalizedItems = items
    .map((item) => ({
      productId: item.productId,
      quantity: Math.max(0, Math.floor(item.quantity || 0)),
    }))
    .filter((item) => item.quantity > 0);

  if (normalizedItems.length === 0) {
    throw new Error("购物车为空");
  }

  const lineItems = normalizedItems.map((item) => {
    const product = SHOP_PRODUCTS.find((p) => p.id === item.productId);
    if (!product) {
      throw new Error(`商品不存在: ${item.productId}`);
    }

    return {
      productId: item.productId,
      quantity: item.quantity,
      unitPriceUsd: product.priceUsd,
      subtotalUsd: product.priceUsd * item.quantity,
      name: product.name,
    };
  });

  const totalUsd = lineItems.reduce((sum, item) => sum + item.subtotalUsd, 0);
  const amountUsdc = parseUnits(totalUsd.toFixed(2), USDC_DECIMALS);

  return {
    lineItems,
    totalUsd,
    amountUsdc,
  };
}

export function serializeCartItems(items: CartItemInput[]) {
  return items
    .map(
      (item) =>
        `${encodeURIComponent(item.productId)}${CART_VALUE_SEPARATOR}${Math.max(0, Math.floor(item.quantity || 0))}`,
    )
    .join(CART_ITEM_SEPARATOR);
}

export function parseCartItems(
  serialized: string | null | undefined,
): CartItemInput[] {
  if (!serialized) {
    return [];
  }

  return serialized
    .split(CART_ITEM_SEPARATOR)
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [rawProductId, rawQuantity] = entry.split(CART_VALUE_SEPARATOR);
      return {
        productId: decodeURIComponent(rawProductId || ""),
        quantity: Number(rawQuantity || "0"),
      };
    });
}
