import { useLocalSearchParams } from 'expo-router';
import { ScreenContainer } from '@/components';
import { MemberList } from '@/components/app/institution/member-list';

export default function Partners() {
  const { id, isMe } = useLocalSearchParams<{ id: string; isMe: string }>();

  return (
    <ScreenContainer className="p-4">
      <MemberList
        institutionId={Number(id)}
        type="PARTNER"
        isMe={isMe === 'true'}
      />
    </ScreenContainer>
  );
}
