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
import {setuserAddress, setUserCurrentRegoin} from '../../../redux/commonSlice';
import {
  getCoordsFromAddressName,
  getGeo,
} from '../../../utils/modals/getUserLocation';
import {useDispatch, useSelector} from 'react-redux';
const PickupScreen = ({route, navigation}) => {
  const {currentRegoin} = useSelector(state => state.common);
  const dispatch = useDispatch();
  const handlePlaceSelect = async (data, details) => {
    const {lat, lng} = details.geometry.location;

    const address = await getCoordsFromAddressName(lat, lng);

    dispatch(
      setUserCurrentRegoin({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.01, // Adjust zoom level as needed
        longitudeDelta: 0.01,
      }),
    );
    dispatch(setuserAddress(address));
  };
  const {region: regoiParams, address} = route?.params || {};

  const getUserLocation = async () => {
    const {latitude, longitude} = await getGeo();

    dispatch(
      setUserCurrentRegoin({
        latitude,
        longitude,
        longitudeDelta: 0.1,
        latitudeDelta: 0.1,
      }),
    );
    const address = await getCoordsFromAddressName(latitude, longitude);
    dispatch(setuserAddress(address));
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>
      <MapScreen
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
