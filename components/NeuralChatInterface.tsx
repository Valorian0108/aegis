interface Message {
  role: 'user' | 'assistant';
  content: string;
  persona?: string;
  data?: any;
  timestamp?: Date;
  processingTime?: number;
}

interface NeuralChatInterfaceProps {
  messages: Message[];
  input: string;
  setInput: (value: string) => void;
  sendMessage: () => void;
  isLoading: boolean;
}

export default function NeuralChatInterface({ 
  messages, 
  input, 
  setInput, 
  sendMessage, 
  isLoading 
}: NeuralChatInterfaceProps) {
  return (
    <div 
      className="flex flex-col h-full"
      style={{ 
        background: 'var(--color-paper-2)',
        border: '1px solid var(--color-paper-3)',
        borderRadius: '0.5rem'
      }}
    >
      {/* Chat Header */}
      <div 
        className="px-6 py-4 border-b flex items-center justify-between"
        style={{ borderColor: 'var(--color-paper-3)' }}
      >
        <div className="flex items-center gap-3">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ background: '#0E76FF' }}
          />
          <span 
            className="text-sm font-medium tracking-wider"
            style={{ 
              color: 'var(--color-text)',
              fontFamily: 'var(--font-display)'
            }}
          >
            AI ASSISTANT
          </span>
        </div>
        <div className="text-xs font-mono" style={{ color: 'var(--color-text-3)' }}>
          {messages.length} INTERACTIONS
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-16">
            <p 
              className="text-2xl mb-3"
              style={{ 
                color: 'var(--color-text)',
                fontFamily: 'var(--font-display)',
                letterSpacing: '-0.01em'
              }}
            >
              Start Your Research
            </p>
            <p className="text-sm mb-6" style={{ color: 'var(--color-text-2)' }}>
              Ask about any cryptocurrency to begin
            </p>
            <div 
              className="inline-block px-6 py-3 text-sm font-medium"
              style={{ 
                background: 'var(--color-paper-3)',
                color: 'var(--color-text)',
                borderRadius: 'var(--radius-md)'
              }}
            >
              Try: "Tell me about Bitcoin" or "Research Ethereum"
            </div>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className="relative"
            style={{
              marginLeft: msg.role === 'user' ? '3rem' : '0',
              marginRight: msg.role === 'user' ? '0' : '3rem',
            }}
          >
            {/* Message Card */}
            <div 
              className="p-5 rounded-lg relative"
              style={{
                background: msg.role === 'user' 
                  ? '#0E76FF' 
                  : 'var(--color-paper-3)',
                color: msg.role === 'user' ? 'var(--color-paper)' : 'var(--color-text)',
                border: '1px solid',
                borderColor: msg.role === 'user' 
                  ? '#0E76FF' 
                  : 'var(--color-paper-4)',
              }}
            >
              {/* Persona indicator */}
              {msg.persona && (
                <div 
                  className="text-xs font-medium mb-3 tracking-wider"
                  style={{ 
                    color: msg.role === 'user' 
                      ? 'var(--color-paper)' 
                      : '#0E76FF',
                    fontFamily: 'var(--font-display)',
                    opacity: 0.9
                  }}
                >
                  {msg.persona}
                </div>
              )}

              {/* Message content */}
              <div 
                className="text-base leading-relaxed whitespace-pre-wrap"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {msg.content}
              </div>

              {/* Token data card */}
              {msg.data && (
                <div 
                  className="mt-4 p-4 rounded"
                  style={{ 
                    background: 'var(--color-paper)',
                    border: '1px solid var(--color-paper-4)'
                  }}
                >
                  <div 
                    className="text-xs font-mono mb-3 tracking-wider"
                    style={{ color: 'var(--color-text-3)' }}
                  >
                    MARKET DATA
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div style={{ color: 'var(--color-text-3)', fontSize: '0.75rem' }}>Price</div>
                      <div className="font-medium">${msg.data.currentPrice?.toFixed(2) || 'N/A'}</div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--color-text-3)', fontSize: '0.75rem' }}>24h Change</div>
                      <div className="font-medium">{msg.data.change24h?.toFixed(2) || 'N/A'}%</div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--color-text-3)', fontSize: '0.75rem' }}>Market Cap</div>
                      <div className="font-medium">${(msg.data.marketCap / 1e9).toFixed(2)}B</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="text-center py-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded" style={{ 
              background: 'var(--color-paper-3)',
              color: 'var(--color-text-2)'
            }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#0E76FF' }} />
              <span className="text-sm font-medium">Processing your request...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 border-t" style={{ borderColor: 'var(--color-paper-3)' }}>
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask about any cryptocurrency..."
            className="flex-1 px-5 py-4 text-base focus:outline-none"
            style={{ 
              background: 'var(--color-paper-3)',
              border: '1px solid var(--color-paper-4)',
              color: 'var(--color-text)',
              borderRadius: 'var(--radius-md)',
              fontFamily: 'var(--font-body)'
            }}
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="px-8 py-4 text-base font-medium transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ 
              background: '#0E76FF', 
              color: 'var(--color-paper)',
              fontFamily: 'var(--font-display)',
              borderRadius: 'var(--radius-md)'
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}