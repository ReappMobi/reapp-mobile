import { Ionicons } from '@expo/vector-icons';
import React, { useContext } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { HeaderStatisticsProfile, ScreenContainer } from 'src/components';
import AuthContext from 'src/contexts/auth';

function UserProfilePage() {
  const { user } = useContext(AuthContext);

  return (
    <ScreenContainer>
      <View className="py-4">
        <HeaderStatisticsProfile
          image={user && user.profileImage}
          name={user && user.name}
          donationsQty={user && user.donations}
          followingQty={user && user.following}
        />

        <View className="mt-4">
          <TouchableOpacity className="mb-4 flex-row justify-between">
            <Text className="font-_bold text-xl">Editar informações</Text>
            <Ionicons name="settings-sharp" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity className="mb-4 flex-row justify-between">
            <Text className="font-_bold text-xl">Minhas doações</Text>
            <Ionicons name="bar-chart-outline" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity className="mb-4 flex-row justify-between">
            <Text className="font-_bold text-xl">Salvos</Text>
            <Ionicons name={'bookmark-outline'} size={26} color="black" />
          </TouchableOpacity>

          <TouchableOpacity className="mb-4 flex-row justify-between">
            <Text className="font-_bold text-xl">Privacidade (LGPD)</Text>
            <Ionicons name="shield-checkmark-outline" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity className="mb-4 flex-row justify-between">
            <Text className="font-_bold text-xl">Sair</Text>
            <Ionicons name="exit-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </ScreenContainer>
  );
}

export default UserProfilePage;
