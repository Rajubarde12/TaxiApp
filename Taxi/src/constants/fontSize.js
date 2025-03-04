import {Dimensions} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
const calculateFontSize = baseSize => moderateScale(baseSize * 0.7);

export const fontSize = {
  Six: calculateFontSize(6),
  Seven: calculateFontSize(7),
  Eight: calculateFontSize(8),
  Nine: calculateFontSize(9),
  Ten: calculateFontSize(10),
  Eleven: calculateFontSize(11),
  Twelve: calculateFontSize(12),
  Thirteen: calculateFontSize(13),
  Fourteen: calculateFontSize(14),
  Fifteen: calculateFontSize(15),
  Sixteen: calculateFontSize(16),
  Seventeen: calculateFontSize(17),
  Eighteen: calculateFontSize(18),
  Nineteen: calculateFontSize(19),
  Twenty: calculateFontSize(20),
  TwentyOne: calculateFontSize(21),
  TwentyTwo: calculateFontSize(22),
  TwentyThree: calculateFontSize(23),
  TwentyFour: calculateFontSize(24),
  TwentyFive: calculateFontSize(25),
};
