import { useRoute } from '@react-navigation/native';
import React, { memo } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CollaboratorCard } from 'src/components/CollaboratorCard';
import { useCollaboratorsByInstitution } from 'src/hooks/useCollaboratorsByInstitution';
import { ICollaborator } from 'src/types/ICollaborator';

type CollaboratorItemProps = {
  item: ICollaborator;
};
const CollaboratorItem = memo<CollaboratorItemProps>(({ item }) => {
  return (
    <CollaboratorCard
      name={item.name}
      image={item.media?.remoteUrl}
      blurhash={item.media?.blurhash}
    />
  );
});

function CollaboratorList({ institutionId }: { institutionId: number }) {
  const { collaborators, token, error, loading, refreshing, onRefresh } =
    useCollaboratorsByInstitution(institutionId);

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

        {/* Botão para tentar novamente */}
        <TouchableOpacity onPress={onRefresh}>
          <Text className="mt-4 text-blue-500">Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderItem: ListRenderItem<ICollaborator> = ({ item }) =>
    collaborators.length > 0 ? (
      <CollaboratorItem item={item} />
    ) : (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="font-medium text-base">
          Nenhum colaborador encontrado.
        </Text>
      </View>
    );

  return (
    <FlatList
      data={collaborators}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
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
            Nenhum colaborador encontrado.
          </Text>
        </View>
      }
      ItemSeparatorComponent={() => <View className="h-2" />}
    />
  );
}

function Collaborators() {
  const route = useRoute();
  const { id } = route.params as { id: number };

  return (
    <View className="py-4">
      <CollaboratorList institutionId={id} />
    </View>
  );
}

export default memo(Collaborators);
