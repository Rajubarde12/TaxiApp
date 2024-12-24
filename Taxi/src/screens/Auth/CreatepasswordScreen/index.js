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

const CreateNewpasswordScreen = ({navigation}) => {
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
      <View style={{marginTop: StatusBar.currentHeight * 1}} />
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
            // mTop={moderateScale(15)}
            size={fontSize.TwentyFive}
            fontFamily={fonts.medium}>
            New Password
          </CustomText>
          <View style={{paddingHorizontal: '10%'}}>
            <CustomText
              mTop={moderateScale(15)}
              color={colors.grey}
              size={fontSize.Fourteen}
              style={{textAlign: 'center'}}
              fontFamily={fonts.medium}>
              Your new password must be different from previously used
              passwords.
            </CustomText>
          </View>
          <View style={{marginTop: moderateScale(30), width: '100%'}}>
            <Input eye placeholder="***********" lable="Password" />
          </View>
          <View style={{marginTop: moderateScale(30), width: '100%'}}>
            <Input eye placeholder="***********" lable="Confirm Password" />
          </View>

          <View style={{marginTop: moderateScale(40), width: '100%'}}>
            <Button
              onPress={() => {
                navigation.reset({index: 0, routes: [{name: 'BottumTab'}]});
              }}
              title={'Create New Password'}
              width1={'100%'}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
export default CreateNewpasswordScreen;
