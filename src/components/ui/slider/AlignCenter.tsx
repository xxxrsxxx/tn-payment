'use client';

import { Children, ReactNode, useEffect, useState } from 'react';

import { Button } from '@/components/ui';

interface AlignCenterProps {
  children: ReactNode;
  cardWidth?: number; // 카드 너비 (기본값 설정)
  cardGap?: number; // 카드 간격 (기본값 설정)
  currentIdx?: number;
}

export default function AlignCenter({
  children,
  cardWidth = 242,
  cardGap = 16,
  currentIdx = 0,
}: AlignCenterProps) {
  const [currentIndex, setCurrentIndex] = useState(currentIdx);

  // children을 배열로 변환하여 개수 파악 및 조작
  const childArray = Children.toArray(children);
  const maxIndex = childArray.length - 1;

  // 자식 요소의 개수가 변경되면 첫 번째 인덱스로 초기화
  useEffect(() => {
    setTimeout(() => {
      setCurrentIndex(0);
    }, 0);
  }, [childArray.length]);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : 0));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev < maxIndex ? prev + 1 : maxIndex));
  };

  const sliderStyle = {
    display: 'flex',
    gap: `${cardGap}px`,
    width: 'max-content',
    marginLeft: '50%', // 부모 기준 중앙 시작
    transform: `translateX(calc(-${cardWidth / 2}px - ${currentIndex * (cardWidth + cardGap)}px))`,
    transition: 'transform 0.3s ease-in-out',
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        padding: '20px 0',
      }}
    >
      {/* 왼쪽 버튼 */}
      <Button.Round
        variant="none"
        size="md"
        onClick={handlePrev}
        disabled={currentIndex === 0}
        style={{
          position: 'absolute',
          left: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          opacity: currentIndex === 0 ? 0 : 1,
        }}
      >
        이전
      </Button.Round>

      {/* 슬라이더 영역 */}
      <div
        className="card-wrapper"
        style={{ width: '100%', overflow: 'hidden' }}
      >
        <div className="card-box" style={sliderStyle}>
          {childArray.map((child, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              style={{
                flexShrink: 0, // flex 컨테이너 안에서 카드 크기가 줄어들지 않도록 고정
                width: `${cardWidth}px`,
                cursor: 'pointer', // 클릭 가능 표시
              }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* 오른쪽 버튼 */}
      <Button.Round
        variant="none"
        size="md"
        onClick={handleNext}
        disabled={currentIndex === maxIndex}
        style={{
          position: 'absolute',
          right: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          opacity: currentIndex === maxIndex ? 0 : 1,
        }}
      >
        다음
      </Button.Round>
    </div>
  );
}
