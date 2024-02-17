import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { IInstitution, IPost } from 'src/types';

import LoadingBox from './LoadingBox';

type HomeViewProps = {
  institution: IInstitution;
};

const HomeView = ({ institution }: HomeViewProps) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    getPostsById(institution.id).then((fetchedPosts) => {
      setPosts(fetchedPosts);
      setLoadingPosts(false);
    });
  });

  if (loadingPosts) {
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
        data={posts}
        renderItem={({ item }) => item}
        ItemSeparatorComponent={() => <View className="mb-2.5" />}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
};

async function getPostsById(id: number): Promise<IPost[]> {
  return [];
}

export default HomeView;
