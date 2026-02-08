import { router } from 'expo-router';
import CircleCheck from 'lucide-react-native/dist/esm/icons/circle-check';
import CircleX from 'lucide-react-native/dist/esm/icons/circle-x';
import Trash2 from 'lucide-react-native/dist/esm/icons/trash-2';
import { useState } from 'react';
import { View } from 'react-native';
import { useAuth } from 'src/hooks/useAuth';
import { ScreenContainer } from '@/components';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { showToast } from '@/lib/toast-config';
import { useDeleteAccount } from '@/services/account/account.service';

export default function SettingsScreen() {
  const { signOut, user } = useAuth();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [confirmText, setConfirmText] = useState('');

  const { mutate: deleteAccountMutate, isPending } = useDeleteAccount({
    onSuccess: async () => {
      await signOut();
      router.replace('/welcome');
    },
    onError: () => {
      showToast({
        type: 'error',
        header: 'Erro',
        description:
          'Não foi possível excluir sua conta. Tente novamente mais tarde.',
        icon: CircleX,
      });
    },
  });

  const handleDeletePress = () => {
    setConfirmText('');
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (confirmText !== 'EXCLUIR') {
      showToast({
        type: 'error',
        header: 'Erro',
        description: 'Texto de confirmação incorreto.',
        icon: CircleX,
      });
      return;
    }
    deleteAccountMutate({ accountId: user.id });
  };

  return (
    <ScreenContainer className="pt-6">
      <Text variant="large" className="mb-6">
        Conta
      </Text>

      <Button
        variant="ghost"
        className="flex-row items-center justify-start gap-3 px-0"
        onPress={handleDeletePress}
      >
        <Icon as={Trash2} size={22} className="text-destructive" />
        <Text className="text-destructive text-base font-medium">
          Excluir minha conta
        </Text>
      </Button>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir conta</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir sua conta? Esta ação não pode ser
              desfeita. Digite EXCLUIR para confirmar.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Input
            placeholder="Digite EXCLUIR"
            placeholderTextColor="#9ca3af"
            value={confirmText}
            onChangeText={setConfirmText}
            autoCapitalize="characters"
          />
          <AlertDialogFooter>
            <AlertDialogCancel>
              <Text>Cancelar</Text>
            </AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onPress={handleDeleteConfirm}
              disabled={isPending}
            >
              <Text>Excluir</Text>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ScreenContainer>
  );
}
