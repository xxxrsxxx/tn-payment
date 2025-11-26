import { fireEvent, render, screen } from '@testing-library/react';

import style from './Tab.module.css';
import Tabs from './index';

describe('Tabs and Tab.Item', () => {
  it('TC1: 탭 아이템들을 올바르게 렌더링해야 합니다.', () => {
    render(
      <Tabs>
        <Tabs.Item label="Tab 1" isActive={true} />
        <Tabs.Item label="Tab 2" isActive={false} />
      </Tabs>,
    );

    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
  });

  it('TC2: isActive prop이 true인 탭에 활성 클래스를 적용해야 합니다.', () => {
    render(
      <Tabs>
        <Tabs.Item label="Active Tab" isActive={true} />
        <Tabs.Item label="Inactive Tab" isActive={false} />
      </Tabs>,
    );

    const activeTab = screen.getByText('Active Tab');
    const inactiveTab = screen.getByText('Inactive Tab');

    expect(activeTab).toHaveClass(style.isActive);
    expect(inactiveTab).not.toHaveClass(style.isActive);
  });

  it('TC3: 탭 아이템 클릭 시 onClick 핸들러가 호출되어야 합니다.', () => {
    const handleClick1 = vi.fn();
    const handleClick2 = vi.fn();

    render(
      <Tabs>
        <Tabs.Item label="Tab 1" isActive={true} onClick={handleClick1} />
        <Tabs.Item label="Tab 2" isActive={false} onClick={handleClick2} />
      </Tabs>,
    );

    const tab1 = screen.getByText('Tab 1');
    const tab2 = screen.getByText('Tab 2');

    fireEvent.click(tab1);
    expect(handleClick1).toHaveBeenCalledTimes(1);

    fireEvent.click(tab2);
    expect(handleClick2).toHaveBeenCalledTimes(1);
  });

  it('TC4: Wrapper에 추가적인 className을 적용할 수 있어야 합니다.', () => {
    const customClass = 'my-tabs-wrapper';
    render(
      <Tabs className={customClass}>
        <Tabs.Item label="Tab 1" isActive={true} />
      </Tabs>,
    );

    const listElement = screen.getByRole('list');
    expect(listElement).toHaveClass(customClass);
  });
});
