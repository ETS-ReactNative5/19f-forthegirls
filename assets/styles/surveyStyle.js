import { StyleSheet } from 'react-native';
import colors from './basicStyle';

const surveyStyle = StyleSheet.create({
  itemBasicStyle: {
    backgroundColor: colors.white.color,
    borderWidth: 2,
    borderRadius: 20,
    margin: 10,
    overflow: 'hidden',
    padding: 12
  },
  itemTextBasic: {
    textAlign: 'center'
  },
  pressed: {
    borderColor: colors.turquoise.color,
    color: colors.turquoise.color
  },
  notPressed: {
    borderColor: colors.deepPurple.color,
    color: colors.deepPurple.color,
  },
  items: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly'
  },

  textField: {
    borderRadius: 20,
  },

  surveyHeaderContainer: {
    backgroundColor: colors.veryLightPurple.color,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  surveyHeader: {
    backgroundColor: colors.white.color,
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    width: '90%'
  },

  surveyHeaderText: {
    color: colors.turquoise.color,
    alignItems: 'center',
    marginBottom: 5
  },

  textField: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 7,
    marginRight: 10,
    borderWidth: 2,
    borderColor: colors.deepPurple.color,
    borderRadius: 20,
    backgroundColor: colors.white.color,
    height: 50,
    paddingLeft: 10,
  },

  csComponentHeader: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitButton: {
    marginTop: 30,
    borderWidth: 2,
    height: 70,
    width: 250,
    padding: 10,
    borderColor: colors.white.color,
    backgroundColor: colors.turquoise.color,
    borderRadius: 20
  },

  surveyBackground: {
    paddingLeft: 5,
    height: '100%',
    display: 'flex',
    backgroundColor: colors.veryLightPurple.color
  }


})

export default surveyStyle;
