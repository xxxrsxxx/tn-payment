import { ChargeData } from '@/type';

interface GlobalWithMockDB {
  mockChargeDB: Map<string, ChargeData>;
}

const globalForMockDB = global as unknown as GlobalWithMockDB;

export const mockChargeDB =
  globalForMockDB.mockChargeDB || new Map<string, ChargeData>();

if (process.env.NODE_ENV !== 'production') {
  globalForMockDB.mockChargeDB = mockChargeDB;
}
