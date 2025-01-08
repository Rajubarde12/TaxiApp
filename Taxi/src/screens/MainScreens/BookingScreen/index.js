import {Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Header from '../../../components/Header';
import Active from './Active';
import Completed from './Completed';
import Cancelled from './Cancled';
import {moderateScale} from '../../../utils/Scalling';
import {colors} from '../../../constants/colors';
import CustomText from '../../../components/CustomText';
import fonts from '../../../constants/fonts';
const BookingScreen = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <Header title={'Boooking'} />
      <View style={{paddingHorizontal: moderateScale(25), flex: 1}}>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarStyle: {
              backgroundColor: 'transparent',
              width: '100%',
              overflow: 'hidden',
            },
            tabBarLabelStyle: {
              fontWeight: 'bold',
              lineHeight: 20,
            },
            tabBarIndicatorStyle: {
              backgroundColor: colors.yellow,
            },
            tabBarItemStyle: {
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomWidth: 2,
              borderBottomColor: colors.yellow,
            },
            tabBarLabel: ({focused}) => (
              <CustomText
                style={{
                  color: focused ? colors.yellow : colors.grey,
                  // borderBottomWidth: focused ? 2 : 0,
                  borderBottomColor: focused ? colors.black : 'red',
                  paddingBottom: 8,
                }}
                fontFamily={fonts.bold}>
                {route.name}
              </CustomText>
            ),
            tabBarItemStyle: {
              borderBottomColor:
                route.name === 'Active' ? colors.black : colors.inputBorder,
            },
          })}>
          <Tab.Screen name="Active" component={Active} />
          <Tab.Screen name="Completed" component={Completed} />
          <Tab.Screen name="Cancelled" component={Cancelled} />
        </Tab.Navigator>
      </View>
    </View>
  );
};
export default BookingScreen;
