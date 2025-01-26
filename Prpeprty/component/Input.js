import {TextInput, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../constants/colors';
import {Email, EyeClose} from '../assets/helper/svgIcons';
import {size} from '../constants/fontsize';

const Input = ({secureTextEntry, Icon, placeholder, isfirst}) => {
  return (
    <View
      style={{
        height: moderateScale(56),
        borderWidth: 1,
        marginTop: moderateScale(isfirst ? 10 : 25),
        borderColor: colors.inputBorder,
        borderRadius: moderateScale(12),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: moderateScale(15),
      }}>
      {Icon ? <Icon /> : null}
      <TextInput
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={colors.place_holder}
        style={{
          color: colors.black,
          borderWidth: 0,
          flex: 1,
          fontSize: size(14),
          marginLeft: moderateScale(Icon ? 10 : 0),
        }}
      />
      {secureTextEntry ? (
        <EyeClose height={moderateScale(24)} width={moderateScale(24)} />
      ) : null}
    </View>
  );
};
export default Input;
