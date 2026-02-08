import { useLocalSearchParams } from 'expo-router';
import { ScreenContainer } from '@/components';
import { PostList } from '@/components/app/institution/post-list';

export default function HomeView() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <ScreenContainer className="p-4">
      <PostList institutionId={Number(id)} isMe={true} />
    </ScreenContainer>
  );
}
