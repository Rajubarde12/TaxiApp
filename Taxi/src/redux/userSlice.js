import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';
import {DATABASE} from '../utils/DATABASE';
import {MAIN_URL} from '../constants';
import axios from 'axios';
const initialState = {user: '', token: ''};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    SET_USER: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    USER_RETRIEVAL_ERROR: (state, action) => {
      return state;
    },
  },
});
export const {SET_USER} = userSlice.actions;
export default userSlice.reducer;

export const getUserFromLocal = (user = null, token = null) => {
  return async dispatch => {
    try {
      const [storedUser, storedToken] = await Promise.all([
        AsyncStorage.getItem(DATABASE.user),
        AsyncStorage.getItem(DATABASE.token),
      ]);

      const finalUser = user ?? JSON.parse(storedUser) ?? null;
      const finalToken = token ?? storedToken ?? null;

      // dispatch({
      //   type: 'user/SET_USER',
      //   payload: {
      //     user: finalUser,
      //     token: finalToken,
      //   },
      // });
    } catch (error) {
      console.error('Failed to retrieve user from local storage:', error);
      dispatch({
        type: 'USER_RETRIEVAL_ERROR',
        error,
      });
    }
  };
};
export const getUserProfile = async () => {
  return async dispatch => {
    const token = await AsyncStorage.getItem(DATABASE.token);
    try {
      if (token) {
        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `${MAIN_URL}/user/get-profile`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.request(config);
        if (response.data?.status == 200) {
          dispatch({
            type: 'user/SET_USER',
            payload: {
              user: response?.data?.data,
              token: token,
            },
          });
        } else {
          dispatch({
            type: 'user/USER_RETRIEVAL_ERROR',
            err: 'err',
          });
        }
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: 'user/USER_RETRIEVAL_ERROR',
        err,
      });
    }
  };
};
