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

  const { mutate: addRollingPaper, isPending } = useAddRollingPaper({
    onSuccess: () => {
      setTimeout(() => {
        handleClose();
        toast('롤링페이퍼 작성 완료', {
          position: 'top-center',
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
            <DialogTitle className="flex flex-col items-center justify-center gap-1">
              <img src={letterSvg} alt="편지 이모지" className="w-10 h-10 object-contain" />
              <span>{name}에게 보내는 편지</span>
            </DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground text-base text-center">10주간 함께한 추억을 담아보세요</p>
          <div>
            <div className="space-y-4">
              <label className="block text-sm font-medium mb-2 text-card-foreground">To. {name}</label>
              <Textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={`${name} 님과 어떤 일들이 있었나요?`}
                className="bg-input border-border min-h-[140px]"
                maxLength={MAX_MESSAGE_LENGTH}
              />
              <p className="text-sm text-muted-foreground mt-1">
                {newMessage.length}/{MAX_MESSAGE_LENGTH}자
              </p>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <Checkbox
                id="anonymous"
                checked={isAnonymous}
                onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
              />
              <label htmlFor="anonymous" className="text-sm text-card-foreground cursor-pointer">
                익명으로 남기기
              </label>
            </div>
            <div className="flex gap-2 pt-2">
              <Button
                onClick={handleCreateNote}
                disabled={!newMessage.trim() || isPending}
                className="flex-1 bg-primary hover:bg-primary/90 cursor-pointer"
              >
                작성하기
              </Button>
              <Button variant="outline" onClick={handleClose} className="flex-1 cursor-pointer">
                취소
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
