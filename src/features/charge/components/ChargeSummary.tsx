import React from 'react';

import { calculateTotalWithFee } from '@/utils';

interface ChargeSummaryProps {
  price: number;
  children: React.ReactNode;
}

export default function ChargeSummary({
  price = 0,
  children,
}: ChargeSummaryProps) {
  const totalAmount = calculateTotalWithFee(price);
  return (
    <div className={`description section`}>
      <div className="section-header">
        <header>
          <h5>최종 결제 금액</h5>
          <h4>{totalAmount.toLocaleString()}원</h4>
        </header>
      </div>
      <p>
        * 캐시 유효기간: 마지막 사용일로부터 5년
        <br />* 결제 금액에는 모든 세금이 포함되어 있습니다.
        <br />* 만 19세 미만 미성년자 회원은 법정대리인 동의가 필요하며, 동의가
        완료 된 후 캐시 충전 서비스 이용이 가능합
      </p>
      <div className="mt-[20px]">{children}</div>
    </div>
  );
}
