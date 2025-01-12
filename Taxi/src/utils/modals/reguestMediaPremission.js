import {PermissionsAndroid, Platform, Alert} from 'react-native';

export async function requestPermissions() {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]);

      const allGranted = Object.values(granted).every(
        status => status === PermissionsAndroid.RESULTS.GRANTED,
      );

      if (allGranted) {
        return true; // All permissions granted
      } else {
        Alert.alert('Permissions Denied', 'Some permissions were not granted.');
        return false; // Some permissions denied
      }
    } catch (err) {
      console.warn('Permission request error:', err);
      return false; // In case of an error
    }
  }
  return true; // iOS doesn't require runtime permissions for this use case
}
