import {NavigationContainer} from '@react-navigation/native';
import MyStack from './src/navigation';
import {LogBox, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/redux';
import {useEffect} from 'react';
import {getUserFromLocal} from './src/redux/userSlice';
import OutoffTexi from './OutofTexi';
import AppContextProvider from './src/services/Provider';

const App = () => {
  LogBox.ignoreAllLogs();
  useEffect(() => {
    store.dispatch(getUserFromLocal());
  }, []);
  // return <OutoffTexi />;
  return (
    <Provider store={store}>
      <AppContextProvider>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />

        <NavigationContainer>
          <MyStack />
        </NavigationContainer>
      </AppContextProvider>
    </Provider>
  );
};
export default App;
