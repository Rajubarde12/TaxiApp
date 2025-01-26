import {StatusBar, View} from 'react-native';
import SplashScreen from './Screens/Splash';
import Root from './navigation';

const App = () => {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <Root />
    </>
  );
};
export default App;
