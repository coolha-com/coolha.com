// Minimal Marketplace contract interface (placeholder)
// Replace ABI and address with your deployed contract details.

export const MARKETPLACE_ADDRESS = (process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS || '') as `0x${string}` | ''

export const MARKETPLACE_ABI = [
  {
    type: 'function',
    name: 'listProduct',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'metadataUri', type: 'string' },
      { name: 'price', type: 'uint256' },
      { name: 'quantity', type: 'uint256' },
    ],
    outputs: [{ name: 'productId', type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'purchase',
    stateMutability: 'payable',
    inputs: [
      { name: 'productId', type: 'uint256' },
      { name: 'quantity', type: 'uint256' },
    ],
    outputs: [],
  },
] as const