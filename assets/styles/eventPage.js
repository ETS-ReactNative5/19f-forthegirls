import { StyleSheet } from 'react-native';
import colors, { fonts } from './basicStyle';

const eventPage = StyleSheet.create({
  wholeContainer: {
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
    borderRadius: 10,
    width: '80%',
    backgroundColor: 'rgba(40, 195, 169, 0.6)',
    marginTop: 10,
    marginLeft: 10,
  },

  titleMargin: {
    marginLeft: 10,
  },

  date: {
    borderRadius: 10,
    width: '40%',
    backgroundColor: 'rgba(70, 81, 135, 0.6)',
    marginTop: 10,
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  button: {
    color: colors.white.color,
  },

  eventAddButton: {
    marginBottom: 30,
    borderRadius: 20,
    backgroundColor: "#37415A",
  },

  eventDetail: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  eventDetailImage: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 20,
    height: "30%",
    width: "90%",
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },

  eventDetailTitleBox: {
    borderRadius: 20,
    width: '90%',
    backgroundColor: 'rgb(40, 195, 169)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  eventDetailTitle: {
    marginTop: 10,
    marginBottom: 10,
  },
  eventDetailLogistics: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventDetailDayTime: {
    marginLeft: 35,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  eventDetailLocation: {
    marginRight: 35,
  },

  eventDetailDescription: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 30,
  },

  eventDetailDescriptionText: {
    marginLeft: 40,
  },

  eventDetailRSVPContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  eventDetailRSVP: {
    marginTop: 230,
    borderRadius: 20,
    backgroundColor: "#37415A",
  },

  eventDetailRSVPText: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  },
})

export default eventPage;
