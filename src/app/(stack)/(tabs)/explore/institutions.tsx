import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  FlatList,
  RefreshControl,
  ScrollView,
  SectionList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import { CardSearch, ExploreScreenCard, LoadingBox } from 'src/components';
import Colors from 'src/constants/colors';
import { useAuth } from 'src/hooks/useAuth';
import { useSearch } from 'src/hooks/useSearch';
import { ICategory } from 'src/mocks/app-InstitutionCategory-data';
import {
  followAccount,
  getInstitutions,
  unfollowAccount,
} from 'src/services/app-core';
import { IInstitution } from 'src/types';

/**
 * ----------------------------------------------------------------
 * 1. CUSTOM HOOK: useInstitutions
 *    - Centraliza o fetching de dados, loading, erro e refresh
 * ----------------------------------------------------------------
 */
function useInstitutions() {
  const auth = useAuth();
  const [institutions, setInstitutions] = useState<IInstitution[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const token = await auth.getToken();
      const institutionsData = await getInstitutions({ token });

      const uniqueCategories = Array.from(
        new Map(
          institutionsData.map((inst: IInstitution) => [
            inst.category.id,
            { id: inst.category.id, name: inst.category.name },
          ])
        ).values()
      ) as ICategory[];

      setInstitutions(institutionsData);
      setCategories(uniqueCategories);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [auth]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchData();
    } finally {
      setRefreshing(false);
    }
  }, [fetchData]);

  return {
    institutions,
    setInstitutions,
    categories,
    loading,
    error,
    refreshing,
    onRefresh,
  };
}

/**
 * ----------------------------------------------------------------
 * 2. MODAL: Opções para cada instituição
 * ----------------------------------------------------------------
 */

const InstitutionModalOptions = memo(
  ({
    institution,
    isFollowing,
    handleFollow,
    handleUnfollow,
  }: {
    institution: IInstitution | null;
    isFollowing: boolean;
    handleFollow: () => Promise<void>;
    handleUnfollow: () => Promise<void>;
  }) => {
    const [isFollowingLocal, setIsFollowingLocal] = useState(isFollowing);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
      setIsFollowingLocal(isFollowing);
    }, [isFollowing]);

    const handleFollowInternal = async () => {
      if (isProcessing) { return; }
      setIsProcessing(true);
      try {
        setIsFollowingLocal(true);
        await handleFollow();
      } catch (error) {
        console.log(error);
        setIsFollowingLocal(false);
      } finally {
        setIsProcessing(false);
      }
    };

    const handleUnfollowInternal = async () => {
      if (isProcessing) { return; }
      setIsProcessing(true);
      try {
        setIsFollowingLocal(false);
        await handleUnfollow();
      } catch (error) {
        console.log(error);
        setIsFollowingLocal(true);
      } finally {
        setIsProcessing(false);
      }
    };

    return (
      <View className="gap-y-7 px-6 py-8">
        {/* Botão de informações... */}
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: 'institution',
              params: { id: institution?.account.id },
            })
          }
        >
          <View className="flex-row gap-x-2">
            <Ionicons
              name="information-circle-outline"
              size={24}
              color="white"
            />
            <Text className="font-reapp_medium text-base text-text_light">
              Informações
            </Text>
          </View>
        </TouchableOpacity>
        {isFollowingLocal ? (
          <TouchableOpacity onPress={handleUnfollowInternal}>
            <View className="flex-row gap-x-2">
              <Ionicons name="close" size={24} color="white" />
              <Text className="font-reapp_medium text-base text-text_light">
                Remover dos seguidos
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleFollowInternal}>
            <View className="flex-row gap-x-2">
              <Ionicons name="add" size={24} color="white" />
              <Text className="font-reapp_medium text-base text-text_light">
                Seguir
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }
);

/**
 * ----------------------------------------------------------------
 * 3. PLACEHOLDER enquanto carrega (Skeleton)
 * ----------------------------------------------------------------
 */
const InstitutionCardPlaceholder = memo(() => (
  <View className="pt-30 flex-1 justify-center px-4">
    {Array.from({ length: 3 }).map((_, index) => (
      <Fragment key={index}>
        <LoadingBox customStyle="h-4 w-32 mb-2 mt-2 rounded-md bg-slate-400 last:mb-0" />
        <ScrollView horizontal>
          {Array.from({ length: 7 }).map((__, index2) => (
            <LoadingBox
              key={index2}
              customStyle="h-48 w-32 mr-2 rounded-md bg-slate-400 last:mb-0"
            />
          ))}
        </ScrollView>
      </Fragment>
    ))}
  </View>
));

