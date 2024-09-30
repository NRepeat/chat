import { UserType } from '@/types/types';
import Avatar from '../ui/Avatar';

const UserInfo = ({ user }: { user: UserType }) => {
  return (
    <div className="flex  items-center gap-6">
      {user && (
        <>
          <Avatar size="s" src={user?.avatar} status={user?.status} />
          <p className="capitalize">{user?.username}</p>
        </>
      )}
    </div>
  );
};

export default UserInfo;
