import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../screens/MainScreens/ProfileScreen';

const ProfileStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
};
export default ProfileStack;
