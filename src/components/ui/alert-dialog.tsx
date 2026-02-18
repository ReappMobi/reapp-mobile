import * as React from 'react';
import { Modal, Pressable, View } from 'react-native';
import { Button, type ButtonProps } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

type AlertDialogContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const AlertDialogContext = React.createContext<AlertDialogContextType>({
  open: false,
  setOpen: () => {},
});

function AlertDialog({
  children,
  open: controlledOpen,
  onOpenChange,
}: {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = React.useCallback(
    (value: boolean) => {
      if (isControlled) {
        onOpenChange?.(value);
      } else {
        setUncontrolledOpen(value);
      }
    },
    [isControlled, onOpenChange]
  );

  return (
    <AlertDialogContext.Provider value={{ open, setOpen }}>
      {children}
    </AlertDialogContext.Provider>
  );
}

function AlertDialogTrigger({
  children,
  asChild,
  ...props
}: {
  children: React.ReactNode;
  asChild?: boolean;
} & React.ComponentProps<typeof Pressable>) {
  const { setOpen } = React.useContext(AlertDialogContext);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onPress: () => setOpen(true),
    });
  }

  return (
    <Pressable onPress={() => setOpen(true)} {...props}>
      {children}
    </Pressable>
  );
}

function AlertDialogContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { open, setOpen } = React.useContext(AlertDialogContext);

  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={() => setOpen(false)}
      statusBarTranslucent
    >
      <View className="flex-1 items-center justify-center bg-black/50 px-6">
        <View
          className={cn(
            'w-full rounded-2xl bg-background p-6 shadow-lg',
            className
          )}
        >
          {children}
        </View>
      </View>
    </Modal>
  );
}

function AlertDialogHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <View className={cn('mb-4 gap-2', className)}>{children}</View>;
}

function AlertDialogTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Text variant="large" className={cn(className)}>
      {children}
    </Text>
  );
}

function AlertDialogDescription({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Text variant="muted" className={cn(className)}>
      {children}
    </Text>
  );
}

function AlertDialogFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <View className={cn('mt-4 flex-row justify-end gap-3', className)}>
      {children}
    </View>
  );
}

function AlertDialogAction({
  children,
  onPress,
  className,
  variant = 'default',
  ...props
}: ButtonProps & { onPress?: () => void }) {
  const { setOpen } = React.useContext(AlertDialogContext);

  return (
    <Button
      variant={variant}
      className={cn(className)}
      onPress={() => {
        onPress?.();
        setOpen(false);
      }}
      {...props}
    >
      {children}
    </Button>
  );
}

function AlertDialogCancel({
  children,
  className,
  ...props
}: ButtonProps) {
  const { setOpen } = React.useContext(AlertDialogContext);

  return (
    <Button
      variant="outline"
      className={cn(className)}
      onPress={() => setOpen(false)}
      {...props}
    >
      {children ?? <Text>Cancelar</Text>}
    </Button>
  );
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
};
