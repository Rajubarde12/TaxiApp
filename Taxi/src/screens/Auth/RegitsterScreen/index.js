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

const RegisterScreen = ({navigation}) => {
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
            Create Account
          </CustomText>
          <View style={{paddingHorizontal: '20%'}}>
            <CustomText
              mTop={moderateScale(15)}
              color={colors.grey}
              size={fontSize.Fourteen}
              style={{textAlign: 'center'}}
              fontFamily={fonts.medium}>
              Fill your information below or register with your social account.
            </CustomText>
          </View>
          <View style={{marginTop: moderateScale(30), width: '100%'}}>
            <Input placeholder="Esther Howard" lable="Name" />
          </View>
          <View style={{marginTop: moderateScale(30), width: '100%'}}>
            <Input placeholder="example@gmail.com" lable="Email" />
          </View>
          <View style={{marginTop: moderateScale(30), width: '100%'}}>
            <Input eye placeholder="***********" lable="Password" />
          </View>
          <View
            style={{
              width: '100%',
              marginTop: moderateScale(50),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: 20,
                width: 20,
                borderWidth: 2,
                borderColor: colors.yellow,
                backgroundColor: colors.yellow,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Checkmark />
            </View>
            <CustomText style={{marginLeft: 10}}>
              Agree with{' '}
              <Text
                style={{color: colors.yellow, textDecorationLine: 'underline'}}>
                Terms & Condition
              </Text>
            </CustomText>
          </View>
          <View style={{marginTop: moderateScale(30), width: '100%'}}>
            <Button
              onPress={() => {
                navigation.navigate('OtpScreen');
              }}
              title={'Sign In'}
              width1={'100%'}
            />
          </View>
          <CustomText
            mTop={moderateScale(30)}
            size={fontSize.Fourteen}
            color={colors.grey}>
            Or Sing Up With
          </CustomText>
          <View style={{width: '100%', marginTop: moderateScale(30)}}>
            <AuthSocial />
          </View>
          <CustomText mTop={moderateScale(20)}>
            Already have an account?
            <Text style={{color: colors.yellow}}> Sign In</Text>
          </CustomText>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
export default RegisterScreen;
