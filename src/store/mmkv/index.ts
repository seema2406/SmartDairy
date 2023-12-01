import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

const setItem = (key: string, value: any) => {
  storage.set(key, JSON.stringify(value));
  return Promise.resolve(true);
};

const getItem = (key: string) => {
  const value = storage.getString(key);
  if (value) {
    return JSON.parse(value);
  }
  return null;
};

const removeItem = (key: string) => {
  storage.delete(key);
  return Promise.resolve();
};

const hasMMKV = (key: string) => storage.contains(key);

const clearAll = () => storage.clearAll();

export default {
  setItem,
  getItem,
  removeItem,
  hasMMKV,
  clearAll,
};
