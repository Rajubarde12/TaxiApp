import {
  Alert,
  ImageBackground,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {colors} from '../../../constants/colors';
import {Checkmark, LoginSvg} from '../../../constants/svgIcons';
import {LoginBg} from '../../../constants/images';
import {height} from '../../../constants/Dimentions';
import {moderateScale} from '../../../utils/Scalling';
import CustomText from '../../../components/CustomText';
import {fontSize} from '../../../constants/fontSize';
import fonts from '../../../constants/fonts';
import Input from '../../../components/AuthInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Button from '../../../components/Button';
import AuthSocial from '../../../components/AuthSocial';
import OTPInput from '../../../components/otpInputComponent';
import {useSelector} from 'react-redux';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import {useState} from 'react';
import Loader from '../../../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DATABASE} from '../../../utils/DATABASE';
import {MAIN_URL} from '../../../constants';

const OtpScreen = ({navigation, route}) => {
  const {otp, user} = useSelector(state => state.login);
  const {user: user2} = useSelector(state => state.user);

  const [loading, setLoading] = useState(false);
  const phone = route?.params?.phone;
  const isDelete = route?.params?.isDelete;
  console.log(isDelete);

  const countryCode = route?.params?.countryCode;

  const verifyOtp = async otp => {
    setLoading(true);
    try {
      const data = {
        // email: user?.email,
        // otp: otp,
        mobileNumber: phone ?? user?.mobileNumber,
        countryCode: countryCode ?? '91',
        otp: otp,
      };

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${MAIN_URL}/auth/verify-otp-authenticate-new`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(data),
      };
      const response = await axios.request(config);
      if (response.data.status === 200) {
        if (phone) {
          navigation.navigate('CreateNewpasswordScreen', {phone, countryCode});
        } else {
          navigation.reset({index: 0, routes: [{name: 'LoginScreen'}]});
        }
        // Toast.show('Verification Success');
      }
      setLoading(false);
      Toast.show(response.data.message);
    } catch (err) {
      setLoading(false);
      console.log(err);
      if (err.status == 400) {
        Toast.show('Invalid OTP');
      } else {
        Toast.show('Something went wrong');
      }
    }
  };
  const [opt, setOtp] = useState('');
  const resendOtp = async () => {
    setLoading(true);
    let data = JSON.stringify({
      mobileNumber: phone,
      countryCode: countryCode,
      type: 'User',
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${MAIN_URL}/auth/resend-otp-new`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        if (response.data.status == 200) {
          Toast.show(response.data.message);
        } else {
          Toast.show('Something went wrong');
        }
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        Toast.show('Something went wrong');
        setLoading(false);
      });
  };

  const deleteVeify = async otp => {
    // Alert.alert('this');

    const token = await AsyncStorage.getItem(DATABASE.token);

    try {
      setLoading(true);
      let data = JSON.stringify({
        otp: otp,
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://taxi-5.onrender.com/api/app/user/verify-otp-delete`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: data,
      };

      const response = await axios.request(config);

      await AsyncStorage.clear();
      navigation.reset({
        index: 0,
        routes: [{name: 'AuthStack', params: {screen: 'LoginScreen'}}],
      });

      setLoading(false);
      Toast.show(response.data.message);
    } catch (error) {
      setLoading(false);
      Toast.show('Something went wrong');
      console.log(error.toJSON());

      await AsyncStorage.clear();
      navigation.reset({
        index: 0,
        routes: [{name: 'AuthStack', params: {screen: 'LoginScreen'}}],
      });
    }
  };
  console.log(user);

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <Loader loading={loading} />
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <View style={{marginTop: StatusBar.currentHeight * 3}} />
      <KeyboardAwareScrollView
        contentContainerStyle={{flexGrow: 1}}
        enableOnAndroid={true}
        extraHeight={50} // Adjust height to lift the view
        extraScrollHeight={30} // Scroll a bit more
      >
        <View
          style={{
            paddingHorizontal: moderateScale(30),
            alignItems: 'center',
          }}>
          <CustomText
            mTop={moderateScale(isDelete ? 200 : 15)}
            size={fontSize.TwentyFive}
            fontFamily={fonts.medium}>
            Verify Code
          </CustomText>
          <View style={{paddingHorizontal: '10%'}}>
            <CustomText
              mTop={moderateScale(15)}
              color={colors.grey}
              size={fontSize.Fourteen}
              style={{textAlign: 'center'}}
              fontFamily={fonts.medium}>
              Please enter the code we just sent to your phone
            </CustomText>
            <CustomText
              //   mTop={moderateScale(15)}
              color={colors.yellow}
              size={fontSize.Fourteen}
              style={{textAlign: 'center'}}
              fontFamily={fonts.medium}>
              {phone ?? user2?.mobileNumber}
            </CustomText>
          </View>
          <OTPInput
            onOtpComplete={otp => {
              if (otp.length == 4 && !isDelete) {
                verifyOtp(otp);
              }
              setOtp(otp);
            }}
          />
          {!isDelete ? (
            <View
              style={{
                paddingBottom: moderateScale(20),
                paddingTop: moderateScale(50),
                alignItems: 'center',
              }}>
              <CustomText color={colors.grey}>Didn’t receive OTP?</CustomText>
              <Pressable
                onPress={() => {
                  resendOtp();
                }}>
                <CustomText
                  style={{textDecorationLine: 'underline'}}
                  mTop={moderateScale(5)}
                  //   size={fontSize.Eighteen}
                  fontFamily={fonts.semi_bold}
                  color={colors.grey}>
                  Resend Code
                </CustomText>
              </Pressable>
            </View>
          ) : null}
          <View style={{marginTop: moderateScale(30), width: '100%'}}>
            <Button
              onPress={() => {
                if (isDelete) {
                  deleteVeify(opt);
                } else {
                  verifyOtp(opt);
                }
              }}
              title={isDelete ? 'Delete Account' : 'Verify'}
              width1={'100%'}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
export default OtpScreen;
