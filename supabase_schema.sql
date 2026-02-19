-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT,
  avatar_url TEXT,
  bio TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create agents table
CREATE TABLE IF NOT EXISTS public.agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  tagline TEXT,
  description TEXT,
  framework TEXT,
  cost_per_task NUMERIC,
  latency_avg INTEGER,
  success_rate INTEGER,
  website_url TEXT,
  github_url TEXT,
  upvotes_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create upvotes table to track who voted for what
CREATE TABLE IF NOT EXISTS public.upvotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  agent_id UUID REFERENCES public.agents(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, agent_id) -- Prevent duplicate votes
);


-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.upvotes ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
DROP POLICY IF EXISTS "Enable read access for all users" ON public.profiles;
CREATE POLICY "Enable read access for all users" ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable update for users based on email" ON public.profiles;
CREATE POLICY "Enable update for users based on email" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Agents Policies
DROP POLICY IF EXISTS "Enable read access for all users" ON public.agents;
CREATE POLICY "Enable read access for all users" ON public.agents FOR SELECT USING (true);

-- Upvotes Policies
DROP POLICY IF EXISTS "Enable read access for all users" ON public.upvotes;
CREATE POLICY "Enable read access for all users" ON public.upvotes FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.upvotes;
CREATE POLICY "Enable insert for authenticated users only" ON public.upvotes FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Enable delete for users based on user_id" ON public.upvotes;
CREATE POLICY "Enable delete for users based on user_id" ON public.upvotes FOR DELETE USING (auth.uid() = user_id);


-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, avatar_url, bio)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'user_name', -- GitHub username
    new.raw_user_meta_data->>'avatar_url',
    'Just joined AgentHunt!'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- RPC Function to Toggle Upvote (Handles concurrency and count update)
CREATE OR REPLACE FUNCTION toggle_upvote(agent_id UUID)
RETURNS VOID AS $$
DECLARE
  user_id UUID;
BEGIN
  user_id := auth.uid();
  
  -- Check if upvote exists
  IF EXISTS (SELECT 1 FROM public.upvotes WHERE upvotes.agent_id = toggle_upvote.agent_id AND upvotes.user_id = toggle_upvote.user_id) THEN
    -- Remove upvote
    DELETE FROM public.upvotes WHERE upvotes.agent_id = toggle_upvote.agent_id AND upvotes.user_id = toggle_upvote.user_id;
    -- Decrement count
    UPDATE public.agents SET upvotes_count = upvotes_count - 1 WHERE id = toggle_upvote.agent_id;
  ELSE
    -- Add upvote
    INSERT INTO public.upvotes (agent_id, user_id) VALUES (toggle_upvote.agent_id, toggle_upvote.user_id);
    -- Increment count
    UPDATE public.agents SET upvotes_count = upvotes_count + 1 WHERE id = toggle_upvote.agent_id;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- SEED DATA (Simulating Product Hunt Feed)
-- Note: We are deleting existing agents to avoid duplicates if re-run, but in prod be careful.
TRUNCATE public.agents CASCADE; 

-- Today's Agents
INSERT INTO public.agents (name, slug, tagline, description, framework, cost_per_task, latency_avg, success_rate, website_url, github_url, upvotes_count, created_at)
VALUES 
('ResearchBot Pro', 'research-bot-pro', 'Autonomous deep research agent that browses and verifies.', 'Performs recursive research on complex topics, verifies sources against academic databases, and generates citated reports.', 'LangChain', 0.05, 1200, 98, 'https://example.com', 'https://github.com', 42, NOW()),
('CodeReviewer AI', 'code-reviewer-ai', 'Automated PR reviewer that finds security flaws.', 'Scans pull requests for security vulnerabilities, logic errors, and style violations. Integrates with GitHub Actions.', 'CrewAI', 0.02, 800, 95, 'https://example.com', 'https://github.com', 28, NOW()),
('SalesGPT', 'sales-gpt', 'Outbound sales agent that personalizes emails.', 'Scrapes LinkedIn to personalize outreach emails. Manages follow-ups and booking meetings automatically.', 'AutoGPT', 0.10, 2500, 85, 'https://example.com', 'https://github.com', 15, NOW());

-- Yesterday's Agents
INSERT INTO public.agents (name, slug, tagline, description, framework, cost_per_task, latency_avg, success_rate, website_url, github_url, upvotes_count, created_at)
VALUES 
('DevOps Orchestrator', 'devops-orchestrator', 'Manages Kubernetes clusters via natural language.', 'Interpret simple text commands to scale pods, roll back deployments, and debug crash loops.', 'LangChain', 0.15, 300, 99, 'https://example.com', 'https://github.com', 156, NOW() - INTERVAL '1 day'),
('LegalEagle', 'legal-eagle', 'Contract analysis and risk scoring agent.', 'Review NDAs and service agreements instantly. Highlights non-standard clauses and suggests redlines.', 'BabyAGI', 0.50, 4000, 92, 'https://example.com', 'https://github.com', 89, NOW() - INTERVAL '1 day'),
('CryptoTrader X', 'crypto-trader-x', 'Sentiment-based high frequency trading bot.', 'Analyzes Twitter/X sentiment and processes chain data to execute swing trades.', 'Custom', 0.08, 50, 78, 'https://example.com', 'https://github.com', 204, NOW() - INTERVAL '1 day');

-- Previous Days
INSERT INTO public.agents (name, slug, tagline, description, framework, cost_per_task, latency_avg, success_rate, website_url, github_url, upvotes_count, created_at)
VALUES 
('TravelBuddy', 'travel-buddy', 'Book entire vacations with one prompt.', 'Searches flights, hotels, and activities. Handles booking via APIs and manages itinerary changes.', 'LangChain', 0.01, 5000, 90, 'https://example.com', 'https://github.com', 340, NOW() - INTERVAL '2 days'),
('DesignMate', 'design-mate', 'Figma plugin that generates UI from text.', 'Converts text descriptions into editable Figma layers and auto-layouts.', 'CrewAI', 0.05, 1500, 88, 'https://example.com', 'https://github.com', 512, NOW() - INTERVAL '3 days');
