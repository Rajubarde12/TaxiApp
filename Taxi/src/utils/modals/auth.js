import {PermissionsAndroid} from 'react-native';

export function validatePassword(password) {
  const minLength = 8;
  const lowercaseRegex = /[a-z]/;
  const uppercaseRegex = /[A-Z]/;
  const digitRegex = /\d/;
  const specialCharRegex = /[@$!%*?&]/;

  if (!password) {
    return 'Password is required.';
  }
  if (password.length < minLength) {
    return `Password must be at least ${minLength} characters long.`;
  }
  if (!lowercaseRegex.test(password)) {
    return 'Password must contain at least one lowercase letter.';
  }
  if (!uppercaseRegex.test(password)) {
    return 'Password must contain at least one uppercase letter.';
  }
  if (!digitRegex.test(password)) {
    return 'Password must contain at least one number.';
  }
  if (!specialCharRegex.test(password)) {
    return 'Password must contain at least one special character (@$!%*?&).';
  }

  return 'matched';
}

export const keyboartype = {
  default: 'default',
  number_pad: 'number-pad',
  decimal_pad: 'decimal-pad',
  numeric: 'numeric',
  email_address: 'email-address',
  phone_pad: 'phone-pad',
  url: 'url',
};
export const requestLocationPermission = async () => {
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
