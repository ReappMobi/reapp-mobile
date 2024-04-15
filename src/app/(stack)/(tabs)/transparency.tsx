import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { LoadingBox } from 'src/components';
import colors from 'src/constants/colors';
import {
  getDonationsByEixo,
  getDonationsBySegment,
} from 'src/services/app-core';

const Page = () => {
  const navigation = useNavigation();
  const [donationsByEixo, setDonationsByEixo] = useState([]);
  const [donationsBySegment, setDonationsBySegment] = useState([]);
  const [totalValueDonations, setTotalValueDonations] = useState(null);
  const [loadingDonations, setLoadingDonations] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Transparência',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 20,
        fontFamily: 'reapp_bold',
        color: colors.color_primary,
      },
    });
    (async () => {
      const donationsByEixoData = await getDonationsByEixo();
      const formattedDonationsByEixo = donationsByEixoData.map((donation) => ({
        ...donation,
        value: donation.value.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
      }));

      setDonationsByEixo(formattedDonationsByEixo);
      const donationsBySegmentData = await getDonationsBySegment();
      const formattedDonationsBySegment = donationsBySegmentData.map(
        (donation) => ({
          ...donation,
          value: donation.value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
        })
      );

      setDonationsBySegment(formattedDonationsBySegment);
      const totalValueDonationsData = donationsByEixoData.reduce(
        (accumulator, currentValue) => {
          return accumulator + currentValue.value;
        },
        0
      );

      setTotalValueDonations(
        totalValueDonationsData.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      );
      setLoadingDonations(false);
    })();
  }, []);

  return (
    <ScrollView>
      <View className="flex-1 p-4">
        <View className="mb-9 flex-row items-center justify-between border-b pb-4">
          <View>
            <Text className="font-reapp_bold text-base text-text_neutral">
              Total de doações até o momento
            </Text>
            {loadingDonations && (
              <LoadingBox customStyle="h-4 w-4/12 mb-2 mt-2 rounded-md bg-slate-400 last:mb-0 " />
            )}
            {!loadingDonations && (
              <Text className="font-reapp_medium text-base text-text_neutral">
                {totalValueDonations}
              </Text>
            )}
          </View>
          <View>
            <FontAwesome5 name="coins" size={27} color="black" />
          </View>
        </View>

        <View className="mb-9 border-b">
          <Text className="mb-4 font-reapp_bold text-base text-text_neutral">
            Eixos
          </Text>

          {loadingDonations && (
            <LoadingBox customStyle="h-60 w-full mb-2 mt-2 rounded-md bg-slate-400 last:mb-0 " />
          )}

          {!loadingDonations &&
            donationsByEixo.map((item, idx) => (
              <View key={idx} className="mb-4 flex-row justify-between">
                <Text className="font-reapp_medium text-base text-text_neutral">
                  {item.eixo}
                </Text>
                <Text className="font-reapp_medium text-base text-text_neutral">
                  {item.value}
                </Text>
              </View>
            ))}
        </View>

        <View>
          <Text className="mb-4 font-reapp_bold text-base text-text_neutral">
            Por segmento
          </Text>

          {loadingDonations && (
            <LoadingBox customStyle="h-60 w-full mb-2 mt-2 rounded-md bg-slate-400 last:mb-0 " />
          )}

          {!loadingDonations &&
            donationsBySegment.map((item, idx) => (
              <View key={idx} className="mb-4 flex-row justify-between">
                <Text className="font-reapp_medium text-base text-text_neutral">
                  {item.segment}
                </Text>
                <Text className="font-reapp_medium text-base text-text_neutral">
                  {item.value}
                </Text>
              </View>
            ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Page;
