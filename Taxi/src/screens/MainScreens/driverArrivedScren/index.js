import {Image, Pressable, RootTagContext, StyleSheet, View} from 'react-native';
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

const DriverArrivedScreen = () => {
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
          height: moderateScale(600),
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
          <CustomText>Driver is Arrived...</CustomText>
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
        <View style={styles.container}>
          <View style={styles.rowContainer}>
            <RadioBalck height={18} width={18} />
            <CustomText
              size={fontSize.Sixteen}
              style={{marginLeft: 10}}
              lines={1}>
              {userAddress}
            </CustomText>
          </View>
          <View
            style={{
              // height: moderateScale(60),
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'absolute',
                // top: '10%',
                zIndex: 1,
                paddingHorizontal: 10,
                paddingVertical: 5,
                backgroundColor: 'white',
                borderRadius: 10,
                elevation: 1,
                alignSelf: 'flex-end',
              }}>
              <View />
              <CustomText size={fontSize.Fourteen} color={colors.grey}>
                OTP - {'4566'}
              </CustomText>
            </View>
            <View style={styles.separator}></View>
          </View>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.autoPlaceContainer}>
            <LocationInput height={20} width={20} />

            <CustomText
              lines={1}
              style={{width: '76%', marginLeft: '2%', marginRight: '0%'}}>
              {destinationAddress}
            </CustomText>

            {/* <TextInput
                value={''}
                editable={false}
                placeholder={destinationAddress.substring(0, 30)}
                placeholderTextColor="#888"
                style={styles.input}
              /> */}
            {/* <Saved1 />
            <View style={{paddingHorizontal: 5}}>
              <CustomText
                color={'lightgrey'}
                size={fontSize.Sixteen}
                fontFamily={fonts.medium}>
                |
              </CustomText>
            </View>
            <Plush /> */}
          </Pressable>
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
            <CustomText>{`'$'${
              bookingDetails?.perMileAmount ?? '0.5'
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
            <CustomText>{bookingDetails?.crnNumber ?? 'TSUVMTN'}</CustomText>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <CustomText size={fontSize.Twelve} color={colors.grey}>
              No. of Seats
            </CustomText>
            <CustomText>4 Seates</CustomText>
          </View>
        </View>
        <View style={{marginTop: '5%'}}>
          <Button onPress={() => {}} title={'Cancle Ride'} />
        </View>
      </View>
    </View>
  );
};
export default DriverArrivedScreen;
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
