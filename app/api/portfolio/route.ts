import { NextResponse } from 'next/server';
import { getPortfolio, getTrades } from '@/lib/portfolio';

export async function GET() {
  try {
    const portfolio = getPortfolio();
    const trades = getTrades();
    
    return NextResponse.json({
      portfolio,
      trades,
    });
  } catch (error) {
    console.error('Portfolio API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio' },
      { status: 500 }
    );
  }
}