import { useChatStore } from '../../store/chat';
import { FC } from 'react';

type ChatNavbarProps = {
  classNames?: string;
};

const ChatNavbar: FC<ChatNavbarProps> = ({ classNames }) => {
  const setIsMenuOpen = useChatStore((state) => state.setIsMenuOpen);
  const isMenuOpen = useChatStore((state) => state.isMenuOpen);

  const handleButtonClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div
      className={`bg-secondary px-4 py-2 flex justify-between h-[60px]  border-b-[1px] border-accent ${classNames}`}
    >
      <div>avatar</div>
      <button onClick={() => handleButtonClick()}>menu</button>
    </div>
  );
};

export default ChatNavbar;
