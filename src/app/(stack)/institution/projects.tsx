import { useRoute } from '@react-navigation/native';
import { router } from 'expo-router';
import { useCallback, useEffect, useState, memo } from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import CardInstitutionProject from 'src/components/CardInstitutionProject';
import LoadingBox from 'src/components/LoadingBox';
import { useAuth } from 'src/hooks/useAuth';
import { getProjectByInstitutionId } from 'src/services/app-core';
import { IProject } from 'src/types';

const ProjectsView = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);

  const route = useRoute();
  const { id } = route.params as { id: number };
  const auth = useAuth();

  useEffect(() => {
    (async () => {
      const token = await auth.getToken();
      const res = await getProjectByInstitutionId(id, token);
      setProjects(res);
      setLoading(false);
    })();
  }, []);

  const renderItem: ListRenderItem<IProject> = useCallback(({ item }) => {
    return (
      <CardInstitutionProject
        imagePath={item.cover}
        title={item.name}
        subtitle={item.subtitle}
        textButton="Ver mais detalhes"
        onPress={() => {
          handleCardClick(item.id);
        }}
      />
    );
  }, []);

  const handleCardClick = useCallback((id: number) => {
    router.navigate({ pathname: 'project', params: { projectId: id } });
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center pt-48 ">
        {Array.from({ length: 3 }).map((_, index) => (
          <LoadingBox
            key={index}
            customStyle="h-56 w-full mb-2 rounded-md bg-slate-400 last:mb-0"
          />
        ))}
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center">
      <FlatList
        className="w-full"
        removeClippedSubviews
        maxToRenderPerBatch={10}
        data={projects}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View className="mb-2.5" />}
      />
    </View>
  );
};

export default memo(ProjectsView);
