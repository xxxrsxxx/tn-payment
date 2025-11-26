'use client';

import { INTERNATIONAL_PAYMENTS_DATA, PAYMENT_TEXTS } from '@/constants';
import { useChargeStore } from '@/features/charge/stores/charge.store';
import type { LocationTYPE } from '@/type';

import { Button, Card, Radio, Slider } from '@/components/ui';

export default function PaymentMethodDetails() {
  const {
    location,
    method,
    methodHistory,
    setMethod,
    setLocation,
    setBottomSheet,
  } = useChargeStore();

  return (
    <div className="section">
      <div className="section-header">
        <header>
          <h5>{PAYMENT_TEXTS.METHOD}</h5>
          <Button.Round
            variant="none"
            size="md"
            onClick={() => {
              setBottomSheet(true);
            }}
          >
            {PAYMENT_TEXTS.CHANGE_METHOD.replace(/\s+/g, '')}
          </Button.Round>
        </header>

        <Radio
          name="payment-type"
          defaultValue={location}
          onChange={(value: string) => {
            setLocation(value as LocationTYPE);
          }}
        >
          <Radio.Item value={'DOMESTIC'}>
            <span>
              {PAYMENT_TEXTS.DOMESTIC} {PAYMENT_TEXTS.PAY}
            </span>
          </Radio.Item>
          {location === 'DOMESTIC' && (
            <div className="card-container">
              <Slider.AlignCenter>
                {methodHistory.DOMESTIC.length > 0 &&
                  methodHistory.DOMESTIC.map((item, idx) => {
                    const selected = method === item;
                    return (
                      <Card.Payment
                        key={`payment-${idx}`}
                        className={`card ${item}`}
                        onClick={event => {
                          event.stopPropagation();
                          console.log('item', item, method);
                          setMethod(item);
                        }}
                      >
                        {selected && <span className="text-right">✓</span>}
                      </Card.Payment>
                    );
                  })}
                <Card.Payment
                  className="card new"
                  onClick={() => {
                    setBottomSheet(true);
                  }}
                >
                  {PAYMENT_TEXTS.ADD}
                </Card.Payment>
              </Slider.AlignCenter>
            </div>
          )}
          {location === 'INTERNATIONAL' && <div className="divider" />}
          <Radio.Item value={'INTERNATIONAL'}>
            <span>
              {PAYMENT_TEXTS.INTERNATIONAL} {PAYMENT_TEXTS.PAY}
            </span>
          </Radio.Item>
          {location === 'INTERNATIONAL' && (
            <ul className="international-method">
              {INTERNATIONAL_PAYMENTS_DATA.map((item, index) => {
                const selected = item.value === method;
                return (
                  <li
                    key={`foreigner-method-${index}`}
                    className={`${selected && 'selected'}`}
                  >
                    <Button.Round
                      variant="none"
                      size="lg"
                      color={selected ? 'blue50' : 'gray50'}
                      onClick={event => {
                        event.stopPropagation();
                        setMethod(item.value);
                      }}
                    >
                      {item.label}
                      <br />
                      {item.desc && <span>{item.desc}</span>}
                    </Button.Round>
                  </li>
                );
              })}
            </ul>
          )}
        </Radio>
      </div>
    </div>
  );
}
