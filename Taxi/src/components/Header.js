import {Pressable, StatusBar, View} from 'react-native';
import {moderateScale} from '../utils/Scalling';
import {ArrowBack1} from '../constants/svgIcons';
import {colors} from '../constants/colors';
import CustomText from './CustomText';
import fonts from '../constants/fonts';
import {fontSize} from '../constants/fontSize';
import {useNavigation} from '@react-navigation/native';

const Header = ({onPress, title}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: moderateScale(20),
        // justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 5,
        marginTop: StatusBar.currentHeight,
      }}>
      <Pressable
        onPress={() => navigation.goBack()}
        style={{
          height: 40,
          width: 40,
          borderRadius: 30,
          backgroundColor: colors.white,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ArrowBack1 height={25} width={25} />
      </Pressable>
      <CustomText
        fontFamily={fonts.bold}
        size={fontSize.Eighteen}
        style={{marginLeft: '30%'}}>
        {title}
      </CustomText>
    </View>
  );
};
export default Header;
