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
    fontSize: 16,
    lineHeight: 22,
  },
  minorHeading: {
    fontFamily: 'montserrat-semibold',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 17,
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
    marginTop: 30
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
    borderRadius: 20
  },
  logInButton: {
    marginLeft: 125
  },
  submitProfileButton: {
    marginLeft: 100
  }

})

const profileImage = StyleSheet.create({
  basic: {
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
  }
})

const modal = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white.color,
    padding: 10,
    marginTop: 300,
    marginBottom: 300,
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
})

export default colors;
export { colors, fonts, fontEffects, logo, buttons, profileImage, modal }
