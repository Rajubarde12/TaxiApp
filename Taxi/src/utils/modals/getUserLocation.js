import Geolocation from '@react-native-community/geolocation';

export const getGeo = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      re => {
        const {latitude, longitude} = re.coords;
        resolve({latitude, longitude});
      },
      err => {
        console.log(err);
        reject(null);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  });
};
export const getCoordsFromAddressName = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDbxbcNuOlVTolfigYexsDVfyHNrpeQ_eI`,
    );
    const responseJson = await response.json();
    return responseJson.results[0]?.formatted_address || null;
  } catch (err) {
    console.log(err);
    return null;
  }
};
