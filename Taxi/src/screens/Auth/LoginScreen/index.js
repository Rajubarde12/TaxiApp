import {ImageBackground, ScrollView, StatusBar, Text, View} from 'react-native';
import {colors} from '../../../constants/colors';
import {LoginSvg} from '../../../constants/svgIcons';
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

const LoginScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <KeyboardAwareScrollView
        contentContainerStyle={{flexGrow: 1}}
        enableOnAndroid={true}
        extraHeight={50} // Adjust height to lift the view
        extraScrollHeight={30} // Scroll a bit more
      >
        <ImageBackground
          source={LoginBg}
          style={{height: height * 0.43, width: '100%'}}>
          <View
            style={{
              position: 'absolute',
              bottom: 10,
              right: moderateScale(25),
            }}>
            <LoginSvg />
          </View>
        </ImageBackground>

        <View
          style={{
            height: height * 0.66,
            marginTop: -20,
            backgroundColor: colors.white,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            elevation: 2,
            paddingHorizontal: moderateScale(30),
            alignItems: 'center',
          }}>
          <CustomText
            mTop={moderateScale(15)}
            size={fontSize.TwentyFive}
            fontFamily={fonts.medium}>
            Sign In
          </CustomText>
          <CustomText
            mTop={moderateScale(15)}
            color={colors.grey}
            size={fontSize.Fourteen}
            fontFamily={fonts.medium}>
            Hi! Welcome back, you’ve been missed
          </CustomText>
          <View style={{marginTop: moderateScale(30), width: '100%'}}>
            <Input placeholder="example@gmail.com" lable="Email" />
          </View>
          <View style={{marginTop: moderateScale(30), width: '100%'}}>
            <Input eye placeholder="***********" lable="Password" />
          </View>
          <View style={{width: '100%', marginTop: 5}}>
            <CustomText style={{textAlign: 'right'}} color={colors.yellow}>
              Forgot Password?
            </CustomText>
          </View>
          <View style={{marginTop: moderateScale(30), width: '100%'}}>
            <Button
              onPress={() => {
                navigation.navigate('RegisterScreen');
              }}
              title={'Sign In'}
              width1={'100%'}
            />
          </View>
          <CustomText mTop={moderateScale(30)} color={colors.grey}>
            Or Sing Up With
          </CustomText>
          <View style={{width: '100%', marginTop: moderateScale(30)}}>
            <AuthSocial />
          </View>
          <CustomText mTop={moderateScale(20)}>
            Don’t have an account?
            <Text style={{color: colors.yellow}}> Sign Up</Text>
          </CustomText>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
export default LoginScreen;
