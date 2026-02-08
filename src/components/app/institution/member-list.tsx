import { Link, router } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  RefreshControl,
  TouchableOpacity,
  View,
} from 'react-native';

import { ScreenContainer } from '@/components/ScreenContainer';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { THEME } from '@/lib/theme';
import { useMembersByInstitutionId } from '@/services/members/members.service';
import { IMember, MemberType } from '@/services/members/members.types';
import { MemberCard } from './member-card';

interface MemberListProps {
  institutionId: number;
  type: MemberType;
  isMe?: boolean;
}

const MEMBER_LABELS: Record<MemberType, string> = {
  COLLABORATOR: 'Colaborador',
  VOLUNTEER: 'Voluntário',
  PARTNER: 'Parceiro',
};

export function MemberList({ institutionId, type, isMe }: MemberListProps) {
  const {
    data: members,
    isLoading: loading,
    isRefetching: refreshing,
    refetch: onRefresh,
    error,
  } = useMembersByInstitutionId(institutionId, type);

  const renderHeader = () => {
    if (!isMe) {
      return null;
    }
    return (
      <View className="mb-3 items-center justify-center">
        <Link href={{ pathname: 'member/create', params: { type } }} asChild>
          <Button
            variant="outline"
            size="lg"
            className="w-full flex-row justify-between"
          >
            <Text>Cadastrar {MEMBER_LABELS[type]}</Text>
            <Icon
              as={ChevronRight}
              className="h-6 w-6"
              color={THEME.light.foreground}
            />
          </Button>
        </Link>
      </View>
    );
  };

  if (loading) {
    return (
      <ScreenContainer className="items-center justify-center">
        <ActivityIndicator size="large" color={THEME.light.primary} />
      </ScreenContainer>
    );
  }

  if (error) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Text className="mb-2 text-lg font-bold text-red-500">
          Ocorreu um erro!
        </Text>
        <TouchableOpacity onPress={() => onRefresh()}>
          <Text className="mt-4 text-blue-500">Tentar novamente</Text>
        </TouchableOpacity>
      </ScreenContainer>
    );
  }

  const renderItem: ListRenderItem<IMember> = ({ item }) => {
    return (
      <MemberCard
        key={item.id}
        id={item.id}
        name={item.name}
        mediaUrl={item.media?.remoteUrl}
        mediaBlurhash={item.media?.blurhash}
      />
    );
  };

  return (
    <FlatList
      className="flex-1 bg-white"
      removeClippedSubviews
      maxToRenderPerBatch={10}
      data={members}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[THEME.light.primary]}
        />
      }
      ItemSeparatorComponent={Separator}
      ListEmptyComponent={
        <ScreenContainer className="items-center justify-center">
          <Text className="font-medium text-base">
            Nenhum {MEMBER_LABELS[type].toLowerCase()} encontrado.
          </Text>
        </ScreenContainer>
      }
    />
  );
}
