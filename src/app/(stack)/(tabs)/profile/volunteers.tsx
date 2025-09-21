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
import VolunteerCard from 'src/components/VolunteerCard';
import colors from 'src/constants/colors';
import { useVolunteersByInstitution } from 'src/hooks/useVolunteersByInstitution';
import type { IVolunteer } from 'src/types/IVolunteer';

type VolunteerItemProps = {
  item: IVolunteer;
};

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
          pathname: 'volunteer-create',
        });
      }}
    >
      Cadastrar Voluntário
    </Button>
  </View>
);

const VolunteerItem = memo<VolunteerItemProps>(({ item }) => {
  return (
    <VolunteerCard
      name={item.name}
      blurhash={item.media?.blurhash}
      image={item.media?.remoteUrl}
    />
  );
});

function VolunteerList({ institutionId }: { institutionId: number }) {
  const { volunteers, token, error, loading, refreshing, onRefresh } =
    useVolunteersByInstitution(institutionId);

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

  const renderItem: ListRenderItem<IVolunteer> = ({ item }) =>
    volunteers.length > 0 ? (
      <VolunteerItem item={item} />
    ) : (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="font-reapp_medium text-base">
          Nenhum voluntário encontrado.
        </Text>
      </View>
    );

  return (
    <FlatList
      data={volunteers}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={renderHeader}
      ItemSeparatorComponent={() => <View className="h-2" />}
      // Pull-to-refresh
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
          <Text className="font-reapp_medium text-base">
            Nenhum voluntário encontrado.
          </Text>
        </View>
      }
    />
  );
}

function Volunteers() {
  const route = useRoute();
  const { id } = route.params as { id: number };

  return (
    <View className="flex-1 py-4">
      <VolunteerList institutionId={id} />
    </View>
  );
}

export default Volunteers;
