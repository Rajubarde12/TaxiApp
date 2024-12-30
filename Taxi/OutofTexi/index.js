import {ImageBackground, View} from 'react-native';
import {LiveLocation} from '../src/constants/svgIcons';
import Liveaction from './Liveaction';

const OutoffTexi = () => {
  return (
    <ImageBackground style={{flex: 1}} source={require('./pi.png')}>
      <View style={{flex: 1, backgroundColor: 'red'}}>
        <Liveaction />
      </View>
    </ImageBackground>
  );
};
export default OutoffTexi;
const data1 = [
  {
    id: 1,
    text1: 'Joint us on',
    title: 'Telegram',
    // icon,
  },
];
