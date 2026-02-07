import { Stack } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { Text } from '@/components/ui/text';
import colors from 'src/constants/colors';

const TermsOfUseScreen = () => {
  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          title: 'Termos de Uso',
          headerBackVisible: true,
          headerTintColor: colors.primary,
          headerShadowVisible: false,
          headerTitleStyle: {
            fontSize: 18,
            fontFamily: 'reapp_medium',
          },
        }}
      />

      <ScrollView
        className="flex-1 px-5 py-4"
        showsVerticalScrollIndicator={false}
      >
        <Text className="font-bold text-xl mb-4">Termos de Uso do Reapp</Text>
        <Text className="text-xs text-gray-500 mb-6">
          Última atualização: Fevereiro de 2025
        </Text>

        <Text className="font-bold text-base mb-2">
          1. Aceitação dos Termos
        </Text>
        <Text className="text-sm text-gray-700 mb-4 leading-5">
          Ao criar uma conta e utilizar o aplicativo Reapp, você concorda com
          estes Termos de Uso. Se você não concordar com qualquer parte destes
          termos, não utilize o aplicativo.
        </Text>

        <Text className="font-bold text-base mb-2">
          2. Descrição do Serviço
        </Text>
        <Text className="text-sm text-gray-700 mb-4 leading-5">
          O Reapp é uma plataforma que conecta doadores, instituições e
          voluntários, facilitando doações e o engajamento social. As
          instituições cadastradas são organizações sem fins lucrativos
          devidamente verificadas.
        </Text>

        <Text className="font-bold text-base mb-2">
          3. Conteúdo Gerado pelo Usuário
        </Text>
        <Text className="text-sm text-gray-700 mb-4 leading-5">
          Os usuários podem criar publicações, comentários e outros conteúdos
          dentro do aplicativo. Ao publicar conteúdo, você declara que:{'\n\n'}
          • O conteúdo é de sua autoria ou você possui os direitos necessários
          para publicá-lo;{'\n'}
          • O conteúdo não viola direitos de terceiros;{'\n'}
          • O conteúdo não é ilegal, ofensivo, difamatório, discriminatório ou
          objetionável de qualquer forma.
        </Text>

        <Text className="font-bold text-base mb-2">
          4. Política de Tolerância Zero
        </Text>
        <Text className="text-sm text-gray-700 mb-4 leading-5">
          O Reapp adota uma política de tolerância zero para conteúdo
          objetionável e comportamento abusivo. Isso inclui, mas não se limita
          a:{'\n\n'}
          • Discurso de ódio, discriminação ou assédio;{'\n'}
          • Conteúdo sexualmente explícito ou pornográfico;{'\n'}
          • Ameaças, intimidação ou bullying;{'\n'}
          • Spam, fraude ou conteúdo enganoso;{'\n'}
          • Conteúdo que promova violência ou atividades ilegais;{'\n'}
          • Informações falsas sobre instituições ou campanhas de doação.
        </Text>

        <Text className="font-bold text-base mb-2">
          5. Denúncias e Moderação
        </Text>
        <Text className="text-sm text-gray-700 mb-4 leading-5">
          Os usuários podem denunciar conteúdos e perfis que violem estes
          termos. Nossa equipe de moderação analisará todas as denúncias e
          tomará as medidas necessárias, incluindo:{'\n\n'}
          • Remoção do conteúdo objetionável;{'\n'}
          • Suspensão temporária da conta do infrator;{'\n'}
          • Banimento permanente em casos de reincidência ou infrações graves.
        </Text>

        <Text className="font-bold text-base mb-2">
          6. Bloqueio de Usuários
        </Text>
        <Text className="text-sm text-gray-700 mb-4 leading-5">
          Você pode bloquear outros usuários a qualquer momento. Ao bloquear um
          usuário, o conteúdo publicado por ele não será mais exibido para você.
        </Text>

        <Text className="font-bold text-base mb-2">
          7. Exclusão de Conta
        </Text>
        <Text className="text-sm text-gray-700 mb-4 leading-5">
          Você pode excluir sua conta a qualquer momento através das
          configurações do aplicativo. A exclusão da conta é permanente e todos
          os seus dados serão removidos de acordo com nossa Política de
          Privacidade.
        </Text>

        <Text className="font-bold text-base mb-2">
          8. Doações
        </Text>
        <Text className="text-sm text-gray-700 mb-4 leading-5">
          As doações realizadas através do Reapp são direcionadas a instituições
          sem fins lucrativos verificadas. O Reapp não cobra taxas sobre as
          doações. Todas as transações são processadas por provedores de
          pagamento terceirizados.
        </Text>

        <Text className="font-bold text-base mb-2">
          9. Alterações nos Termos
        </Text>
        <Text className="text-sm text-gray-700 mb-4 leading-5">
          Reservamo-nos o direito de atualizar estes Termos de Uso a qualquer
          momento. As alterações serão comunicadas através do aplicativo.
        </Text>

        <Text className="font-bold text-base mb-2">10. Contato</Text>
        <Text className="text-sm text-gray-700 mb-8 leading-5">
          Em caso de dúvidas sobre estes Termos de Uso, entre em contato
          conosco pelo Canal de Dúvidas disponível no menu do aplicativo.
        </Text>
      </ScrollView>
    </View>
  );
};

export default TermsOfUseScreen;
