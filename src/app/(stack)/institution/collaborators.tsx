import { useRoute } from '@react-navigation/native';
import { Image } from 'expo-image';
import React, { useEffect, useState, memo } from 'react';
import { FlatList, View, Text } from 'react-native';
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
  const route = useRoute();
  const { id } = route.params as { id: number };
  const auth = useAuth();
  useEffect(() => {
    (async () => {
      const token = await auth.getToken();
      const res = await getCollaboratorById(id, token);
      setCollaborators(res);
    })();
  }, []);

  return (
    <View className="py-4">
      <FlatList
        data={collaborators}
        renderItem={({ item }) => <CollaboratorCard info={item} />}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View className="h-2" />}
      />
    </View>
  );
}

export default memo(Collaborators);
