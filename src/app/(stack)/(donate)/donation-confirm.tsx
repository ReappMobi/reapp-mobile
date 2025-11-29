import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import DonationConfirmScreenImage from 'src/assets/images/DonationConfirmScreenImage.svg';
import { useAuth } from 'src/hooks/useAuth';

const formatDate = () => {
  const now = new Date();
  const formatedDate = format(now, 'dd MMM yyyy, HH:mm', { locale: ptBR });
  return formatedDate.toUpperCase();
};

const DonationConfirmPage = () => {
  const params = useLocalSearchParams();
  const { user } = useAuth();
  const { value } = params;
  const date = formatDate();
  return (
    <>
      <View className="items-center bg-primary px-4 pb-4">
        <View className="my-5">
          <DonationConfirmScreenImage width={256} height={199} />
        </View>
        <View>
          <Text className="text-center font-bold text-xl text-white">
            Obrigado, {user.name}. Você doou para essa instituição
          </Text>
        </View>
      </View>
      <View className="mt-8 flex-1 items-center">
        <View className="items-center gap-y-1">
          <Text className="font-medium text-base text-text_gray">{date}</Text>
          <Text className="text-text-neutral font-bold text-xl">
            {user.name}
          </Text>
          <Text className="font-regular text-xl">{value}</Text>
        </View>
      </View>
    </>
  );
};

export default DonationConfirmPage;
