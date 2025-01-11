import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {colors} from '../../constants/colors';
import {introImg1} from '../../constants/images';
import {Splash1} from '../../constants/svgIcons';

import {moderateScale} from '../../utils/Scalling';
import {height} from '../../constants/Dimentions';
import fonts from '../../constants/fonts';
import CustomText from '../../components/CustomText';
import {fontSize} from '../../constants/fontSize';
import Button from '../../components/Button';

const IntroFirstScreen = ({navigation}) => {
  return (
    <View style={{backgroundColor: colors.white, flex: 1}}>
      <ScrollView>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <View>
          <Image
            style={{height: moderateScale(700), width: '100%'}}
            source={require('../../assets/jpg/Intro1Image.jpg')}
          />
        </View>
        <View style={{alignItems: 'center', paddingTop: moderateScale(50)}}>
          <CustomText
            textAlignment="center"
            fontFamily={fonts.semi_bold}
            size={fontSize.TwentyFive}>
            Welcome to Your
            <Text style={{color: colors.yellow}}>
              {' '}
              Ultimate Transportation Solution
            </Text>
          </CustomText>
          <CustomText
            color={colors.grey}
            mTop={moderateScale(50)}
            size={fontSize.Fourteen}
            fontFamily={fonts.regular}
            textAlignment={'center'}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industrie lorem eiusmod
          </CustomText>
          <View style={{marginTop: moderateScale(40), alignItems: 'center'}}>
            <Button
              onPress={() => {
                navigation.replace('IntroSecondScreen');
              }}
              title={'Let’s Get Started'}
            />
          </View>
          <Pressable
            onPress={() => {
              navigation.navigate('LoginScreen');
            }}>
            <CustomText mTop={moderateScale(40)}>
              Already have an account?
              <Text style={{color: colors.yellow}}> Sign In</Text>
            </CustomText>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};
export default IntroFirstScreen;
