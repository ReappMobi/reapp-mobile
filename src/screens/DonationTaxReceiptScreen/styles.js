import { StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: 'bold',
    fontSize: 24,
    textTransform: 'uppercase',
    color: Colors.color_primary,
  },

  main: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    paddingTop: 64,
  },

  buttons: {
    gap: 10,
  },
});
