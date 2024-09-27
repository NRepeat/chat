import { create } from 'zustand';
import { UserType } from '../types/types';

interface UserState {
  user: UserType | null;
  setUser: (user: UserType) => void;
}
export const useUserStore = create<UserState>()((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user: user })),
}));
