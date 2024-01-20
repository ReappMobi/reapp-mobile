import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text } from 'react-native';

import { styles } from './styles';
import DonationTaxReceiptImage from '../../assets/images/DonationTaxReceiptImage.svg';
import Button from '../../components/Button';
import Header from '../../components/Header';
import ScreenContainer from '../../components/ScreenContainer';
import Colors from '../../constants/Colors';

function DonationTaxReceiptScreen() {
  return (
    <ScreenContainer>
      <Header
        leftComponent={
          <Ionicons name="chevron-back" size={24} color={Colors.text_dark} />
        }
        rightComponent={<Text style={styles.headerTitle}>reapp</Text>}
      />

      <View style={styles.main}>
        <DonationTaxReceiptImage width={228} height={199} />

        <View style={styles.buttons}>
          <Button>Adicionar nota manual</Button>
          <Button>Ler QRCode</Button>
        </View>
      </View>
    </ScreenContainer>
  );
}

export default DonationTaxReceiptScreen;
