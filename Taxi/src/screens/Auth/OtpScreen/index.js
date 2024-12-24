import {ImageBackground, ScrollView, StatusBar, Text, View} from 'react-native';
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

const OtpScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
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
            mTop={moderateScale(15)}
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
              Please enter the code we just sent to email
            </CustomText>
            <CustomText
              //   mTop={moderateScale(15)}
              color={colors.yellow}
              size={fontSize.Fourteen}
              style={{textAlign: 'center'}}
              fontFamily={fonts.medium}>
              example@email.com
            </CustomText>
          </View>
          <OTPInput
            onOtpComplete={otp => {
              console.log(otp);
            }}
          />
          <View
            style={{
              paddingBottom: moderateScale(20),
              paddingTop: moderateScale(50),
              alignItems: 'center',
            }}>
            <CustomText color={colors.grey}>Didn’t receive OTP?</CustomText>

            <CustomText
              style={{textDecorationLine: 'underline'}}
              mTop={moderateScale(5)}
              //   size={fontSize.Eighteen}
              fontFamily={fonts.semi_bold}
              color={colors.grey}>
              Resend Code
            </CustomText>
          </View>
          <View style={{marginTop: moderateScale(30), width: '100%'}}>
            <Button
              onPress={() => {
                navigation.navigate('CompleteProfileScreen');
              }}
              title={'Verify'}
              width1={'100%'}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
export default OtpScreen;
