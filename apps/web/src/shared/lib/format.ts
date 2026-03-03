export const formatBirth = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 6); // 숫자만 6자리 추출
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  return `${digits.slice(0, 2)}.${digits.slice(2, 4)}.${digits.slice(4, 6)}`;
};

export const formatTel = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 11); // 숫자만 11자리 추출
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
};

export const toPureDigits = (value: string) => {
  return value.replace(/\D/g, '');
};
