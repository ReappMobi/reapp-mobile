import { useLocalSearchParams } from 'expo-router';

import { LoadingBox, ScreenContainer } from '@/components';
import { InstitutionHeader } from '@/components/app/institution/institution-header';
import { Text } from '@/components/ui/text';
import { MaterialTopTabs, TopTabs } from '@/components/ui/top-tab';
import { useAuth } from '@/hooks/useAuth';
import { useGetInstitutionByAccountId } from '@/services/institution/institution.service';

export default function Layout() {
  const params = useLocalSearchParams();
  const { id } = params;
  const { user } = useAuth();
  const idNumber = Number(id);

  const {
    data: institution,
    isLoading: loading,
    isError,
  } = useGetInstitutionByAccountId(idNumber);

  const isMe = user?.id === idNumber;

  if (loading) {
    return (
      <ScreenContainer>
        <LoadingBox customStyle="h-7 w-full mt-5 mb-3 rounded-md bg-slate-400" />
      </ScreenContainer>
    );
  }

  if (isError || !institution) {
    return (
      <ScreenContainer>
        <Text>Não foi possível carregar a instituição.</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="gap-y-4">
      <InstitutionHeader
        institution={institution}
        loading={loading}
        isMe={isMe}
      />
      <TopTabs>
        <MaterialTopTabs.Screen
          name="home"
          options={{ title: 'Início' }}
          initialParams={{ id: institution.id, isMe }}
        />
        <MaterialTopTabs.Screen
          name="projects"
          options={{ title: 'Projetos' }}
          initialParams={{ id: institution.id, isMe }}
        />
        <MaterialTopTabs.Screen
          name="partners"
          options={{ title: 'Parceiros' }}
          initialParams={{ id: institution.id, isMe }}
        />
        <MaterialTopTabs.Screen
          name="collaborators"
          options={{ title: 'Colaboradores' }}
          initialParams={{ id: institution.id, isMe }}
        />
        <MaterialTopTabs.Screen
          name="volunteers"
          options={{ title: 'Voluntários' }}
          initialParams={{ id: institution.id, isMe }}
        />
      </TopTabs>
    </ScreenContainer>
  );
}
