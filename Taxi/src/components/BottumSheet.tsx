import React, {ReactNode} from 'react';
import {
  Modal,
  StyleSheet,
  Pressable,
  ScrollView,
  ScrollViewProps,
  ViewStyle,
  StyleProp,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import NView from './NView';
interface BottomSheetWrapperProps {
  containerStyle?: StyleProp<ViewStyle>;
  backdropStyle?: StyleProp<ViewStyle>;
  onBackdropPress?: () => void;
  isVisible?: boolean;
  modalProps?: any;
  children?: ReactNode;
  scrollViewProps?: ScrollViewProps;
}
export const BottomSheetWrapperComponent: React.FC<BottomSheetWrapperProps> = ({
  containerStyle,
  backdropStyle,
  onBackdropPress = () => null,
  isVisible = false,
  modalProps = {},
  children,
  scrollViewProps = {},
  ...rest
}) => {
  return (
    <Modal
      animationType="slide"
      onRequestClose={onBackdropPress}
      transparent={true}
      visible={isVisible}
      {...modalProps}>
      <Pressable
        onPress={onBackdropPress}
        style={[StyleSheet.absoluteFill, backdropStyle]}
        testID="RNE__Overlay__backdrop"
      />

      <SafeAreaView
        style={StyleSheet.flatten([
          styles.safeAreaView,
          containerStyle && containerStyle,
        ])}
        pointerEvents="box-none"
        {...rest}>
      
      </SafeAreaView>
    </Modal>
  );
};
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    flexDirection: 'column-reverse',
  },
});
// BottomSheet.displayName = 'BottomSheet';
