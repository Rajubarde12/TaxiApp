import {Text, Vibration, View} from 'react-native';
import {colors} from '../../constants/colors';
import {
  Email,
  Facebook,
  Google,
  Lock,
  LogoBlack,
  On,
} from '../../assets/helper/svgIcons';
import {moderateScale} from 'react-native-size-matters';
import {size} from '../../constants/fontsize';
import fonts from '../../constants/fonts';
import Input from '../../component/Input';
import {ScrollView} from 'react-native-gesture-handler';
import Button from '../../component/Button';

const LoginScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <ScrollView>
        <View style={{alignItems: 'center', paddingTop: moderateScale(40)}}>
          <LogoBlack height={moderateScale(114)} width={moderateScale(114)} />
          <Text
            style={{
              fontSize: size(24),
              color: colors.black,
              fontFamily: fonts.semi_bold,
            }}>
            Community Lyfe
          </Text>
        </View>
        <View style={{paddingHorizontal: moderateScale(20), marginTop: 20}}>
          <Text
            style={{
              fontSize: size(24),
              color: colors.black,
              fontFamily: fonts.semi_bold,
            }}>
            Sign in
          </Text>
          {/* <View style={{height: moderateScale(20)}} /> */}
          <Input
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
            onPress={() => {
              navigation.navigate('RegistrationScreen');
            }}
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
export default LoginScreen;
