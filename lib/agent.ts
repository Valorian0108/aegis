import { researcherPersona, educatorPersona } from './personas';
import { executeBuy, executeSell, getPortfolio } from './portfolio';

export interface AgentMessage {
  role: 'user' | 'assistant';
  content: string;
  persona?: string;
  data?: any;
}

export interface AgentResponse {
  message: AgentMessage;
  portfolio?: any;
  actionRequired?: boolean;
}

export async function processUserMessage(userMessage: string): Promise<AgentResponse> {
  const lowerMessage = userMessage.toLowerCase();

  // Check for trading intent
  if (lowerMessage.includes('buy') || lowerMessage.includes('purchase')) {
    return handleTradingIntent(userMessage, 'buy');
  }

  if (lowerMessage.includes('sell')) {
    return handleTradingIntent(userMessage, 'sell');
  }

  // Check for portfolio query
  if (lowerMessage.includes('portfolio') || lowerMessage.includes('holdings') || lowerMessage.includes('balance')) {
    return handlePortfolioQuery();
  }

  // Default to research + education flow
  return handleResearchFlow(userMessage);
}

async function handleResearchFlow(query: string): Promise<AgentResponse> {
  // Step 1: Researcher gathers data
  const researchResult = await researcherPersona(query);
  
  if (researchResult.data) {
    // Step 2: Educator explains the data
    const educationResult = await educatorPersona(researchResult.data);
    
    return {
      message: {
        role: 'assistant',
        content: `${researchResult.content}\n\n${educationResult.content}`,
        persona: 'researcher + educator',
        data: researchResult.data,
      },
    };
  }

  return {
    message: {
      role: 'assistant',
      content: researchResult.content,
      persona: 'researcher',
    },
  };
}

async function handleTradingIntent(message: string, type: 'buy' | 'sell'): Promise<AgentResponse> {
  // Extract token and amount from message (simple parsing)
  const words = message.split(' ');
  const tokenIndex = words.findIndex(w => w.toLowerCase() === 'buy' || w.toLowerCase() === 'sell');
  
  if (tokenIndex === -1 || tokenIndex + 1 >= words.length) {
    return {
      message: {
        role: 'assistant',
        content: "I couldn't understand the trade. Please format it like 'buy 50 BTC' or 'sell 20 ETH'.",
      },
    };
  }

  const token = words[tokenIndex + 1].toUpperCase();
  const amount = parseFloat(words[tokenIndex + 2]) || 0;

  if (amount <= 0) {
    return {
      message: {
        role: 'assistant',
        content: "Please specify a valid amount to trade.",
      },
    };
  }

  // Get current portfolio
  const portfolio = getPortfolio();

  if (type === 'buy') {
    const estimatedPrice = 50000; // Placeholder - should get real price
    const total = amount * estimatedPrice;

    if (portfolio.balance < total) {
      return {
        message: {
          role: 'assistant',
          content: `You don't have enough balance. You have $${portfolio.balance.toFixed(2)} USDT, but this trade would cost $${total.toFixed(2)}.`,
        },
        portfolio,
      };
    }

    return {
      message: {
        role: 'assistant',
        content: `Ready to buy ${amount} ${token} at approximately $${estimatedPrice} (total: $${total.toFixed(2)}). Confirm to execute.`,
      },
      portfolio,
      actionRequired: {
        type: 'buy',
        token,
        amount,
        price: estimatedPrice,
      },
    };
  } else {
    // Sell logic
    const holding = portfolio.holdings[token];
    if (!holding || holding.amount < amount) {
      return {
        message: {
          role: 'assistant',
          content: `You don't have enough ${token}. You currently have ${holding?.amount || 0} ${token}.`,
        },
        portfolio,
      };
    }

    const estimatedPrice = holding.currentPrice || 50000;
    const total = amount * estimatedPrice;

    return {
      message: {
        role: 'assistant',
        content: `Ready to sell ${amount} ${token} at approximately $${estimatedPrice} (total: $${total.toFixed(2)}). Confirm to execute.`,
      },
      portfolio,
      actionRequired: {
        type: 'sell',
        token,
        amount,
        price: estimatedPrice,
      },
    };
  }
}

function handlePortfolioQuery(): AgentResponse {
  const portfolio = getPortfolio();
  
  let content = `Your Portfolio:\n`;
  content += `Balance: $${portfolio.balance.toFixed(2)} USDT\n\n`;
  content += `Holdings:\n`;
  
  if (Object.keys(portfolio.holdings).length === 0) {
    content += `No holdings yet. Start by researching a token and making a trade!`;
  } else {
    for (const [token, holding] of Object.entries(portfolio.holdings)) {
      content += `${token}: ${holding.amount.toFixed(4)} ($${holding.value.toFixed(2)})\n`;
      content += `  P/L: $${holding.profitLoss.toFixed(2)} (${holding.profitLossPercent.toFixed(2)}%)\n`;
    }
  }

  return {
    message: {
      role: 'assistant',
      content,
    },
    portfolio,
  };
}

export function executeTrade(type: 'buy' | 'sell', token: string, amount: number, price: number): boolean {
  if (type === 'buy') {
    return executeBuy(token, amount, price);
  } else {
    return executeSell(token, amount, price);
  }
}