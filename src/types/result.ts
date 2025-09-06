import type { User } from '@/apis/users';

export interface MatchResult {
  targetId: string;
  taste: number;
  values: number;
  personality: number;
  total: number;
  adjustScore: number;
}

export type MatchResultWithUser = MatchResult & Omit<User, 'hobbies' | 'team'>;

export interface SurveyResultJson {
  top10: MatchResult[];
}

export type FinalResultJson = Record<string, SurveyResultJson>;

export type UsersType = Record<string, Omit<User, 'hobbies' | 'team'>>;
