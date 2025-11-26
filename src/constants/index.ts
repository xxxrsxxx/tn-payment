import { DomPaymentMethod, IntPaymentMethod, TabType } from '@/type';

export const VAT_RATE = 10; // 부가세율 10%

interface TabDataProps {
  label: string;
  value: TabType;
}
export const TAB_DATA: TabDataProps[] = [
  {
    label: '캐시충전',
    value: 'CASH',
  },
  {
    label: '자동충전',
    value: 'AUTO',
  },
];

export const OPTIONS: { value: number; label: string }[] = [
  { value: 1000, label: '1,000' },
  { value: 10000, label: '10,000' },
  { value: 50000, label: '50,000' },
];

export const PAYMENTS_DATA: {
  label: string;
  on: string;
  off: string;
  width: number;
  height: number;
  value: DomPaymentMethod;
}[] = [
  {
    label: '네이버페이',
    on: 'https://sbosirdwzbyw9257399.gcdn.ntruss.com/assets/frontend-assets/toonation/donator/assets/images/icon/charge/ic_danal_naverpay_light_on.png?v=4',
    off: 'https://sbosirdwzbyw9257399.gcdn.ntruss.com/assets/frontend-assets/toonation/donator/assets/images/icon/charge/ic_danal_naverpay_light_off.png?v=4',
    width: 66,
    height: 24,
    value: 'naverpay',
  },
  {
    label: '카카오페이',
    on: 'https://sbosirdwzbyw9257399.gcdn.ntruss.com/assets/frontend-assets/toonation/donator/assets/images/icon/charge/ic_danal_kakaopay_light_on.png?v=4',
    off: 'https://sbosirdwzbyw9257399.gcdn.ntruss.com/assets/frontend-assets/toonation/donator/assets/images/icon/charge/ic_danal_kakaopay_light_off.png?v=4',
    width: 24,
    height: 24,
    value: 'kakaopay',
  },
  {
    label: '토스페이',
    on: 'https://sbosirdwzbyw9257399.gcdn.ntruss.com/assets/frontend-assets/toonation/donator/assets/images/icon/charge/ic_toss_light_on.png?v=4',
    off: 'https://sbosirdwzbyw9257399.gcdn.ntruss.com/assets/frontend-assets/toonation/donator/assets/images/icon/charge/ic_toss_light_off.png?v=4',
    width: 24,
    height: 24,
    value: 'tosspay',
  },
  {
    label: '문화상품권',
    on: 'https://sbosirdwzbyw9257399.gcdn.ntruss.com/assets/frontend-assets/toonation/donator/assets/images/icon/charge/ic_culturegift_light_on.png?v=4',
    off: 'https://sbosirdwzbyw9257399.gcdn.ntruss.com/assets/frontend-assets/toonation/donator/assets/images/icon/charge/ic_culturegift_light_off.png?v=4',
    width: 92,
    height: 24,
    value: 'culture',
  },
];

export const INTERNATIONAL_PAYMENTS_DATA: {
  label: string;
  desc: string;
  value: IntPaymentMethod;
}[] = [
  {
    label: '신용카드',
    desc: '(VISA/MASTER/JCB)',
    value: 'EX1',
  },
  {
    label: '신용카드',
    desc: '(AMEX)',
    value: 'EX2',
  },
  {
    label: '유니온페이',
    desc: '',
    value: 'EX3',
  },
];

export const PAYMENT_TEXTS = {
  DOMESTIC: '국내',
  INTERNATIONAL: '해외',
  PAY: '결제',
  CHARGE: '충전하기',
  METHOD: '결제 수단',
  ADD: '결제 수단 추가',
  CHANGE_METHOD: '결제 수단 변경',
  CHARGE_AMOUNT: '충전 금액',
  CASH_UNIT: '캐시',
  CHARGE_UNIT_DESC: '충전 금액은 1,000 캐시 단위로만 결제 가능합니다.',
} as const;

export const ERROR_TEXTS = {
  DEFAULT_ERROR: '알 수 없는 오류가 발생했습니다.',
  NETWORK_ERROR: '네트워크 연결을 확인해주세요.',
  SUBMIT_ERROR: '충전 요청 중 오류가 발생했습니다.',
} as const;

// ********************************************************
export const PIN_LENGTH = 18;
