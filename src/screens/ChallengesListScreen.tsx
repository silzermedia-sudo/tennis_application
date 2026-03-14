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
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootStackParamList, MainTabsParamList } from '../navigation/types';
import { mockChallenges, mockPlayers, currentUser } from '../data/mockData';

type Props = {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<MainTabsParamList, 'ChallengeTab'>,
    StackNavigationProp<RootStackParamList>
  >;
};

type TabType = 'eingehend' | 'ausgehend' | 'aktiv';

export default function ChallengesListScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>('eingehend');

  const incomingChallenges = mockChallenges.filter(
    (c) => c.opponent.id === currentUser.id && c.status === 'Offen'
  );
  const outgoingChallenges = mockChallenges.filter(
    (c) => c.challenger.id === currentUser.id
  );
  const activeChallenges = mockChallenges.filter((c) => c.status === 'Läuft');

  const getActiveData = () => {
    if (activeTab === 'eingehend') return incomingChallenges;
    if (activeTab === 'ausgehend') return outgoingChallenges;
    return activeChallenges;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Herausforderungen</Text>
        <TouchableOpacity
          style={styles.newChallengeBtn}
          onPress={() => navigation.navigate('Challenge', {})}
        >
          <Text style={styles.newChallengeBtnText}>+ Neu</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {(['eingehend', 'ausgehend', 'aktiv'] as TabType[]).map((tab) => {
          const labels = { eingehend: 'Eingehend', ausgehend: 'Ausgehend', aktiv: 'Aktiv' };
          const counts = {
            eingehend: incomingChallenges.length,
            ausgehend: outgoingChallenges.length,
            aktiv: activeChallenges.length,
          };
          return (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {labels[tab]}
              </Text>
              {counts[tab] > 0 && (
                <View style={[styles.countBadge, activeTab === tab && styles.countBadgeActive]}>
                  <Text style={styles.countText}>{counts[tab]}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {getActiveData().length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>⚔</Text>
            <Text style={styles.emptyTitle}>Keine Herausforderungen</Text>
            <Text style={styles.emptySubtitle}>
              Fordere Spieler in deiner Nähe heraus und besitze Plätze!
            </Text>
            <TouchableOpacity
              style={styles.emptyButton}
              onPress={() => navigation.navigate('Challenge', {})}
            >
              <Text style={styles.emptyButtonText}>Spieler herausfordern</Text>
            </TouchableOpacity>
          </View>
        ) : (
          getActiveData().map((challenge) => {
            const isIncoming = challenge.opponent.id === currentUser.id;
            const otherPlayer = isIncoming ? challenge.challenger : challenge.opponent;
            return (
              <View key={challenge.id} style={styles.challengeCard}>
                <View style={styles.challengeHeader}>
                  <Image source={{ uri: otherPlayer.avatar }} style={styles.challengeAvatar} />
                  <View style={styles.challengeInfo}>
                    <Text style={styles.challengeUsername}>{otherPlayer.username}</Text>
                    <Text style={styles.challengeElo}>{otherPlayer.elo} ELO</Text>
                  </View>
                  <View style={[styles.statusBadge,
                    challenge.status === 'Läuft' && styles.statusActive,
                  ]}>
                    <Text style={styles.statusText}>{challenge.status}</Text>
                  </View>
                </View>

                <View style={styles.challengeDetails}>
                  <View style={styles.challengeDetailRow}>
                    <Text style={styles.challengeDetailIcon}>🎾</Text>
                    <Text style={styles.challengeDetailText}>{challenge.court.name}</Text>
                  </View>
                  <View style={styles.challengeDetailRow}>
                    <Text style={styles.challengeDetailIcon}>🕐</Text>
                    <Text style={styles.challengeDetailText}>{challenge.proposedTime}</Text>
                  </View>
                  <View style={styles.challengeDetailRow}>
                    <Text style={styles.challengeDetailIcon}>📍</Text>
                    <Text style={styles.challengeDetailText}>{challenge.court.distance} entfernt</Text>
                  </View>
                </View>

                {isIncoming && challenge.status === 'Offen' && (
                  <View style={styles.challengeActions}>
                    <TouchableOpacity
                      style={styles.acceptBtn}
                      onPress={() => navigation.navigate('MatchResult', { challengeId: challenge.id })}
                    >
                      <Text style={styles.acceptBtnText}>Annehmen</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.declineBtn}>
                      <Text style={styles.declineBtnText}>Ablehnen</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {challenge.status === 'Läuft' && (
                  <TouchableOpacity
                    style={styles.resultBtn}
                    onPress={() => navigation.navigate('MatchResult', { challengeId: challenge.id })}
                  >
                    <Text style={styles.resultBtnText}>Ergebnis eintragen</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })
        )}

        {/* Nearby Players to Challenge */}
        <View style={styles.nearbySection}>
          <Text style={styles.nearbySectionTitle}>Spieler in der Nähe</Text>
          {mockPlayers.slice(0, 4).map((player) => (
            <TouchableOpacity
              key={player.id}
              style={styles.nearbyPlayer}
              onPress={() => navigation.navigate('Challenge', { playerId: player.id })}
              activeOpacity={0.85}
            >
              <Image source={{ uri: player.avatar }} style={styles.nearbyAvatar} />
              <View style={styles.nearbyInfo}>
                <Text style={styles.nearbyUsername}>{player.username}</Text>
                <Text style={styles.nearbyElo}>{player.elo} ELO · {player.skillLevel}</Text>
              </View>
              <TouchableOpacity
                style={styles.challengeQuickBtn}
                onPress={() => navigation.navigate('Challenge', { playerId: player.id })}
              >
                <Text style={styles.challengeQuickBtnText}>⚔</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
  },
  newChallengeBtn: {
    backgroundColor: '#00FF87',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  newChallengeBtnText: {
    color: '#0D0D0D',
    fontSize: 13,
    fontWeight: '800',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
    gap: 20,
  },
  tab: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#00FF87',
  },
  tabText: {
    color: '#555555',
    fontSize: 14,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  countBadge: {
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 1,
    minWidth: 18,
    alignItems: 'center',
  },
  countBadgeActive: {
    backgroundColor: '#00FF87',
  },
  countText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
    gap: 12,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  emptySubtitle: {
    color: '#555555',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
  },
  emptyButton: {
    backgroundColor: '#00FF87',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginTop: 8,
  },
  emptyButtonText: {
    color: '#0D0D0D',
    fontSize: 14,
    fontWeight: '800',
  },
  challengeCard: {
    marginHorizontal: 20,
    marginTop: 16,
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    gap: 14,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  challengeAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#00FF87',
  },
  challengeInfo: {
    flex: 1,
  },
  challengeUsername: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 3,
  },
  challengeElo: {
    color: '#888888',
    fontSize: 12,
  },
  statusBadge: {
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#3A3A3A',
  },
  statusActive: {
    backgroundColor: 'rgba(0,255,135,0.1)',
    borderColor: '#00FF87',
  },
  statusText: {
    color: '#888888',
    fontSize: 11,
    fontWeight: '700',
  },
  challengeDetails: {
    gap: 6,
  },
  challengeDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  challengeDetailIcon: {
    fontSize: 13,
    width: 20,
  },
  challengeDetailText: {
    color: '#888888',
    fontSize: 13,
  },
  challengeActions: {
    flexDirection: 'row',
    gap: 10,
  },
  acceptBtn: {
    flex: 1,
    backgroundColor: '#00FF87',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  acceptBtnText: {
    color: '#0D0D0D',
    fontSize: 14,
    fontWeight: '800',
  },
  declineBtn: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  declineBtnText: {
    color: '#888888',
    fontSize: 14,
    fontWeight: '600',
  },
  resultBtn: {
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3A3A3A',
  },
  resultBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  nearbySection: {
    marginTop: 28,
    paddingHorizontal: 20,
  },
  nearbySectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  nearbyPlayer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
    gap: 12,
  },
  nearbyAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  nearbyInfo: {
    flex: 1,
  },
  nearbyUsername: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 3,
  },
  nearbyElo: {
    color: '#555555',
    fontSize: 12,
  },
  challengeQuickBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#00FF87',
  },
  challengeQuickBtnText: {
    fontSize: 16,
  },
});
