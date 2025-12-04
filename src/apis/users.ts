import type { RollingPaperSenderRequest } from '@/apis/rollingPapers';
import usersData from '@/data/users-db.json';

// 타입 정의
export interface User {
  id: string;
  name: string;
  image: string;
  link: string;
  hobbies: string[];
  updatedAt?: string;
  team: 'coach' | 'manager' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
  isCompleted?: boolean;
  writedRollingPapers?: RollingPaperSenderRequest[];
}

export interface AuthResult {
  success: boolean;
  message?: string;
  user?: User;
}

export interface CompatibilityRanking {
  userId: string;
  score: number;
}

export interface RankingResult {
  success: boolean;
  data?: {
    top5: CompatibilityRanking[];
    worst5: CompatibilityRanking[];
    totalCount: number;
  };
  message?: string;
}

// JSON 데이터를 User[] 타입으로 캐스팅
const users = usersData as User[];

// 1. 간단 인증용 - ID와 이름으로 사용자 찾기
export const authenticateUser = async (userId: string, name: string): Promise<AuthResult> => {
  const user = users.find((u) => u.id === userId);

  if (!user) {
    throw Error('사용자를 찾을 수 없습니다.');
  }

  if (user.name === name) {
    return { success: true, user };
  } else {
    throw Error('이름이 일치하지 않습니다.');
  }
};

// 2. 사용자 취미 업데이트 (JSON은 읽기 전용이므로 로컬 상태만 반환)
export const updateUserHobbies = async (
  userId: string,
  hobbies: string[]
): Promise<{ success: boolean; message: string; data: User }> => {
  const user = users.find((u) => u.id === userId);

  if (!user) {
    throw new Error('사용자를 찾을 수 없습니다.');
  }

  // JSON은 읽기 전용이므로 업데이트된 데이터를 반환만 함
  const updatedUser: User = {
    ...user,
    hobbies,
    updatedAt: new Date().toISOString(),
  };

  return {
    success: true,
    message: '취미가 성공적으로 업데이트되었습니다.',
    data: updatedUser,
  };
};

// 3. 모든 유저 가져오기
export const getAllUsers = async () => {
  return users.reduce<Record<string, User>>((acc, user) => {
    acc[user.id] = user;
    return acc;
  }, {});
};

// 4. 유저 가져오기
export const getUser = async (userId: string) => {
  const user = users.find((u) => u.id === userId);

  if (!user) {
    throw Error('사용자를 찾을 수 없습니다.');
  }

  return { success: true, data: user };
};
