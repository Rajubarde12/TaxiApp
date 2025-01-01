import {
  Alert,
  ImageBackground,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
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
import {useState} from 'react';
import {keyboartype, validatePassword} from '../../../utils/modals/auth';
import {useDispatch, useSelector} from 'react-redux';
import {getAndroidId, getDeviceToken} from 'react-native-device-info';
import {userLogin} from '../../../redux/loginSlice';
import Loader from '../../../components/Loader';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {isLoading} = useSelector(state => state.login);
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState({
    email: '',
    password: '',
  });
  const validate = () => {
    const pasword_regix =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!inputs.email) {
      setError(prev => ({...prev, email: 'Phone is required'}));
      return;
    }
    if (inputs.email.length < 10) {
      setError(prev => ({...prev, email: 'Invalid phone'}));
      return;
    }
    if (!inputs.password) {
      setError(prev => ({...prev, password: 'Password is required'}));
      return;
    }
    // if (validatePassword(inputs.password) != 'matched') {
    //   setError(prev => ({
    //     ...prev,
    //     password: validatePassword(inputs.password),
    //   }));
    //   return;
    // }
    login();
  };
  const login = async () => {
    const deviceToken = await getAndroidId();

    const voipToken = 'abC1234VoipTkn5678';
    const deviceType = Platform.OS === 'android' ? 'Android' : 'IOS';
    const data = {
      latitude: '34.052235',
      longitude: '-118.243683',
      mobileNumber: '1234512345',
      countryCode: '91',
      deviceToken,
      voipToken,
      deviceType,
      ...inputs,
    };
    let data1 = {
      email: '',
      password: inputs.password,
      name: 'Ankit',
      type: 'User',
      loginType: 'Email',
      deviceToken: deviceToken,
      voipToken: 'abC1234VoipTkn5678',
      deviceType: 'Android',
      latitude: '34.052235',
      longitude: '-118.243683',
      mobileNumber: inputs.email,
      countryCode: '91',
    };
    dispatch(userLogin(data1, navigation));
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Loader loading={isLoading} />
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
            <Input
              isMobile={true}
              keyboardType={keyboartype.number_pad}
              onFocus={() => {
                setError(prev => ({...prev, email: ''}));
              }}
              value={inputs.email}
              onChangeText={input => {
                setInputs(prev => ({...prev, email: input}));
              }}
              error={error.email}
              placeholder="679666969"
              lable="Phone"
            />
          </View>
          <View style={{marginTop: moderateScale(30), width: '100%'}}>
            <Input
              value={inputs.password}
              onChangeText={input => {
                setInputs(prev => ({...prev, password: input}));
              }}
              onFocus={() => {
                setError(prev => ({...prev, password: ''}));
              }}
              error={error.password}
              eye
              placeholder="***********"
              lable="Password"
            />
          </View>
          <View style={{width: '100%', marginTop: 5}}>
            <CustomText style={{textAlign: 'right'}} color={colors.yellow}>
              Forgot Password?
            </CustomText>
          </View>
          <View style={{marginTop: moderateScale(30), width: '100%'}}>
            <Button
              onPress={() => {
                validate();
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
          <Pressable onPress={() => navigation.navigate('RegisterScreen')}>
            <CustomText mTop={moderateScale(20)}>
              Don’t have an account?
              <Text style={{color: colors.yellow}}> Sign Up</Text>
            </CustomText>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
export default LoginScreen;
