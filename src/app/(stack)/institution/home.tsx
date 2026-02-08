import { useLocalSearchParams } from 'expo-router';
import { ScreenContainer } from '@/components';
import { PostList } from '@/components/app/institution/post-list';

export default function Home() {
  const { id, isMe } = useLocalSearchParams<{ id: string; isMe: string }>();

  return (
    <ScreenContainer className="p-4">
      <PostList institutionId={Number(id)} isMe={isMe === 'true'} />
    </ScreenContainer>
  );
}
