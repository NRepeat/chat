import TextArea from '../../ui/TextArea';
import { useChatStore } from '../../store/chat';
import { sendMessage } from '../../api/chat';

import { useUserStore } from '../../store/user';

const TextForm = () => {
  const message = useChatStore((state) => state.message);
  const setIsLoading = useChatStore((state) => state.setIsLoading);
  const user = useUserStore((state) => state.user);
  console.log('🚀 ~ TextForm ~ user :', user);
  const handleSubmitMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();
    console.log(message);
    if (message && user?.username) {
      console.log('🚀 ~ handleSubmitMessage ~ message:', message);
      await sendMessage({ message: message.message, user });
      setIsLoading(true);
    }
  };

  return (
    <div className={` border-t-[1px] ${''} border-accent`}>
      <form
        action=""
        onSubmit={(e) => handleSubmitMessage(e)}
        className="w-full   bg-secondary   overflow-hidden flex h-full "
      >
        <div className="px-0.5 py-0.5 w-full">
          <TextArea classNames="max-h-[85px] h-[85px] px-2 py-2 " user={user} />
          <button className="w-full rounded-b-md h-[50px] bg-green-400 flex justify-center items-center">
            <span className="pl-1">{'>'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default TextForm;
