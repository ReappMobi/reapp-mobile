import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap,
} from '@react-navigation/material-top-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { Image } from 'expo-image';
import { withLayoutContext } from 'expo-router';
import { memo, useMemo, useState } from 'react';
import { View, Text } from 'react-native';
import { ScreenContainer, LoadingBox } from 'src/components';
import { useAuth } from 'src/hooks/useAuth';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const blurhash: string =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

type HeaderProps = {
  institution: any;
  loading: boolean;
  category: string | null;
};

const Header = memo<HeaderProps>(({ institution, loading }) => {
  return (
    <View>
      <View className="mt-4 flex-row items-center space-x-2 py-4">
        <Image
          className="h-16 w-16 rounded-full"
          source={institution ? institution.avatar : ''}
          placeholder={blurhash}
          contentFit="cover"
          transition={500}
        />
        <View className="w-full flex-1 space-y-0 pt-4">
          <Text className="font-reapp_bold text-lg">
            {institution ? institution.name : ''}
          </Text>
          {loading ? (
            <LoadingBox customStyle="h-2.5 w-20 mt-2 mb-3 rounded-md bg-slate-400" />
          ) : (
            <View>
              <Text className="text-md pb-2 font-reapp_medium">
                {institution ? institution.category : ''}
              </Text>
              <Text className="text-md pb-2 font-reapp_medium">
                {institution ? `${institution.city}/${institution.state}` : ''}
              </Text>
            </View>
          )}
        </View>
      </View>
      <View className="flex-row justify-center space-x-2 py-4">
        <Text className="text-md font-reapp_medium">
          <Text className="text-md font-reapp_bold text-text_primary">
            {institution ? institution.followers_count : ''}
          </Text>
          {` Seguidores`}
        </Text>
        <Text className="text-md font-reapp_medium">
          <Text className="text-md font-reapp_bold text-text_primary">
            {institution ? institution.donations : ''}
          </Text>
          {` Doações`}
        </Text>
        {/*
        <Text className="text-md font-reapp_medium">
          <Text className="text-md font-reapp_bold text-text_primary">
            {institution ? institution.partnersQty : ''}
          </Text>
          {` Parceiros`}
        </Text>
        */}
      </View>
    </View>
  );
});

const Layout = () => {
  const { user } = useAuth();

  const idNumber = user.id;

  const [institution] = useState(user);
  const [category] = useState<string | null>(null);
  const [loading] = useState<boolean>(false);

  const renderLabel = useMemo(() => {
    return ({ children, focused }: { focused: boolean; children: string }) => (
      <Text
        className={`font-reapp_medium text-base text-text_neutral ${
          focused && 'text-text_primary underline'
        }`}
      >
        {children}
      </Text>
    );
  }, []);

  return (
    <ScreenContainer>
      <Header institution={institution} loading={loading} category={category} />

      {loading ? (
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
          screenOptions={{
            tabBarScrollEnabled: true,
            tabBarBounces: true,
            tabBarPressColor: 'transparent',
            tabBarItemStyle: {
              width: 'auto',
              height: 'auto',
              paddingHorizontal: 0,
              marginRight: 8,
            },
            tabBarLabel: renderLabel,
            swipeEnabled: true,
            tabBarIndicator: () => null,
            tabBarStyle: {
              marginLeft: 16,
              backgroundColor: 'transparent',
              shadowColor: 'transparent',
            },
            lazy: true,
          }}
        >
          <MaterialTopTabs.Screen
            name="home-view"
            options={{ title: 'Início' }}
            initialParams={{ id: idNumber }}
          />
          <MaterialTopTabs.Screen
            name="projects"
            options={{ title: 'Projetos' }}
            initialParams={{ id: idNumber }}
          />
          <MaterialTopTabs.Screen
            name="transparency"
            options={{ title: 'Transparência' }}
            initialParams={{ id: idNumber }}
          />
          <MaterialTopTabs.Screen
            name="contacts"
            options={{ title: 'Contatos' }}
            initialParams={{ institution }}
          />
          <MaterialTopTabs.Screen
            name="partners"
            options={{ title: 'Parceiros' }}
            initialParams={{ id: idNumber }}
          />
          <MaterialTopTabs.Screen
            name="collaborators"
            options={{ title: 'Colaboradores' }}
            initialParams={{ id: idNumber }}
          />
          <MaterialTopTabs.Screen
            name="volunteers"
            options={{ title: 'Voluntários' }}
            initialParams={{ id: idNumber }}
          />
        </MaterialTopTabs>
      )}
    </ScreenContainer>
  );
};

export default memo(Layout);
