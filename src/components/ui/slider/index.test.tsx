import { act, fireEvent, render, screen } from '@testing-library/react';

import CardSlider from './index';

describe('CardSlider', () => {
  // `setTimeout`을 사용하는 useEffect를 제어하기 위해 fake timers를 사용합니다.
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const mockChildren = [
    <div key="1">Slide 1</div>,
    <div key="2">Slide 2</div>,
    <div key="3">Slide 3</div>,
  ];

  it('TC1: 초기 렌더링 시 슬라이드와 버튼들을 올바르게 표시해야 합니다.', () => {
    render(<CardSlider>{mockChildren}</CardSlider>);
    act(() => {
      vi.runAllTimers();
    }); // useEffect 내의 setTimeout 실행

    expect(screen.getByText('Slide 1')).toBeInTheDocument();
    expect(screen.getByText('Slide 2')).toBeInTheDocument();
    expect(screen.getByText('Slide 3')).toBeInTheDocument();

    const prevButton = screen.getByRole('button', { name: '이전' });
    const nextButton = screen.getByRole('button', { name: '다음' });

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    expect(prevButton).toBeDisabled(); // 처음에는 '이전' 버튼이 비활성화됨
  });

  it('TC2: "다음" 버튼을 클릭하면 다음 슬라이드로 이동해야 합니다.', () => {
    render(<CardSlider>{mockChildren}</CardSlider>);
    act(() => {
      vi.runAllTimers();
    });

    const prevButton = screen.getByRole('button', { name: '이전' });
    const nextButton = screen.getByRole('button', { name: '다음' });

    // "다음" 클릭
    fireEvent.click(nextButton);
    act(() => {
      vi.runAllTimers();
    });

    // 이제 "이전" 버튼이 활성화되어야 함
    expect(prevButton).not.toBeDisabled();

    // 마지막 슬라이드까지 이동
    fireEvent.click(nextButton); // 이제 index 2
    act(() => {
      vi.runAllTimers();
    });
    expect(nextButton).toBeDisabled(); // 마지막 슬라이드이므로 "다음" 버튼 비활성화
  });

  it('TC3: "이전" 버튼을 클릭하면 이전 슬라이드로 이동해야 합니다.', () => {
    render(<CardSlider currentIdx={1}>{mockChildren}</CardSlider>); // 중간에서 시작
    act(() => {
      vi.runAllTimers();
    });

    const prevButton = screen.getByRole('button', { name: '이전' });

    // "이전" 클릭
    fireEvent.click(prevButton);
    act(() => {
      vi.runAllTimers();
    });

    // 이제 '이전' 버튼이 비활성화되어야 함 (첫 슬라이드이므로)
    expect(prevButton).toBeDisabled();
  });

  it('TC4: 특정 슬라이드를 클릭하면 해당 슬라이드로 이동해야 합니다.', () => {
    render(<CardSlider>{mockChildren}</CardSlider>);
    act(() => {
      vi.runAllTimers();
    });

    const prevButton = screen.getByRole('button', { name: '이전' });
    const slide2 = screen.getByText('Slide 2');

    // 두 번째 슬라이드를 감싸는 div를 클릭
    fireEvent.click(slide2.parentElement as HTMLElement);
    act(() => {
      vi.runAllTimers();
    });

    // 이제 '이전' 버튼이 활성화되어야 함 (첫 번째 슬라이드가 아니므로)
    expect(prevButton).not.toBeDisabled();
  });
});
