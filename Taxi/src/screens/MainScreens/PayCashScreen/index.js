import {Pressable, StyleSheet, View} from 'react-native';
import {colors} from '../../../constants/colors';
import Header from '../../../components/Header';
import {
  LocationInput,
  RadioBalck,
  WalleCashPaid,
} from '../../../constants/svgIcons';
import CustomText from '../../../components/CustomText';
import fonts from '../../../constants/fonts';
import {fontSize} from '../../../constants/fontSize';
import {moderateScale} from '../../../utils/Scalling';
import Button from '../../../components/Button';

const PayCashScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: colors.Off_White}}>
      <Header title={'Pay Cash'} />
      <View
        style={{
          alignItems: 'center',
          marginTop: '5%',
          paddingTop: '15%',
          elevation: 5,
          backgroundColor: colors.white,
          marginHorizontal: 20,
          borderRadius: 20,
          overflow: 'hidden',
        }}>
        <View style={{paddingHorizontal: 20, alignItems: 'center'}}>
          <WalleCashPaid />
          <CustomText
            size={fontSize.Eighteen}
            mTop={'3%'}
            fontFamily={fonts.bold}>
            Pay Cash
          </CustomText>

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
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 5,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  position: 'absolute',
                  zIndex: 1,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  backgroundColor: 'white',
                  borderRadius: 10,
                  elevation: 1,
                  alignSelf: 'flex-end',
                }}>
                <CustomText size={fontSize.Fourteen} color={colors.grey}>
                  OTP - {'1234'}
                </CustomText>
              </View>
              <View style={styles.separator}></View>
            </View>
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
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 1,
              paddingHorizontal: 10,
              paddingVertical: 5,
              backgroundColor: 'white',
              borderRadius: 10,
              elevation: 1,
              marginTop: '15%',
            }}>
            <CustomText size={fontSize.Fourteen} color={colors.grey}>
              OTP - {'1234'}
            </CustomText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'flex-start',
              marginTop: '10%',
            }}>
            <View
              style={{
                height: 60,
                width: 60,
                borderRadius: 40,
                backgroundColor: colors.yellow,
              }}></View>
            <View style={{marginLeft: '5%'}}>
              <CustomText>{'Rohan Sahu'}</CustomText>
              <CustomText color={colors.grey} size={fontSize.Fourteen}>
                {'Sedan'}
              </CustomText>
            </View>
          </View>
        </View>
        <View style={{marginTop: '30%'}} />
        <View
          style={{
            width: '100%',
            backgroundColor: colors.yellow,
            height: '10%',
            position: 'absolute',
            bottom: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}>
          <CustomText>Total Amount</CustomText>
          <CustomText>$50.5</CustomText>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          backgroundColor: colors.white,
          width: '100%',
          elevation: 5,
          height: '10%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Button title={'Cash Paid'} />
      </View>
    </View>
  );
};
export default PayCashScreen;
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
