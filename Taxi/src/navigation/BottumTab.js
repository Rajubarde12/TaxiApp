import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import WalletStack from './WalletStack';
import BookingStack from './BookingStack';
import ChatStack from './ChatStack';
import ProfileStack from './ProfileStack';
import MianStack from './MainStack';
import CustomTab from './CustomTab';

const BottumTab = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      tabBar={props => <CustomTab {...props} />}
      screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={MianStack} />
      <Tab.Screen name="Wallet" component={WalletStack} />
      <Tab.Screen name="Bookings" component={BookingStack} />
      <Tab.Screen name="Chat" component={ChatStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};
export default BottumTab;
