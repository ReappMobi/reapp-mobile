import Ionicons from '@expo/vector-icons/Ionicons';
import { StackActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';
import SignUpSplashScreenImage from 'src/assets/images/SignUpSplashScreenImage.svg';
import { Button, Header, ScreenContainer } from 'src/components';
import Colors from 'src/constants/colors';

export default function ProfileSelectorScreen() {
  const navigation = useNavigation();
  return (
    <ScreenContainer>
      <View className="py-4">
        <Header
          leftComponent={
            <Text className="font-_bold text-2xl uppercase text-text_primary">
              reapp
            </Text>
          }
        />
      </View>

      <View className="items-center justify-center gap-8">
        <SignUpSplashScreenImage width={256} height={274.96} />

        <View className="items-center gap-y-4">
          <Text className="text-text-dark text-center font-_bold text-base">
            Obrigado por escolher ser juntar a nós
          </Text>

          <View className="gap-y-4">
            <View>
              <Button
                endIcon={
                  <Ionicons
                    name="chevron-forward"
                    size={24}
                    color={Colors.text_neutral}
                  />
                }
                customStyles="w-64 justify-center"
                onPress={() => {
                  navigation.dispatch(
                    StackActions.push('SignUpDonor', { isDonor: true })
                  );
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
                    size={24}
                    color={Colors.text_neutral}
                  />
                }
                customStyles="w-64 justify-center"
                onPress={() => {
                  navigation.dispatch(
                    StackActions.push('SignUpInstitution', {
                      isDonor: false,
                    })
                  );
                }}
              >
                Sou Instituição
              </Button>
            </View>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
}
