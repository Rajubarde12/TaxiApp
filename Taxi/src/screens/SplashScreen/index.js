import {StatusBar, View} from 'react-native';
import {Splash} from '../../constants/svgIcons';
import {colors} from '../../constants/colors';
import {moderateScale} from '../../utils/Scalling';
import {useEffect} from 'react';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('AuthStack');
    }, 1500);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
      }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Splash height={moderateScale(300)} width={moderateScale(300)} />
    </View>
  );
};
export default SplashScreen;
