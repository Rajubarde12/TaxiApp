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
  // registrationData: null,
  otp: '',
};

const loginSlice = createSlice({
  initialState,
  name: 'Auth',
  reducers: {
    USER_LOADING: (state, action) => {
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
    USER_REGISTER_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.otp = action.payload.otp;
      state.user = action.payload.user;
    },
    USER_REGISTER_ERROR: (state, action) => {
      state.isLoading = false;
    },
  },
});
export const {
  USER_LOADING,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR,
} = loginSlice.actions;
export default loginSlice.reducer;
export const userLogin = (data, navigation) => {
  return async dispatch => {
    dispatch(USER_LOADING());
    try {
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${MAIN_URL}/auth/login-new`,
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
export const userRegistation = (data, navigation) => {
  return async dispatch => {
    dispatch(USER_LOADING());
    try {
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${MAIN_URL}/auth/sign-up-new`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(data),
      };
      const response = await axios.request(config);
      console.log(response.data);

      if (response?.data?.status == 201) {
        dispatch(
          USER_REGISTER_SUCCESS({
            user: response?.data?.data?.user,
            // token: response?.data?.data?.token,
          }),
        );

        dispatch(getUserFromLocal());
        navigation.replace('OtpScreen');
        Toast.show('Otp Sent');
      } else {
        Toast.show(response.message);
        dispatch(USER_REGISTER_ERROR());
      }
    } catch (error) {
      console.log(error);
      if (error.status == 409) {
        Toast.show('User Alreday Exist');
      } else {
        Toast.show('Something went wrong');
      }
      dispatch(USER_REGISTER_ERROR());
    }
  };
};
