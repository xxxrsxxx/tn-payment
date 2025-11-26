import { render, screen } from '@testing-library/react';

import Payment from './Payment';

// import style from '../card.module.css'; // The component currently doesn't use it

describe('Card.Payment', () => {
  it('TC1: 자식 노드를 올바르게 렌더링해야 합니다.', () => {
    render(
      <Payment data-testid="payment-card">
        <p>Card Content</p>
      </Payment>,
    );

    const cardContent = screen.getByText('Card Content');
    expect(cardContent).toBeInTheDocument();
  });

  it('TC2: 추가적인 className과 다른 div 속성들을 전달해야 합니다.', () => {
    const customClass = 'my-custom-card';
    const customId = 'payment-card-1';
    render(
      <Payment className={customClass} id={customId} data-testid="payment-card">
        Card
      </Payment>,
    );

    const cardElement = screen.getByTestId('payment-card');
    expect(cardElement).toHaveClass(customClass);
    expect(cardElement).toHaveAttribute('id', customId);
  });
});
