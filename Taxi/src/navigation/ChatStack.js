import {createStackNavigator} from '@react-navigation/stack';
import ChatScreen from '../screens/MainScreens/ChatScreen';

const ChatStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="ChatScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  );
};
export default ChatStack;
