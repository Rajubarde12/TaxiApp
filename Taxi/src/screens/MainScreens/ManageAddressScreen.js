import {FlatList, Pressable, TouchableOpacity, View} from 'react-native';
import {colors} from '../../constants/colors';
import Header from '../../components/Header';
import {height, width} from '../../constants/Dimentions';
import {moderateScale} from 'react-native-size-matters';
import {Location2, LocationAddress} from '../../constants/svgIcons';
import CustomText from '../../components/CustomText';
import {fontSize} from '../../constants/fontSize';
import fonts from '../../constants/fonts';
import {LocalTile} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import {setSelectedAddressFromList} from '../../redux/commonSlice';

const ManageAddressScreen = ({navigation, route}) => {
  const screen = route?.params?.screen;
  const {savedAddress} = useSelector(state => state.user);
  const dispatch = useDispatch();

  return (
    <View style={{flex: 1, backgroundColor: colors.white, paddingBottom: 20}}>
      <Header map={true} title={'Manage Address'} />
      <View style={{flex: savedAddress?.length > 8 ? 1 : null}}>
        <FlatList
          data={savedAddress}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{
            width: width,
            paddingHorizontal: moderateScale(20),
          }}
          renderItem={({item, index}) => {
            return (
              <Pressable
                onPress={() => {
                  dispatch(setSelectedAddressFromList(item));
                  if (screen == 'DestinationScreen') {
                    navigation.goBack();
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
                  // alignItems: 'center',
                  // justifyContent: 'space-between',
                }}>
                <LocationAddress Height={23} width={23} />
                <View style={{marginLeft: moderateScale(15)}}>
                  <CustomText
                    size={fontSize.Eighteen}
                    fontFamily={fonts.semi_bold}>
                    {item?.addressType}
                  </CustomText>
                  <CustomText
                    color={colors.grey}
                    mTop={moderateScale(5)}
                    size={fontSize.Fourteen}
                    fontFamily={fonts.medium}>
                    {item?.address}
                  </CustomText>
                </View>
              </Pressable>
            );
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AddAddressScreen');
        }}
        style={{
          marginHorizontal: moderateScale(20),
          borderWidth: 1.5,
          borderColor: colors.yellow,
          marginTop: moderateScale(30),
          height: moderateScale(48),
          borderRadius: moderateScale(5),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <CustomText
          color={colors.yellow}
          size={fontSize.Eighteen}
          fontFamily={fonts.semi_bold}>
          {'+ Add Address'}
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};
export default ManageAddressScreen;
const data = [
  {
    title: 'Home',
    address: '1901 Thoridgr Cir. Shiloh, Hawali 81063',
  },
  {
    title: 'Office',
    address: '4517 Washington Ave. MAnchester, Kentucky 39495',
  },
  {
    title: 'Parent’s House',
    address: '8502 Preston Rd. Inglewood, Maine 98380',
  },
  {
    title: 'Friend’s House',
    address: '2464 Royak Ln. Mesa, New Jersey 45463',
  },
];
