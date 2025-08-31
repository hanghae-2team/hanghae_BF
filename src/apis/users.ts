import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';

import { db } from '@/lib/firebase';

// 타입 정의
export interface User {
  id: string;
  name: string;
  image: string;
  link: string;
  hobbies: string[];
  updatedAt?: string;
  isCompleted?: boolean;
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

// 1. 간단 인증용 - ID와 이름으로 사용자 찾기
export const authenticateUser = async (userId: string, name: string): Promise<AuthResult> => {
  const userDoc = doc(db, 'users', userId);
  const userSnapshot = await getDoc(userDoc);

  if (!userSnapshot.exists()) {
    throw Error('사용자를 찾을 수 없습니다.');
  }

  const userData = userSnapshot.data();
  if (userData.name === name) {
    return { success: true, user: { id: userId, ...userData } as User };
  } else {
    throw Error('이름이 일치하지 않습니다.');
  }
};

// 2. 사용자 취미 업데이트
export const updateUserHobbies = async (
  userId: string,
  hobbies: string[]
): Promise<{ success: boolean; message: string; data: User }> => {
  const userDoc = doc(db, 'users', userId);

  // 문서 존재 여부 확인
  const userSnapshot = await getDoc(userDoc);
  const userData = userSnapshot.data() as User;
  if (!userSnapshot.exists()) {
    throw new Error('사용자를 찾을 수 없습니다.');
  }

  await updateDoc(userDoc, {
    hobbies: hobbies,
    updatedAt: new Date().toISOString(),
  });

  return {
    success: true,
    message: '취미가 성공적으로 업데이트되었습니다.',
    data: { ...userData, id: userId, hobbies },
  };
};

//3. 모든 유저 가져오기
export const getAllUsers = async () => {
  const snap = await getDocs(collection(db, 'users'));

  return snap.docs.reduce<Record<string, User>>((acc, curDoc) => {
    acc[curDoc.id] = curDoc.data() as User;
    return acc;
  }, {});
};

//4. 유저 가져오기
export const getUser = async (userId: string) => {
  const userDoc = doc(db, 'users', userId);
  const userSnapshot = await getDoc(userDoc);

  if (!userSnapshot.exists()) {
    throw Error('사용자를 찾을 수 없습니다.');
  }

  const userData = userSnapshot.data() as Omit<User, 'id'>;
  return { success: true, data: { id: userId, ...userData } };
};

// // 4. Top5/Worst5 가져오기
// export async function getCompatibilityRanking(userId: string): Promise<RankingResult> {
//   try {
//     const userDoc = doc(db, 'users', userId);
//     const userSnapshot = await getDoc(userDoc);

//     if (!userSnapshot.exists()) {
//       return { success: false, message: '사용자를 찾을 수 없습니다.' };
//     }

//     const userData = userSnapshot.data();
//     const scores = userData.compatibilityScores || {};

//     // 점수 순으로 정렬
//     const sortedScores = Object.entries(scores)
//       .map(([id, score]) => ({ userId: id, score }))
//       .sort((a, b) => b.score - a.score);

//     const top5 = sortedScores.slice(0, 5);
//     const worst5 = sortedScores.slice(-5).reverse(); // 낮은 순으로

//     return {
//       success: true,
//       data: { top5, worst5, totalCount: sortedScores.length },
//     };
//   } catch (error) {
//     console.error('Error getting compatibility ranking:', error);
//     return { success: false, message: '궁합 순위 조회에 실패했습니다.' };
//   }
// }

// // 5. 모든 사용자 정보 가져오기 (궁합 계산용)
// export async function getAllUsers(): Promise<{ success: boolean; users?: User[]; message?: string }> {
//   try {
//     const usersCol = collection(db, 'users');
//     const usersSnapshot = await getDocs(usersCol);

//     const usersList: User[] = usersSnapshot.docs.map(
//       (doc) =>
//         ({
//           id: doc.id,
//           ...doc.data(),
//         }) as User
//     );

//     return { success: true, users: usersList };
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     return { success: false, message: '사용자 목록 조회에 실패했습니다.' };
//   }
// }
