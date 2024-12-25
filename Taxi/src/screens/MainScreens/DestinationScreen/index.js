import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../../constants/colors';
import Header from '../../../components/Header';
import {moderateScale} from '../../../utils/Scalling';
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
import {setDestinationAdress} from '../../../redux/commonSlice';

const DestinationScreen = ({navigation}) => {
  const [query, setQuery] = useState('');
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [distainationlatlong, setDestinationLatelong] = useState({
    latitude: 0.0,
    longitude: 0.0,
  });

  const fetchPlaces = async text => {
    const apiKey = 'AIzaSyDbxbcNuOlVTolfigYexsDVfyHNrpeQ_eI';
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const json = await response.json();

      if (json.status === 'OK') {
        setPlaces(json.predictions);
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
    const apiKey = 'AIzaSyDbxbcNuOlVTolfigYexsDVfyHNrpeQ_eI';
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const json = await response.json();

      if (json.status === 'OK') {
        const {formatted_address, geometry} = json.result;
        const {location} = geometry;
        const {lat: latitude, lng: longitude} = location;
        setDestinationLatelong({
          latitude,
          longitude,
        });
        dispatch(
          setDestinationAdress({
            regoin: {
              latitude,
              longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            },
            dest: formatted_address,
          }),
        );

        setQuery(formatted_address);
        // setSelectedPlace(formatted_address);
        setPlaces([]); // Hide list after selection
      }
    } catch (error) {
      console.error('Place Details API Error:', error);
    }
  };

  const {userAddress} = useSelector(state => state.common);

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <Header title={'Destination'} />
      <View style={styles.container}>
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
      <View
        style={[
          styles.container,
          {
            marginTop: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: moderateScale(18),
            paddingHorizontal: moderateScale(18),
            paddingVertical: moderateScale(15),
          },
        ]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Save />
          <CustomText style={{marginLeft: 10}}>Saved Places</CustomText>
        </View>
        <ArrowLeft height={14} width={14} />
      </View>

      {places.length > 0 && (
        <View
          style={[styles.container, {paddingHorizontal: moderateScale(25)}]}>
          <FlatList
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
      )}
      <View
        style={{
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
        }}>
        <Button
          onPress={() => {
            navigation.navigate('BookRideScreen');
          }}
          title={'Confirm Location'}
        />
      </View>
    </View>
  );
};

export default DestinationScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginHorizontal: moderateScale(25),
    elevation: 3,
    // borderWidth: 1,
    // borderColor: colors.inputBorder,
    borderRadius: moderateScale(10),
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
  listView: {
    backgroundColor: 'white',
  },
  placeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: moderateScale(10),
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
