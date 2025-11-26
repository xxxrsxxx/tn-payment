import { fireEvent, render, screen } from '@testing-library/react';

import Radio from './index';

describe('RadioGroup and Radio.Item', () => {
  it('TC1: defaultValue에 따라 올바른 라디오 아이템이 초기에 선택되어야 합니다.', () => {
    render(
      <Radio name="test-group" defaultValue="2">
        <Radio.Item value="1">Option 1</Radio.Item>
        <Radio.Item value="2">Option 2</Radio.Item>
        <Radio.Item value="3">Option 3</Radio.Item>
      </Radio>,
    );

    const radio2 = screen.getByLabelText('Option 2') as HTMLInputElement;
    expect(radio2.checked).toBe(true);

    const radio1 = screen.getByLabelText('Option 1') as HTMLInputElement;
    expect(radio1.checked).toBe(false);
  });

  it('TC2: 다른 라디오 아이템을 클릭하면 선택 상태가 변경되어야 합니다.', () => {
    render(
      <Radio name="test-group" defaultValue="1">
        <Radio.Item value="1">Option 1</Radio.Item>
        <Radio.Item value="2">Option 2</Radio.Item>
      </Radio>,
    );

    const radio1 = screen.getByLabelText('Option 1') as HTMLInputElement;
    const radio2 = screen.getByLabelText('Option 2') as HTMLInputElement;

    expect(radio1.checked).toBe(true);

    // "Option 2" 라벨을 클릭하여 상태 변경
    fireEvent.click(screen.getByText('Option 2'));

    expect(radio1.checked).toBe(false);
    expect(radio2.checked).toBe(true);
  });

  it('TC3: 아이템 선택 시 RadioGroup의 onChange 콜백이 호출되어야 합니다.', () => {
    const handleChange = vi.fn();
    render(
      <Radio name="test-group" onChange={handleChange}>
        <Radio.Item value="1">Option 1</Radio.Item>
        <Radio.Item value="2">Option 2</Radio.Item>
      </Radio>,
    );

    // "Option 2" 라벨을 클릭
    fireEvent.click(screen.getByText('Option 2'));

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('2');
  });

  it('TC4: 모든 라디오 아이템에 동일한 name 속성이 적용되어야 합니다.', () => {
    render(
      <Radio name="shared-name" defaultValue="1">
        <Radio.Item value="1">Option 1</Radio.Item>
        <Radio.Item value="2">Option 2</Radio.Item>
      </Radio>,
    );

    const inputs = screen.getAllByRole('radio');
    inputs.forEach(input => {
      expect(input).toHaveAttribute('name', 'shared-name');
    });
  });
});
