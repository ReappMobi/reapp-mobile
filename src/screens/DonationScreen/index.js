import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';

import DonationScreenImaget from '../../assets/images/DonationScreenImage.svg';
import Button from '../../components/Button';
import Header from '../../components/Header';
import ScreenContainer from '../../components/ScreenContainer';
import Colors from '../../constants/Colors';

export default function DonationScreen() {
  return (
    <ScreenContainer>
      <Header
        leftComponent={
          <Ionicons name="chevron-back" size={24} color={Colors.text_dark} />
        }
        rightComponent={<Text style={styles.headerTitle}>reapp</Text>}
      />
      <View style={styles.imageContainer}>
        <DonationScreenImaget width={256} height={274.96} />
        <Text style={styles.sectionTitle}>
          Quer nos ajudar? Sinta-se livre com uma das opções abaixo
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonGroup}>
          <Button> Doação fixa </Button>
          <Button> Doação pontual </Button>
        </View>
        <View style={styles.buttonGroup}>
          <Button> Nota fiscal </Button>
          <Button> Insumos </Button>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = {
  headerTitle: {
    fontFamily: 'bold',
    fontSize: 24,
    textTransform: 'uppercase',
    color: Colors.color_primary,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  sectionTitle: {
    fontFamily: 'bold',
    fontSize: 20,
    color: Colors.text_dark,
    textAlign: 'center',
  },
  buttonsContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    gap: 6,
  },
  buttonGroup: {
    flex: 1,
    flexDirection: 'column',
    gap: 24,
    justifyContent: 'space-evenly',
  },
  buttonText: {
    fontFamily: 'medium',
    fontSize: 16,
    color: Colors.text_neutral,
  },
};
