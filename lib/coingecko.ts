import axios from 'axios';

const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';

export async function getTokenInfo(tokenId: string) {
  try {
    const response = await axios.get(`${COINGECKO_BASE_URL}/coins/${tokenId}`);
    return response.data;
  } catch (error) {
    console.error('Coingecko API error:', error);
    throw new Error('Failed to fetch token information');
  }
}

export async function getTokenPrice(tokenId: string) {
  try {
    const response = await axios.get(`${COINGECKO_BASE_URL}/simple/price`, {
      params: {
        ids: tokenId,
        vs_currencies: 'usd',
        include_24hr_change: true,
      },
    });
    return response.data[tokenId];
  } catch (error) {
    console.error('Coingecko price error:', error);
    throw new Error('Failed to fetch token price');
  }
}

export async function searchTokens(query: string) {
  try {
    const response = await axios.get(`${COINGECKO_BASE_URL}/search`, {
      params: {
        query,
      },
    });
    return response.data.coins?.slice(0, 10) || [];
  } catch (error) {
    console.error('Coingecko search error:', error);
    throw new Error('Failed to search tokens');
  }
}