import { ComponentPropsWithoutRef, PropsWithChildren, forwardRef } from 'react';

import style from './Tab.module.css';
import TabItem from './TabItem';

const Wrapper = forwardRef<
  HTMLUListElement,
  PropsWithChildren & ComponentPropsWithoutRef<'ul'>
>(({ className, children, ...props }, ref) => (
  <ul ref={ref} className={`${style.wrapper} ${className}`} {...props}>
    {children}
  </ul>
));

// 아래 라인을 추가하세요
Wrapper.displayName = 'Wrapper';

const Tabs = Object.assign({}, Wrapper, {
  Item: TabItem,
});
export default Tabs;
