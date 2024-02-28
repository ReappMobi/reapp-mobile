import React, { useEffect, memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import BeneficiariesIcon from 'src/assets/images/BeneficiariesIcon.svg';
import CoinsICon from 'src/assets/images/CoinsIcon.svg';
import WalletIcon from 'src/assets/images/WalletIcon.svg';
import { IInstitution } from 'src/types';

type TransparencyViewProps = {
  institution: IInstitution;
};

function TransparencyView({ institution }: TransparencyViewProps) {
  useEffect(() => {}, []);

  return (
    <View className="flex-row flex-wrap justify-center gap-4 py-4">
      <TouchableOpacity className="h-[102] w-[102] items-center justify-between rounded-md bg-white p-2 shadow-xl">
        <Text className="text-center font-_medium text-base text-text_neutral">
          Assistidos
        </Text>
        <BeneficiariesIcon width={52} height={52} />
      </TouchableOpacity>

      <TouchableOpacity className="h-[102] w-[102] items-center justify-between rounded-md bg-white p-2 shadow-xl">
        <Text className="text-center font-_medium text-base text-text_neutral">
          Doações recebidas
        </Text>
        <CoinsICon width={32} height={27} />
      </TouchableOpacity>

      <TouchableOpacity className="h-[102] w-[102] items-center justify-between rounded-md bg-white p-2 shadow-xl">
        <Text className="text-center font-_medium text-base text-text_neutral">
          Despesas
        </Text>
        <WalletIcon width={33} height={34} />
      </TouchableOpacity>
    </View>
  );
}

export default memo(TransparencyView);
