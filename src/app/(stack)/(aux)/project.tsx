import { Ionicons } from '@expo/vector-icons';
//import { Video, ResizeMode } from 'expo-av';
import { Image } from 'expo-image';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'src/components';
import colors from 'src/constants/colors';
import { useAuth } from 'src/hooks/useAuth';
import { getProjectById } from 'src/services/app-core';
import { IProject } from 'src/types';

const ProjectPage = () => {
  const navigation = useNavigation();

  const { projectId } = useLocalSearchParams();

  const [project, setProject] = useState<IProject>();

  //const video = useRef(null);
  //const [isPreloading, setIsPreloading] = useState(true);
  const auth = useAuth();

  useEffect(() => {
    (async () => {
      navigation.setOptions({
        headerShown: false,
      });
      const token = await auth.getToken();
      const fetchedProject = await getProjectById(Number(projectId), token);
      setProject(fetchedProject);
    })();
  }, []);

  const { isDonor } = useAuth();
  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  if (!project) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator
          animating
          color={colors.color_primary}
          size="large"
        />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <Image
          className="h-44 w-full"
          source={project.media.remoteUrl}
          placeholder={blurhash}
          contentFit="cover"
          transition={500}
        />
        <View className="px-4 pb-2">
          <View className="mt-3.5">
            <Text className="mb-3.5 font-reapp_bold text-xl text-text_primary">
              {project.name}
            </Text>

            <Text className="font-reapp_regular text-base">
              {project.subtitle}
            </Text>
          </View>
          <View className="mt-4 pb-2">
            <Text className="mb-5 font-reapp_bold text-xl text-text_neutral">
              A ideia
            </Text>
            <Text className="mb-5 font-reapp_regular text-base">
              {project.description}
            </Text>
            {/*
            {project.introdutionVideo && isPreloading && (
              <ActivityIndicator
                animating
                color={colors.color_primary}
                size="large"
                style={{
                  flex: 1,
                  position: 'absolute',
                  top: '50%',
                  left: '45%',
                }}
              />
            )}

            {project.introdutionVideo && (
              <Video
                ref={video}
                className="mb-5 h-56 w-full"
                source={{
                  uri: project.introdutionVideo,
                }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
                onLoadStart={() => setIsPreloading(true)}
                onReadyForDisplay={() => setIsPreloading(false)}
              />
            )}
            */}
            {isDonor && (
              <Button
                customStyles="w-full justify-center bg-color_primary"
                textColor="text-text_light"
                endIcon={
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={colors.text_white}
                  />
                }
                onPress={() => {
                  return router.navigate({
                    pathname: 'donate',
                    params: { projectId },
                  });
                }}
              >
                Clique aqui e faça sua doação
              </Button>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProjectPage;
