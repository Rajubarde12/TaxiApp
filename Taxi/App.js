import {NavigationContainer} from '@react-navigation/native';
import MyStack from './src/navigation';
import {StatusBar} from 'react-native';

const App = () => {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </>
  );
};
export default App;
