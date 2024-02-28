import { useCallback, useEffect, useState, memo } from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import CardInstitutionProject from 'src/components/CardInstitutionProject';
import LoadingBox from 'src/components/LoadingBox';
import { getInstituitionProjects } from 'src/services/app-core';
import { IProject, IInstitution } from 'src/types';

type ProjectsViewProps = {
  institution: IInstitution;
};

const ProjectsView = ({ institution }: ProjectsViewProps) => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInstituitionProjects(institution.id).then((projects) => {
      setProjects(projects);
      setLoading(false);
    });
  }, []);

  const renderItem: ListRenderItem<IProject> = useCallback(({ item }) => {
    return (
      <CardInstitutionProject
        imagePath={item.image}
        title={item.name}
        description={item.description}
        textButton="Ver mais detalhes"
      />
    );
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
