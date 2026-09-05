import { chatWithGroq } from './groq';
import { getTokenInfo, getTokenPrice } from './coingecko';

interface PersonaResponse {
  persona: string;
  content: string;
  data?: any;
  extractedToken?: string | undefined;
}

// Check if API key is configured
const isConfigured = !!process.env.OPENROUTER_API_KEY;

// Researcher Persona: Extracts token from natural language using AI, then fetches real data
export async function researcherPersona(userMessage: string): Promise<PersonaResponse> {
  if (!isConfigured) {
    return {
      persona: 'researcher',
      content: 'AI service is not configured. Please add OPENROUTER_API_KEY to environment variables.',
      extractedToken: undefined,
    };
  }

  const systemPrompt = `You are a crypto research assistant. Extract the cryptocurrency token symbol from the user's message and provide a brief explanation.

Rules:
- Extract the token symbol (e.g., BTC, ETH, SOL, DOGE)
- If multiple tokens are mentioned, pick the main one
- If no clear token is found, return TOKEN: NONE
- Provide a brief 1-2 sentence explanation
- Return format: TOKEN: [symbol] [explanation]

Examples:
- "tell me about btc" → TOKEN: BTC Bitcoin is the first cryptocurrency...
- "what's eth doing" → TOKEN: ETH Ethereum is currently...
- "should I buy sol" → TOKEN: SOL Solana is a blockchain platform...

User message: "${userMessage}"`;

  try {
    const response = await chatWithGroq([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage },
    ]);

    // Parse the response to extract token
    const tokenMatch = response.match(/TOKEN:\s*(\w+)/i);
    const token = tokenMatch ? tokenMatch[1].toUpperCase() : null;

    if (!token || token === 'NONE') {
      return {
        persona: 'researcher',
        content: response ? response.replace(/TOKEN:\s*\w+\s*/i, '') : 'Could not identify a token from your message.',
        extractedToken: undefined,
      };
    }

    // Get real market data from CoinGecko
    let tokenInfo, priceData;
    try {
      tokenInfo = await getTokenInfo(token);
      priceData = await getTokenPrice(token);
    } catch (coinGeckoError) {
      console.error('CoinGecko error:', coinGeckoError);
      // Continue with partial data if CoinGecko fails
    }

    return {
      persona: 'researcher',
      content: response.replace(/TOKEN:\s*\w+\s*/i, ''),
      extractedToken: token,
      data: {
        symbol: token,
        name: tokenInfo?.name || token,
        currentPrice: priceData?.usd || 0,
        change24h: priceData?.usd_24h_change || 0,
        marketCap: tokenInfo?.market_data?.market_cap?.usd || 0,
        volume24h: tokenInfo?.market_data?.total_volume?.usd || 0,
        description: tokenInfo?.description?.en || 'No description available',
        categories: tokenInfo?.categories || [],
      },
    };
  } catch (error) {
    console.error('Groq API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      persona: 'researcher',
      content: `I had trouble processing your request. Error: ${errorMessage}`,
      extractedToken: undefined,
    };
  }
}

// Educator Persona: Explains concepts in simple terms
export async function educatorPersona(tokenData: any, userQuestion?: string): Promise<PersonaResponse> {
  const systemPrompt = `You are an educational crypto assistant. Your job is to explain cryptocurrency concepts in simple, clear terms for beginners. 

Rules:
- Use analogies and real-world comparisons
- Avoid jargon unless you explain it
- Focus on helping the user understand risks
- Be honest about uncertainties
- Keep explanations concise but thorough
- Never give financial advice

You are given token data and should explain what the token is, what it does, and what the user should know before considering it.`;

  const userPrompt = userQuestion 
    ? `User asked: "${userQuestion}". Here's the token data: ${JSON.stringify(tokenData, null, 2)}. Please answer their question.`
    : `Here's the token data: ${JSON.stringify(tokenData, null, 2)}. Please explain what this token is, what it does, and what a beginner should know about it.`;

  try {
    const response = await chatWithGroq([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ]);

    return {
      persona: 'educator',
      content: response,
    };
  } catch (error) {
    return {
      persona: 'educator',
      content: 'I had trouble generating an explanation. Let me try to summarize the key points from the data I found.',
    };
  }
}