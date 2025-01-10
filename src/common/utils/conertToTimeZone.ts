import { formatInTimeZone } from 'date-fns-tz';

export const convertToTimeZone = (date: Date, timeZone: string) => {
  return formatInTimeZone(date, timeZone, 'yyyy-MM-dd HH:mm:ssXXX');
};
