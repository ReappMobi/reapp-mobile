import React from 'react';
import { View, Text, FlatList } from 'react-native';

import CardPost from '../../components/CardPost';
import HeaderStatisticsProfile from '../../components/HeaderStatisticsProfile';
import ScreenContainer from '../../components/ScreenContainer';

function ProfileSavedScreen() {
  const saved = [
    {
      userImagePath:
        'https://blog.emania.com.br/wp-content/uploads/2015/10/fotos-de-natureza.jpg',
      imagePath:
        'https://blog.emania.com.br/wp-content/uploads/2015/10/fotos-de-natureza.jpg',
      nameInstitution: 'Universidade ABC',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      timeAgo: '2 hours ago',
    },
    {
      userImagePath:
        'https://blog.emania.com.br/wp-content/uploads/2015/10/fotos-de-natureza.jpg',
      imagePath:
        'https://blog.emania.com.br/wp-content/uploads/2015/10/fotos-de-natureza.jpg',
      nameInstitution: 'Empresa XYZ',
      description:
        'Sed euismod ligula in nunc bibendum, a eleifend quam congue.',
      timeAgo: '1 day ago',
    },
    {
      userImagePath:
        'https://blog.emania.com.br/wp-content/uploads/2015/10/fotos-de-natureza.jpg',
      imagePath:
        'https://blog.emania.com.br/wp-content/uploads/2015/10/fotos-de-natureza.jpg',
      nameInstitution: 'Hospital ABC',
      description:
        'Aenean mattis odio sit amet purus gravida, sed vehicula arcu laoreet.',
      timeAgo: '3 days ago',
    },
    {
      userImagePath:
        'https://blog.emania.com.br/wp-content/uploads/2015/10/fotos-de-natureza.jpg',
      imagePath:
        'https://blog.emania.com.br/wp-content/uploads/2015/10/fotos-de-natureza.jpg',
      nameInstitution: 'Escola XYZ',
      description: 'Vestibulum at justo nec ex hendrerit congue.',
      timeAgo: '4 days ago',
    },
    {
      userImagePath:
        'https://blog.emania.com.br/wp-content/uploads/2015/10/fotos-de-natureza.jpg',
      imagePath:
        'https://blog.emania.com.br/wp-content/uploads/2015/10/fotos-de-natureza.jpg',
      nameInstitution: 'Companhia ABC',
      description: 'Phasellus nec libero a lorem ullamcorper dictum.',
      timeAgo: '5 days ago',
    },
  ];

  return (
    <ScreenContainer>
      <View className="flex-1 gap-y-4 pt-4">
        <View>
          <HeaderStatisticsProfile
            image="https://media.licdn.com/dms/image/D4D03AQEoi_Vob6ydUg/profile-displayphoto-shrink_400_400/0/1679452346440?e=2147483647&v=beta&t=K7GSewyacawx6DLqfhmqcAdkPBkcZgOH1KdAjikRqJA"
            name="Gabriel Bastos Rabelo"
            donationsQty={10}
            followingQty={100}
          />
        </View>

        <View>
          <Text className="text-center font-_medium text-xl text-color_primary">
            Salvos
          </Text>
        </View>

        <FlatList
          data={saved}
          renderItem={({ item }) => (
            <CardPost
              imagePath={item.imagePath}
              userImagePath={item.userImagePath}
              nameInstitution={item.nameInstitution}
              description={item.description}
              timeAgo={item.timeAgo}
              isSavedInitial
            />
          )}
          ItemSeparatorComponent={() => <View className="mb-2.5" />}
        />
      </View>
    </ScreenContainer>
  );
}

export default ProfileSavedScreen;
