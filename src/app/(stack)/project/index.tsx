import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator } from 'react-native';

import { ScreenContainer } from '@/components';
import { ProjectDetails } from '@/components/app/projects/project-details';
import { Text } from '@/components/ui/text';
import colors from '@/constants/colors';
import { useGetProjectById } from '@/services/project/project.service';

export default function ProjectPage() {
  const { projectId } = useLocalSearchParams<{ projectId: string }>();
  const { data: project, isLoading } = useGetProjectById(Number(projectId), {
    enabled: !!projectId,
  });

  if (isLoading) {
    return (
      <ScreenContainer className="items-center justify-center">
        <ActivityIndicator animating color={colors.primary} size="large" />
      </ScreenContainer>
    );
  }

  if (!project) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Text className="text-center text-lg text-muted-foreground">
          Projeto não encontrado
        </Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <ProjectDetails project={project} />
    </ScreenContainer>
  );
}
