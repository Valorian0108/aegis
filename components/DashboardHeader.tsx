export default function DashboardHeader() {
  return (
    <header 
      className="px-6 py-4"
      style={{ 
        background: 'var(--color-paper)',
        borderBottom: '1px solid var(--color-paper-3)'
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div 
            className="text-2xl font-bold tracking-tight"
            style={{ 
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text)',
              letterSpacing: '-0.02em'
            }}
          >
            AEGIS
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a 
            href="#" 
            className="text-sm font-medium transition-colors hover:text-[#0E76FF]"
            style={{ 
              color: 'var(--color-text-2)',
              fontFamily: 'var(--font-body)'
            }}
          >
            PORTFOLIO
          </a>
          <a 
            href="#" 
            className="text-sm font-medium transition-colors hover:text-[#0E76FF]"
            style={{ 
              color: 'var(--color-text-2)',
              fontFamily: 'var(--font-body)'
            }}
          >
            RESEARCH
          </a>
          <a 
            href="#" 
            className="text-sm font-medium transition-colors hover:text-[#0E76FF]"
            style={{ 
              color: 'var(--color-text-2)',
              fontFamily: 'var(--font-body)'
            }}
          >
            TRADING
          </a>
          <a 
            href="#" 
            className="text-sm font-medium transition-colors hover:text-[#0E76FF]"
            style={{ 
              color: 'var(--color-text-2)',
              fontFamily: 'var(--font-body)'
            }}
          >
            ANALYTICS
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div 
              className="w-2 h-2 rounded-full"
              style={{ background: 'var(--color-success)' }}
            />
            <span className="text-xs font-mono" style={{ color: 'var(--color-text-3)' }}>
              ONLINE
            </span>
          </div>
          <button 
            className="px-4 py-2 text-sm font-medium transition-all"
            style={{ 
              background: 'var(--color-accent)',
              color: 'var(--color-paper)',
              fontFamily: 'var(--font-display)',
              borderRadius: 'var(--radius-md)'
            }}
          >
            CONNECT
          </button>
        </div>
      </div>
    </header>
  );
}