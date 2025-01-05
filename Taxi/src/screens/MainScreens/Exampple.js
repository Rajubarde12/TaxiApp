import {Alert, Image, Pressable, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useSelector} from 'react-redux';
import {
  ChatDriver,
  DestinationIcon,
  LocationMap,
  PhoneDriver,
} from '../../constants/svgIcons';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_APIKEY} from '../../constants/ApiKeys';
import {useRef} from 'react';
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

const MapViewWithDirections = () => {
  const {userAddress, destinationAddress, currentRegoin, destinationRegoin} =
    useSelector(state => state.common);
  const {user, token} = useSelector(state => state.user);
  const {bookingDetails, driveAccpetedData} = useSelector(state => state.rider);
  const driver = bookingDetails?.driver;
  console.log('thissi', bookingDetails?.perMileAmount);

  const _map = useRef(null);
  const isFocused = useIsFocused();
  const {socket_connect, socketRef} = useAppContext();
  useEffect(() => {
    socket_connect();
  }, []);
  const handleDriverAccepted = data => {
    console.log(data);

    Alert.alert(JSON.stringify(data));
  };

  // useEffect(() => {
  //   if (socketRef.current) {
  //     socketRef.current.on('receiveupdatedLocation', handleDriverAccepted);
  //   }

  //   return () => {
  //     if (socketRef.current) {
  //       socketRef.current.off('receiveupdatedLocation', handleDriverAccepted);
  //     }
  //   };
  // }, [isFocused]);
  useEffect(() => {
    if (socketRef.current) {
      console.log('Setting up socket listeners');

      socketRef.current.on('connect', () => {
        console.log('Connected to server');
      });

      socketRef.current.on('disconnect', () => {
        console.log('Disconnected from server');
      });

      socketRef.current.on('receiveupdatedLocation', handleDriverAccepted);
      socketRef.current.onAny((eventName, ...args) => {
        console.log(`Event received: ${eventName}`, args);
      });
    }

    return () => {
      if (socketRef.current) {
        console.log('Cleaning up socket listeners');
        socketRef.current.off('connect');
        socketRef.current.off('disconnect');
        socketRef.current.off('receiveupdatedLocation', handleDriverAccepted);
      }
    };
  }, [isFocused]);
  useEffect(() => {
    const pickupLatitude = currentRegoin?.latitude;
    const pickupLongitude = currentRegoin?.longitude;
    const destinationLatitude = destinationRegoin?.latitude;
    const destinationLongitude = destinationRegoin?.longitude;
    const totalDistance = distance(
      pickupLatitude,
      pickupLongitude,
      destinationLatitude,
      destinationLongitude,
      'K',
    );
  }, []);

  return (
    <View style={{flex: 1}}>
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
          <LocationMap />
        </Marker>
        <Marker
          coordinate={{
            latitude: destinationRegoin?.latitude,
            longitude: destinationRegoin?.longitude,
          }}>
          {/* <Image style={{ height: 20, width: 20, resizeMode: 'contain'}} source={images.loc} /> */}
          <DestinationIcon />
        </Marker>
        <MapViewDirections
          apikey={GOOGLE_MAPS_APIKEY}
          origin={{
            latitude: currentRegoin?.latitude,
            longitude: currentRegoin?.longitude,
          }}
          destination={{
            latitude: destinationRegoin?.latitude,
            longitude: destinationRegoin?.longitude,
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
            5 min Away
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
              }}></View>
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
            <CustomText>4 Seats</CustomText>
          </View>
        </View>
        <View style={{marginTop: '5%'}}>
          <Button onPress={() => {}} title={'Cancle Ride'} />
        </View>
      </View>
    </View>
  );
};
export default MapViewWithDirections;
