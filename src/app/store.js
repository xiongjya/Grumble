import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from '../redux/sessionSlice';
import filterReducer from '../redux/filterOptionsSlice';

export default configureStore({
  reducer: {
      session: sessionReducer,
      filtered: filterReducer,
  },
})