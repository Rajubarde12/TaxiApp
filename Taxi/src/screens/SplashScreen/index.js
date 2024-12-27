import {StatusBar, View} from 'react-native';
import {Splash} from '../../constants/svgIcons';
import {colors} from '../../constants/colors';
import {moderateScale} from '../../utils/Scalling';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import {DATABASE} from '../../utils/DATABASE';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    initial();
  }, []);
  const {user, token} = useSelector(state => state.user);
  const initial = async () => {
    try {
      const [init, storedUser, storedToken] = await Promise.all([
        AsyncStorage.getItem('init'),
        AsyncStorage.getItem(DATABASE.user),
        AsyncStorage.getItem(DATABASE.token),
      ]);

      if (storedUser || storedToken) {
        return navigation.replace('BottumTab');
      }

      const targetScreen = init ? 'LoginScreen' : null;
      navigation.replace(
        'AuthStack',
        targetScreen ? {screen: targetScreen} : undefined,
      );
      await AsyncStorage.setItem('init', 'init');
    } catch (error) {
      console.error('Initialization failed:', error);
    }
  };

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
