import {StyleSheet, View} from 'react-native';
import {colors} from '../../constants/colors';
import MapView from 'react-native-maps';
import DatePicker from 'react-native-date-picker';
import {useState} from 'react';
const ScheDuleRide = () => {
  const [date, setDate] = useState(new Date());
  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <MapView
        initialRegion={{
          latitude: 22.699026,
          longitude: 75.865311,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}
        style={{...StyleSheet.absoluteFillObject}}
      />
      <View
        style={{
          backgroundColor: '#fff',
          height: '60%',
          width: '100%',
          position: 'absolute',
          zIndex: 2,
          bottom: 0,
          elevation: 4,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}>
        <DatePicker
          dividerColor="#000"
          buttonColor="red"
          // style={{backgroundColor: 'red'}}
          date={date}
          onDateChange={setDate}
        />
      </View>
    </View>
  );
};

export default ScheDuleRide;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  datePickerStyle: {
    width: 300,
  },
});
