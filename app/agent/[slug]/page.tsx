"use client";

import { useState, useEffect, type FC } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft,
    ExternalLink,
    Github,
    Cpu,
    Database,
    ShieldCheck,
    Terminal,
    PlayCircle
} from 'lucide-react';
import { MOCK_AGENTS } from '../../../lib/mockData';
import { Agent } from '../../../types';

const AgentDetailPage: FC = () => {
    const params = useParams();
    const slug = params?.slug as string;
    const [agent, setAgent] = useState<Agent | null>(null);

    useEffect(() => {
        if (slug) {
            const found = MOCK_AGENTS.find(a => a.slug === slug);
            if (found) setAgent(found);
        }
    }, [slug]);

    if (!agent) {
        return <div className="p-20 text-center">Agent not found.</div>;
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            <Link href="/" className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors mb-10 group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Leaderboard
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Column: Info */}
                <div className="lg:col-span-2 space-y-12">
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-2 py-0.5 bg-brand/10 text-brand rounded border border-brand/20 text-[10px] font-mono uppercase font-bold">
                                    {agent.framework}
                                </span>
                                <span className="flex items-center gap-1 text-[10px] font-mono text-muted">
                                    <ShieldCheck className="w-3 h-3" />
                                    VERIFIED AGENT
                                </span>
                            </div>
                            <h1 className="text-5xl font-extrabold mb-4 text-primary">{agent.name}</h1>
                            <p className="text-xl text-muted leading-relaxed mb-8">
                                {agent.description}
                            </p>

                            <div className="flex items-center gap-4">
                                <a href={agent.website_url} className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-black transition-all shadow-lg hover:shadow-xl">
                                    Visit Website <ExternalLink className="w-4 h-4" />
                                </a>
                                <a href={agent.github_url} className="flex items-center gap-2 bg-white border border-border px-6 py-2 rounded-lg font-bold hover:bg-gray-50 transition-all text-primary shadow-sm hover:shadow-md">
                                    View GitHub <Github className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Proof of Work Player */}
                    <section className="space-y-4">
                        <h3 className="text-xl font-bold flex items-center gap-2 text-primary">
                            <PlayCircle className="w-5 h-5 text-brand" />
                            Proof of Work
                        </h3>
                        <div className="aspect-video bg-gray-100 rounded-2xl border border-border relative group overflow-hidden shadow-sm">
                            <img src={`https://picsum.photos/seed/${agent.slug}/1280/720`} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" alt="Work proof" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-20 h-20 bg-brand rounded-full flex items-center justify-center shadow-2xl shadow-brand/40 transform scale-90 group-hover:scale-100 transition-all cursor-pointer">
                                    <PlayCircle className="w-10 h-10 fill-white text-brand" />
                                </div>
                            </div>
                            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-xl border border-white/20 flex items-center justify-between shadow-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                                    <span className="text-xs font-mono text-primary font-bold">Recorded execution session: March 24, 2024</span>
                                </div>
                                <span className="text-xs font-mono text-muted">04:32</span>
                            </div>
                        </div>
                    </section>

                    {/* Technical Logs */}
                    <section className="space-y-4">
                        <h3 className="text-xl font-bold flex items-center gap-2 text-primary">
                            <Terminal className="w-5 h-5 text-brand" />
                            Execution Logs
                        </h3>
                        <div className="bg-[#111827] border border-border rounded-xl p-6 font-mono text-sm overflow-hidden relative shadow-lg">
                            <div className="flex gap-4 mb-4 text-gray-400 border-b border-gray-800 pb-2">
                                <span>output.log</span>
                                <span className="text-brand border-b border-brand pb-2 -mb-2.5">metrics.json</span>
                                <span>agent.yaml</span>
                            </div>
                            <pre className="text-green-400/90 leading-relaxed whitespace-pre-wrap">
                                {`{
  "task_id": "exec_847293",
  "agent": "${agent.name}",
  "latency": ${agent.latency_avg},
  "token_usage": {
    "prompt": 1420,
    "completion": 450
  },
  "success": true,
  "confidence_score": 0.992,
  "actions": [
    { "step": 1, "type": "observation", "source": "github_api" },
    { "step": 2, "type": "reasoning", "model": "gemini-3-pro-preview" },
    { "step": 3, "type": "execution", "method": "git_push" }
  ]
}`}
                            </pre>
                        </div>
                    </section>
                </div>

                {/* Right Column: Technical Sidebar */}
                <div className="space-y-6">
                    <div className="bg-card border border-border rounded-2xl p-8 sticky top-24 shadow-sm">
                        <h3 className="text-lg font-bold mb-6 flex items-center justify-between text-primary">
                            Technical Specs
                            <Cpu className="w-4 h-4 text-brand" />
                        </h3>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="text-muted text-sm">Framework</span>
                                <span className="font-mono text-sm px-2 py-0.5 bg-gray-100 rounded border border-border text-primary">{agent.framework}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted text-sm">Success Rate</span>
                                <span className="font-bold text-success">{agent.success_rate}%</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted text-sm">Avg. Latency</span>
                                <span className="font-mono text-sm text-primary">{agent.latency_avg}ms</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted text-sm">Cost / Task</span>
                                <span className="font-mono text-sm text-primary">${agent.cost_per_task}</span>
                            </div>

                            <div className="h-[1px] bg-border my-4" />

                            <div className="flex items-center justify-between">
                                <span className="text-muted text-sm">Uptime (24h)</span>
                                <span className="text-sm text-primary">99.98%</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted text-sm">Infrastructure</span>
                                <div className="flex items-center gap-1.5">
                                    <Database className="w-3.5 h-3.5 text-brand" />
                                    <span className="text-xs text-primary">Edge Network</span>
                                    - </div>
                            </div>
                        </div>

                        <div className="mt-10 p-4 rounded-xl bg-brand/5 border border-brand/20 text-center">
                            <p className="text-xs text-brand/80 mb-3">Audited by AgentHunt Validator</p>
                            <button className="w-full bg-brand hover:bg-brandHover text-white py-2 rounded-lg text-sm font-bold transition-all shadow-md shadow-brand/20">
                                Request Enterprise Demo
                            </button>
                        </div>
                    </div>

                    <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                        <h3 className="text-lg font-bold mb-4 text-primary">Creator</h3>
                        <div className="flex items-center gap-4">
                            <img src={agent.creator?.avatar_url} className="w-12 h-12 rounded-full border border-border" alt="Creator" />
                            <div>
                                <p className="font-bold text-primary">{agent.creator?.username}</p>
                                <p className="text-xs text-muted">{agent.creator?.bio}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgentDetailPage;
