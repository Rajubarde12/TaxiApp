import {Text, TouchableOpacity, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {width} from '../constants/Deimenstions';
import {colors} from '../constants/colors';
import {size} from '../constants/fontsize';
import fonts from '../constants/fonts';

const Button = ({title}) => {
  return (
    <TouchableOpacity
      style={{
        height: moderateScale(58),
        width: width * 0.8,
        backgroundColor: colors.primary,
        alignSelf: 'center',
        marginTop: moderateScale(25),
        borderRadius: moderateScale(15),
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          color: colors.white,
          fontSize: size(16),
          fontFamily: fonts.semi_bold,
        }}>
        SIGN IN
      </Text>
    </TouchableOpacity>
  );
};
export default Button;
