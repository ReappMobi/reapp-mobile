import { Ionicons } from '@expo/vector-icons';
//import { Video, ResizeMode } from 'expo-av';
import { Image } from 'expo-image';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from 'src/constants/colors';
import { useAuth } from 'src/hooks/useAuth';
import { useGetProjectById } from 'src/services/projects/service';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

const ProjectPage = () => {
  const navigation = useNavigation();

  const { projectId } = useLocalSearchParams();

  const { data: project, isLoading } = useGetProjectById(Number(projectId));

  //const video = useRef(null);
  //const [isPreloading, setIsPreloading] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const { isDonor } = useAuth();
  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  if (isLoading || !project) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator animating color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <Image
          className="h-44 w-full"
          source={project.media?.remoteUrl}
          placeholder={blurhash}
          contentFit="cover"
          transition={500}
        />
        <View className="px-4 pb-2">
          <View className="mt-3.5">
            <Text className="mb-3.5 font-bold text-xl text-text_primary">
              {project.name}
            </Text>

            <Text className="font-regular text-base">{project.subtitle}</Text>
          </View>
          <View className="mt-4 pb-2">
            <Text className="mb-5 font-bold text-xl text-text_neutral">
              A ideia
            </Text>
            <Text className="mb-5 font-regular text-base">
              {project.description}
            </Text>
            {isDonor && (
              <Button
                className="w-full"
                onPress={() => {
                  return router.navigate({
                    pathname: '/donate',
                    params: {
                      projectId,
                      phone: project.institution.phone,
                      institutionId: project.institution.id,
                    },
                  });
                }}
              >
                <Text>Clique aqui e faça sua doação</Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.text_white}
                />
              </Button>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProjectPage;