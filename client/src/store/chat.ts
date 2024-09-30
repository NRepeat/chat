import { create } from 'zustand';
import { MessageType } from '../types/types';

interface ChatState {
  isMenuOpen: boolean;
  message: MessageType | null;
  messages: MessageType[] | [];
  setIsMenuOpen: (isOpen: boolean) => void;
  setMessage: (value: MessageType) => void;
  setMessages: (message: MessageType) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}
export const useChatStore = create<ChatState>()((set) => ({
  isMenuOpen: false,
  message: null,
  messages: [],
  isLoading: false,
  setIsLoading: (isLoading) => set(() => ({ isLoading: isLoading })),
  setMessage: (value) => set(() => ({ message: value })),
  setIsMenuOpen: (isOpen) => set(() => ({ isMenuOpen: isOpen })),
  setMessages: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
}));
