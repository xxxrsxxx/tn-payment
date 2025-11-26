'use client';

import React from 'react';

import { ClearIcon } from '@/assets/svg';
import { OPTIONS, PAYMENT_TEXTS } from '@/constants';
import { useChargeStore } from '@/features/charge/stores/charge.store';

import { Button, Input } from '@/components/ui';

export default function ChargeAmount() {
  const { amount, setAmount, addAmount, clearAmount } = useChargeStore();

  return (
    <div className="charge-amount section">
      <header>
        <h5>{PAYMENT_TEXTS.CHARGE_AMOUNT}</h5>
      </header>
      <main>
        <div className="input-container">
          <Input
            type="text"
            value={amount.toLocaleString()}
            onChange={e => {
              // 1. 입력값에서 숫자가 아닌 문자는 모두 제거 (콤마 등)
              const sanitizedValue = e.target.value.replace(/[^0-9]/g, '');
              // 2. 빈 문자열이면 0, 아니면 숫자로 변환
              const nextAmount =
                sanitizedValue === '' ? 0 : Number(sanitizedValue);
              setAmount(nextAmount);
            }}
          />
          <Button.Round variant="primary" size="sm" onClick={clearAmount}>
            <ClearIcon />
          </Button.Round>
          <h5>{PAYMENT_TEXTS.CASH_UNIT}</h5>
        </div>
        <div className="charge-options">
          {OPTIONS.map((option, index) => (
            <Button.Round
              key={`option-${index}`}
              variant="primary"
              size="lg"
              color="gray50"
              icon={<span className="plus">+</span>}
              onClick={() => addAmount(option.value)}
            >
              {option.label}
            </Button.Round>
          ))}
        </div>
        <div className="desc">{PAYMENT_TEXTS.CHARGE_UNIT_DESC}</div>
      </main>
    </div>
  );
}
