import { useState } from 'react';

import { Badge } from '@/elements/badge';
import { Button } from '@/elements/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/elements/card';
import { Label } from '@/elements/label';

// 취미 데이터 타입 정의
interface Hobby {
  id: string;
  name: string;
  category: string;
  icon: string;
  color: string;
  hoverColor: string;
  description: string;
}

// 취미 데이터
const hobbies: Hobby[] = [
  // 게임/엔터테인먼트
  {
    id: 'boardgame',
    name: '보드게임',
    category: '게임',
    icon: '/images/hobby/Game die.png',
    color: 'bg-blue-50 border-blue-200',
    hoverColor: 'bg-blue-100 border-blue-300',
    description: '전략과 재미의 보드게임',
  },
  {
    id: 'console',
    name: '콘솔게임',
    category: '게임',
    icon: '/images/hobby/Video game.png',
    color: 'bg-green-50 border-green-200',
    hoverColor: 'bg-green-100 border-green-300',
    description: '콘솔로 즐기는 게임',
  },
  {
    id: 'pcgame',
    name: 'PC게임',
    category: '게임',
    icon: '/images/hobby/Joystick.png',
    color: 'bg-purple-50 border-purple-200',
    hoverColor: 'bg-purple-100 border-purple-300',
    description: 'PC로 즐기는 게임',
  },
  {
    id: 'escape',
    name: '방탈출',
    category: '게임',
    icon: '/images/hobby/Door.png',
    color: 'bg-red-50 border-red-200',
    hoverColor: 'bg-red-100 border-red-300',
    description: '수수께끼를 풀어 탈출하기',
  },

  // 예술/창작
  {
    id: 'photography',
    name: '사진 찍기',
    category: '예술',
    icon: '/images/hobby/Camera.png',
    color: 'bg-amber-50 border-amber-200',
    hoverColor: 'bg-amber-100 border-amber-300',
    description: '순간을 영원히 담기',
  },
  {
    id: 'reading',
    name: '독서',
    category: '예술',
    icon: '/images/hobby/Books.png',
    color: 'bg-indigo-50 border-indigo-200',
    hoverColor: 'bg-indigo-100 border-indigo-300',
    description: '지식과 상상력의 확장',
  },
  {
    id: 'dance',
    name: '댄스',
    category: '예술',
    icon: '/images/hobby/Dancing.png',
    color: 'bg-pink-50 border-pink-200',
    hoverColor: 'bg-pink-100 border-pink-300',
    description: '음악에 맞춰 춤추기',
  },
  {
    id: 'kono',
    name: '코노',
    category: '예술',
    icon: '/images/hobby/Microphone.png',
    color: 'bg-orange-50 border-orange-200',
    hoverColor: 'bg-orange-100 border-orange-300',
    description: '창의적인 놀이',
  },
  {
    id: 'coding',
    name: '코딩',
    category: '기술',
    icon: '/images/hobby/Laptop.png',
    color: 'bg-gray-50 border-gray-200',
    hoverColor: 'bg-gray-100 border-gray-300',
    description: '논리적 사고와 창작',
  },

  // 음식/음료
  {
    id: 'soccer',
    name: '축구',
    category: '운동',
    icon: '/images/hobby/Soccer ball.png',
    color: 'bg-amber-50 border-amber-200',
    hoverColor: 'bg-amber-100 border-amber-300',
    description: '축구를 즐기기',
  },
  {
    id: 'beer',
    name: '음주',
    category: '음식',
    icon: '/images/hobby/Beer mug.png',
    color: 'bg-yellow-50 border-yellow-200',
    hoverColor: 'bg-yellow-100 border-yellow-300',
    description: '맥주와 함께하는 시간',
  },

  // 운동/스포츠
  {
    id: 'hiking',
    name: '등산',
    category: '운동',
    icon: '/images/hobby/Snow-capped mountain.png',
    color: 'bg-green-50 border-green-200',
    hoverColor: 'bg-green-100 border-green-300',
    description: '산을 오르며 자연을 느끼기',
  },
  {
    id: 'climbing',
    name: '클라이밍',
    category: '운동',
    icon: '/images/hobby/Climbing.png',
    color: 'bg-red-50 border-red-200',
    hoverColor: 'bg-red-100 border-red-300',
    description: '벽을 타며 도전하기',
  },
  {
    id: 'walking',
    name: '산책',
    category: '운동',
    icon: '/images/hobby/Walking.png',
    color: 'bg-blue-50 border-blue-200',
    hoverColor: 'bg-blue-100 border-blue-300',
    description: '천천히 걸으며 여유를 즐기기',
  },
  {
    id: 'baseball',
    name: '야구',
    category: '운동',
    icon: '/images/hobby/Baseball.png',
    color: 'bg-green-50 border-green-200',
    hoverColor: 'bg-green-100 border-green-300',
    description: '야구로 운동하기',
  },
  {
    id: 'exercise',
    name: '운동',
    category: '운동',
    icon: '/images/hobby/Tennis.png',
    color: 'bg-red-50 border-red-200',
    hoverColor: 'bg-red-100 border-red-300',
    description: '체력 단련과 건강 관리',
  },

  // 엔터테인먼트
  {
    id: 'anime',
    name: '애니메이션',
    category: '엔터테인먼트',
    icon: '/images/hobby/Television.png',
    color: 'bg-purple-50 border-purple-200',
    hoverColor: 'bg-purple-100 border-purple-300',
    description: '애니메이션 감상하기',
  },
  {
    id: 'movie',
    name: '영화',
    category: '엔터테인먼트',
    icon: '/images/hobby/Clapper board.png',
    color: 'bg-slate-50 border-slate-200',
    hoverColor: 'bg-slate-100 border-slate-300',
    description: '다양한 이야기와 감동',
  },
  {
    id: 'knitting',
    name: '뜨개질',
    category: '예술',
    icon: '/images/hobby/Yarn.png',
    color: 'bg-pink-50 border-pink-200',
    hoverColor: 'bg-pink-100 border-pink-300',
    description: '뜨개질로 창작하기',
  },
  {
    id: 'travel',
    name: '여행',
    category: '여행',
    icon: '/images/hobby/Airplane.png',
    color: 'bg-teal-50 border-teal-200',
    hoverColor: 'bg-teal-100 border-teal-300',
    description: '새로운 경험과 발견',
  },
  {
    id: 'camping',
    name: '캠핑',
    category: '여행',
    icon: '/images/hobby/Camping.png',
    color: 'bg-green-50 border-green-200',
    hoverColor: 'bg-green-100 border-green-300',
    description: '자연 속에서 캠핑하기',
  },

  // 음식/요리
  {
    id: 'cooking',
    name: '요리',
    category: '음식',
    icon: '/images/hobby/Cook.png',
    color: 'bg-orange-50 border-orange-200',
    hoverColor: 'bg-orange-100 border-orange-300',
    description: '맛과 창의성의 조화',
  },
  {
    id: 'sleeping',
    name: '잠자기',
    category: '휴식',
    icon: '/images/hobby/Yawning face.png',
    color: 'bg-blue-50 border-blue-200',
    hoverColor: 'bg-blue-100 border-blue-300',
    description: '충분한 휴식과 수면',
  },
  {
    id: 'cafe',
    name: '카페 탐방',
    category: '음식',
    icon: '/images/hobby/Hot beverage.png',
    color: 'bg-amber-50 border-amber-200',
    hoverColor: 'bg-amber-100 border-amber-300',
    description: '다양한 카페를 찾아다니기',
  },
  {
    id: 'restaurant',
    name: '맛집 탐방',
    category: '음식',
    icon: '/images/hobby/Fork and knife with plate.png',
    color: 'bg-red-50 border-red-200',
    hoverColor: 'bg-red-100 border-red-300',
    description: '맛있는 음식점 찾기',
  },

  // 문화/예술
  {
    id: 'musical',
    name: '뮤지컬',
    category: '문화',
    icon: '/images/hobby/Circus tent.png',
    color: 'bg-purple-50 border-purple-200',
    hoverColor: 'bg-purple-100 border-purple-300',
    description: '뮤지컬 공연 감상',
  },
  {
    id: 'writing',
    name: '글쓰기',
    category: '예술',
    icon: '/images/hobby/Pencil.png',
    color: 'bg-indigo-50 border-indigo-200',
    hoverColor: 'bg-indigo-100 border-indigo-300',
    description: '생각과 감정을 글로 표현',
  },
  {
    id: 'crane',
    name: '인형 뽑기',
    category: '게임',
    icon: '/images/hobby/Teddy bear.png',
    color: 'bg-pink-50 border-pink-200',
    hoverColor: 'bg-pink-100 border-pink-300',
    description: '인형 뽑기 게임',
  },
  {
    id: 'drawing',
    name: '그림 그리기',
    category: '예술',
    icon: '/images/hobby/Artist palette.png',
    color: 'bg-pink-50 border-pink-200',
    hoverColor: 'bg-pink-100 border-pink-300',
    description: '색과 선으로 표현하기',
  },

  // 음악
  {
    id: 'music',
    name: '음악듣기',
    category: '음악',
    icon: '/images/hobby/Headphone.png',
    color: 'bg-indigo-50 border-indigo-200',
    hoverColor: 'bg-indigo-100 border-indigo-300',
    description: '다양한 음악 감상하기',
  },
];

