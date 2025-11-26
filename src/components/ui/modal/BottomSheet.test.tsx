import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import BottomSheet from '@/components/ui/modal/BottomSheet';

describe('BottomSheet', () => {
  it('TC1: isOpen이 false일 때 컨텐츠를 렌더링하지 않아야 합니다.', async () => {
    render(
      <BottomSheet isOpen={false} onClose={() => {}}>
        <div>My Content</div>
      </BottomSheet>,
    );

    // 컴포넌트가 mounted 후에도 컨텐츠가 보이지 않아야 함
    await waitFor(() => {
      expect(screen.queryByText('My Content')).not.toBeInTheDocument();
    });
  });

  it('TC2: isOpen이 true일 때 컨텐츠를 렌더링해야 합니다.', async () => {
    render(
      <BottomSheet isOpen={true} onClose={() => {}}>
        <div>My Content</div>
      </BottomSheet>,
    );

    // useEffect(setTimeout)이 실행된 후 portal이 마운트될 때까지 기다림
    await waitFor(() => {
      expect(screen.getByText('My Content')).toBeInTheDocument();
    });
  });

  it('TC3: 백드롭 클릭 시 onClose 함수를 호출해야 합니다.', async () => {
    const handleClose = vi.fn();
    render(
      <BottomSheet isOpen={true} onClose={handleClose}>
        <div>My Content</div>
      </BottomSheet>,
    );

    // 컨텐츠가 렌더링될 때까지 기다림
    await waitFor(() => {
      expect(screen.getByText('My Content')).toBeInTheDocument();
    });

    // 백드롭(dim)을 클릭
    const backdrop =
      screen.getByText('My Content').parentElement?.parentElement
        ?.parentElement;
    if (backdrop) {
      fireEvent.click(backdrop);
    }

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('TC4: isOpen 상태에 따라 body의 overflow 스타일을 제어해야 합니다.', async () => {
    const { rerender } = render(
      <BottomSheet isOpen={true} onClose={() => {}}>
        <div>Content</div>
      </BottomSheet>,
    );

    await waitFor(() => {
      expect(document.body.style.overflow).toBe('hidden');
    });

    // isOpen을 false로 변경하여 컴포넌트를 리렌더링
    rerender(
      <BottomSheet isOpen={false} onClose={() => {}}>
        <div>Content</div>
      </BottomSheet>,
    );

    await waitFor(() => {
      expect(document.body.style.overflow).toBe('unset');
    });
  });
});
