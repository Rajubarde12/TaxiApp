import {StyleSheet, View} from 'react-native';
import MapScreen from '../../../components/MapScreen';
import {colors} from '../../../constants/colors';
import {moderateScale} from '../../../utils/Scalling';
import {Bus, Car, SearchingRideIcon} from '../../../constants/svgIcons';
import {width} from '../../../constants/Dimentions';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {useAppContext} from '../../../services/Provider';
import {useIsFocused} from '@react-navigation/native';
import {useEffect, useRef} from 'react';
import {Animated, Easing} from 'react-native';
import {
  getBookingDetails,
  SET_DRIVER_ACCPETED_DATA,
} from '../../../redux/riderSlice';
const SearchingRide = ({route, navigation}) => {
  const {token} = useSelector(state => state.user);
  const {address} = route?.params || {};
  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [scaleAnim]);
  const {searchInfo} = useSelector(state => state.rider);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const isFocused = useIsFocused();
  const {socket_connect, socketRef} = useAppContext();
  const dispatch = useDispatch();
  useEffect(() => {
    socket_connect();
  }, []);
  const handleDriverAccepted = data => {
    dispatch(SET_DRIVER_ACCPETED_DATA(data?.data, token, navigation));
    dispatch(getBookingDetails(data?.data, token, navigation));
  };

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on('receiveNotification', handleDriverAccepted);
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.off('receiveNotification', handleDriverAccepted);
      }
    };
  }, [isFocused]);
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
        onRegoin={region => {}}
        placeholder={address}>
        <Header map={true} title={'Searching Ride'} />

        <Animated.View
          style={{
            transform: [{scale: scaleAnim}],
            backgroundColor: 'rgba(255,255,255,0.8)',
            width: '70%',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 20,
            paddingBottom: 40,
            borderRadius: 10,
            marginTop: 30,
          }}>
          <SearchingRideIcon />
        </Animated.View>
        <View style={styles.modalContainer}>
          <Button
            onPress={() => {
              navigation.navigate('CancleResonRideScreen');
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
