import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {colors} from '../constants/colors';
import {ArrowBack, ArrowRight, Intro2} from '../constants/svgIcons';
import {moderateScale} from '../utils/Scalling';
import fonts from '../constants/fonts';
import CustomText from './CustomText';
import {fontSize} from '../constants/fontSize';
import {height, width} from '../constants/Dimentions';

const IntroComponent = ({title1, title2, description, onPressSkip}) => {
  return (
    <View
      style={{
        backgroundColor: colors.white,
        flex: 1,
        // marginTop: StatusBar.currentHeight * 2,
      }}>
      <ScrollView>
        {/* <Image source={introImg1} /> */}
        <View
          style={{
            backgroundColor: colors.Off_White,
            borderBottomLeftRadius: 100,
            borderBottomRightRadius: 100,
            paddingLeft: moderateScale(40),
            overflow: 'hidden',
            height: height * 0.6,
            width: '110%',
            alignSelf: 'center',
            marginTop: -moderateScale(40),
          }}>
          <Pressable
            onPress={() => {
              onPressSkip();
            }}
            style={{position: 'absolute', zIndex: 1, top: '15%', right: '10%'}}>
            <CustomText
              fontFamily={fonts.semi_bold}
              size={fontSize.Twenty}
              color={colors.yellow}>
              Skip
            </CustomText>
          </Pressable>
          <Intro2 height={height * 0.67} width={width * 0.7} />
        </View>
        <View
          style={{
            alignItems: 'center',
            paddingTop: moderateScale(50),
            paddingHorizontal: moderateScale(30),
          }}>
          <CustomText
            textAlignment="center"
            fontFamily={fonts.semi_bold}
            size={30}>
            {title1}
            <Text style={{color: colors.yellow}}> {title2}</Text>
          </CustomText>
          <CustomText
            color={colors.grey}
            mTop={moderateScale(50)}
            size={fontSize.Fourteen}
            fontFamily={fonts.regular}
            textAlignment={'center'}>
            {description}
          </CustomText>
        </View>
      </ScrollView>
    </View>
  );
};
export default IntroComponent;
