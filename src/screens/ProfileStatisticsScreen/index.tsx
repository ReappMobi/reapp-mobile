import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList } from 'react-native';

import {
  DonationInformationItem,
  HeaderStatisticsProfile,
  ScreenContainer,
} from '../../components';
import AuthContext from '../../contexts/auth';
import { getDonations } from '../../services/user';

function ProfileStatisticsScreen() {
  const { user } = useContext(AuthContext);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    getDonations().then((response) => {
      setDonations(response);
    });
  });

  return donations.length === 0 ? (
    <Text>Carregando...</Text>
  ) : (
    <ScreenContainer>
      <View className="flex-1 gap-8 pt-4">
        <View>
          <HeaderStatisticsProfile
            name={user.name}
            donationsQty={user.donations}
            followingQty={user.following}
            image={user.profileImage}
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