/**
 * ----------------------------------------------------------------
 * 4. LISTA DE CARDS (para SectionList) - RenderItem
 * ----------------------------------------------------------------
 */
type RenderItemProps = {
  item: IInstitution;
  onOpen: (item: IInstitution) => void;
  onPressCard: (item: IInstitution) => void;
  onPressFollow: (item: IInstitution) => void;
  onPressUnfollow: (item: IInstitution) => void;
};

const RenderInstitutionCard = memo<RenderItemProps>(
  ({ item, onOpen, onPressCard, onPressFollow, onPressUnfollow }) => {
    return (
      <ExploreScreenCard
        title={item.account.name}
        isInstitution
        imageUrl={item.account.media?.remoteUrl}
        isFollowInitial={item.isFollowing || false}
        onPressInfo={() => onOpen(item)}
        onPressCard={() => onPressCard(item)}
        onPressFollow={() => onPressFollow(item)}
        onPressUnfollow={() => onPressUnfollow(item)}
      />
    );
  }
);

/**
 * ----------------------------------------------------------------
 * 5. LISTA PRINCIPAL: SectionList (sem busca)
 * ----------------------------------------------------------------
 */
type InstitutionSectionListProps = {
  sections: {
    title: string;
    data: IInstitution[][];
  }[];
  onOpen: (item: IInstitution) => void;
  onPressCard: (item: IInstitution) => void;
  refreshing: boolean;
  onRefresh: () => void;
  onPressFollow: (item: IInstitution) => void;
  onPressUnfollow: (item: IInstitution) => void;
};

const InstitutionSectionList = memo<InstitutionSectionListProps>(
  ({
    sections,
    onOpen,
    onPressCard,
    refreshing,
    onRefresh,
    onPressFollow,
    onPressUnfollow,
  }) => {
    return (
      <View className="px-4">
        <SectionList
          sections={sections}
          renderSectionHeader={({ section: { title, data } }) => (
            <Text className="mb-2 font-reapp_medium text-base">
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
              getItemLayout={(_, index) => ({
                length: 128,
                offset: 140 * index,
                index,
              })}
              renderItem={({ item: institution }) => (
                <RenderInstitutionCard
                  item={institution}
                  onOpen={onOpen}
                  onPressCard={onPressCard}
                  onPressFollow={onPressFollow}
                  onPressUnfollow={onPressUnfollow}
                />
              )}
              keyExtractor={(institution) => institution.id.toString()}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View className="w-3" />}
              className="mb-2.5"
            />
          )}
          keyExtractor={(_item, index) => `section-${index}`}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#ff0000']} // Android
              tintColor="#0000ff" // iOS
              title="Recarregando..." // iOS
            />
          }
        />
      </View>
    );
  }
);

/**
 * ----------------------------------------------------------------
 * 6. LISTA DE BUSCA (FlatList)
 * ----------------------------------------------------------------
 */
type RenderCardSearchProps = {
  item: IInstitution;
  searchPhrase: string;
  onPressCard: (item: IInstitution) => void;
};

const RenderCardSearch = memo<RenderCardSearchProps>(
  ({ item, searchPhrase, onPressCard }) => {
    if (searchPhrase === '') {
      return (
        <CardSearch
          imageUrl={item.account.media?.remoteUrl}
          title={item.account.name}
          onPress={() => onPressCard(item)}
        />
      );
    }

    if (
      item.account.name
        .toUpperCase()
        .trim()
        .replace(/\s/g, '')
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ''))
    ) {
      return (
        <CardSearch
          imageUrl={item.account.media?.remoteUrl}
          title={item.account.name}
          onPress={() => onPressCard(item)}
        />
      );
    }
    return null;
  }
);

type InstitutionSearchListProps = {
  institutions: IInstitution[];
  searchPhrase: string;
  onPressCard: (item: IInstitution) => void;
};

const InstitutionSearchList = memo<InstitutionSearchListProps>(
  ({ institutions, searchPhrase, onPressCard }) => {
    const filtered = useMemo(() => {
      if (!searchPhrase) { return institutions; }
      return institutions.filter((inst) =>
        inst.account.name
          .toUpperCase()
          .trim()
          .replace(/\s/g, '')
          .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ''))
      );
    }, [institutions, searchPhrase]);

    if (filtered.length === 0) {
      return (
        <View className="flex-1 items-center justify-center p-4">
          <Text className="font-reapp_medium">
            Nenhum resultado encontrado.
          </Text>
        </View>
      );
    }

    return (
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <RenderCardSearch
            item={item}
            key={item.id}
            searchPhrase={searchPhrase}
            onPressCard={onPressCard}
          />
        )}
      />
    );
  }
);

