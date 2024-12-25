import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  userAddress: '',
  currentRegoin: {
    latitude: 0.0,
    longitude: 0.0,
    latitudeDelta: 0.01, // Adjust zoom level as needed
    longitudeDelta: 0.01,
  },
  destinationRegoin: {
    latitude: 0.0,
    longitude: 0.0,
    latitudeDelta: 0.01, // Adjust zoom level as needed
    longitudeDelta: 0.01,
  },
  destinationAddress: '',
};
const common = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setuserAddress(state, action) {
      state.userAddress = action.payload;
    },
    setUserCurrentRegoin(state, action) {
      state.currentRegoin = action.payload;
    },
    setDestinationAdress(state, action) {
      state.currentRegoin = action.payload?.regoin;
      state.destinationAddress = action.payload?.dest;
    },
  },
});
export const {setuserAddress, setUserCurrentRegoin, setDestinationAdress} =
  common.actions;
export default common.reducer;
