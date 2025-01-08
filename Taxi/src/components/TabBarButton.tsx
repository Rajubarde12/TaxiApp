import React, {useEffect} from 'react';
import {Pressable, StyleProp, ViewStyle, View, Dimensions} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface TabBarButtonProps {
  onPress: () => void;
  isFocused: boolean;
  Icon: React.FC;
  style?: StyleProp<ViewStyle>;
}

const {width} = Dimensions.get('window');

const TabBarButton: React.FC<TabBarButtonProps> = ({
  onPress,
  isFocused,
  Icon,
  style,
}) => {
  const scale = useSharedValue(0);
  const rippleScale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1 : 0, {duration: 350});
  }, [isFocused, scale]);

  const handlePress = () => {
    rippleScale.value = 0;
    opacity.value = 1;
    rippleScale.value = withTiming(1.5, {duration: 400}, () => {
      opacity.value = withTiming(0);
    });
    onPress();
  };

  const AnimatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);
    const top = interpolate(scale.value, [0, 1], [0, 1]);
    return {
      transform: [{scale: scaleValue}],
      top: top,
    };
  });

  const rippleStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: rippleScale.value * width}],
      opacity: opacity.value,
    };
  });

  return (
    <Pressable
      onPress={handlePress}
      style={[
        style,
        {
          flex: 1,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        },
      ]}>
      <View style={{position: 'absolute', height: '100%', width: '100%'}}>
        <Animated.View
          style={[
            {
              position: 'absolute',
              backgroundColor: 'rgba(26, 255, 34, 0.1)',
              height: '100%',
              width: '100%',
              borderRadius: 50,
            },
            rippleStyle,
          ]}
        />
      </View>

      <Icon />
    </Pressable>
  );
};

export default TabBarButton;
