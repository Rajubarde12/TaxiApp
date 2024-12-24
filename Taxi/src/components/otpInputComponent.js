import React, {useRef, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Keyboard,
} from 'react-native';
import {colors} from '../constants/colors';
import fonts from '../constants/fonts';
import {fontSize} from '../constants/fontSize';

const OTPInput = ({pinLength = 4, onOtpComplete}) => {
  const [otp, setOtp] = useState(new Array(pinLength).fill(''));
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if filled
    if (value && index < pinLength - 1) {
      inputsRef.current[index + 1].focus();
    }

    // Trigger callback when complete
    if (newOtp.join('').length === pinLength) {
      Keyboard.dismiss();
      onOtpComplete(newOtp.join(''));
    }
  };

  const handleKeyPress = (key, index) => {
    if (key === 'Backspace' && index > 0) {
      if (!otp[index]) {
        inputsRef.current[index - 1].focus();
      }
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  const clearOtp = () => {
    setOtp(new Array(pinLength).fill(''));
    inputsRef.current[0].focus();
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {otp.map((value, index) => (
          <TextInput
            placeholder="-"
            placeholderTextColor={colors.grey}
            key={index}
            ref={ref => (inputsRef.current[index] = ref)}
            style={styles.inputBox}
            value={value}
            maxLength={1}
            keyboardType="number-pad"
            onChangeText={text => handleChange(text, index)}
            onKeyPress={({nativeEvent}) =>
              handleKeyPress(nativeEvent.key, index)
            }
            textAlign="center"
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inputBox: {
    width: 65,
    height: 45,
    margin: 10,
    fontSize: fontSize.Eighteen,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 5,
    color: colors.black,
    fontFamily: fonts.medium,
    paddingHorizontal: 20,
  },
  clearButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  clearText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default OTPInput;
