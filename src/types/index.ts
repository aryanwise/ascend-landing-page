export type AreaId = 'fitness' | 'study' | 'diet' | 'career' | 'mind' | 'money' | 'health' | 'habits' | 'custom';

export interface Area {
  id: AreaId;
  label: string;
  color: string;
  soft: string;
  emoji: string;
}

export interface Task {
  id: string;
  name: string;
  frequency: string;
  duration?: string;
  category?: string;
  intervened?: boolean;
}

export interface Milestone {
  week: number;
  title: string;
  metric?: string;
}

export interface Plan {
  title: string;
  summary: string;
  duration: string;
  milestones: Milestone[];
  dailyTasks: Task[];
  tips: string[];
}

export interface Goal {
  id: string;
  area: AreaId;
  title: string;
  plan: Plan;
  paused?: boolean;
  missedDays?: number; // for demo: pre-seed with 2 to show warning
  createdAt: string;
}

export interface Priority {
  id: string;
  text: string;
  done: boolean;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface DayBlock {
  time: string;
  task: string;
  duration: string;
  area: string;
  color: string;
  soft: string;
  done: boolean;
}

export interface DayPlan {
  advice: string;
  blocks: DayBlock[];
  deferred: { task: string; reason: string }[];
}

export type DemoStep =
  | 'intro'
  | 'pickArea'
  | 'goalText'
  | 'aiDialogue'
  | 'planReview'
  | 'app'     // main tabbed app experience
  | 'done';

export type AppTab = 'home' | 'goals' | 'assistant' | 'coach' | 'insights';

export interface DialogueMessage {
  role: 'user' | 'assistant';
  content: string;
}
