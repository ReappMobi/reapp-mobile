import { Image } from 'expo-image';
import { router } from 'expo-router';
import { ScrollView, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useAuth } from '@/hooks/useAuth';
import type { GetProjectByIdResponse } from '@/services/project/project.types';

interface ProjectDetailsProps {
  project: GetProjectByIdResponse;
}

export function ProjectDetails({ project }: ProjectDetailsProps) {
  const { isDonor } = useAuth();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Image
        className="h-44 w-full bg-muted"
        source={project.media?.remoteUrl}
        placeholder={project.media?.blurhash}
        contentFit="cover"
        transition={500}
      />
      <View className="pb-2">
        <View className="mt-3.5">
          <Text variant="h2">{project.name}</Text>
          <Text variant="h4">{project.subtitle}</Text>
        </View>
        <View className="mt-5 pb-2">
          <Text variant="default" className="mb-5 text-base font-normal">
            {project.description}
          </Text>
          {isDonor && (
            <Button
              className="w-full flex-row items-center"
              onPress={() => {
                router.navigate({
                  pathname: 'donate',
                  params: {
                    projectId: project.id.toString(),
                    phone: project.institution.phone,
                    institutionId: project.institution.id,
                  },
                });
              }}
            >
              <Text className="font-semibold text-white text-center">
                Clique aqui e faça sua doação
              </Text>
            </Button>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
