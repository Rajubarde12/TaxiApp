import {Pressable, TextInput, View} from 'react-native';
import {moderateScale} from '../utils/Scalling';
import {colors} from '../constants/colors';
import fonts from '../constants/fonts';
import {fontSize} from '../constants/fontSize';
import CustomText from './CustomText';
import {ArrowDown, Eyeopen} from '../constants/svgIcons';

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
            borderColor: error ? colors.error : colors.inputBorder,
            borderRadius: 5,
            flexDirection: 'row',
            alignItems: 'center',
            height: moderateScale(67),
          },
        ]}>
        {isMobile ? (
          <View
            style={{
              width: '16%',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <CustomText>+91</CustomText>
            <ArrowDown height={23} width={23} />
          </View>
        ) : null}
        {isMobile ? <CustomText color={colors.grey}>|</CustomText> : null}

        <TextInput
          secureTextEntry={eye}
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
