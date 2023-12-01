import React, { createContext, createRef } from 'react';
import { ModalProvider } from 'react-native-modalfy';
import ModalStack from '../navigation/ModalStack';
import Toaster from '../components/toaster/Toaster';

export const AppContext = createContext({} as any);

export const AppProvider = ({ children }: any) => {
  const toasterRef = createRef<any>();

  const showToaster = (args: Object) => {
    toasterRef?.current?.showToaster(args);
  };

  return (
    <AppContext.Provider value={{ showToaster }}>
      <ModalProvider stack={ModalStack}>{children}</ModalProvider>
      <Toaster ref={toasterRef} />
    </AppContext.Provider>
  );
};
