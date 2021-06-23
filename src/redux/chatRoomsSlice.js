import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'chatrooms',
  initialState: {
    chats: []
  },
  reducers: {
    addChats: (state, chatname) => {
      state.chats.push(chatname.payload);
    },
  },
});

export const { addChats } = slice.actions;

export const selectChats = state => state.chatrooms.start;

export default slice.reducer;