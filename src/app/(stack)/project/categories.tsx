import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { Input } from 'src/components';
import { useProject } from 'src/hooks/useProject';

import { debounce } from 'src/utils/functools';

const Page = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { getProjectCategories, setCurrentCategory } = useProject();
  const [categories, setCategories] = useState<Record<string, any>[]>([]);

  const updateSearchQuery = useCallback((query: string) => {
    setSearchQuery(query);
    debounce(() => fetchCategories(query), 800)();
  }, []);

  const fetchCategories = async (query: string) => {
    const categories = await getProjectCategories(query);

    if (categories.length === 0) {
      setCategories(query ? [{ id: 0, name: query }] : []);
      return;
    }

    setCategories(categories);
  };

  const handleSelectedCategory = (category: Record<string, any>) => {
    setCurrentCategory(category);
    router.dismiss();
  };

  const renderCategory = (item: Record<string, any>) => {
    if (categories.length === 0) {
      return (
        <View className="flex-1 items-center justify-center">
          <Text className="text-lg">Nenhuma categoria encontrada</Text>
        </View>
      );
    }

    return (
      <Pressable
        className="w-full border-b border-text_gray py-4"
        onPress={() => handleSelectedCategory(item)}
      >
        <Text className="text-md font-medium">{item.name}</Text>
      </Pressable>
    );
  };

  useEffect(() => {
    fetchCategories(searchQuery);
  }, []);

  return (
    <View className="flex-1 px-2 pt-2">
      <Input
        value={searchQuery}
        placeholder="Ex.: Meio Ambiente"
        autoFocus
        onChangeText={updateSearchQuery}
      />
      <View className="flex-1 items-center justify-center ">
        <FlatList
          className="w-full flex-1"
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => renderCategory(item)}
        />
      </View>
    </View>
  );
};

export default Page;
