import { StyleSheet } from 'react-native';
import colors from './basicStyle';

const chatList = StyleSheet.create({
  chatContainer: {
    top: 50,
  },
  listItem: {
    height: 100,
    width: '100%'
  },
  listItemPurple: {
    backgroundColor: colors.lessOpaquePurple.color,
  },
  listItemWhite: {
    backgroundColor: colors.white.color
  }
})

export default chatList;