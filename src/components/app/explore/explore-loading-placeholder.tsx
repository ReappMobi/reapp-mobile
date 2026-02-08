import { View } from 'react-native';
import { LoadingBox } from '@/components/LoadingBox';
import { ScreenContainer } from '@/components/ScreenContainer';

const ExplorerLoadingPlaceholder = () => {
  return (
    <ScreenContainer>
      {Array.from({ length: 3 }).map((_, index) => (
        <View key={index}>
          <LoadingBox customStyle="h-4 w-32 mb-1 my-4 rounded-sm bg-slate-400" />
          <View className="flex-row mt-2">
            {Array.from({ length: 3 }).map((__, index2) => (
              <LoadingBox
                key={index2}
                customStyle="h-44 w-36 mr-2 rounded-md bg-slate-400"
              />
            ))}
          </View>
        </View>
      ))}
    </ScreenContainer>
  );
};

export { ExplorerLoadingPlaceholder };
