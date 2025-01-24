import React from 'react';
import {Text, View, Dimensions, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Header from '../../../components/Header';
import Active from './Active';
import Completed from './Completed';
import Cancelled from './Cancled';
// import {moderateScale} from '../../../utils/Scalling';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../../constants/colors';
import CustomText from '../../../components/CustomText';
import fonts from '../../../constants/fonts';

const {width} = Dimensions.get('window');

const BookingScreen = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <View style={styles.container}>
      <Header title={'Booking'} />
      <View style={styles.tabContainer}>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarStyle: styles.tabBarStyle,
            tabBarLabelStyle: styles.tabBarLabelStyle,
            tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
            tabBarLabel: ({focused}) => (
              <CustomText
                style={[
                  styles.tabBarLabel,
                  {color: focused ? colors.yellow : colors.grey},
                ]}
                fontFamily={fonts.bold}>
                {route.name}
              </CustomText>
            ),
          })}>
          <Tab.Screen name="Active" component={Active} />
          <Tab.Screen name="Completed" component={Completed} />
          <Tab.Screen name="Cancelled" component={Cancelled} />
        </Tab.Navigator>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  tabContainer: {
    flex: 1,
    paddingHorizontal: moderateScale(10), // Adjust padding dynamically
  },
  tabBarStyle: {
    backgroundColor: 'transparent',
  },
  tabBarLabelStyle: {
    fontWeight: 'bold',
    fontSize: moderateScale(6), // Scaled font size
    lineHeight: moderateScale(16),
  },
  tabBarIndicatorStyle: {
    backgroundColor: colors.yellow,
    height: moderateScale(2), // Scaled indicator height
  },
  tabBarLabel: {
    textAlign: 'center',
    paddingBottom: moderateScale(5), // Scaled padding
  },
});

export default BookingScreen;
