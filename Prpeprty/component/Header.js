import {StatusBar, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {ArrowBack} from '../assets/helper/svgIcons';

const Header = ({title}) => {
  return (
    <View
      style={{
        // height: moderateScale(40),
        marginTop: StatusBar.currentHeight,
        paddingLeft: moderateScale(15),
        justifyContent: 'center',
        paddingTop: moderateScale(10),
      }}>
      <ArrowBack />
    </View>
  );
};
export default Header;
