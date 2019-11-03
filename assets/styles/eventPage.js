import { StyleSheet } from 'react-native';

const eventPage = StyleSheet.create({
  wholeContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  scroll: {
    width:'100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  singleEventView: {
    borderRadius: 20,
    width: 400,
    height: 400,
    marginTop: '8%',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

  },

  backgroundImage: {
    borderRadius: 20,
    height: 400,
    width: '100%',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
})

export default eventPage;
