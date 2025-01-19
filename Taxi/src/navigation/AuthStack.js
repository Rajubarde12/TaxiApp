import {createStackNavigator} from '@react-navigation/stack';
import IntroFirstScreen from '../screens/IntroScreens/Intro1';
import IntroSecondScreen from '../screens/IntroScreens/Intro2';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegitsterScreen';
import OtpScreen from '../screens/Auth/OtpScreen';
import CompleteProfileScreen from '../screens/Auth/CompletProfile';
import LocationEnableScreen from '../screens/Auth/LocationElableScreen';
import CreateNewpasswordScreen from '../screens/Auth/CreatepasswordScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPassowrd';

const AuthStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="IntroFirstScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="IntroFirstScreen"
        component={IntroFirstScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="IntroSecondScreen"
        component={IntroSecondScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OtpScreen"
        component={OtpScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CompleteProfileScreen"
        component={CompleteProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LocationEnableScreen"
        component={LocationEnableScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateNewpasswordScreen"
        component={CreateNewpasswordScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default AuthStack;
