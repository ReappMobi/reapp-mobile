import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import React, { useEffect, useState, memo } from 'react';
import { View, FlatList } from 'react-native';
import { Button } from 'src/components';
import PartnerCard from 'src/components/PartnerCard';
import colors from 'src/constants/colors';
import { useAuth } from 'src/hooks/useAuth';
import { getPartnerById } from 'src/services/app-core';

function Partners() {
  const [partners, setPartners] = useState([]);
  const auth = useAuth();
  useEffect(() => {
    (async () => {
      const token = await auth.getToken();
      const res = await getPartnerById(auth.user.id, token);
      setPartners(res);
    })();
  }, []);

  const renderHeader = () => (
    <View className="mb-3 items-center justify-center">
      <Button
        endIcon={
          <Ionicons
            name="chevron-forward"
            size={20}
            color={colors.text_neutral}
          />
        }
        customStyles="w-64 justify-center space-x-2"
        onPress={() => {
          router.push({
            pathname: 'partner-create',
          });
        }}
      >
        Cadastrar Novo Parceiro
      </Button>
    </View>
  );

  return (
    <View className="py-4">
      <FlatList
        columnWrapperStyle={{ justifyContent: 'space-evenly' }}
        data={partners}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <PartnerCard image={item.avatar} name={item.name} />
        )}
        ItemSeparatorComponent={() => <View className="h-4" />}
        ListHeaderComponent={renderHeader}
      />
    </View>
  );
}

export default memo(Partners);
