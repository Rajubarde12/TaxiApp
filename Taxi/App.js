import {NavigationContainer} from '@react-navigation/native';
import MyStack from './src/navigation';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/redux';

const App = () => {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Provider store={store}>
        <NavigationContainer>
          <MyStack />
        </NavigationContainer>
      </Provider>
    </>
  );
};
export default App;
