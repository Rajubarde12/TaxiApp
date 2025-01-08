import {Image, View} from 'react-native';
import {colors} from '../../../constants/colors';
import Header from '../../../components/Header';
import {moderateScale} from '../../../utils/Scalling';
import {Pencille} from '../../../constants/svgIcons';

const ProfileScreen = () => {
  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <Header map={true} title="Profile" />
      <View>
        <View
          style={{
            height: moderateScale(120),
            width: moderateScale(120),
            alignSelf: 'center',
            borderRadius: 60,
            overflow: 'hidden',
          }}>
          <Image
            style={{height: '100%', width: '100%'}}
            source={{
              uri: 'https://png.pngtree.com/background/20230612/original/pngtree-beautiful-cute-girl-wearing-makeup-staring-at-the-camera-picture-image_3186471.jpg',
            }}
          />
          <View style={{right: 0, padding: 5, zIndex: 1, position: 'absolute'}}>
            <Pencille />
          </View>
        </View>
      </View>
    </View>
  );
};
export default ProfileScreen;
