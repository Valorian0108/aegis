import { NextRequest, NextResponse } from 'next/server';
import { processUserMessage, executeTrade } from '@/lib/agent';

export async function POST(request: NextRequest) {
  try {
    const { message, confirmTrade } = await request.json();

    if (confirmTrade) {
      const { type, token, amount, price } = confirmTrade;
      const success = executeTrade(type, token, amount, price);
      
      return NextResponse.json({
        success,
        message: success 
          ? `Trade executed: ${type} ${amount} ${token}` 
          : 'Trade failed. Please check your balance/holdings.',
      });
    }

    const response = await processUserMessage(message);
    return NextResponse.json(response);
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}