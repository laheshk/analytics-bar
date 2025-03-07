import React, { useState } from 'react';
import { Activity, X } from 'lucide-react';

const data = [
  { path: '/projects', visits: 2543 },
  { path: '/groups', visits: 1489 },
  { path: '/orders', visits: 857 },
  { path: '/templates', visits: 658 }
];

// Generate sample data for the last 3 days with 8 points per day
const sparkData = Array.from({ length: 24 }, (_, i) => ({
  value: Math.floor(Math.random() * 2000 + 1000 + Math.sin(i / 4) * 500),
  time: new Date(Date.now() - (23 - i) * 3600 * 1000)
}));

function App() {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxVisits = Math.max(...data.map(item => item.visits));
  const sparkMax = Math.max(...sparkData.map(d => d.value));
  const sparkMin = Math.min(...sparkData.map(d => d.value));

  const normalizeY = (value: number) => {
    return ((value - sparkMin) / (sparkMax - sparkMin)) * 32;
  };

  const points = sparkData.map((d, i) => {
    const x = (i / (sparkData.length - 1)) * 120;
    const y = 32 - normalizeY(d.value);
    return `${x},${y}`;
  }).join(' ');

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <div className="h-screen bg-black flex items-end justify-center p-4 overflow-hidden">
      {/* Analytics Container */}
      <div
        style={{
          transform: `scale(${isExpanded ? 1 : 0.985})`,
          width: isExpanded ? '360px' : '260px',
          transition: 'transform 300ms cubic-bezier(.2, .8, .2, 1), width 300ms cubic-bezier(.2, .8, .2, 1)'
        }}
        className="bg-[#1A1A1A] rounded-[16px] will-change-transform will-change-[width] shadow-lg shadow-[#1A1A1A]/20 border border-[#2A2A2A] overflow-hidden transform-gpu origin-bottom"
      >
        {/* Header Section */}
        <div className="px-4 py-2.5 flex items-center justify-between whitespace-nowrap">
          {/* Left side with signal and count */}
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex items-center gap-0.5">
              {!isExpanded && (
                <>
                  <div className="w-0.5 h-3 bg-[#1A1A1A] rounded-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-cyan-400 animate-[signal-appear_1.2s_ease-out_infinite]"></div>
                  </div>
                  <div className="w-0.5 h-2 bg-[#1A1A1A] rounded-full mx-0.5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-cyan-400/50 animate-[signal-appear_1.2s_ease-out_infinite_200ms]"></div>
                  </div>
                  <div className="w-0.5 h-1 bg-[#1A1A1A] rounded-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-cyan-400/25 animate-[signal-appear_1.2s_ease-out_infinite_400ms]"></div>
                  </div>
                </>
              )}
              {isExpanded && (
                <>
                  <div className="w-0.5 h-3 bg-cyan-400 rounded-full"></div>
                  <div className="w-0.5 h-2 bg-cyan-400/50 rounded-full mx-0.5"></div>
                  <div className="w-0.5 h-1 bg-cyan-400/25 rounded-full"></div>
                </>
              )}
            </div>
            <span className="text-[#E5E5E5] text-sm font-medium">24 online now</span>
          </div>
          
          {/* Invisible spacer */}
          <div className="w-12"></div>
          
          {/* Right side buttons */}
          {isExpanded ? (
            <button
              onClick={toggleExpanded}
              className="text-gray-400 hover:text-gray-300 transition-colors"
            >
              <X size={16} />
            </button>
          ) : (
            <button
              onClick={toggleExpanded}
              className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
            >
              <Activity size={14} className="text-cyan-400" />
              <span className="text-cyan-400 text-sm font-medium">Analytics</span>
            </button>
          )}
        </div>

        {/* Expanded Content */}
        <div
          className={`transition-all duration-300 will-change-[max-height,opacity] ease-in-out ${
            isExpanded ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-5 pb-4 pt-2">
            {/* Header with Spark Chart */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-white text-lg font-semibold">Traffic</h2>
                <p className="text-gray-400 text-sm">Last 3 days</p>
              </div>
              <div className="relative h-8 w-[120px] mt-1">
                <svg
                  className={`overflow-visible transition-opacity duration-300 ease-in-out ${
                    isExpanded ? 'opacity-100' : 'opacity-0'
                  }`}
                  width="120"
                  height="32"
                  viewBox="0 0 120 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Line */}
                  <polyline
                    points={points}
                    fill="none"
                    stroke="rgb(34,211,238)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`${isExpanded ? 'animate-[draw-line_1200ms_cubic-bezier(.4,0,.2,1)_forwards_200ms]' : ''}`}
                    style={{
                      strokeDasharray: '300',
                      strokeDashoffset: '300'
                    }}
                  />
                </svg>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="space-y-3">
              {data.map((item) => (
                <div 
                  key={item.path} 
                  className={`space-y-1 transition-all duration-300 ease-in-out ${
                    isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{
                    transitionDelay: `${data.indexOf(item) * 50}ms`
                  }}
                >
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-300 font-medium">
                      {item.path}
                    </span>
                    <span className="text-white">
                      {item.visits.toLocaleString()} visits
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-[#2A2A2A] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-cyan-400 rounded-full transition-all duration-300 ease-in-out"
                      style={{
                        width: isExpanded ? `${(item.visits / maxVisits) * 100}%` : '0%',
                        transitionDelay: `${data.indexOf(item) * 50 + 100}ms`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;