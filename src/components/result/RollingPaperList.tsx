import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, X } from 'lucide-react';
import { useState } from 'react';

import cloverSvg from '@/assets/images/result/clover.svg';
import { Button } from '@/elements/button';
import { Card, CardContent, CardHeader } from '@/elements/card';
import { ROLLING_PAPER_IMAGES } from '@/utils/rollingUtils';

interface IRollingPaper {
  id: number;
  content: string;
  author: string;
  showAuthor: boolean;
}

const MOCK_ROLLING_PAPERS: IRollingPaper[] = [
  {
    id: 1,
    content:
      '얘들아 3년동안 즐거웠고 나중에 보자 얘들아 3년동안 즐거웠고 나중에 보자 얘들아 3년동안 즐거웠고 나중에 보자 얘들아 3년동안 즐거웠고 나중에 보자 얘들아 3년동안 즐거웠고 나중에 보자 얘들아 3년동안 즐거웠고 나중에 보자 얘들아 3년동안 즐거웠고 나중에 보자',
    author: '작성자 1',
    showAuthor: true,
  },
  {
    id: 2,
    content:
      '얘들아 3년동안 즐거웠고 나중에 보자 얘들아 3년동안 즐거웠고 나중에 보자 얘들아 3년동안 즐거웠고 나중에 보자 얘들아 3년동안 즐거웠고 나중에 보자 얘들아 3년동안 즐거웠고 나중에 보자 얘들아 3년동안 즐거웠고 나중에 보자 얘들아 3년동안 즐거웠고 나중에 보자',
    author: '작성자 2',
    showAuthor: true,
  },
  {
    id: 3,
    content:
      '얘들아 3년동안 즐거웠고 나중에 보자 얘들아 3년동안 즐거웠고 나중에 보자 얘들아 3년동안 즐거웠고 나중에 보자 얘들아 3년동안 즐거웠고 나중에 보자 얘들아 3년동안 즐거웠고 나중에 보자 얘들아 3년동안 즐거웠고 나중에 보자 얘들아 3년동안 즐거웠고 나중에 보자',
    author: '작성자 3',
    showAuthor: true,
  },
  {
    id: 4,
    content:
      '얘들아 3년동안 즐거웠고 나중에 보자 얘들아 3년동안 즐거웠고 나중에 보자 얘들아 3년동안 즐거웠고 나중에 보자 얘들아 3년동안 즐거웠고 나중에 보자 얘들아 3년동안 즐거웠고 나중에 보자 얘들아 3년동안 즐거웠고 나중에 보자 얘들아 3년동안 즐거웠고 나중에 보자',
    author: '작성자 4',
    showAuthor: false,
  },
  {
    id: 5,
    content:
      '얘들아 3년동안 즐거웠고 나중에 보자 얘들아 3년동안 즐거웠고 나중에 보자 얘들아 3년동안 즐거웠고 나중에 보자 얘들아 3년동안 즐거웠고 나중에 보자 얘들아 3년동안 즐거웠고 나중에 보자 얘들아 3년동안 즐거웠고 나중에 보자 얘들아 3년동안 즐거웠고 나중에 보자',
    author: '작성자 5',
    showAuthor: true,
  },
  {
    id: 6,
    content:
      '얘들아 3년동안 즐거웠고 나중에 보자 얘들아 3년동안 즐거웠고 나중에 보자 얘들아 3년동안 즐거웠고 나중에 보자 얘들아 3년동안 즐거웠고 나중에 보자 얘들아 3년동안 즐거웠고 나중에 보자 얘들아 3년동안 즐거웠고 나중에 보자 얘들아 3년동안 즐거웠고 나중에 보자',
    author: '작성자 6',
    showAuthor: true,
  },
  {
    id: 7,
    content: '롤링 페이퍼 7',
    author: '작성자 7',
    showAuthor: true,
  },
  {
    id: 8,
    content: '롤링 페이퍼 8',
    author: '작성자 8',
    showAuthor: true,
  },
  {
    id: 9,
    content: '롤링 페이퍼 9',
    author: '작성자 9',
    showAuthor: true,
  },
  {
    id: 10,
    content: '롤링 페이퍼 10',
    author: '작성자 10',
    showAuthor: true,
  },
  {
    id: 11,
    content: '롤링 페이퍼 11',
    author: '작성자 11',
    showAuthor: true,
  },
  {
    id: 12,
    content: '롤링 페이퍼 12',
    author: '작성자 12',
    showAuthor: true,
  },
  {
    id: 13,
    content: '롤링 페이퍼 13',
    author: '작성자 13',
    showAuthor: true,
  },
  {
    id: 14,
    content: '롤링 페이퍼 14 ',
    author: '작성자 14',
    showAuthor: true,
  },
];

const RollingPaperList = ({ id }: { id: string }) => {
  console.log('id', id);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const rollingPapers = MOCK_ROLLING_PAPERS;

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

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
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
              <img src={cloverSvg} alt="클로버" className="w-5 h-5" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              롤링페이퍼
            </h2>
          </div>
        </CardHeader>

        <CardContent className="text-center py-4">
          {!isExpanded ? (
            <div className="space-y-4">
              <div className="relative">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center shadow-lg animate-bounce-slow">
                  <div className="text-2xl md:text-3xl">📝</div>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping opacity-60" />
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-orange-400 rounded-full animate-pulse opacity-60" />
              </div>

              <div className="space-y-3">
                <h3 className="text-lg md:text-xl font-semibold text-gray-700">
                  동료들이 남긴 따뜻한 메시지를 확인해보세요!
                </h3>
                <p className="text-sm text-gray-500">총 {rollingPapers.length}개의 메시지가 있습니다</p>
                <Button
                  onClick={toggleExpanded}
                  className="bg-gradient-to-br from-yellow-500 via-orange-500 to-amber-500 hover:brightness-95 text-white text-sm px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-200 rounded-md flex items-center gap-2"
                >
                  메시지 보기
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg md:text-xl font-semibold text-gray-700">롤링페이퍼 메시지들</h3>
                <Button
                  onClick={toggleExpanded}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 border-amber-200 text-amber-700 hover:bg-amber-50"
                >
                  접기
                  <ChevronUp className="w-4 h-4" />
                </Button>
              </div>

              {/* Rolling Papers Grid */}
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-4">
                  {rollingPapers.map((paper) => (
                    <Card
                      key={paper.id}
                      className="relative cursor-pointer transform transition-all duration-200 hover:scale-102 shadow-none border-none rounded-none overflow-visible bg-transparent p-0"
                      onClick={() => openModal(paper.id)}
                    >
                      <CardContent className="p-0">
                        <img src={ROLLING_PAPER_IMAGES[paper.id % 6]} alt="롤링페이퍼 배경" className="w-full h-auto" />
                        <div className="absolute inset-0 p-6">
                          <h3 className="font-semibold text-card-foreground text-lg mt-4 sm:mt-8">
                            {paper.showAuthor ? paper.author : '익명'}
                          </h3>
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
          )}

          {/* 장식적인 구분선 */}
          <div className="mt-6 w-20 h-0.5 bg-gradient-to-r from-transparent via-amber-300 to-transparent mx-auto" />
        </CardContent>
      </Card>

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
            <Card className="shadow-2xl m-8">
              <CardContent className="px-6 py-8">
                <div className="flex justify-between items-start mb-6">
                  {currentPaper.showAuthor ? (
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

export default RollingPaperList;
