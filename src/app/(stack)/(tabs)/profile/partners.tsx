import Ionicons from '@expo/vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
import { router } from 'expo-router';
import { memo } from 'react';
import {
  ActivityIndicator,
  FlatList,
  type ListRenderItem,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button } from 'src/components';
import PartnerCard from 'src/components/PartnerCard';
import colors from 'src/constants/colors';
import { usePartnersByInstitution } from 'src/hooks/usePartnersByInstitution';
import type { IPartner } from 'src/types/IPartner';

const renderHeader = () => (
  <View className="mb-3 items-center justify-center">
    <Button
      endIcon={
        <Ionicons
          name="chevron-forward"
          size={20}
          color={colors.text_neutral}
        />
      }
      customStyles="w-64 justify-center gap-x-2"
      onPress={() => {
        router.push({
          pathname: 'partner-create',
        });
      }}
    >
      Cadastrar Novo Parceiro
    </Button>
  </View>
);
/**
 * Componente que renderiza cada parceiro individual (similar ao ProjectItem).
 */
type PartnerItemProps = {
  item: IPartner;
};

const PartnerItem = memo<PartnerItemProps>(({ item }) => {
  return <PartnerCard image={item.media?.remoteUrl} name={item.name} />;
});

/**
 * Componente que faz toda a lógica de buscar os parceiros e renderizar a lista (similar ao ProjectList).
 */
function PartnerList({ institutionId }: { institutionId: number }) {
  const { partners, token, error, loading, refreshing, onRefresh } =
    usePartnersByInstitution(institutionId);

  // Se está carregando e ainda não temos token, mostrar indicador
  if (loading && !token) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  // Se houve erro (e não está mais carregando)
  if (!loading && error) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="mb-2 text-lg font-bold text-red-500">
          Ocorreu um erro!
        </Text>
        <Text>{error.message}</Text>

        {/* Botão para tentar novamente */}
        <TouchableOpacity onPress={onRefresh}>
          <Text className="mt-4 text-blue-500">Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderItem: ListRenderItem<IPartner> = ({ item }) =>
    partners.length > 0 ? (
      <PartnerItem item={item} />
    ) : (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="font-reapp_medium text-base">
          Nenhum parceiro encontrado.
        </Text>
      </View>
    );

  return (
    <FlatList
      data={partners}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: 'space-evenly' }}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
      ItemSeparatorComponent={() => <View className="h-4" />}
      // Para permitir pull-to-refresh
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#ff0000']} // Android
          tintColor="#0000ff" // iOS
          title="Recarregando..." // iOS
        />
      }
      // Se quiser exibir algo quando a lista estiver vazia:
      ListEmptyComponent={
        <View className="flex-1 items-center justify-center p-4">
          <Text className="font-reapp_medium text-base">
            Nenhum parceiro encontrado.
          </Text>
        </View>
      }
    />
  );
}

/**
 * Componente principal, recebe o `id` da rota e apenas renderiza o PartnerList.
 */
function PartnersView() {
  const route = useRoute();
  const { id } = route.params as { id: number };

  return (
    <View className="flex-1 py-4">
      <PartnerList institutionId={id} />
    </View>
  );
}

export default memo(PartnersView);
