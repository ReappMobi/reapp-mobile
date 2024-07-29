import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useEffect, useState, memo } from 'react';
import { FlatList, View, Text } from 'react-native';
import { Button } from 'src/components';
import colors from 'src/constants/colors';
import { useAuth } from 'src/hooks/useAuth';
import { getCollaboratorById } from 'src/services/app-core';
import { ICollaborator } from 'src/types/ICollaborator';

const blurhash: string =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const CollaboratorCard = ({ info }) => {
  return (
    <View className="flex-row items-center gap-x-2 border-b border-zinc-200 p-2">
      <Image
        className="h-[64] w-[64] rounded-full"
        source={info.avatar}
        placeholder={blurhash}
        contentFit="cover"
        transition={500}
      />

      <Text className="font-reapp_medium text-sm">{info.name}</Text>
    </View>
  );
};

function Collaborators() {
  const [collaborators, setCollaborators] = useState<ICollaborator[]>([]);

  const auth = useAuth();
  useEffect(() => {
    (async () => {
      const token = await auth.getToken();
      const res = await getCollaboratorById(auth.user.id, token);
      setCollaborators(res);
    })();
  }, []);

  const renderHeader = () => (
    <View className="mb-3 items-center justify-center">
      <Button
        endIcon={
          <Ionicons
            name="chevron-forward"
            size={20}
            color={colors.text_neutral}
          />
        }
        customStyles="w-64 justify-center space-x-2"
        onPress={() => {
          router.push({
            pathname: 'collaborator-create',
          });
        }}
      >
        Cadastrar Colaborador
      </Button>
    </View>
  );

  return (
    <View className="py-4">
      <FlatList
        data={collaborators}
        renderItem={({ item }) => <CollaboratorCard info={item} />}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View className="h-2" />}
        ListHeaderComponent={renderHeader}
      />
    </View>
  );
}

export default memo(Collaborators);
