import store from 'store';

export const saveDataToStorage = (key, data) => {
  store.set(key, data);
};

export const getDataFromStorage = key => store.get(key);
