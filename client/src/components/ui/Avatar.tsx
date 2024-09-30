import React, { FC } from 'react';
import { UserStatus } from '../../types/types';
import StatusBadge from './StatusBadge';
import { CiUser } from 'react-icons/ci';
type AvatarProps = {
  src?: string;
  size: 's' | 'm' | 'l';
  status: UserStatus;
  classNames?: string;
};

const Avatar: FC<AvatarProps> = ({ src, size, status, classNames }) => {
  return (
    <div
      className={`${size}   flex items-center justify-center   w-12 h-12 ${classNames} relative`}
    >
      {src ? (
        <img
          className="w-full h-full object-cover rounded-full"
          src={src}
          alt="avatar"
        />
      ) : (
        <CiUser className="w-full h-full " />
      )}

      <StatusBadge status={status} />
    </div>
  );
};

export default Avatar;
