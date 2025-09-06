import { useQuery } from '@tanstack/react-query';
import { PencilLine } from 'lucide-react';

import { getUser, type User } from '@/apis/users';
import { RollingPaperWriteDialog } from '@/components/result/RollingPaperWriteDialog';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/elements/avatar';
import { Badge } from '@/elements/badge';
import { Button } from '@/elements/button';
import { Card, CardContent, CardHeader } from '@/elements/card';
import { HOBBIES } from '@/utils/hobbyUtils';

const mapHobbyIdsToNames = (id: string): string => {
  return HOBBIES.find((hobby) => hobby.id === id)?.name || '';
};

type Props = {
  userData: User;
};

const UserProfile = ({ userData }: Props) => {
  const { user: currentUser } = useAuth();

  const { data: currentUserData } = useQuery({
    queryKey: ['user', currentUser?.id || ''],
    queryFn: () => getUser(currentUser?.id || ''),
    select: (res) => res.data,
    enabled: !!currentUser?.id,
  });

  const isAlreadyWrite = currentUserData?.writedRollingPapers?.some(
    (rollingPaper) => rollingPaper.receiverId === userData.id
  );
  return (
    <Card className="gap-2 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50 border-2 border-dashed border-blue-200/50">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex gap-4 items-center flex-1">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-sm opacity-30"></div>
              <Avatar className="size-16 border-2 border-white shadow-lg relative">
                <AvatarImage src={userData.image} />
                <AvatarFallback className="text-lg font-semibold">{userData.name}</AvatarFallback>
              </Avatar>
            </div>

            <div className="text-left">
              <h1 className="text-xl font-bold text-gray-800 mb-1">{userData.name}</h1>
              <a href={userData.link} target="_blank" rel="noopener noreferrer">
                <p className="text-sm text-gray-600 hover:underline hover:text-blue-600 transition-colors">
                  @{userData.id}
                </p>
              </a>
            </div>
          </div>

          <div className="flex-shrink-0">
            <RollingPaperWriteDialog
              renderTrigger={() => (
                <Button className="text-white bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 hover:brightness-95 text-sm px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-200">
                  <PencilLine size={16} />
                  <span className="ml-2">롤링페이퍼 {isAlreadyWrite ? '또' : ''} 쓰기</span>
                </Button>
              )}
              userData={userData}
            />
          </div>
        </div>
      </CardHeader>

      {userData.hobbies && (
        <CardContent className="pt-0">
          <div className="text-left">
            <div className="flex flex-wrap gap-2">
              {userData.hobbies.map((hobby: string) => (
                <Badge
                  key={`${userData.id}-${hobby}`}
                  className="bg-slate-600 text-white hover:bg-slate-700 transition-all duration-200 shadow-sm"
                >
                  {mapHobbyIdsToNames(hobby)}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default UserProfile;
