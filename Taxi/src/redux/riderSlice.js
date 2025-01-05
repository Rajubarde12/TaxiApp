import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import {MAIN_URL} from '../constants';
const initialState = {
  searchInfo: null,
  isLoading: false,
  driveAccpetedData: null,
  bookingDetails: null,
};
const riderSlice = createSlice({
  name: 'rider',
  initialState,
  reducers: {
    SEARCH_RIDE_LOADING: (state, action) => {
      state.isLoading = true;
    },
    SEARCH_RIDE_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.searchInfo = action.payload;
    },
    SEARCH_RIDE_ERROR: (state, action) => {
      state.isLoading = false;
    },
    INIT_SEARCHRIDER: state => {
      return initialState;
    },
    SET_DRIVER_ACCPETED_DATA: (state, action) => {
      state.driveAccpetedData = action.payload;
    },
    getBookingDetailsSuccess: (state, action) => {
      state.bookingDetails = action.payload;
    },
  },
});
export const {
  SEARCH_RIDE_ERROR,
  SEARCH_RIDE_LOADING,
  SEARCH_RIDE_SUCCESS,
  INIT_SEARCHRIDER,
  SET_DRIVER_ACCPETED_DATA,
  getBookingDetailsSuccess,
} = riderSlice.actions;
export default riderSlice.reducer;
export const startSearchRiding = (data, token, navigation) => {
  return async dispatch => {
    dispatch(SEARCH_RIDE_LOADING());
    try {
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://taxi-5.onrender.com/api/app/user/book-ride',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: JSON.stringify(data),
      };
      const response = await axios.request(config);
      console.log(response.data);

      if (response.data.status == 200) {
        dispatch(SEARCH_RIDE_SUCCESS(response.data.data));
        setTimeout(() => {
          // navigation.navigate('Example');
        }, 5000);
      } else {
        dispatch(SEARCH_RIDE_ERROR());
        Toast.show('Something went wrong');
        console.log(response?.data);
      }
    } catch (err) {
      console.log(err.toJSON());
      Toast.show('Something went wrong');
      console.log(err);
      dispatch(SEARCH_RIDE_ERROR());
    }
  };
};
export const getBookingDetails = (data, token, navigation) => {
  return async dispatch => {
    try {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${MAIN_URL}/booking/get-booking/${data?.bookingId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.request(config);
      if (response.data?.data) {
        dispatch(getBookingDetailsSuccess(response.data.data));
        navigation.navigate('Example');
      } else {
        Toast.show('Something went wrong!');
        console.log(response?.data);
      }
    } catch (error) {
      console.log(error);

      Toast.show('Something went wrong!');
    }
  };
};
