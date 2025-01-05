import {Pressable, TextInput, View} from 'react-native';
import {moderateScale} from '../utils/Scalling';
import {colors} from '../constants/colors';
import fonts from '../constants/fonts';
import {fontSize} from '../constants/fontSize';
import CustomText from './CustomText';
import {ArrowDown, Eyeopen} from '../constants/svgIcons';
import {useState} from 'react';
import CountryPicker from 'react-native-country-picker-modal';

const Input = ({
  placeholder,
  value,
  onChangeText,
  lable,
  eye,
  isMobile,
  isDropDown,
  error,
  onFocus,
  keyboardType,
  ...props
}) => {
  const [isSecured, setIsSecured] = useState(true);
  const [visible, seVisible] = useState(false);
  const [countryCode, setCouryCode] = useState(91);
  const [counrtyCode1, setCountCode1] = useState('IN');
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
  const [phoneNumberMaxLength, setPhoneNumberMextLength] = useState(10);
  return (
    <>
      <CustomText
        fontFamily={fonts.medium}
        size={fontSize.Fifteen}
        style={{marginLeft: 4, marginBottom: 4}}>
        {lable}
      </CustomText>
      <View
        style={[
          {
            borderWidth: 1,
            width: '100%',
            borderColor: error && false ? colors.error : colors.inputBorder,
            borderRadius: 5,
            flexDirection: 'row',
            alignItems: 'center',
            height: moderateScale(67),
          },
        ]}>
        {isMobile ? (
          <Pressable
            onPress={() => {
              seVisible(true);
            }}
            style={{
              width: '18%',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              paddingLeft: '1%',
            }}>
            <CustomText>+{countryCode}</CustomText>
            <ArrowDown height={23} width={23} />
            <CountryPicker
              {...{
                onClose: () => {
                  seVisible(false);
                },
                onSelect: data => {
                  setCouryCode(data?.callingCode[0]);
                  setPhoneNumberMextLength(phoneLengths[data?.cca2] || 91);
                  setCountCode1(data?.cca2 || 'IN');
                },
              }}
              withFilter={true}
              withEmoji={false}
              containerButtonStyle={{
                marginLeft: 10,
                backgroundColor: 'transparent',
                width: '100%',
                display: 'none',
              }}
              countryCode={counrtyCode1}
              visible={visible}
            />
          </Pressable>
        ) : null}
        {isMobile ? <CustomText color={colors.grey}>|</CustomText> : null}

        <TextInput
          maxLength={isMobile ? phoneNumberMaxLength : undefined}
          secureTextEntry={eye ? isSecured : null}
          placeholder={placeholder}
          placeholderTextColor={colors.grey}
          onChangeText={onChangeText}
          onFocus={onFocus}
          style={{
            height: moderateScale(67),
            width: eye || isMobile || isDropDown ? '87%' : '100%',
            color: colors.black,
            paddingLeft: moderateScale(isMobile ? 5 : 20),
            fontFamily: fonts.medium,
            fontSize: fontSize.Fifteen,
          }}
          keyboardType={keyboardType}
          value={value}
          {...props}
        />
        {eye || isDropDown ? (
          <Pressable
            onPress={() => {
              if (eye) {
                setIsSecured(prev => !prev);
              }
            }}
            style={{
              height: '100%',
              width: '13%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {isDropDown ? <ArrowDown /> : <Eyeopen />}
          </Pressable>
        ) : null}
      </View>
      {error ? (
        <CustomText
          fontFamily={fonts.regular}
          size={fontSize.Twelve}
          color={colors.error}
          style={{marginTop: 4, marginLeft: 4}}>
          {error}
        </CustomText>
      ) : null}
    </>
  );
};
export default Input;
