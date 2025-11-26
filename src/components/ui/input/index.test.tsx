import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import Input from './index';

describe('Input', () => {
  it('TC1: 플레이스홀더와 같은 기본 속성을 올바르게 렌더링해야 합니다.', () => {
    render(<Input type="text" placeholder="Enter text" />);
    const inputElement = screen.getByPlaceholderText('Enter text');
    expect(inputElement).toBeInTheDocument();
  });

  it('TC2: 사용자가 입력 시 onChange 핸들러가 호출되어야 합니다.', () => {
    const handleChange = vi.fn();
    render(<Input type="text" onChange={handleChange} data-testid="input" />);

    const inputElement = screen.getByTestId('input');
    fireEvent.change(inputElement, { target: { value: 'hello' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect((inputElement as HTMLInputElement).value).toBe('hello');
  });

  it('TC3: value prop을 통해 제어 컴포넌트로 작동해야 합니다.', () => {
    const value = 'controlled value';
    render(
      <Input
        type="text"
        value={value}
        onChange={() => {}}
        data-testid="input"
      />,
    );

    const inputElement = screen.getByTestId('input');
    expect((inputElement as HTMLInputElement).value).toBe(value);
  });

  it('TC4: ref가 HTMLInputElement에 올바르게 전달되어야 합니다.', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input type="text" ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('TC5: className prop을 통해 추가적인 CSS 클래스를 적용할 수 있어야 합니다.', () => {
    const customClass = 'my-custom-class';
    render(<Input type="text" className={customClass} data-testid="input" />);

    const inputElement = screen.getByTestId('input');
    expect(inputElement).toHaveClass(customClass);
  });
});
