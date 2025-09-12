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

export const USER_NAME: Record<string, string> = {
  '0miiii': '영민',
  '2Estella': '송이',
  'Amelia-Shin': '희원',
  'BBAK-jun': '준형',
  BangDori: '병준',
  DEV4N4: '산들',
  'Elli-Lee': '유진',
  'Hwirin-Kim': '휘린',
  JHeeJinDev: '희진',
  JangRuBin2: '루빈',
  'JiHoon-0330': '지훈',
  JungWoo0203: '정우',
  JunilHwang: '준일',
  Legitgoons: '의찬',
  Yangs1s: '성진',
  'YeongseoYoon-hanghae': '영서',
  Yuyeol: '유열',
  'adds-bug': '의근',
  adds9810: '지혜',
  angielxx: '은지',
  annkimm: '민지',
  areumH: '아름',
  bebusl: '진희',
  chan9yu: '찬규',
  chb6734: '현빈',
  'creco-hanghae': '석호',
  devchaeyoung: '채영',
  devchangjun: '창준',
  'developer-1px': '테오',
  esoby: '소희',
  eveneul: '하늘',
  geonhwiii: '건휘',
  heojungseok: '정석',
  hty0525: '태영',
  'hyemin-teamsparta': '혜민',
  'hyojin-k': '효진',
  hyunzsu: '지수',
  j2h30728: '지현',
  jeongmingi123: '민기',
  jinsoul75: '진솔',
  jun17183: '홍준',
  'jung-han': '오프',
  'k-sang-soo': '상수',
  ldhldh07: '두현',
  lieblichoi: '재환',
  minjaeleee: '민재',
  nemobim: '도은',
  nimusmix: '수민',
  parksangsoo: '상수',
  pitangland: '원표',
  q1Lim: '규원',
  realstone2: '진석',
  shiren: '성호',
  soyalattee: '소연',
  suhyeon57: '수현',
  susmisc14: '지수',
  taeyeong0814: '태영',
  tomatopickles404: '지호',
  'tooth-is-silver': '가은',
  unseoJang: ' 운서',
  yangchanghun: '창훈',
  yeonsookk: '연수',
  yhun940731: '용훈',
  yuhyeon99: '유현',
  'yunwoo-yu': '윤우',
  zenna9: '채은',
};
