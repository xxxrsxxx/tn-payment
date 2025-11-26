import type { ComponentPropsWithoutRef, ReactNode } from 'react';

interface PaymentProps extends ComponentPropsWithoutRef<'div'> {
  children?: ReactNode;
}

const Payment = ({ ...args }: PaymentProps) => {
  return (
    <div className={`card`} {...args}>
      {args.children}
    </div>
  );
};

export default Payment;
