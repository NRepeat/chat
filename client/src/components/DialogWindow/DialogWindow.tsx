import { useAnimate } from 'framer-motion';
import { useChatStore } from '../../store/chat';
import Message from './Message';
import { FC, useEffect, useState } from 'react';
import { useUserStore } from '../../store/user';
// import { getMessage } from '../../api/chat';
import { chatSocket } from '../../api';
import { MessageType } from '../../types/types';

type DialogWindowProps = {
  classNames?: string;
};

const DialogWindow: FC<DialogWindowProps> = ({ classNames }) => {
  const isMenuOpen = useChatStore((state) => state.isMenuOpen);
  const user = useUserStore((state) => state.user);
  const [username, setUsername] = useState<string | undefined>('');
  const setUser = useUserStore((state) => state.setUser);
  const setIsLoading = useChatStore((state) => state.setIsLoading);
  // const isChatLoading = useChatStore((state) => state.isLoading);
  const setMessages = useChatStore((state) => state.setMessages);
  const messages = useChatStore((state) => state.messages);
  const [scope, animate] = useAnimate();
  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handleSubmitUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user?.id && username) {
      setUser({
        id: user.id,
        username,
        status: 'online',
        avatar:
          'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
      });
    }
  };
  useEffect(() => {
    const handleReply = (data: MessageType) => {
      if (data.user.id === user?.id) {
        setMessages(data);
      }
    };

    chatSocket.on('reply', handleReply);

    return () => {
      chatSocket.off('reply', handleReply);
      setIsLoading(false);
    };
  }, [setMessages, user, setIsLoading]);

  useEffect(() => {
    if (isMenuOpen) {
      animate(
        scope.current,
        { height: '100%', y: 0, opacity: 1 },
        { duration: 0.2, ease: 'linear' },
      );
    } else {
      animate(
        scope.current,
        { opacity: 0, height: 0, y: -60 },
        { duration: 0.2, ease: 'linear' },
      );
    }
  }, [isMenuOpen, animate, scope]);
  return (
    <div
      className={`flex   overflow-hidden h-[500px] relative ${classNames}  overflow-y-visible  `}
    >
      <div className="flex w-full flex-col justify-between  pb-8 pt-1 overflow-y-visible ">
        <ul className="w-full flex flex-col justify-end overflow-y-visible gap-4   py-6 px-4 ">
          {messages.map(({ message, user }) => (
            <Message message={message} user={user} />
          ))}
        </ul>
      </div>
      {
        <div
          ref={scope}
          className="chat-menu w-[calc(100%+2px)]  absolute px-4 py-2  h-0  opacity-0"
        >
          <form action="" onSubmit={handleSubmitUser}>
            <input
              className="text-black"
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleChangeUsername}
            />
            <button>Login</button>
          </form>
        </div>
      }
    </div>
  );
};

export default DialogWindow;
