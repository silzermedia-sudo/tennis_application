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
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { mockPlayers, mockMatches, mockCourts, currentUser } from '../data/mockData';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'PlayerProfile'>;
  route: RouteProp<RootStackParamList, 'PlayerProfile'>;
};

export default function PlayerProfileScreen({ navigation, route }: Props) {
  const { playerId } = route.params;
  const player = mockPlayers.find((p) => p.id === playerId) || mockPlayers[0];
  const playerMatches = mockMatches.filter(
    (m) => m.player1.id === player.id || m.player2.id === player.id
  );
  const ownedCourts = mockCourts.filter((c) => player.ownedCourts.includes(c.id));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Spielerprofil</Text>
          <TouchableOpacity style={styles.moreBtn}>
            <Text style={styles.moreIcon}>⋮</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile */}
        <View style={styles.profileHero}>
          <Image source={{ uri: player.avatar }} style={styles.avatar} />
          <Text style={styles.playerName}>{player.name}</Text>
          <Text style={styles.playerLocation}>📍 {player.location}</Text>
          <View style={styles.skillBadge}>
            <Text style={styles.skillText}>{player.skillLevel.toUpperCase()}</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{player.elo}</Text>
            <Text style={styles.statLabel}>ELO</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{player.matchesPlayed}</Text>
            <Text style={styles.statLabel}>MATCHES</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{player.winRate}%</Text>
            <Text style={styles.statLabel}>GEWINN-{'\n'}RATE</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>#{player.worldRank}</Text>
            <Text style={styles.statLabel}>WELTRANG</Text>
          </View>
        </View>

        {/* Win/Loss Record */}
        <View style={styles.recordSection}>
          <View style={styles.recordItem}>
            <Text style={styles.recordValue}>{player.wins}</Text>
            <Text style={styles.recordLabel}>Siege</Text>
          </View>
          <View style={styles.recordBar}>
            <View style={[
              styles.recordBarFill,
              { width: `${player.winRate}%` },
            ]} />
          </View>
          <View style={styles.recordItem}>
            <Text style={[styles.recordValue, styles.recordLoss]}>{player.losses}</Text>
            <Text style={styles.recordLabel}>Niederlagen</Text>
          </View>
        </View>

        {/* Win Streak */}
        {player.winStreak > 0 && (
          <View style={styles.streakBanner}>
            <Text style={styles.streakIcon}>🔥</Text>
            <Text style={styles.streakText}>{player.winStreak} Siege in Folge</Text>
          </View>
        )}

        {/* Owned Courts */}
        {ownedCourts.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Eigene Plätze</Text>
            {ownedCourts.map((court) => (
              <View key={court.id} style={styles.courtItem}>
                <View style={styles.courtIcon}>
                  <Text style={styles.courtIconText}>🎾</Text>
                </View>
                <View style={styles.courtInfo}>
                  <Text style={styles.courtName}>{court.name}</Text>
                  <Text style={styles.courtLocation}>{court.city}</Text>
                </View>
                <View style={styles.streakBadge}>
                  <Text style={styles.streakBadgeText}>{court.ownerStreak} Siege</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Recent Matches */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Letzte Matches</Text>
          {playerMatches.length > 0 ? playerMatches.map((match) => {
            const isWinner = match.winner.id === player.id;
            const opponent = match.player1.id === player.id ? match.player2 : match.player1;
            return (
              <View key={match.id} style={styles.matchItem}>
                <Image source={{ uri: opponent.avatar }} style={styles.matchAvatar} />
                <View style={styles.matchInfo}>
                  <Text style={styles.matchOpponent}>{opponent.username}</Text>
                  <Text style={styles.matchDate}>{match.date}</Text>
                </View>
                <View style={styles.matchRight}>
                  <Text style={styles.matchScore}>{match.score}</Text>
                  <View style={[styles.matchBadge, isWinner ? styles.matchWin : styles.matchLoss]}>
                    <Text style={styles.matchBadgeText}>{isWinner ? 'SIEG' : 'NIED.'}</Text>
                  </View>
                </View>
              </View>
            );
          }) : (
            <Text style={styles.emptyText}>Noch keine Matches.</Text>
          )}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Challenge Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.challengeButton}
          onPress={() => navigation.navigate('Challenge', { playerId: player.id })}
          activeOpacity={0.85}
        >
          <Text style={styles.challengeButtonIcon}>⚔</Text>
          <Text style={styles.challengeButtonText}>{player.name} herausfordern</Text>
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
  profileHero: {
    alignItems: 'center',
    paddingVertical: 20,
    gap: 8,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#00FF87',
    marginBottom: 4,
  },
  playerName: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
  },
  playerLocation: {
    color: '#888888',
    fontSize: 13,
  },
  skillBadge: {
    backgroundColor: 'rgba(0,255,135,0.15)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#00FF87',
  },
  skillText: {
    color: '#00FF87',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
  },
  statLabel: {
    color: '#555555',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#2A2A2A',
    alignSelf: 'center',
  },
  recordSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 12,
    gap: 12,
  },
  recordItem: {
    alignItems: 'center',
    width: 60,
  },
  recordValue: {
    color: '#00FF87',
    fontSize: 22,
    fontWeight: '900',
  },
  recordLoss: {
    color: '#FF4444',
  },
  recordLabel: {
    color: '#555555',
    fontSize: 10,
    fontWeight: '600',
  },
  recordBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#2A2A2A',
    borderRadius: 3,
    overflow: 'hidden',
  },
  recordBarFill: {
    height: 6,
    backgroundColor: '#00FF87',
    borderRadius: 3,
  },
  streakBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 20,
    marginTop: 12,
    backgroundColor: 'rgba(0,255,135,0.08)',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,255,135,0.2)',
  },
  streakIcon: {
    fontSize: 20,
  },
  streakText: {
    color: '#00FF87',
    fontSize: 14,
    fontWeight: '700',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 14,
  },
  courtItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    gap: 12,
  },
  courtIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#0A1A0A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  courtIconText: {
    fontSize: 20,
  },
  courtInfo: {
    flex: 1,
  },
  courtName: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
  },
  courtLocation: {
    color: '#555555',
    fontSize: 11,
  },
  streakBadge: {
    backgroundColor: 'rgba(0,255,135,0.1)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#00FF87',
  },
  streakBadgeText: {
    color: '#00FF87',
    fontSize: 10,
    fontWeight: '700',
  },
  matchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
    gap: 12,
  },
  matchAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  matchInfo: {
    flex: 1,
  },
  matchOpponent: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  matchDate: {
    color: '#555555',
    fontSize: 11,
  },
  matchRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  matchScore: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  matchBadge: {
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  matchWin: {
    backgroundColor: 'rgba(0,255,135,0.15)',
    borderWidth: 1,
    borderColor: '#00FF87',
  },
  matchLoss: {
    backgroundColor: 'rgba(255,68,68,0.15)',
    borderWidth: 1,
    borderColor: '#FF4444',
  },
  matchBadgeText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  emptyText: {
    color: '#555555',
    fontSize: 13,
    textAlign: 'center',
    paddingVertical: 20,
  },
  footer: {
    padding: 20,
    paddingBottom: 34,
    borderTopWidth: 1,
    borderTopColor: '#1A1A1A',
    backgroundColor: '#0D0D0D',
  },
  challengeButton: {
    backgroundColor: '#00FF87',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  challengeButtonIcon: {
    fontSize: 16,
  },
  challengeButtonText: {
    color: '#0D0D0D',
    fontSize: 15,
    fontWeight: '800',
  },
});
