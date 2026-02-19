"use client";

import { useState, useEffect, type FC } from 'react';
import Link from 'next/link';
import { supabase } from '../lib/supabase';
import { Agent } from '../types';
import { Shield, ChevronUp } from 'lucide-react';
import { format, isToday, isYesterday } from 'date-fns';

const HomePage: FC = () => {
    const [groupedAgents, setGroupedAgents] = useState<{ date: string; agents: Agent[] }[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    // Fetch User
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
        });
    }, []);

    // Fetch Agents
    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const { data, error } = await supabase
                    .from('agents')
                    .select('*, creator:profiles(*)')
                    .order('created_at', { ascending: false }); // Newest first

                if (error) throw error;
                if (data) {
                    // Group by Date
                    const groups: { [key: string]: Agent[] } = {};
                    data.forEach(agent => {
                        const date = new Date(agent.created_at);
                        let key = format(date, 'MMMM do');
                        if (isToday(date)) key = 'Today';
                        if (isYesterday(date)) key = 'Yesterday';

                        if (!groups[key]) groups[key] = [];
                        groups[key].push(agent);
                    });

                    // Convert to array
                    const groupArray = Object.keys(groups).map(date => ({
                        date,
                        agents: groups[date].sort((a, b) => b.upvotes_count - a.upvotes_count) // Sort by upvotes within day
                    }));

                    setGroupedAgents(groupArray);
                }
            } catch (error) {
                console.error('Error fetching agents:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAgents();
    }, []);

    const handleUpvote = async (agentId: string) => {
        if (!user) {
            alert("Please sign in to upvote!");
            return;
        }

        try {
            // Call the database function
            const { error } = await supabase.rpc('toggle_upvote', { agent_id: agentId });
            if (error) throw error;

            // Optimistic UI update (simple re-fetch for now or manual update)
            // For simplicity, let's just re-fetch or manually adjust state.
            // A quick re-fetch is safest to sync perfectly.
            const { data } = await supabase.from('agents').select('*').eq('id', agentId).single();

            if (data) {
                setGroupedAgents(prev => prev.map(group => ({
                    ...group,
                    agents: group.agents.map(a => a.id === agentId ? { ...a, upvotes_count: data.upvotes_count } : a)
                        .sort((a, b) => b.upvotes_count - a.upvotes_count)
                })));
            }

        } catch (error) {
            console.error('Error upvoting:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
                    The Best AI Agents, <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500">Every Day.</span>
                </h1>
                <p className="text-lg text-gray-500 max-w-xl mx-auto">
                    Discover, upvote, and launch the next generation of autonomous agents.
                </p>
            </div>

            {isLoading ? (
                <div className="space-y-12">
                    {[1, 2].map(i => (
                        <div key={i} className="space-y-4">
                            <div className="h-8 w-32 bg-gray-100 rounded animate-pulse" />
                            <div className="h-24 bg-gray-50 rounded-xl animate-pulse" />
                            <div className="h-24 bg-gray-50 rounded-xl animate-pulse" />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="space-y-16">
                    {groupedAgents.map((group) => (
                        <div key={group.date}>
                            <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                                {group.date}
                                {group.date === 'Today' && (
                                    <span className="bg-red-500 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full animate-pulse">
                                        Live
                                    </span>
                                )}
                            </h2>
                            <div className="space-y-6">
                                {group.agents.map((agent) => (
                                    <div key={agent.id} className="group bg-white border border-gray-100 hover:border-gray-200 rounded-2xl p-4 flex items-center gap-6 transition-all hover:shadow-lg hover:shadow-gray-100/50">
                                        {/* Avatar / Icon */}
                                        <div className="shrink-0">
                                            <div className="w-16 h-16 bg-gray-900 text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-gray-200">
                                                {agent.name[0]}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <Link href={`/agent/${agent.slug}`} className="block">
                                                <h3 className="text-lg font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                                                    {agent.name}
                                                </h3>
                                                <p className="text-gray-500 text-sm truncate mb-2">
                                                    {agent.tagline}
                                                </p>
                                                <div className="flex items-center gap-2">
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                                        {agent.framework}
                                                    </span>
                                                    <span className="text-xs text-gray-400 flex items-center gap-1">
                                                        <Shield className="w-3 h-3" /> Verified
                                                    </span>
                                                </div>
                                            </Link>
                                        </div>

                                        {/* Upvote Button */}
                                        <div className="shrink-0">
                                            <button
                                                onClick={() => handleUpvote(agent.id)}
                                                className="flex flex-col items-center justify-center w-16 h-16 border border-gray-200 rounded-xl hover:border-gray-300 bg-white hover:bg-gray-50 transition-all group/btn active:scale-95"
                                            >
                                                <ChevronUp className="w-6 h-6 text-gray-400 group-hover/btn:text-blue-600 transition-colors" />
                                                <span className="font-bold text-sm text-gray-900">
                                                    {agent.upvotes_count}
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-20 py-20 border-t border-border text-center">
                <h3 className="text-3xl font-bold mb-4 italic text-primary">"The best way to predict the future is to ship it."</h3>
                <p className="text-muted font-mono">AgentHunt v1.0.4-beta</p>
            </div>
        </div>
    );
};

export default HomePage;