/**
 * ----------------------------------------------------------------
 * 7. COMPONENTE PRINCIPAL: InstitutionsPage
 * ----------------------------------------------------------------
 */
const InstitutionsPage = () => {
  const {
    institutions,
    setInstitutions,
    categories,
    loading,
    error,
    refreshing,
    onRefresh,
  } = useInstitutions();

  const [selectedInstitution, setSelectedInstitution] =
    useState<IInstitution | null>(null);
  const [, setIsFollowing] = useState(false);
  const { isSearchActive, searchQuery } = useSearch();

  const modalizeRef = useRef<Modalize>(null);

  const onOpenModal = useCallback((item: IInstitution) => {
    setSelectedInstitution(item);
    setIsFollowing(item.isFollowing || false);
    modalizeRef.current?.open();
  }, []);

  const { token } = useAuth();

  const handleCardClick = useCallback((item: IInstitution) => {
    router.push({ pathname: 'institution', params: { id: item.account.id } });
  }, []);

  const handleFollow = useCallback(
    async (institution: IInstitution) => {
      try {
        await followAccount({ id: institution.account.id, token });
        setInstitutions((prevInstitutions) => {
          const updatedInstitutions = prevInstitutions.map((inst) =>
            inst.account.id === institution.account.id
              ? { ...inst, isFollowing: true }
              : inst
          );

          if (selectedInstitution?.account.id === institution.account.id) {
            const updatedInst = updatedInstitutions.find(
              (inst) => inst.account.id === institution.account.id
            );
            setSelectedInstitution(updatedInst);
          }

          return updatedInstitutions;
        });
      } catch (error) {
        console.error('Erro ao seguir:', error);
        throw error;
      }
    },
    [token, selectedInstitution]
  );

  const handleUnfollow = useCallback(
    async (institution: IInstitution) => {
      try {
        await unfollowAccount({ id: institution.account.id, token });
        setInstitutions((prevInstitutions) => {
          const updatedInstitutions = prevInstitutions.map((inst) =>
            inst.account.id === institution.account.id
              ? { ...inst, isFollowing: false }
              : inst
          );

          if (selectedInstitution?.account.id === institution.account.id) {
            const updatedInst = updatedInstitutions.find(
              (inst) => inst.account.id === institution.account.id
            );
            setSelectedInstitution(updatedInst);
          }

          return updatedInstitutions;
        });
      } catch (error) {
        console.error('Erro ao deixar de seguir:', error);
        throw error;
      }
    },
    [token, selectedInstitution]
  );

  const sections = useMemo(() => {
    return categories.map((category) => ({
      title: category.name,
      data: [
        institutions.filter(
          (institution) => institution.category.name === category.name
        ),
      ],
    }));
  }, [categories, institutions]);

  if (loading && !error) {
    return <InstitutionCardPlaceholder />;
  }

  if (!loading && error) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="mb-2 text-lg font-bold text-red-500">
          Ocorreu um erro!
        </Text>
        <Text>{error.message}</Text>
        <TouchableOpacity onPress={onRefresh} className="mt-4">
          <Text className="text-blue-500">Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!loading && institutions.length === 0) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="mb-2 font-reapp_medium text-base">
          Nenhuma instituição encontrada.
        </Text>
        <TouchableOpacity onPress={onRefresh}>
          <Text className="text-blue-500">Recarregar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      {!isSearchActive ? (
        <InstitutionSectionList
          sections={sections}
          onOpen={onOpenModal}
          onPressCard={handleCardClick}
          onPressFollow={handleFollow}
          onPressUnfollow={handleUnfollow}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      ) : (
        <InstitutionSearchList
          institutions={institutions}
          searchPhrase={searchQuery}
          onPressCard={handleCardClick}
        />
      )}

      <Modalize
        ref={modalizeRef}
        adjustToContentHeight
        modalStyle={{ backgroundColor: Colors.text_primary }}
      >
        <InstitutionModalOptions
          institution={selectedInstitution}
          isFollowing={selectedInstitution?.isFollowing ?? false}
          handleFollow={() => {
            if (selectedInstitution) {
              return handleFollow(selectedInstitution);
            }
            return Promise.resolve();
          }}
          handleUnfollow={() => {
            if (selectedInstitution) {
              return handleUnfollow(selectedInstitution);
            }
            return Promise.resolve();
          }}
        />
      </Modalize>
    </>
  );
};

export default memo(InstitutionsPage);
