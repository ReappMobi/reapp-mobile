import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { router, useNavigation } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { HeaderStatisticsProfile } from 'src/components';
import colors from 'src/constants/colors';
import { useAuth } from 'src/hooks/useAuth';

const DrawerContent = (props) => {
  const navigation = useNavigation();
  const { user, signOut } = useAuth();

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        flex: 1,
        backgroundColor: colors.color_primary,
      }}
    >
      <View className="bg-color_primary px-2 pb-4">
        <HeaderStatisticsProfile
          image={user && user.profileImage}
          name={user && user.name}
          donationsQty={user && user.donations}
          followingQty={user && user.following}
        />
      </View>
      <View className="flex-1 bg-white px-4">
        <View className="mt-4">
          <TouchableOpacity className="mb-4 flex-row justify-between">
            <Text className="font-reapp_bold text-xl">Editar informações</Text>
            <Ionicons name="settings-sharp" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            className="mb-4 flex-row justify-between"
            onPress={() => {
              navigation.dispatch(DrawerActions.closeDrawer());
              router.push('/my-donations');
            }}
          >
            <Text className="font-reapp_bold text-xl">Minhas doações</Text>
            <Ionicons name="bar-chart-outline" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            className="mb-4 flex-row justify-between"
            onPress={() => {
              navigation.dispatch(DrawerActions.closeDrawer());
              router.push('/saved');
            }}
          >
            <Text className="font-reapp_bold text-xl">Salvos</Text>
            <Ionicons name="bookmark-outline" size={26} color="black" />
          </TouchableOpacity>

          <TouchableOpacity className="mb-4 flex-row justify-between">
            <Text className="font-reapp_bold text-xl">Privacidade (LGPD)</Text>
            <Ionicons name="shield-checkmark-outline" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            className="mb-4 flex-row justify-between"
            onPress={() => {
              signOut();
              navigation.dispatch(DrawerActions.closeDrawer());
            }}
          >
            <Text className="font-reapp_bold text-xl">Sair</Text>
            <Ionicons name="exit-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;
