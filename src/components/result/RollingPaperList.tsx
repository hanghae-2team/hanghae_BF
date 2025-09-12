import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useState } from 'react';

import { getRollingPaper } from '@/apis/rollingPapers';
import { getUser } from '@/apis/users';
import letterSvg from '@/assets/images/result/letter.svg';
import { Button } from '@/elements/button';
import { Card, CardContent, CardHeader } from '@/elements/card';
import { ROLLING_PAPER_IMAGES } from '@/utils/rollingUtils';

const RollingPaperList = ({ id }: { id: string }) => {
  const { data: userData } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id!),
    select: (res) => res.data,
    enabled: !!id,
  });

  const { data: rollingPapersData } = useQuery({
    queryKey: ['rollingPapers', id],
    queryFn: () => getRollingPaper(id),
    enabled: !!id,
  });
  const rollingPapers = rollingPapersData?.rollingPapers || [];

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
      <Card className="gap-2 bg-gradient-to-br from-amber-50/50 via-orange-50/50 to-yellow-50/50 border-2 border-dashed border-amber-200/50">
        <CardHeader className="text-center pb-4">
          <div className="flex flex-col items-center justify-center gap-3 mb-2">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              {userData?.name}의 롤링페이퍼
            </h2>
            <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-300 to-transparent mx-auto" />
          </div>
          <div className="flex items-center justify-end gap-2">
            <img src={letterSvg} alt="편지" className="w-6 h-6" />
            <p className="text-sm text-gray-500 text-end whitespace-nowrap">
              총 {rollingPapers.length}개의 메시지가 도착했습니다
            </p>
          </div>
        </CardHeader>

        <CardContent className="text-center py-4">
          <div className="space-y-4">
            {/* Rolling Papers Grid */}
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 min-[540px]:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-4">
                {rollingPapersData?.rollingPapers.map((paper, index) => (
                  <Card
                    key={paper.id}
                    className="relative cursor-pointer transform transition-all duration-200 hover:scale-102 shadow-none border-none rounded-none overflow-visible bg-transparent p-0"
                    onClick={() => openModal(paper.id)}
                  >
                    <CardContent className="p-0">
                      <img src={ROLLING_PAPER_IMAGES[index % 6]} alt="롤링페이퍼 배경" className="w-full h-auto" />
                      <div className="absolute inset-0 p-6 min-[540px]:p-4 lg:p-5">
                        <h3 className="font-semibold text-card-foreground text-md mt-4 sm:mt-8">
                          {paper.writer !== '' ? paper.writer : '익명'}
                        </h3>
                        <p className="text-sm text-card-foreground line-clamp-5 min-[318px]:line-clamp-7  min-[338px]:line-clamp-8 min-[358px]:line-clamp-9 min-[410px]:line-clamp-12 min-[540px]:line-clamp-8 min-[660px]:line-clamp-10 lg:line-clamp-9 leading-relaxed mt-1 sm:mt-3">
                          {paper.message}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* 장식적인 구분선 */}
          <div className="mt-6 w-20 h-0.5 bg-gradient-to-r from-transparent via-amber-300 to-transparent mx-auto" />
        </CardContent>
      </Card>

      {/* Modal Overlay */}
      {selectedPaper && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 z-50" onClick={closeModal}>
          <div className="relative max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <Button
              variant="outline"
              size="icon"
              className="absolute -top-[-40px] right-[40px] bg-[#d9d9d900] hover:bg-[#d9d9d940] rounded-full border-none w-8 h-8 p-0"
              onClick={closeModal}
            >
              <X size={32} />
            </Button>

            {/* Navigation Buttons */}
            <Button
              variant="outline"
              className="absolute left-[-12px] top-1/2 transform -translate-y-1/2 bg-[#d9d9d980] hover:bg-[#d9d9d9c0] rounded-full border-none w-10 h-10 p-0"
              onClick={goToPrevious}
            >
              <ChevronLeft size={24} className="text-gray-50" />
            </Button>

            <Button
              variant="outline"
              className="absolute right-[-12px] top-1/2 transform -translate-y-1/2 bg-[#d9d9d980] hover:bg-[#d9d9d9c0] rounded-full border-none w-10 h-10 p-0"
              onClick={goToNext}
            >
              <ChevronRight size={24} className="text-gray-50" />
            </Button>

            {/* Modal Card */}
            <Card className="shadow-2xl m-8">
              <CardContent className="px-5 lg:px-6 py-8">
                <div className="flex justify-between items-start mb-6">
                  {currentPaper.writer !== '' ? (
                    <h2 className="text-2xl font-bold text-card-foreground">{currentPaper.writer}</h2>
                  ) : (
                    <h2 className="text-2xl font-bold text-card-foreground">익명</h2>
                  )}
                </div>
                <p className="text-card-foreground text-md leading-relaxed min-h-[100px]">{currentPaper.message}</p>
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

export default RollingPaperList;
