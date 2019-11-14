import { StyleSheet } from 'react-native';
import colors, { fonts } from './basicStyle';

const promptStyle = StyleSheet.create({
  promptBox: {
    backgroundColor: colors.white.color,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.25,
    borderRadius: 20,
    width: 325,
    padding: 10,
    paddingTop: 5,
    marginTop: 5,
    marginBottom: 5
  },
  promptContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
  promptAnswer: {
    paddingLeft: 15
  }
});

const profile = StyleSheet.create({
  profileContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: colors.lightGrey.color,
    borderRadius: 20,
    margin: 10
  },
  basicInfoLeft: {
    flexDirection: 'column'
  },
  nameHeading: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  age: {
    fontSize: 30
  },
  basicInfo: {
    paddingTop: 5,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  jobStuff: {
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  dimmed: {
    opacity: 0.2
  },
  normal: {
    opacity: 1
  },
  match: {
    borderWidth: 10,
    borderColor: colors.turquoise.color
  }
});

const buttons = StyleSheet.create({
  yesNoContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default profile;
export { profile, promptStyle, buttons }