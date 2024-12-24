import {
  Alert,
  StyleSheet,
  View,
  PermissionsAndroid,
  Platform,
  Pressable,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {useEffect, useState} from 'react';
import {LiveLocation, LocationMap} from '../constants/svgIcons';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import GooglePlacesInput from './GooglePlaceInput';
import TouchableInput from './TouchableCompoent';
import {useNavigation} from '@react-navigation/native';

export default ({children, isEnalble, onRegoin}) => {
  const navigation = useNavigation();
  const [region, setRegion] = useState(null);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]);

      // Check if both permissions are granted
      return (
        granted['android.permission.ACCESS_FINE_LOCATION'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.ACCESS_COARSE_LOCATION'] ===
          PermissionsAndroid.RESULTS.GRANTED
      );
    }
    return true;
  };
  const [userAddress, setUserAddress] = useState();
  const handlePlaceSelect = (data, details) => {
    const {lat, lng} = details.geometry.location;

    setRegion({
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.01, // Adjust zoom level as needed
      longitudeDelta: 0.01,
    });
    if (onRegoin) {
      onRegoin({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.01, // Adjust zoom level as needed
        longitudeDelta: 0.01,
      });
    }
  };
  const getGeo = () => {
    const whati = Geolocation.getCurrentPosition(
      re => {
        const {latitude, longitude} = re?.coords;
        getCoordsFromAddressName(latitude, longitude);
        console.log('called');

        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
        if (onRegoin) {
          onRegoin({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.01, // Adjust zoom level as needed
            longitudeDelta: 0.01,
          });
        }
      },
      err => {
        console.log(err);
      },
      {enableHighAccuracy: true, timeout: 500, interval: 500},
    );
  };

  useEffect(() => {
    const whati = Geolocation.getCurrentPosition(
      re => {
        const {latitude, longitude} = re?.coords;
        getCoordsFromAddressName(latitude, longitude);
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
        if (onRegoin) {
          onRegoin({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.01, // Adjust zoom level as needed
            longitudeDelta: 0.01,
          });
        }
      },
      err => {
        console.log(err);
      },
      {enableHighAccuracy: true, timeout: 500, interval: 500},
    );
    return () => {
      Geolocation.clearWatch(whati);
    };
  }, []);
  const getCoordsFromAddressName = (latitude, longitude) => {
    fetch(
      'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        latitude +
        ',' +
        longitude +
        '&key=' +
        'AIzaSyDbxbcNuOlVTolfigYexsDVfyHNrpeQ_eI',
    )
      .then(response => response.json())
      .then(responseJson => {
        setUserAddress(responseJson.results[0].formatted_address);
      });
  };
  console.log(userAddress);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          getGeo();
        }}
        style={{zIndex: 5, position: 'absolute', bottom: '13%', right: 0}}>
        <LiveLocation />
      </Pressable>
      {!isEnalble ? (
        <TouchableInput
          onPress={() => {
            navigation.navigate('PickupScreen');
          }}
          placeholder={userAddress}
          handlePlaceSelect={handlePlaceSelect}
        />
      ) : (
        <GooglePlacesInput
          onPress={() => {
            navigation.navigate('PickupScreen', {address: userAddress, region});
          }}
          placeholder={userAddress?.substring(0, 35)}
          handlePlaceSelect={handlePlaceSelect}
        />
      )}
      <MapView
        region={region}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation={false}>
        {region && (
          <Marker
            coordinate={region}
            title="Your Location"
            description="This is where you are currently located.">
            <LocationMap />
          </Marker>
        )}
      </MapView>

      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    position: 'absolute',
    zIndex: 0,
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    flex: 1,
  },
  textInputContainer: {
    width: '100%',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  textInput: {
    height: 40,
    fontSize: 16,
    color: '#333',
  },
});
