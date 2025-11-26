import React from 'react';

import style from './Tab.module.css';

const TabItem = ({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick?: () => void;
}) => {
  return (
    <li
      onClick={onClick}
      className={`${style.item} ${isActive ? style.isActive : ''}`}
    >
      {label}
    </li>
  );
};

export default TabItem;
