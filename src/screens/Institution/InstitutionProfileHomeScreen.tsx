import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { ScreenContainer } from 'src/components';
import { ICategory } from 'src/mocks/app-InstitutionCategory-data';
import { getCategoryById } from 'src/services/app-core';
import { IInstitution } from 'src/types';

// TODO: Fix type in ExploreScreen
export default function InstitutionProfileHomeScreen({ route }) {
  const { institution } = route.params as { institution: IInstitution };
  const [category, setCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!institution) return;
    if (!loading) return;
    // TODO: Fix type in getCategoryById
    getCategoryById(institution.category).then((category: ICategory) => {
      setCategory(category.category);
      setLoading(false);
    });
  });

  const PlaceholderLoader = () => {
    return (
      <View className="animate-pulse">
        <View className="h-2.5 w-24 rounded-full bg-gray-300" />
      </View>
    );
  };

  return (
    <ScreenContainer>
      <View className="pt-4">
        <Text className="font-_bold text-lg">
          {institution.nameInstitution}
        </Text>
        {loading ? (
          <PlaceholderLoader />
        ) : (
          <Text className="text-sm">{category}</Text>
        )}
      </View>
    </ScreenContainer>
  );
}
