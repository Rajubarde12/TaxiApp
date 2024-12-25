import {FlatList, Pressable, View} from 'react-native';
import MapScreen from '../../../components/MapScreen';
import {colors} from '../../../constants/colors';
import {BottomSheetWrapperComponent} from '../../../components/BottumSheet';
import {moderateScale} from '../../../utils/Scalling';
import CustomText from '../../../components/CustomText';
import fonts from '../../../constants/fonts';
import {fontSize} from '../../../constants/fontSize';
import {Location2, Office} from '../../../constants/svgIcons';
import {width} from '../../../constants/Dimentions';
const HomeScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
        paddingBottom: moderateScale(130),
      }}>
      <MapScreen isEnalble={false}>
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
            <CustomText color={colors.yellow} fontFamily={fonts.semi_bold}>
              Manage
            </CustomText>
          </View>
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            horizontal={true}
            renderItem={({item, index}) => {
              let Icon = item?.icon;
              return (
                <Pressable
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
                    backgroundColor: index == 0 ? colors.yellow : colors.white,
                  }}>
                  <Icon />
                  <CustomText fontFamily={fonts.semi_bold} mTop={4}>
                    {item.title}
                  </CustomText>
                  <CustomText
                    size={fontSize.Twelve}
                    color={colors.grey}
                    fontFamily={fonts.semi_bold}
                    mTop={-4}>
                    {item.desc}
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
    icon: Location2,
    title: 'Destination',
    desc: 'Enter Destination',
  },
  {
    id: '2',
    icon: Office,
    title: 'Office',
    desc: '35 KM Away',
  },
];