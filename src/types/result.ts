import type { User } from '@/apis/users';

export interface MatchResult {
  targetId: string;
  taste: number;
  values: number;
  personality: number;
  total: number;
  commonChoices: {
    taste: { question: string; choiceContent: string }[];
    values: { question: string; choiceContent: string }[];
    personality: { question: string; choiceContent: string }[];
  };
}

export interface SurveyResultJson {
  top5: MatchResult[];
  bottom5: MatchResult[];
}

export type FinalResultJson = Record<string, SurveyResultJson>;

export type UsersType = Record<string, Omit<User, 'hobbies' | 'team'>>;
