import {
  ImageBackground,
  PermissionsAndroid,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {colors} from '../../../constants/colors';
import {
  ArrowBack1,
  Checkmark,
  LocationLogo,
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

const LocationEnableScreen = ({navigation}) => {
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]);

      // Check if both permissions are granted
      return (
        granted['android.permission.ACCESS_FINE_LOCATION'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.ACCESS_COARSE_LOCATION'] ===
          PermissionsAndroid.RESULTS.GRANTED
      );
    }
    return true;
  };
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
          <View
            style={{
              height: 100,
              width: 100,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.Off_White,
              borderRadius: 50,
              //   marginTop: moderateScale(20),
            }}>
            <LocationLogo height={40} width={40} />
          </View>
          <CustomText
            mTop={moderateScale(15)}
            size={fontSize.TwentyFive}
            fontFamily={fonts.medium}>
            Enable Location Access
          </CustomText>
          <View style={{paddingHorizontal: '10%'}}>
            <CustomText
              mTop={moderateScale(15)}
              color={colors.grey}
              size={fontSize.Fourteen}
              style={{textAlign: 'center'}}
              fontFamily={fonts.medium}>
              To ensure a seamless and efficient experience, allow us access to
              your location.
            </CustomText>
          </View>

          <View style={{marginTop: moderateScale(400), width: '100%'}}>
            <Button
              onPress={async () => {
                await requestLocationPermission();
                navigation.navigate('CreateNewpasswordScreen');
              }}
              title={'Allow Location Access'}
              width1={'100%'}
            />
          </View>
          <CustomText
            mTop={moderateScale(50)}
            size={fontSize.Eighteen}
            color={colors.yellow}
            fontFamily={fonts.semi_bold}>
            Maybe Later
          </CustomText>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
export default LocationEnableScreen;
