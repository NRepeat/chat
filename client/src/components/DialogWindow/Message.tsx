import { FC } from 'react';
import { wrapText } from '../../helpers/wrapText';
import { UserType } from '../../types/types';
type MessageProps = {
  user: UserType;
  message: string;
};
const Message: FC<MessageProps> = ({ message, user }) => {
  return (
    <li
      className={`w-full  flex   ${user.username === 'Nikita' ? 'after:bg-green-300 justify-end after:w-5' : 'before:bg-blue-200 before:w-5'}   `}
    >
      <p
        className={` ${user.username === 'Nikita' ? 'rounded-s-md' : 'rounded-e-md '} min-w-32 py-2 px-2 flex items-center text-wrap max-w-[300px] `}
      >
        {wrapText(message)}
      </p>
    </li>
  );
};

export default Message;
