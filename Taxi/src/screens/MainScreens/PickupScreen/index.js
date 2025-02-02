import {FlatList, Pressable, View} from 'react-native';
import MapScreen from '../../../components/MapScreen';
import {colors} from '../../../constants/colors';
import {BottomSheetWrapperComponent} from '../../../components/BottumSheet';
import {moderateScale} from '../../../utils/Scalling';
import CustomText from '../../../components/CustomText';
import fonts from '../../../constants/fonts';
import {fontSize} from '../../../constants/fontSize';
import {LiveLocation, Location2, Office} from '../../../constants/svgIcons';
import {width} from '../../../constants/Dimentions';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import {useState} from 'react';
import {
  setDestinationAdress,
  setDsetinationUserRegion,
  setuserAddress,
  setUserCurrentRegoin,
} from '../../../redux/commonSlice';
import {
  getCoordsFromAddressName,
  getGeo,
} from '../../../utils/modals/getUserLocation';
import {useDispatch, useSelector} from 'react-redux';
const PickupScreen = ({route, navigation}) => {
  const {currentRegoin, destinationRegoin} = useSelector(state => state.common);
  const {region: regoiParams, address, screen} = route?.params || {};
  const dispatch = useDispatch();
  const handlePlaceSelect = async (data, details) => {
    const {lat, lng} = details.geometry.location;

    const address = await getCoordsFromAddressName(lat, lng);
    if (screen == 'DestinationScreen') {
      dispatch(
        setDestinationAdress({
          dest: address,
        }),
      );
      dispatch(
        setDsetinationUserRegion({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }),
      );
    } else {
      dispatch(
        setUserCurrentRegoin({
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.01, // Adjust zoom level as needed
          longitudeDelta: 0.01,
        }),
      );
      dispatch(setuserAddress(address));
    }
  };

  const getUserLocation = async ({latitude1, longitude1}) => {
    const {latitude, longitude} = await getGeo();
    const address = await getCoordsFromAddressName(latitude, longitude);
    if (screen == 'DestinationScreen') {
      dispatch(
        setDestinationAdress({
          dest: address,
        }),
      );
      dispatch(
        setDsetinationUserRegion({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }),
      );
    } else {
      dispatch(
        setUserCurrentRegoin({
          latitude: latitude1 ?? latitude,
          longitude: longitude1 ?? longitude,
          longitudeDelta: 0.1,
          latitudeDelta: 0.1,
        }),
      );

      dispatch(setuserAddress(address));
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>
      <MapScreen
        screen={screen}
        getGeo1={getUserLocation}
        getGeo={getUserLocation}
        region={currentRegoin}
        handlePlaceSelect={handlePlaceSelect}
        regionz
        isIcon
        isEnalble={true}
        onRegoin={region => {
          console.log(region);
        }}
        placeholder={address}>
        <Header title={'Pick-Up'} />

        <View
          style={{
            height: moderateScale(150),
            bottom: 0,
            backgroundColor: colors.white,
            // position: 'absolute',
            paddingHorizontal: moderateScale(25),
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: {width: 0, height: -2},
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 10,
            overflow: 'hidden',
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
            position: 'absolute',
            width: width,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Button
            onPress={() => {
              navigation.navigate('DestinationScreen');
            }}
            title={'Confirm Location'}
          />
        </View>
      </MapScreen>
    </View>
  );
};
export default PickupScreen;
const data = [
  {
    id: '1',
    icon: Location2,
    title: 'Destination',
    desc: 'Enter Destination',
  },
  {
    id: '2',
    icon: Office,
    title: 'Office',
    desc: '35 KM Away',
  },
];
