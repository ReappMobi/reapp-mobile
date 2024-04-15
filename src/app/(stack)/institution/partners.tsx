import React, { useEffect, useState, memo } from 'react';
import { View, FlatList } from 'react-native';
import PartnerCard from 'src/components/PartnerCard';
import { IPartner } from 'src/types/IPartner';

const data: IPartner[] = [
  {
    id: 1,
    institutionId: 2,
    name: 'Parceiro 1',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_n0QGjLFH6ToZAeIuE_WTs_FskyXPdypB3A&usqp=CAU',
  },
  {
    id: 2,
    institutionId: 2,
    name: 'Parceiro 2',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_n0QGjLFH6ToZAeIuE_WTs_FskyXPdypB3A&usqp=CAU',
  },
  {
    id: 3,
    institutionId: 1,
    name: 'Parceiro 3',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_n0QGjLFH6ToZAeIuE_WTs_FskyXPdypB3A&usqp=CAU',
  },
  {
    id: 4,
    institutionId: 2,
    name: 'Parceiro 4',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_n0QGjLFH6ToZAeIuE_WTs_FskyXPdypB3A&usqp=CAU',
  },
  {
    id: 5,
    institutionId: 2,
    name: 'Parceiro 5',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_n0QGjLFH6ToZAeIuE_WTs_FskyXPdypB3A&usqp=CAU',
  },
];

function Partners() {
  const [partners, setPartners] = useState([]);
  useEffect(() => {
    setPartners(data);
  }, []);

  return (
    <View className="py-4">
      <FlatList
        columnWrapperStyle={{ justifyContent: 'space-evenly' }}
        data={partners}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <PartnerCard image={item.image} name={item.name} />
        )}
        ItemSeparatorComponent={() => <View className="h-4" />}
      />
    </View>
  );
}

export default memo(Partners);
