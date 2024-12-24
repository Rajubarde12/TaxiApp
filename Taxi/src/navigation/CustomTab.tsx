import React, { memo, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  LayoutChangeEvent,
  Dimensions,
  Platform,
  Keyboard,
} from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";


import TabBarButton from "../components/TabBarButton";
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { BookingTab, ChatTab, HomeTab, ProfileTab, WalletTab } from "../constants/svgIcons";
import { moderateScale } from "../utils/Scalling";
const { width } = Dimensions.get("window");
const TabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
 


  const Icon: Record<string, () => JSX.Element> = {
    Home: () => <HomeTab  />,
    Wallet: () => <WalletTab />,
    Chat: () => <ChatTab  />,
    Profile: () => <ProfileTab />,
    Bookings: () => <BookingTab  />,
  };

  const [dimentions, setDimentions] = useState({
    height: 20,
    with: 100,
  });
  const buttonWidth = dimentions.with / state.routes.length;
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      () => setKeyboardVisible(true)
    );

    const keyboardHideListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  const onTabBarLayout = (e: LayoutChangeEvent) => {
    setDimentions({
      height: e.nativeEvent.layout.height,
      with: e.nativeEvent.layout.width,
    });
  };
  const onTabBarLayout1 = (e: LayoutChangeEvent) => {
    setDimentions({
      height: e.nativeEvent.layout.height,
      with: e.nativeEvent.layout.width,
    });
  };
  const tabPositionX = useSharedValue(0);
  const animateStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: tabPositionX.value,
        },
      ],
    };
  });
  useEffect(() => {
    tabPositionX.value = withSpring(buttonWidth * state.index, {
      duration: 1500,
      mass: 20,
      damping: 5,
      stiffness: 1,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 5,
      reduceMotion: ReduceMotion.System,
    });
  }, [state.index]);
 
  return (
    <View onLayout={onTabBarLayout1}  style={[styles.conatiner]}>
      <View onLayout={onTabBarLayout}  style={styles.tab}>
        {/* <Animated.View
          style={[
            animateStyle,
            {
              backgroundColor: "#535353",
              borderRadius: 30,
              marginLeft: 2,
              height: dimentions.height - 16,
              width: buttonWidth - 5,
              position: "absolute",
              zIndex: 0,
            },
          ]}
        /> */}
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            // tabPositionX.value = withTiming(buttonWidth * index, {
            //   duration: 150,
            //   easing: Easing.linear,
            // });
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(
                route.name == "CartStack1" ? "CartStack" : route.name
              );
            }
          };

          return (
            <TabBarButton
            key={index.toString()}
              onPress={onPress}
              wishlist={
              0
              }
              cartQuantity={0}
              isFocused={isFocused}
              Icon={Icon[route.name] || (() => <Text>?</Text>)}
              lable={route.name}
            />
          );
        })}
      </View>
    </View>
  );
};

export default memo(TabBar);

const styles = StyleSheet.create({
  tab: {
   
    paddingTop:20,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center",
    flexDirection: "row",
    zIndex: 0,
    paddingBottom: 25,
    backgroundColor: 'white',  
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: -2 }, 
    shadowOpacity: 0.1,  
    shadowRadius: 5,  
    elevation: 10, 
    overflow: 'hidden', 
  },
  
 
});
