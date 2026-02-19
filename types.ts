
export interface Profile {
  id: string;
  username: string;
  avatar_url: string;
  bio: string;
  is_verified: boolean;
}

export interface Agent {
  id: string;
  creator_id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  framework: string;
  cost_per_task: number;
  latency_avg: number;
  success_rate: number;
  website_url: string;
  github_url: string;
  created_at: string;
  upvotes_count: number;
  has_upvoted: boolean;
  creator?: Profile;
}

export interface ProofOfWork {
  id: string;
  agent_id: string;
  media_url: string;
  log_json: any;
  created_at: string;
}

export enum Framework {
  CrewAI = 'CrewAI',
  OpenClaw = 'OpenClaw',
  LangChain = 'LangChain',
  AutoGPT = 'AutoGPT',
  Custom = 'Custom'
}
