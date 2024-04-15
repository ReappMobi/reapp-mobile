import { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { DonationInformationItem } from 'src/components';
import { getDonations } from 'src/services/user';

const MyDonationsPage = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    getDonations().then((response) => {
      setDonations(response);
    });
  }, []);

  return donations.length === 0 ? (
    <Text>Carregando...</Text>
  ) : (
    <View className="px-4 pb-6">
      <Text className="my-2 text-center font-reapp_medium text-xl text-text_primary">
        Minhas doações
      </Text>

      <FlatList
        data={donations}
        renderItem={({ item }) => (
          <DonationInformationItem
            title={item.title}
            subtitle={item.subtitle}
            image="https://placehold.co/600x400/png"
          />
        )}
      />
    </View>
  );
};

export default MyDonationsPage;
