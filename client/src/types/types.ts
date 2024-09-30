export type ThemeType = 'black-custom' | 'orange';
export type UserStatus = 'online' | 'offline' | 'idle';

export type ThemeButtonType = {
  color: string;
  theme: string;
};

export type MessageType = {
  message: string;
  user: UserType;
};

export type UserType = {
  id: string;
  status: UserStatus;
  avatar?: string;
  username?: string;
};
