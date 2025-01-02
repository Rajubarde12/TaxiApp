import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import MapScreen from '../../../components/MapScreen';
import {colors} from '../../../constants/colors';
import {BottomSheetWrapperComponent} from '../../../components/BottumSheet';
import {moderateScale} from '../../../utils/Scalling';
import CustomText from '../../../components/CustomText';
import fonts from '../../../constants/fonts';
import {fontSize} from '../../../constants/fontSize';
import {
  ArrowLeft,
  ArrowRight,
  Bus,
  Car,
  Cash,
  Checkmark,
  LiveLocation,
  Location2,
  LocationInput,
  LocationLogo,
  Office,
  Plush,
  Promo,
  RadioBalck,
  Save,
  Saved1,
  SearchingRideIcon,
  UserBook,
  Watch,
} from '../../../constants/svgIcons';
import {width} from '../../../constants/Dimentions';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import {useSelector} from 'react-redux';
import {Marker} from 'react-native-maps';
const SearchingRide = ({route, navigation}) => {
  const {region, address} = route?.params || {};
  const {userAddress, destinationAddress} = useSelector(state => state.common);
  const {searchInfo} = useSelector(state => state.rider);
  console.log(JSON.stringify(searchInfo));

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>
      <MapScreen
        notSHow
        isData={searchInfo?.data}
        directions={true}
        isEnalble={true}
        onRegoin={region => {
          console.log(region);
        }}
        placeholder={address}>
        <Header title={'Book Ride'} />

        <View
          style={{
            backgroundColor: 'rgba(255,255,255,0.8)',
            width: '70%',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 20,
            paddingBottom: 40,
            borderRadius: 10,
          }}>
          <SearchingRideIcon />
        </View>
        <View style={styles.modalContainer}>
          <Button
            onPress={() => {
              navigation.navigate('DestinationScreen');
            }}
            title={`Cancel`}
          />
        </View>
      </MapScreen>
    </View>
  );
};
export default SearchingRide;
const data = [
  {
    icon: Car,
    time: '5 Min ',
    name: 'Mini',
    price: '$1.0',
    capacity: '3 Seats Capacity',
  },
  {
    icon: Bus,
    time: '9 Min ',
    name: 'Bus',
    price: '$5.0',
    capacity: '21 Seats Capacity',
  },
];
const styles = StyleSheet.create({
  modalContainer: {
    height: moderateScale(150),
    bottom: 0,
    backgroundColor: colors.white,
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
  },
  container: {
    backgroundColor: colors.white,
    marginTop: '8%',
    // borderWidth: 1,
    paddingHorizontal: '5%',
    width: '95%',
    elevation: 5,
    paddingVertical: 20,
    borderRadius: moderateScale(10),
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
    width: '100%',
    alignSelf: 'center',
  },
  separator: {
    height: 1.5,
    backgroundColor: colors.inputBorder,
    marginBottom: 10,
    width: '100%',
    // marginLeft: '14%',
    marginTop: 10,
  },
  autoPlaceContainer: {
    height: moderateScale(70),
    width: '100%',
    alignSelf: 'center',
    marginTop: -10,
    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 10,
    // borderWidth: 2,
    borderColor: colors.inputBorder,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    width: '100%',
    // borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
});
