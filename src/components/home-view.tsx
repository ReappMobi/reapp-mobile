import { useCallback, useEffect, useState } from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import { getInstituitionPosts } from 'src/services/app-core';
import { IInstitution, IPost } from 'src/types';

import CardPost from './CardPost';
import LoadingBox from './LoadingBox';

type HomeViewProps = {
  institution: IInstitution;
};

const HomeView = ({ institution }: HomeViewProps) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    getInstituitionPosts(institution.id).then((posts) => {
      setPosts(posts);
      setLoadingPosts(false);
    });
  });

  const renderItem: ListRenderItem<IPost> = useCallback(({ item }) => {
    return (
      <CardPost
        key={item.id}
        userImagePath={institution.imageUrl}
        description={item.content}
        imagePath={item.media}
        timeAgo={item.createdAt}
        isSavedInitial={false}
      />
    );
  }, []);

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
        removeClippedSubviews
        maxToRenderPerBatch={10}
        data={posts}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View className="mb-2.5" />}
      />
    </View>
  );
};

export default HomeView;
