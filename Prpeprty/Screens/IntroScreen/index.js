import React, {useState, useRef} from 'react';
import {FlatList, Image, Text, View, TouchableOpacity} from 'react-native';
import {intro1, intro2, intro3} from '../../assets/helper/pngImages';
import {moderateScale} from 'react-native-size-matters';
import {width} from '../../constants/Deimenstions';
import {colors} from '../../constants/colors';
import fonts from '../../constants/fonts';
import {size} from '../../constants/fontsize';

const IntroScreen = ({navigation}) => {
  const [index, setIndex] = useState(0); // Track current index
  const flatListRef = useRef(null); // Reference for FlatList

  const handleNext = () => {
    if (index < data.length - 1) {
      const nextIndex = index + 1;
      setIndex(nextIndex);
      flatListRef.current.scrollToIndex({animated: true, index: nextIndex});
    } else {
      navigation.replace('LoginScreen');
    }
  };

  const handleSkip = () => {
    navigation.replace('LoginScreen');
  };

  const handleScroll = event => {
    const currentIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setIndex(currentIndex);
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        ref={flatListRef} // Attach ref to FlatList
        showsHorizontalScrollIndicator={false}
        data={data}
        horizontal={true}
        pagingEnabled={true}
        onMomentumScrollEnd={handleScroll} // Update index on swipe
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({item}) => (
          <View style={{flex: 1}}>
            <Image
              source={item.img}
              style={{height: moderateScale(599), width: width}}
            />
            <View
              style={{
                height: moderateScale(300),
                backgroundColor: colors.primary,
                marginTop: moderateScale(-80),
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30,
                paddingTop: '8%',
                alignItems: 'center',
                paddingHorizontal: '10%',
                width: width,
              }}>
              <Text
                style={{
                  color: colors.white,
                  fontFamily: fonts.bold,
                  fontSize: size(19),
                  textAlign: 'center',
                }}>
                {item.title}
              </Text>
              <Text
                style={{
                  color: colors.white,
                  marginTop: '10%',
                  textAlign: 'center',
                  fontFamily: fonts.regular,
                }}>
                {item.desc}
              </Text>
            </View>
          </View>
        )}
      />
      <View
        style={{
          position: 'absolute',
          bottom: '7%',
          zIndex: 1,
          flexDirection: 'row',
          paddingHorizontal: moderateScale(20),
          justifyContent: 'space-between',
          width: '85%',
          alignSelf: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={handleSkip}>
          <Text
            style={{
              color: colors.white,
              fontSize: size(16),
              fontFamily: fonts.medium,
            }}>
            Skip
          </Text>
        </TouchableOpacity>
        <View
          style={{
            width: width * 0.1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {data.map((_, itemIndex) => (
            <View
              key={itemIndex.toString()}
              style={{
                height: 8,
                width: 8,
                backgroundColor:
                  index === itemIndex
                    ? colors.white
                    : 'rgba(255, 255, 255, 0.4)',
                borderRadius: 10,
              }}
            />
          ))}
        </View>
        <TouchableOpacity onPress={handleNext}>
          <Text
            style={{
              color: colors.white,
              fontSize: size(16),
              fontFamily: fonts.medium,
            }}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default IntroScreen;

const data = [
  {
    img: intro1,
    title: 'Explore Properties and Your Dream Houses',
    desc: 'In publishing and graphic design, Lorem is a placeholder text commonly ',
  },
  {
    img: intro2,
    title: 'Explore Properties and Your Dream Houses',
    desc: 'In publishing and graphic design, Lorem is a placeholder text commonly ',
  },
  {
    img: intro3,
    title: 'Explore Properties and Your Dream Houses',
    desc: 'In publishing and graphic design, Lorem is a placeholder text commonly ',
  },
];
