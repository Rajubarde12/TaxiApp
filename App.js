import { LogBox, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import SplashScreen from './src/screens/SplashScreen'
import DrawerStack from './src/navigation/DrawerStack'
import AuthStack from './src/navigation/AuthStack'
import { Provider } from 'react-redux'
import { store } from './src/redux/store'
import { fetchBlog, fetchHomeCollectionUrl, homeApiCall, setHomeBanners, settingJsonCall } from './src/redux/features/HomeBannerSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { DATABASE } from './src/Database'
import { setCart } from './src/redux/features/CartSlice'
import { WISHLIST_SUCCESS } from './src/redux/features/wishlistSlice'
import { getUserDataFromLocal } from './src/redux/features/loginSlice'
LogBox.ignoreLogs([
  'AutoHeightImage: Support for defaultProps will be removed from function components in a future major release.'
]);

const App = () => {
  LogBox.ignoreAllLogs();
  const Stack = createStackNavigator()

  useEffect(() => {
    handleFirstCall()
  }, [])

  const handleFirstCall = async () => {
    const homeDatadb = await AsyncStorage.getItem('HomeInfo');
    const Wishlistdb = await AsyncStorage.getItem("@wishlist_db");
    const cartdata = await AsyncStorage.getItem(DATABASE.CART)
    store.dispatch(setCart(JSON.parse(cartdata), null))
    store.dispatch(getUserDataFromLocal())
    if (Platform.OS == 'android') {
      if (homeDatadb != null) {
        let homeData = JSON.parse(homeDatadb);
        // await store.dispatch(setHomeBanners(homeData));
        await store.dispatch(homeApiCall());
      } else {
        await store.dispatch(settingJsonCall());
        await store.dispatch(homeApiCall());
      }
    }
    else {
      if (homeDatadb != null) {
        await store.dispatch(settingJsonCall());
      } else {
        await store.dispatch(settingJsonCall());
      }
    }
    store.dispatch(fetchHomeCollectionUrl())

    let wistList = JSON.parse(Wishlistdb);
    if (Wishlistdb != null) {
      store.dispatch(WISHLIST_SUCCESS(wistList));
    }

  }

  return (
    <NavigationContainer>
      <Provider store={store}>
        <SafeAreaView style={{ flex: 1 }}>
          <Stack.Navigator screenOptions={{
            headerShown: false
          }} initialRouteName='SplashScreen'>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="DrawerStack" component={DrawerStack} />
            <Stack.Screen name="AuthStack" component={AuthStack} />
          </Stack.Navigator>
        </SafeAreaView>
      </Provider>
    </NavigationContainer>
  )
}

export default App

