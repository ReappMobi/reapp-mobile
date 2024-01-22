import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text } from 'react-native';

import { styles } from './styles';
import DonationConfirmScreenImage from '../../assets/images/DonationConfirmScreenImage.svg';
import Header from '../../components/Header';
import ScreenContainer from '../../components/ScreenContainer';
import Colors from '../../constants/Colors';

function DonationConfirmScreen({ name, date, value }) {
  return (
    <View style={styles.rootContainer}>
      <View style={styles.mainContainer}>
        <ScreenContainer>
          <Header
            leftComponent={
              <Ionicons
                name="chevron-back"
                size={24}
                color={Colors.text_light}
              />
            }
            rightComponent={<Text style={styles.headerTitle}>reapp</Text>}
            color={Colors.color_primary}
          />

          <View style={styles.illustrate}>
            <DonationConfirmScreenImage width={256} height={199} />
          </View>

          <Text style={styles.thanksText}>
            Obrigado, {name}. Você doou para essa instituição
          </Text>
        </ScreenContainer>
      </View>

      <View style={styles.infoContainer}>
        <ScreenContainer>
          <View style={styles.infoTexts}>
            <Text style={styles.dateText}>{date}</Text>
            <Text style={styles.nameText}>{name}</Text>
            <Text style={styles.valueText}>{value}</Text>
          </View>
        </ScreenContainer>
      </View>
    </View>
  );
}

export default DonationConfirmScreen;
