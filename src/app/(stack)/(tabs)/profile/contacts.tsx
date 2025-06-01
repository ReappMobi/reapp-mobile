import { useRoute } from '@react-navigation/native';
import React, { memo } from 'react';
import { Text, View } from 'react-native';
import { IInstitution } from 'src/types';

function Contacts() {
  const route = useRoute();
  const { institution } = route.params as { institution: IInstitution };

  /*
  const handleLinkPress = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error('An error occurred', err)
    );

  */

  return (
    <View className="gap-y-5 py-4">
      <View className="gap-y-4">
        <Text className="font-reapp_regular text-base text-text_neutral">
          Telefone: {institution.phone}
        </Text>
        <Text className="font-reapp_regular text-base text-text_neutral">
          Email: {institution.account.email}
        </Text>
        {/*
        <Text className="font-reapp_regular text-base text-text_neutral">
          Endereço: {`${institution.city}/${institution.state}`}
        </Text>
        */}
      </View>
      {/*
      <View className="flex-row justify-center gap-10">
        {institution.facebook && (
          <Pressable onPress={() => handleLinkPress(institution.facebook)}>
            <Ionicons
              name="logo-facebook"
              size={50}
              color={Colors.color_primary}
            />
          </Pressable>
        )}

        {institution.instagram && (
          <Pressable onPress={() => handleLinkPress(institution.instagram)}>
            <Ionicons
              name="logo-instagram"
              size={50}
              color={Colors.color_primary}
            />
          </Pressable>
        )}
      </View>
      */}
      {/*
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
        */}
    </View>
  );
}

export default memo(Contacts);
