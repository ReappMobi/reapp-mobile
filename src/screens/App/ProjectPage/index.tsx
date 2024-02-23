import { Ionicons } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av';
import { Image } from 'expo-image';
import React from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { ScreenContainer, Button } from 'src/components';
import Colors from 'src/constants/colors';
import { IProject } from 'src/types';

function ProjectPage({ route, navigation }) {
  const { project } = route.params as { project: IProject };
  const video = React.useRef(null);
  const [isPreloading, setIsPreloading] = React.useState(true);

  const blurhash: string =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  return (
    <ScrollView>
      {/* <Banner image={project.imageUrl} title={project.nameProject} /> */}

      <Image
        className="h-44 w-full"
        source={project.image}
        placeholder={blurhash}
        contentFit="cover"
        transition={500}
      />

      <ScreenContainer>
        <View className="mt-3.5">
          <Text className="mb-3.5 font-_bold text-xl text-text_primary">
            {project.name}
          </Text>
          <Text className="font-_regular text-base">{project.subtitle}</Text>
        </View>

        <View className="mt-4 pb-2">
          <Text className="mb-5 font-_bold text-xl text-text_neutral">
            A ideia
          </Text>
          <Text className="mb-5 font-_regular text-base">
            {project.description}
          </Text>

          {project.introdutionVideo && isPreloading && (
            <ActivityIndicator
              animating
              color={Colors.color_primary}
              size="large"
              style={{ flex: 1, position: 'absolute', top: '50%', left: '45%' }}
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

          <Button
            customStyles="bg-color_primary w-full justify-center"
            textColor="text-text_light"
            endIcon={
              <Ionicons
                name="chevron-forward"
                size={20}
                color={Colors.text_white}
              />
            }
            onPress={() => {
              navigation.navigate('Donation');
            }}
          >
            Clique aqui e faça sua doação
          </Button>
        </View>
      </ScreenContainer>
    </ScrollView>
  );
}

export default ProjectPage;
