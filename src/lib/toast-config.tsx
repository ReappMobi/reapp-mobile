import { LucideIcon } from 'lucide-react-native';
import Check from 'lucide-react-native/dist/esm/icons/check';
import { View } from 'react-native';
import type { ToastConfig, ToastShowParams } from 'react-native-toast-message';
import Toast from 'react-native-toast-message';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from './utils';

export const toastConfig: ToastConfig = {
  success: ({ text1, text2, props }) => (
    <View className="w-full items-center px-4">
      <Alert
        variant="default"
        icon={props.icon || Check}
        iconClassName="text-primary w-4 h-4"
        className={cn(props.className)}
      >
        {text1 && (
          <AlertTitle variant="h3" className="text-primary">
            {text1}
          </AlertTitle>
        )}

        {text2 && <AlertDescription variant="lead">{text2}</AlertDescription>}
      </Alert>
    </View>
  ),
  error: ({ text1, text2, props }) => (
    <View className="w-full items-center px-4">
      <Alert
        variant="destructive"
        icon={props.icon || Check}
        iconClassName="text-destructive w-4 h-4"
        className={cn(props.className)}
      >
        {text1 && (
          <AlertTitle variant="h3" className="text-destructive">
            {text1}
          </AlertTitle>
        )}

        {text2 && <AlertDescription variant="lead">{text2}</AlertDescription>}
      </Alert>
    </View>
  ),
};

type ShowToastProps = ToastShowParams & {
  type: 'error' | 'success' | 'info';
  header: string;
  description: string;
  visibilityTime?: number;
  icon: LucideIcon;
};
export const showToast = ({
  type,
  visibilityTime,
  header,
  description,
  icon,
  ...rest
}: ShowToastProps) => {
  Toast.show({
    visibilityTime,
    type,
    text1: header,
    text2: description,
    props: {
      icon,
    },
    ...rest,
  });
};
