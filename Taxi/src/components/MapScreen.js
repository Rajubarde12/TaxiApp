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
import {LiveLocation, LocationLogo, LocationMap} from '../constants/svgIcons';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import GooglePlacesInput from './GooglePlaceInput';
import TouchableInput from './TouchableCompoent';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setuserAddress, setUserCurrentRegoin} from '../redux/commonSlice';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_APIKEY} from '../constants/ApiKeys';

export default ({
  children,
  isEnalble,
  onRegoin,
  notSHow,
  isIcon,
  directions,
  iscall,
  setRegion,
  region,
  handlePlaceSelect,
  getGeo,
  isData,
}) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const {destinationRegoin, userAddress, currentRegoin} = useSelector(
    state => state.common,
  );

  return (
    <View style={styles.container}>
      {isIcon && (
        <Pressable
          onPress={() => {
            getGeo();
          }}
          style={{zIndex: 5, position: 'absolute', bottom: '13%', right: 0}}>
          <LiveLocation />
        </Pressable>
      )}
      {notSHow ? null : !isEnalble ? (
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
        region={currentRegoin}
        // provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation={false}>
        {region && (
          <Marker
            coordinate={currentRegoin}
            title="Your Location"
            description="This is where you are currently located.">
            <LocationMap />
          </Marker>
        )}
        {isData?.map((item, index) => {
          console.log(item?.latitude, item?.longitude);

          return (
            <Marker
              key={index.toString()}
              coordinate={{
                latitude: item?.latitude,
                longitude: item?.longitude,
              }}>
              <LocationLogo />
            </Marker>
          );
        })}
        {/* {directions ? (
          <MapViewDirections
            origin={currentRegoin}
            waypoints={[currentRegoin, destinationRegoin]}
            destination={destinationRegoin}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="blue"
            optimizeWaypoints={true}
            onStart={params => {
              console.log(
                `Started routing between "${params.origin}" and "${params.destination}"`,
              );
            }}
            onReady={result => {
              console.log(`Distance: ${result.distance} km`);
              console.log(`Duration: ${result.duration} min.`);
            }}
            onError={errorMessage => console.error('Error:', errorMessage)}
          />
        ) : null} */}
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
