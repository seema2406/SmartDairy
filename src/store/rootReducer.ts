import { AnyAction, combineReducers } from 'redux';
import authApi from '../services/authService';
import authSlice from './slices/authSlice';
import { LOGOUT } from './actions/authActions';
import MMKVStorage from './mmkv';
import { MMKV_KEYS } from '../constants/mmkvConstant';
import dairyApi from '../services/dairyService';
import partyApi from '../services/partyService';
import dairySlice from './slices/dairySlice';
import reportApi from '../services/reportService';

const appReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  auth: authSlice.reducer,
  [dairyApi.reducerPath]: dairyApi.reducer,
  [partyApi.reducerPath]: partyApi.reducer,
  dairy: dairySlice.reducer,
  [reportApi.reducerPath]: reportApi.reducer,
});

export default (state: any, action: AnyAction) => {
  if (action.type === LOGOUT) {
    state = undefined;
    MMKVStorage.removeItem(MMKV_KEYS.userID);
  }
  return appReducer(state, action);
};
