import type {
  DomPaymentMethod,
  IntPaymentMethod,
  LocationTYPE,
  MethodHistoryProps,
  PaymentMethod,
  TabType,
} from '@/type';
import { create } from 'zustand';

interface ChargeState {
  currentTab: TabType;
  amount: number;
  location: LocationTYPE;
  method: PaymentMethod;
  methodHistory: MethodHistoryProps;
  bottomSheet: boolean;
}

interface ChargeActions {
  setTab: (tab: TabType) => void;
  setAmount: (amount: number) => void;
  addAmount: (value: number) => void;
  clearAmount: () => void;
  setLocation: (location: LocationTYPE) => void;
  setBottomSheet: (value: boolean) => void;
  setMethod: (method: PaymentMethod) => void;
  initState: (initialState: Partial<ChargeState>) => void;
}

const initialState: ChargeState = {
  currentTab: 'CASH',
  amount: 3000,
  location: 'DOMESTIC',
  method: 'none',
  methodHistory: {
    DOMESTIC: [],
    INTERNATIONAL: [],
  },
  bottomSheet: false,
};

export const useChargeStore = create<ChargeState & ChargeActions>()(set => ({
  ...initialState,
  setTab: tab => set({ currentTab: tab }),
  setAmount: amount => set({ amount }),
  addAmount: value => set(state => ({ amount: state.amount + value })),
  clearAmount: () => set({ amount: 0 }),
  setLocation: location => set({ location }),
  setBottomSheet: value => set({ bottomSheet: value }),
  setMethod: method =>
    set(state => {
      const { location, methodHistory } = state;
      if (location === 'INTERNATIONAL') {
        if (methodHistory.INTERNATIONAL[0] === method) return {};
        return {
          method,
          methodHistory: {
            ...methodHistory,
            INTERNATIONAL: [method as IntPaymentMethod],
          },
        };
      }
      if (location === 'DOMESTIC') {
        const currentList = methodHistory.DOMESTIC;
        if (currentList.includes(method as DomPaymentMethod))
          return {
            method,
          };

        return {
          method,
          methodHistory: {
            ...methodHistory,
            DOMESTIC: [method as DomPaymentMethod, ...currentList],
          },
        };
      }
      return { method };
    }),
  initState: newState => set(newState),
}));
