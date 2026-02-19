
"use client";

import { useState, type FC, type MouseEvent } from 'react';
import Link from 'next/link';
import { ChevronUp, Zap, Clock, TrendingUp } from 'lucide-react';
import { Agent } from '../types';

interface AgentCardProps {
  agent: Agent;
}

const AgentCard: FC<AgentCardProps> = ({ agent }) => {
  const [upvotes, setUpvotes] = useState(agent.upvotes_count);
  const [hasUpvoted, setHasUpvoted] = useState(agent.has_upvoted);

  const handleUpvote = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (hasUpvoted) {
      setUpvotes(prev => prev - 1);
      setHasUpvoted(false);
    } else {
      setUpvotes(prev => prev + 1);
      setHasUpvoted(true);
    }
  };

  return (
    <Link
      href={`/agent/${agent.slug}`}
      className="group block bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-black/50 transition-all duration-300"
    >
      <div className="flex gap-6 items-start">
        {/* Upvote Button */}
        <button
          onClick={handleUpvote}
          className={`flex flex-col items-center justify-center min-w-[50px] h-[60px] rounded-lg border transition-all ${hasUpvoted
            ? 'bg-black text-white border-black'
            : 'bg-white border-gray-200 text-gray-500 hover:border-black hover:text-black'
            }`}
        >
          <ChevronUp className={`w-5 h-5 mb-1 transition-transform ${hasUpvoted ? 'translate-y-[-2px]' : ''}`} />
          <span className="text-sm font-bold">{upvotes}</span>
        </button>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-black group-hover:underline decoration-2 underline-offset-4 transition-all">
              {agent.name}
            </h3>
            <span className="text-xs font-bold uppercase tracking-widest px-2 py-1 bg-gray-100 rounded text-gray-900 border border-gray-200">
              {agent.framework}
            </span>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-1">
            {agent.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5 min-w-[100px]">
              <span className="text-gray-400">Success</span>
              <span className="text-black font-semibold">{agent.success_rate}%</span>
            </div>
            <div className="flex items-center gap-1.5 min-w-[100px]">
              <span className="text-gray-400">Latency</span>
              <span className="text-black font-semibold">{agent.latency_avg}ms</span>
            </div>
            <div className="flex items-center gap-1.5 min-w-[100px]">
              <span className="text-gray-400">Cost</span>
              <span className="text-black font-semibold">${agent.cost_per_task}</span>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex flex-col items-end gap-2">
          <img
            src={agent.creator?.avatar_url}
            alt={agent.creator?.username}
            className="w-8 h-8 rounded-full border border-gray-200 grayscale group-hover:grayscale-0 transition-all"
          />
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">By {agent.creator?.username}</span>
        </div>
      </div>
    </Link>
  );
};

export default AgentCard;
