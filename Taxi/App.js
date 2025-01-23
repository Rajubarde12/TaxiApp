import {NavigationContainer} from '@react-navigation/native';
import MyStack from './src/navigation';
import {
  BackHandler,
  LogBox,
  View,
  StatusBar,
  StyleSheet,
  Text,
  Modal,
} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/redux';
import {useEffect, useState} from 'react';
import {
  getSavedAddress,
  getUserFromLocal,
  getUserProfile,
} from './src/redux/userSlice';
import OutoffTexi from './OutofTexi';
import AppContextProvider from './src/services/Provider';
import PayCashScreen from './src/screens/MainScreens/PayCashScreen';

const ExitToastModal = ({visible, onClose}) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.toastBox}>
          <Text style={styles.toastText}>Press again to exit the app</Text>
        </View>
      </View>
    </Modal>
  );
};

const App = () => {
  LogBox.ignoreAllLogs();
  const [toastVisible, setToastVisible] = useState(false);
  // useEffect(() => {
  //   const backAction = () => {
  //     if (toastVisible) {
  //       BackHandler.exitApp();
  //     } else {
  //       setToastVisible(true);
  //       exitTimer = setTimeout(() => setToastVisible(false), 3000);
  //     }
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );

  //   return () => {
  //     // backHandler.remove();
  //     // if (exitTimer) clearTimeout(exitTimer);
  //   };
  // }, [toastVisible]);

  let exitTimer = null;
  useEffect(() => {
    store.dispatch(getUserFromLocal());
    store.dispatch(getUserProfile());
    store.dispatch(getSavedAddress());
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
      <ExitToastModal
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </Provider>
  );
};
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 50,
    alignItems: 'center',
  },
  toastBox: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 8,
  },
  toastText: {
    color: '#fff',
    fontSize: 16,
  },
});
