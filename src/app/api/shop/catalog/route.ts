import { NextResponse } from 'next/server'
import { SHOP_PRODUCTS } from '@/lib/shop'

export const runtime = 'nodejs'

export async function GET() {
  return NextResponse.json({
    products: SHOP_PRODUCTS,
    currency: 'USD',
  })
}
