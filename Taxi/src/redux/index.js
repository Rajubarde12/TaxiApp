import {configureStore} from '@reduxjs/toolkit';
import commonReducer from './commonSlice';
const store = configureStore({
  reducer: {
    common: commonReducer,
  },
});
export default store;
