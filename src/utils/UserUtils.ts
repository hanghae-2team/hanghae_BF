import type { User } from '@/apis/users';

type UserRawData = {
  [key: string]: Omit<User, 'id'>;
};

export const convertRawDataToUsers = (rawData: UserRawData): User[] => {
  return Object.entries(rawData).map(([userId, userData]) => ({
    id: userId,
    ...userData,
  }));
};

export const findUserById = (rawData: UserRawData, id?: string) => {
  if (!id) throw Error('');
  const user = rawData[id];
  if (user) return user;
  throw Error('유저가 없습니다.');
};

// team 타입을 한국어로 변환하는 함수
export const getTeamDisplayName = (team: User['team']): string => {
  const teamNames: Record<User['team'], string> = {
    coach: '코치',
    manager: '매니저',
    '1': '1팀',
    '2': '2팀',
    '3': '3팀',
    '4': '4팀',
    '5': '5팀',
    '6': '6팀',
    '7': '7팀',
    '8': '8팀',
    '9': '9팀',
  };
  return teamNames[team] || team;
};

// 사용자 배열을 team별로 그룹화하는 함수
export const groupUsersByTeam = (users: User[]): Record<string, User[]> => {
  return users.reduce(
    (groups, user) => {
      const teamName = getTeamDisplayName(user.team);
      if (!groups[teamName]) {
        groups[teamName] = [];
      }
      groups[teamName].push(user);
      return groups;
    },
    {} as Record<string, User[]>
  );
};

// team별 정렬 순서 정의
export const getTeamOrder = (): User['team'][] => ['coach', 'manager', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// 정렬된 team별 그룹 반환
export const getSortedTeamGroups = (users: User[]): Array<{ teamName: string; users: User[] }> => {
  const groups = groupUsersByTeam(users);
  const teamOrder = getTeamOrder();

  return teamOrder
    .map((team) => getTeamDisplayName(team))
    .filter((teamName) => groups[teamName] && groups[teamName].length > 0)
    .map((teamName) => ({
      teamName,
      users: groups[teamName],
    }));
};
