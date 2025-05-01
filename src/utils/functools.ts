export const debounce = (fn: (...args: any[]) => any, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return function (...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};
