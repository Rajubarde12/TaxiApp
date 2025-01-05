import {
  Image,
  Pressable,
  RootTagContext,
  StyleSheet,
  View,
  Text,
  Alert,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useSelector} from 'react-redux';
import {
  ChatDriver,
  DestinationIcon,
  LocationInput,
  LocationMap,
  PhoneDriver,
  phoneDriver,
  Plush,
  RadioBalck,
  Saved1,
} from '../../../constants/svgIcons';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_APIKEY} from '../../../constants/ApiKeys';
import {useRef} from 'react';
import {useAppContext} from '../../../services/Provider';
import {useEffect} from 'react';
import socket from '../../../services/Socket';
import {useIsFocused} from '@react-navigation/native';
import Button from '../../../components/Button';
import {moderateScale} from '../../../utils/Scalling';
import {colors} from '../../../constants/colors';
import {width} from '../../../constants/Dimentions';
import CustomText from '../../../components/CustomText';
import {fontSize} from '../../../constants/fontSize';
import fonts from '../../../constants/fonts';
import Geolocation from '@react-native-community/geolocation';

const ActiveRiderScreen = ({navigation}) => {
  const {userAddress, destinationAddress, currentRegoin, destinationRegoin} =
    useSelector(state => state.common);
  const {user, token} = useSelector(state => state.user);
  const {bookingDetails, driveAccpetedData} = useSelector(state => state.rider);
  const driver = bookingDetails?.driver;
  const _map = useRef(null);
  const isFocused = useIsFocused();
  const {socket_connect, socketRef} = useAppContext();
  useEffect(() => {
    socket_connect();
  }, []);
  const handleArrivdeStatus = data => {
    if (data?.data?.status == 'Drop') {
      navigation.navigate('ArrivedAtDestination');
    }
  };

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on('receiveStatusUpdate', handleArrivdeStatus);
    }
    return () => {
      if (socketRef.current) {
        socketRef.current.off('receiveStatusUpdate', handleArrivdeStatus);
      }
    };
  }, []);
  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log(latitude, longitude);

        // setLocation({ latitude, longitude });
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 10, // Update location after 10 meters
        interval: 5000, // Update every 5 seconds
        fastestInterval: 2000,
      },
    );

    return () => Geolocation.clearWatch(watchId);
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
          height: moderateScale(250),
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
          <CustomText>Active Ride</CustomText>
          <CustomText size={fontSize.Fourteen} color={colors.grey}>
            5 min Away
          </CustomText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: '5%',
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
              <CustomText>{driver?.name ?? 'Rohan Sahu'}</CustomText>
              <CustomText color={colors.grey} size={fontSize.Fourteen}>
                {bookingDetails?.carType ?? 'Sedan'}
              </CustomText>
            </View>
          </View>
          <View style={{}}>
            <CustomText>
              $ 1.25/ <Text style={{color: colors.grey}}> per mile</Text>
            </CustomText>
            <CustomText>TSUVFFLD</CustomText>
          </View>
        </View>
      </View>
    </View>
  );
};
export default ActiveRiderScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginTop: '8%',
    // borderWidth: 1,
    paddingHorizontal: '2%',
    width: '95%',
    // elevation: 5,
    // paddingVertical: 20,
    // borderRadius: moderateScale(10),
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
    width: '100%',
    alignSelf: 'center',
  },
  separator: {
    borderBottomWidth: 1.5,
    borderColor: colors.inputBorder,
    marginBottom: 10,
    width: '100%',
    // marginLeft: '14%',
    marginTop: 10,
    height: '5%',
    // paddingBottom: '5%',
  },
  autoPlaceContainer: {
    height: moderateScale(70),
    width: '100%',
    alignSelf: 'center',
    // marginTop: -10,
    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 10,
    // borderWidth: 2,
    borderColor: colors.inputBorder,
  },
});
