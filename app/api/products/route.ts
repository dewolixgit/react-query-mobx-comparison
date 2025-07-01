import { NextRequest, NextResponse } from 'next/server';
import { fetchProducts } from '../../../src/api/fakeDb';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const gender = searchParams.get('gender') || undefined;
  const type = searchParams.get('type') || undefined;
  const search = searchParams.get('search') || undefined;
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');

  const result = await fetchProducts({
    page,
    limit,
    gender,
    type,
    search,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
  });

  return NextResponse.json(result);
}
