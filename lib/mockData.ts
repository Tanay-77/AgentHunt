
import { Agent, Profile, Framework } from '../types';

export const MOCK_PROFILES: Profile[] = [
  {
    id: 'u1',
    username: 'alex_dev',
    avatar_url: 'https://picsum.photos/seed/alex/100',
    bio: 'Building the future of autonomous systems.',
    is_verified: true,
  },
  {
    id: 'u2',
    username: 'sarah_ai',
    avatar_url: 'https://picsum.photos/seed/sarah/100',
    bio: 'Lead Engineer at OmniCorp.',
    is_verified: true,
  }
];

export const MOCK_AGENTS: Agent[] = [
  {
    id: 'a1',
    creator_id: 'u1',
    name: 'ClawExec v2',
    slug: 'clawexec-v2',
    tagline: 'Automated GitHub issue triaging and PR generation.',
    description: 'An advanced OpenClaw-based agent that monitors your repo, labels issues, and submits actual code fixes for bug reports.',
    framework: Framework.OpenClaw,
    cost_per_task: 0.15,
    latency_avg: 450,
    success_rate: 94,
    website_url: '#',
    github_url: '#',
    created_at: new Date().toISOString(),
    upvotes_count: 142,
    has_upvoted: false,
    creator: MOCK_PROFILES[0]
  },
  {
    id: 'a2',
    creator_id: 'u2',
    name: 'ResearchBot Pro',
    slug: 'researchbot-pro',
    tagline: 'Deep semantic research and PDF synthesis.',
    description: 'Uses LangChain and Gemini to parse thousands of research papers and generate high-fidelity technical summaries.',
    framework: Framework.LangChain,
    cost_per_task: 0.45,
    latency_avg: 1200,
    success_rate: 98,
    website_url: '#',
    github_url: '#',
    created_at: new Date(Date.now() - 3600000).toISOString(),
    upvotes_count: 89,
    has_upvoted: true,
    creator: MOCK_PROFILES[1]
  },
  {
    id: 'a3',
    creator_id: 'u1',
    name: 'CrewWriter',
    slug: 'crewwriter',
    tagline: 'Multi-agent editorial team for high-traffic blogs.',
    description: 'A crew of 3 agents (Writer, Editor, SEO) that coordinates on content creation without human intervention.',
    framework: Framework.CrewAI,
    cost_per_task: 0.05,
    latency_avg: 300,
    success_rate: 88,
    website_url: '#',
    github_url: '#',
    created_at: new Date(Date.now() - 7200000).toISOString(),
    upvotes_count: 67,
    has_upvoted: false,
    creator: MOCK_PROFILES[0]
  }
];
