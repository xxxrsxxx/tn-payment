import React, { ComponentPropsWithoutRef, ReactNode, forwardRef } from 'react';

import style from './checkBox.module.css';

interface CheckBoxProps extends ComponentPropsWithoutRef<'input'> {
  children?: ReactNode;
  className?: string;
}

const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ children, className, type = 'checkbox', ...props }, ref) => {
    return (
      <label className={style.checkbox}>
        <input
          ref={ref}
          type={type}
          className={`${style.checkbox} ${className || ''}`} // 기존 클래스와 외부 클래스 병합
          {...props}
        />
        <span></span>
        {children}
      </label>
    );
  },
);

export default CheckBox;
