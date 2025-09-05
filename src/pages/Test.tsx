import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { getAllUsers } from '@/apis/users';

import matchResultData from '../assets/result/match-result.json';

interface MatchResult {
  targetId: string;
  taste: number; //입밋
  values: number; // 가치관
  personality: number; // 성향
  total: number;
}

interface UserTopMatches {
  userId: string;
  topMatches: MatchResult[];
}

const Test = () => {
  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
    placeholderData: {},
    staleTime: 5 * 60 * 1000, // 분
  });

  const [userTopMatches, setUserTopMatches] = useState<UserTopMatches[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // JSON 데이터에서 각 사용자별로 total이 가장 높은 5명 추출
    const processMatchData = () => {
      const results: UserTopMatches[] = [];

      Object.entries(matchResultData).forEach(([userId, matches]) => {
        // 보정된 점수 기준으로 내림차순 정렬 후 상위 5명 선택
        const topMatches = (matches as MatchResult[])
          .map((match) => ({
            ...match,
            adjustedScore: match.personality * 4 + match.values * 4 + match.taste * 2,
          }))
          .sort((a, b) => b.adjustedScore - a.adjustedScore)
          .slice(0, 5);

        results.push({
          userId,
          topMatches,
        });
      });

      // 사용자별로 정렬 (userId 기준)
      results.sort((a, b) => a.userId.localeCompare(b.userId));

      setUserTopMatches(results);
      setLoading(false);
    };

    processMatchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">데이터를 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">사용자별 매칭 결과 TOP 5</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userTopMatches.map(({ userId, topMatches }) => (
            <div key={userId} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-blue-600 border-b pb-2">{data?.[userId]?.name}</h2>

              <div className="space-y-3">
                {topMatches.map((match, index) => (
                  <div
                    key={match.targetId}
                    className={`p-3 rounded-lg border-l-4 ${
                      index === 0
                        ? 'border-red-500 bg-red-50'
                        : index === 1
                          ? 'border-orange-500 bg-orange-50'
                          : index === 2
                            ? 'border-yellow-500 bg-yellow-50'
                            : index === 3
                              ? 'border-green-500 bg-green-50'
                              : index === 4
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-300 bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-gray-800">{data?.[match.targetId]?.name}</div>
                        <div className="text-sm text-gray-600">#{index + 1} 순위</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">{match.total}</div>
                        <div className="text-xs text-gray-500">총점</div>
                        <div className="text-lg font-semibold text-red-600">
                          {match.personality * 4 + match.values * 4 + match.taste * 2}
                        </div>
                        <div className="text-xs text-gray-500">보정점수</div>
                      </div>
                    </div>

                    <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center">
                        <div className="font-medium text-green-600">입맛</div>
                        <div>{match.taste}</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-purple-600">가치관</div>
                        <div>{match.values}</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-pink-600">성향</div>
                        <div>{match.personality}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-gray-600">
          <p>총 {userTopMatches.length}명의 사용자 데이터</p>
        </div>
      </div>
    </div>
  );
};

export default Test;
