import { useMutation } from '@tanstack/react-query';
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

import { db } from '@/lib/firebase';

export interface RollingPaper {
  message: string;
  writer: string;
}
export interface RollingPaperSender {
  senderId: string;
}

interface AddRollingPaperParams {
  receiverId: string;
  rollingPaper: RollingPaper;
  writer?: string;
  senderId: string;
}

interface RollingPaperRequest extends RollingPaper {
  id: string;
}
export interface RollingPaperSenderRequest {
  id: string;
  receiverId: string;
}

export const useAddRollingPaper = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error: unknown) => void;
}) => {
  return useMutation({
    mutationFn: async ({ receiverId, rollingPaper, senderId }: AddRollingPaperParams) => {
      const userDocRef = doc(db, 'rollingPapers', receiverId);
      const userInfoDocRef = doc(db, 'users', senderId);
      const rollingPaperId = uuidv4();
      try {
        // 문서 존재 여부 확인
        const docSnap = await getDoc(userDocRef);

        const newRollingPaper: RollingPaperRequest = {
          id: rollingPaperId,
          message: rollingPaper.message,
          writer: rollingPaper.writer || '',
        };

        const newSend: RollingPaperSenderRequest = {
          id: rollingPaperId,
          receiverId: receiverId,
        };

        // 롤링페이퍼 리스트에 추가
        if (docSnap.exists()) {
          // 문서가 존재하면 배열에 추가
          await updateDoc(userDocRef, {
            rollingPapers: arrayUnion(newRollingPaper),
          });
        } else {
          // 문서가 없으면 새로 생성
          await setDoc(userDocRef, {
            rollingPapers: [newRollingPaper],
          });
        }

        const userInfoDocSnap = await getDoc(userInfoDocRef);
        // 유저정보에 롤링페이퍼 전송했음을 업데이트
        if (userInfoDocSnap.exists()) {
          await updateDoc(userInfoDocRef, {
            writedRollingPapers: arrayUnion(newSend),
          });
        } else {
          await setDoc(userInfoDocRef, {
            writedRollingPapers: [newSend],
          });
        }

        return { success: true, rollingPaper: newRollingPaper };
      } catch (error) {
        console.error('Error adding rolling paper:', error);
        throw error;
      }
    },
    onSuccess,
    onError,
  });
};
