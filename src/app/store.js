import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from '../components/sessionSlice';

export default configureStore({
  reducer: {
      session: sessionReducer,
  },
})