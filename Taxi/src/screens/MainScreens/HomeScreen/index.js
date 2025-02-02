import {FlatList, Pressable, View} from 'react-native';
import MapScreen from '../../../components/MapScreen';
import {colors} from '../../../constants/colors';
import {BottomSheetWrapperComponent} from '../../../components/BottumSheet';
import {moderateScale} from '../../../utils/Scalling';
import CustomText from '../../../components/CustomText';
import fonts from '../../../constants/fonts';
import {fontSize} from '../../../constants/fontSize';
import {
  FriendsHouse,
  HomeAdress,
  Location2,
  Location3,
  Office,
  OfficeAddress,
  ParentHouse,
} from '../../../constants/svgIcons';
import {width} from '../../../constants/Dimentions';
import {useEffect, useState} from 'react';
import {
  getCoordsFromAddressName,
  getGeo,
} from '../../../utils/modals/getUserLocation';
import {useDispatch, useSelector} from 'react-redux';
import {setuserAddress, setUserCurrentRegoin} from '../../../redux/commonSlice';
import {Image} from 'react-native';
import { distance } from '../../../utils/modals/calculateFunction';
const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {savedAddress} = useSelector(state => state.user);
  const newAdress = [...data, ...savedAddress];
  const [region, setRegion] = useState({
    latitude: 0.0,
    longitude: 0.0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  useEffect(() => {
    getUserLocation();
  }, []);
  const getUserLocation = async (latitude1,longitude1) => {
    const {latitude, longitude} = await getGeo();
    setRegion(prev => ({...prev, latitude, longitude}));
    dispatch(
      setUserCurrentRegoin({
        latitude:latitude1??latitude,
        longitude:longitude1??latitude,
        longitudeDelta: 0.1,
        latitudeDelta: 0.1,
      }),
    );
    const address = await getCoordsFromAddressName(latitude, longitude);
    dispatch(setuserAddress(address));
  };
  const [selected, setSelected] = useState(0);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
        paddingBottom: moderateScale(130),
      }}>
      <MapScreen getGeo1={(latitude,longitude)=>{
        getUserLocation(latitude,longitude)
      }
      } region={region} iscall={true} isEnalble={false}>
        <View style={{height: '70%'}} />
        <View
          style={{
            height: moderateScale(600),
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: moderateScale(35),
            }}>
            <CustomText fontFamily={fonts.semi_bold}>Where to?</CustomText>
            <Pressable
              onPress={() => {
                navigation.navigate('ManageAddressScreen');
              }}>
              <CustomText color={colors.yellow} fontFamily={fonts.semi_bold}>
                Manage
              </CustomText>
            </Pressable>
          </View>
          <FlatList
            data={newAdress}
            keyExtractor={(_, index) => index.toString()}
            horizontal={true}
            renderItem={({item, index}) => {
              let Icon = item?.icon;
              const distancer=distance(
                region?.latitude,
                region?.longitude,
                item?.latitude,
                item?.longitude,
                'K',
              )
            
              return (
                <Pressable
                  onPress={() => {
                    setSelected(index);
                    if (index === 0) {
                      navigation.navigate('DestinationScreen');
                    } else {
                      navigation.navigate('DestinationScreen', {
                        address: item?.address,
                      });
                    }
                  }}
                  style={{
                    height: '45%',
                    width: width / 2 - moderateScale(25) * 2,
                    marginTop: moderateScale(40),
                    borderWidth: 1,
                    marginLeft: index == 0 ? 0 : moderateScale(25),
                    borderRadius: 15,
                    borderColor: colors.inputBorder,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor:
                      index == selected ? colors.yellow : colors.white,
                  }}>
                  {index == 0 ? (
                    <Icon />
                  ) : (
                    <Image
                      style={{
                        height: moderateScale(80),
                        width: moderateScale(80),
                      }}
                      source={
                        item?.addressType == 'Parent’s House'
                          ? ParentHouse
                          : item?.addressType == 'Friend’s House'
                          ? FriendsHouse
                          : item?.addressType == 'Home'
                          ? HomeAdress
                          : OfficeAddress
                      }
                    />
                  )}
                  <CustomText fontFamily={fonts.semi_bold} mTop={4}>
                    {index == 0 ? item?.title : item?.addressType}
                  </CustomText>
                  <CustomText
                    size={fontSize.Twelve}
                    color={colors.grey}
                    fontFamily={fonts.semi_bold}
                    mTop={-4}>
                    {index==0?item?.desc :`${parseFloat(distancer).toFixed(0) } KM away`}
                  </CustomText>
                </Pressable>
              );
            }}
          />
        </View>
      </MapScreen>
    </View>
  );
};
export default HomeScreen;
const data = [
  {
    id: '1',
    icon: Location3,
    title: 'Destination',
    desc: 'Enter Destination',
  },
];
