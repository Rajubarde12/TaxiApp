import {StatusBar, View} from 'react-native';
import {colors} from '../../constants/colors';
import {Logo} from '../../assets/helper/svgIcons';
import {moderateScale} from 'react-native-size-matters';
import {useEffect} from 'react';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('IntroScreen');
    }, 3000);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Logo height={moderateScale(229)} width={moderateScale(229)} />
    </View>
  );
};
export default SplashScreen;
