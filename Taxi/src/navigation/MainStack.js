import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/MainScreens/HomeScreen';

const MianStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};
export default MianStack;
