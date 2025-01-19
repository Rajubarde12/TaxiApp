import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale} from '../../../../utils/Scalling';
import {colors} from '../../../../constants/colors';
import CustomText from '../../../../components/CustomText';
import {fontSize} from '../../../../constants/fontSize';
import fonts from '../../../../constants/fonts';
import {
  CarLocation,
  DestinationIcon,
  LocationInput,
  LocationLogo,
  RadioBalck,
  StarFilled,
  Wallet,
  Watch,
} from '../../../../constants/svgIcons';
import {useEffect, useRef, useState} from 'react';
import {MAIN_URL} from '../../../../constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DATABASE} from '../../../../utils/DATABASE';
import {useIsFocused} from '@react-navigation/native';
import Loader from '../../../../components/Loader';
import {timeConvert} from '../../../../utils/modals/calculateFunction';
import {
  AWS_URL,
  GOOGLE_API_KEY,
  GOOGLE_MAPS_APIKEY,
} from '../../../../constants/ApiKeys';
import MapViewDirections from 'react-native-maps-directions';
import MapView, {Marker} from 'react-native-maps';
import {height} from '../../../../constants/Dimentions';

const Active = ({navigation}) => {
  const [activeList, setActiveList] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    getBookingList();
  }, []);
  const getBookingList = async () => {
    try {
      const token = await AsyncStorage.getItem(DATABASE.token);
      setLoading(true);

      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${MAIN_URL}/booking/get-booking-list-customer/Active`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .request(config)
        .then(response => {
          if (response.data?.data?.data) {
            setActiveList(response.data?.data?.data);
            setLoading(false);
          }
        })
        .catch(error => {
          console.log(error);
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  const _map = useRef(null);
  const list_Empty_View = () => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          height: height * 0.5,
        }}>
        <CustomText size={fontSize.Twenty} color={colors.black}>
          No data found
        </CustomText>
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <Loader loading={loading} />
      <View>
        <FlatList
          data={activeList.slice(0, 1)}
          contentContainerStyle={{paddingBottom: moderateScale(-10)}}
          renderItem={({item, index}) => {
            const date = item?.start_ride_time
              ? new Date(item?.start_ride_time.replace(' ', 'T'))
              : null;
            const options = {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            };
            const formattedDate = date
              ? new Intl.DateTimeFormat('en-US', options).format(date)
              : null;

            const [datePart, year, timePart] = formattedDate
              ? formattedDate.split(', ')
              : [null, null, null];

            const finalOutput = formattedDate
              ? `${datePart}, ${date.toLocaleDateString('en-US', {
                  year: 'numeric',
                })} | ${timePart}`
              : null;

            return (
              <View
                style={{
                  marginTop: moderateScale(index == 0 ? 20 : 20),
                  paddingHorizontal: moderateScale(20),
                  paddingTop: moderateScale(20),
                  borderRadius: moderateScale(20),
                  borderWidth: 2,
                  borderColor: colors.inputBorder,
                  paddingBottom: moderateScale(120),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    // justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: moderateScale(80),
                      width: moderateScale(80),
                      // borderWidth: 1,
                      borderRadius: moderateScale(40),
                      backgroundColor: colors.yellow,
                      overflow: 'hidden',
                    }}>
                    <Image
                      style={{height: '100%', width: '100%'}}
                      source={{uri: `${AWS_URL}${item?.driver?.profileImage}`}}
                    />
                  </View>
                  <View style={{marginLeft: '2%'}}>
                    <CustomText fontFamily={fonts.semi_bold}>
                      {item?.driver?.name}
                    </CustomText>
                    <CustomText color={colors.grey} size={fontSize.Thirteen}>
                      {item?.carType ?? 'Sedan (4 Seater)'}
                    </CustomText>
                  </View>
                  <View
                    style={{
                      position: 'absolute',
                      right: 0,
                      flexDirection: 'row',
                    }}>
                    <StarFilled />
                    <CustomText
                      style={{marginLeft: 4}}
                      color={colors.grey}
                      size={fontSize.Thirteen}>
                      {item?.driver_rating}
                    </CustomText>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingTop: moderateScale(30),
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <LocationLogo height={25} width={25} />
                    <CustomText style={{marginLeft: 5}}>
                      {item?.totalDistance ?? '4.5 Mile'}
                    </CustomText>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Watch height={22} width={22} />
                    <CustomText style={{marginLeft: 5}}>
                      {item?.time ?? '4 Mins'}
                    </CustomText>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Wallet height={25} width={25} />
                    <CustomText style={{marginLeft: 5}}>
                      ${item?.perMileAmount ?? '1.5'}
                      <Text
                        style={{
                          fontSize: fontSize.Thirteen,
                          color: colors.grey,
                        }}>
                        /mile
                      </Text>
                    </CustomText>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingTop: moderateScale(30),
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <CustomText color={colors.grey} size={fontSize.Fifteen}>
                    Date & Time
                  </CustomText>
                  <CustomText color={colors.grey} size={fontSize.Fifteen}>
                    {finalOutput ?? 'Oct 18,2023 | 08:00 AM'}
                  </CustomText>
                </View>

                <View style={styles.container}>
                  <View style={styles.rowContainer}>
                    <RadioBalck height={18} width={18} />
                    <CustomText
                      size={fontSize.Sixteen}
                      style={{marginLeft: 10}}
                      lines={1}>
                      {item?.pickupAddress}
                    </CustomText>
                  </View>

                  <View style={styles.separator}></View>
                  <Pressable disabled style={styles.autoPlaceContainer}>
                    <LocationInput color={null} height={20} width={20} />
                    <CustomText
                      lines={1}
                      style={{
                        width: '76%',
                        marginLeft: '2%',
                        marginRight: '0%',
                      }}>
                      {item?.destinationAddress}
                    </CustomText>
                  </Pressable>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingTop: moderateScale(20),
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <CustomText color={colors.grey} size={fontSize.Fifteen}>
                    Car Number
                  </CustomText>
                  <CustomText color={colors.grey} size={fontSize.Fifteen}>
                    {item?.vehicleNumber}
                  </CustomText>
                </View>

                {item?.pickupLatitude &&
                item?.destinationLatitude &&
                item?.destinationLongitude &&
                item?.pickupLongitude ? (
                  <View
                    style={{
                      height: moderateScale(200),
                      marginTop: moderateScale(45),
                      borderRadius: 10,
                      overflow: 'hidden',
                    }}>
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
                        latitude: item?.pickupLatitude,
                        longitude: item?.pickupLongitude,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                      }}
                      onRegionChangeComplete={e => {}}
                      userInterfaceStyle={'light'}
                      // cacheEnabled
                    >
                      <Marker
                        coordinate={{
                          latitude: item?.pickupLatitude,
                          longitude: item?.pickupLongitude,
                        }}>
                        <DestinationIcon />
                      </Marker>
                      <Marker
                        coordinate={{
                          latitude: item?.destinationLatitude,
                          longitude: item?.destinationLongitude,
                        }}>
                        <CarLocation />
                      </Marker>
                      <MapViewDirections
                        onReady={evene => {}}
                        apikey={GOOGLE_API_KEY}
                        origin={{
                          latitude: item?.pickupLatitude,
                          longitude: item?.pickupLongitude,
                        }}
                        destination={{
                          latitude: item?.destinationLatitude,
                          longitude: item?.destinationLongitude,
                        }}
                        strokeColor="#000000"
                        strokeWidth={3}
                      />
                    </MapView>
                  </View>
                ) : null}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '20%',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('CancleResonRideScreen', {
                        bookingId: activeList[0]?.['_id'],
                        crNumber: activeList[0]?.['crnNumber'],
                      });
                    }}
                    style={{
                      backgroundColor: '#faf8f2',
                      paddingHorizontal: 50,
                      paddingVertical: 10,
                      borderRadius: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '45%',
                    }}>
                    <CustomText color={colors.yellow} size={fontSize.Eighteen}>
                      Cancel
                    </CustomText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: colors.yellow,
                      width: '45%',
                      paddingVertical: 10,
                      borderRadius: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <CustomText color={colors.white} size={fontSize.Eighteen}>
                      Reschedule
                    </CustomText>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
          ListEmptyComponent={list_Empty_View}
        />
      </View>
    </View>
  );
};
export default Active;
const styles = StyleSheet.create({
  container: {
    marginTop: '8%',
    paddingHorizontal: '2%',
    width: '95%',
    // borderWidth: 1,
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
    marginTop: 10,
  },
  autoPlaceContainer: {
    height: moderateScale(70),
    width: '100%',
    alignSelf: 'center',
    // marginTop: -10,
    // backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 10,
    // borderWidth: 2,
    borderColor: colors.inputBorder,
  },
});
