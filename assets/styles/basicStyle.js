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
  },
  veryLightPurple: {
    color: '#46518725'
  },
  red: {
    color: '#FF5252'
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
    lineHeight: 30
  }
})

const fontEffects = StyleSheet.create({
  bold: { fontWeight: 'bold' },
  italic: { fontStyle: 'italic' },
  center: { textAlign: 'center' }
});

const logo = StyleSheet.create({
  barContainer: {
    top: 30,
    backgroundColor: colors.deepPurple.color,
    height: 70,
    width: '100%'
  }
})

const buttons = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  signUpInButton: {
    display: 'flex',
    backgroundColor: colors.deepPurple.color,
    borderRadius: 20,
    height: 60,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center'
  },
  arrowView: {
    width: '100%',
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
    marginTop: 30
  }
})

export default colors;
export { colors, fonts, fontEffects, logo, buttons }
