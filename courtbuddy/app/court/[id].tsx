import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COURTS, PLAYERS } from '../../constants/mockData';
import { Colors } from '../../constants/colors';
import type { Court, Player } from '../../types';

const RECENT_MATCHES = [
  {
    id: 'm1',
    player1: { name: 'Alex V.', avatarColor: '#00FF87' },
    player2: { name: 'Sam S.', avatarColor: '#FF6B6B' },
    score: '6-4, 7-5',
    date: 'Okt 24',
  },
  {
    id: 'm2',
    player1: { name: 'Tina T.', avatarColor: '#4FC3F7' },
    player2: { name: 'Lob K.', avatarColor: '#FFB74D' },
    score: '3-6, 6-4, 6-2',
    date: 'Okt 20',
  },
  {
    id: 'm3',
    player1: { name: 'Rafa P.', avatarColor: '#CE93D8' },
    player2: { name: 'Alex V.', avatarColor: '#00FF87' },
    score: '6-1, 6-2',
    date: 'Okt 17',
  },
];

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function findOwnerPlayer(ownerId: string | null): Player | undefined {
  if (!ownerId) return undefined;
  if (ownerId === 'me') {
    return {
      id: 'me',
      name: 'Alex Volkov',
      username: 'AlexV_Vienna',
      elo: 1580,
      level: 42,
      rank: 248,
      winRate: 68,
      matchCount: 42,
      wins: 29,
      losses: 13,
      courtCount: 3,
      location: 'Wien, Österreich',
      skillLevel: 'fortgeschritten',
      avatarColor: '#00FF87',
    };
  }
  return PLAYERS.find((p) => p.id === ownerId);
}

