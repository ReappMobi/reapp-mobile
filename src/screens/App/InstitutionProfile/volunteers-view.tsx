import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { IInstitution } from 'src/types';
import { IVolunteer } from 'src/types/IVolunteer';

type VolunteersViewProps = {
  institution: IInstitution;
};

const mockData: IVolunteer[] = [
  {
    id: 1,
    institutionId: 1,
    name: 'Gabriel Bastos',
    image: 'https://placehold.co/600x400/png',
  },

  {
    id: 2,
    institutionId: 1,
    name: 'Gabriel Belo',
    image: 'https://placehold.co/600x400/png',
  },

  {
    id: 3,
    institutionId: 1,
    name: 'André Gabriel',
    image: 'https://placehold.co/600x400/png',
  },

  {
    id: 4,
    institutionId: 1,
    name: 'Neymar Júnior ',
    image: 'https://placehold.co/600x400/png',
  },
];

const blurhash: string =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const VolunteerCard = ({ info }) => {
  return (
    <View className="flex-row items-center gap-x-2 border-b border-zinc-200 p-2">
      <Image
        className="h-[64] w-[64] rounded-full"
        source={info.image}
        placeholder={blurhash}
        contentFit="cover"
        transition={500}
      />

      <Text className="font-_medium text-sm">{info.name}</Text>
    </View>
  );
};

function VolunteersView({ institution }: VolunteersViewProps) {
  const [volunteers, setVolunteers] = useState<IVolunteer[]>([]);

  useEffect(() => {
    setVolunteers(mockData);
  }, []);
  return (
    <View className="py-4">
      <FlatList
        data={volunteers}
        renderItem={({ item }) => <VolunteerCard info={item} />}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View className="h-2" />}
      />
    </View>
  );
}

export default VolunteersView;
