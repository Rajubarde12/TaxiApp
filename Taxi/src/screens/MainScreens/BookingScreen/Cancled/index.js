import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {moderateScale} from '../../../../utils/Scalling';
import {colors} from '../../../../constants/colors';
import CustomText from '../../../../components/CustomText';
import {fontSize} from '../../../../constants/fontSize';
import fonts from '../../../../constants/fonts';
import {
  LocationInput,
  LocationLogo,
  RadioBalck,
  StarFilled,
  Wallet,
  Watch,
} from '../../../../constants/svgIcons';

const Cancelled = () => {
  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <FlatList
        data={[1, 2, 3]}
        contentContainerStyle={{paddingBottom: moderateScale(200)}}
        renderItem={({item, index}) => (
          <View
            style={{
              marginTop: moderateScale(index == 0 ? 20 : 5),
              // height: '30%',
              paddingHorizontal: moderateScale(20),
              paddingTop: moderateScale(20),
              borderRadius: moderateScale(20),
              borderWidth: 2,
              borderColor: colors.inputBorder,
              paddingBottom: 10,
            }}>
            <View
              style={{
                marginBottom: 10,
                paddingVertical: 10,
                backgroundColor: 'rgba(254, 203, 0,0.2)',
                width: '45%',
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CustomText
                fontFamily={fonts.semi_bold}
                size={fontSize.Fourteen}
                color={colors.yellow}>
                Cancled By Driver
              </CustomText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                // justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: moderateScale(80),
                  width: moderateScale(80),
                  // borderWidth: 1,
                  borderRadius: moderateScale(40),
                  backgroundColor: colors.yellow,
                }}
              />
              <View style={{marginLeft: '2%'}}>
                <CustomText fontFamily={fonts.semi_bold}>
                  Jenny Wilson
                </CustomText>
                <CustomText color={colors.grey} size={fontSize.Thirteen}>
                  Sedan (4 Seater)
                </CustomText>
              </View>
              <View
                style={{
                  position: 'absolute',
                  right: 0,
                  flexDirection: 'row',
                }}>
                <StarFilled />
                <CustomText
                  style={{marginLeft: 4}}
                  color={colors.grey}
                  size={fontSize.Thirteen}>
                  5.0
                </CustomText>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: moderateScale(30),
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row'}}>
                <LocationLogo height={25} width={25} />
                <CustomText style={{marginLeft: 5}}>4.5 Mile</CustomText>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Watch height={22} width={22} />
                <CustomText style={{marginLeft: 5}}>4 Mins</CustomText>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Wallet height={25} width={25} />
                <CustomText style={{marginLeft: 5}}>
                  $1.5
                  <Text
                    style={{fontSize: fontSize.Thirteen, color: colors.grey}}>
                    /mile
                  </Text>
                </CustomText>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: moderateScale(30),
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <CustomText color={colors.grey} size={fontSize.Fifteen}>
                Date & Time
              </CustomText>
              <CustomText color={colors.grey} size={fontSize.Fifteen}>
                Oct 18,2023 | 08:00 AM
              </CustomText>
            </View>

            <View style={styles.container}>
              <View style={styles.rowContainer}>
                <RadioBalck height={18} width={18} />
                <CustomText
                  size={fontSize.Sixteen}
                  style={{marginLeft: 10}}
                  lines={1}>
                  {'timvvbmmvvvmmvmvbnfnkbfdknbfdfdn'}
                </CustomText>
              </View>

              <View style={styles.separator}></View>
              <Pressable disabled style={styles.autoPlaceContainer}>
                <LocationInput color={null} height={20} width={20} />
                <CustomText
                  lines={1}
                  style={{width: '76%', marginLeft: '2%', marginRight: '0%'}}>
                  {'tktlflflflfllgglgllggll'}
                </CustomText>
              </Pressable>
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: moderateScale(20),
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <CustomText color={colors.grey} size={fontSize.Fifteen}>
                Car Number
              </CustomText>
              <CustomText color={colors.grey} size={fontSize.Fifteen}>
                RHT-TNJVVNB
              </CustomText>
            </View>
          </View>
        )}
      />
    </View>
  );
};
export default Cancelled;
const styles = StyleSheet.create({
  container: {
    // backgroundColor: colors.white,
    marginTop: '8%',
    // borderWidth: 1,
    paddingHorizontal: '2%',
    width: '95%',
    // elevation: 5,
    // paddingVertical: 20,
    // borderRadius: moderateScale(10),
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
    width: '100%',
    alignSelf: 'center',
  },
  separator: {
    borderBottomWidth: 1.5,
    borderColor: colors.inputBorder,
    marginBottom: 10,
    width: '100%',
    // marginLeft: '14%',
    marginTop: 10,
    height: '5%',
    // paddingBottom: '5%',
  },
  autoPlaceContainer: {
    height: moderateScale(70),
    width: '100%',
    alignSelf: 'center',
    // marginTop: -10,
    // backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 10,
    // borderWidth: 2,
    borderColor: colors.inputBorder,
  },
});
