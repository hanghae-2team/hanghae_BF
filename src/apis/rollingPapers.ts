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
interface RollingPaperSenderRequest extends RollingPaperSender {
  id: string;
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
      const rollingPaperId = uuidv4();
      try {
        // 문서 존재 여부 확인
        const docSnap = await getDoc(userDocRef);

        const newRollingPaper: RollingPaperRequest = {
          id: rollingPaperId,
          message: rollingPaper.message,
          writer: rollingPaper.writer || '',
        };

        const newSender: RollingPaperSenderRequest = {
          id: rollingPaperId,
          senderId: senderId,
        };

        if (docSnap.exists()) {
          // 문서가 존재하면 배열에 추가
          await updateDoc(userDocRef, {
            rollingPapers: arrayUnion(newRollingPaper),
            rollingPaperSenders: arrayUnion(newSender),
          });
        } else {
          // 문서가 없으면 새로 생성
          await setDoc(userDocRef, {
            rollingPapers: [newRollingPaper],
            rollingPaperSenders: [newSender],
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
