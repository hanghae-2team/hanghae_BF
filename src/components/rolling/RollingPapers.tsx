import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/elements/button';
import { Card, CardContent } from '@/elements/card';

import type { IRollingPaper } from '../../pages/RollingList';

interface IRollingPapersProps {
  rollingPapers: IRollingPaper[];
}

export const RollingPapers = ({ rollingPapers }: IRollingPapersProps) => {
  const [selectedPaper, setSelectedPaper] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (paperId: number) => {
    const index = rollingPapers.findIndex((paper) => paper.id === paperId);
    setCurrentIndex(index);
    setSelectedPaper(paperId);
  };

  const closeModal = () => {
    setSelectedPaper(null);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : rollingPapers.length - 1;
    setCurrentIndex(newIndex);
    setSelectedPaper(rollingPapers[newIndex].id);
  };

  const goToNext = () => {
    const newIndex = currentIndex < rollingPapers.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    setSelectedPaper(rollingPapers[newIndex].id);
  };

  const currentPaper = rollingPapers[currentIndex];

  return (
    <>
      <div>
        {/* Grid Layout */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-4">
            {rollingPapers.map((paper) => (
              <Card
                key={paper.id}
                className="relative cursor-pointer transform transition-all duration-200 hover:scale-102 shadow-none border-none rounded-none overflow-visible bg-transparent p-0"
                onClick={() => openModal(paper.id)}
              >
                <CardContent className="p-0">
                  <img
                    src={`/images/rolling/rolling_paper_${(paper.id % 6) + 1}.png`}
                    alt="롤링페이퍼 배경"
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 p-6">
                    <h3 className="font-semibold text-card-foreground text-lg mt-4 sm:mt-8">{paper.author}</h3>
                    <p className="text-card-foreground line-clamp-4 sm:line-clamp-8 lg:line-clamp-4 leading-relaxed mt-1 sm:mt-3">
                      {paper.content}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

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
