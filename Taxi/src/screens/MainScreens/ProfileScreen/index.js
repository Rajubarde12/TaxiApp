import {Image, View} from 'react-native';
import {colors} from '../../../constants/colors';
import Header from '../../../components/Header';
// import {moderateScale} from '../../../utils/Scalling';
import {Pencille} from '../../../constants/svgIcons';
import {moderateScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import CustomText from '../../../components/CustomText';

const ProfileScreen = () => {
  const {user} = useSelector(state => state.user);
  console.log(user);

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <Header map={true} title="Profile" />
      <View>
        <View
          style={{
            height: moderateScale(80),
            width: moderateScale(80),
            alignSelf: 'center',
            borderRadius: 60,
            // overflow: 'hidden',
          }}>
          <Image
            style={{
              height: '100%',
              width: '100%',
              borderRadius: moderateScale(60),
            }}
            source={{
              uri: 'https://png.pngtree.com/background/20230612/original/pngtree-beautiful-cute-girl-wearing-makeup-staring-at-the-camera-picture-image_3186471.jpg',
            }}
          />
          <View
            style={{
              right: 0,
              padding: 5,
              zIndex: 1,
              bottom: -13,
              position: 'absolute',
            }}>
            <Pencille height={30} width={30} />
          </View>
        </View>
        <View>
          <CustomText>{user?.name}</CustomText>
        </View>
      </View>
    </View>
  );
};
export default ProfileScreen;
