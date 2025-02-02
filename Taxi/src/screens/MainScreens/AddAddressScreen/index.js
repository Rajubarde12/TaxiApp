import {FlatList, Pressable, TextInput, View} from 'react-native';
import MapScreen from '../../../components/MapScreen';
import {colors} from '../../../constants/colors';
import {moderateScale} from 'react-native-size-matters';
import CustomText from '../../../components/CustomText';
import fonts from '../../../constants/fonts';
import {fontSize} from '../../../constants/fontSize';
import {width} from '../../../constants/Dimentions';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Input from '../../../components/AuthInput';
import {GOOGLE_API_KEY} from '../../../constants/ApiKeys';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DATABASE} from '../../../utils/DATABASE';
import {apiService} from '../../../redux/ApiRequest';
import Toast from 'react-native-simple-toast';
import {MAIN_URL} from '../../../constants';
import {getSavedAddress} from '../../../redux/userSlice';
import Loader from '../../../components/Loader';
const AddAddressScreen = ({route, navigation}) => {
  const {currentRegoin} = useSelector(state => state.common);
  const [completAdress, setCompleteAdress] = useState('');
  const screen = route?.params?.screen;
  const items = route?.params?.item;
  const isEdit = route?.params?.isEdit;
  const [floor, setFloor] = useState('');

  useEffect(() => {
    setFloor(items?.floor);
    setLandMark(items?.landmark ?? '');
    setCompleteAdress(items?.address ?? ''),
      setSelectedAdress({title: items?.addressType ?? ''});
  }, [items]);
  const [landmark, setLandMark] = useState('');
  const [selectedAdress, setSelectedAdress] = useState({
    title: 'Home',
    id: '1',
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const fetchPlaces = async () => {
    const token = await AsyncStorage.getItem(DATABASE.token);

    const apiKey = GOOGLE_API_KEY;
    const address = `${completAdress}, ${floor}, ${landmark}`;

    try {
      setLoading(true);
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address,
        )}&key=${apiKey}`,
      );
      const json = await response.json();

      if (json.status === 'OK') {
        const location = json?.results[0]?.geometry?.location;
        const adrees = json?.results[0]?.formatted_address;

        const data = {
          type: 'Pickup',
          address: adrees,
          latitude: location?.lat,
          longitude: location?.lng,
          addressType: selectedAdress?.title,
          floor: floor,
          landmark: landmark,
        };
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: isEdit
            ? `${MAIN_URL}/user/edit-address/${items['_id']}`
            : `${MAIN_URL}/user/add-address`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          data: JSON.stringify(data),
        };

        const response = await axios.request(config);
        if (response.data.status == 200) {
          if (screen == 'DestinationScreen') {
            navigation.navigate('DestinationScreen', {
              address: address,
            });
          } else {
            navigation.goBack();
          }
          setLoading(false);
          dispatch(getSavedAddress());
          Toast.show(isEdit ? 'Adress Update' : 'adress added');
        }
      } else {
        Toast.show('Unable to fetch location. Please check the address.');
        setLoading(fonts);
      }
    } catch (error) {
      console.error('Error fetching location:', error);
      Toast.show('Something went wrong with address ');
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>
      <Loader loading={loading} />
      <MapScreen
        region={currentRegoin}
        regionz
        notSHow={true}
        onRegoin={region => {
          console.log(region);
        }}>
        <Header map={true} title={isEdit ? 'Edit Addresss' : 'Add Address'} />

        <View
          style={{
            height: moderateScale(500),
            bottom: 0,
            backgroundColor: colors.white,
            // position: 'absolute',
            paddingHorizontal: moderateScale(20),
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
          }}>
          <CustomText
            size={fontSize.Eighteen}
            fontFamily={fonts.medium}
            mTop={moderateScale(7)}>
            Save Address As
          </CustomText>
          <View>
            <FlatList
              data={addressType}
              horizontal={true}
              contentContainerStyle={{
                paddingHorizontal: moderateScale(0),
                marginTop: moderateScale(20),
              }}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <Pressable
                    onPress={() => {
                      setSelectedAdress(item);
                    }}
                    style={{
                      paddingHorizontal: 15,
                      marginLeft: index == 0 ? 0 : 10,
                      paddingVertical: 6,
                      backgroundColor:
                        selectedAdress?.title == item?.title
                          ? colors.yellow
                          : colors.white,
                      borderRadius: 20,
                    }}>
                    <CustomText>{item.title}</CustomText>
                  </Pressable>
                );
              }}
            />
          </View>
          <>
            <CustomText
              size={fontSize.Eighteen}
              fontFamily={fonts.semi_bold}
              mTop={moderateScale(30)}>
              Complete Address
            </CustomText>
            <View
              style={{
                height: moderateScale(100),
                borderWidth: 1,
                marginTop: moderateScale(5),
                borderColor: colors.inputBorder,
                borderRadius: moderateScale(10),
                paddingHorizontal: '3%',
              }}>
              <TextInput
                value={completAdress}
                onChangeText={input => {
                  setCompleteAdress(input);
                }}
                style={{fontFamily: fonts.medium, color: colors.black}}
                multiline
                placeholder="Enter Your Adress"
                placeholderTextColor={colors.grey}
              />
            </View>
          </>
          <View style={{height: moderateScale(15)}} />
          <Input
            value={floor}
            onChangeText={input => {
              setFloor(input);
            }}
            placeholder={'Floor'}
            lable={'Floor'}
          />
          <View style={{height: moderateScale(15)}} />
          <Input
            value={landmark}
            onChangeText={input => {
              setLandMark(input);
            }}
            placeholder={'Landmark'}
            lable={'Landmark'}
          />
          <View
            style={{
              position: 'absolute',
              bottom: moderateScale(20),
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Button
              onPress={() => {
                // navigation.navigate('DestinationScreen');
                fetchPlaces(floor + ',' + landmark + ',' + completAdress);
              }}
              title={'Confirm Location'}
            />
          </View>
        </View>
      </MapScreen>
    </View>
  );
};
export default AddAddressScreen;
const addressType = [
  {
    title: 'Home',
    id: '1',
  },
  {
    title: 'Office',
    id: '2',
  },
  {
    title: 'Parent’s House',
    id: '3',
  },
  {
    title: 'Friend’s House',
    id: '4',
  },
];
