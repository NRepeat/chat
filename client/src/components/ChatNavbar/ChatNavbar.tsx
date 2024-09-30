import { FC } from 'react';
import UserInfo from './UserInfo';
import { CiMenuBurger } from 'react-icons/ci';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useUserStore } from '@/store/user';
import { useAnimate } from 'framer-motion';
type ChatNavbarProps = {
  classNames?: string;
};

const ChatNavbar: FC<ChatNavbarProps> = ({ classNames }) => {
  const user = useUserStore((state) => state.user);
  const logoutUser = useUserStore((state) => state.logoutUser);

  const [burgerMenuScope, animate] = useAnimate();
  const handleButtonClick = (e: boolean) => {
    if (e) {
      animate('.burger-icon', { rotateZ: 90 });
    } else {
      animate('.burger-icon', { rotateZ: 0 }, { duration: 0.2 });
    }
  };
  return (
    <div
      ref={burgerMenuScope}
      className={`px-4 py-2 flex justify-between h-[60px]  border-b-[1px]  ${classNames}`}
    >
      {user && <UserInfo user={user} />}
      <DropdownMenu onOpenChange={(e) => handleButtonClick(e)}>
        <DropdownMenuTrigger asChild>
          <Button variant={'outline'} size={'icon'}>
            <CiMenuBurger className="burger-icon " />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 ">
          <DropdownMenuItem className="justify-center h-8">
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="justify-center h-8">
            Friends
          </DropdownMenuItem>
          {user?.username ? (
            <DropdownMenuItem className="bg-red-700 h-8 overflow-hidden">
              <Button
                className="w-full rounded-sm "
                variant={'link'}
                onClick={() => logoutUser()}
              >
                Logout
              </Button>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem className="bg-green-700 h-8 overflow-hidden">
              <Button className="w-full rounded-sm " variant={'link'}>
                Login
              </Button>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ChatNavbar;
