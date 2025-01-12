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
import {useState} from 'react';
import Loader from '../../../components/Loader';
import Toast from 'react-native-simple-toast';
import {MAIN_URL} from '../../../constants';
import axios from 'axios';

const CreateNewpasswordScreen = ({navigation, route}) => {
  const phone = route?.params?.phone;
  const [isLoading, setIsLoading] = useState(false);
  const countryCode = route?.params?.countryCode;
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
  const [inputs, setInputs] = useState({
    password: '',
    confirmPassowrd: '',
  });
  const [error, setError] = useState({
    password: '',
    confirmPassowrd: '',
  });
  const handleInputs = (key, input) => {
    setInputs(prev => ({...prev, [key]: input}));
    validateField(key, input);
  };
  const validateField = (key, value) => {
    switch (key) {
      case 'password':
        validatePassword(value);
        break;
      case 'confirmPassowrd':
        if (value != inputs.password) {
          setError(prev => ({
            ...prev,
            confirmPassowrd: 'Passwords do not match',
          }));
        } else if (value === inputs.password) {
          setError(prev => ({...prev, confirmPassowrd: ''}));
        }
      default:
        break;
    }
  };
  const handleError = (key, err = '') => {
    setError(prev => ({...prev, [key]: err}));
  };
  const handleSubmit = async () => {
    let valid = true;
    Object.keys(inputs).forEach(key => {
      validateField(key, inputs[key]);
      if (inputs[key] === '' || error[key]) {
        valid = false;
      }
    });

    if (valid) {
      try {
        setIsLoading(true);
        let data = {
          mobileNumber: phone,
          countryCode: countryCode,
          password: inputs.password,
        };
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `${MAIN_URL}/auth/reset-password-new
`,
          headers: {
            'Content-Type': 'application/json',
          },
          data: JSON.stringify(data),
        };
        const response = await axios.request(config);
        if (response.data.status == 200) {
          setIsLoading(false);
          Toast.show(response.data?.message);
          navigation.replace('LoginScreen');
        } else {
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);

        if (err.status == '404') {
          Toast.show('User not registered!!');
        } else {
          Toast.show('Something Went wrong!');
        }
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
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
            <Input
              value={inputs.password}
              error={error.password}
              onChangeText={input => {
                handleInputs('password', input);
              }}
              eye
              placeholder="Password"
              lable="Password"
            />
          </View>
          <View style={{marginTop: moderateScale(30), width: '100%'}}>
            <Input
              value={inputs.confirmPassowrd}
              error={error.confirmPassowrd}
              onChangeText={input => {
                handleInputs('confirmPassowrd', input);
              }}
              eye
              placeholder="Confirm Password"
              lable="Confirm Password"
            />
          </View>

          <View style={{marginTop: moderateScale(40), width: '100%'}}>
            <Button
              onPress={() => {
                handleSubmit();
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
