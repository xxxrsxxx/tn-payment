'use client';

import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const BottomSheet = ({ isOpen, onClose, children }: BottomSheetProps) => {
  const [mounted, setMounted] = useState(false);

  // 클라이언트 사이드 마운트 확인 (Next.js hydration mismatch 방지)
  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 0);
  }, []);

  // 바텀시트가 열렸을 때 뒤쪽 스크롤 막기
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <div
      className={`${isOpen ? 'fadeIn dim animated' : ''}`}
      onClick={event => {
        event.preventDefault();
        onClose();
      }}
    >
      <div className={`popup animated ${isOpen ? 'fadeInUp' : ''}`}>
        {/* 동적 컨텐츠 영역 */}
        <div className="">{children}</div>
      </div>
    </div>,
    document.body,
  );
};

export default BottomSheet;
