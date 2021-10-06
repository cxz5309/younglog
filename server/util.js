export const StringToDate = (str) => Date.parse(str);

export const DateToString = (date) => date.toLocaleDateString('ko-KR', { timeZone: 'UTC' });

