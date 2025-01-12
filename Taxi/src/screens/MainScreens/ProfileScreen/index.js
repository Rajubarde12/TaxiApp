import {
  Alert,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import {colors} from '../../../constants/colors';
import Header from '../../../components/Header';
// import {moderateScale} from '../../../utils/Scalling';
import {
  ArrowRight,
  Bell,
  Cupon,
  Emergency,
  HelpCenter,
  LocationProdifle,
  Logout,
  Pencille,
  Prebooked,
  Right,
  Settings,
  UserPlush,
  UserYellow,
  WalletProfile,
} from '../../../constants/svgIcons';
import {moderateScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import CustomText from '../../../components/CustomText';
import {fontSize} from '../../../constants/fontSize';
import fonts from '../../../constants/fonts';
import {width} from '../../../constants/Dimentions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DATABASE} from '../../../utils/DATABASE';

const ProfileScreen = ({navigation}) => {
  const {user} = useSelector(state => state.user);
  console.log(user);

  const handleNavigation = title => {
    switch (title) {
      case 'Your Profile':
        navigation.navigate('UserProfileScreen');
        break;

      case 'Manage Address':
        navigation.navigate('ManageAddressScreen');
        break;

      case 'Notification':
        navigation.navigate('NotificationScreen');
        break;

      case 'Payment Methods':
        navigation.navigate('PaymentMethodsScreen');
        break;

      case 'Pre-Booked Rides':
        navigation.navigate('PreBookedRidesScreen');
        break;

      case 'Settings':
        navigation.navigate('SettingScreen');
        break;

      case 'Emergency Contact':
        navigation.navigate('EmergencyContactScreen');
        break;

      case 'Help Center':
        navigation.navigate('HelpCenterScreen');
        break;

      case 'Invite Friends':
        navigation.navigate('InviteFriendsScreen');
        break;

      case 'Coupon':
        navigation.navigate('CouponScreen');
        break;

      case 'Logout':
        // Add your logout logic here, such as clearing AsyncStorage, resetting state, etc.
        handleLogout();
        break;

      default:
        console.error(`No navigation implemented for title: ${title}`);
        break;
    }
  };
  const handleLogout = async () => {
    Alert.alert('called');
    await AsyncStorage.clear();
    console.log(await AsyncStorage.getItem(DATABASE.token));
    navigation.reset({
      index: 0,
      routes: [{name: 'AuthStack', params: {screen: 'LoginScreen'}}],
    });
  };

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
        <View style={{alignItems: 'center', paddingTop: 20}}>
          <CustomText
            colors={colors.black}
            fontFamily={fonts.semi_bold}
            size={fontSize.TwentyTwo}>
            {user?.name}
          </CustomText>
          <CustomText colors={colors.grey} size={fontSize.Sixteen}>
            {'200 Loyalty Points'}
          </CustomText>
        </View>
      </View>
      <ScrollView contentContainerStyle={{paddingBottom: moderateScale(20)}}>
        <View style={{alignItems: 'center', width: '100%'}}>
          <FlatList
            scrollEnabled={false}
            data={data}
            contentContainerStyle={{
              width: width,
              paddingHorizontal: moderateScale(20),
            }}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item, index}) => {
              let Icon = item.icon;
              return (
                <Pressable
                  onPress={() => {
                    handleNavigation(item.title);
                  }}
                  style={{
                    width: '100%',
                    borderWidth: 0,
                    paddingVertical: moderateScale(15),
                    paddingHorizontal: moderateScale(10),
                    backgroundColor: colors.white,
                    marginTop: moderateScale(2),
                    borderBottomWidth: 1,
                    borderBottomColor: colors.inputBorder,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      height: '100%',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Icon height={25} width={25} />
                    <CustomText style={{marginLeft: moderateScale(15)}}>
                      {item.title}
                    </CustomText>
                  </View>
                  <Right height={22} width={22} />
                </Pressable>
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default ProfileScreen;
const data = [
  {
    icon: UserYellow,
    title: 'Your Profile',
  },
  {
    icon: LocationProdifle,
    title: 'Manage Address',
  },
  {
    icon: Bell,
    title: 'Notification',
  },
  {
    icon: WalletProfile,
    title: 'Payment Methods',
  },

  {
    icon: Prebooked,
    title: 'Pre-Booked Rides',
  },
  {
    icon: Settings,
    title: 'Settings',
  },

  {
    icon: Emergency,
    title: 'Emergency Contact',
  },
  {
    icon: HelpCenter,
    title: 'Help Center',
  },
  {
    icon: UserPlush,
    title: 'Invite Friends',
  },
  {
    icon: Cupon,
    title: 'Coupon',
  },
  {
    icon: Logout,

    title: 'Logout',
  },
];
