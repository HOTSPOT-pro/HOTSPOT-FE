/**
 * Date 객체나 ISO 문자열을 'YYYY-MM-DD' 형식으로 변환합니다.
 */
export const formatDate = (date: Date | string | number): string => {
  if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return date;
  }

  const d = new Date(date);

  // 유효하지 않은 날짜인 경우 빈 문자열 반환
  if (isNaN(d.getTime())) return '';

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};
