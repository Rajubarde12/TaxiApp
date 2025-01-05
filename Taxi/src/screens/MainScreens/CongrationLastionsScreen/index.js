import {View} from 'react-native';
import {Congratulations} from '../../../constants/svgIcons';

const CongrationsScreen = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Congratulations />
    </View>
  );
};
export default CongrationsScreen;
