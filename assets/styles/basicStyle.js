import { StyleSheet } from 'react-native';

const colors = StyleSheet.create({
  turquoise: {
    color: '#28C3A9'
  },
  deepPurple: {
    color: '#37415A'
  },
  lessOpaquePurple: {
    color: 'rgba(70, 81, 135, 0.25)'
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
    fontFamily: 'montserrat-semibold',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: -0.05
  },
  majorHeading: {
    fontFamily: 'montserrat-medium',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 25,
    lineHeight: 43
  }
})

const fontEffects = StyleSheet.create({
  bold: { fontWeight: 'bold' },
  italic: { fontStyle: 'italic' },
});

const logo = StyleSheet.create({
  barContainer: {
    top: 30,
    backgroundColor: colors.deepPurple.color,
    height: 70,
    width: '100%'
  }
})

export default colors;
export { colors, fonts, fontEffects, logo }
