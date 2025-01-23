import React, {useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  View,
  Platform,
} from 'react-native';
import CustomText from '../../components/CustomText';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../constants/colors';
import fonts from '../../constants/fonts';
import {fontSize} from '../../constants/fontSize';
import Header from '../../components/Header';
import Stars from 'react-native-stars';
import {TextInput} from 'react-native-gesture-handler';
import Button from '../../components/Button';
import {useSelector} from 'react-redux';
import {AWS_URL} from '../../constants/ApiKeys';
import {User} from '../../constants/svgIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DATABASE} from '../../utils/DATABASE';
import axios from 'axios';
import Toast from 'react-native-simple-toast';

const AddRattingScreen = ({navigation}) => {
  const {bookingDetails, driveAccpetedData} = useSelector(state => state.rider);
  // console.log(bookingDetails);

  const driver = bookingDetails?.driver;
  const {user} = useSelector(state => state?.user);
  const [rating, setRating] = useState(1);
  const [description, setDescription] = useState('');

  const AddRating = async () => {
    const token = await AsyncStorage.getItem(DATABASE.token);
    const data = {
      // to_user_id: user['_id'],
      // booking_id: driveAccpetedData?.bookingId,
      // rideId: driveAccpetedData?.bookingId,
      // rating_type: 'Now',
      // rating: rating,
      // description: description,
      to_user_id: user['_id'],
      booking_id: driveAccpetedData?.bookingId,
      rideId: bookingDetails['_id'],
      rating_type: 'User',
      rating: rating,
      description: description,
    };
    console.log(data);

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://taxi-5.onrender.com/api/app/user/add-rating',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(data),
    };
    try {
      const response = await axios.request(config);

      if (response.data.status == 200) {
        Toast.show('Thank you!');
        navigation.reset({index: 0, routes: [{name: 'BottumTab'}]});
      }
    } catch (err) {
      console.log(err, config);
      Toast.show('Thank you');
      // navigation.reset({index: 0, routes: [{name: 'BottumTab'}]});
    }
  };
  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: colors.white}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header map={true} title={'Rate Driver'} />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: moderateScale(100),
        }}
        automaticallyAdjustKeyboardInsets={true}
        keyboardShouldPersistTaps="handled">
        <View style={{flex: 1}}>
          <View
            style={{
              height: moderateScale(80),
              width: moderateScale(80),
              alignSelf: 'center',
              borderRadius: 60,
              borderWidth: driver?.profileImage ? 0 : 1,
              borderColor: colors.inputBorder,
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}>
            {driver?.profileImage ? (
              <Image
                style={{
                  height: '100%',
                  width: '100%',
                  borderRadius: moderateScale(60),
                }}
                source={{
                  uri: driver?.profileImage
                    ? `${AWS_URL}${driver?.profileImage}`
                    : 'https://png.pngtree.com/background/20230612/original/pngtree-beautiful-cute-girl-wearing-makeup-staring-at-the-camera-picture-image_3186471.jpg',
                }}
              />
            ) : (
              <User height={45} width={45} />
            )}
          </View>
          <View style={{alignItems: 'center', paddingTop: 20}}>
            <CustomText
              colors={colors.black}
              fontFamily={fonts.semi_bold}
              size={fontSize.TwentyTwo}>
              {driver?.name}
            </CustomText>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CustomText colors={colors.grey} size={fontSize.Sixteen}>
                {bookingDetails?.carType ?? 'Sedan'}
              </CustomText>
              <View
                style={{
                  height: 7,
                  width: 7,
                  borderRadius: 5,
                  backgroundColor: colors.yellow,
                  marginHorizontal: 4,
                }}
              />
              <CustomText colors={colors.grey} size={fontSize.Sixteen}>
                {bookingDetails?.crnNumber}
              </CustomText>
            </View>
          </View>
          <View
            style={{
              marginHorizontal: moderateScale(30),
              alignItems: 'center',
              marginTop: moderateScale(20),
              borderBottomWidth: 1.5,
              paddingBottom: moderateScale(30),
              borderColor: colors.inputBorder,
            }}>
            <CustomText
              style={{textAlign: 'center'}}
              fontFamily={fonts.semi_bold}
              size={fontSize.TwentyFive}>
              How was your trip with Jenny Wilson
            </CustomText>
          </View>
          <View
            style={{
              alignItems: 'center',
              marginTop: moderateScale(30),
              borderBottomWidth: 1,
              borderColor: colors.inputBorder,
              marginHorizontal: moderateScale(25),
              paddingBottom: moderateScale(50),
            }}>
            <CustomText colors={colors.grey} size={fontSize.Sixteen}>
              Your overall rating
            </CustomText>
            <View style={{height: moderateScale(20)}} />
            <Stars
              default={rating}
              update={val => {
                setRating(val);
              }}
              spacing={4}
              starSize={40}
              count={5}
              fullStar={require('../../assets/fullstars.png')}
              emptyStar={require('../../assets/blankstar.png')}
            />
          </View>
          <View style={{marginHorizontal: moderateScale(25)}}>
            <CustomText
              size={fontSize.Eighteen}
              fontFamily={fonts.semi_bold}
              mTop={moderateScale(30)}>
              Add detailed review
            </CustomText>
            <View
              style={{
                height: moderateScale(100),
                borderWidth: 1,
                marginTop: moderateScale(5),
                borderColor: colors.inputBorder,
                borderRadius: 4,
                paddingHorizontal: '2%',
              }}>
              <TextInput
                onChangeText={inpit => setDescription(inpit)}
                value={description}
                style={{fontFamily: fonts.medium, color: colors.black}}
                multiline
                placeholder="Enter Here"
                placeholderTextColor={colors.grey}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          backgroundColor: colors.white,
          width: '100%',
          elevation: 5,
          height: moderateScale(90),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Button
          onPress={() => {
            AddRating();
          }}
          title={'Submit'}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddRattingScreen;
