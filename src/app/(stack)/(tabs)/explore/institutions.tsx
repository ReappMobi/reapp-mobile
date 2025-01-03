import { Ionicons } from '@expo/vector-icons';
import { router, Link } from 'expo-router';
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
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  SectionList,
  RefreshControl,
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import { ExploreScreenCard, CardSearch, LoadingBox } from 'src/components';
import Colors from 'src/constants/colors';
import { useAuth } from 'src/hooks/useAuth';
import { useSearch } from 'src/hooks/useSearch';
import { ICategory } from 'src/mocks/app-InstitutionCategory-data';
import { getInstitutions } from 'src/services/app-core';
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

      // Extraindo categorias únicas
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
const InstitutionModalOptions = memo(() => {
  return (
    <View className="gap-y-7 px-6 py-8">
      <View className="flex-row gap-x-2">
        <Ionicons name="information-circle-outline" size={24} color="white" />
        <Link href="#" className="font-reapp_medium text-base text-text_light">
          Informações
        </Link>
      </View>

      <TouchableOpacity>
        <View className="flex-row gap-x-2">
          <Ionicons name="add" size={24} color="white" />
          <Text className="font-reapp_medium text-base text-text_light">
            Seguir
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View className="flex-row gap-x-2">
          <Ionicons name="close" size={24} color="white" />
          <Text className="font-reapp_medium text-base text-text_light">
            Remover dos seguidos
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
});

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
};

const RenderInstitutionCard = memo<RenderItemProps>(
  ({ item, onOpen, onPressCard }) => {
    return (
      <ExploreScreenCard
        title={item.account.name}
        isInstitution
        imageUrl={item.account.media?.remoteUrl}
        onPressInfo={() => onOpen(item)}
        onPressCard={() => onPressCard(item)}
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
};

const InstitutionSectionList = memo<InstitutionSectionListProps>(
  ({ sections, onOpen, onPressCard, refreshing, onRefresh }) => {
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
                />
              )}
              keyExtractor={(institution) => institution.id.toString()}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View className="w-3" />}
              className="mb-2.5"
            />
          )}
          keyExtractor={(item, index) => `section-${index}`}
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
    // Exemplo de filtrar e exibir “nenhum resultado encontrado”
    const filtered = useMemo(() => {
      if (!searchPhrase) return institutions;
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
  // Hook que lida com dados e estado de carregamento/erro
  const { institutions, categories, loading, error, refreshing, onRefresh } =
    useInstitutions();

  // Hook que controla se a busca está ativa e qual o texto da busca
  const { isSearchActive, searchQuery } = useSearch();

  // Referência para o modal
  const modalizeRef = useRef<Modalize>(null);

  // Ao clicar no "i" (ícone de info) do card:
  const onOpenModal = useCallback((item: IInstitution) => {
    modalizeRef.current?.open();
    // se quiser armazenar `item` no estado para exibir detalhes no modal, pode fazê-lo aqui
  }, []);

  // Ao clicar no card em si:
  const handleCardClick = useCallback((item: IInstitution) => {
    router.push({ pathname: 'institution', params: { id: item.id } });
  }, []);

  // Montar as seções para o SectionList
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

  // Se estiver carregando e não tiver erro, exibimos placeholder (Skeleton)
  if (loading && !error) {
    return <InstitutionCardPlaceholder />;
  }

  // Se houver erro, exibimos alguma mensagem ou um componente de erro
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

  // Se não houver instituições retornadas (ou estiver vazia)
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
      {/** Se NÃO estiver em busca, mostra SectionList; caso contrário, mostra lista de busca */}
      {!isSearchActive ? (
        <InstitutionSectionList
          sections={sections}
          onOpen={onOpenModal}
          onPressCard={handleCardClick}
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

      {/**
       * MODAL que abre ao clicar no "i" do card
       */}
      <Modalize
        ref={modalizeRef}
        adjustToContentHeight
        modalStyle={{ backgroundColor: Colors.text_primary }}
      >
        <InstitutionModalOptions />
      </Modalize>
    </>
  );
};

export default memo(InstitutionsPage);
