import { useRoute } from '@react-navigation/native';
import { memo } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PartnerCard from 'src/components/PartnerCard';
import { usePartnersByInstitution } from 'src/hooks/usePartnersByInstitution';
import { IPartner } from 'src/types/IPartner';

type PartnerItemProps = {
  item: IPartner;
};

const PartnerItem = memo<PartnerItemProps>(({ item }) => {
  return <PartnerCard image={item.media?.remoteUrl} name={item.name} />;
});

function PartnerList({ institutionId }: { institutionId: number }) {
  const { partners, token, error, loading, refreshing, onRefresh } =
    usePartnersByInstitution(institutionId);

  if (loading && !token) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!loading && error) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="mb-2 text-lg font-bold text-red-500">
          Ocorreu um erro!
        </Text>
        <Text>{error.message}</Text>

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
        <Text className="font-medium text-base">
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
      ListEmptyComponent={
        <View className="flex-1 items-center justify-center p-4">
          <Text className="font-medium text-base">
            Nenhum parceiro encontrado.
          </Text>
        </View>
      }
    />
  );
}

function PartnersView() {
  const route = useRoute();
  const { id } = route.params as { id: number };

  return (
    <View className="flex-1 bg-white py-4">
      <PartnerList institutionId={id} />
    </View>
  );
}

export default memo(PartnersView);
