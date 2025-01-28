import { useEffect, useState } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { DonationInformationItem } from 'src/components';
import { useAuth } from 'src/hooks/useAuth';
import {
  getDonationsByDonor,
  getInstitutionDonations,
} from 'src/services/donations';
import { Donation } from 'src/types/IDonation';
import { timeAgo } from 'src/utils/time-ago';

const renderDonorDonations = (donation: Donation) => {
  const destination =
    donation.project?.name ||
    donation.institution?.account.name ||
    'instituições associadas';

  const media =
    donation.project?.media.remoteUrl ||
    donation.institution?.account.media.remoteUrl;

  const formatedAmount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(+donation.amount);

  const message = `Você doou ${formatedAmount} para ${destination}`;

  return (
    <DonationInformationItem
      title={message}
      subtitle={`Há ${timeAgo(donation.createdAt)}`}
      image={media}
    />
  );
};

const renderInstitutionDonations = (donation: Donation) => {
  const origin = donation.donor.account.name;
  const media = donation.donor.account.media;
  const destination = donation.project?.name || 'sua instituição';
  const formatedAmount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(+donation.amount);

  const message = `${origin} doou ${formatedAmount} para ${destination}`;
  return (
    <DonationInformationItem
      title={message}
      subtitle={`Há ${timeAgo(donation.createdAt)}`}
      image={media}
    />
  );
};

const MyDonationsPage = () => {
  const { user, token, isDonor } = useAuth();
  const [loading, setLoading] = useState(true);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [page, setPage] = useState(1);

  const fetchDonations = async () => {
    setLoading(true);
    try {
      let donations = [];
      if (isDonor)
        donations = await getDonationsByDonor(page, user.donor.id, token);
      else donations = await getInstitutionDonations(page, token);
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
          {isDonor
            ? 'Você ainda não fez nenhuma doação'
            : 'Você ainda não recebeu nenhuma doação'}
        </Text>
      )}

      <FlatList
        data={donations}
        onEndReached={() => fetchDonations()}
        renderItem={({ item }) => {
          return isDonor
            ? renderDonorDonations(item)
            : renderInstitutionDonations(item);
        }}
      />
    </View>
  );
};

export default MyDonationsPage;
