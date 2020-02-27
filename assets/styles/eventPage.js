import { StyleSheet } from 'react-native';
import colors, { fonts } from './basicStyle';

const eventPage = StyleSheet.create({
  wholeContainer: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: colors.veryLightPurple.color
  },

  scroll: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    //may need to change--just looks super weird on my phone AJK
    marginTop: -30,
  },

  singleEventView: {
    borderRadius: 20,
    width: 390,
    height: 450,
    marginTop: '8%',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },

  backgroundImage: {
    borderRadius: 20,
    height: 450,
    width: '100%',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },

  title: {
    padding: 5,
    paddingLeft: 10,
    borderRadius: 10,
    justifyContent: 'center',
    width: '80%',
    backgroundColor: colors.deepPurple.color,
    marginTop: 10,
    marginLeft: 15,
  },

  rsvpCounts: {
    padding: 5,
    paddingLeft: 10,
    borderRadius: 10,
    width: '40%',
    backgroundColor: 'rgba(70, 81, 135, 0.6)',
    marginTop: 10,
    marginLeft: 15,
    flexDirection: 'row',
  },

  button: {
    color: colors.white.color,
  },

  eventAddButton: {
    marginBottom: 30,
    borderRadius: 20,
    backgroundColor: colors.deepPurple.color,
  },

  eventDetail: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  eventDetailImageContainer: {
    margin: 10,
    width: '95%',
    height: 'auto'
  },
  fullScreenEventImage: {
    width: '100%',
    height: '100%',
    opacity: 1,
    display: 'flex',
    flex: 1
  },

  eventDetailImage: {
    marginRight: 10,
    borderRadius: 20,
    width: '100%',
    height: 100,
    resizeMode: 'cover',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  opacity1: {
    opacity: 1
  },

  eventDetailTitle: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  eventDetailLogistics: {
    width: '100%',
    marginTop: 5,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  eventDetailDayTime: {
    marginLeft: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  eventDetailLocation: {
    marginLeft: 15,
  },

  eventDetailDescription: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 5,
    marginLeft: 15,
  },

  eventDetailDescriptionText: {
    marginLeft: 5,
    marginRight: 15
  },

  eventDetailMap: {
    marginTop: 10,
    width: 350,
    height: 120,
    borderRadius: 10
  },

  eventDetailRSVPContainer: {
    marginTop: 10,
    marginBottom: 30,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  eventDetailRSVP: {
    marginTop: 10,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: colors.turquoise.color,
  },

  eventDetailRSVPText: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    height: 25
  },

  viewOptionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 7,
    marginBottom: 5,
  },

  pressed: {
    borderRadius: 20,
    backgroundColor: colors.turquoise.color,
  },
  notPressed: {
    borderRadius: 20,
    backgroundColor: colors.white.color,
  },

  addEventContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 7,
    marginTop: 7,
  },

  eventButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 10,
    borderWidth: 2,
    height: 40,
    width: 120,
    padding: 5,
    marginBottom: 10,
    borderColor: colors.turquoise.color,
    borderRadius: 20,
  },

  addEventOpacity: {
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: colors.turquoise.color,
  },

  addEventText: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 25
  },
})

export default eventPage;
