import { create } from 'zustand';
import { ThemeButtonType, ThemeType } from '../types/types';

interface ThemeState {
  theme: ThemeType;
  themes: ThemeButtonType[];
  changeTheme: (theme: ThemeType) => void;
}
export const useThemeStore = create<ThemeState>()((set) => ({
  themes: [
    { theme: 'black-custom', color: '#000000' },
    { theme: 'orange', color: '#f97316' },
  ],
  theme: 'black-custom',

  changeTheme: (theme) => set(() => ({ theme: theme })),
}));
