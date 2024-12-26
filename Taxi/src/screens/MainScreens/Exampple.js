import React, {useState, useRef, useEffect} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_APIKEY} from '../../constants/ApiKeys';
import {useSelector} from 'react-redux';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapViewWithDirections = () => {
  const {currentRegoin, destinationRegoin} = useSelector(state => state.common);
  console.log(currentRegoin);
  const LATITUDE = currentRegoin?.latitude;
  const LONGITUDE = currentRegoin?.longitude;
  const [coordinates, setCoordinates] = useState([
    {
      latitude: 37.3317876,
      longitude: -122.0054812,
    },
    {
      latitude: 37.771707,
      longitude: -122.4053769,
    },
  ]);
  const mapViewRef = useRef(null);
  useEffect(() => {
    setCoordinates([
      {latitude: currentRegoin?.latitude, longitude: currentRegoin.longitude},
      {
        latitude: destinationRegoin?.latitude,
        longitude: destinationRegoin.longitude,
      },
    ]);
  }, [destinationRegoin, currentRegoin]);

  const handleMapPress = e => {
    setCoordinates([...coordinates, e.nativeEvent.coordinate]);
  };

  useEffect(() => {
    if (coordinates.length >= 2) {
      mapViewRef.current?.fitToCoordinates(coordinates, {
        edgePadding: {
          right: width / 20,
          bottom: height / 20,
          left: width / 20,
          top: height / 20,
        },
      });
    }
  }, [coordinates]);

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        style={styles.map}
        region={destinationRegoin}
        ref={mapViewRef}
        onPress={handleMapPress}>
        {coordinates.map((coordinate, index) => (
          <Marker key={`coordinate_${index}`} coordinate={coordinate} />
        ))}
        {/* {coordinates.length >= 2 && (
          <MapViewDirections
            origin={coordinates[0]}
            waypoints={
              coordinates.length > 2 ? coordinates.slice(1, -1) : undefined
            }
            destination={coordinates[coordinates.length - 1]}
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
        )} */}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default MapViewWithDirections;
