import React, {useRef, useState} from 'react';
import {FlatList, View, Pressable, StatusBar, ScrollView} from 'react-native';
import IntroComponent from '../../components/IntroComponents';
import {height, width} from '../../constants/Dimentions';
import {ArrowBack, ArrowRight} from '../../constants/svgIcons';
import {moderateScale} from '../../utils/Scalling'; // Ensure this import exists or adapt accordingly
import {colors} from '../../constants/colors'; // Ensure this import exists or adapt accordingly

const introScreens = [
  {
    title1: 'Book a Ride',
    title2: 'Anywhere, Anytime!',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industrie lorem eiusmod',
    activeItem: 0,
  },
  {
    title1: 'Choose Your Comfort:',
    title2: 'Enjoy a Luxurious Ride',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industrie lorem eiusmod',
    activeItem: 1,
  },
  {
    title1: 'Elevate Your',
    title2: 'Ride Tracking Experience',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industrie lorem eiusmod',
    activeItem: 2,
  },
];

const IntroScreens = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      flatListRef.current.scrollToIndex({
        index: currentIndex - 1,
        animated: true,
      });
    } else {
      navigation.goBack(); // Exit intro
    }
  };

  const handleNext = () => {
    if (currentIndex < introScreens.length - 1) {
      setCurrentIndex(currentIndex + 1);
      flatListRef.current.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      navigation.navigate('LoginScreen'); // Navigate to login
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <ScrollView>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <View
          style={{
            height: height * 0.97,
            paddingTop: 20,
            backgroundColor: colors.Off_White,
          }}>
          <FlatList
            ref={flatListRef}
            data={introScreens}
            horizontal
            pagingEnabled
            renderItem={({item}) => (
              <View style={{width: width, borderWidth: 0}}>
                <IntroComponent
                  title1={item.title1}
                  title2={item.title2}
                  description={item.description}
                  activeItem={currentIndex}
                  onPressBack={handleBack}
                  onPressUp={handleNext}
                  onPressSkip={() => {
                    navigation.navigate('LoginScreen');
                  }}
                />
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false} // Disable manual swiping
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              backgroundColor: colors.white,
              paddingHorizontal: moderateScale(20),
              marginTop: -50,
            }}>
            <View
              style={{
                height: moderateScale(80),
                width: moderateScale(80),
              }}>
              {currentIndex !== 0 && ( // Fix for activeItem variable
                <Pressable
                  onPress={handleBack}
                  style={{
                    height: moderateScale(80),
                    width: moderateScale(80),
                    borderWidth: 2,
                    borderRadius: 40,
                    borderColor: colors.yellow,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <ArrowBack />
                </Pressable>
              )}
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {[0, 1, 2].map(item => (
                <View
                  key={item.toString()}
                  style={{
                    height: moderateScale(item === currentIndex ? 30 : 20),
                    width: moderateScale(item === currentIndex ? 30 : 20),
                    backgroundColor:
                      item === currentIndex
                        ? 'rgba(254, 203, 0, 0.7)'
                        : 'rgba(254, 203, 0, 0.4)',
                    borderRadius: 20,
                    marginLeft: 10,
                  }}
                />
              ))}
            </View>
            <Pressable
              onPress={handleNext}
              style={{
                height: moderateScale(80),
                width: moderateScale(80),
                borderWidth: 2,
                borderRadius: 40,
                borderColor: colors.yellow,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.yellow,
              }}>
              <ArrowRight />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default IntroScreens;
