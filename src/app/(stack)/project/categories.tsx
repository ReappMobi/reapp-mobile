import { debounce } from 'es-toolkit/function';
import { router } from 'expo-router';
import { useCallback, useState, useMemo } from 'react';
import { FlatList, Pressable, View, ActivityIndicator } from 'react-native';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { useProject } from '@/hooks/useProject';
import { useGetProjectCategories } from '@/services/project/project.service';
import { ProjectCategory } from '@/services/project/project.types';

const Page = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const { setCurrentCategory } = useProject();

  const { data: categories, isLoading } = useGetProjectCategories(debouncedQuery);

  const debouncedSetQuery = useMemo(
    () => debounce((query: string) => setDebouncedQuery(query), 300),
    []
  );

  const updateSearchQuery = useCallback((query: string) => {
    setSearchQuery(query);
    debouncedSetQuery(query);
  }, [debouncedSetQuery]);

  const handleSelectedCategory = (category: ProjectCategory) => {
    setCurrentCategory(category);
    router.dismiss();
  };

  const renderCategory = ({ item }: { item: ProjectCategory }) => {
    return (
      <Pressable
        className="w-full border-b border-gray-100 py-4"
        onPress={() => handleSelectedCategory(item)}
      >
        <Text className="text-md font-medium">{item.name}</Text>
      </Pressable>
    );
  };

  return (
    <View className="flex-1 px-4 pt-4 bg-white">
      <View className="relative">
        <Input
          value={searchQuery}
          placeholder="Ex.: Meio Ambiente"
          autoFocus
          onChangeText={updateSearchQuery}
          className="pr-10"
        />
        {isLoading && (
          <ActivityIndicator 
            className="absolute right-3 top-3" 
            size="small" 
          />
        )}
      </View>
      
      <View className="flex-1 mt-4">
        <FlatList
          className="w-full flex-1"
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCategory}
          ListEmptyComponent={() => !isLoading ? (
            <View className="flex-1 items-center justify-center pt-10">
              <Text className="text-muted-foreground text-center">
                {searchQuery 
                  ? "Nenhuma categoria encontrada" 
                  : "Digite para buscar categorias"}
              </Text>
            </View>
          ) : null}
        />
      </View>
    </View>
  );
};

export default Page;
