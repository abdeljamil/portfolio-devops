export type SkillStatus = 'mastered' | 'learning' | 'coming' | 'planned';

export interface DevOpsSkill {
  id: string;
  name: string;
  icon: string;
  description: string;
  progress: number;
  status: SkillStatus;
  tags: string[];
  accentColor: string;
  startedAt?: string;
}

export interface Project {
  id: string;
  title: string;
  icon: string;
  description: string;
  stack: string[];
  githubUrl?: string;
  demoUrl?: string;
  status: 'done' | 'in-progress' | 'planned';
}

export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  company: string;
  description: string;
  type: 'stage' | 'formation' | 'certification';
  active: boolean;
  tags: string[];
}


interface Certification {
  id: string;
  title: string;
  organism: string;
  date: string;
  certNumber: string;
  icon: string;
  accentColor: string;
  tags: string[];
  pdfUrl?: string; // 👈 ajoute cette ligne
}
