import {FlatList, Pressable, StyleSheet, TextInput, View} from 'react-native';
import MapScreen from '../../../components/MapScreen';
import {colors} from '../../../constants/colors';
import {BottomSheetWrapperComponent} from '../../../components/BottumSheet';
import {moderateScale} from '../../../utils/Scalling';
import CustomText from '../../../components/CustomText';
import fonts from '../../../constants/fonts';
import {fontSize} from '../../../constants/fontSize';
import {
  LiveLocation,
  Location2,
  LocationInput,
  Office,
  Plush,
  RadioBalck,
  Saved1,
} from '../../../constants/svgIcons';
import {width} from '../../../constants/Dimentions';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import {useState} from 'react';
const BookRideScreen = ({route, navigation}) => {
  const {region, address} = route?.params || {};
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>
      <MapScreen
        notSHow
        isEnalble={true}
        onRegoin={region => {
          console.log(region);
        }}
        placeholder={address}>
        <Header title={'Book Ride'} />
        <View
          style={[
            styles.modalContainer,
            {
              position: 'relative',
              marginTop: '10%',
              height: '100%',
              paddingBottom: moderateScale(150),
              justifyContent: 'flex-start',
              alignItems: 'center',
            },
          ]}>
          <View style={styles.container}>
            <View style={styles.rowContainer}>
              <RadioBalck height={18} width={18} />
              <CustomText
                size={fontSize.Sixteen}
                style={{marginLeft: 10}}
                lines={1}>
                {'userAddress'}
              </CustomText>
            </View>
            <View style={styles.separator} />
            <View style={styles.autoPlaceContainer}>
              <LocationInput height={20} width={20} />
              <TextInput
                value={''}
                editable={false}
                placeholder="Enter Destination"
                placeholderTextColor="#888"
                style={styles.input}
              />
              <Saved1 />
              <View style={{paddingHorizontal: 5}}>
                <CustomText
                  color={'lightgrey'}
                  size={fontSize.Sixteen}
                  fontFamily={fonts.medium}>
                  |
                </CustomText>
              </View>
              <Plush />
            </View>
          </View>
        </View>

        <View style={styles.modalContainer}>
          <Button
            onPress={() => {
              navigation.navigate('DestinationScreen');
            }}
            title={'Book Mini'}
          />
        </View>
      </MapScreen>
    </View>
  );
};
export default BookRideScreen;
const styles = StyleSheet.create({
  modalContainer: {
    height: moderateScale(150),
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
    position: 'absolute',
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: colors.white,
    // marginHorizontal: moderateScale(25),
    elevation: 3,
    borderRadius: moderateScale(10),
    // marginTop: '10%',
    overflow: 'hidden',
    paddingTop: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
    width: '100%',
    alignSelf: 'center',
  },
  separator: {
    height: 1.5,
    backgroundColor: colors.inputBorder,
    marginBottom: 10,
    width: '76%',
    marginLeft: '14%',
    marginTop: 10,
  },
  autoPlaceContainer: {
    height: moderateScale(70),
    width: '94%',
    alignSelf: 'center',
    marginTop: -10,
    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    // borderWidth: 2,
    borderColor: colors.inputBorder,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    // borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
});
