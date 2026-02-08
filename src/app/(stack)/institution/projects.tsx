import { useLocalSearchParams } from 'expo-router';
import { ScreenContainer } from '@/components';
import { ProjectList } from '@/components/app/institution/project-list';

export default function Projects() {
  const { id, isMe } = useLocalSearchParams<{ id: string; isMe: string }>();

  return (
    <ScreenContainer className="p-4">
      <ProjectList institutionId={Number(id)} isMe={isMe === 'true'} />
    </ScreenContainer>
  );
}
