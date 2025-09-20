import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Text, View } from 'react-native';
import ProfileSelectorPageImage from 'src/assets/images/ProfileSelectorPageImage.svg';
import { Button } from 'src/components';
import colors from 'src/constants/colors';

export default function ProfileSelector() {
  return (
    <View className="flex-1  items-center gap-y-8 bg-white p-4">
      <ProfileSelectorPageImage width={256} height={274.96} />
      <Text className="text-text-dark text-center font-reapp_bold text-base">
        Obrigado por escolher ser juntar a nós
      </Text>
      <View className="gap-y-4">
        <View>
          <Button
            endIcon={
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.text_neutral}
              />
            }
            customStyles="w-64 justify-center gap-x-2"
            onPress={() => {
              router.replace({ pathname: 'sign-up-donor' });
            }}
          >
            Sou doador
          </Button>
        </View>

        <View>
          <Button
            endIcon={
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.text_neutral}
              />
            }
            customStyles="w-64 justify-center gap-x-2"
            onPress={() => router.replace({ pathname: '/sign-up-institution' })}
          >
            Sou Instituição
          </Button>
        </View>
      </View>
    </View>
  );
}
