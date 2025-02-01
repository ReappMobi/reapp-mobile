import { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { DonationInformationItem } from 'src/components';
import colors from 'src/constants/colors';
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
  const media = donation.donor.account.media.remoteUrl;
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
  const [refreshing, setRefreshing] = useState(false);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchDonations = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
      setPage(1);
    } else {
      setLoading(true);
    }

    try {
      let fetchedDonations: Donation[] = [];
      if (isDonor) {
        console.log(user);

        fetchedDonations = await getDonationsByDonor(
          user.donor.id,
          isRefresh ? 1 : page,
          token
        );
      } else {
        fetchedDonations = await getInstitutionDonations(
          isRefresh ? 1 : page,
          token
        );
      }

      if (isRefresh) {
        setDonations(fetchedDonations);
      } else {
        setDonations((prevDonations) => [
          ...prevDonations,
          ...fetchedDonations,
        ]);
      }

      if (fetchedDonations.length === 0) {
        setHasMore(false);
      } else {
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error: any) {
      Alert.alert(
        'Erro',
        error.message || 'Ocorreu um erro ao carregar as doações.'
      );
    } finally {
      if (isRefresh) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const handleRefresh = useCallback(() => {
    setHasMore(true);
    fetchDonations(true);
  }, []);

  const handleEndReached = () => {
    if (!loading && hasMore && !refreshing) {
      fetchDonations();
    }
  };

  return loading && donations.length === 0 ? (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" color={colors.color_primary} />
    </View>
  ) : (
    <View className="flex-1 items-center justify-center px-4 pb-6">
      {donations.length === 0 && (
        <Text className="mt-6 text-center font-reapp_medium">
          {isDonor
            ? 'Você ainda não fez nenhuma doação'
            : 'Você ainda não recebeu nenhuma doação'}
        </Text>
      )}

      <FlatList
        data={donations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) =>
          isDonor
            ? renderDonorDonations(item)
            : renderInstitutionDonations(item)
        }
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#ff0000']} // Android
            tintColor="#0000ff" // iOS
            title="Recarregando..." // iOS
          />
        }
        ListFooterComponent={
          loading && donations.length > 0 ? (
            <View className="py-4">
              <ActivityIndicator size="small" color="#0000ff" />
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default MyDonationsPage;
