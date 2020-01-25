import { StyleSheet } from 'react-native';
import colors, { fonts } from './basicStyle';

const modalStyle = StyleSheet.create({
  wholeModal: {
    height: '80%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: colors.veryLightPurple.color
  },

  scroll: {
    width: '100%',
    height: '30%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  hideModal: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.deepPurple.color,
    height: 40,
  },

  connectionText: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.deepPurple.color,
    height: 40,
  },
})

export default modalStyle;
