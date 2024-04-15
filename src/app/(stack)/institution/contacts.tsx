import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import React, { memo } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Colors from 'src/constants/colors';
import { IInstitution } from 'src/types';

function Contacts() {
  const route = useRoute();
  const { institution } = route.params as { institution: IInstitution };

  return (
    <View className="gap-y-5 py-4">
      <View className="gap-y-4">
        <Text className="font-reapp_regular text-base text-text_neutral">
          Telefone: {institution.phone}
        </Text>
        <Text className="font-reapp_regular text-base text-text_neutral">
          Email: {institution.email}
        </Text>
        <Text className="font-reapp_regular text-base text-text_neutral">
          Endereço: {institution.address}
        </Text>
      </View>

      <View className="gap-y-3">
        {institution.whatsapp && (
          <View className="flex-row items-center gap-x-3">
            <Ionicons
              name="logo-whatsapp"
              size={24}
              color={Colors.color_primary}
            />
            <Text className="font-reapp_regular text-base text-text_neutral">
              {institution.whatsapp}
            </Text>
          </View>
        )}

        {institution.facebook && (
          <View className="flex-row items-center gap-x-3">
            <Ionicons
              name="logo-facebook"
              size={24}
              color={Colors.color_primary}
            />
            <Text className="font-reapp_regular text-base text-text_neutral">
              {institution.facebook}
            </Text>
          </View>
        )}

        {institution.instagram && (
          <View className="flex-row items-center gap-x-3">
            <Ionicons
              name="logo-instagram"
              size={24}
              color={Colors.color_primary}
            />
            <Text className="font-reapp_regular text-base text-text_neutral">
              {institution.instagram}
            </Text>
          </View>
        )}
      </View>

      {institution.coordinate && (
        <View>
          <Text className="mb-4 font-reapp_regular text-base text-text_neutral">
            Localização
          </Text>

          <MapView
            className="h-40 w-full"
            initialRegion={{
              latitude: institution.coordinate.latitude,
              longitude: institution.coordinate.longitude,
              latitudeDelta: 0.0422,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              key={institution.id}
              coordinate={{
                latitude: institution.coordinate.latitude,
                longitude: institution.coordinate.longitude,
              }}
              title={institution.name}
              description={institution.name}
            />
          </MapView>
        </View>
      )}
    </View>
  );
}

export default memo(Contacts);
