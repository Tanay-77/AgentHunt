"use client";

import { useState, type FC } from 'react';
import Hero from '../components/Hero';
import AgentCard from '../components/AgentCard';
import FilterBar from '../components/FilterBar';
import { MOCK_AGENTS } from '../lib/mockData';

const HomePage: FC = () => {
    const [activeFilter, setActiveFilter] = useState('All');

    const filteredAgents = activeFilter === 'All'
        ? MOCK_AGENTS
        : MOCK_AGENTS.filter(a => a.framework === activeFilter);

    // Sorting: Top upvoted first
    const sortedAgents = [...filteredAgents].sort((a, b) => b.upvotes_count - a.upvotes_count);

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Hero />

            <div className="mt-12 max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold flex items-center gap-3 text-primary">
                        Today's Top Agents
                        <span className="text-sm font-normal text-muted">March 27, 2024</span>
                    </h2>
                </div>

                <FilterBar current={activeFilter} onChange={setActiveFilter} />

                <div className="grid grid-cols-1 gap-4">
                    {sortedAgents.length > 0 ? (
                        sortedAgents.map((agent) => (
                            <AgentCard key={agent.id} agent={agent} />
                        ))
                    ) : (
                        <div className="py-20 text-center border-2 border-dashed border-border rounded-2xl bg-white">
                            <p className="text-muted">No agents found for this framework.</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-20 py-20 border-t border-border text-center">
                <h3 className="text-3xl font-bold mb-4 italic text-primary">"The best way to predict the future is to ship it."</h3>
                <p className="text-muted font-mono">AgentHunt v1.0.4-beta</p>
            </div>
        </div>
    );
};

export default HomePage;
