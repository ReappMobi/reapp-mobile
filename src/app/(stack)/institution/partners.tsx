import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState, memo } from 'react';
import { View, FlatList } from 'react-native';
import PartnerCard from 'src/components/PartnerCard';
import { useAuth } from 'src/hooks/useAuth';
import { getPartnerById } from 'src/services/app-core';

function Partners() {
  const [partners, setPartners] = useState([]);
  const route = useRoute();
  const { id } = route.params as { id: number };
  const auth = useAuth();
  useEffect(() => {
    (async () => {
      const token = await auth.getToken();
      const res = await getPartnerById(id, token);
      setPartners(res);
    })();
  }, []);

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
      />
    </View>
  );
}

export default memo(Partners);
