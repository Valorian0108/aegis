# Aegis

An educational trading research agent with paper trading for cryptocurrency newcomers.

## What It Does

Aegis helps users research cryptocurrencies before making trading decisions. The system:

- **Researches tokens**: Uses AI to gather and explain information about cryptocurrencies
- **Provides market data**: Fetches real-time price and market data from CoinGecko
- **Explains risks**: Breaks down what users should understand before buying
- **Paper trading**: Allows simulated trading without real money
- **Portfolio tracking**: Maintains a simulated portfolio that updates with market prices

## How It Works

1. **User asks about a token** (e.g., "Tell me about Bitcoin")
2. **Researcher persona** gathers factual market data from CoinGecko
3. **Educator persona** explains the token, its ecosystem, and associated risks
4. **User can paper trade** after receiving the explanation
5. **Simulated portfolio** tracks holdings and updates values based on current market prices

## Technology Stack

- **Framework**: Next.js 16.3.4 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **AI**: Groq SDK (free-tier LLM for research and explanations)
- **Market Data**: CoinGecko API (free tier)
- **Design**: Hallmark design system (Split Studio macrostructure, Lumen theme)

## Architecture

- **Chat API Route**: `/api/chat` - Processes user messages and coordinates between personas
- **Portfolio API Route**: `/api/portfolio` - Manages simulated portfolio state
- **Agent Layer**: Orchestrates researcher and educator personas
- **Portfolio Engine**: In-memory simulated trading with real market price updates
- **CoinGecko Client**: Fetches market data
- **Groq Client**: Generates AI responses

## Personas

The system uses two AI personas:

1. **Researcher**: Gathers factual market data (price, market cap, trading volume, etc.)
2. **Educator**: Explains the token's purpose, ecosystem, and risks in accessible language

## Paper Trading

- **Simulated only**: No real money or real trading execution
- **Starting balance**: $10,000 USDT
- **Real prices**: Portfolio values update based on current CoinGecko prices
- **Buy/sell execution**: Validates holdings before allowing sells

## Design

The interface follows Hallmark's anti-slop design principles:

- **Macrostructure**: Split Studio (diptych layout with alternating text/proof sections)
- **Theme**: Lumen (Night Foundry) - classical-serif lowercase headlines, dark cool-violet canvas
- **Genre**: Atmospheric (dark AI tool aesthetic)
- **Typography**: Three-family system (Instrument Serif + Geist + JetBrains Mono)
- **Apparatus**: Filament chamber (CSS art representing the inference engine)

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Add your Groq API key to `.env.local`:
   ```
   GROQ_API_KEY=your_groq_api_key_here
   ```
4. Run development server: `npm run dev`
5. Open http://localhost:3000

## Environment Variables

- `GROQ_API_KEY`: Required for AI responses (get from [Groq Console](https://console.groq.com))

## Hackathon Submission

Built for the Binance Agent OS Mini Hackathon (Track A: Build an AI Agent).

## Limitations

- Paper trading only (no real trading execution)
- In-memory portfolio state (not persistent across sessions)
- Free-tier APIs (Groq and CoinGecko)
- No user authentication
- No real-time WebSocket data

## License

MIT