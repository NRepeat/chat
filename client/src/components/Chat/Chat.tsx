import { useEffect } from 'react';
import ChatNavbar from '../ChatNavbar/ChatNavbar';
import DialogWindow from '../DialogWindow/DialogWindow';
import TextForm from '../TextForm/TextForm';
import { chatSocket } from '../../api';
import { useUserStore } from '../../store/user';

const Chat = () => {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    function onConnect(id: string) {
      console.log('🚀 ~ onConnect ~ id:', id);
      setUser({ id });
    }

    chatSocket.on('user-joined', (data) => {
      onConnect(data);
    });
  }, [setUser]);
  return (
    <div className="h-full px-12 py-8 flex justify-center items-center text-white overflow-hidden">
      <div className="w-[500px] min-h-[500px]  rounded-md shadow shadow-slate-900 overflow-hidden min-w-[320px]">
        <ChatNavbar />
        <DialogWindow />
        <TextForm />
      </div>
    </div>
  );
};

export default Chat;
