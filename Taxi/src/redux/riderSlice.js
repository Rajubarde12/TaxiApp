import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
const initialState = {
  searchInfo: null,
  isLoading: false,
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
  },
});
const {
  SEARCH_RIDE_ERROR,
  SEARCH_RIDE_LOADING,
  SEARCH_RIDE_SUCCESS,
  INIT_SEARCHRIDER,
} = riderSlice.actions;
export default riderSlice.reducer;
export const startSearchRiding = (data, token) => {
  return async dispatch => {
    dispatch(SEARCH_RIDE_LOADING());
    try {
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://taxi-4.onrender.com/api/app/user/book-ride',
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
      } else {
        dispatch(SEARCH_RIDE_ERROR());
        Toast.show('Something went wrong');
        console.log(response?.data);
      }
    } catch (err) {
      console.log(err);
      Toast.show('Something went wrong');
      console.log(err);
    }
  };
};
