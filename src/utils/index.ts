import { PIN_LENGTH, VAT_RATE } from '@/constants';

export function calculateTotalWithFee(price: number) {
  return price * (1 + VAT_RATE / 100);
}

// 핀번호 기본 유효성 검사
export function isValidPinFormat(pin: string): boolean {
  return /^\d+$/.test(pin) && pin.length === PIN_LENGTH;
}

// 연속 숫자 패턴 감지 (111111111111111111 같은 경우)
export function isSequentialPin(pin: string): boolean {
  // 모든 자리가 같은 숫자인 경우
  if (/^(\d)\1+$/.test(pin)) {
    return true;
  }

  // 1234567890 같은 순차 패턴
  for (let i = 0; i < pin.length - 1; i++) {
    if (Math.abs(Number.parseInt(pin[i]) - Number.parseInt(pin[i + 1])) !== 1) {
      return false;
    }
  }

  return pin.length > 5;
}

// 중복 핀번호 체크
export function isDuplicatePin(
  currentPin: string,
  existingPins: string[],
): boolean {
  return existingPins.includes(currentPin);
}
