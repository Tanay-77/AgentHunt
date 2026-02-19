
"use client";

import { useState, type FC, type ReactNode } from 'react';
import Link from 'next/link';
import { Search, Plus, Bell, User } from 'lucide-react';
import SubmissionModal from './SubmissionModal';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Navbar */}
      <nav className="border-b border-border sticky top-0 bg-white z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded flex items-center justify-center text-white font-bold text-xl">
                A
              </div>
              <span className="text-xl font-bold tracking-tight">AgentHunt</span>
            </Link>
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
              <Link href="#" className="hover:text-black transition-colors">Features</Link>
              <Link href="#" className="hover:text-black transition-colors">Templates</Link>
              <Link href="#" className="hover:text-black transition-colors">Library</Link>
              <Link href="#" className="hover:text-black transition-colors">Pricing</Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-sm font-medium hover:text-gray-600 transition-colors">
              Sign in
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-black text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-all shadow-sm"
            >
              Submit Agent
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full">
        {children}
      </main>

      {/* Submission Modal */}
      <SubmissionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Layout;
