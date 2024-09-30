import { useEffect } from 'react';
import ChatNavbar from '../ChatNavbar/ChatNavbar';
import DialogWindow from '../DialogWindow/DialogWindow';
import TextForm from '../TextForm/TextForm';
import { chatSocket } from '../../api';
import { useUserStore } from '../../store/user';
import { Outlet, useNavigate } from 'react-router-dom';

const Chat = () => {
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);
  const nav = useNavigate();

  useEffect(() => {
    function onConnect(id: string) {
      if (!user?.id) {
        setUser({ id, status: 'offline' });
      }
    }

    chatSocket.on('user-joined', (data) => {
      onConnect(data);
    });
  }, [setUser, user]);
  useEffect(() => {
    if (!user?.username) {
      nav('/chat/login');
    }
  }, [user, nav]);
  return (
    <div className="h-full px-12 py-8 flex justify-center items-center  overflow-hidden">
      <div className="w-[500px] min-h-[500px]  rounded-md shadow shadow-slate-900 overflow-hidden min-w-[320px]">
        {user?.username ? (
          <>
            <ChatNavbar />
            <DialogWindow />
            <TextForm />
          </>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default Chat;
