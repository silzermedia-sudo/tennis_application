import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  FlatList,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../navigation/types';
import { MainTabsParamList } from '../navigation/types';
import { currentUser, mockCourts, mockChallenges, mockPlayers } from '../data/mockData';

type Props = {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<MainTabsParamList, 'Home'>,
    StackNavigationProp<RootStackParamList>
  >;
};

export default function HomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={{ uri: currentUser.avatar }}
              style={styles.headerAvatar}
            />
            <View style={styles.headerTextContainer}>
              <Text style={styles.logoText}>CourtBuddy</Text>
            </View>
          </View>
          <View style={styles.eloBadge}>
            <Text style={styles.eloText}>ELO: {currentUser.elo}</Text>
          </View>
        </View>

        {/* Player Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroLeft}>
            <Text style={styles.heroUsername}>{currentUser.username}</Text>
            <View style={styles.levelRow}>
              <View style={styles.levelBadge}>
                <Text style={styles.levelText}>LEVEL {currentUser.level}</Text>
              </View>
              <View style={styles.levelBar}>
                <View style={[styles.levelBarFill, { width: '65%' }]} />
              </View>
            </View>
          </View>
          <View style={styles.heroRight}>
            <Text style={styles.rankLabel}>WELTRANG</Text>
            <Text style={styles.rankNumber}>#{currentUser.worldRank}</Text>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{currentUser.elo}</Text>
            <Text style={styles.statLabel}>ELO</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{currentUser.matchesPlayed}</Text>
            <Text style={styles.statLabel}>MATCHES</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{currentUser.winRate}%</Text>
            <Text style={styles.statLabel}>GEWINNRATE</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{currentUser.ownedCourts.length}</Text>
            <Text style={styles.statLabel}>PLÄTZE</Text>
          </View>
        </View>

        {/* Nearby Courts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nahegelegene Plätze</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Map')}>
              <Text style={styles.sectionLink}>KARTE ANZEIGEN</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.courtsScroll}>
            {mockCourts.map((court) => (
              <TouchableOpacity
                key={court.id}
                style={styles.courtCard}
                onPress={() => navigation.navigate('CourtDetail', { courtId: court.id })}
                activeOpacity={0.85}
              >
                {/* Court image placeholder */}
                <View style={styles.courtImageContainer}>
                  <View style={styles.courtImagePlaceholder}>
                    <Text style={styles.courtImageIcon}>🎾</Text>
                  </View>
                  <View style={styles.distanceBadge}>
                    <Text style={styles.distanceText}>{court.distance}</Text>
                  </View>
                  {court.livePlaying && (
                    <View style={styles.liveBadge}>
                      <View style={styles.liveDot} />
                      <Text style={styles.liveText}>LIVE</Text>
                    </View>
                  )}
                </View>
                <View style={styles.courtCardContent}>
                  <Text style={styles.courtName} numberOfLines={1}>{court.name}</Text>
                  {court.currentOwner && (
                    <View style={styles.ownerRow}>
                      <Text style={styles.ownerIcon}>👑</Text>
                      <Text style={styles.ownerText} numberOfLines={1}>
                        {court.currentOwner.username} besitzt diesen Platz
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Open Challenges */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Offene Herausforderungen</Text>
            <TouchableOpacity>
              <Text style={styles.filterIcon}>≡</Text>
            </TouchableOpacity>
          </View>

          {mockChallenges.map((challenge) => {
            const isChallenger = challenge.challenger.id !== currentUser.id;
            const opponent = isChallenger ? challenge.challenger : challenge.opponent;
            return (
              <View key={challenge.id} style={styles.challengeItem}>
                <Image
                  source={{ uri: opponent.avatar }}
                  style={styles.challengeAvatar}
                />
                <View style={styles.challengeInfo}>
                  <Text style={styles.challengeName}>{opponent.username}</Text>
                  <View style={styles.challengeEloRow}>
                    <Text style={styles.challengeElo}>{opponent.elo} ELO</Text>
                    <Text style={styles.challengeStatus}>{challenge.status}</Text>
                  </View>
                </View>
                {challenge.status === 'Offen' && (
                  <TouchableOpacity
                    style={styles.acceptButton}
                    onPress={() => navigation.navigate('Challenge', { challengeId: challenge.id })}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.acceptText}>ANNEHMEN</Text>
                  </TouchableOpacity>
                )}
                {challenge.status === 'Läuft' && (
                  <TouchableOpacity style={styles.watchButton}>
                    <Text style={styles.watchText}>VERFOLGEN</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <TouchableOpacity
            style={styles.quickActionPrimary}
            onPress={() => navigation.navigate('Challenge', {})}
            activeOpacity={0.85}
          >
            <Text style={styles.quickActionIcon}>⚔</Text>
            <Text style={styles.quickActionText}>Spieler herausfordern</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickActionSecondary}
            onPress={() => navigation.navigate('MatchResult', {})}
            activeOpacity={0.85}
          >
            <Text style={styles.quickActionIcon}>📊</Text>
            <Text style={styles.quickActionTextDark}>Ergebnis eintragen</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 20 }} />
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
    paddingBottom: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#00FF87',
  },
  headerTextContainer: {},
  logoText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  eloBadge: {
    backgroundColor: '#00FF87',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  eloText: {
    color: '#0D0D0D',
    fontSize: 13,
    fontWeight: '800',
  },
  heroCard: {
    marginHorizontal: 20,
    marginTop: 12,
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroLeft: {
    flex: 1,
  },
  heroUsername: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  levelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  levelBadge: {
    backgroundColor: '#00FF87',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  levelText: {
    color: '#0D0D0D',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  levelBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#2A2A2A',
    borderRadius: 2,
  },
  levelBarFill: {
    height: 4,
    backgroundColor: '#00FF87',
    borderRadius: 2,
  },
  heroRight: {
    alignItems: 'flex-end',
  },
  rankLabel: {
    color: '#555555',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 4,
  },
  rankNumber: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 12,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    paddingVertical: 14,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  statLabel: {
    color: '#555555',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#2A2A2A',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  sectionLink: {
    color: '#00FF87',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  filterIcon: {
    color: '#555555',
    fontSize: 20,
  },
  courtsScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  courtCard: {
    width: 160,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    marginRight: 12,
    overflow: 'hidden',
  },
  courtImageContainer: {
    height: 100,
    position: 'relative',
  },
  courtImagePlaceholder: {
    flex: 1,
    backgroundColor: '#0A2010',
    alignItems: 'center',
    justifyContent: 'center',
  },
  courtImageIcon: {
    fontSize: 32,
  },
  distanceBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 8,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  distanceText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  liveBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0,255,135,0.15)',
    borderRadius: 8,
    paddingHorizontal: 7,
    paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: '#00FF87',
  },
  liveDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#00FF87',
  },
  liveText: {
    color: '#00FF87',
    fontSize: 9,
    fontWeight: '800',
  },
  courtCardContent: {
    padding: 10,
  },
  courtName: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 6,
  },
  ownerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ownerIcon: {
    fontSize: 11,
  },
  ownerText: {
    color: '#888888',
    fontSize: 10,
    flex: 1,
  },
  challengeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
    gap: 12,
  },
  challengeAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  challengeInfo: {
    flex: 1,
  },
  challengeName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  challengeEloRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  challengeElo: {
    color: '#888888',
    fontSize: 12,
  },
  challengeStatus: {
    color: '#555555',
    fontSize: 11,
  },
  acceptButton: {
    backgroundColor: '#00FF87',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  acceptText: {
    color: '#0D0D0D',
    fontSize: 11,
    fontWeight: '800',
  },
  watchButton: {
    backgroundColor: '#1A1A1A',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  watchText: {
    color: '#888888',
    fontSize: 11,
    fontWeight: '700',
  },
  quickActionsSection: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    paddingHorizontal: 20,
  },
  quickActionPrimary: {
    flex: 1,
    backgroundColor: '#00FF87',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  quickActionSecondary: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  quickActionIcon: {
    fontSize: 18,
  },
  quickActionText: {
    color: '#0D0D0D',
    fontSize: 13,
    fontWeight: '800',
  },
  quickActionTextDark: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
