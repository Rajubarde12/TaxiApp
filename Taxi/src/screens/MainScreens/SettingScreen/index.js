import {FlatList, Image, ScrollView, View} from 'react-native';
import {colors} from '../../../constants/colors';
import Header from '../../../components/Header';
// import {moderateScale} from '../../../utils/Scalling';
import {
  ArrowRight,
  Bell,
  Cupon,
  DeleteAccount,
  Emergency,
  HelpCenter,
  KeySetting,
  LocationProdifle,
  Logout,
  NotificationSettings,
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

const SettingScreen = () => {
  const {user} = useSelector(state => state.user);
  console.log(user);

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <Header map={true} title="Profile" />

      <ScrollView contentContainerStyle={{paddingBottom: moderateScale(20)}}>
        <View
          style={{
            alignItems: 'center',
            width: '100%',
            paddingTop: moderateScale(30),
          }}>
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
                <View
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
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default SettingScreen;
const data = [
  {
    icon: NotificationSettings,
    title: 'Notification Settings',
  },
  {
    icon: KeySetting,
    title: 'Password Manager',
  },
  {
    icon: DeleteAccount,
    title: 'Delete Account',
  },
];
