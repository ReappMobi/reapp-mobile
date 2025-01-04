import { Ionicons, FontAwesome6, FontAwesome } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import {
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import { Input, Button } from 'src/components';
import { useAuth } from 'src/hooks/useAuth';

const EditDonorProfile = () => {
  const { user } = useAuth();

  return (
    <KeyboardAvoidingView className="h-screen">
      <View className=" items-center py-4">
        <Text className=" text-xl font-bold">Editar Perfil</Text>
      </View>
      <View className="mb-8 h-max items-center gap-y-2 px-4">
        <Pressable className="relative h-24 w-24 rounded-full bg-color_third">
          {user.avatar && (
            <Image source={{ uri: user.avatar }} className="h-full w-full" />
          )}
          <View className="absolute bottom-0 right-1 h-8 w-8 items-center justify-center rounded-full bg-text_primary">
            <Ionicons name="camera" size={18} color="white" />
          </View>
        </Pressable>
        <View className="w-full">
          <Text className="w-content mb-1 text-sm">Nome</Text>
          <View className="border-1 h-16 w-full flex-row items-center gap-x-1 rounded-md border border-text_primary px-2">
            <Input
              customStyle="flex-1 h-full border-0"
              placeholder={user.name}
            />
            <Ionicons name="person" size={20} color="gray" />
          </View>
        </View>
        <View className="w-full">
          <Text className="w-content mb-1 text-sm">Nota</Text>
          <View className="border-1 h-16 w-full flex-row items-center gap-x-1 rounded-md border border-text_primary px-2">
            <Input
              customStyle="flex-1 h-full border-0"
              placeholder={user.note}
            />
            <Ionicons name="star" size={22} color="gray" />
          </View>
        </View>
        <View className="w-full">
          <Text className="w-content mb-1 text-sm">Email</Text>
          <View className="border-1 h-16 w-full flex-row items-center gap-x-1 rounded-md border border-text_primary px-2">
            <Input
              customStyle="flex-1 h-full border-0"
              placeholder={user.email}
            />
            <FontAwesome name="envelope" size={20} color="gray" />
          </View>
        </View>
        <View className="w-full">
          <Text className="w-content mb-1 text-sm">Senha</Text>
          <View className="border-1 h-16 w-full flex-row items-center gap-x-1 rounded-md border border-text_primary px-2">
            <TextInput
              className="h-full flex-1 border-0"
              secureTextEntry
              placeholder="********"
            />
            <FontAwesome6 name="key" size={20} color="gray" />
          </View>
        </View>
        <View className="w-full">
          <Text className="w-content mb-1 text-sm">Confirmar senha</Text>
          <View className="border-1 h-16 w-full flex-row items-center gap-x-1 rounded-md border border-text_primary px-2">
            <TextInput
              className="h-full flex-1 border-0"
              secureTextEntry
              placeholder="********"
            />
            <FontAwesome6 name="key" size={20} color="gray" />
          </View>
        </View>
      </View>
      <View className="px-4">
        <Button
          customStyles="w-full justify-center bg-color_primary"
          textColor="text-text_light"
        >
          Salvar alterações
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

export default EditDonorProfile;
