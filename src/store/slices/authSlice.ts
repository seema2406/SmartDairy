import { createSlice } from '@reduxjs/toolkit';
import authApi from '../../services/authService';
import MMKVStorage from '../mmkv';
import { MMKV_KEYS } from '../../constants/mmkvConstant';
import { size } from 'lodash';

export interface authState {
  user: any;
  userID: any;
  isDairyCreated: boolean;
  isValidUser: boolean;
}

const initialState: authState = {
  user: null,
  userID: null,
  isDairyCreated: false,
  isValidUser: false,
};

const validateUserData = (state: any, action: any) => {
  const { nUserid, Dairy } =
    (action?.payload?.Data &&
      size(action?.payload?.Data) &&
      action?.payload?.Data[0]) ||
    {};
  MMKVStorage.setItem(MMKV_KEYS.userID, nUserid || null);
  if (nUserid) {
    if (typeof Dairy !== 'string' && size(Dairy) > 0) {
      state.userID = nUserid;
      state.user = action?.payload?.Data[0];
      state.isDairyCreated = true;
      state.isValidUser = true;
    } else {
      state.userID = nUserid;
      state.user = null;
      state.isDairyCreated = false;
      state.isValidUser = true;
    }
  } else {
    state.userID = null;
    state.user = null;
    state.isDairyCreated = false;
    state.isValidUser = false;
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAuthState: (state, action) => {
      validateUserData(state, action);
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      authApi.endpoints.checkDevice.matchFulfilled,
      (state, action) => {
        validateUserData(state, action);
      },
    );
    builder.addMatcher(
      authApi.endpoints.verifyOtp.matchFulfilled,
      (state, action) => {
        validateUserData(state, action);
      },
    );
  },
});

export const { setUser, setAuthState } = authSlice.actions;

export default authSlice;
