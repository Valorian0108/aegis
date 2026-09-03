interface PortfolioSidebarProps {
  portfolio: any;
}

export default function PortfolioSidebar({ portfolio }: PortfolioSidebarProps) {
  return (
    <div 
      className="space-y-8"
      style={{ color: 'var(--color-text)' }}
    >
      {/* Portfolio Overview */}
      <div 
        className="p-6 rounded-lg"
        style={{ 
          background: 'var(--color-paper-2)',
          border: '1px solid var(--color-paper-3)'
        }}
      >
        <div 
          className="text-xs font-mono mb-4 tracking-wider"
          style={{ color: 'var(--color-text-3)' }}
        >
          PORTFOLIO OVERVIEW
        </div>
        <div className="space-y-4">
          <div>
            <div className="text-xs mb-2" style={{ color: 'var(--color-text-3)' }}>
              Total Balance
            </div>
            <div 
              className="text-3xl font-bold"
              style={{ 
                fontFamily: 'var(--font-display)',
                color: 'var(--color-text)',
                letterSpacing: '-0.01em'
              }}
            >
              ${portfolio?.portfolio?.balance?.toFixed(2) || '10,000.00'}
            </div>
          </div>
          
          <div>
            <div className="text-xs mb-2" style={{ color: 'var(--color-text-3)' }}>
              Holdings Value
            </div>
            <div 
              className="text-2xl font-bold"
              style={{ 
                fontFamily: 'var(--font-display)',
                color: 'var(--color-text-2)',
                letterSpacing: '-0.01em'
              }}
            >
              ${Object.values(portfolio?.portfolio?.holdings || {})
                .reduce((sum: number, h: any) => sum + h.value, 0)
                .toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Holdings Breakdown */}
      <div 
        className="p-6 rounded-lg"
        style={{ 
          background: 'var(--color-paper-2)',
          border: '1px solid var(--color-paper-3)'
        }}
      >
        <div 
          className="text-xs font-mono mb-4 tracking-wider"
          style={{ color: 'var(--color-text-3)' }}
        >
          HOLDINGS BREAKDOWN
        </div>
        {portfolio?.portfolio && Object.keys(portfolio.portfolio.holdings).length > 0 ? (
          <div className="space-y-3">
            {Object.entries(portfolio.portfolio.holdings).map(([token, holding]: [string, any]) => (
              <div 
                key={token} 
                className="flex justify-between items-center p-4 rounded"
                style={{ 
                  background: 'var(--color-paper)',
                  border: '1px solid var(--color-paper-4)'
                }}
              >
                <div>
                  <div 
                    className="font-bold text-base mb-1"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {token}
                  </div>
                  <div 
                    className="text-xs font-mono"
                    style={{ color: 'var(--color-text-3)' }}
                  >
                    {holding.amount.toFixed(4)}
                  </div>
                </div>
                <div className="text-right">
                  <div 
                    className="font-mono text-base"
                    style={{ color: 'var(--color-text)' }}
                  >
                    ${holding.value.toFixed(2)}
                  </div>
                  <div 
                    className="text-xs font-mono"
                    style={{ 
                      color: holding.profitLoss >= 0 ? 'var(--color-success)' : 'var(--color-error)'
                    }}
                  >
                    {holding.profitLoss >= 0 ? '+' : ''}{holding.profitLossPercent.toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div 
            className="text-sm py-4 text-center"
            style={{ color: 'var(--color-text-3)' }}
          >
            No active positions
          </div>
        )}
      </div>

      {/* System Status */}
      <div 
        className="p-6 rounded-lg"
        style={{ 
          background: 'var(--color-paper-2)',
          border: '1px solid var(--color-paper-3)'
        }}
      >
        <div 
          className="text-xs font-mono mb-4 tracking-wider"
          style={{ color: 'var(--color-text-3)' }}
        >
          SYSTEM STATUS
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm">API Status</span>
            <div className="flex items-center gap-2">
              <div 
                className="w-2 h-2 rounded-full"
                style={{ background: 'var(--color-success)' }}
              />
              <span 
                className="text-xs font-mono"
                style={{ color: 'var(--color-success)' }}
              >
                ONLINE
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Agent Health</span>
            <div className="flex items-center gap-2">
              <div 
                className="w-2 h-2 rounded-full"
                style={{ background: 'var(--color-success)' }}
              />
              <span 
                className="text-xs font-mono"
                style={{ color: 'var(--color-success)' }}
              >
                OPERATIONAL
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Latency</span>
            <span 
              className="text-xs font-mono"
              style={{ color: '#0E76FF' }}
            >
              28ms
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div 
        className="p-6 rounded-lg"
        style={{ 
          background: 'var(--color-paper-2)',
          border: '1px solid var(--color-paper-3)'
        }}
      >
        <div 
          className="text-xs font-mono mb-4 tracking-wider"
          style={{ color: 'var(--color-text-3)' }}
        >
          QUICK ACTIONS
        </div>
        <div className="space-y-2">
          <button 
            className="w-full text-left px-4 py-3 rounded text-sm font-medium transition-all hover:scale-105"
            style={{ 
              background: 'var(--color-paper)',
              color: 'var(--color-text)',
              border: '1px solid var(--color-paper-4)'
            }}
          >
            Add to Watchlist
          </button>
          <button 
            className="w-full text-left px-4 py-3 rounded text-sm font-medium transition-all hover:scale-105"
            style={{ 
              background: 'var(--color-paper)',
              color: 'var(--color-text)',
              border: '1px solid var(--color-paper-4)'
            }}
          >
            View All Holdings
          </button>
          <button 
            className="w-full text-left px-4 py-3 rounded text-sm font-medium transition-all hover:scale-105"
            style={{ 
              background: 'var(--color-paper)',
              color: 'var(--color-text)',
              border: '1px solid var(--color-paper-4)'
            }}
          >
            Export Data
          </button>
        </div>
      </div>

      {/* Recent Trades */}
      <div 
        className="p-6 rounded-lg"
        style={{ 
          background: 'var(--color-paper-2)',
          border: '1px solid var(--color-paper-3)'
        }}
      >
        <div 
          className="text-xs font-mono mb-4 tracking-wider"
          style={{ color: 'var(--color-text-3)' }}
        >
          RECENT TRADES
        </div>
        {portfolio?.trades && portfolio.trades.length > 0 ? (
          <div className="space-y-3">
            {portfolio.trades.slice(-5).reverse().map((trade: any) => (
              <div 
                key={trade.id} 
                className="p-4 rounded"
                style={{ 
                  background: 'var(--color-paper)',
                  border: '1px solid var(--color-paper-4)'
                }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span 
                    className="text-xs font-mono font-bold"
                    style={{ 
                      color: trade.type === 'buy' ? 'var(--color-success)' : 'var(--color-error)'
                    }}
                  >
                    {trade.type.toUpperCase()}
                  </span>
                  <span 
                    className="text-xs font-mono"
                    style={{ color: 'var(--color-text-3)' }}
                  >
                    {new Date(trade.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <div 
                  className="text-xs font-mono"
                  style={{ color: 'var(--color-text-2)' }}
                >
                  {trade.amount} {trade.token} @ ${trade.price}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div 
            className="text-sm py-4 text-center"
            style={{ color: 'var(--color-text-3)' }}
          >
            No trades yet
          </div>
        )}
      </div>
    </div>
  );
}