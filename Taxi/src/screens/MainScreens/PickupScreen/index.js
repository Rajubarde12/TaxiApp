import {FlatList, Pressable, View} from 'react-native';
import MapScreen from '../../../components/MapScreen';
import {colors} from '../../../constants/colors';
import {BottomSheetWrapperComponent} from '../../../components/BottumSheet';
import {moderateScale} from '../../../utils/Scalling';
import CustomText from '../../../components/CustomText';
import fonts from '../../../constants/fonts';
import {fontSize} from '../../../constants/fontSize';
import {LiveLocation, Location2, Office} from '../../../constants/svgIcons';
import {width} from '../../../constants/Dimentions';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
const PickupScreen = ({route}) => {
  const {region, address} = route?.params || {};
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>
      <MapScreen
        onRegoin={region => {
          console.log(region);
        }}
        placeholder={address}
        isEnalble>
        <Header title={'Pick-Up'} />

        <View
          style={{
            height: moderateScale(150),
            bottom: 0,
            backgroundColor: colors.white,
            // position: 'absolute',
            paddingHorizontal: moderateScale(25),
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: {width: 0, height: -2},
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 10,
            overflow: 'hidden',
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
            position: 'absolute',
            width: width,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Button title={'Confirm Location'} />
        </View>
      </MapScreen>
    </View>
  );
};
export default PickupScreen;
const data = [
  {
    id: '1',
    icon: Location2,
    title: 'Destination',
    desc: 'Enter Destination',
  },
  {
    id: '2',
    icon: Office,
    title: 'Office',
    desc: '35 KM Away',
  },
];
