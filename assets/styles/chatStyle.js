import { StyleSheet } from 'react-native';
import colors from './basicStyle';
import { NavigationEvents } from 'react-navigation';

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
  },
  delete: {
    marginTop: 10,
    borderWidth: 2,
    height: 50,
    width: 50,
    padding: 5,
    borderColor: colors.red.color,
    backgroundColor: colors.white.color,
    borderRadius: 0,
    marginRight: 10
  }
});

const singleChat = StyleSheet.create({
  sender: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 140,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: colors.turquoise.color,
    height: 50,
    width: 225,
    paddingLeft: 10,
  },
  reciever: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 7,
    marginRight: 10,
    borderRadius: 20,
    width: 225,
    backgroundColor: colors.lightGrey.color,
    height: 50,
    paddingLeft: 10,
  }
})

export default chatList;
export { singleChat };