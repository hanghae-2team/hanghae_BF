import TopThree from '@/components/result/TopThree';
import MatchListItem from '@/components/result/UserListItem';
import { Separator } from '@/elements/separator';
import type { MatchResultWithUser } from '@/types/result';

type Props = {
  matchResults: MatchResultWithUser[];
  startRank?: number;
};

const MatchingSection = ({ matchResults }: Props) => {
  return (
    <>
      <Separator />

      <TopThree matchResults={matchResults.slice(0, 3)} />

      <ul className="space-y-2 mt-2">
        {matchResults.slice(3).map((user, index) => (
          <MatchListItem matchResult={user} rank={index + 4} key={`${user.targetId}-trigger`} />
        ))}
      </ul>
    </>
  );
};

export default MatchingSection;
