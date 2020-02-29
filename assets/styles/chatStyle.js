import { StyleSheet } from 'react-native';
import colors from './basicStyle';
import { NavigationEvents } from 'react-navigation';

const chatList = StyleSheet.create({
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    height: 70,
    width: '100%'
  },
  listItemPurple: {
    backgroundColor: colors.lessOpaquePurple.color,
  },
  listItemWhite: {
    backgroundColor: colors.white.color
  },
  username: {
    marginTop: 10,
    padding: 10
  },
  unreadUsername: {
    marginTop: 10,
    padding: 10,
    color: '#00FF00',
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
    marginRight: 10,
    flexDirection: 'row',
    position: 'absolute',
    marginLeft: 325,
    justifyContent: 'center'
  }
});

const singleChat = StyleSheet.create({
  sender: {
    padding: 3,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 140,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: colors.turquoise.color,
    height: 'auto',
    width: 225,
    paddingLeft: 10,
  },
  reciever: {
    padding: 3,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 7,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: colors.lightGrey.color,
    height: 'auto',
    width: 225,
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
    backgroundColor: colors.lightGrey.color,
  },
  headerTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  chatInputContainer: {
    flex: 1,
    marginTop: 'auto',
    justifyContent: 'flex-end',
    bottom: 0
  },
  chatInputMargin: {
    // figure this out!!
  },
  chatInputView: {
    flex: 1,
    margin: 5,
    marginBottom: 120,
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: colors.deepPurple.color,
    borderRadius: 20,
  },
  chatInput: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 7,
    marginRight: 10,
    height: 30,
    width: 300
  }
})

export default chatList;
export { singleChat };
