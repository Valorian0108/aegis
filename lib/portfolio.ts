import { Portfolio, TokenHolding, Trade } from '@/types/portfolio';

// In-memory portfolio store (for demo purposes)
let portfolio: Portfolio = {
  balance: 10000, // Starting with 10,000 USDT for paper trading
  holdings: {},
};

let trades: Trade[] = [];

export function getPortfolio(): Portfolio {
  return portfolio;
}

export function getTrades(): Trade[] {
  return trades;
}

export function executeBuy(token: string, amount: number, price: number): boolean {
  const total = amount * price;
  
  if (portfolio.balance < total) {
    return false; // Insufficient balance
  }

  // Update balance
  portfolio.balance -= total;

  // Update holdings
  if (!portfolio.holdings[token]) {
    portfolio.holdings[token] = {
      amount: 0,
      averagePrice: 0,
      currentPrice: price,
      value: 0,
      profitLoss: 0,
      profitLossPercent: 0,
    };
  }

  const holding = portfolio.holdings[token];
  const totalAmount = holding.amount + amount;
  holding.averagePrice = ((holding.amount * holding.averagePrice) + (amount * price)) / totalAmount;
  holding.amount = totalAmount;
  holding.currentPrice = price;
  holding.value = holding.amount * holding.currentPrice;
  holding.profitLoss = (holding.currentPrice - holding.averagePrice) * holding.amount;
  holding.profitLossPercent = ((holding.currentPrice - holding.averagePrice) / holding.averagePrice) * 100;

  // Record trade
  trades.push({
    id: Date.now().toString(),
    type: 'buy',
    token,
    amount,
    price,
    total,
    timestamp: new Date(),
  });

  return true;
}

export function executeSell(token: string, amount: number, price: number): boolean {
  const holding = portfolio.holdings[token];
  
  if (!holding || holding.amount < amount) {
    return false; // Insufficient holdings
  }

  const total = amount * price;

  // Update balance
  portfolio.balance += total;

  // Update holdings
  holding.amount -= amount;
  holding.currentPrice = price;
  holding.value = holding.amount * holding.currentPrice;
  
  if (holding.amount === 0) {
    delete portfolio.holdings[token];
  } else {
    holding.profitLoss = (holding.currentPrice - holding.averagePrice) * holding.amount;
    holding.profitLossPercent = ((holding.currentPrice - holding.averagePrice) / holding.averagePrice) * 100;
  }

  // Record trade
  trades.push({
    id: Date.now().toString(),
    type: 'sell',
    token,
    amount,
    price,
    total,
    timestamp: new Date(),
  });

  return true;
}

export function updateTokenPrice(token: string, newPrice: number): void {
  const holding = portfolio.holdings[token];
  if (holding) {
    holding.currentPrice = newPrice;
    holding.value = holding.amount * holding.currentPrice;
    holding.profitLoss = (holding.currentPrice - holding.averagePrice) * holding.amount;
    holding.profitLossPercent = ((holding.currentPrice - holding.averagePrice) / holding.averagePrice) * 100;
  }
}