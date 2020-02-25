import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

// Source: https://github.com/nirsky/react-native-scaling-example/blob/master/README.md
// Functinos to scale style so it works on any device

//Guideline sizes are based on standard iphone X screen mobile device
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const scale = size => width / guidelineBaseWidth * size;
const verticalScale = size => height / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) => size + ( scale(size) - size ) * factor;

export {scale, verticalScale, moderateScale};