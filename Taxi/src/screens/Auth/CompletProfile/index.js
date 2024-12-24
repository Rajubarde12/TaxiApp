import {
  ImageBackground,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {colors} from '../../../constants/colors';
import {
  ArrowBack,
  ArrowBack1,
  Checkmark,
  LoginSvg,
  Pencille,
  User,
} from '../../../constants/svgIcons';
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

const CompleteProfileScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          marginTop: StatusBar.currentHeight * 1.5,
          marginLeft: moderateScale(25),
          alignItems: 'center',
          justifyContent: 'center',
          height: 40,
          width: 40,
          borderWidth: 1,
          borderColor: colors.inputBorder,
          borderRadius: 20,
        }}>
        <ArrowBack1 height={20} width={20} />
      </Pressable>
      <View style={{marginTop: StatusBar.currentHeight * 1.5}} />
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
            Complete your Profile
          </CustomText>
          <View style={{paddingHorizontal: '10%'}}>
            <CustomText
              mTop={moderateScale(15)}
              color={colors.grey}
              size={fontSize.Fourteen}
              style={{textAlign: 'center'}}
              fontFamily={fonts.medium}>
              Don’t worry, only you can see your personal data, No one else will
              be able to see it.
            </CustomText>
          </View>
          <View
            style={{
              height: 100,
              width: 100,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.Off_White,
              borderRadius: 50,
              marginTop: moderateScale(30),
            }}>
            <User height={40} width={40} />
            <View style={{position: 'absolute', right: 0, bottom: 5}}>
              <Pencille height={25} width={25} />
            </View>
          </View>
          <View style={{marginTop: moderateScale(80), width: '100%'}}>
            <Input placeholder="Mobile Number" lable="Phone Number" isMobile />
          </View>
          <View style={{marginTop: moderateScale(30), width: '100%'}}>
            <Input placeholder="Select" lable="Gender" isDropDown />
          </View>
          <View style={{marginTop: moderateScale(200), width: '100%'}}>
            <Button
              onPress={() => navigation.navigate('LocationEnableScreen')}
              title={'Complete Profile'}
              width1={'100%'}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
export default CompleteProfileScreen;
