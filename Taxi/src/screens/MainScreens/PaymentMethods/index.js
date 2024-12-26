import {StyleSheet, View} from 'react-native';
import {colors} from '../../../constants/colors';
import Header from '../../../components/Header';
import {
  ArrowLeft,
  Cart,
  Cash,
  Points,
  RadioBalck,
  RadioUnifll,
  RadioYellow,
  Wallet,
} from '../../../constants/svgIcons';
import CustomText from '../../../components/CustomText';
import {moderateScale} from '../../../utils/Scalling';
import {fontSize} from '../../../constants/fontSize';
import fonts from '../../../constants/fonts';
import Button from '../../../components/Button';
import {width} from '../../../constants/Dimentions';

const PaymentMethod = () => {
  const RenderTabs = ({name, title1, Icon = () => <></>}) => {
    return (
      <>
        <View style={{marginLeft: '4%'}}>
          <CustomText fontFamily={fonts.semi_bold} size={fontSize.Eighteen}>
            {title1 ?? name}
          </CustomText>
        </View>
        <View
          style={[
            styles.container,
            {
              marginTop: 3,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: moderateScale(18),
              paddaingHorizontal: moderateScale(18),
              paddingVertical: moderateScale(15),
              alignSelf: 'center',
            },
          ]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon />
            <CustomText style={{marginLeft: 10}}>{name}</CustomText>
          </View>
          {name == 'Cash' ? (
            <RadioYellow height={18} width={18} />
          ) : (
            <RadioUnifll height={18} width={18} />
          )}
        </View>
      </>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <Header />
      <View style={{height: '4%'}} />
      <RenderTabs name={'Cash'} Icon={Cash} />
      <View style={{height: '2%'}} />
      <RenderTabs name={'Loyalty Points'} Icon={Points} />
      <View style={{height: '2%'}} />
      <RenderTabs name={'Wallet'} Icon={Wallet} />
      <View style={{height: '2%'}} />
      <RenderTabs title1={'Credit & Debit Card'} name={'Cart'} Icon={Cart} />
      <View style={styles.modalContainer}>
        <Button
          onPress={() => {
            navigation.navigate('SearchingRide');
          }}
          title={`Book Mini`}
        />
      </View>
    </View>
  );
};
export default PaymentMethod;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    // marginTop: '8%',
    // borderWidth: 1,
    paddingHorizontal: '5%',
    width: '93%',
    elevation: 5,
    paddingVertical: 20,
    borderRadius: moderateScale(10),
  },
  modalContainer: {
    height: moderateScale(150),
    bottom: 0,
    backgroundColor: colors.white,
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});
