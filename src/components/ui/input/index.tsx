import { ComponentPropsWithoutRef, ReactNode, forwardRef } from 'react';

import style from './Input.module.css';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  children?: ReactNode;
  type: 'text' | 'number';
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={`${style.input} ${className || ''}`} // 기존 클래스와 외부 클래스 병합
        {...props}
      />
    );
  },
);

export default Input;
