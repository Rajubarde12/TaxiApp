import {Text, Vibration, View} from 'react-native';
import {colors} from '../../constants/colors';
import {
  ArrowBack,
  Email,
  Facebook,
  Google,
  Lock,
  LogoBlack,
  On,
  User,
} from '../../assets/helper/svgIcons';
import {moderateScale} from 'react-native-size-matters';
import {size} from '../../constants/fontsize';
import fonts from '../../constants/fonts';
import Input from '../../component/Input';
import {ScrollView} from 'react-native-gesture-handler';
import Button from '../../component/Button';
import Header from '../../component/Header';

const RegistrationScreen = () => {
  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <Header />
      <ScrollView>
        <View style={{paddingHorizontal: moderateScale(20), marginTop: 20}}>
          <Text
            style={{
              fontSize: size(24),
              color: colors.black,
              fontFamily: fonts.semi_bold,
            }}>
            Sign up
          </Text>
          {/* <View style={{height: moderateScale(20)}} /> */}
          <Input
            isfirst={true}
            placeholder={'Full name'}
            Icon={() => (
              <User height={moderateScale(22)} width={moderateScale(22)} />
            )}
          />
          <Input
            // isfirst={true}
            placeholder={'abc@email.com'}
            Icon={() => (
              <Email height={moderateScale(22)} width={moderateScale(22)} />
            )}
          />
          <Input
            placeholder={'Your password'}
            secureTextEntry={true}
            Icon={() => (
              <Lock height={moderateScale(22)} width={moderateScale(22)} />
            )}
          />
          <Input
            placeholder={'Confirm password'}
            secureTextEntry={true}
            Icon={() => (
              <Lock height={moderateScale(22)} width={moderateScale(22)} />
            )}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: moderateScale(20),
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <On height={moderateScale(19)} width={moderateScale(32.3)} />
              <Text
                style={{
                  color: colors.black,
                  marginLeft: 10,
                  fontSize: size(14),
                  fontFamily: fonts.regular,
                }}>
                Remember Me{' '}
              </Text>
            </View>
            <Text
              style={{
                color: colors.black,
                marginLeft: 10,
                fontSize: size(14),
                fontFamily: fonts.regular,
              }}>
              Forgot Password?
            </Text>
          </View>
          <Button />
          <View style={{marginTop: moderateScale(25), alignItems: 'center'}}>
            <Text
              style={{
                color: colors.place_holder,
                fontSize: size(16),
                fontFamily: fonts.semi_bold,
                alignSelf: 'center',
              }}>
              OR
            </Text>
            <Google
              height={moderateScale(27)}
              width={moderateScale(184)}
              style={{marginTop: moderateScale(30)}}
            />
            <Facebook
              height={moderateScale(30)}
              width={moderateScale(208)}
              style={{marginTop: moderateScale(45)}}
            />
          </View>
          {/* <View style={{position: 'absolute', bottom: 20}}> */}
          <Text
            style={{
              fontSize: size(15),
              color: colors.black,
              fontFamily: fonts.medium,
              alignSelf: 'center',
              marginTop: moderateScale(45),
            }}>
            Don’t have an account?
            <Text style={{color: colors.primary}}> Sign up</Text>
          </Text>
          {/* </View> */}
        </View>
      </ScrollView>
    </View>
  );
};
export default RegistrationScreen;
