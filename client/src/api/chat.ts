import { MessageType } from '../types/types';
import { chatSocket } from './index';

export const sendMessage = async (message: MessageType) => {
  chatSocket.emit('newMessage', message);
};

export const getMessage = (
  setMessages: (message: MessageType) => void,
  setIsLoading: (isLoading: boolean) => void,
) => {
  chatSocket.on('reply', (data: MessageType) => {
    if (data) {
      setMessages(data);
      setIsLoading(false);
    }
  });
};
