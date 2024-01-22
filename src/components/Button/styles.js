import { StyleSheet } from 'react-native';

export const styles = (backgroundColor) =>
  StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      borderRadius: 6,
      backgroundColor,
    },

    content: {
      fontFamily: 'medium',
      fontSize: 16,
    },

    text: {
      backgroundColor: 'transparent',
    },

    contained: {
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      pressed: {
        opacity: 0.7,
      },
    },

    outlined: {
      borderWidth: 1,
      borderColor: backgroundColor,
      borderRadius: 6,
      backgroundColor: 'transparent',
      transition: 'all 0.3s ease-in-out',
      pressed: {
        opactiy: 0.5,
      },
    },

    sizes: {
      small: {
        padding: 8,
      },
      medium: {
        padding: 16,
      },
      large: {
        padding: 24,
      },
    },
  });
