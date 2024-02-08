import {
  Ionicons,
  MaterialIcons,
  FontAwesome,
  SimpleLineIcons,
} from '@expo/vector-icons';
import React, { useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import ScreenContainer from 'src/components/ScreenContainer';
import AuthContext from 'src/contexts/auth';

const UserProfileScreen = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Carregando informações do usuário...</Text>
      </View>
    );
  }

  /*
const UserProfileScreen = () => {
  const userMock = {
    name: 'Usuário Exemplo',
    donations: 5,
    following: 2,
    profileImage: 'https://via.placeholder.com/150',
  };
  */
  const handlePress = (menu) => {
    console.log(`${menu} foi pressionado`);
  };

  const MenuItem = ({ IconComponent, iconName, title, onPress }) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
      }}
    >
      <View
        style={{ width: 30, justifyContent: 'center', alignItems: 'center' }}
      >
        <IconComponent name={iconName} size={24} color="black" />
      </View>
      <Text style={{ marginLeft: 12, fontSize: 18, fontWeight: 'bold' }}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer>
      <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ alignItems: 'center', padding: 20 }}>
          <Image
            source={{ uri: user.profileImage }}
            style={{ height: 80, width: 80, borderRadius: 40 }}
          />
          <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>
            {user.name}
          </Text>
          <Text
            style={{ fontSize: 16 }}
          >{`${user.donations} Doações • ${user.following} Seguindo`}</Text>
        </View>

        <MenuItem
          IconComponent={Ionicons}
          iconName="ios-settings-outline"
          title="Editar Informações"
          onPress={() => handlePress('Editar Informações')}
        />
        <MenuItem
          IconComponent={MaterialIcons}
          iconName="wallet-giftcard"
          title="Minhas doações"
          onPress={() => handlePress('Minhas doações')}
        />
        <MenuItem
          IconComponent={FontAwesome}
          iconName="bookmark-o"
          title="Salvos"
          onPress={() => handlePress('Salvos')}
        />
        <MenuItem
          IconComponent={SimpleLineIcons}
          iconName="shield"
          title="Privacidade (LGPD)"
          onPress={() => handlePress('Privacidade (LGPD)')}
        />
        <MenuItem
          IconComponent={Ionicons}
          iconName="ios-exit-outline"
          title="Sair"
          onPress={() => handlePress('Sair')}
        />
      </ScrollView>
    </ScreenContainer>
  );
};

export default UserProfileScreen;
