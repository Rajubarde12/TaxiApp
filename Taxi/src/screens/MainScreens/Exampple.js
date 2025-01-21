import {Alert, Image, Pressable, View} from 'react-native';
import MapView, {Marker, UrlTile} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import {
  CarLocation,
  ChatDriver,
  DestinationIcon,
  LocationMap,
  PhoneDriver,
} from '../../constants/svgIcons';
import MapViewDirections from 'react-native-maps-directions';
import {
  AWS_URL,
  GOOGLE_API_KEY,
  GOOGLE_MAPS_APIKEY,
} from '../../constants/ApiKeys';
import {useRef, useState} from 'react';
import {useAppContext} from '../../services/Provider';
import {useEffect} from 'react';
import socket from '../../services/Socket';
import {useIsFocused} from '@react-navigation/native';
import Button from '../../components/Button';
import {moderateScale} from '../../utils/Scalling';
import {colors} from '../../constants/colors';
import {width} from '../../constants/Dimentions';
import CustomText from '../../components/CustomText';
import {fontSize} from '../../constants/fontSize';
import {distance} from '../../utils/modals/calculateFunction';
import {getBookingDetails} from '../../redux/riderSlice';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import Header from '../../components/Header';

const MapViewWithDirections = ({navigation}) => {
  const {currentRegoin} = useSelector(state => state.common);
  const {token} = useSelector(state => state.user);
  const {bookingDetails, driveAccpetedData} = useSelector(state => state.rider);

  const driver = bookingDetails?.driver;
  const _map = useRef(null);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const {socket_connect, socketRef} = useAppContext();
  const [driverLocation, setDriverLocation] = useState({
    latitude: 1.0004,
    longitude: -2.0,
  });
  const driverLocationRef = useRef(driverLocation);

  useEffect(() => {
    driverLocationRef.current = driverLocation;
  }, [driverLocation]);
  const [arrivalTime, setArrivalTime] = useState('');
  useEffect(() => {
    socket_connect();
  }, []);
  const handleDriverAccepted = data => {
    setDriverLocation(data?.data);
  };

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on('receiveupdatedLocation', handleDriverAccepted);
      socketRef.current.on('receiveStatusUpdate', handleArrivdeStatus);
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.off('receiveupdatedLocation', handleDriverAccepted);
        socketRef.current.off('receiveStatusUpdate', handleArrivdeStatus);
      }
    };
  }, [isFocused]);
  useEffect(() => {
    const pickupLatitude = driverLocation?.latitude;
    const pickupLongitude = driverLocation?.longitude;
    const destinationLatitude = currentRegoin?.latitude;
    const destinationLongitude = currentRegoin?.longitude;
    getArrivalTime(
      pickupLatitude,
      pickupLongitude,
      destinationLatitude,
      destinationLongitude,
    );
    if (
      distance(
        pickupLatitude,
        pickupLongitude,
        destinationLatitude,
        destinationLongitude,
        'K',
      ) < 0.118
    ) {
      // navigation.navigate('DriverArrivedScreen');
    }
  }, [driverLocation, bookingDetails]);
  const handleArrivdeStatus = data => {
    console.log('this is data', data);
    if (data?.data?.status == 'Arrived') {
      dispatch(
        getBookingDetails(
          driveAccpetedData,
          token,
          navigation,
          'DriverArrivedScreen',
          data,
          driverLocationRef.current,
        ),
      );
    }
  };

  const getArrivalTime = async (
    originLat,
    originLng,
    destinationLat,
    destinationLng,
  ) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/distancematrix/json`,
        {
          params: {
            origins: `${originLat},${originLng}`,
            destinations: `${destinationLat},${destinationLng}`,
            key: GOOGLE_API_KEY,
            mode: 'driving', // Options: driving, walking, bicycling, transit
          },
        },
      );

      if (response.data.rows[0].elements[0].status === 'OK') {
        const duration = response.data.rows[0].elements[0].duration.text;
        console.log('this is duration', duration);
        setArrivalTime(duration);
      } else {
        console.error('Error in Distance Matrix API response: ', response.data);
      }
    } catch (error) {
      console.error('Error fetching arrival time: ', error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <Header title={'Driver Arriving'} map={true} />
      <MapView
        ref={_map}
        apikey={GOOGLE_MAPS_APIKEY}
        style={{
          flex: 1,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        initialRegion={{
          latitude: currentRegoin?.latitude,
          longitude: currentRegoin?.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onRegionChangeComplete={e => {}}
        userInterfaceStyle={'light'}
        // cacheEnabled
      >
        <Marker
          coordinate={{
            latitude: currentRegoin?.latitude,
            longitude: currentRegoin.longitude,
          }}>
          <DestinationIcon />
        </Marker>
        <Marker
          coordinate={{
            latitude: driverLocation?.latitude,
            longitude: driverLocation?.longitude,
          }}>
          <CarLocation />
        </Marker>
        <MapViewDirections
          onReady={evene => {
            console.log('this is evetn', evene.duration);
          }}
          apikey={GOOGLE_API_KEY}
          origin={{
            latitude: currentRegoin?.latitude,
            longitude: currentRegoin?.longitude,
          }}
          destination={{
            latitude: driverLocation?.latitude,
            longitude: driverLocation?.longitude,
          }}
          strokeColor="#000000"
          strokeWidth={3}
        />
      </MapView>
      <View
        style={{
          height: moderateScale(380),
          bottom: 0,
          backgroundColor: colors.white,
          // position: 'absolute',
          paddingHorizontal: moderateScale(20),
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
          // justifyContent: 'center',
        }}>
        <View
          style={{
            height: 3,
            width: '30%',
            alignSelf: 'center',
            backgroundColor: colors.inputBorder,
            marginTop: '2%',
            borderRadius: 1,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: '5%',
            paddingHorizontal: 10,
          }}>
          <CustomText>Driver is Arriving...</CustomText>
          <CustomText size={fontSize.Fourteen} color={colors.grey}>
            {typeof arrivalTime == 'string' ? arrivalTime : ''} Away
          </CustomText>
        </View>
        <View
          style={{
            borderWidth: 0.5,
            borderColor: colors.inputBorder,
            width: '100%',
            marginTop: '2%',
          }}></View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: '2%',
            // paddingHorizontal: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {/* <Image source={{uri:}}/> */}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                height: 60,
                width: 60,
                borderRadius: 40,
                backgroundColor: colors.yellow,
                overflow: 'hidden',
              }}>
              <Image
                style={{height: '100%', width: '100%'}}
                source={{uri: `${AWS_URL}${driver?.profileImage}`}}
              />
            </View>
            <View style={{marginLeft: '5%'}}>
              <CustomText>{driver?.name}</CustomText>
              <CustomText color={colors.grey} size={fontSize.Fourteen}>
                {bookingDetails?.carType ?? 'Sedan'}
              </CustomText>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Pressable
              style={{
                padding: 8,
                borderRadius: 30,
                backgroundColor: '#f2f2f2',
                marginRight: 20,
              }}>
              <PhoneDriver />
            </Pressable>
            <Pressable
              style={{
                padding: 8,
                borderRadius: 30,
                backgroundColor: '#f2f2f2',
              }}>
              <ChatDriver />
            </Pressable>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            paddingHorizontal: 20,
            marginTop: '5%',
            // borderWidth: 1,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <CustomText size={fontSize.Twelve} color={colors.grey}>
              Rate per
            </CustomText>
            <CustomText>{`$${
              bookingDetails?.perMileAmount ?? '1.5'
            }`}</CustomText>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <CustomText size={fontSize.Twelve} color={colors.grey}>
              Car Number
            </CustomText>
            <CustomText>{bookingDetails?.crnNumber}</CustomText>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <CustomText size={fontSize.Twelve} color={colors.grey}>
              No. of Seats
            </CustomText>
            <CustomText>{bookingDetails?.seatCapacity ?? 4} Seats</CustomText>
          </View>
        </View>
        <View style={{marginTop: '5%'}}>
          <Button
            onPress={() => {
              navigation.navigate('CancleResonRideScreen');
            }}
            title={'Cancle Ride'}
          />
        </View>
      </View>
    </View>
  );
};
export default MapViewWithDirections;
