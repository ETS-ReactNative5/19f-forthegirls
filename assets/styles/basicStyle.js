import { StyleSheet } from 'react-native';

const colors = StyleSheet.create({
  turquoise: {
    color: '#28C3A9'
  },
  deepPurple: {
    color: '#37415A'
  },
  black: {
    color: '#000'
  },
  white: {
    color: '#fff'
  },
  lightGrey: {
    color: '#F4F4F4'
  }
})

const fonts = StyleSheet.create({
  bodyText: {
    fontFamily: 'lato-regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 22,
  },
  minorHeading: {
    fontFamily: 'montserrat-medium',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: -0.05
  },
  majorHeading: {
    fontFamily: 'montserrat-semibold',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 35,
    lineHeight: 43
  }
})

const fontEffects = StyleSheet.create({
  bold: { fontWeight: 'bold' },
  italic: { fontStyle: 'italic' },
});

export default colors;
export { colors, fonts, fontEffects }