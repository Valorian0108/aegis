export interface Portfolio {
  balance: number; // USDT balance
  holdings: Record<string, TokenHolding>;
}

export interface TokenHolding {
  amount: number;
  averagePrice: number;
  currentPrice: number;
  value: number;
  profitLoss: number;
  profitLossPercent: number;
}

export interface Trade {
  id: string;
  type: 'buy' | 'sell';
  token: string;
  amount: number;
  price: number;
  total: number;
  timestamp: Date;
}