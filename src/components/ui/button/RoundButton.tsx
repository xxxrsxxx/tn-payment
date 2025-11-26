import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import style from './button.module.css';

interface RoundButtonProps extends ComponentPropsWithoutRef<'button'> {
  children?: ReactNode;
  variant: 'primary' | 'none';
  size: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'gray50' | 'blue50';
  icon?: ReactNode;
}

const RoundButton = ({ type = 'button', ...args }: RoundButtonProps) => {
  return (
    <button
      type={type}
      className={`${style[args.variant]} ${style[args.size]} ${args.className} ${style.button} ${style.round} ${args.color ? style[args.color] : ''} `}
      {...args}
    >
      {args.icon}
      {args.children}
    </button>
  );
};

export default RoundButton;
