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
  selectedAddressFromList: '',
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
      state.destinationAddress = action.payload?.dest;
    },
    setDsetinationUserRegion(state, action) {
      state.destinationRegoin = action.payload;
    },
    setSelectedAddressFromList: (state, action) => {
      state.selectedAddressFromList = action.payload;
    },
  },
});
export const {
  setuserAddress,
  setUserCurrentRegoin,
  setDestinationAdress,
  setDsetinationUserRegion,
  setSelectedAddressFromList,
} = common.actions;
export default common.reducer;
