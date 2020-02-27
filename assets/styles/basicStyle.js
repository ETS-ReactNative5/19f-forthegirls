import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from './Style.js';

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
  darkGrey: {
    color: '#C4C4C4'
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
    fontSize: moderateScale(16),
    lineHeight: verticalScale(22),
  },
  minorHeading: {
    fontFamily: 'montserrat-semibold',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: moderateScale(17),
    lineHeight: verticalScale(22),
    letterSpacing: moderateScale(-0.1),
  },
  majorHeading: {
    fontFamily: 'montserrat-medium',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: moderateScale(25),
    lineHeight: verticalScale(30),
  }
})

const fontEffects = StyleSheet.create({
  bold: { fontWeight: 'bold' },
  italic: { fontStyle: 'italic' },
  center: { textAlign: 'center', alignItems: 'center' }
});

const logo = StyleSheet.create({
  barContainer: {
    backgroundColor: colors.deepPurple.color,
    height: 70,
    width: '100%'
  },
  logoText: {
    textAlign: 'center',
    flexDirection: 'column',
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center'
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
    marginLeft: 80
  },
  logInOutButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderWidth: 2,
    height: 40,
    width: 120,
    padding: 5,
    marginBottom: 10,
    borderColor: colors.turquoise.color,
    backgroundColor: colors.turquoise.color,
    borderRadius: 20,
  },
  logInButton: {
    marginLeft: 125
  },
  submitProfileButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginRight: 5,
    borderWidth: 2,
    height: 40,
    width: 75,
    padding: 5,
    marginBottom: 5,
    borderColor: colors.turquoise.color,
    backgroundColor: colors.turquoise.color,
    borderRadius: 20
  },
  matchDeleteButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    borderWidth: 2,
    height: 40,
    width: 120,
    padding: 5,
    borderColor: colors.turquoise.color,
    backgroundColor: colors.turquoise.color,
    borderRadius: 20,
  }

})

const profileImage = StyleSheet.create({
  basic: {
    width: 125,
    height: 125,
    borderRadius: 63,
    borderWidth: 3,
    borderColor: colors.deepPurple.color
  },
  edit: {
    width: 125,
    height: 125,
    borderRadius: 63,
    borderWidth: 3,
    borderColor: colors.turquoise.color
  },
  allChatsPage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: colors.turquoise.color,
    marginTop: 5,
    marginLeft: 5
  },
  singleChat: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.turquoise.color,
    margin: 5
  },
  eventConnection: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: colors.deepPurple.color
  },

})

const modal = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white.color,
    padding: 10,
    marginTop: 225,
    marginBottom: 225,
    marginLeft: 50,
    marginRight: 50,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: colors.deepPurple.color
  },
  errorText: {
    color: colors.deepPurple.color
  },
  closeButton: {
    alignSelf: 'flex-end'
  },
  eventContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.white.color,
    padding: 10,
    marginTop: 200,
    marginBottom: 200,
    marginLeft: 25,
    marginRight: 25,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: colors.deepPurple.color
  }
})

export default colors;
export { colors, fonts, fontEffects, logo, buttons, profileImage, modal }
