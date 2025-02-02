import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
} from 'react-native';
import {colors} from '../../../constants/colors';
import Header from '../../../components/Header';
// import {moderateScale} from '../../../utils/Scalling';
import {moderateScale} from 'react-native-size-matters';
import CustomText from '../../../components/CustomText';
import {useDispatch, useSelector} from 'react-redux';
import {
  ArrowLeft,
  LocationInput,
  Plush,
  RadioBalck,
  Restart,
  Save,
  Saved1,
} from '../../../constants/svgIcons';
import {fontSize} from '../../../constants/fontSize';
import fonts from '../../../constants/fonts';
import Button from '../../../components/Button';
import {width} from '../../../constants/Dimentions';
import {
  setDestinationAdress,
  setDsetinationUserRegion,
} from '../../../redux/commonSlice';
import Toast from 'react-native-simple-toast';
import {GOOGLE_API_KEY} from '../../../constants/ApiKeys';

const DestinationScreen = ({navigation, route}) => {
  const [query, setQuery] = useState('');
  const [places, setPlaces] = useState([]);
  const address = route?.params?.address;

  const [distainationlatlong, setDestinationLatelong] = useState({
    latitude: 0.0,
    longitude: 0.0,
  });
  useEffect(() => {
    address ? fetchPlaces(address) : null;
  }, [address]);

  const fetchPlaces = async text => {
    const apiKey = GOOGLE_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const json = await response.json();

      if (json.status === 'OK') {
        if (address) {
          fetchPlaceDetails(json?.predictions[0]?.place_id);
        } else {
          setPlaces(json.predictions);
        }
      } else {
        setPlaces([]);
      }
    } catch (error) {
      console.error('API Error:', error);
      setPlaces([]);
    }
  };
  const dispatch = useDispatch();

  const fetchPlaceDetails = async placeId => {
    const apiKey = GOOGLE_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const json = await response.json();

      if (json.status === 'OK') {
        const {formatted_address, geometry} = json.result;
        const {location} = geometry;
        const {lat: latitude, lng: longitude} = location;
        console.log(latitude, latitude);

        setDestinationLatelong({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
        dispatch(
          setDestinationAdress({
            dest: formatted_address,
          }),
        );
        dispatch(
          setDsetinationUserRegion({
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }),
        ),
          setQuery(formatted_address);

        setPlaces([]); // Hide list after selection
      }
    } catch (error) {
      console.error('Place Details API Error:', error);
    }
  };

  const {userAddress} = useSelector(state => state.common);

  return (
    <View style={{flex: 1, backgroundColor: colors.Off_White}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}} style={{flexGrow: 1}}>
        <Header title={'Destination'} />
        <View style={[styles.container, {paddingVertical: 10}]}>
          <View style={styles.rowContainer}>
            <RadioBalck height={18} width={18} />
            <CustomText
              size={fontSize.Sixteen}
              style={{marginLeft: 10}}
              lines={1}>
              {userAddress}
            </CustomText>
          </View>
          <View style={styles.separator} />
          <View style={styles.autoPlaceContainer}>
            <LocationInput height={20} width={20} />
            <TextInput
              value={query}
              onChangeText={text => {
                setQuery(text);
                fetchPlaces(text);
              }}
              placeholder="Enter Destination"
              placeholderTextColor="#888"
              style={styles.input}
            />
            <Pressable
              onPress={() => {
                navigation.navigate('ManageAddressScreen', {
                  screen: 'DestinationScreen',
                });
              }}>
              <Saved1 />
            </Pressable>
            <View style={{paddingHorizontal: 5}}>
              <CustomText
                color={'lightgrey'}
                size={fontSize.Sixteen}
                fontFamily={fonts.medium}>
                |
              </CustomText>
            </View>
            <Pressable
              onPress={() => {
                navigation.navigate('PickupScreen', {
                  screen: 'DestinationScreen',
                });
              }}>
              <Plush />
            </Pressable>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ManageAddressScreen', {
              screen: 'DestinationScreen',
            });
          }}
          style={[
            styles.container,
            {
              marginTop: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: moderateScale(12),
              paddingHorizontal: moderateScale(10),
              paddingVertical: moderateScale(12),
            },
          ]}>
          <TouchableOpacity
            disabled
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Save />
            <CustomText style={{marginLeft: 10}}>Saved Places</CustomText>
          </TouchableOpacity>
          <ArrowLeft height={14} width={14} />
        </TouchableOpacity>

        {places.length > 0 && (
          <KeyboardAvoidingView>
            <View
              style={[
                styles.container,
                {paddingHorizontal: moderateScale(12)},
              ]}>
              <FlatList
                scrollEnabled={false}
                data={places}
                keyExtractor={item => item.place_id}
                renderItem={({item}) => (
                  <>
                    <TouchableOpacity
                      onPress={() => fetchPlaceDetails(item.place_id)}
                      style={styles.placeItem}>
                      <Restart />
                      <CustomText style={styles.placeText} lines={1}>
                        {item.description}
                      </CustomText>
                    </TouchableOpacity>
                    <View
                      style={[styles.separator, {width: '100%', marginLeft: 0}]}
                    />
                  </>
                )}
                style={styles.listView}
              />
            </View>
          </KeyboardAvoidingView>
        )}

        <View
          style={{
            height: moderateScale(100),
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
          }}>
          <Button
            onPress={() => {
              if (distainationlatlong?.latitude == 0.0) {
                Toast.show('Please Select Destination');
                return;
              }

              if (distainationlatlong?.latitude != 0.0) {
                navigation.navigate('BookRideScreen');
              }
            }}
            title={'Confirm Location'}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default DestinationScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginHorizontal: moderateScale(10),
    elevation: 3,
    // borderWidth: 1,
    // borderColor: colors.inputBorder,
    borderRadius: moderateScale(5),
    marginTop: '10%',
    overflow: 'hidden',
    paddingTop: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
    width: '87%',
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
    height: moderateScale(50),
    width: '94%',
    alignSelf: 'center',
    marginTop: -10,
    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderColor: colors.inputBorder,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: fontSize.Sixteen,
    color: colors.black,
    flex: 1,
    fontFamily: fonts.medium,
  },
  listView: {
    backgroundColor: 'white',
  },
  placeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: moderateScale(7),
  },
  placeText: {
    marginLeft: 10,
  },
  selectedPlaceContainer: {
    marginTop: 20,
    padding: 15,
  },
  selectedPlaceText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
