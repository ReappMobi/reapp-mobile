import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { Image } from 'expo-image';
import { withLayoutContext } from 'expo-router';
import { memo, useMemo } from 'react';
import { Text, View } from 'react-native';
import { LoadingBox, ScreenContainer } from 'src/components';
import { useAuth } from 'src/hooks/useAuth';
import { useGetInstitutionByAccountId } from 'src/services/institutions/service';
import { IInstitution } from 'src/types';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

type HeaderProps = {
  institution: IInstitution | undefined;
  loading: boolean;
};

const Header = memo<HeaderProps>(({ institution, loading }) => {
  return (
    <View>
      <View className="mt-4 flex-row items-center gap-x-2 py-4">
        <Image
          className="h-16 w-16 rounded-full"
          source={institution?.account?.media?.remoteUrl || ''}
          placeholder={institution?.account?.media?.blurhash || ''}
          contentFit="cover"
          transition={500}
        />
        <View className="w-full flex-1 gap-y-0 pt-4">
          <Text className="font-bold text-lg">
            {institution?.account?.name || ''}
          </Text>
          {loading ? (
            <LoadingBox customStyle="h-2.5 w-20 mt-2 mb-3 rounded-md bg-slate-400" />
          ) : (
            <View>
              <Text className="text-md pb-2 font-medium">
                {institution?.category?.name || ''}
              </Text>
            </View>
          )}
        </View>
      </View>
      <View className="flex-row justify-center gap-x-2 py-4">
        <Text className="text-md font-medium">
          <Text className="text-md font-bold text-text_primary">
            {institution?.account?.followersCount || ''}
          </Text>
          {` Seguidores`}
        </Text>
      </View>
    </View>
  );
});

const Layout = () => {
  const auth = useAuth();
  const user = auth.user;

  const idNumber = user.id;

  const { data: institution, isLoading: loading } =
    useGetInstitutionByAccountId(idNumber);

  const renderLabel = useMemo(() => {
    return ({ children, focused }: { focused: boolean; children: string }) => (
      <Text
        className={`font-medium text-base text-text_neutral ${
          focused && 'text-text_primary underline'
        }`}
      >
        {children}
      </Text>
    );
  }, []);

  return (
    <ScreenContainer>
      <Header institution={institution} loading={loading} />

      {loading || !institution ? (
        <View>
          <LoadingBox customStyle="h-7 w-full mt-5 mb-3 rounded-md bg-slate-400" />
          {Array.from({ length: 3 }).map((_, index) => (
            <LoadingBox
              key={index}
              customStyle="h-56 w-full mb-2 rounded-md bg-slate-400 last:mb-0"
            />
          ))}
        </View>
      ) : (
        <MaterialTopTabs
          id={undefined}
          screenOptions={{
            tabBarScrollEnabled: true,
            tabBarBounces: true,
            tabBarPressColor: 'transparent',
            tabBarItemStyle: {
              width: 'auto',
              height: 'auto',
              paddingHorizontal: 0,
              marginRight: 16,
            },
            tabBarLabel: renderLabel,
            swipeEnabled: true,
            tabBarIndicator: () => null,
            tabBarStyle: {
              marginLeft: 0,
              backgroundColor: 'transparent',
              shadowColor: 'transparent',
            },
            lazy: true,
          }}
        >
          <MaterialTopTabs.Screen
            name="home-view"
            options={{ title: 'Início' }}
            initialParams={{ id: institution.id }}
          />
          <MaterialTopTabs.Screen
            name="projects"
            options={{ title: 'Projetos' }}
            initialParams={{ id: institution.id }}
          />
          <MaterialTopTabs.Screen
            name="contacts"
            options={{ title: 'Contatos' }}
            initialParams={{ institution }}
          />
          <MaterialTopTabs.Screen
            name="partners"
            options={{ title: 'Parceiros' }}
            initialParams={{ id: institution.id }}
          />
          <MaterialTopTabs.Screen
            name="collaborators"
            options={{ title: 'Colaboradores' }}
            initialParams={{ id: institution.id }}
          />
          <MaterialTopTabs.Screen
            name="volunteers"
            options={{ title: 'Voluntários' }}
            initialParams={{ id: institution.id }}
          />
        </MaterialTopTabs>
      )}
    </ScreenContainer>
  );
};

export default memo(Layout);
