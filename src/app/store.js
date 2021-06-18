import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from '../redux/sessionSlice';
import filterReducer from '../redux/filterOptionsSlice';
import chatsReducer from '../redux/chatRoomsSlice';

export default configureStore({
  reducer: {
      session: sessionReducer,
      filtered: filterReducer,
      chatrooms: chatsReducer
  },
})