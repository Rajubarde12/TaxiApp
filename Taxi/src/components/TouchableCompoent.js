import React from 'react';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import {colors} from '../constants/colors';
import fonts from '../constants/fonts';
import {Save} from '../constants/svgIcons';
import {moderateScale} from '../utils/Scalling';
import {fontSize} from '../constants/fontSize';

const TouchableInput = ({onPress, placeholder = 'Enter Location'}) => {
  return (
    <TouchableOpacity
      onPress={onPress} // Action when pressed
      activeOpacity={0.8} // Feedback on touch
      style={{
        position: 'absolute',
        height: moderateScale(70),
        top: '15%',
        width: '90%',
        alignSelf: 'center',
        zIndex: 1,
        backgroundColor: 'white',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderWidth: 2,
        borderColor: colors.inputBorder,
      }}>
      {/* Left Circle Indicator */}
      <View
        style={{
          height: 8,
          width: 8,
          backgroundColor: colors.yellow,
          borderRadius: 10,
          shadowColor: '#ccc',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 5,
          marginRight: 10,
        }}
      />

      {/* Placeholder Text (simulating input) */}
      <Text
        numberOfLines={1}
        style={{
          flex: 1,
          color: colors.grey,
          fontSize: fontSize.Sixteen,
          fontFamily: fonts.medium,
        }}>
        {placeholder}
      </Text>

      {/* Save Icon (optional) */}
      <Save height={16} width={16} />
    </TouchableOpacity>
  );
};

export default TouchableInput;
