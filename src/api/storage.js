import store from 'store';

export const saveDataToStorage = (key, data) => {
  const parsedData = JSON.parse(JSON.stringify(data)); // added due to data being proxy labelled in console.log
  store.set(key, parsedData);
};

export const getDataFromStorage = key => {
  const data = store.get(key);
  return data;
};

export const clearAll = () => {
  store.clearAll();
};
