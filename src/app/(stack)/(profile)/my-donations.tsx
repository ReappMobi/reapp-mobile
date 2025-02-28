import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { DonationInformationItem } from 'src/components';
import colors from 'src/constants/colors';
import { useAuth } from 'src/hooks/useAuth';
import { getDonationsByDonor } from 'src/services/donations';
import { Donation } from 'src/types/IDonation';
import { timeAgo } from 'src/utils/time-ago';

type Period = 'week' | 'month' | '6months' | 'year' | 'all';

const PERIODS = [
  { id: 'week', label: 'Última semana' },
  { id: 'month', label: 'Último mês' },
  { id: '6months', label: 'Últimos 6 meses' },
  { id: 'year', label: 'Último ano' },
  { id: 'all', label: 'Todos' },
];

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

const MyDonationsPage = () => {
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState<{
    donations: Donation[];
    totalAmount: number;
    totalDonations: number;
  }>({ donations: [], totalAmount: 0, totalDonations: 0 });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('week');

  const fetchDonations = async (
    isRefresh = false,
    period: Period = selectedPeriod
  ) => {
    const targetPage = isRefresh ? 1 : page;

    try {
      const result = await getDonationsByDonor(
        user.donor.id,
        targetPage,
        token,
        period
      );

      if (isRefresh) {
        setData(result);
      } else {
        setData((prev) => ({
          ...result,
          donations: [...prev.donations, ...result.donations],
        }));
      }

      setHasMore(result.donations.length > 0);
      setPage(isRefresh ? 2 : (prev) => prev + 1);
    } catch (error: any) {
      Alert.alert(
        'Erro',
        error.message || 'Ocorreu um erro ao carregar as doações.'
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchDonations(true);
  }, [selectedPeriod]);

  const handleRefresh = useCallback(() => fetchDonations(true), []);

  const handleEndReached = () => {
    if (!loading && hasMore && !refreshing) {
      fetchDonations();
    }
  };

  const handlePeriodChange = (period: Period) => {
    setSelectedPeriod(period);
    setPage(1);
  };

  return (
    <View className="flex-1">
      {/* Header com estatísticas */}
      <View>
        <View style={styles.card} className="mx-4 mt-4 rounded-xl p-6">
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="font-reapp_medium text-lg text-gray-700">
              Total doado
            </Text>
            <MaterialIcons
              name="attach-money"
              size={24}
              color={colors.color_primary}
            />
          </View>
          <Text className="font-reapp_bold text-3xl text-gray-900">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(data.totalAmount)}
          </Text>

          <View className="mt-6 flex-row justify-between">
            <View>
              <Text className="font-reapp_medium text-sm text-gray-500">
                Doações
              </Text>
              <Text className="font-reapp_bold text-2xl text-gray-900">
                {data.totalDonations}
              </Text>
            </View>
          </View>
        </View>

        {/* Seletor de período */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-4 px-4 "
        >
          {PERIODS.map((period) => (
            <TouchableOpacity
              key={period.id}
              onPress={() => handlePeriodChange(period.id as Period)}
              className={`mb-2 mr-3 min-h-[40px] justify-center ${
                selectedPeriod === period.id
                  ? 'bg-color_primary'
                  : 'bg-gray-200'
              }`}
              style={{
                borderRadius: 20,
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
            >
              <Text
                className="font-reapp_medium text-sm"
                style={{
                  color:
                    selectedPeriod === period.id ? 'white' : 'text-gray-700',
                  flexShrink: 1,
                }}
              >
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {loading ? (
        <View className="items-center justify-center">
          <ActivityIndicator size="large" color={colors.color_primary} />
        </View>
      ) : (
        <FlatList
          data={data.donations}
          className="mt-4 px-4"
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => renderDonorDonations(item)}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[colors.color_primary]}
              tintColor={colors.color_primary}
            />
          }
          ListEmptyComponent={
            <Text className="mt-8 text-center font-reapp_medium text-gray-500">
              Nenhuma doação encontrada neste período
            </Text>
          }
          ListFooterComponent={
            hasMore && (
              <View className="py-4">
                <ActivityIndicator size="small" color={colors.color_primary} />
              </View>
            )
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
});

export default MyDonationsPage;