export const HobbySelect = () => {
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
  const [, setCurrentStep] = useState(1);

  // 최대 선택 개수 상수
  const MAX_SELECTIONS = 5;

  // 취미 선택/해제 핸들러
  const toggleHobby = (hobbyId: string) => {
    setSelectedHobbies((prev) => {
      const isCurrentlySelected = prev.includes(hobbyId);

      if (isCurrentlySelected) {
        // 이미 선택된 취미라면 해제
        const newSelection = prev.filter((id) => id !== hobbyId);
        return newSelection;
      } else {
        // 최대 선택 개수 체크
        if (prev.length >= MAX_SELECTIONS) {
          return prev;
        }
        // 새로운 취미 추가
        const newSelection = [...prev, hobbyId];
        return newSelection;
      }
    });
  };

  // 모든 취미 목록 (필터링 없음)
  const allHobbies = hobbies;

  // 다음 단계로 진행
  const handleNext = () => {
    if (selectedHobbies.length > 0) {
      setCurrentStep(2);
      console.log('선택된 취미:', selectedHobbies);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <Card className="mb-6 border-0 shadow-xl bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-indigo-100/20 to-purple-100/20"></div>
          <CardHeader className="text-center relative z-10 py-8">
            <div className="mb-4">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br bg-white rounded-full mb-3 shadow-lg">
                <img src="/Party popper.png" alt="Party" className="w-16 h-16 object-contain" />
              </div>
            </div>
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-3">
              취미를 선택해주세요
            </CardTitle>
          </CardHeader>
        </Card>

        {/* 진행 상태 */}
        <Card className="mb-6 border-0 shadow-md bg-white/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <Label className="text-sm font-medium text-slate-700">
                ({selectedHobbies.length}/{MAX_SELECTIONS}개 선택)
                <CardDescription className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
                  <span className="font-semibold text-blue-600">최소 1개에서 최대 5개까지 선택 가능</span>
                </CardDescription>
              </Label>
            </div>
            {selectedHobbies.length >= MAX_SELECTIONS && (
              <p className="text-sm text-amber-600 mt-2 text-center">
                최대 {MAX_SELECTIONS}개까지 선택되었습니다. 더 선택하려면 기존 선택을 해제해주세요.
              </p>
            )}
          </CardContent>
        </Card>

        {/* 취미 선택 그리드 */}
        <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 mb-8">
          {allHobbies.map((hobby) => {
            const isSelected = selectedHobbies.includes(hobby.id);
            const isDisabled = !isSelected && selectedHobbies.length >= MAX_SELECTIONS;

            return (
              <Button
                key={hobby.id}
                variant={isSelected ? 'default' : 'outline'}
                disabled={isDisabled}
                data-hobby-id={hobby.id}
                data-hobby-name={hobby.name}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleHobby(hobby.id);
                }}
                className={`
                    relative z-10
                    h-auto min-h-[80px] sm:min-h-[90px] md:min-h-[100px]
                    flex flex-col items-center justify-center gap-2
                    p-3 sm:p-4
                    pointer-events-auto
                    ${
                      isSelected
                        ? 'bg-gray-700 text-white shadow-lg scale-105'
                        : isDisabled
                          ? 'opacity-50 cursor-not-allowed bg-white'
                          : 'bg-white hover:bg-gray-50 hover:scale-105 hover:shadow-md'
                    }
                    transition-all duration-200
                  `}
              >
                <img src={hobby.icon} alt={hobby.name} className="w-10 h-10 object-contain" />
                <div className="text-xs sm:text-sm font-medium leading-tight">{hobby.name}</div>
                {isSelected && (
                  <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center">
                    <span className="text-black text-xs">✓</span>
                  </div>
                )}
              </Button>
            );
          })}
        </div>

        {/* 선택된 취미 미리보기 */}
        {selectedHobbies.length > 0 && (
          <Card className="mb-6 border-0 shadow-md bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-800">
                선택된 취미 ({selectedHobbies.length}개)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {selectedHobbies.map((hobbyId) => {
                  const hobby = hobbies.find((h) => h.id === hobbyId);
                  return (
                    <Badge
                      key={hobbyId}
                      variant="secondary"
                      className="inline-flex items-center gap-2 px-3 py-2 text-sm"
                    >
                      {hobby?.icon && <img src={hobby.icon} alt={hobby.name} className="w-5 h-5 object-contain" />}{' '}
                      {hobby?.name}
                    </Badge>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 하단 버튼 */}
        <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex justify-center items-center">
              <Button onClick={handleNext} disabled={selectedHobbies.length === 0} size="lg" className="px-8">
                완료
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
