import {
  Alert,
  Image,
  ImageBackground,
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {colors} from '../../../constants/colors';
import {
  ArrowBack,
  ArrowBack1,
  ArrowDown,
  Checkmark,
  LoginSvg,
  Pencille,
  User,
} from '../../../constants/svgIcons';
import {LoginBg} from '../../../constants/images';
import {height} from '../../../constants/Dimentions';
import {moderateScale} from '../../../utils/Scalling';
import CustomText from '../../../components/CustomText';
import {fontSize} from '../../../constants/fontSize';
import fonts from '../../../constants/fonts';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Button from '../../../components/Button';
import AuthSocial from '../../../components/AuthSocial';
import OTPInput from '../../../components/otpInputComponent';
import SelectDropdown from 'react-native-select-dropdown';
import {useState} from 'react';
import {getUserProfile} from '../../../redux/userSlice';
import Toast from 'react-native-simple-toast';
import ImageCropPicker from 'react-native-image-crop-picker';
import {MAIN_URL} from '../../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DATABASE} from '../../../utils/DATABASE';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import Loader from '../../../components/Loader';
const CompleteProfileScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState({name: '', type: '', uri: ''});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [gender, setGender] = useState('');
  const emojisWithIcons = [
    {title: 'Male', description: 'emoticon-happy-outline'},
    {title: 'Female', description: 'emoticon-happy-outline'},
    {title: 'Other', description: 'emoticon-happy-outline'},
  ];

  const openCamera = () => {
    ImageCropPicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setImage({
          name: image.filename || 'photo.jpg',
          type: image.mime,
          uri: image.path,
        });
        handleProfilePhoto(true, {
          name: image.filename || 'photo.jpg',
          type: image.mime,
          uri: image.path,
        });
      })
      .catch(err => {
        console.error('Error capturing image:', err);
      });
  };
  const pickImage = async () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setImage({
          name: image.filename,
          type: image.mime,
          uri: image.path,
        });
        handleProfilePhoto(true, {
          name: image.filename || 'photo.jpg',
          type: image.mime,
          uri: image.path,
        });
      })
      .catch(err => {
        console.error('Error picking image:', err);
      });
  };
  const handleProfilePhoto = async (bool, image) => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem(DATABASE.token);
      if (!token) {
        Alert.alert('Error', 'Authentication token is missing.');
        return;
      }
      let imagetoUpload = '';
      if (bool) {
        const imageData = new FormData();
        imageData.append('image', {
          uri: image.uri,
          name: image.name || 'profile.jpg',
          type: image.type || 'image/jpeg',
        });
        imageData.append('type', 'User');

        const imageUploadConfig = {
          method: 'post',
          url: 'https://taxi-5.onrender.com/api/common/image-upload?image',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
            language: 'hindi',
          },
          data: imageData,
        };

        const imageResponse = await axios.request(imageUploadConfig);
        if (imageResponse.data?.status === 200) {
          imagetoUpload = imageResponse.data.data.upload;
          setLoading(false);
        } else {
          Toast.show('Image upload failed');
          setLoading(false);
          return;
        }
      }
      let profileData;
      if (bool) {
        profileData = {
          profileImage: imagetoUpload,
        };
      } else {
        profileData = {
          type: 'User',
          gender: gender,
          isProfileCompleted: true,
        };
      }
      //

      const profileUpdateConfig = {
        method: 'post',
        url: `${MAIN_URL}/user/update-profile`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          language: 'hindi',
        },
        data: JSON.stringify(profileData),
      };

      const profileResponse = await axios.request(profileUpdateConfig);
      if (profileResponse.data?.status === 200) {
        if (!bool) {
          navigation.navigate('LocationEnableScreen');
        }
        dispatch(getUserProfile());
        Toast.show(bool ? 'Profile image uploaded' : 'Profile updated');
      } else {
        Toast.show('Profile update failed');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      Toast.show('Something went wrong');
      setLoading(false);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <Loader loading={loading} />
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          marginTop: StatusBar.currentHeight * 1.5,
          marginLeft: moderateScale(25),
          alignItems: 'center',
          justifyContent: 'center',
          height: 40,
          width: 40,
          borderWidth: 1,
          borderColor: colors.inputBorder,
          borderRadius: 20,
        }}>
        <ArrowBack1 height={20} width={20} />
      </Pressable>
      <View style={{marginTop: StatusBar.currentHeight * 1.5}} />
      <KeyboardAwareScrollView
        contentContainerStyle={{flexGrow: 1}}
        enableOnAndroid={true}
        extraHeight={50}
        extraScrollHeight={30}>
        <View
          style={{
            paddingHorizontal: moderateScale(30),
            alignItems: 'center',
          }}>
          <CustomText
            mTop={moderateScale(15)}
            size={fontSize.TwentyFive}
            fontFamily={fonts.medium}>
            Complete your Profile
          </CustomText>
          <View style={{paddingHorizontal: '10%'}}>
            <CustomText
              mTop={moderateScale(15)}
              color={colors.grey}
              size={fontSize.Fourteen}
              style={{textAlign: 'center'}}
              fontFamily={fonts.medium}>
              Don’t worry, only you can see your personal data, No one else will
              be able to see it.
            </CustomText>
          </View>
          <Pressable
            onPress={() => {
              setModalVisible(true);
            }}
            style={{
              height: 100,
              width: 100,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.Off_White,
              borderRadius: 50,
              marginTop: moderateScale(30),
              // overflow: 'hidden',
            }}>
            {image?.uri != '' ? (
              <Image
                source={{uri: image?.uri}}
                style={{height: '100%', width: '100%', borderRadius: 50}}
              />
            ) : (
              <User height={40} width={40} />
            )}
            <View style={{position: 'absolute', right: 0, bottom: 5}}>
              <Pencille height={25} width={25} />
            </View>
          </Pressable>
          {/* <View style={{marginTop: moderateScale(80), width: '100%'}}>
            <Input placeholder="Mobile Number" lable="Phone Number" isMobile />
          </View> */}
          <View style={{marginTop: moderateScale(40), width: '100%'}}>
            <SelectDropdown
              data={emojisWithIcons}
              onSelect={(selectedItem, index) => {
                setGender(selectedItem?.title);
              }}
              renderButton={(selectedItem, isOpened) => {
                return (
                  <View style={styles.dropdownButtonStyle}>
                    <CustomText color={colors.grey} size={fontSize.Fifteen}>
                      {(selectedItem && selectedItem.title) || 'Select Gender'}
                    </CustomText>
                    <ArrowDown />
                  </View>
                );
              }}
              renderItem={(item, index, isSelected) => {
                return (
                  <View
                    style={{
                      ...styles.dropdownItemStyle,
                    }}>
                    <Text
                      style={[
                        styles.dropdownItemTxtStyle,
                        {
                          color: true ? colors.black : colors.grey,
                        },
                      ]}>
                      {item.title}
                    </Text>
                  </View>
                );
              }}
              showsVerticalScrollIndicator={false}
              dropdownStyle={styles.dropdownMenuStyle}
              // renderSearchInputRightIcon={() => {
              //   return <ArrowDown />;
              // }}
            />
          </View>

          <View style={{marginTop: moderateScale(200), width: '100%'}}>
            <Button
              onPress={() => {
                if (gender == '') {
                  Toast.show('Please Select Gender');
                  return;
                }
                handleProfilePhoto();
              }}
              title={'Complete Profile'}
              width1={'100%'}
            />
          </View>
        </View>
        <Modal visible={modalVisible} transparent={true}>
          <Pressable
            onPress={() => {
              setModalVisible(false);
            }}
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.5)',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                height: '15%',
                width: '90%',
                backgroundColor: colors.yellow,
                borderRadius: 20,
                elevation: 3,
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingHorizontal: '10%',
              }}>
              <Pressable
                onPress={() => {
                  pickImage();
                  setModalVisible(false);
                }}>
                <Image
                  style={{
                    tintColor: colors.white,
                    height: 40,
                    width: 40,
                  }}
                  source={require('../../../assets/Gallary.png')}
                />
              </Pressable>
              <Pressable
                onPress={() => {
                  openCamera();
                  setModalVisible(false);
                }}>
                <Image
                  // tintColor={colors.white}
                  style={{
                    // backgroundColor: colors.yellow,
                    tintColor: colors.white,
                    height: 40,
                    width: 40,
                  }}
                  source={require('../../../assets/Camera.png')}
                />
              </Pressable>
            </View>
          </Pressable>
        </Modal>
      </KeyboardAwareScrollView>
    </View>
  );
};
export default CompleteProfileScreen;
const styles = StyleSheet.create({
  dropdownButtonStyle: {
    borderWidth: 1,
    width: '100%',
    borderColor: colors.inputBorder,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    height: moderateScale(70),
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingLeft: '5%',
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: fontSize.Eighteen,
    // fontWeight: '',
    // color: '#151E26',
    color: colors.black,
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});
