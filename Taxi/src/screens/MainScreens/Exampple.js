import {View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useSelector} from 'react-redux';
import {DestinationIcon, LocationMap} from '../../constants/svgIcons';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_APIKEY} from '../../constants/ApiKeys';
import {useRef} from 'react';

const MapViewWithDirections = () => {
  const {userAddress, destinationAddress, currentRegoin, destinationRegoin} =
    useSelector(state => state.common);
  const _map = useRef(null);
  return (
    <View style={{flex: 1}}>
      <MapView
        ref={_map}
        apikey={GOOGLE_MAPS_APIKEY}
        // showsUserLocation={true}
        style={{
          flex: 1,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        initialRegion={{
          latitude: currentRegoin?.latitude,
          longitude: currentRegoin?.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onRegionChangeComplete={e => {}}
        userInterfaceStyle={'light'}
        // cacheEnabled
      >
        <Marker
          coordinate={{
            latitude: currentRegoin?.latitude,
            longitude: currentRegoin.longitude,
          }}>
          <LocationMap />
        </Marker>
        <Marker
          coordinate={{
            latitude: destinationRegoin?.latitude,
            longitude: destinationRegoin?.longitude,
          }}>
          {/* <Image style={{ height: 20, width: 20, resizeMode: 'contain'}} source={images.loc} /> */}
          <DestinationIcon />
        </Marker>
        <MapViewDirections
          apikey={GOOGLE_MAPS_APIKEY}
          origin={{
            latitude: currentRegoin?.latitude,
            longitude: currentRegoin?.longitude,
          }}
          destination={{
            latitude: destinationRegoin?.latitude,
            longitude: destinationRegoin?.longitude,
          }}
          strokeColor="#000000"
          strokeWidth={3}
        />
      </MapView>
    </View>
  );
};
export default MapViewWithDirections;
