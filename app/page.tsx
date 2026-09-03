'use client';

import { useState, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  persona?: string;
  data?: any;
  timestamp?: Date;
  processingTime?: number;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [portfolio, setPortfolio] = useState<any>(null);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const response = await fetch('/api/portfolio');
      const data = await response.json();
      setPortfolio(data);
    } catch (error) {
      console.error('Failed to fetch portfolio');
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const startTime = Date.now();
    const userMessage: Message = { 
      role: 'user', 
      content: input,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const processingTime = Date.now() - startTime;
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message.content,
        persona: data.message.persona,
        data: data.message.data,
        timestamp: new Date(),
        processingTime
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      if (data.portfolio) {
        setPortfolio(data);
      }
      
      fetchPortfolio();
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'system error. please retry.',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ background: 'var(--color-paper)', color: 'var(--color-ink)' }}>
      {/* N9 Edge-aligned minimal nav */}
      <nav className="flex items-center justify-between px-6 py-5" style={{ padding: '0 var(--page-gutter)' }}>
        <div 
          className="text-sm font-medium tracking-tight"
          style={{ 
            fontFamily: 'var(--font-body)',
            textTransform: 'lowercase'
          }}
        >
          aegis
        </div>
        <button 
          className="px-5 py-2 text-base font-medium transition-all"
          style={{ 
            background: 'transparent',
            border: '1px solid var(--color-rule)',
            color: 'var(--color-ink)',
            fontFamily: 'var(--font-body)',
            textTransform: 'lowercase',
            borderRadius: 'var(--radius-md)'
          }}
        >
          start research
        </button>
      </nav>

      {/* H2 Split diptych hero */}
      <section 
        className="min-h-screen flex items-center"
        style={{ 
          background: `
            linear-gradient(var(--rule-blueprint) 1px, transparent 1px) 0 0 / 48px 48px,
            linear-gradient(90deg, var(--rule-blueprint) 1px, transparent 1px) 0 0 / 48px 48px,
            radial-gradient(60% 50% at 78% 30%, var(--color-paper-emit) 0%, transparent 65%),
            var(--color-paper)
          `,
          padding: '0 var(--page-gutter)'
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          {/* Left: Text */}
          <div className="space-y-6">
            <div 
              className="text-xs font-mono tracking-wider"
              style={{ 
                color: 'var(--color-muted)',
                fontFamily: 'var(--font-mono)',
                letterSpacing: 'var(--tracking-micro)',
                textTransform: 'uppercase'
              }}
            >
              01 · research
            </div>
            <h1 
              className="leading-tight"
              style={{ 
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-display)',
                textTransform: 'lowercase',
                color: 'var(--color-ink)'
              }}
            >
              built to <em style={{ 
                color: 'var(--color-accent-2)',
                fontStyle: 'normal',
                position: 'relative',
                whiteSpace: 'nowrap'
              }}>think</em> before you trade.
            </h1>
            <p 
              className="text-lg max-w-md"
              style={{ 
                color: 'var(--color-muted)',
                fontFamily: 'var(--font-body)',
                textTransform: 'lowercase'
              }}
            >
              intelligent trading research for crypto newcomers. understand the risks before you buy.
            </p>
            <button 
              onClick={() => document.getElementById('research')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-block px-6 py-3 text-sm font-medium transition-all"
              style={{ 
                background: 'var(--color-accent)',
                color: 'var(--color-paper)',
                fontFamily: 'var(--font-body)',
                textTransform: 'lowercase',
                borderRadius: 'var(--radius-md)'
              }}
            >
              try it out
            </button>
          </div>

          {/* Right: Filament chamber apparatus */}
          <div className="flex justify-center">
            <figure className="apparatus apparatus--filament" aria-hidden="true" style={{ position: 'relative', width: 'clamp(180px, 22vw, 280px)', aspectRatio: '0.55' }}>
              <div style={{ position: 'relative', width: '100%', height: '100%', border: '1px solid var(--color-rule)', borderRadius: '999px', background: 'oklch(17% 0.016 265 / 0.8)', overflow: 'hidden' }}>
                <span style={{ position: 'absolute', left: 0, right: 0, top: '22%', height: '1px', background: 'var(--color-rule)' }}></span>
                <span style={{ position: 'absolute', left: 0, right: 0, top: '42%', height: '1px', background: 'var(--color-rule)' }}></span>
                <span style={{ position: 'absolute', left: 0, right: 0, top: '62%', height: '1px', background: 'var(--color-rule)' }}></span>
                <span style={{ position: 'absolute', left: 0, right: 0, top: '82%', height: '1px', background: 'var(--color-rule)' }}></span>
                <span style={{ position: 'absolute', top: '8%', bottom: '8%', left: '50%', width: '2px', marginLeft: '-1px', background: 'linear-gradient(to bottom, oklch(96% 0.05 50) 0%, oklch(80% 0.17 50) 50%, oklch(96% 0.05 50) 100%)', boxShadow: '0 0 16px 4px var(--color-glow), 0 0 48px 12px oklch(80% 0.16 50 / 0.22)', animation: 'filament-pulse var(--dur-pulse) ease-in-out infinite' }}></span>
                <span style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 50% 50%, var(--color-glow) 0%, transparent 70%)', pointerEvents: 'none' }}></span>
                <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontFamily: 'var(--font-mono)', fontSize: '10.5px', letterSpacing: 'var(--tracking-micro)', textTransform: 'uppercase', color: 'var(--color-muted)' }}>RX-04</span>
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* Meter strip */}
      <aside className="flex items-center" style={{ padding: '0.75rem var(--page-gutter)', borderBlock: '1px solid var(--color-rule)', fontFamily: 'var(--font-mono)' }}>
        <p style={{ fontSize: '11px', letterSpacing: 'var(--tracking-micro)', textTransform: 'uppercase', color: 'var(--color-muted)' }}>SIGNAL · ONLINE</p>
        <div style={{ flex: 1, display: 'flex', gap: '2px', alignItems: 'end', height: '28px', margin: '0 1.5rem' }}>
          {Array.from({ length: 64 }).map((_, i) => (
            <span 
              key={i}
              style={{ 
                flex: 1, 
                minWidth: '1px',
                background: 'var(--color-accent)',
                borderRadius: '0.5px',
                height: `${Math.sin((i / 64) * Math.PI) * 100}%`,
                opacity: 0.4 + Math.random() * 0.6
              }}
            />
          ))}
        </div>
        <p style={{ fontSize: '11px', letterSpacing: 'var(--tracking-micro)', textTransform: 'uppercase', color: 'var(--color-muted)' }}>LATENCY · 28 MS</p>
      </aside>

      {/* Research section - Split Studio */}
      <section id="research" style={{ padding: 'clamp(4rem, 8vw, 8rem) var(--page-gutter)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-6">
            <div 
              className="text-xs font-mono tracking-wider"
              style={{ 
                color: 'var(--color-muted)',
                fontFamily: 'var(--font-mono)',
                letterSpacing: 'var(--tracking-micro)',
                textTransform: 'uppercase'
              }}
            >
              02 · research
            </div>
            <h2 
              className="text-4xl leading-tight"
              style={{ 
                fontFamily: 'var(--font-body)',
                textTransform: 'lowercase',
                color: 'var(--color-ink)'
              }}
            >
              ask about any token
            </h2>
            <p style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-body)', textTransform: 'lowercase' }}>
              our research agent gathers real market data and explains what you need to know before making a decision.
            </p>
          </div>
          <div 
            className="p-6"
            style={{ 
              border: '1px solid var(--color-rule)',
              background: 'radial-gradient(ellipse at center, var(--color-paper-emit) 0%, transparent 100%)',
              borderRadius: 'var(--radius-md)'
            }}
          >
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {messages.length === 0 && (
                <div className="text-center py-12">
                  <p style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-body)', textTransform: 'lowercase' }}>
                    start by asking about a token
                  </p>
                  <p style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', textTransform: 'lowercase', color: 'var(--color-muted)', marginTop: '1rem' }}>
                    try: "tell me about btc" or "research eth"
                  </p>
                </div>
              )}
              {messages.map((msg, idx) => (
                <div 
                  key={idx}
                  className="p-4"
                  style={{ 
                    background: msg.role === 'user' ? 'var(--color-paper-2)' : 'transparent',
                    border: '1px solid var(--color-rule)',
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: '1rem'
                  }}
                >
                  {msg.persona && (
                    <div 
                      className="text-xs mb-2"
                      style={{ 
                        fontFamily: 'var(--font-mono)',
                        letterSpacing: 'var(--tracking-micro)',
                        textTransform: 'uppercase',
                        color: 'var(--color-muted)'
                      }}
                    >
                      {msg.persona}
                    </div>
                  )}
                  <div 
                    className="text-base"
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      textTransform: 'lowercase',
                      color: 'var(--color-ink)'
                    }}
                  >
                    {msg.content}
                  </div>
                  {msg.data && (
                    <div 
                      className="mt-3 p-3 text-xs font-mono"
                      style={{ 
                        background: 'var(--color-paper)',
                        color: 'var(--color-muted)',
                        textTransform: 'lowercase'
                      }}
                    >
                      <div>price: ${msg.data.currentPrice?.toFixed(2) || 'n/a'}</div>
                      <div>24h change: {msg.data.change24h?.toFixed(2) || 'n/a'}%</div>
                      <div>market cap: ${(msg.data.marketCap / 1e9).toFixed(2)}b</div>
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="text-center py-4">
                  <div style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)', textTransform: 'lowercase', fontSize: '12px' }}>
                    processing...
                  </div>
                </div>
              )}
            </div>
            <div className="flex gap-2 mt-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="ask about a token..."
                className="flex-1 px-4 py-3 text-base focus:outline-none"
                style={{ 
                  background: 'var(--color-paper-2)',
                  border: '1px solid var(--color-rule)',
                  color: 'var(--color-ink)',
                  fontFamily: 'var(--font-body)',
                  textTransform: 'lowercase',
                  borderRadius: 'var(--radius-sm)',
                  transition: 'all 220ms var(--ease-soft)'
                }}
                onFocus={(e) => {
                  e.target.style.background = 'radial-gradient(ellipse at center, var(--color-paper-emit) 0%, transparent 100%)';
                  e.target.style.borderColor = 'var(--color-accent)';
                }}
                onBlur={(e) => {
                  e.target.style.background = 'var(--color-paper-2)';
                  e.target.style.borderColor = 'var(--color-rule)';
                }}
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="px-6 py-3 text-base font-medium transition-all"
                style={{ 
                  background: 'var(--color-accent)',
                  color: 'var(--color-paper)',
                  fontFamily: 'var(--font-body)',
                  textTransform: 'lowercase',
                  borderRadius: 'var(--radius-sm)',
                  opacity: isLoading || !input.trim() ? 0.5 : 1
                }}
              >
                send
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio section - Split Studio (opposite direction) */}
      <section style={{ padding: 'clamp(4rem, 8vw, 8rem) var(--page-gutter)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div 
            className="p-6"
            style={{ 
              border: '1px solid var(--color-rule)',
              background: 'radial-gradient(ellipse at center, var(--color-paper-emit) 0%, transparent 100%)',
              borderRadius: 'var(--radius-md)'
            }}
          >
            <div 
              className="text-xs font-mono tracking-wider mb-4"
              style={{ 
                color: 'var(--color-muted)',
                fontFamily: 'var(--font-mono)',
                letterSpacing: 'var(--tracking-micro)',
                textTransform: 'uppercase'
              }}
            >
              portfolio
            </div>
            <div className="space-y-4">
              <div>
                <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', textTransform: 'lowercase', color: 'var(--color-muted)', marginBottom: '0.5rem' }}>
                  balance
                </div>
                <div 
                  className="text-3xl font-bold"
                  style={{ 
                    fontFamily: 'var(--font-display)',
                    color: 'var(--color-ink)',
                    textTransform: 'lowercase'
                  }}
                >
                  ${portfolio?.portfolio?.balance?.toFixed(2) || '10,000.00'}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', textTransform: 'lowercase', color: 'var(--color-muted)', marginBottom: '0.5rem' }}>
                  holdings
                </div>
                {portfolio?.portfolio && Object.keys(portfolio.portfolio.holdings).length > 0 ? (
                  <div className="space-y-2">
                    {Object.entries(portfolio.portfolio.holdings).map(([token, holding]: [string, any]) => (
                      <div 
                        key={token} 
                        className="flex justify-between items-center p-3"
                        style={{ 
                          background: 'var(--color-paper)',
                          border: '1px solid var(--color-rule)',
                          borderRadius: 'var(--radius-sm)'
                        }}
                      >
                        <div>
                          <div 
                            className="font-bold"
                            style={{ 
                              fontFamily: 'var(--font-display)',
                              textTransform: 'lowercase',
                              color: 'var(--color-ink)'
                            }}
                          >
                            {token}
                          </div>
                          <div 
                            className="text-xs font-mono"
                            style={{ 
                              textTransform: 'lowercase',
                              color: 'var(--color-muted)'
                            }}
                          >
                            {holding.amount.toFixed(4)}
                          </div>
                        </div>
                        <div className="text-right">
                          <div 
                            className="font-mono"
                            style={{ 
                              color: 'var(--color-ink)',
                              textTransform: 'lowercase'
                            }}
                          >
                            ${holding.value.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ fontSize: '12px', fontFamily: 'var(--font-body)', textTransform: 'lowercase', color: 'var(--color-muted)' }}>
                    no active positions
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div 
              className="text-xs font-mono tracking-wider"
              style={{ 
                color: 'var(--color-muted)',
                fontFamily: 'var(--font-mono)',
                letterSpacing: 'var(--tracking-micro)',
                textTransform: 'uppercase'
              }}
            >
              03 · portfolio
            </div>
            <h2 
              className="text-3xl leading-tight"
              style={{ 
                fontFamily: 'var(--font-display)',
                textTransform: 'lowercase',
                color: 'var(--color-ink)'
              }}
            >
              track your paper trades
            </h2>
            <p style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-body)', textTransform: 'lowercase' }}>
              your simulated portfolio updates in real-time with market prices. practice trading without risking real money.
            </p>
          </div>
        </div>
      </section>

      {/* Ft5 Statement footer */}
      <footer style={{ padding: 'clamp(4rem, 8vw, 6rem) var(--page-gutter)', borderTop: '1px solid var(--color-rule)' }}>
        <div className="max-w-3xl">
          <p 
            className="text-2xl leading-relaxed"
            style={{ 
              fontFamily: 'var(--font-display)',
              textTransform: 'lowercase',
              color: 'var(--color-ink)'
            }}
          >
            understand before you trade. your capital, your decisions.
          </p>
          <div 
            className="flex justify-between items-center mt-8"
            style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', textTransform: 'lowercase', color: 'var(--color-muted)' }}
          >
            <span>aegis · 2026</span>
            <span>binance agent os hackathon</span>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes filament-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.86; }
        }
        @media (prefers-reduced-motion: reduce) {
          .apparatus--filament span[style*="animation"] {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}