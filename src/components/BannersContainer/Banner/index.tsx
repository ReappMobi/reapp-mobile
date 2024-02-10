import { View, Image } from 'react-native';

export function Banner({ image, title }) {
  return (
    <View className="mr-1 h-56 w-screen bg-slate-600">
      <Image className="h-full w-full" source={{ uri: image }} />
    </View>
  );
}
