export type ThemeType = 'black-custom' | 'orange';

export type ThemeButtonType = {
  color: string;
  theme: string;
};

export type MessageType = {
  message: string;
  user: UserType;
};

export type UserType = {
  username?: string;
  id: string;
};
