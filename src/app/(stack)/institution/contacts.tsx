import { useRoute } from '@react-navigation/native';
import { memo } from 'react';
import { Text, View } from 'react-native';
import { IInstitution } from 'src/types';

function Contacts() {
  const route = useRoute();
  const { institution } = route.params as { institution: IInstitution };

  return (
    <View className="gap-y-5 py-4 bg-white flex-1">
      <View className="gap-y-4">
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
