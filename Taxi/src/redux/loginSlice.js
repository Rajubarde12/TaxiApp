import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {MAIN_URL} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DATABASE} from '../utils/DATABASE';
import {getUserFromLocal} from './userSlice';
import Toast from 'react-native-simple-toast';
const initialState = {
  user: null,
  isLoading: false,
  token: '',
};

const loginSlice = createSlice({
  initialState,
  name: 'Auth',
  reducers: {
    USER_LOGIN_LOADING: (state, action) => {
      state.isLoading = true;
      state.user = null;
    },
    USER_LOGIN_SUCCESS: (state, action) => {
      state.isLoading = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    USER_LOGIN_ERROR: (state, action) => {
      state.isLoading = false;
      state.user = null;
    },
  },
});
export const {USER_LOGIN_LOADING, USER_LOGIN_SUCCESS, USER_LOGIN_ERROR} =
  loginSlice.actions;
export default loginSlice.reducer;
export const userLogin = (data, navigation) => {
  return async dispatch => {
    dispatch(USER_LOGIN_LOADING());
    try {
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://taxi-4.onrender.com/api/app/auth/login-new`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(data),
      };
      const response = await axios.request(config);
      if (response?.data?.status == 200) {
        dispatch(
          USER_LOGIN_SUCCESS({
            user: response?.data?.data?.user,
            token: response?.data?.data?.token,
          }),
        );
        await AsyncStorage.setItem(
          DATABASE.user,
          JSON.stringify(response?.data?.data?.user),
        );
        await AsyncStorage.setItem(DATABASE.token, response?.data?.data?.token);
        dispatch(
          getUserFromLocal(
            response?.data?.data?.token,
            response?.data?.data?.user,
          ),
        );
        navigation.reset({index: 0, routes: [{name: 'BottumTab'}]});
        Toast.show('Login success!');
      } else {
        Toast.show('User not exist');
        dispatch(USER_LOGIN_ERROR());
      }
    } catch (error) {
      console.log(error);
      Toast.show('Something went wrong');
      dispatch(USER_LOGIN_ERROR());
    }
  };
};
