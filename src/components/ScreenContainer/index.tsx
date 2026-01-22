import { SafeAreaView } from 'react-native-safe-area-context';

export default function ScreenContainer({ children }) {
  return (
    <SafeAreaView className="flex-1 bg-background p-4">{children}</SafeAreaView>
  );
}
