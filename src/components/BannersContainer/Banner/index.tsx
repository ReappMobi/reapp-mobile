import { View, Image, Text } from 'react-native';

export function Banner({ image, title }) {
  return (
    <View className="mr-1 w-screen bg-slate-600">
      <Image aria-label={title} source={{ uri: image }} />
      <Text>{image}</Text>
    </View>
  );
}
