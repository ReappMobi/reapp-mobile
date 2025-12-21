import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from 'src/hooks/useAuth';
import { POSTS_PREFIX_KEY, useCreatePost } from 'src/services/posts/post.service';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';

export default function CreatePostPage() {
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { user } = useAuth();
  const { mutateAsync: createPost, isPending: loading } = useCreatePost();
  const _queryClient = useQueryClient();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permissão necessária',
        'Precisamos de acesso à galeria para selecionar imagens.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  const handleSubmit = async () => {
    if (!description.trim()) {
      Alert.alert('Erro', 'A descrição é obrigatória.');
      return;
    }

    if (!selectedImage) {
      Alert.alert('Erro', 'Selecione uma imagem.');
      return;
    }

    try {
      await createPost({
        content: description,
        media: selectedImage,
      });

      // Refetch posts is handled by mutation onSuccess
      // But maybe we want to force something specific or navigate back.
      Alert.alert('Sucesso', 'Postagem criada com sucesso!');
      router.back();
    } catch (error: any) {
      Alert.alert(
        'Erro',
        error?.message || 'Não foi possível criar a postagem.'
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 p-4">
          <View className="flex-row items-center mb-4">
            <Image
              source={{
                uri:
                  user?.account?.media?.remoteUrl ||
                  'https://via.placeholder.com/150',
              }}
              className="h-12 w-12 rounded-full mr-3"
            />
            <Text className="font-bold text-lg text-gray-800">
              {user?.account?.name}
            </Text>
          </View>

          <TextInput
            className="text-lg text-gray-700 mb-4"
            placeholder="No que você está pensando?"
            multiline
            value={description}
            onChangeText={setDescription}
            style={{ minHeight: 100, textAlignVertical: 'top' }}
          />

          {selectedImage ? (
            <View className="relative mb-4">
              <Image
                source={{ uri: selectedImage }}
                className="w-full h-64 rounded-lg"
                resizeMode="cover"
              />
              <TouchableOpacity
                className="absolute top-2 right-2 bg-black/50 p-2 rounded-full"
                onPress={handleRemoveImage}
              >
                <Ionicons name="close" size={20} color="white" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              className="flex-row items-center justify-center bg-gray-100 p-4 rounded-lg mb-4 border border-dashed border-gray-300"
              onPress={pickImage}
            >
              <Ionicons name="image-outline" size={24} color="#666" />
              <Text className="ml-2 text-gray-600 font-medium">
                Adicionar foto
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View className="p-4 border-t border-gray-100">
          <Button
            className="w-full"
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-bold text-center">Publicar</Text>
            )}
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
