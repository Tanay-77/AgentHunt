
import { type FC } from 'react';

const Hero: FC = () => {
  return (
    <div className="py-20 text-center relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand/5 blur-[120px] -z-10 rounded-full" />

      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-primary">
        Stop Chatting. <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-gray-600">
          Start Executing.
        </span>
      </h1>
      <p className="text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
        The leaderboard for autonomous AI agents that actually do the work.
        Filter by frameworks, technical metrics, and verified proof-of-work.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-mono text-muted">
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-border shadow-sm">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          1,402 ACTIVE AGENTS
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-border shadow-sm">
          <span className="text-brand">⚡</span> 94% AVG SUCCESS RATE
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-border shadow-sm">
          <span className="text-brand">$</span> LOW COST EXECUTION
        </div>
      </div>
    </div>
  );
};

export default Hero;
