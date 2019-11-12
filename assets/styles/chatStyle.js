import { StyleSheet } from 'react-native';
import colors from './basicStyle';

const chatList = StyleSheet.create({
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    height: 70,
    width: '100%',
    justifyContent: 'space-between'
  },
  listItemPurple: {
    backgroundColor: colors.lessOpaquePurple.color,
  },
  listItemWhite: {
    backgroundColor: colors.white.color
  },
  username: {
    padding: 10
  },
  chatButton: {
    justifyContent: 'center',
    marginTop: 10,
    borderWidth: 2,
    height: 50,
    width: 90,
    padding: 5,
    borderColor: colors.turquoise.color,
    backgroundColor: colors.white.color,
    borderRadius: 20,
    marginRight: 10
  }
})

export default chatList;