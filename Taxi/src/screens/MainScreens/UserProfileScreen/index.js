import {
  Alert,
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  ToastAndroid,
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
import {useDispatch, useSelector} from 'react-redux';
import CustomText from '../../../components/CustomText';
import {fontSize} from '../../../constants/fontSize';
import fonts from '../../../constants/fonts';
import {width} from '../../../constants/Dimentions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DATABASE} from '../../../utils/DATABASE';
import Input from '../../../components/AuthInput';
import {useEffect, useState} from 'react';
import {keyboartype} from '../../../utils/modals/auth';
import ImagePicker from 'react-native-image-crop-picker';
import {requestPermissions} from '../../../utils/modals/reguestMediaPremission';
import axios from 'axios';
import {MAIN_URL} from '../../../constants';
import Toast from 'react-native-simple-toast';
import Button from '../../../components/Button';
import {getUserProfile} from '../../../redux/userSlice';

const UserProfileScreen = ({navigation}) => {
  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [image, setImage] = useState({name: '', type: '', uri: ''});
  const pickImage = async () => {
    // handleProfileUpdate();
    // return;

    ImagePicker.openPicker({
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
        handleProfilePhoto({
          name: image.filename || 'photo.jpg', // Default name for camera captures
          type: image.mime,
          uri: image.path,
        });
      })
      .catch(err => {
        console.error('Error picking image:', err);
      });
  };
  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setImage({
          name: image.filename || 'photo.jpg', // Default name for camera captures
          type: image.mime,
          uri: image.path,
        });
        handleProfilePhoto({
          name: image.filename || 'photo.jpg', // Default name for camera captures
          type: image.mime,
          uri: image.path,
        });
      })
      .catch(err => {
        console.error('Error capturing image:', err);
      });
  };

  useEffect(() => {
    setInputs(prev => {
      return {
        ...prev,
        name: user?.name ?? '',
        phone: user?.mobileNumber ?? '',
        email: user?.email ?? '',
      };
    });
  }, []);
  const [countryCode, setCountryCode] = useState('91');
  const [error, setError] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleError = (key, err = '') => {
    setError(prev => ({...prev, [key]: err}));
  };

  const handleInputs = (key, input) => {
    setInputs(prev => ({...prev, [key]: input}));
    validateField(key, input);
  };

  const validateField = (key, value) => {
    switch (key) {
      case 'name':
        handleError(
          key,
          value.length < 3 ? 'Name must be at least 3 characters' : '',
        );
        break;
      case 'email':
        handleError(
          key,
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Enter a valid email',
        );
        break;

      case 'phone':
        handleError(
          key,
          /^[0-9]{10}$/.test(value)
            ? ''
            : 'Enter a valid 10-digit phone number',
        );
        break;
      default:
        break;
    }
  };
  const [modalVisible, setModalVisible] = useState(false);
  const handleProfilePhoto = async (image, data1) => {
    try {
      // Fetch the token from AsyncStorage
      const token = await AsyncStorage.getItem(DATABASE.token);
      console.log(token);

      if (!token) {
        Alert.alert('Error', 'Authentication token is missing.');
        return;
      }

      // Prepare FormData
      const data = new FormData();

      data.append('profileImage', {
        uri: image?.uri, // URI of the selected image
        name: image?.name || 'profile.jpg', // File name (optional)
        type: image?.type || 'image/jpeg', // MIME type
      });

      const config = {
        method: 'post',
        url: `${MAIN_URL}/user/update-profile`,
        headers: {
          Authorization: `Bearer ${token}`,
          contentType: 'multipart/form-data',
          language: 'hindi',
        },
        data: JSON.stringify(image ? data : data1),
      };

      const response = await axios.request(config);
      if (response.data.status == 200) {
        if (!image) {
          navigation.goBack();
          dispatch(getUserProfile());
        }
        Toast.show(image ? 'Profile image uplaoded' : 'Profile updated');
      } else {
        Toast.show('Something went wrong');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Toast.show('Something went wrong');
    }
  };
  const handleSubmit = () => {
    let valid = true;
    Object.keys(inputs).forEach(key => {
      validateField(key, inputs[key]);
      if (inputs[key] === '' || error[key]) {
        valid = false;
      }
    });
    if (valid) {
      let data = new FormData();
      data.append('name', inputs.name);
      data.append('email', inputs.email);
      data.append('mobileNumber', inputs.mobileNumber);
      data.append('countryCode', countryCode);
      handleProfilePhoto(null, data);
    }
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
              uri:
                image?.uri != ''
                  ? image.uri
                  : 'https://png.pngtree.com/background/20230612/original/pngtree-beautiful-cute-girl-wearing-makeup-staring-at-the-camera-picture-image_3186471.jpg',
            }}
          />
          <Pressable
            onPress={() => {
              // pickImage();
              setModalVisible(true);
            }}
            style={{
              right: 0,
              padding: 5,
              zIndex: 1,
              bottom: -13,
              position: 'absolute',
            }}>
            <Pencille height={30} width={30} />
          </Pressable>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: moderateScale(20),
          paddingHorizontal: moderateScale(15),
        }}>
        <View height={moderateScale(40)} />
        <Input
          value={inputs.name}
          error={error.name}
          onChangeText={input => {
            handleInputs('name', input);
          }}
          lable={'Name'}
          placeholder={'Name'}
        />
        <View height={moderateScale(20)} />
        <Input
          onCrountryCode={cod1 => {
            setCountryCode(cod1);
          }}
          value={inputs.phone}
          isMobile={true}
          error={error.phone}
          keyboardType={keyboartype.number_pad}
          onChangeText={input => {
            handleInputs('phone', input);
          }}
          lable={'Phone Number'}
          placeholder={'Phone Number'}
        />
        <View height={moderateScale(20)} />
        <Input
          keyboardType={keyboartype.email_address}
          //   isMobile={true}
          lable={'Email'}
          value={inputs.email}
          error={error.email}
          onChangeText={input => {
            handleInputs('email', input);
          }}
          placeholder={'Email'}
        />
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
                  // tintColor={colors.white}
                  style={{
                    // backgroundColor: colors.yellow,
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
      </ScrollView>
      <View
        style={{
          bottom: 0,
          backgroundColor: colors.white,
          // position: 'absolute',
          paddingHorizontal: moderateScale(25),
          backgroundColor: 'white',
          shadowColor: '#000',
          height: moderateScale(120),
          width: '100%',
          shadowOffset: {width: 0, height: -2},
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 10,
          overflow: 'hidden',
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Button
          onPress={() => {
            handleSubmit();
          }}
          title={'Update Profile'}
        />
      </View>
    </View>
  );
};
export default UserProfileScreen;
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
