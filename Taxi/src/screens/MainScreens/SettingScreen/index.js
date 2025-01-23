import {
  Alert,
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../../constants/colors';
import Header from '../../../components/Header';

import {
  CroshBlack,
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
import Button from '../../../components/Button';
import Loader from '../../../components/Loader';
import {MAIN_URL} from '../../../constants';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DATABASE} from '../../../utils/DATABASE';

const SettingScreen = ({navigation}) => {
  const {user} = useSelector(state => state.user);
  const [visible, setVisilbe] = useState(false);
  const [visible2, setVisilbe2] = useState(false);
  const [loading, setLoading] = useState(false);
  const onPressDeleteAccount = async () => {
    const token = await AsyncStorage.getItem(DATABASE.token);
    setVisilbe2(false);

    try {
      setLoading(true);
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${MAIN_URL}/user/delete-account`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.request(config);
      if (response?.data?.status == 200) {
        navigation.navigate('AuthStack', {
          screen: 'OtpScreen',
          params: {isDelete: true},
        });
      }
      Toast.show('Otp Sent');
      setLoading(false);
    } catch (err) {
      console.log(err);
      Toast.show('Something went wrong!');
      setLoading(false);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <Header map={true} title="Profile" />
      <Loader loading={loading} />

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
                      setVisilbe(false);
                      setVisilbe2(true);
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
          <Modal visible={visible2} animationType="slide" transparent={true}>
            <View style={{flex: 1, backgroundColor: 'rgba(246, 246, 246,0.8)'}}>
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  backgroundColor: colors.white,
                  width: '100%',
                  elevation: 5,
                  height: moderateScale(250),
                  alignItems: 'center',
                  //   justifyContent: 'center',
                  //   paddingTop: '5%',
                }}>
                <View
                  style={{
                    height: 3,
                    width: '30%',
                    alignSelf: 'center',
                    backgroundColor: colors.inputBorder,
                    marginTop: '2%',
                    borderRadius: 1,
                  }}
                />
                <View style={{height: '5%'}} />
                <Pressable
                  onPress={() => setVisilbe2(false)}
                  style={{
                    backgroundColor: colors.yellow,
                    height: 45,
                    width: 45,
                    borderRadius: 25,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <CroshBlack height={18} width={18} />
                </Pressable>
                <CustomText
                  fontFamily={fonts.semi_bold}
                  size={fontSize.Eighteen}
                  mTop={moderateScale(20)}>
                  Do You Want to Delete Your Accound
                </CustomText>
                <CustomText
                  style={{textAlign: 'center'}}
                  color={colors.grey}
                  size={fontSize.Fourteen}
                  mTop={moderateScale(20)}>
                  {'We will send an Otp for confirmation'}
                </CustomText>
                <View style={{height: '20%'}} />
                <Button
                  onPress={() => {
                    onPressDeleteAccount();
                  }}
                  title={'Delete Account'}
                />
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
