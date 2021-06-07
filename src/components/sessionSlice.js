import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'session',
  initialState: {
    start: true,
    pin: ''
  },
  reducers: {
    joined: (state, bool) => {
      state.start = bool.payload;
    },
    setPin: (state, str) => {
      state.pin = str.payload;
    }
  },
});

export const { joined, setPin } = slice.actions;

export const selectStart = state => state.session.start;
export const selectPin = state => state.session.pin;

export default slice.reducer;