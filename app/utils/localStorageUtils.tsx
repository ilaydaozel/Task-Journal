// utils/localStorageUtils.ts
export const getLocalStorageItem = (key: string) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  };
  
  export const setLocalStorageItem = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  
  export const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };
  