import { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { CardPost } from 'src/components';
import { getSavedPosts } from 'src/services/user';

const SavedPage = () => {
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    getSavedPosts().then((response) => {
      setSavedPosts(response);
    });
  }, []);

  return (
    <View className="bg-white px-2 pb-12">
      <Text className="my-2 text-center font-reapp_medium text-xl text-text_primary">
        Postagens salvas
      </Text>
      {savedPosts.length === 0 ? (
        <Text>Carregando...</Text>
      ) : (
        <FlatList
          data={savedPosts}
          renderItem={({ item }) => (
            <CardPost
              imagePath={item.postImageUrl}
              userImagePath={item.userImageUrl}
              nameInstitution={item.nameInstitution}
              description={item.description}
              timeAgo={item.timeAgo}
              isSavedInitial
            />
          )}
        />
      )}
    </View>
  );
};

export default SavedPage;
