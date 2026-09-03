interface MetricsStripProps {
  portfolioValue: number;
  balance: number;
  profitLoss: number;
  activePositions: number;
}

export default function MetricsStrip({ portfolioValue, balance, profitLoss, activePositions }: MetricsStripProps) {
  return (
    <div 
      className="py-6 px-6"
      style={{ 
        background: 'var(--color-paper-2)',
        borderBottom: '1px solid var(--color-paper-3)'
      }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <div className="text-xs font-mono mb-2 tracking-wider" style={{ color: 'var(--color-text-3)' }}>
            PORTFOLIO VALUE
          </div>
          <div className="text-3xl font-bold" style={{ 
            fontFamily: 'var(--font-display)',
            color: 'var(--color-text)',
            letterSpacing: '-0.01em'
          }}>
            ${portfolioValue.toLocaleString()}
          </div>
        </div>
        
        <div>
          <div className="text-xs font-mono mb-2 tracking-wider" style={{ color: 'var(--color-text-3)' }}>
            AVAILABLE BALANCE
          </div>
          <div className="text-3xl font-bold" style={{ 
            fontFamily: 'var(--font-display)',
            color: 'var(--color-text)',
            letterSpacing: '-0.01em'
          }}>
            ${balance.toLocaleString()}
          </div>
        </div>
        
        <div>
          <div className="text-xs font-mono mb-2 tracking-wider" style={{ color: 'var(--color-text-3)' }}>
            24H P/L
          </div>
          <div 
            className="text-3xl font-bold"
            style={{ 
              fontFamily: 'var(--font-display)',
              color: profitLoss >= 0 ? 'var(--color-success)' : 'var(--color-error)',
              letterSpacing: '-0.01em'
            }}
          >
            {profitLoss >= 0 ? '+' : ''}${profitLoss.toLocaleString()}
          </div>
        </div>
        
        <div>
          <div className="text-xs font-mono mb-2 tracking-wider" style={{ color: 'var(--color-text-3)' }}>
            ACTIVE POSITIONS
          </div>
          <div className="text-3xl font-bold" style={{ 
            fontFamily: 'var(--font-display)',
            color: 'var(--color-text)',
            letterSpacing: '-0.01em'
          }}>
            {activePositions}
          </div>
        </div>
      </div>
    </div>
  );
}