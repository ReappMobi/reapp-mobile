import { StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
  SignUpSplash: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 30,
    padding: 16,
    backgroundColor: Colors.color_white,
  },

  header: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },

  title: {
    color: Colors.text_primary,
    fontFamily: 'bold',
    fontSize: 24,
  },

  main: {
    gap: 32,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },

  AccountTypeForm: {
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  introduceText: {
    fontFamily: 'bold',
    fontSize: 16,
    color: Colors.text_dark,
  },

  buttons: {
    gap: 16,
    width: 250,
  },
});
