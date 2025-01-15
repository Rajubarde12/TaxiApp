import {
  Alert,
  ImageBackground,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {colors} from '../../../constants/colors';
import {ArrowDown, Checkmark, LoginSvg} from '../../../constants/svgIcons';
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
import Toast from 'react-native-simple-toast';
import SelectDropdown from 'react-native-select-dropdown';

const RegisterScreen = ({navigation}) => {
  const {isLoading} = useSelector(state => state.login);
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const [countryCode, setCountryCode] = useState('91');
  const [countryCode1, setCountryCode1] = useState('IN');
  const emojisWithIcons = [
    {title: 'Male', description: 'emoticon-happy-outline'},
    {title: 'Female', description: 'emoticon-happy-outline'},
    {title: 'Other', description: 'emoticon-happy-outline'},
  ];
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
  const phoneLengths = {
    AF: 9, // Afghanistan
    AL: 9, // Albania
    DZ: 9, // Algeria
    AS: 7, // American Samoa
    AD: 6, // Andorra
    AO: 9, // Angola
    AI: 7, // Anguilla
    AG: 7, // Antigua and Barbuda
    AR: 10, // Argentina
    AM: 8, // Armenia
    AW: 7, // Aruba
    AU: 9, // Australia
    AT: 10, // Austria
    AZ: 9, // Azerbaijan
    BS: 7, // Bahamas
    BH: 8, // Bahrain
    BD: 10, // Bangladesh
    BB: 7, // Barbados
    BY: 9, // Belarus
    BE: 9, // Belgium
    BZ: 7, // Belize
    BJ: 8, // Benin
    BM: 7, // Bermuda
    BT: 8, // Bhutan
    BO: 8, // Bolivia
    BA: 8, // Bosnia and Herzegovina
    BW: 7, // Botswana
    BR: 11, // Brazil
    IO: 7, // British Indian Ocean Territory
    BN: 7, // Brunei
    BG: 8, // Bulgaria
    BF: 8, // Burkina Faso
    BI: 8, // Burundi
    KH: 9, // Cambodia
    CM: 9, // Cameroon
    CA: 10, // Canada
    CV: 7, // Cape Verde
    KY: 7, // Cayman Islands
    CF: 8, // Central African Republic
    TD: 8, // Chad
    CL: 9, // Chile
    CN: 11, // China
    CO: 10, // Colombia
    KM: 7, // Comoros
    CD: 9, // Congo, Democratic Republic of the
    CG: 9, // Congo, Republic of the
    CR: 8, // Costa Rica
    CI: 8, // Côte d'Ivoire
    HR: 9, // Croatia
    CU: 8, // Cuba
    CY: 8, // Cyprus
    CZ: 9, // Czech Republic
    DK: 8, // Denmark
    DJ: 8, // Djibouti
    DM: 7, // Dominica
    DO: 10, // Dominican Republic
    EC: 9, // Ecuador
    EG: 10, // Egypt
    SV: 8, // El Salvador
    GQ: 9, // Equatorial Guinea
    ER: 7, // Eritrea
    EE: 7, // Estonia
    SZ: 7, // Eswatini (Swaziland)
    ET: 9, // Ethiopia
    FJ: 7, // Fiji
    FI: 10, // Finland
    FR: 9, // France
    GA: 7, // Gabon
    GM: 7, // Gambia
    GE: 9, // Georgia
    DE: 10, // Germany
    GH: 9, // Ghana
    GI: 8, // Gibraltar
    GR: 10, // Greece
    GL: 6, // Greenland
    GD: 7, // Grenada
    GU: 7, // Guam
    GT: 8, // Guatemala
    GN: 9, // Guinea
    GW: 7, // Guinea-Bissau
    GY: 7, // Guyana
    HT: 8, // Haiti
    HN: 8, // Honduras
    HK: 8, // Hong Kong
    HU: 9, // Hungary
    IS: 7, // Iceland
    IN: 10, // India
    ID: 10, // Indonesia
    IR: 10, // Iran
    IQ: 10, // Iraq
    IE: 9, // Ireland
    IL: 9, // Israel
    IT: 10, // Italy
    JM: 7, // Jamaica
    JP: 10, // Japan
    JO: 9, // Jordan
    KZ: 10, // Kazakhstan
    KE: 9, // Kenya
    KI: 6, // Kiribati
    KP: 10, // Korea, North
    KR: 10, // Korea, South
    KW: 8, // Kuwait
    KG: 9, // Kyrgyzstan
    LA: 9, // Laos
    LV: 8, // Latvia
    LB: 8, // Lebanon
    LS: 9, // Lesotho
    LR: 7, // Liberia
    LY: 9, // Libya
    LI: 7, // Liechtenstein
    LT: 8, // Lithuania
    LU: 9, // Luxembourg
    MO: 8, // Macau
    MK: 8, // North Macedonia
    MG: 9, // Madagascar
    MW: 9, // Malawi
    MY: 10, // Malaysia
    MV: 7, // Maldives
    ML: 8, // Mali
    MT: 8, // Malta
    MH: 7, // Marshall Islands
    MR: 8, // Mauritania
    MU: 8, // Mauritius
    MX: 10, // Mexico
    FM: 7, // Micronesia
    MD: 8, // Moldova
    MC: 9, // Monaco
    MN: 8, // Mongolia
    ME: 8, // Montenegro
    MS: 7, // Montserrat
    MA: 9, // Morocco
    MZ: 9, // Mozambique
    MM: 9, // Myanmar
    NA: 9, // Namibia
    NR: 7, // Nauru
    NP: 10, // Nepal
    NL: 9, // Netherlands
    NZ: 9, // New Zealand
    NI: 8, // Nicaragua
    NE: 8, // Niger
    NG: 10, // Nigeria
    NU: 4, // Niue
    NF: 6, // Norfolk Island
    MP: 7, // Northern Mariana Islands
    NO: 8, // Norway
    OM: 8, // Oman
    PK: 10, // Pakistan
    PW: 7, // Palau
    PS: 9, // Palestine
    PA: 8, // Panama
    PG: 7, // Papua New Guinea
    PY: 9, // Paraguay
    PE: 9, // Peru
    PH: 10, // Philippines
    PL: 9, // Poland
    PT: 9, // Portugal
    PR: 10, // Puerto Rico
    QA: 8, // Qatar
    RO: 10, // Romania
    RU: 10, // Russia
    RW: 9, // Rwanda
    KN: 7, // Saint Kitts and Nevis
    LC: 7, // Saint Lucia
    VC: 7, // Saint Vincent and the Grenadines
    WS: 5, // Samoa
    SM: 10, // San Marino
    ST: 7, // São Tomé and Príncipe
    SA: 9, // Saudi Arabia
    SN: 9, // Senegal
    RS: 9, // Serbia
    SC: 7, // Seychelles
    SL: 8, // Sierra Leone
    SG: 8, // Singapore
    SK: 9, // Slovakia
    SI: 9, // Slovenia
    SB: 7, // Solomon Islands
    SO: 9, // Somalia
    ZA: 9, // South Africa
    ES: 9, // Spain
    LK: 9, // Sri Lanka
    SD: 9, // Sudan
    SR: 7, // Suriname
    SE: 9, // Sweden
    CH: 9, // Switzerland
    SY: 9, // Syria
    TW: 9, // Taiwan
    TJ: 9, // Tajikistan
    TZ: 9, // Tanzania
    TH: 9, // Thailand
    TG: 8, // Togo
    TO: 5, // Tonga
    TT: 7, // Trinidad and Tobago
    TN: 8, // Tunisia
    TR: 10, // Turkey
    TM: 8, // Turkmenistan
    TC: 7, // Turks and Caicos Islands
    TV: 5, // Tuvalu
    UG: 9, // Uganda
    UA: 9, // Ukraine
    AE: 9, // United Arab Emirates
    GB: 10, // United Kingdom
    US: 10, // United States
    UY: 9, // Uruguay
    UZ: 9, // Uzbekistan
    VU: 7, // Vanuatu
    VA: 10, // Vatican City
    VE: 11, // Venezuela
    VN: 10, // Vietnam
    YE: 9, // Yemen
    ZM: 9, // Zambia
    ZW: 9, // Zimbabwe
  };
  const validateField = (key, value) => {
    const length = phoneLengths[countryCode1] || 10;

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
          value.length < length
            ? `Enter a valid ${length}-digit phone number`
            : '',
        );
        break;
      default:
        break;
    }
  };
  console.log(countryCode);

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
    navigation.navigate('CompleteProfileScreen');
    return;
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
        countryCode: countryCode,
      };

      if (checked) {
        dispatch(userRegistation(data, navigation));
      } else {
        Toast.show('Please check Terms & Condition');
      }
    } else {
    }
  };
  const [checked, setChecked] = useState(false);

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
              placeholder="Enter Your Name"
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
              placeholder="Enter Your Email"
              lable="Email"
            />
          </View>
          <View style={{marginTop: moderateScale(30), width: '100%'}}>
            <Input
              value={inputs.phone}
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
              placeholder="Enter Your Phone"
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
              placeholder="Enter Password"
              lable="Password"
            />
          </View>

          <View style={{marginTop: moderateScale(30), width: '100%'}}>
            <SelectDropdown
              data={emojisWithIcons}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              renderButton={(selectedItem, isOpened) => {
                return (
                  <View style={styles.dropdownButtonStyle}>
                    <CustomText color={colors.grey} size={fontSize.Fifteen}>
                      {(selectedItem && selectedItem.title) || 'Select Gender'}
                    </CustomText>
                    <ArrowDown />
                  </View>
                );
              }}
              renderItem={(item, index, isSelected) => {
                return (
                  <View
                    style={{
                      ...styles.dropdownItemStyle,
                    }}>
                    {/* <Icon name={item.icon} style={styles.dropdownItemIconStyle} /> */}
                    <Text
                      style={[
                        styles.dropdownItemTxtStyle,
                        {
                          color: true ? colors.black : colors.grey,
                        },
                      ]}>
                      {item.title}
                    </Text>
                  </View>
                );
              }}
              showsVerticalScrollIndicator={false}
              dropdownStyle={styles.dropdownMenuStyle}
              // renderSearchInputRightIcon={() => {
              //   return <ArrowDown />;
              // }}
            />
          </View>
          <View
            style={{
              width: '100%',
              marginTop: moderateScale(50),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Pressable
              onPress={() => {
                setChecked(prev => !prev);
              }}
              style={{
                height: 20,
                width: 20,
                borderWidth: 2,
                borderColor: checked ? colors.yellow : colors.grey,
                backgroundColor: checked ? colors.yellow : colors.white,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Checkmark height={16} width={16} />
            </Pressable>
            <Pressable>
              <CustomText style={{marginLeft: 10}}>
                Agree with{' '}
                <Text
                  onPress={() => {
                    Linking.openURL('https://24x7taxi.is/');
                  }}
                  style={{
                    color: colors.yellow,
                    textDecorationLine: 'underline',
                  }}>
                  Terms & Condition
                </Text>
              </CustomText>
            </Pressable>
          </View>
          <View style={{marginTop: moderateScale(30), width: '100%'}}>
            <Button
              onPress={() => {
                handleSubmit();
                // navigation.navigate('OtpScreen');
              }}
              title={'Register'}
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
          <Pressable
            onPress={() => {
              navigation.navigate('LoginScreen');
            }}>
            <CustomText mTop={moderateScale(20)}>
              Already have an account?
              <Text style={{color: colors.yellow}}> Sign In</Text>
            </CustomText>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
export default RegisterScreen;
const styles = StyleSheet.create({
  dropdownButtonStyle: {
    borderWidth: 1,
    width: '100%',
    borderColor: colors.inputBorder,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    height: moderateScale(70),
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingLeft: '5%',
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: fontSize.Eighteen,
    // fontWeight: '',
    // color: '#151E26',
    color: colors.black,
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});
