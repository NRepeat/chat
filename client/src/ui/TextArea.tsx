import React, { FC } from 'react';
import { useChatStore } from '../store/chat';
import { UserType } from '../types/types';

type TextAreaProps = {
  classNames?: string;
  user: UserType | null;
};

const TextArea: FC<TextAreaProps> = ({ classNames, user }) => {
  const setMessage = useChatStore((state) => state.setMessage);
  const message = useChatStore((state) => state.message);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (user) {
      setMessage({ message: event.target.value, user });
    }
  };

  return (
    <textarea
      autoFocus={true}
      className={`w-full  shadow-inner shadow-black  resize-none ${classNames} focus:shadow-black  `}
      placeholder="Text"
      disabled={!user}
      value={message?.message}
      onChange={handleInputChange}
    />
  );
};

export default TextArea;
