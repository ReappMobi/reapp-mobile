import { ActivityIndicator, Modal, View } from 'react-native';
import { cn } from '@/lib/utils';

interface LoadingOverlayProps {
  visible: boolean;
  className?: string;
}

export function LoadingOverlay({ visible, className }: LoadingOverlayProps) {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View
        className={cn(
          'flex-1 items-center justify-center bg-black/50',
          className
        )}
      >
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    </Modal>
  );
}
