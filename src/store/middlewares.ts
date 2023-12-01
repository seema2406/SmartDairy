import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import authApi from '../services/authService';
import { AnyAction, Dispatch, Middleware } from 'redux';
import partyApi from '../services/partyService';

export const getMiddleware = (
  getDefaultMiddleware: CurriedGetDefaultMiddleware,
) => {
  const devMiddlewares: Middleware<any, any, Dispatch<AnyAction>>[] = [];
  return getDefaultMiddleware({
    serializableCheck: false,
  }).concat(...devMiddlewares, authApi.middleware, partyApi.middleware);
};
