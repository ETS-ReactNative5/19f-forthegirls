import { StyleSheet } from 'react-native';
import colors, { fonts } from './basicStyle';

const promptStyle = StyleSheet.create({
  promptBox: {
    backgroundColor: colors.white.color,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.25,
    borderRadius: 20,
    width: 300,
    padding: 10,
    paddingTop: 5,
    marginTop: 5,
    marginBottom: 5
  },
  promptContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%'
  },
  promptAnswer: {
    paddingLeft: 15
  }
});

const profile = StyleSheet.create({
  profileContainer: {
    flexDirection: 'column',
    width: '95%',
    backgroundColor: colors.lightGrey.color
  },
  nameHeading: {
    flexDirection: 'row'
  },
  age: {
    fontSize: 35
  },
  basicInfo: {
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  jobStuff: {
    flexDirection: 'column',
    alignItems: 'flex-end'
  }
});

export default profile;
export { profile, promptStyle }