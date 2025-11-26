'use client';

import React, { useMemo } from 'react';

import { PAYMENT_TEXTS, TAB_DATA } from '@/constants';
import {
  ChargeAmount,
  ChargeSummary,
  PaymentMethodBottomSheet,
  PaymentMethodDetails,
} from '@/features/charge/components';
import { useSubmitChargeMutation } from '@/features/charge/queries/useSubmitChargeMutation';
import { useChargeStore } from '@/features/charge/stores/charge.store';

import SwitchCase from '@/components/common/SwitchCase';
import { SectionErrorBoundary } from '@/components/error/SectionErrorBoundary';
import { Button, Tabs } from '@/components/ui';

export default function ChargeForm() {
  const { currentTab, setTab, amount, location, method } = useChargeStore();
  const { mutate: submitCharge } = useSubmitChargeMutation();

  const isValid = useMemo(() => {
    return amount >= 1000 && method !== 'none';
  }, [amount, method]);

  const handleSubmit = () => {
    if (!isValid) return;
    submitCharge({ amount, location, method });
  };

  return (
    <div className="m-auto w-full max-w-md">
      <nav>
        <Tabs>
          {TAB_DATA.map((item, index) => (
            <Tabs.Item
              key={`tab-${index}`}
              label={item.label}
              isActive={currentTab === item.value}
              onClick={() => setTab(item.value)}
            ></Tabs.Item>
          ))}
        </Tabs>
      </nav>

      <SwitchCase
        renderKey={currentTab}
        cases={{
          CASH: (
            <>
              <ChargeAmount />
              <SectionErrorBoundary sectionName={PAYMENT_TEXTS.METHOD}>
                <PaymentMethodDetails />
              </SectionErrorBoundary>

              <ChargeSummary price={amount}>
                <Button.Round
                  variant="primary"
                  size="xl"
                  disabled={!isValid}
                  onClick={handleSubmit}
                >
                  {PAYMENT_TEXTS.CHARGE}
                </Button.Round>
              </ChargeSummary>
              <PaymentMethodBottomSheet />
            </>
          ),
          AUTO: <div>자동 충전</div>,
        }}
      />
    </div>
  );
}
