import { Linking } from 'react-native';
import { MODALS } from '../constants/routeConstant';
import modalfy from './modalfy';

const globalAny: any = global;

export const showToaster = (
  message: string,
  type: 'S' | 'E',
  title?: string,
) => {
  globalAny.props.showToaster({
    message,
    type,
    title,
  });
};

export const startLoader = () => {
  if (modalfy.isModalOpened(MODALS.loader)) {
    return;
  }
  modalfy.open(MODALS.loader);
};

export const stopLoader = () => {
  modalfy.close(MODALS.loader);
};

export const openModal = (name: string, params?: any) => {
  if (modalfy.isModalOpened(name)) {
    return;
  }
  modalfy.open(name, params);
};

export const closeModal = (name: string) => {
  modalfy.close(name);
};

export const getFormData = (jsonData: any) => {
  const formData = new FormData();
  formData.append('JsonData', JSON.stringify(jsonData));
  return formData;
};

export const randomNum = () => {
  const min = 1;
  const max = 100;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
};

export const openPDFFile = async (fileUrl: string) => {
  const supported = await Linking.canOpenURL(fileUrl);
  if (supported) {
    await Linking.openURL(fileUrl);
  }
};
