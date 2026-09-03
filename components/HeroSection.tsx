export default function HeroSection() {
  return (
    <div className="wave-pattern py-20 px-6 relative">
      <div className="wave-lines"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-3xl">
          <h1 
            className="text-6xl md:text-7xl font-bold mb-4 leading-tight"
            style={{ 
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text)',
              letterSpacing: '-0.02em'
            }}
          >
            Intelligent Trading Research
          </h1>
          <p 
            className="text-xl md:text-2xl mb-8"
            style={{ 
              color: 'var(--color-text-2)',
              fontFamily: 'var(--font-body)',
              fontWeight: 300
            }}
          >
            Built to think before you trade
          </p>
          <div className="flex gap-4">
            <button 
              className="px-8 py-4 font-medium transition-all hover:scale-105"
              style={{ 
                background: 'var(--color-accent)',
                color: 'var(--color-paper)',
                fontFamily: 'var(--font-display)',
                borderRadius: 'var(--radius-md)'
              }}
            >
              Start Research
            </button>
            <button 
              className="px-8 py-4 font-medium transition-all hover:scale-105"
              style={{ 
                background: 'var(--color-secondary)',
                color: 'var(--color-paper)',
                fontFamily: 'var(--font-display)',
                borderRadius: 'var(--radius-md)'
              }}
            >
              View Portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}