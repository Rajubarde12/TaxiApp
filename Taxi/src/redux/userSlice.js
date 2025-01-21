import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';
import {DATABASE} from '../utils/DATABASE';
import {MAIN_URL} from '../constants';
import axios from 'axios';
import {Alert} from 'react-native';
const initialState = {user: '', token: '', savedAddress: []};
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
    GET_SAVED_ADDRESS: (state, action) => {
      state.savedAddress = action.payload;
    },
  },
});
export const {SET_USER, GET_SAVED_ADDRESS} = userSlice.actions;
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

      dispatch({
        type: 'user/USER_RETRIEVAL_ERROR',
      });
    } catch (error) {
      console.error('Failed to retrieve user from local storage:', error);
      dispatch({
        type: 'USER_RETRIEVAL_ERROR',
        error,
      });
    }
  };
};
export const getUserProfile = token1 => {
  return async dispatch => {
    try {
      const token = await AsyncStorage.getItem(DATABASE.token);
      if (!token) {
        console.error('Token not found');
        dispatch({
          type: 'user/USER_RETRIEVAL_ERROR',
          payload: 'Token not found',
        });
        return;
      }

      // Axios configuration
      const config = {
        method: 'get',
        url: `${MAIN_URL}/user/get-profile`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // API call
      const response = await axios.request(config);

      if (response.data?.status === 200) {
        dispatch({
          type: 'user/SET_USER',
          payload: {
            user: response.data.data,
            token: token1 ?? token,
          },
        });
      } else {
        console.error('Error in response:', response.data);
        dispatch({
          type: 'user/USER_RETRIEVAL_ERROR',
          payload: response.data?.message || 'Error retrieving user profile',
        });
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
      dispatch({
        type: 'user/USER_RETRIEVAL_ERROR',
        payload: err.message || 'An unexpected error occurred',
      });
    }
  };
};

export const getSavedAddress = () => {
  return async dispatch => {
    try {
      const token = await AsyncStorage.getItem(DATABASE.token);

      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${MAIN_URL}/user/get-all-address`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .request(config)
        .then(response => {
          if (response.data.status == 200) {
            dispatch(GET_SAVED_ADDRESS(response.data?.data?.data));
          }
        })
        .catch(error => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };
};
