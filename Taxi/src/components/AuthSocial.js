import {View} from 'react-native';
import {Apple, Facebook, Google} from '../constants/svgIcons';

export default function AuthSocial() {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '60%',
        justifyContent: 'space-between',
        alignSelf: 'center',
      }}>
      <Apple hegight={50} width={50} />
      <Google hegight={50} width={50} />
      <Facebook hegight={50} width={50} />
    </View>
  );
}
