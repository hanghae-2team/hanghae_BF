import type { User } from '@/apis/users';
import { MatchingDialog } from '@/components/MatchingDialog';
import TopThree from '@/components/result/TopThree';
import UserListItem from '@/components/result/UserListItem';
import { Separator } from '@/elements/separator';

export type MatchingUser = Omit<User, 'updatedAt'>;

type Props = {
  title: string;
  users: Omit<MatchingUser, 'team'>[];
  startRank?: number;
};

const MatchingSection = ({ title, users }: Props) => (
  <>
    <Separator />

    <TopThree users={users.slice(0, 3)} />

    <ul className="space-y-2 mt-2">
      {users.slice(3, 5).map((user, index) => (
        <MatchingDialog
          key={`${title}-${user.id}-trigger`}
          renderTrigger={() => (
            <div className="w-full cursor-pointer">
              <UserListItem user={user} rank={index + 4} />
            </div>
          )}
        />
      ))}
    </ul>
  </>
);

export default MatchingSection;
