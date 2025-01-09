import React from 'react';
import {Text, View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {colors} from '../constants/colors';
import fonts from '../constants/fonts';
import {Save} from '../constants/svgIcons';
import {moderateScale} from '../utils/Scalling';
import {fontSize} from '../constants/fontSize';
import {GOOGLE_API_KEY} from '../constants/ApiKeys';
// import Icon from 'react-native-vector-icons/MaterialIcons'; // Or another icon library of your choice

const YourComponent = ({handlePlaceSelect, placeholder}) => (
  <View
    style={{
      position: 'absolute',
      height: moderateScale(70),
      top: '13%',
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
    <View
      style={{
        height: 8,
        width: 8,
        backgroundColor: colors.yellow,
        // marginLeft: 10,
        borderRadius: 10,
        shadowColor: '#ccc',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 1,
        marginTop: 1,
      }}></View>
    <GooglePlacesAutocomplete
      onPress={handlePlaceSelect}
      placeholder={placeholder ?? 'Current Location'}
      fetchDetails={true}
      //   onPress={(data, details = null) => {
      //     console.log(data, details);
      //   }}
      query={{
        key: GOOGLE_API_KEY,
        language: 'en',
      }}
      styles={{
        textInputContainer: {
          width: '100%',
          //   alignSelf: 'center',
          //   borderWidth: 1,
          height: '100%',
        },
        textInput: {
          height: '100%',
          color: '#333',
          fontSize: fontSize.Sixteen,
          marginLeft: '-1%',
          fontFamily: fonts.medium,
          placeholderTextColor: colors.grey,

          // Light gray placeholder
        },
        listView: {
          backgroundColor: 'white',
          borderRadius: 10,
          marginTop: 5,
          elevation: 5,
          position: 'absolute',
          width: '127%',
          alignSelf: 'center',
          //   marginRight: '10%',
          top: moderateScale(60),
        },
        row: {
          padding: 15,
          height: 50,
          flexDirection: 'row',
          alignItems: 'center', // To vertically center the icon and text
        },
        separator: {
          height: 0.5,
          backgroundColor: '#ddd',
        },
        description: {
          fontSize: 14,
          color: '#333', // Customize text color
        },
      }}
      renderRow={rowData => (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/* <Icon name="location-on" size={20} color="#FF6347" style={{ marginRight: 10 }} /> Icon */}
          <Text style={{fontSize: 14, color: '#333'}}>
            {rowData.description}
          </Text>
          {/* Description Text */}
        </View>
      )}
      textInputProps={{
        placeholderTextColor: '#888', // Customize placeholder color
      }}
    />
    <Save height={16} width={16} />
  </View>
);

export default YourComponent;
