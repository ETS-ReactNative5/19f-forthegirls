import { Dimensions } from 'react-native';

//Got code from Dali help on how to scale on different phones

const {width, height} = Dimensions.get('window');

const guidelineBaseWidth = 350;

const scale = size => (width/guidelineBaseWidth) * size;

export {scale};