export default function CourtDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const court: Court =
    COURTS.find((c) => c.id === id) ?? COURTS[0];

  const hasOwner = court.ownerId !== null;
  const ownerPlayer = findOwnerPlayer(court.ownerId);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Row */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.headerIconBtn}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>CourtBuddy</Text>

          <TouchableOpacity style={styles.headerIconBtn}>
            <Ionicons name="ellipsis-vertical" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Court Image Area */}
        <View style={styles.imageWrapper}>
          <LinearGradient
            colors={['#0A2A1A', '#000000']}
            style={styles.courtGradient}
          >
            {/* Premium Badge */}
            {court.isPremium && (
              <View style={styles.premiumBadge}>
                <Text style={styles.premiumBadgeText}>PREMIUM HUB</Text>
              </View>
            )}

            {/* Court Info Center */}
            <View style={styles.courtInfoCenter}>
              <Text style={styles.courtName}>{court.name}</Text>
              <Text style={styles.courtAddress}>
                {court.address}, {court.city}
              </Text>
            </View>
          </LinearGradient>

          {/* Conquered Badge overlay */}
          <View style={styles.conqueredBadgeContainer}>
            {hasOwner ? (
              <View style={styles.conqueredBadgeGreen}>
                <Text style={styles.conqueredBadgeText}>
                  EROBERT VON {court.ownerName?.toUpperCase()}
                </Text>
              </View>
            ) : (
              <View style={styles.conqueredBadgeGray}>
                <Text style={styles.conqueredBadgeTextGray}>UNEROBERT</Text>
              </View>
            )}
          </View>
        </View>

        {/* Current Champion Section */}
        <View style={styles.championCard}>
          <View style={styles.championCardHeader}>
            <Text style={styles.championLabel}>AKTUELLER CHAMPION</Text>
            <View style={styles.verteidigungsBadge}>
              <Text style={styles.verteidigungsBadgeText}>VERTEIDIGT</Text>
            </View>
          </View>

          {ownerPlayer ? (
            <>
              <View style={styles.playerRow}>
                <View
                  style={[
                    styles.avatarCircle,
                    { backgroundColor: ownerPlayer.avatarColor },
                  ]}
                >
                  <Text style={styles.avatarText}>
                    {getInitials(ownerPlayer.name)}
                  </Text>
                </View>
                <Text style={styles.playerName}>{ownerPlayer.name}</Text>
              </View>

              <View style={styles.statBoxRow}>
                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>ELO</Text>
                  <Text style={styles.statValue}>{ownerPlayer.elo}</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>SIEGESSERIE</Text>
                  <Text style={styles.statValue}>{court.winStreak} Siege</Text>
                </View>
              </View>
            </>
          ) : (
            <View style={styles.playerRow}>
              <View style={[styles.avatarCircle, { backgroundColor: Colors.surface3 }]}>
                <Ionicons name="person-outline" size={20} color={Colors.textSecondary} />
              </View>
              <Text style={styles.playerName}>Kein Champion</Text>
            </View>
          )}
        </View>

        {/* Challenge Button */}
        <TouchableOpacity
          style={styles.challengeButton}
          onPress={() => router.push('/match-result')}
          activeOpacity={0.85}
        >
          <Ionicons name="flash" size={20} color="#0D0D0D" style={styles.challengeIcon} />
          <Text style={styles.challengeButtonText}>
            FÜR DIESEN PLATZ HERAUSFORDERN
          </Text>
        </TouchableOpacity>

        {/* Recent Matches Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>LETZTE MATCHES</Text>
          <TouchableOpacity>
            <Text style={styles.sectionLink}>ALLE ANZEIGEN</Text>
          </TouchableOpacity>
        </View>

        {RECENT_MATCHES.map((match) => (
          <View key={match.id} style={styles.matchRow}>
            <View style={styles.matchPlayersGroup}>
              <View
                style={[
                  styles.matchAvatarSmall,
                  { backgroundColor: match.player1.avatarColor },
                ]}
              >
                <Text style={styles.matchAvatarText}>
                  {getInitials(match.player1.name)}
                </Text>
              </View>
              <Text style={styles.vsText}>vs</Text>
              <View
                style={[
                  styles.matchAvatarSmall,
                  { backgroundColor: match.player2.avatarColor },
                ]}
              >
                <Text style={styles.matchAvatarText}>
                  {getInitials(match.player2.name)}
                </Text>
              </View>
            </View>
            <Text style={styles.matchScore}>{match.score}</Text>
            <Text style={styles.matchDate}>{match.date}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },

  // Header
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: Colors.surface,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: 0.5,
  },

  // Court Image / Gradient
  imageWrapper: {
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
  courtGradient: {
    height: 220,
    justifyContent: 'flex-end',
    padding: 16,
  },
  premiumBadge: {
    position: 'absolute',
    top: 14,
    left: 14,
    backgroundColor: Colors.accent,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  premiumBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0D0D0D',
    letterSpacing: 1,
  },
  courtInfoCenter: {
    alignItems: 'center',
    marginBottom: 16,
  },
  courtName: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  courtAddress: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },

  // Conquered Badge
  conqueredBadgeContainer: {
    position: 'absolute',
    bottom: 14,
    right: 14,
  },
  conqueredBadgeGreen: {
    backgroundColor: Colors.accentBg,
    borderWidth: 1,
    borderColor: Colors.accent,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  conqueredBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.accent,
    letterSpacing: 0.8,
  },
  conqueredBadgeGray: {
    backgroundColor: 'rgba(136,136,136,0.15)',
    borderWidth: 1,
    borderColor: Colors.textSecondary,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  conqueredBadgeTextGray: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textSecondary,
    letterSpacing: 0.8,
  },

  // Champion Card
  championCard: {
    backgroundColor: Colors.surface,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  championCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  championLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textSecondary,
    letterSpacing: 1.2,
  },
  verteidigungsBadge: {
    backgroundColor: Colors.accentBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.accent,
  },
  verteidigungsBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.accent,
    letterSpacing: 0.8,
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0D0D0D',
  },
  playerName: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  statBoxRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statBox: {
    flex: 1,
    backgroundColor: Colors.surface2,
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.textSecondary,
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },

  // Challenge Button
  challengeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.accent,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 14,
    paddingVertical: 16,
    gap: 8,
  },
  challengeIcon: {
    marginRight: 2,
  },
  challengeButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0D0D0D',
    letterSpacing: 0.8,
  },

  // Recent Matches
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
    letterSpacing: 1.2,
  },
  sectionLink: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.accent,
    letterSpacing: 0.5,
  },
  matchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  matchPlayersGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 6,
  },
  matchAvatarSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  matchAvatarText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0D0D0D',
  },
  vsText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  matchScore: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginRight: 12,
  },
  matchDate: {
    fontSize: 12,
    color: Colors.textSecondary,
    minWidth: 48,
    textAlign: 'right',
  },
});
