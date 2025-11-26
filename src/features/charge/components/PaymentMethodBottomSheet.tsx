'use client';

import NImage from 'next/image';

import { PAYMENTS_DATA, PAYMENT_TEXTS } from '@/constants';
import { useChargeStore } from '@/features/charge/stores/charge.store';

import { Button, Modal } from '@/components/ui';

export default function PaymentMethodBottomSheet() {
  const { bottomSheet, method, setBottomSheet, setMethod } = useChargeStore();

  return (
    <>
      {bottomSheet && (
        <Modal.BottomSheet
          isOpen={bottomSheet}
          onClose={() => {
            setBottomSheet(false);
          }}
        >
          <h4>{PAYMENT_TEXTS.CHANGE_METHOD}</h4>
          <div className="popup-content">
            <ul className="payment-container">
              {PAYMENTS_DATA.map((item, index) => {
                const selected = method === item.value;
                console.log('?selected', method);
                return (
                  <li
                    key={`payment-${item.value}`}
                    className={`${selected && 'selected'} `}
                  >
                    <Button.Round
                      variant="none"
                      size="lg"
                      color={selected ? 'blue50' : 'gray50'}
                      onClick={event => {
                        event.stopPropagation();
                        setMethod(item.value);
                        setBottomSheet(false);
                      }}
                    >
                      <NImage
                        width={item.width}
                        height={item.height}
                        src={selected ? item.on : item.off}
                        alt={item.label}
                      />
                      <p>{item.label}</p>
                    </Button.Round>
                  </li>
                );
              })}
            </ul>
          </div>
        </Modal.BottomSheet>
      )}
    </>
  );
}
