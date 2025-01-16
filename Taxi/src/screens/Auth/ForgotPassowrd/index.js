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
import {MAIN_URL} from '../../../constants';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import {phoneLengths} from '../../../constants/phoneLengths';
const ForgotPasswordScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    phone: '',
  });
  const [countryCode, setCountryCode] = useState('354');
  const [countryCode1, setCountryCode1] = useState('IS');
  const [error, setError] = useState({
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
    const length = phoneLengths[countryCode1] || 7;
    switch (key) {
      case 'phone':
      case 'phone':
        handleError(
          key,
          value.length < length
            ? `Enter a valid ${length}-digit phone number`
            : '',
        );
        break;
        break;
      default:
        break;
    }
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
          mobileNumber: inputs.phone,
          countryCode: countryCode,
        };
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `${MAIN_URL}/auth/forget-password-new`,
          headers: {
            'Content-Type': 'application/json',
          },
          data: JSON.stringify(data),
        };
        const response = await axios.request(config);
        if (response.data.status == 200) {
          setIsLoading(false);
          Toast.show(response.data?.message);
          navigation.navigate('OtpScreen', {
            phone: inputs.phone,
            countryCode: countryCode,
          });
        } else {
          setIsLoading(false);
        }
      } catch (err) {
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
              value={inputs.phone}
              counrtyCode={countryCode}
              counrtyCode1={countryCode1}
              onCrountryCode={(code1, code) => {
                setCountryCode(code1);
                setCountryCode1(code);
              }}
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
            <Button
              onPress={() => {
                handleSubmit();
                // navigation.navigate('OtpScreen');
              }}
              title={'Send Otp'}
              width1={'100%'}
            />
          </View>
          <CustomText
            mTop={moderateScale(30)}
            size={fontSize.Fourteen}
            color={colors.grey}>
            Or Sign Up With
          </CustomText>
          <View style={{width: '100%', marginTop: moderateScale(30)}}>
            <AuthSocial />
          </View>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}>
            <CustomText mTop={moderateScale(20)}>
              Already have an account?
              <Text style={{color: colors.yellow}}> Sign In=</Text>
            </CustomText>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
export default ForgotPasswordScreen;
