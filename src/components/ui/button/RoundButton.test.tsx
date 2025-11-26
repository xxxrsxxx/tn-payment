import { fireEvent, render, screen } from '@testing-library/react';

import RoundButton from './RoundButton';
import style from './button.module.css';

describe('RoundButton', () => {
  it('TC1: 자식 노드를 올바르게 렌더링해야 합니다.', () => {
    render(
      <RoundButton variant="primary" size="md">
        Click Me
      </RoundButton>,
    );
    expect(
      screen.getByRole('button', { name: 'Click Me' }),
    ).toBeInTheDocument();
  });

  it('TC2: variant와 size prop에 따라 올바른 CSS 클래스를 적용해야 합니다.', () => {
    render(
      <RoundButton variant="primary" size="lg">
        Styled Button
      </RoundButton>,
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass(style.primary);
    expect(button).toHaveClass(style.lg);
  });

  it('TC3: color prop에 따라 올바른 CSS 클래스를 적용해야 합니다.', () => {
    render(
      <RoundButton variant="none" size="sm" color="gray50">
        Color Button
      </RoundButton>,
    );
    expect(screen.getByRole('button')).toHaveClass(style.gray50);
  });

  it('TC4: onClick 핸들러가 클릭 시 호출되어야 합니다.', () => {
    const handleClick = vi.fn();
    render(
      <RoundButton variant="primary" size="md" onClick={handleClick}>
        Clickable
      </RoundButton>,
    );

    const button = screen.getByRole('button', { name: 'Clickable' });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('TC5: disabled prop이 전달되면 버튼이 비활성화되어야 합니다.', () => {
    render(
      <RoundButton variant="primary" size="md" disabled>
        Disabled
      </RoundButton>,
    );
    expect(screen.getByRole('button', { name: 'Disabled' })).toBeDisabled();
  });

  it('TC6: 아이콘을 올바르게 렌더링해야 합니다.', () => {
    const icon = <span data-testid="icon">ICON</span>;
    render(
      <RoundButton variant="primary" size="md" icon={icon}>
        With Icon
      </RoundButton>,
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});
