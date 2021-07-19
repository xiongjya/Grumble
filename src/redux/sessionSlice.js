import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'session',
  initialState: {
    start: true,
    pin: '',
    sessionSize: 0
  },
  reducers: {
    joined: (state, bool) => {
      state.start = bool.payload;
    },
    setPin: (state, str) => {
      state.pin = str.payload;
    },
    setSessionSize: (state, num) => {
      state.sessionSize = num.payload;
    }
  },
});

export const { joined, setPin, setSessionSize } = slice.actions;

export const selectStart = state => state.session.start;
export const selectPin = state => state.session.pin;
export const selectSessionSize = state => state.session.sessionSize;

export default slice.reducer;