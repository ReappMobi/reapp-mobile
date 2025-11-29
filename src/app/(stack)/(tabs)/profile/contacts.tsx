import { useRoute } from '@react-navigation/native';
import React, { memo } from 'react';
import { Text, View } from 'react-native';
import { IInstitution } from 'src/types';

function Contacts() {
  const route = useRoute();
  const { institution } = route.params as { institution: IInstitution };

  return (
    <View className="flex-1 gap-y-5 py-4 bg-white">
      <View className="gap-y-4 bg-white">
        <Text className="font-regular text-base text-text_neutral">
          Telefone: {institution.phone}
        </Text>
        <Text className="font-regular text-base text-text_neutral">
          Email: {institution.account.email}
        </Text>
      </View>
    </View>
  );
}

export default memo(Contacts);
