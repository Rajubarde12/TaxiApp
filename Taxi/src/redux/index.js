import {configureStore} from '@reduxjs/toolkit';
import commonReducer from './commonSlice';
import loginReducer, {USER_LOGIN_SUCCESS} from './loginSlice';
import userReducer, {SET_USER} from './userSlice';
import riderReducer from './riderSlice';
const store = configureStore({
  reducer: {
    common: commonReducer,
    login: loginReducer,
    user: userReducer,
    rider: riderReducer,
  },
  middleware: getDefauk =>
    getDefauk({
      serializableCheck: {
        ignoredActions: [SET_USER, USER_LOGIN_SUCCESS],
        ignoredActionPaths: [
          'userReducer.nonSerializable',
          'loginReducer.nonSerializable',
        ],
      },
    }),
});
export default store;
