import { create } from 'zustand';
import { UserType } from '../types/types';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface UserState {
  user: UserType | null;
  setUser: (user: UserType) => void;
  logoutUser: () => void;
}
export const useUserStore = create<UserState>()(
  immer(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => set(() => ({ user: user })),
        logoutUser: () =>
          set((state) => {
            state.user = null;
          }),
      }),
      {
        name: 'user',
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  ),
);
