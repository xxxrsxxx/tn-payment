export type TabType = 'CASH' | 'AUTO';
export type LocationTYPE = 'DOMESTIC' | 'INTERNATIONAL';

export type DomPaymentMethod = 'naverpay' | 'kakaopay' | 'tosspay' | 'culture';
export type IntPaymentMethod = 'EX1' | 'EX2' | 'EX3';
export type PaymentMethod = DomPaymentMethod | IntPaymentMethod | 'none';

export interface ChargeData {
  id: string;
  amount: number;
  method: PaymentMethod;
  location: LocationTYPE;
  methodHistory: MethodHistoryProps;
  totalAmount: number;
  date: string;
  status: string;
}

export interface MethodHistoryProps {
  DOMESTIC: DomPaymentMethod[];
  INTERNATIONAL: IntPaymentMethod[];
}

export interface SubmitReqBody {
  amount: number;
  location: LocationTYPE;
  method: PaymentMethod;
}

export interface SubmitResBody {
  transactionId: string;
}

//*****************************************************
export interface PinEntry {
  id: string;
  pinNumber: string;
  isVerified: boolean;
  amount: number;
}

export interface ValidationState {
  isValid: boolean;
  message: string;
}

export interface ChargeSummary {
  totalAmount: number;
  fee: number;
  totalCash: number;
}
