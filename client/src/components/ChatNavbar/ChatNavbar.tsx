import { useChatStore } from '../../store/chat';
import { FC } from 'react';
import UserInfo from './UserInfo';
import { CiMenuBurger } from 'react-icons/ci';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useUserStore } from '@/store/user';
import { useAnimate } from 'framer-motion';
type ChatNavbarProps = {
  classNames?: string;
};

const ChatNavbar: FC<ChatNavbarProps> = ({ classNames }) => {
  const setIsMenuOpen = useChatStore((state) => state.setIsMenuOpen);
  const isMenuOpen = useChatStore((state) => state.isMenuOpen);
  const user = useUserStore((state) => state.user);

  const [burgerMenuScope, animate] = useAnimate();
  const handleButtonClick = (e: boolean) => {
    if (e) {
      // setIsMenuOpen(true);
      animate('.burger-icon', { rotateZ: 90 });
    } else {
      animate('.burger-icon', { rotateZ: 0 }, { duration: 0.2 });
      // setIsMenuOpen(false);
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
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem>
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Friends</span>
          </DropdownMenuItem>
          {user?.username ? (
            <DropdownMenuItem>
              <span>Logout</span>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem>
              <span>Login</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ChatNavbar;
