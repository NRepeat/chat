import React, { FC, useEffect, useState } from 'react';
import { UserStatus } from '../../types/types';

type StatusBadgeProps = {
  status: UserStatus;
};

const StatusBadge: FC<StatusBadgeProps> = ({ status }) => {
  const [badgeColor, setBadgeColor] = useState<'red' | 'green' | 'yellow'>();

  useEffect(() => {
    switch (true) {
      case status === 'online': {
        setBadgeColor('green');
        break;
      }
      case status === 'idle': {
        setBadgeColor('yellow');
        break;
      }
      case status === 'offline': {
        setBadgeColor('red');
        break;
      }
    }
  }, [status]);
  return (
    <span
      className={`w-4 h-4 absolute bottom-0 right-0 rounded-full z-10`}
      style={{ backgroundColor: badgeColor }}
    ></span>
  );
};

export default StatusBadge;
