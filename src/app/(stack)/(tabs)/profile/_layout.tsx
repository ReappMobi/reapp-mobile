import { ActivityIndicator } from 'react-native';

import { ScreenContainer } from '@/components';
import { InstitutionHeader } from '@/components/app/institution/institution-header';
import { MaterialTopTabs, TopTabs } from '@/components/ui/top-tab';
import { useAuth } from '@/hooks/useAuth';
import { THEME } from '@/lib/theme';
import { useGetInstitutionByAccountId } from '@/services/institution/institution.service';

export default function Layout() {
  const { user } = useAuth();
  const idNumber = user?.id;

  const { data: institution, isLoading: loading } =
    useGetInstitutionByAccountId(idNumber);

  if (loading) {
    return (
      <ScreenContainer className="items-cente justify-center">
        <ActivityIndicator size="large" color={THEME.light.primary} />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="gap-y-4">
      <InstitutionHeader institution={institution} loading={loading} isMe />
      <TopTabs>
        <MaterialTopTabs.Screen
          name="home-view"
          options={{ title: 'Início' }}
          initialParams={{ id: institution?.id, isMe: true }}
        />
        <MaterialTopTabs.Screen
          name="projects"
          options={{ title: 'Projetos' }}
          initialParams={{ id: institution?.id, isMe: true }}
        />
        <MaterialTopTabs.Screen
          name="partners"
          options={{ title: 'Parceiros' }}
          initialParams={{ id: institution?.id, isMe: true }}
        />
        <MaterialTopTabs.Screen
          name="collaborators"
          options={{ title: 'Colaboradores' }}
          initialParams={{ id: institution?.id, isMe: true }}
        />
        <MaterialTopTabs.Screen
          name="volunteers"
          options={{ title: 'Voluntários' }}
          initialParams={{ id: institution?.id, isMe: true }}
        />
      </TopTabs>
    </ScreenContainer>
  );
}
