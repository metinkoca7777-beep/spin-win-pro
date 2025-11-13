import { NextResponse } from 'next/server';

export async function GET() {
  const data = {
    google: { rating: 4.5, reviews: 1783 },
    tripadvisor: { rating: 4.3, reviews: 1256 },
    instagram: { followers: 12400, posts: 430 }
  };
  return NextResponse.json(data);
}