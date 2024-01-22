import { StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: 'bold',
    fontSize: 24,
    textTransform: 'uppercase',
    color: Colors.text_light,
  },

  rootContainer: {
    flex: 1,
  },

  mainContainer: {
    flex: 7,
    backgroundColor: Colors.color_primary,
  },

  infoContainer: {
    flex: 6,
    backgroundColor: Colors.color_white,
  },

  illustrate: {
    alignItems: 'center',
    marginTop: 16,
  },

  thanksText: {
    marginTop: 16,
    fontSize: 20,
    fontFamily: 'bold',
    color: Colors.text_light,
    textAlign: 'center',
  },

  infoTexts: {
    gap: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  dateText: {
    fontFamily: 'medium',
    fontSize: 16,
    color: Colors.text_gray,
  },

  nameText: {
    fontFamily: 'bold',
    fontSize: 20,
    color: Colors.text_neutral,
  },

  valueText: {
    fontFamily: 'regular',
    fontSize: 20,
    color: Colors.text_neutral,
  },
});
