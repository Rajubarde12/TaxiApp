import {
  Alert,
  ImageBackground,
  Platform,
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
import {keyboartype} from '../../../utils/modals/auth';
import {useState} from 'react';
import Loader from '../../../components/Loader';
import {useDispatch, useSelector} from 'react-redux';
import {userRegistation} from '../../../redux/loginSlice';

const RegisterScreen = ({navigation}) => {
  const {isLoading} = useSelector(state => state.login);
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const [error, setError] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const handleError = (key, err = '') => {
    setError(prev => ({...prev, [key]: err}));
  };

  const handleInputs = (key, input) => {
    setInputs(prev => ({...prev, [key]: input}));
    validateField(key, input);
  };

  const validateField = (key, value) => {
    switch (key) {
      case 'name':
        handleError(
          key,
          value.length < 3 ? 'Name must be at least 3 characters' : '',
        );
        break;
      case 'email':
        handleError(
          key,
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Enter a valid email',
        );
        break;
      case 'password':
        validatePassword(value);
        break;
      case 'phone':
        handleError(
          key,
          /^[0-9]{10}$/.test(value)
            ? ''
            : 'Enter a valid 10-digit phone number',
        );
        break;
      default:
        break;
    }
  };

  const validatePassword = password => {
    let errorMsg = '';
    if (password.length < 8) {
      errorMsg = 'Password must be at least 8 characters.';
    } else if (!/[A-Z]/.test(password)) {
      errorMsg = 'Password must contain at least one uppercase letter.';
    } else if (!/[a-z]/.test(password)) {
      errorMsg = 'Password must contain at least one lowercase letter.';
    } else if (!/[0-9]/.test(password)) {
      errorMsg = 'Password must contain at least one number.';
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errorMsg = 'Password must contain at least one special character.';
    }

    handleError('password', errorMsg);
  };
  const handleSubmit = () => {
    let valid = true;
    Object.keys(inputs).forEach(key => {
      validateField(key, inputs[key]);
      if (inputs[key] === '' || error[key]) {
        valid = false;
      }
    });

    if (valid) {
      let data = {
        email: inputs.email,
        password: inputs.password,
        name: inputs.name,
        type: 'User',
        loginType: 'Email',
        deviceToken: 'fghjklmnoJ9hy2dTxksWfJuh5EwUd7uYvAgCVySHhDZkjptTbV8pkv2',
        voipToken: 'abC1234VoipTkn5678',
        deviceType: Platform.OS == 'android' ? 'Android' : 'IOS',
        latitude: '34.052235',
        longitude: '-118.243683',
        mobileNumber: inputs.phone,
        countryCode: '91',
      };

      dispatch(userRegistation(data, navigation));
    } else {
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <Loader loading={isLoading} />

      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <View style={{height: StatusBar.currentHeight * 1.5}} />
      <KeyboardAwareScrollView
        contentContainerStyle={{flexGrow: 1, paddingBottom: 20}}
        enableOnAndroid={true}
        extraHeight={50} // Adjust height to lift the view
        extraScrollHeight={30} // Scroll a bit more
      >
        <View style={{marginTop: StatusBar.currentHeight * 2}} />

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
            <Input
              value={inputs.name}
              error={error.name}
              onChangeText={input => {
                handleInputs('name', input);
              }}
              placeholder="Esther Howard"
              lable="Name"
            />
          </View>
          <View style={{marginTop: moderateScale(30), width: '100%'}}>
            <Input
              error={error.email}
              value={inputs.email}
              onChangeText={input => {
                handleInputs('email', input);
              }}
              placeholder="example@gmail.com"
              lable="Email"
            />
          </View>
          <View style={{marginTop: moderateScale(30), width: '100%'}}>
            <Input
              value={inputs.phone}
              error={error.phone}
              onChangeText={input => {
                handleInputs('phone', input);
              }}
              keyboardType={keyboartype.number_pad}
              isMobile={true}
              placeholder="Phone"
              lable="Phone"
            />
          </View>
          <View style={{marginTop: moderateScale(30), width: '100%'}}>
            <Input
              value={inputs.password}
              error={error.password}
              onChangeText={input => {
                handleInputs('password', input);
              }}
              eye
              placeholder="***********"
              lable="Password"
            />
          </View>
          <View style={{marginTop: moderateScale(30), width: '100%'}}>
            <Input placeholder="Select" lable="Gender" isDropDown />
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
                handleSubmit();
                // navigation.navigate('OtpScreen');
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
