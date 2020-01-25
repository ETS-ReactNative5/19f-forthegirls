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
    height: 45,
    width: 45,
    padding: 5,
    borderColor: colors.red.color,
    borderRadius: 15,
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
  },
  loadmore: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 125,
    marginRight: 10,
    borderWidth: 2,
    borderColor: colors.lessOpaquePurple.color,
    borderRadius: 20,
    backgroundColor: colors.white.color,
    height: 30,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  arrowBack: {
    alignItems: 'flex-start',
    marginTop: 5,
    marginLeft: 5,
    marginBottom: 5
  },
  header: {
    flexDirection: 'row',
    backgroundColor: colors.veryLightPurple.color,
  },
  headerTextContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default chatList;
export { singleChat };