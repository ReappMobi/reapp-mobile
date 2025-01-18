import { useEffect, useState } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { DonationInformationItem } from 'src/components';
import { useAuth } from 'src/hooks/useAuth';
import { getDonationsByDonor } from 'src/services/donations';
import { Donation } from 'src/types/IDonation';
import { timeAgo } from 'src/utils/time-ago';

const MyDonationsPage = () => {
  const { user, token } = useAuth();

  const [loading, setLoading] = useState(true);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [page, setPage] = useState(1);

  const fetchDonations = async () => {
    setLoading(true);
    try {
      const donations = await getDonationsByDonor(page, user.id, token);

      console.log(donations);

      setDonations([...donations]);
      setPage(page + 1);
    } catch (error) {
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
    setLoading(false);
  }, []);

  return loading ? (
    <Text>Carregando...</Text>
  ) : (
    <View className="px-4 pb-6">
      <Text className="my-2 text-center font-reapp_medium text-xl text-text_primary">
        Minhas doações
      </Text>

      {donations.length === 0 && (
        <Text className="mt-6 text-center">
          Você ainda não fez nenhuma doação.
        </Text>
      )}

      <FlatList
        data={donations}
        onEndReached={() => fetchDonations()}
        renderItem={({ item: donation }) => {
          const destination =
            donation.project?.name || donation.institution?.account.name;

          const media =
            donation.project?.media?.remoteUrl ||
            donation.institution?.account.media?.remoteUrl;

          const formatedAmount = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(+donation.amount);

          return (
            <DonationInformationItem
              title={`Você doou ${formatedAmount} para ${destination}`}
              subtitle={`Há ${timeAgo(donation.createdAt)}`}
              image={media}
            />
          );
        }}
      />
    </View>
  );
};

export default MyDonationsPage;
