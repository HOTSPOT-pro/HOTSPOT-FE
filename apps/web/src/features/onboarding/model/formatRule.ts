export const ONBOARDING_RULES = {
  birth: {
    required: '필수 입력 항목입니다.',
    validate: (value: string) => {
      const digits = value.replace(/\D/g, '');
      if (digits.length !== 6) return '6자리 숫자를 입력해주세요.';
      const month = parseInt(digits.slice(2, 4));
      if (month < 1 || month > 12) return '유효한 월이 아닙니다.';
      return true;
    },
  },
  tel: {
    minLength: { message: '번호를 모두 입력해주세요.', value: 13 },
    required: '필수 입력 항목입니다.',
  },
} as const;
