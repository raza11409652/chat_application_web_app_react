// /check if you are on the client (browser) or server
const isBrowser = () => typeof window !== "undefined";

// Get item from local storage
export const getItemFromLocal = (key: string) => {
  if (isBrowser()) {
    const item = window.localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    } else {
      return undefined;
    }
  }
};

// Set item from local storage
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setItemInLocal = (key: string, data: any) => {
  window.localStorage.setItem(key, JSON.stringify(data));
};

// Remove item from local storage
export const removeItemFromLocal = (key: string) => {
  window.localStorage.removeItem(key);
};

// Delete all from local
export const deleteAllFromLocal = () => {
  window.localStorage.clear();
};
