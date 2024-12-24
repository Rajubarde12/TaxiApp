import {TouchableOpacity} from 'react-native';
import CustomText from './CustomText';
import {moderateScale} from '../utils/Scalling';
import {colors} from '../constants/colors';
import {width} from '../constants/Dimentions';
import fonts from '../constants/fonts';

const Button = ({title, onPress, width1}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: moderateScale(65),
        backgroundColor: colors.yellow,
        width: width1 ?? width * 0.8,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
      }}>
      <CustomText fontFamily={fonts.semi_bold}>{title}</CustomText>
    </TouchableOpacity>
  );
};
export default Button;
