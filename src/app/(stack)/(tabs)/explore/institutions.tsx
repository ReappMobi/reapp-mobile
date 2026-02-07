import { router } from 'expo-router';
import { FlatList, RefreshControl, SectionList, View } from 'react-native';
import { LoadingBox, ScreenContainer } from 'src/components';
import { useGetInstitutions } from 'src/services/account/account.service';
import { ExploreInstitutionCard } from '@/components/app/explore/explore-card';
import { ExplorerLoadingPlaceholder } from '@/components/app/explore/explore-loading-placeholder';
import { ExploreSearchItem } from '@/components/app/explore/explore-search-item';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { useSearch } from '@/hooks/use-search';
import { THEME } from '@/lib/theme';

export default function Page() {
  const {
    data: institutions = [],
    isLoading: isLoadingInstitutions,
    refetch,
    isPending,
  } = useGetInstitutions();
  const { isSearchActive, searchQuery } = useSearch();

  const categories = Array.from(
    new Map(
      institutions.map((inst) => [
        inst.category.id,
        { id: inst.category.id, name: inst.category.name },
      ])
    ).values()
  );

  const sections = categories.map((category: { name: string; id: number }) => ({
    title: category.name,
    data: [
      institutions.filter(
        (institution) => institution.category.name === category.name
      ),
    ],
  }));

  const filteredInstitutions = institutions.filter((inst) =>
    inst.account.name
      .toUpperCase()
      .trim()
      .replace(/\s/g, '')
      .includes(searchQuery.toUpperCase().trim().replace(/\s/g, ''))
  );

  if (isLoadingInstitutions) {
    return <ExplorerLoadingPlaceholder />;
  }

  if (isSearchActive) {
    return (
      <ScreenContainer>
        <FlatList
          data={filteredInstitutions}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <ExploreSearchItem
              type="institution"
              blurhash={item.account.media?.blurhash}
              image={item.account.media?.remoteUrl}
              title={item.account.name}
              onPress={() =>
                router.push({
                  pathname: 'institution',
                  params: { id: item.account.id },
                })
              }
            />
          )}
          ItemSeparatorComponent={Separator}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center p-6">
              <Text variant="large">Nenhum resultado encontrado.</Text>
            </View>
          }
        />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="pt-4">
      <SectionList
        sections={sections}
        renderSectionHeader={({ section: { title, data } }) => (
          <Text className="mb-2">
            {title} ({data[0].length})
          </Text>
        )}
        renderItem={({ item }) => (
          <FlatList
            data={item}
            horizontal
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            windowSize={3}
            renderItem={({ item }) => (
              <View className="mx-1">
                <ExploreInstitutionCard
                  title={item.account.name}
                  image={item.account.media?.remoteUrl}
                  placeholder={item.account.media?.blurhash}
                  followers={item.account.followersCount}
                  id={item.account.id}
                  following={item.isFollowing}
                />
              </View>
            )}
            keyExtractor={(institution) => institution.id.toString()}
            showsHorizontalScrollIndicator={false}
            className="mb-2.5"
          />
        )}
        keyExtractor={(_item, index) => `section-${index}`}
        refreshControl={
          <RefreshControl
            refreshing={isPending}
            onRefresh={refetch}
            colors={[THEME['light'].primary]}
            tintColor={THEME['light'].primary}
          />
        }
      />
    </ScreenContainer>
  );
}
