import { router } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';

import { ScreenContainer } from '@/components/ScreenContainer';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { THEME } from '@/lib/theme';
import { useMembersByInstitutionId } from '@/services/members/members.service';
import { MemberType } from '@/services/members/members.types';
import { ListHeeader } from './list-header';
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

  return (
    <FlatList
      className="flex-1 bg-white"
      removeClippedSubviews
      maxToRenderPerBatch={10}
      data={members}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <MemberCard
          key={item.id}
          id={item.id}
          name={item.name}
          mediaUrl={item.media?.remoteUrl}
          mediaBlurhash={item.media?.blurhash}
        />
      )}
      ListHeaderComponent={() => (
        <ListHeeader
          icon={ChevronRight}
          title={`Adicionar ${MEMBER_LABELS[type]}`}
          isMe={isMe}
          onPressActionButton={() =>
            router.push({
              pathname: 'member/create',
              params: { type },
            })
          }
        />
      )}
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
