import { useQueryClient } from '@tanstack/react-query';
import { Send, X } from 'lucide-react';
import { type ReactNode, useState } from 'react';
import { toast } from 'sonner';

import { useAddRollingPaper } from '@/apis/rollingPapers';
import type { User } from '@/apis/users';
import letterSvg from '@/assets/images/result/letter.svg';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/elements/button';
import { Checkbox } from '@/elements/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/elements/dialog';
import { Toaster } from '@/elements/sonner';
import { Textarea } from '@/elements/textarea';
interface Props {
  renderTrigger: () => ReactNode;
  userData: User;
}
const MAX_MESSAGE_LENGTH = 500;

export const RollingPaperWriteDialog = ({ renderTrigger, userData }: Props) => {
  const name = userData.name;
  const gitId = userData.id;
  const [newMessage, setNewMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const handleClose = () => {
    setNewMessage('');
    setIsAnonymous(false);
    setIsOpen(false);
  };

  const queryClient = useQueryClient();

  const { mutate: addRollingPaper, isPending } = useAddRollingPaper({
    onSuccess: () => {
      // 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['user', user?.id || ''] });

      setTimeout(() => {
        handleClose();
        toast.success('롤링페이퍼 작성 완료!', {
          position: 'top-center',
          description: '메시지가 전달되었습니다',
        });
      }, 100);
    },
    onError: (error) => {
      console.error('Failed to add rolling paper:', error);
    },
  });

  const handleCreateNote = () => {
    if (!user) {
      console.error('User not found');
      return;
    }

    addRollingPaper({
      receiverId: gitId,
      rollingPaper: { message: newMessage, writer: isAnonymous ? '' : user.name },
      senderId: user?.id,
    });
  };

  return (
    <>
      <Toaster />
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild className="cursor-pointer">
          {renderTrigger()}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <div className="relative mb-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center shadow-lg">
                <img src={letterSvg} alt="편지 이모지" className="w-10 h-10" />
              </div>
            </div>
            <DialogTitle className="text-xl font-bold text-gray-800 mb-2">{name}에게 보내는 편지</DialogTitle>
            <p className="text-sm text-gray-600">10주간 함께한 추억을 담아보세요 💝</p>
          </DialogHeader>
          <div className="space-y-6">
            {/* 편지 내용 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <label className="text-sm font-semibold text-gray-700">To. {name}</label>
              </div>
              <div className="relative">
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={`${name}님과 어떤 일들이 있었나요?`}
                  className="bg-gradient-to-br from-pink-50/50 to-purple-50/50 border-2 border-pink-200/50 min-h-[160px] max-h-[200px] resize-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100 transition-all duration-200 overflow-y-auto"
                  maxLength={MAX_MESSAGE_LENGTH}
                />
                <div className="absolute bottom-2 right-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      newMessage.length > MAX_MESSAGE_LENGTH * 0.9
                        ? 'bg-red-100 text-red-600'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {newMessage.length}/{MAX_MESSAGE_LENGTH}
                  </span>
                </div>
              </div>
            </div>

            {/* 익명 체크박스 */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Checkbox
                id="anonymous"
                checked={isAnonymous}
                onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
                className="border-pink-300 data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
              />
              <label htmlFor="anonymous" className="text-sm text-gray-700 cursor-pointer flex items-center gap-2">
                <span className="text-lg">🤫</span>
                익명으로 남기기
              </label>
            </div>

            {/* 버튼들 */}
            <div className="flex gap-3 pt-2">
              <Button
                onClick={handleCreateNote}
                disabled={!newMessage.trim() || isPending}
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4 mr-2" />
                {isPending ? '작성 중...' : '보내기'}
              </Button>
              <Button
                variant="outline"
                onClick={handleClose}
                className="flex-1 border-gray-300 hover:bg-gray-50 transition-all duration-200"
              >
                <X className="w-4 h-4 mr-2" />
                취소
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
