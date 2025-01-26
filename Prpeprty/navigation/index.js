import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../Screens/Splash';
import IntroScreen from '../Screens/IntroScreen';
import LoginScreen from '../Screens/Auth/LoginScreen';
import RegistrationScreen from '../Screens/Auth/RegistrationScreen';

const Stack = createStackNavigator();
const Root = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="IntroScreen" component={IntroScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Root;
