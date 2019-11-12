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
    justifyContent: 'center',
    alignItems: 'center'
  },

  surveyHeader: {
    backgroundColor: colors.white.color,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
    borderRadius: 20,
    width: '90%'
  },

  surveyHeaderText: {
    color: colors.turquoise.color,
    alignItems: 'center',
    marginBottom: 10
  },

  csComponentHeader: {
    marginLeft: 10,
    justifyContent: 'center'
  }

})

export default surveyStyle;
