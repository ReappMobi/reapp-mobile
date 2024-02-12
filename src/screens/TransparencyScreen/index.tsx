import { FontAwesome5 } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ScreenContainer, Header } from 'src/components';
import {
  getDonationsByEixo,
  getDonationsBySegment,
} from 'src/services/app-core';

function TransparencyScreen() {
  const [donationsByEixo, setDonationsByEixo] = useState([]);
  const [donationsBySegment, setDonationsBySegment] = useState([]);
  const [totalValueDonations, setTotalValueDonations] = useState(null);

  useEffect(() => {
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
    })();
  }, []);

  return (
    <ScrollView>
      <ScreenContainer>
        <View className="flex-1 py-4">
          <Header
            centerComponent={
              <View className="flex-row items-center gap-x-2">
                <Text className="font-_bold text-base text-text_neutral">
                  Transparência
                </Text>
              </View>
            }
          />

          <View className="mb-9 flex-row items-center justify-between border-b pb-4">
            <View>
              <Text className="font-_bold text-base text-text_neutral">
                Total de doações até o momento
              </Text>
              <Text className="font-_medium text-base text-text_neutral">
                {totalValueDonations}
              </Text>
            </View>
            <View>
              <FontAwesome5 name="coins" size={27} color="black" />
            </View>
          </View>

          <View className="mb-9 border-b">
            <Text className="mb-4 font-_bold text-base text-text_neutral">
              Eixos
            </Text>

            {donationsByEixo.map((item, idx) => (
              <View key={idx} className="mb-4 flex-row justify-between">
                <Text className="font-_medium text-base text-text_neutral">
                  {item.eixo}
                </Text>
                <Text className="font-_medium text-base text-text_neutral">
                  {item.value}
                </Text>
              </View>
            ))}
          </View>

          <View>
            <Text className="mb-4 font-_bold text-base text-text_neutral">
              Por segmento
            </Text>

            {donationsBySegment.map((item, idx) => (
              <View key={idx} className="mb-4 flex-row justify-between">
                <Text className="font-_medium text-base text-text_neutral">
                  {item.segment}
                </Text>
                <Text className="font-_medium text-base text-text_neutral">
                  {item.value}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScreenContainer>
    </ScrollView>
  );
}

export default TransparencyScreen;
