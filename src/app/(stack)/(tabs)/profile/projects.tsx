import Ionicons from '@expo/vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
import { router } from 'expo-router';
import { useCallback, useEffect, useState, memo } from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import { Button } from 'src/components';
import CardInstitutionProject from 'src/components/CardInstitutionProject';
import LoadingBox from 'src/components/LoadingBox';
import colors from 'src/constants/colors';
import { useAuth } from 'src/hooks/useAuth';
import { getProjectByInstitutionId } from 'src/services/app-core';
import { IProject } from 'src/types';

const ProjectsView = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);
  const auth = useAuth();

  const route = useRoute();
  const { id } = route.params as { id: number };

  useEffect(() => {
    (async () => {
      const token = await auth.getToken();
      const res = await getProjectByInstitutionId(id, token);
      setProjects(res);
      setLoading(false);
    })();
  }, []);

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
        customStyles="w-full justify-center space-x-2"
        onPress={() => {
          router.push({
            pathname: 'project-create',
          });
        }}
      >
        Cadastrar Novo Projeto
      </Button>
    </View>
  );

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
        ListHeaderComponent={renderHeader}
      />
    </View>
  );
};

export default memo(ProjectsView);
