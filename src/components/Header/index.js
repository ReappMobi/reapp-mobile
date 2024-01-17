import { View, StyleSheet } from 'react-native';

export default function Header({
  leftComponent,
  rightComponent,
  centerComponent,
  color,
}) {
  return (
    <View style={styles({ color }).container}>
      {leftComponent || <View />}
      {centerComponent || <View />}
      {rightComponent || <View />}
    </View>
  );
}

const styles = (props) =>
  StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: props.color || 'transparent',
      padding: 16,
      minHeight: 56,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });
