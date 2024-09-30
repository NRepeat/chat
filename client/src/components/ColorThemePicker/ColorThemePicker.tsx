import { FC } from 'react';
import { ThemeButtonType, ThemeType } from '../../types/types';
import { useThemeStore } from '../../store/theme';

export type ColorThemePickerProps = {
  themes: ThemeButtonType[];
  theme: ThemeType;
};

const ColorThemePicker: FC<ColorThemePickerProps> = ({ themes, theme }) => {
  const changeTheme = useThemeStore((state) => state.changeTheme);
  const handleSetTheme = (theme: ThemeType) => {
    changeTheme(theme);
  };
  const handleToggleSetTheme = (themeToggle: ThemeType) => {
    if (themeToggle !== theme) {
      changeTheme(themeToggle);
    }
  };
  return (
    <ul className="flex gap-2 flex-1 justify-end z-10 ">
      {themes.map(({ theme, color }) => (
        <li key={color}>
          <button
            style={{ backgroundColor: `${color}` }}
            className={` w-8 h-8  rounded-[100%] border-2 border-sky-300 hover:border-sky-900`}
            onMouseEnter={() => handleToggleSetTheme(theme as ThemeType)}
            onMouseLeave={() => handleToggleSetTheme(theme as ThemeType)}
            onClick={() => handleSetTheme(theme as ThemeType)}
          ></button>
        </li>
      ))}
    </ul>
  );
};

export default ColorThemePicker;
