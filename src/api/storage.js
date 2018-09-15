import store from 'store';

export const saveDataToStorage = (key, data) => {
  store.set(key, data);
};

export const getDataFromStorage = key => {
  const data = store.get(key);
  return data;
};

export const clearAllLocalStorage = () => {
  store.clearAll();
};
