
import { type FC } from 'react';

const Hero: FC = () => {
  return (
    <div className="py-24 text-center relative overflow-hidden bg-white">
      {/* Decorative wireframe-like elements could go here if needed, keeping it clean for now */}

      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 bg-gray-50 text-xs font-medium text-gray-900 mb-8">
        <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
        LIVE LEADERBOARD
      </div>

      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-black">
        Stop Chatting. <br />
        <span className="text-gray-500">
          Start Executing.
        </span>
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
        The leaderboard for autonomous AI agents that actually do the work.
        Filter by frameworks, technical metrics, and verified proof-of-work.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-gray-900">
        <div className="flex items-center gap-2 px-6 py-3 bg-white rounded-lg border border-gray-200 shadow-sm hover:border-black transition-colors">
          1,402 ACTIVE AGENTS
        </div>
        <div className="flex items-center gap-2 px-6 py-3 bg-white rounded-lg border border-gray-200 shadow-sm hover:border-black transition-colors">
          94% SUCCESS RATE
        </div>
        <div className="flex items-center gap-2 px-6 py-3 bg-white rounded-lg border border-gray-200 shadow-sm hover:border-black transition-colors">
          LOW COST EXECUTION
        </div>
      </div>
    </div>
  );
};

export default Hero;
