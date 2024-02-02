import React from 'react';
import { View, Text, FlatList } from 'react-native';

import {
  DonationInformationItem,
  HeaderStatisticsProfile,
  ScreenContainer,
} from '../../components';

function ProfileStatisticsScreen() {
  const donations = [
    {
      title: 'Doação de Livros',
      subtitle: '200 livros de literatura para a biblioteca municipal',
    },
    {
      title: 'Equipamentos para Escolas',
      subtitle: '15 kits de ciências para escolas locais',
    },
    {
      title: 'Apoio a Alimentação',
      subtitle: '500 kg de alimentos para o banco alimentar da cidade',
    },
    {
      title: 'Roupas para o Inverno',
      subtitle: '300 casacos e agasalhos para moradores de rua',
    },
    {
      title: 'Patrocínio Esportivo',
      subtitle: 'Equipamento esportivo para a equipe juvenil de futebol',
    },
    {
      title: 'Equipamentos para Escolas',
      subtitle: '15 kits de ciências para escolas locais',
    },
    {
      title: 'Apoio a Alimentação',
      subtitle: '500 kg de alimentos para o banco alimentar da cidade',
    },
    {
      title: 'Roupas para o Inverno',
      subtitle: '300 casacos e agasalhos para moradores de rua',
    },
    {
      title: 'Patrocínio Esportivo',
      subtitle: 'Equipamento esportivo para a equipe juvenil de futebol',
    },
  ];

  return (
    <ScreenContainer>
      <View className="flex-1 gap-8 pt-4">
        <View>
          <HeaderStatisticsProfile
            name="Gabriel Bastos"
            donationsQty={10}
            followingQty={10}
            image="https://media.licdn.com/dms/image/D4D03AQEoi_Vob6ydUg/profile-displayphoto-shrink_400_400/0/1679452346440?e=2147483647&v=beta&t=K7GSewyacawx6DLqfhmqcAdkPBkcZgOH1KdAjikRqJA"
          />
        </View>

        <Text className="text-center font-_medium text-xl text-text_primary">
          Minhas doações
        </Text>

        <FlatList
          data={donations}
          renderItem={({ item }) => (
            <DonationInformationItem
              title={item.title}
              subtitle={item.subtitle}
              image="https://aacd.org.br/wp-content/uploads/2019/10/aacd-doacao.jpg"
            />
          )}
        />
      </View>
    </ScreenContainer>
  );
}

export default ProfileStatisticsScreen;
