import {createStackNavigator} from '@react-navigation/stack';
import WalletScreen from '../screens/MainScreens/WalletScreen';

const WalletStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="WalletScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="WalletScreen" component={WalletScreen} />
    </Stack.Navigator>
  );
};
export default WalletStack;
