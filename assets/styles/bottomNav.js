import { StyleSheet } from 'react-native';

const bottomNav = StyleSheet.create({
  backgroundcolor: {
    color: '#FFFFFF'
  },
  iconSelected: {
    color: '#28C3A9'
  },
  iconUnselected: {
    color: '#37415A'
  },
  bottomLayout: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 50,
    width: '100%'
  },
  topLayout: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '100%',
    top: -30,
    paddingLeft: 15,
    paddingRight: 15,
  },
  borderTop: {
    paddingTop: 5,
    paddingBottom: 5,
    borderTopColor: '#465087',
    borderTopWidth: 1
  }
})

export default bottomNav;
