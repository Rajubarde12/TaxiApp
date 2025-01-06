import {View} from 'react-native';
import {Congratulations} from '../../../constants/svgIcons';
import Header from '../../../components/Header';

const CongrationsScreen = () => {
  return (
    <View style={{flex: 1}}>
      <Header title={'Loyalty Point'} />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View style={{marginTop: '-30%'}}>
          <Congratulations />
        </View>
      </View>
    </View>
  );
};
export default CongrationsScreen;
