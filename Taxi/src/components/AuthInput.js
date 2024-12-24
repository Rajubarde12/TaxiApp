import {Pressable, TextInput, TouchableOpacity, View} from 'react-native';
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
        style={{
          borderWidth: 1,
          width: '100%',
          borderColor: colors.inputBorder,
          borderRadius: 5,
          flexDirection: 'row',
          alignItems: 'center',
          height: moderateScale(67),
        }}>
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
          placeholder={placeholder}
          placeholderTextColor={colors.grey}
          style={{
            height: moderateScale(67),
            width: eye || isMobile || isDropDown ? '87%' : '100%',
            color: colors.black,
            paddingLeft: moderateScale(isMobile ? 5 : 20),
            fontFamily: fonts.medium,
            fontSize: fontSize.Fifteen,
            // borderWidth: 1,
          }}
          keyboardType=""
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
    </>
  );
};
export default Input;
