import { ChevronLeft, ChevronRight, X } from 'lucide-react';

import { Button } from '@/elements/button';
import { Card, CardContent } from '@/elements/card';

interface IRollingPaper {
  id: number;
  content: string;
  author: string;
  showAuthor: boolean;
}

interface RollingModalProps {
  selectedPaper: string;
  closeModal: () => void;
  goToPrevious: () => void;
  goToNext: () => void;
  currentPaper: IRollingPaper;
  currentIndex: number;
  rollingPapers: IRollingPaper[];
}

const RollingModal = ({
  selectedPaper,
  closeModal,
  goToPrevious,
  goToNext,
  currentPaper,
  currentIndex,
  rollingPapers,
}: RollingModalProps) => {
  return (
    <>
      {/* Modal Overlay */}
      {selectedPaper && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 z-50">
          <div className="relative max-w-2xl w-full">
            {/* Close Button */}
            <Button
              variant="outline"
              size="icon"
              className="absolute -top-12 right-0 bg-[#d9d9d900] hover:bg-[#d9d9d940] rounded-full border-none w-10 h-10 p-0"
              onClick={closeModal}
            >
              <X size={28} />
            </Button>

            {/* Navigation Buttons */}
            <Button
              variant="outline"
              className="absolute left-[-12px] top-1/2 transform -translate-y-1/2 bg-[#d9d9d900] hover:bg-[#d9d9d940] rounded-full border-none w-10 h-10 p-0"
              onClick={goToPrevious}
            >
              <ChevronLeft size={24} />
            </Button>

            <Button
              variant="outline"
              className="absolute right-[-12px] top-1/2 transform -translate-y-1/2 bg-[#d9d9d900] hover:bg-[#d9d9d940] rounded-full border-none w-10 h-10 p-0"
              onClick={goToNext}
            >
              <ChevronRight size={24} />
            </Button>

            {/* Modal Card */}
            <Card className={`shadow-2xl m-8`}>
              <CardContent className="px-6 py-8">
                <div className="flex justify-between items-start mb-6">
                  {currentPaper.author ? (
                    <h2 className="text-2xl font-bold text-card-foreground">{currentPaper.author}</h2>
                  ) : (
                    <h2 className="text-2xl font-bold text-card-foreground">익명</h2>
                  )}
                </div>
                <p className="text-card-foreground text-lg leading-relaxed min-h-[100px]">{currentPaper.content}</p>
                <div className="mt-6 text-center">
                  <span className="text-sm text-muted-foreground">
                    {currentIndex + 1} / {rollingPapers.length}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default RollingModal;
