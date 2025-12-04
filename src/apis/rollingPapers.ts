import { useMutation } from '@tanstack/react-query';

import rollingPapersData from '@/data/rollingPapers.json';

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

export interface RollingPaperResult extends RollingPaper {
  id: number;
}
export interface RollingPaperResponse {
  rollingPapers: RollingPaperResult[];
}

// JSON 데이터 타입
interface RollingPaperData {
  id: string;
  rollingPapers: RollingPaperRequest[];
}

// JSON 데이터를 타입으로 캐스팅
const rollingPapers = rollingPapersData as RollingPaperData[];

export const getRollingPaper = async (receiverId: string): Promise<RollingPaperResponse> => {
  const data = rollingPapers.find((rp) => rp.id === receiverId);

  if (!data) {
    return { rollingPapers: [] };
  }

  // id를 number로 변환하여 반환
  const papers = data.rollingPapers.map((paper, index) => ({
    id: index,
    message: paper.message,
    writer: paper.writer,
  }));

  return { rollingPapers: papers };
};

export const useAddRollingPaper = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error: unknown) => void;
}) => {
  return useMutation({
    mutationFn: async ({ receiverId, rollingPaper }: AddRollingPaperParams) => {
      // JSON은 읽기 전용이므로 성공 응답만 반환
      const newRollingPaper: RollingPaperRequest = {
        id: crypto.randomUUID(),
        message: rollingPaper.message,
        writer: rollingPaper.writer || '',
      };

      console.log(`롤링페이퍼 작성 (읽기 전용 모드): ${receiverId}`, newRollingPaper);

      return { success: true, rollingPaper: newRollingPaper };
    },
    onSuccess,
    onError,
  });
};
