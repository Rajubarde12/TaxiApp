import {
  FlatList,
  Modal,
  Pressable,
  StatusBar,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../constants/colors';
import Header from '../../components/Header';
import {moderateScale} from '../../utils/Scalling';
import CustomText from '../../components/CustomText';
import {fontSize} from '../../constants/fontSize';
import {CroshBlack, RadioUnifll, RadioYellow} from '../../constants/svgIcons';
import {useEffect, useState} from 'react';
import fonts from '../../constants/fonts';
import Button from '../../components/Button';
import Toast from 'react-native-simple-toast';
import {MAIN_URL} from '../../constants';
import Loader from '../../components/Loader';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DATABASE} from '../../utils/DATABASE';
import axios from 'axios';
const data = [
  {
    id: 1,
    title: 'Schedule Change',
  },
  {
    id: 2,
    title: 'Book Another Cab',
  },
  {
    id: 3,
    title: 'Found a better alternative',
  },
  {
    id: 4,
    title: 'Driver is taking too long',
  },
  {
    id: 5,
    title: 'My Reason is not listed',
  },
  {
    id: 6,
    title: 'Other',
  },
];

const CancleResonRideScreen = ({navigation, route}) => {
  const {searchInfo} = useSelector(state => state.rider);

  const {bookingDetails, driveAccpetedData} = useSelector(state => state.rider);
  const bookingId = route?.params?.bookingId
    ? route?.params?.bookingId
    : driveAccpetedData?.bookingId
    ? driveAccpetedData?.bookingId
    : searchInfo?.bookingId;

  const crNumber = route?.params?.crNumber ?? bookingDetails?.crnNumber;
  console.log('this is crn number', bookingId);

  const [loading, setLoading] = useState(false);

  const [selectedreason, setSelectedReson] = useState({
    id: 1,
    title: 'Schedule Change',
  });
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [skiped, setSkiped] = useState(false);

  const [bookingInput, setBookingInput] = useState('');
  useEffect(() => {
    setTimeout(() => {
      if (!skiped) {
        setVisible(true);
      }
    }, 30000);
  }, []);
  const handleCancle = async () => {
    try {
      const token = await AsyncStorage.getItem(DATABASE.token);
      setLoading(true);
      if (selectedreason.title == 'Other' && bookingInput == '') {
        Toast.show('Please Enter you Cancel reason');
        return;
      }
      const data = {
        // bookingId: bookingId,
        // reason:
        //   selectedreason?.title == 'Other'
        //     ? bookingInput
        //     : selectedreason?.title,
        bookingId: bookingId,
        reason:
          selectedreason?.title == 'Other'
            ? bookingInput
            : selectedreason?.title,
      };

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${MAIN_URL}/booking/cancel-ride`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: JSON.stringify(data),
      };
      const response = await axios.request(config);

      if (response.data.status == 200) {
        setLoading(false);
        setVisible(false);
        setVisible2(true);
      }
    } catch (err) {
      Toast.show('SOmething went wrong');
      setLoading(false);
      console.log(err);
      // setVisible2(true);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <Loader loading={loading} />
      <Modal visible={visible}>
        {/* <StatusBar translucent={true} /> */}
        <View
          style={{
            flex: 1,
            backgroundColor: colors.Off_White,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              //   height: '25%',
              width: '90%',
              alignSelf: 'center',
              backgroundColor: '#fff',
              elevation: 2,
              borderRadius: 20,
              padding: moderateScale(30),
              alignItems: 'center',
              //   justifyContent: 'center',
            }}>
            <CustomText
              fontFamily={fonts.semi_bold}
              size={fontSize.Eighteen}
              style={{textAlign: 'center'}}>
              Cancel within 3 mins, otherwise pay cancellation fee
            </CustomText>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'space-between',
                marginTop: moderateScale(30),
              }}>
              <TouchableOpacity
                onPress={() => {
                  setVisible(false);
                  setSkiped(true);
                }}
                style={{
                  width: '45%',
                  height: moderateScale(60),
                  backgroundColor: 'rgba(254, 203, 0,0.08)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 20,
                }}>
                <CustomText color={colors.yellow}>Skip</CustomText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleCancle();
                }}
                style={{
                  width: '45%',
                  height: moderateScale(60),
                  backgroundColor: colors.yellow,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 20,
                }}>
                <CustomText>Cancel Ride</CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal visible={visible2} animationType="slide" transparent={true}>
        <View style={{flex: 1, backgroundColor: 'rgba(246, 246, 246,0.8)'}}>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              backgroundColor: colors.white,
              width: '100%',
              elevation: 5,
              height: moderateScale(450),
              alignItems: 'center',
              //   justifyContent: 'center',
              //   paddingTop: '5%',
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
            <View style={{height: '5%'}} />
            <Pressable
              style={{
                backgroundColor: colors.yellow,
                height: 50,
                width: 50,
                borderRadius: 25,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <CroshBlack height={20} width={20} />
            </Pressable>
            <CustomText
              fontFamily={fonts.semi_bold}
              size={fontSize.Eighteen}
              mTop={moderateScale(20)}>
              Booking Cancelled Successfully
            </CustomText>
            <CustomText
              style={{textAlign: 'center'}}
              color={colors.grey}
              size={fontSize.Fourteen}
              mTop={moderateScale(20)}>
              {crNumber
                ? `Your booking with CRN : #${crNumber} has been cancelled successfully.`
                : 'Your Booking Has been Cancelled'}
            </CustomText>
            <View style={{height: '20%'}} />
            <Button
              onPress={() => {
                navigation.reset({index: 0, routes: [{name: 'BottumTab'}]});
              }}
              title={'Got It'}
            />
          </View>
        </View>
      </Modal>
      <Header map={true} title="Cancel Reason" />
      <View style={{paddingHorizontal: moderateScale(30), flex: 1}}>
        <CustomText
          size={fontSize.Fifteen}
          color={colors.grey}
          mTop={moderateScale(50)}>
          Please select the reason for cancellations:
        </CustomText>
        <View>
          <FlatList
            data={data}
            contentContainerStyle={{
              paddingTop: moderateScale(30),
              // borderWidth: 1,
            }}
            renderItem={({item, index}) => {
              const selected = selectedreason.id === item?.id;
              return (
                <Pressable
                  onPress={() => setSelectedReson(item)}
                  style={{
                    paddingVertical: moderateScale(5),
                    marginVertical: moderateScale(5),
                    flexDirection: 'row',
                    alignItems: 'center',
                    //   justifyContent: 'space-between',
                    //   borderWidth: 1,
                  }}>
                  {selected ? <RadioYellow /> : <RadioUnifll />}
                  <CustomText
                    color={colors.black}
                    size={fontSize.Seventeen}
                    style={{marginLeft: 10}}>
                    {item.title}
                  </CustomText>
                </Pressable>
              );
            }}
          />
        </View>
        {selectedreason.title == 'Other' ? (
          <>
            <CustomText
              size={fontSize.Eighteen}
              fontFamily={fonts.semi_bold}
              mTop={moderateScale(30)}>
              Other
            </CustomText>
            <View
              style={{
                height: moderateScale(200),
                borderWidth: 1,
                marginTop: moderateScale(5),
                borderColor: colors.inputBorder,
                borderRadius: 20,
                paddingHorizontal: '2%',
              }}>
              <TextInput
                value={bookingInput}
                onChangeText={input => {
                  setBookingInput(input);
                }}
                style={{fontFamily: fonts.semi_bold, color: colors.black}}
                multiline
                placeholder="Enter Your Reason"
                placeholderTextColor={colors.grey}
              />
            </View>
          </>
        ) : null}
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          backgroundColor: colors.white,
          width: '100%',
          elevation: 5,
          height: '10%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Button
          onPress={() => {
            handleCancle();
          }}
          title={'Cancel Ride'}
        />
      </View>
    </View>
  );
};
export default CancleResonRideScreen;
