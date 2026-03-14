import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { currentUser, mockPlayers } from '../data/mockData';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'MatchResult'>;
  route: RouteProp<RootStackParamList, 'MatchResult'>;
};

export default function MatchResultScreen({ navigation, route }: Props) {
  const opponent = mockPlayers[0];
  const [set1Player1, setSet1Player1] = useState('6');
  const [set1Player2, setSet1Player2] = useState('4');
  const [set2Player1, setSet2Player1] = useState('7');
  const [set2Player2, setSet2Player2] = useState('5');
  const [confirmed, setConfirmed] = useState(false);

  const player1EloChange = +24;
  const player2EloChange = -18;

  if (confirmed) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.confirmationContainer}>
            <View style={styles.winBadge}>
              <Text style={styles.winBadgeText}>SIEG</Text>
            </View>
            <Text style={styles.confirmTitle}>Ergebnis bestätigt!</Text>
            <Text style={styles.confirmSubtitle}>
              Das Match-Ergebnis wurde von beiden Spielern bestätigt.
            </Text>

            <View style={styles.eloChangeRow}>
              <View style={styles.eloChangeItem}>
                <Image source={{ uri: currentUser.avatar }} style={styles.eloAvatar} />
                <Text style={styles.eloName}>{currentUser.username}</Text>
                <Text style={styles.eloPositive}>+{player1EloChange} ELO</Text>
                <Text style={styles.eloNew}>Neu: {currentUser.elo + player1EloChange}</Text>
              </View>
              <Text style={styles.vsText}>VS</Text>
              <View style={styles.eloChangeItem}>
                <Image source={{ uri: opponent.avatar }} style={styles.eloAvatar} />
                <Text style={styles.eloName}>{opponent.username}</Text>
                <Text style={styles.eloNegative}>{player2EloChange} ELO</Text>
                <Text style={styles.eloNew}>Neu: {opponent.elo + player2EloChange}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => navigation.navigate('MainTabs')}
            >
              <Text style={styles.doneButtonText}>Fertig</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Match-Ergebnis</Text>
          <TouchableOpacity style={styles.moreBtn}>
            <Text style={styles.moreIcon}>⋮</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Players header */}
        <View style={styles.playersHeader}>
          <View style={styles.playerSide}>
            <Image source={{ uri: currentUser.avatar }} style={styles.playerAvatar} />
            <View style={styles.playerBadge}>
              <Text style={styles.playerBadgeText}>GOLD</Text>
            </View>
            <Text style={styles.playerName}>{currentUser.name}</Text>
          </View>

          <View style={styles.vsContainer}>
            <View style={styles.winLabel}>
              <Text style={styles.winText}>SIEG</Text>
            </View>
            <Text style={styles.vsLabel}>VS</Text>
          </View>

          <View style={styles.playerSide}>
            <Image source={{ uri: opponent.avatar }} style={styles.playerAvatar} />
            <View style={[styles.playerBadge, styles.playerBadgeSilver]}>
              <Text style={styles.playerBadgeText}>SILBER</Text>
            </View>
            <Text style={styles.playerName}>{opponent.name}</Text>
          </View>
        </View>

        {/* Score Entry */}
        <View style={styles.scoreSection}>
          <View style={styles.scoreRow}>
            <Text style={styles.scoreSetLabel}>SATZ 1</Text>
            <View style={styles.scoreInputRow}>
              <View style={styles.scoreBox}>
                <Text style={styles.scoreValue}>{set1Player1}</Text>
              </View>
              <Text style={styles.scoreSeparator}>–</Text>
              <View style={styles.scoreBox}>
                <Text style={styles.scoreValue}>{set1Player2}</Text>
              </View>
            </View>
          </View>
          <View style={styles.scoreRow}>
            <Text style={styles.scoreSetLabel}>SATZ 2</Text>
            <View style={styles.scoreInputRow}>
              <View style={styles.scoreBox}>
                <Text style={styles.scoreValue}>{set2Player1}</Text>
              </View>
              <Text style={styles.scoreSeparator}>–</Text>
              <View style={styles.scoreBox}>
                <Text style={styles.scoreValue}>{set2Player2}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ELO Projection */}
        <View style={styles.eloSection}>
          <Text style={styles.eloSectionTitle}>RANG-PROGNOSE</Text>

          <View style={styles.eloProjectionCard}>
            <View style={styles.eloProjectionRow}>
              <Text style={styles.projectionTrend}>↑</Text>
              <Image source={{ uri: currentUser.avatar }} style={styles.projectionAvatar} />
              <View style={styles.projectionInfo}>
                <Text style={styles.projectionName}>{currentUser.name}</Text>
                <Text style={styles.projectionRank}>Neuer Rang: {currentUser.worldRank - 5}</Text>
              </View>
              <Text style={styles.projectionEloPositive}>+{player1EloChange} ELO</Text>
            </View>

            <View style={styles.eloProjectionRow}>
              <Text style={styles.projectionTrendDown}>↓</Text>
              <Image source={{ uri: opponent.avatar }} style={styles.projectionAvatar} />
              <View style={styles.projectionInfo}>
                <Text style={styles.projectionName}>{opponent.name}</Text>
                <Text style={styles.projectionRank}>Neuer Rang: {opponent.worldRank + 12}</Text>
              </View>
              <Text style={styles.projectionEloNegative}>{player2EloChange} ELO</Text>
            </View>
          </View>
        </View>

        {/* Match details */}
        <View style={styles.detailsSection}>
          <Text style={styles.detailsLabel}>ZEITPUNKT</Text>
          <Text style={styles.detailsValue}>Vor 1 Std 12 Min</Text>
          <View style={styles.detailsDivider} />
          <Text style={styles.detailsNote}>
            Beide Spieler müssen das Ergebnis bestätigen, damit es gezählt wird.
          </Text>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Confirm Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => setConfirmed(true)}
          activeOpacity={0.85}
        >
          <Text style={styles.confirmButtonText}>Ergebnis bestätigen</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.disputeButton}>
          <Text style={styles.disputeText}>Ergebnis anfechten</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backIcon: {
    color: '#FFFFFF',
    fontSize: 22,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  moreBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreIcon: {
    color: '#555555',
    fontSize: 22,
  },
  playersHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#1A1A1A',
    marginHorizontal: 20,
    borderRadius: 16,
    gap: 8,
  },
  playerSide: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  playerAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#00FF87',
  },
  playerBadge: {
    backgroundColor: '#FFD700',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  playerBadgeSilver: {
    backgroundColor: '#C0C0C0',
  },
  playerBadgeText: {
    color: '#0D0D0D',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  playerName: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  vsContainer: {
    alignItems: 'center',
    gap: 6,
  },
  winLabel: {
    backgroundColor: '#00FF87',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  winText: {
    color: '#0D0D0D',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  vsLabel: {
    color: '#555555',
    fontSize: 14,
    fontWeight: '700',
  },
  scoreSection: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    gap: 14,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scoreSetLabel: {
    color: '#555555',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    width: 60,
  },
  scoreInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  scoreBox: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#2A2A2A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#3A3A3A',
  },
  scoreValue: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
  },
  scoreSeparator: {
    color: '#555555',
    fontSize: 20,
    fontWeight: '700',
  },
  eloSection: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  eloSectionTitle: {
    color: '#555555',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  eloProjectionCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 14,
    padding: 16,
    gap: 14,
  },
  eloProjectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  projectionTrend: {
    color: '#00FF87',
    fontSize: 18,
    fontWeight: '700',
    width: 20,
  },
  projectionTrendDown: {
    color: '#FF4444',
    fontSize: 18,
    fontWeight: '700',
    width: 20,
  },
  projectionAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  projectionInfo: {
    flex: 1,
  },
  projectionName: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
  },
  projectionRank: {
    color: '#555555',
    fontSize: 11,
  },
  projectionEloPositive: {
    color: '#00FF87',
    fontSize: 15,
    fontWeight: '800',
  },
  projectionEloNegative: {
    color: '#FF4444',
    fontSize: 15,
    fontWeight: '800',
  },
  detailsSection: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#1A1A1A',
    borderRadius: 14,
    padding: 16,
  },
  detailsLabel: {
    color: '#555555',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 4,
  },
  detailsValue: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  detailsDivider: {
    height: 1,
    backgroundColor: '#2A2A2A',
    marginBottom: 12,
  },
  detailsNote: {
    color: '#666666',
    fontSize: 12,
    lineHeight: 18,
  },
  footer: {
    padding: 20,
    paddingBottom: 34,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#1A1A1A',
    backgroundColor: '#0D0D0D',
  },
  confirmButton: {
    backgroundColor: '#00FF87',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#0D0D0D',
    fontSize: 15,
    fontWeight: '800',
  },
  disputeButton: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  disputeText: {
    color: '#FF4444',
    fontSize: 13,
    fontWeight: '600',
  },
  confirmationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 16,
  },
  winBadge: {
    backgroundColor: '#00FF87',
    borderRadius: 50,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  winBadgeText: {
    color: '#0D0D0D',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1,
  },
  confirmTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center',
  },
  confirmSubtitle: {
    color: '#888888',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  eloChangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    gap: 16,
    width: '100%',
  },
  eloChangeItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  eloAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#00FF87',
  },
  eloName: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  eloPositive: {
    color: '#00FF87',
    fontSize: 16,
    fontWeight: '900',
  },
  eloNegative: {
    color: '#FF4444',
    fontSize: 16,
    fontWeight: '900',
  },
  eloNew: {
    color: '#555555',
    fontSize: 11,
  },
  vsText: {
    color: '#555555',
    fontSize: 16,
    fontWeight: '700',
  },
  doneButton: {
    width: '100%',
    backgroundColor: '#00FF87',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  doneButtonText: {
    color: '#0D0D0D',
    fontSize: 15,
    fontWeight: '800',
  },
});
