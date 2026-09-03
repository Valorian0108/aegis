import { chatWithGroq } from './groq';
import { getTokenInfo, getTokenPrice, searchTokens } from './coingecko';

interface PersonaResponse {
  persona: string;
  content: string;
  data?: any;
}

// Researcher Persona: Gathers data about tokens
export async function researcherPersona(tokenQuery: string): Promise<PersonaResponse> {
  try {
    // Search for the token
    const searchResults = await searchTokens(tokenQuery);
    
    if (searchResults.length === 0) {
      return {
        persona: 'researcher',
        content: `I couldn't find any tokens matching "${tokenQuery}". Could you check the spelling or try a different token name?`,
      };
    }

    const token = searchResults[0];
    const tokenId = token.id;
    const tokenSymbol = token.symbol.toUpperCase();
    
    // Get detailed token info
    const tokenInfo = await getTokenInfo(tokenId);
    const priceData = await getTokenPrice(tokenId);

    return {
      persona: 'researcher',
      content: `I found ${token.name} (${tokenSymbol}). Here's what I gathered:`,
      data: {
        name: token.name,
        symbol: tokenSymbol,
        currentPrice: priceData?.usd || 0,
        change24h: priceData?.usd_24h_change || 0,
        marketCap: tokenInfo?.market_data?.market_cap?.usd || 0,
        volume24h: tokenInfo?.market_data?.total_volume?.usd || 0,
        description: tokenInfo?.description?.en || 'No description available',
        categories: tokenInfo?.categories || [],
        contractAddress: tokenInfo?.platforms?.ethereum || 'N/A',
      },
    };
  } catch (error) {
    return {
      persona: 'researcher',
      content: `I encountered an error while researching "${tokenQuery}". Please try again.`,
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