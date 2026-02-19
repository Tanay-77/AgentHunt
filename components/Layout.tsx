
"use client";

import { useState, type FC, type ReactNode } from 'react';
import Link from 'next/link';
import { Search, Plus, Bell, User } from 'lucide-react';
import SubmissionModal from './SubmissionModal';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-primary">
      {/* Navbar */}
      <nav className="border-b border-border sticky top-0 bg-background/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-bold text-[#000000]">
              AgentHunt
            </Link>
            <div className="hidden md:flex relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                placeholder="Search agents..."
                className="bg-white border border-border rounded-full pl-10 pr-4 py-1.5 text-sm w-64 focus:outline-none focus:ring-1 focus:ring-[#000000] transition-all text-primary placeholder-muted"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-[#000000] hover:bg-[#333333] text-white px-4 py-1.5 rounded-full text-sm font-medium transition-all shadow-lg shadow-black/20"
            >
              <Plus className="w-4 h-4" />
              Submit Agent
            </button>
            <div className="h-8 w-[1px] bg-border mx-2" />
            <button className="text-muted hover:text-primary transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="h-8 w-8 rounded-full bg-white border border-border flex items-center justify-center hover:border-muted transition-all text-muted hover:text-primary">
              <User className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>

      {/* Submission Modal */}
      <SubmissionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Layout;
