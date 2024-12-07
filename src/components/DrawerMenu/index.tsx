import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { router, useNavigation } from 'expo-router';
import React, { memo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export const DrawerMenu: React.FC = memo(() => {
  const navigation = useNavigation();
  return (
    <View className=" flex h-full w-full flex-col pt-4">
      <View className="flex flex-1 flex-col gap-y-2">
        <TouchableOpacity
          className="mb-4 flex-row justify-between"
          onPress={() => {
            navigation.dispatch(DrawerActions.closeDrawer());
            router.push('/my-donations');
          }}
        >
          <Text className="font-reapp_bold text-lg">Minhas doações</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="mb-4 flex-row justify-between"
          onPress={() => {
            navigation.dispatch(DrawerActions.closeDrawer());
            router.push('/saved');
          }}
        >
          <Text className="font-reapp_bold text-lg">Postagens Salvas</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity className="mb-4 flex-row items-center gap-x-2">
          <Ionicons name="shield-checkmark-outline" size={24} color="black" />
          <Text className="font-reapp_bold text-base">Privacidade (LGPD)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="mb-4 flex-row items-center gap-x-2"
          onPress={() => {
            signOut();
            navigation.dispatch(DrawerActions.closeDrawer());
          }}
        >
          <Ionicons name="exit-outline" size={24} color="gray" />
          <Text className="font-reapp_bold text-base">Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});
