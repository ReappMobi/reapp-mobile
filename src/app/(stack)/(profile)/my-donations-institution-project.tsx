import { MaterialIcons } from '@expo/vector-icons';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { DonationInformationItem } from 'src/components';
import colors from 'src/constants/colors';
import { useGetProjectDonations } from 'src/services/donations/service';
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

const renderInstitutionDonations = (donation: Donation) => {
  const origin = donation.donor.account.name;
  const media = donation.donor.account.media.remoteUrl;
  const destination = donation.project?.name || 'sua instituição';
  const formatedAmount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(+donation.amount);

  const message = `${origin} doou ${formatedAmount} para o projeto ${destination}`;
  return (
    <DonationInformationItem
      title={message}
      subtitle={`Há ${timeAgo(donation.createdAt)}`}
      image={media}
    />
  );
};

const MyDonationsInstitutionProjectsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('week');

  const {
    data,
    isLoading,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useGetProjectDonations(selectedPeriod);

  const donations = data?.pages.flatMap((page) => page.donations) || [];
  const totalAmount = data?.pages[0]?.totalAmount || 0;
  const totalDonations = data?.pages[0]?.totalDonations || 0;

  const handleRefresh = useCallback(() => refetch(), [refetch]);

  const handleEndReached = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const handlePeriodChange = (period: Period) => {
    setSelectedPeriod(period);
  };

  return (
    <View className="flex-1">
      {/* Header com estatísticas */}
      <View>
        <View style={styles.card} className="mx-4 mt-4 rounded-xl p-6">
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="font-medium text-lg text-gray-700">
              Total arrecadado
            </Text>
            <MaterialIcons
              name="attach-money"
              size={24}
              color={colors.primary}
            />
          </View>
          <Text className="font-bold text-3xl text-gray-900">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(totalAmount)}
          </Text>

          <View className="mt-6 flex-row justify-between">
            <View>
              <Text className="font-medium text-sm text-gray-500">Doações</Text>
              <Text className="font-bold text-2xl text-gray-900">
                {totalDonations}
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
                selectedPeriod === period.id ? 'bg-primary' : 'bg-gray-200'
              }`}
              style={{
                borderRadius: 20,
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
            >
              <Text
                className="font-medium text-sm"
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

      {isLoading ? (
        <View className="items-center justify-center">
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={donations}
          className="mt-4 px-4"
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => renderInstitutionDonations(item)}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={handleRefresh}
              colors={[colors.primary]}
              tintColor={colors.primary}
            />
          }
          ListEmptyComponent={
            <Text className="mt-8 text-center font-medium text-gray-500">
              Nenhuma doação encontrada neste período
            </Text>
          }
          ListFooterComponent={
            hasNextPage && (
              <View className="py-4">
                <ActivityIndicator size="small" color={colors.primary} />
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

export default MyDonationsInstitutionProjectsPage;