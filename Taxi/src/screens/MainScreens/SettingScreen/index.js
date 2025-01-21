import {
  FlatList,
  Image,
  Modal,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../../constants/colors';
import Header from '../../../components/Header';

import {
  Danger,
  DeleteAccount,
  KeySetting,
  NotificationSettings,
  Right,
} from '../../../constants/svgIcons';
import {moderateScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import CustomText from '../../../components/CustomText';
import {fontSize} from '../../../constants/fontSize';
import fonts from '../../../constants/fonts';
import {height, width} from '../../../constants/Dimentions';
import {useState} from 'react';

const SettingScreen = () => {
  const {user} = useSelector(state => state.user);
  const [visible, setVisilbe] = useState(false);

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
                <TouchableOpacity
                  onPress={() => {
                    if (item.title == 'Delete Account') {
                      setVisilbe(true);
                    }
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
                </TouchableOpacity>
              );
            }}
          />
          <Modal visible={visible} transparent={true}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.3)',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  height: height * 0.38,
                  width: width * 0.9,
                  backgroundColor: colors.white,
                  borderRadius: 10,
                  elevation: 3,
                  alignItems: 'center',
                  paddingHorizontal: '8%',
                }}>
                <Danger style={{marginTop: '5%'}} />
                <CustomText
                  fontFamily={fonts.medium}
                  color={colors.grey}
                  size={fontSize.Eighteen}
                  mTop={'5%'}
                  style={{textAlign: 'center'}}>
                  Do you want to get free 1 day full plan access to explore more
                  features?
                </CustomText>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '20%',
                    width: '100%',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setVisilbe(true);
                    }}
                    style={{
                      backgroundColor: '#faf8f2',
                      // paddingHorizontal: 30,
                      paddingVertical: 10,
                      borderRadius: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '45%',
                    }}>
                    <CustomText color={colors.yellow} size={fontSize.Eighteen}>
                      No
                    </CustomText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setVisilbe(false);
                    }}
                    style={{
                      backgroundColor: colors.yellow,
                      width: '45%',
                      paddingVertical: 10,
                      borderRadius: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <CustomText color={colors.black} size={fontSize.Eighteen}>
                      Yes
                    </CustomText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
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
