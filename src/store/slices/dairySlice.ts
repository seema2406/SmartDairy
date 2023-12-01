import { createSlice } from '@reduxjs/toolkit';

export interface authState {
  selectedDairy: any;
}

const initialState: authState = {
  selectedDairy: {},
};

const dairySlice = createSlice({
  name: 'dairy',
  initialState,
  reducers: {
    setSelectedDairy: (state, action) => {
      state.selectedDairy = action.payload;
    },
  },
});

export const { setSelectedDairy } = dairySlice.actions;

export default dairySlice;
