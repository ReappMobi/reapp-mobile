import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import {
  CircleCheck,
  CircleX,
  Database,
  RotateCcw,
  Save,
} from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ScreenContainer } from '@/components';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { useAuth } from '@/hooks/useAuth';
import { showToast } from '@/lib/toast-config';
import { DEFAULT_API_URL } from '@/services/api';

const API_URL_KEY = 'RNAuth_baseUrl';

export default function DevSettingsScreen() {
  const { signOut, isAdmin } = useAuth();
  const [baseUrl, setBaseUrl] = useState('');

  useEffect(() => {
    async function loadBaseUrl() {
      const storedUrl = await SecureStore.getItemAsync(API_URL_KEY);
      setBaseUrl(storedUrl || DEFAULT_API_URL);
    }
    loadBaseUrl();
  }, []);

  if (!isAdmin && !__DEV__) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Text>Acesso negado.</Text>
      </ScreenContainer>
    );
  }

  const handleSave = async () => {
    try {
      if (!baseUrl.trim()) {
        showToast({
          type: 'error',
          header: 'Erro',
          description: 'A URL não pode estar vazia.',
          icon: CircleX,
        });
        return;
      }

      await SecureStore.setItemAsync(API_URL_KEY, baseUrl.trim());

      showToast({
        type: 'success',
        header: 'Sucesso',
        description:
          'URL do backend atualizada. O app será deslogado para aplicar as mudanças.',
        icon: CircleCheck,
      });
      setTimeout(async () => {
        await signOut();
        router.replace('/welcome');
      }, 2000);
    } catch {
      showToast({
        type: 'error',
        header: 'Erro',
        description: 'Não foi possível salvar a URL.',
        icon: CircleX,
      });
    }
  };

  const handleReset = () => {
    setBaseUrl(DEFAULT_API_URL);
  };

  return (
    <ScreenContainer className="pt-6 px-6">
      <View className="flex-row items-center gap-2 mb-6">
        <Icon as={Database} size={24} className="text-primary" />
        <Text variant="h3">Configurações Dev</Text>
      </View>

      <View className="gap-y-6">
        <View className="gap-y-2">
          <Label nativeID="baseUrl">URL do Backend</Label>
          <Input
            aria-labelledby="baseUrl"
            placeholder="https://api.exemplo.com"
            value={baseUrl}
            onChangeText={setBaseUrl}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text variant="muted" className="text-xs">
            Alterar esta URL afetará todas as requisições do aplicativo.
          </Text>
        </View>

        <View className="flex-row gap-3">
          <Button className="flex-1 flex-row gap-2" onPress={handleSave}>
            <Icon as={Save} size={20} className="text-primary-foreground" />
            <Text>Salvar e Sair</Text>
          </Button>

          <Button
            variant="outline"
            className="flex-row gap-2"
            onPress={handleReset}
          >
            <Icon as={RotateCcw} size={20} className="text-foreground" />
            <Text>Resetar</Text>
          </Button>
        </View>
      </View>
    </ScreenContainer>
  );
}
