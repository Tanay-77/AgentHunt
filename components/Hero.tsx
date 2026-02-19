
import { type FC } from 'react';

const Hero: FC = () => {
  return (
    <div className="py-24 text-center relative overflow-hidden bg-white bg-grid-black">
      {/* Floating Logos */}
      <div className="absolute left-4 top-10 md:left-[10%] md:top-20 animate-float-slow hidden md:block">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 flex items-center justify-center rotate-[-6deg] hover:rotate-0 transition-all duration-300">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-blue-600" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute right-4 top-16 md:right-[12%] md:top-24 animate-float-medium hidden md:block">
        <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 flex items-center justify-center rotate-[12deg] hover:rotate-0 transition-all duration-300">
          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-orange-500" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute left-10 bottom-20 md:left-[15%] md:bottom-20 animate-float-fast hidden md:block">
        <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 flex items-center justify-center rotate-[6deg] hover:rotate-0 transition-all duration-300">
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-purple-600" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute right-20 bottom-0 md:right-[8%] md:bottom-32 animate-float-slower hidden md:block">
        <div className="w-16 h-16 md:w-18 md:h-18 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 flex items-center justify-center rotate-[-3deg] hover:rotate-0 transition-all duration-300">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-green-500" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H9v-2h6v2zm3-5H6V7h12v6z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 bg-gray-50 text-xs font-medium text-gray-900 mb-8">
        <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
        LIVE LEADERBOARD
      </div>

      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-black">
        The Verified. <br />
        <span className="text-gray-500">
          AI Leaderboard.
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
