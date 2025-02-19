import { Time } from 'lightweight-charts';

export const timeToLocal = (originalTime: number): Time => {
  const d = new Date(originalTime);
  return (Date.UTC(
    d.getFullYear(),
    d.getMonth(),
    d.getDate(),
    d.getHours(),
    d.getMinutes(),
    d.getSeconds(),
    d.getMilliseconds(),
  ) / 1000) as Time;
};
