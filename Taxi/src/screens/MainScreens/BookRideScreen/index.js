import {
  Alert,
  FlatList,
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import MapScreen from '../../../components/MapScreen';
import {colors} from '../../../constants/colors';
import {BottomSheetWrapperComponent} from '../../../components/BottumSheet';
// import {moderateScale} from '../../../utils/Scalling';
import {moderateScale} from 'react-native-size-matters';
import CustomText from '../../../components/CustomText';
import fonts from '../../../constants/fonts';
import {fontSize} from '../../../constants/fontSize';
import {
  ArrowLeft,
  ArrowRight,
  Bus,
  BusInactive,
  Car,
  CarInActive,
  Cash,
  Checkmark,
  LiveLocation,
  Location2,
  LocationInput,
  Office,
  Plush,
  Promo,
  RadioBalck,
  Save,
  Saved1,
  UserBook,
  Watch,
} from '../../../constants/svgIcons';
import {width} from '../../../constants/Dimentions';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {distance} from '../../../utils/modals/calculateFunction';
import {startSearchRiding} from '../../../redux/riderSlice';
import axios from 'axios';
import Loader from '../../../components/Loader';
const BookRideScreen = ({route, navigation}) => {
  const {region, address} = route?.params || {};

  const {userAddress, destinationAddress, destinationRegoin, currentRegoin} =
    useSelector(state => state.common);
  const {user, token} = useSelector(state => state.user);
  const {isLoading} = useSelector(state => state.rider);

  const dispatch = useDispatch();
  const [selected, setSelected] = useState({});

  const searchRide = async () => {
    if (selected?.name == 'Bus') {
      Linking.openURL('https://24x7taxi.is/bus');
      return;
    }
    // navigation.navigate('ArrivedAtDestination');
    // return;
    try {
      // Extract latitude and longitude from regions
      const pickupLatitude = currentRegoin?.latitude;
      const pickupLongitude = currentRegoin?.longitude;
      const destinationLatitude = destinationRegoin?.latitude;
      const destinationLongitude = destinationRegoin?.longitude;

      if (
        !pickupLatitude ||
        !pickupLongitude ||
        !destinationLatitude ||
        !destinationLongitude
      ) {
        console.error(
          'Missing location coordinates for pickup or destination.',
        );
        return;
      }

      // Calculate distance and total amount (if applicable)
      const totalDistance = distance(
        pickupLatitude,
        pickupLongitude,
        destinationLatitude,
        destinationLongitude,
        'K',
      );
      const totalAmount = totalDistance * 5; // Assuming 5 is the rate per kilometer

      // Construct the payload for the API
      const now = new Date(Date.now());
      const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
      const requestData = {
        pickup_lat: pickupLatitude,
        pickup_long: pickupLongitude,
        destination_lat: destinationLatitude,
        destination_long: destinationLongitude,

        vehicle_type: 'Sedan',
        driver_gender: 'Male',
        total_amount: totalAmount,
        pickup_address: userAddress,
        destination_address: destinationAddress,
        rideType: 'Now',
        booking_date: formattedDate,
      };

      // console.log('Request Payload:', requestData);

      // // Configure the Axios request
      // const config = {
      //   method: 'post',
      //   maxBodyLength: Infinity,
      //   url: 'https://taxi-5.onrender.com/api/app/user/book-ride',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${token}`, // Ensure the token is valid
      //   },
      //   data: JSON.stringify(requestData),
      // };

      // // Make the API request
      // const response = await axios.request(config);
      // console.log('API Response:', response.data);

      // Optional: Dispatch an action if using Redux
      dispatch(startSearchRiding(requestData, token, navigation));
      navigation.navigate('SearchingRide');
    } catch (error) {
      // Handle errors
      console.error(
        'Error during ride booking:',
        error.response?.data || error.message,
      );
    }
  };

  useEffect(() => {
    setSelected(data[0]);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.Off_White,
      }}>
      <Loader loading={isLoading} />

      <MapScreen
        notSHow
        isEnalble={true}
        onRegoin={region => {
          console.log(region);
        }}
        placeholder={address}>
        <Header map={true} title={'Book Ride'} />

        <View
          style={[
            styles.modalContainer,
            {
              position: 'relative',
              marginTop: '10%',
              height: '100%',
              paddingBottom: moderateScale(150),
              justifyContent: 'flex-start',
              alignItems: 'center',
            },
          ]}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              width: '100%',
              paddingBottom: 30,
            }}>
            <View
              style={[
                styles.container,
                {width: '95%', paddingHorizontal: '4%'},
              ]}>
              <View
                style={[styles.rowContainer, {width: '100%', borderWidth: 0}]}>
                <RadioBalck height={18} width={18} />
                <CustomText
                  size={fontSize.Sixteen}
                  style={{marginLeft: 10}}
                  lines={1}>
                  {userAddress}
                </CustomText>
              </View>
              <View style={styles.separator} />
              <Pressable
                onPress={() => navigation.goBack()}
                style={styles.autoPlaceContainer}>
                <LocationInput height={20} width={20} />

                <CustomText
                  lines={1}
                  style={{width: '72%', marginLeft: '2%', marginRight: '0%'}}>
                  {destinationAddress}
                </CustomText>

                <View style={{width: '10%', alignItems: 'center'}}>
                  <Saved1 height={20} width={20} />
                </View>
                <View style={{paddingHorizontal: 5}}>
                  <CustomText
                    color={'lightgrey'}
                    size={fontSize.Sixteen}
                    fontFamily={fonts.medium}>
                    |
                  </CustomText>
                </View>
                <Plush />
              </Pressable>
            </View>
            <View
              style={[
                styles.container,
                {
                  marginTop: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  // paddingTop: moderateScale(18),
                  paddingHorizontal: moderateScale(18),
                  paddingVertical: moderateScale(14),
                },
              ]}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Watch />
                <CustomText style={{marginLeft: 10}}>Now</CustomText>
              </View>
              <ArrowLeft height={14} width={14} />
            </View>
            <View
              style={{
                width: width,
                paddingVertical: 10,

                alignItems: 'center',
                justifyContent: 'center',

                zIndex: 20,
              }}>
              <FlatList
                data={data}
                horizontal
                contentContainerStyle={{paddingVertical: 10}}
                renderItem={({item, index}) => {
                  const isSelected = selected?.name == item?.name;
                  let Icon = isSelected ? item.icon : item.invactive;
                  return (
                    <Pressable
                      onPress={() => {
                        setSelected(item);
                      }}
                      style={{
                        width: width * 0.44,
                        zIndex: 10,
                        borderWidth: 1.5,
                        marginLeft: index == 0 ? 0 : moderateScale(15),
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: 20,
                        paddingBottom: 10,
                        borderColor: isSelected
                          ? colors.yellow
                          : colors.inputBorder,
                        borderRadius: moderateScale(8),
                      }}>
                      <Icon />
                      {isSelected ? (
                        <View
                          style={{
                            backgroundColor: colors.yellow,
                            position: 'absolute',
                            right: '-5%',
                            top: '-5%',
                            zIndex: 15,
                            height: moderateScale(18),
                            width: moderateScale(18),
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 20,
                            elevation: 5,
                          }}>
                          <Checkmark
                            style={{tintColor: 'red'}}
                            height={14}
                            width={14}
                            // tintColor={'red'}
                          />
                        </View>
                      ) : null}
                      <CustomText color={colors.grey} size={fontSize.Thirteen}>
                        {item?.time}
                      </CustomText>

                      <View style={[styles.separator, {width: '90%'}]} />
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingHorizontal: '5%',
                          width: '100%',
                        }}>
                        <CustomText fontFamily={fonts.semi_bold}>
                          {item?.name}
                        </CustomText>
                        <CustomText fontFamily={fonts.semi_bold}>
                          {item?.price}
                          <Text
                            style={{
                              color: colors.grey,
                              fontFamily: fonts.medium,
                            }}>
                            {' /mile'}
                          </Text>
                        </CustomText>
                      </View>
                      <View style={{alignSelf: 'flex-start', marginLeft: '5%'}}>
                        <CustomText style={{alignSelf: 'left'}}>
                          {item?.capacity}
                        </CustomText>
                      </View>
                    </Pressable>
                  );
                }}
              />
            </View>
            <View
              style={[
                styles.container,
                {
                  marginTop: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  // paddingTop: moderateScale(18),
                  paddingHorizontal: moderateScale(18),
                  paddingVertical: moderateScale(14),
                },
              ]}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Cash />
                <CustomText style={{marginLeft: 10}}>Cash</CustomText>
              </View>
              <ArrowLeft height={14} width={14} />
            </View>
            <View
              style={[
                styles.container,
                {
                  marginTop: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  // paddingTop: moderateScale(18),
                  paddingHorizontal: moderateScale(18),
                  paddingVertical: moderateScale(14),
                },
              ]}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <UserBook />
                <CustomText style={{marginLeft: 10}}>Book For Self</CustomText>
              </View>
              <ArrowLeft height={14} width={14} />
            </View>
            <View
              style={[
                styles.container,
                {
                  marginTop: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  // paddingTop: moderateScale(18),
                  paddingHorizontal: moderateScale(18),
                  paddingVertical: moderateScale(14),
                },
              ]}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Promo />
                <CustomText style={{marginLeft: 10}}>Apply Promo</CustomText>
              </View>
              <ArrowLeft height={14} width={14} />
            </View>
          </ScrollView>
        </View>
        <View style={styles.modalContainer}>
          <Button
            onPress={() => {
              searchRide();
            }}
            title={`Book ${selected?.name}`}
          />
        </View>
      </MapScreen>
    </View>
  );
};
export default BookRideScreen;
const data = [
  {
    icon: Car,
    invactive: CarInActive,
    time: '5 Min ',
    name: 'Mini',
    price: '$1.0',
    capacity: '3 Seats Capacity',
  },
  {
    icon: Bus,
    invactive: BusInactive,
    time: '9 Min ',
    name: 'Bus',
    price: '$5.0',
    capacity: '21 Seats Capacity',
  },
];
const styles = StyleSheet.create({
  modalContainer: {
    height: moderateScale(100),
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
    alignSelf: 'center',
    elevation: 5,
    paddingVertical: 20,
    borderRadius: moderateScale(5),
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
    height: moderateScale(50),
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
