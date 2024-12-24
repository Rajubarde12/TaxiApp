import {createStackNavigator} from '@react-navigation/stack';
import BookingScreen from '../screens/MainScreens/BookingScreen';
const BookingStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="BookingScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="BookingScreen" component={BookingScreen} />
    </Stack.Navigator>
  );
};
export default BookingStack;
