import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';

import BottumTab from './BottumTab';
import AuthStack from './AuthStack';
import PickupScreen from '../screens/MainScreens/PickupScreen';
import DestinationScreen from '../screens/MainScreens/DestinationScreen';
import BookRideScreen from '../screens/MainScreens/BookRideScreen';
import SearchingRide from '../screens/MainScreens/SearchingRideScreen';
import PaymentMethod from '../screens/MainScreens/PaymentMethods';
import Example from '../screens/MainScreens/Exampple';
const Stack = createStackNavigator();
const MyStack = () => {
  const config = {
    animation: 'timing',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        detachPreviousScreen: false, // Keeps the previous screen visible
        gestureEnabled: true,
        transitionSpec: {
          open: {
            animation: 'timing',
            config: {
              stiffness: 2000,
              damping: 100,
              mass: 1,
              overshootClamping: true,
              restDisplacementThreshold: 0.01,
              restSpeedThreshold: 0.01,
            },
          },
          close: {
            animation: 'timing',
            config: {
              stiffness: 2000,
              damping: 100,
              mass: 1,
              overshootClamping: true,
              restDisplacementThreshold: 0.01,
              restSpeedThreshold: 0.01,
            },
          },
        },
        // cardStyleInterpolator: ({current, next, layouts}) => {
        //   const translateX = current.progress.interpolate({
        //     inputRange: [0, 1],
        //     outputRange: [layouts.screen.width, 0], // Current screen slides in
        //   });

        //   const previousTranslateX = next
        //     ? next.progress.interpolate({
        //         inputRange: [0, 1],
        //         outputRange: [0, -layouts.screen.width * 0.3], // Previous screen slides out
        //       })
        //     : 0;

        //   return {
        //     cardStyle: {
        //       transform: [{translateX}],
        //     },
        //     overlayStyle: {
        //       transform: [{translateX: previousTranslateX}],
        //     },
        //   };
        // },
      }}
      initialRouteName="BottumTab">
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="BottumTab" component={BottumTab} />
      <Stack.Screen name="PickupScreen" component={PickupScreen} />
      <Stack.Screen name="DestinationScreen" component={DestinationScreen} />
      <Stack.Screen name="BookRideScreen" component={BookRideScreen} />
      <Stack.Screen name="SearchingRide" component={SearchingRide} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
      <Stack.Screen name="Example" component={Example} />
    </Stack.Navigator>
  );
};
export default MyStack;
