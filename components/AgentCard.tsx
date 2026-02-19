
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
      className="group block bg-card border border-border rounded-xl p-5 hover:border-brand/30 transition-all glow-hover relative shadow-sm hover:shadow-md"
    >
      <div className="flex gap-6 items-start">
        {/* Upvote Button */}
        <button
          onClick={handleUpvote}
          className={`flex flex-col items-center justify-center min-w-[50px] h-[60px] rounded-lg border transition-all ${hasUpvoted
            ? 'bg-brand/10 border-brand/50 text-brand'
            : 'bg-gray-50 border-border text-muted group-hover:border-brand/30'
            }`}
        >
          <ChevronUp className={`w-5 h-5 mb-1 transition-transform ${hasUpvoted ? 'translate-y-[-2px]' : ''}`} />
          <span className="text-sm font-bold">{upvotes}</span>
        </button>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-primary group-hover:text-brand transition-colors">
              {agent.name}
            </h3>
            <span className="text-xs font-mono uppercase tracking-widest px-2 py-1 bg-gray-100 rounded border border-border text-muted font-bold">
              {agent.framework}
            </span>
          </div>

          <p className="text-muted text-sm mb-4 line-clamp-1">
            {agent.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs text-muted">
              <Zap className="w-3.5 h-3.5 text-brand" />
              <span>Success Rate: <span className="text-success font-bold">{agent.success_rate}%</span></span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted">
              <Clock className="w-3.5 h-3.5 text-brand" />
              <span>Latency: <span className="text-primary font-medium">{agent.latency_avg}ms</span></span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted">
              <TrendingUp className="w-3.5 h-3.5 text-brand" />
              <span>Cost: <span className="text-primary font-medium">${agent.cost_per_task}</span></span>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex flex-col items-end gap-2">
          <img
            src={agent.creator?.avatar_url}
            alt={agent.creator?.username}
            className="w-8 h-8 rounded-full border border-border"
          />
          <span className="text-[10px] font-mono text-muted uppercase">By {agent.creator?.username}</span>
        </div>
      </div>
    </Link>
  );
};

export default AgentCard;
