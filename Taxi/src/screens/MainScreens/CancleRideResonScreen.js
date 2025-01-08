import {
  FlatList,
  Modal,
  Pressable,
  StatusBar,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../constants/colors';
import Header from '../../components/Header';
import {moderateScale} from '../../utils/Scalling';
import CustomText from '../../components/CustomText';
import {fontSize} from '../../constants/fontSize';
import {CroshBlack, RadioUnifll, RadioYellow} from '../../constants/svgIcons';
import {useState} from 'react';
import fonts from '../../constants/fonts';
import Button from '../../components/Button';
const data = [
  {
    id: 1,
    title: 'Schedule Change',
  },
  {
    id: 2,
    title: 'Book Another Cab',
  },
  {
    id: 3,
    title: 'Found a better alternative',
  },
  {
    id: 4,
    title: 'Driver is taking too long',
  },
  {
    id: 5,
    title: 'My Reason is not listed',
  },
  {
    id: 6,
    title: 'Other',
  },
];

const CancleResonRideScreen = () => {
  const [selectedreason, setSelectedReson] = useState({
    id: 1,
    title: 'Schedule Change',
  });
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <Modal visible={visible}>
        {/* <StatusBar translucent={true} /> */}
        <View
          style={{
            flex: 1,
            backgroundColor: colors.Off_White,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              //   height: '25%',
              width: '90%',
              alignSelf: 'center',
              backgroundColor: '#fff',
              elevation: 2,
              borderRadius: 20,
              padding: moderateScale(30),
              alignItems: 'center',
              //   justifyContent: 'center',
            }}>
            <CustomText
              fontFamily={fonts.semi_bold}
              size={fontSize.Eighteen}
              style={{textAlign: 'center'}}>
              Cancel within 3 mins, otherwise pay cancellation fee
            </CustomText>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'space-between',
                marginTop: moderateScale(30),
              }}>
              <TouchableOpacity
                onPress={() => {
                  setVisible(false);
                }}
                style={{
                  width: '45%',
                  height: moderateScale(60),
                  backgroundColor: 'rgba(254, 203, 0,0.08)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 20,
                }}>
                <CustomText color={colors.yellow}>Skip</CustomText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setVisible(false);
                  setVisible2(true);
                }}
                style={{
                  width: '45%',
                  height: moderateScale(60),
                  backgroundColor: colors.yellow,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 20,
                }}>
                <CustomText>Cancel Ride</CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal visible={visible2} animationType="slide" transparent={true}>
        <View style={{flex: 1, backgroundColor: 'rgba(246, 246, 246,0.8)'}}>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              backgroundColor: colors.white,
              width: '100%',
              elevation: 5,
              height: moderateScale(450),
              alignItems: 'center',
              //   justifyContent: 'center',
              //   paddingTop: '5%',
            }}>
            <View
              style={{
                height: 3,
                width: '30%',
                alignSelf: 'center',
                backgroundColor: colors.inputBorder,
                marginTop: '2%',
                borderRadius: 1,
              }}
            />
            <View style={{height: '5%'}} />
            <Pressable
              style={{
                backgroundColor: colors.yellow,
                height: 50,
                width: 50,
                borderRadius: 25,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <CroshBlack height={20} width={20} />
            </Pressable>
            <CustomText
              fontFamily={fonts.semi_bold}
              size={fontSize.Eighteen}
              mTop={moderateScale(20)}>
              Booking Cancelled Successfully
            </CustomText>
            <CustomText
              style={{textAlign: 'center'}}
              color={colors.grey}
              size={fontSize.Fourteen}
              mTop={moderateScale(20)}>
              Your booking with CRN : #854HG23has been cancelled successfully.
            </CustomText>
            <View style={{height: '20%'}} />
            <Button
              onPress={() => {
                setVisible2(false);
              }}
              title={'Got It'}
            />
          </View>
        </View>
      </Modal>
      <Header map={true} title="Cancel Reason" />
      <View style={{paddingHorizontal: moderateScale(30), flex: 1}}>
        <CustomText
          size={fontSize.Fifteen}
          color={colors.grey}
          mTop={moderateScale(50)}>
          Please select the reason for cancellations:
        </CustomText>
        <View>
          <FlatList
            data={data}
            contentContainerStyle={{
              paddingTop: moderateScale(30),
              // borderWidth: 1,
            }}
            renderItem={({item, index}) => {
              const selected = selectedreason.id === item?.id;
              return (
                <Pressable
                  onPress={() => setSelectedReson(item)}
                  style={{
                    paddingVertical: moderateScale(5),
                    marginVertical: moderateScale(5),
                    flexDirection: 'row',
                    alignItems: 'center',
                    //   justifyContent: 'space-between',
                    //   borderWidth: 1,
                  }}>
                  {selected ? <RadioYellow /> : <RadioUnifll />}
                  <CustomText
                    color={colors.black}
                    size={fontSize.Seventeen}
                    style={{marginLeft: 10}}>
                    {item.title}
                  </CustomText>
                </Pressable>
              );
            }}
          />
        </View>
        {selectedreason.title == 'Other' ? (
          <>
            <CustomText
              size={fontSize.Eighteen}
              fontFamily={fonts.semi_bold}
              mTop={moderateScale(30)}>
              Other
            </CustomText>
            <View
              style={{
                height: moderateScale(200),
                borderWidth: 1,
                marginTop: moderateScale(5),
                borderColor: colors.inputBorder,
                borderRadius: 20,
                paddingHorizontal: '2%',
              }}>
              <TextInput
                style={{fontFamily: fonts.semi_bold, color: colors.black}}
                multiline
                placeholder="Enter Your Reason"
                placeholderTextColor={colors.grey}
              />
            </View>
          </>
        ) : null}
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          backgroundColor: colors.white,
          width: '100%',
          elevation: 5,
          height: '10%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Button
          onPress={() => {
            setVisible(true);
          }}
          title={'Cancel Ride'}
        />
      </View>
    </View>
  );
};
export default CancleResonRideScreen;
