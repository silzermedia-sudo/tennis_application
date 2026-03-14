import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { ME, COURTS, CHALLENGES } from '../../constants/mockData';
import type { Court, Challenge } from '../../types';

function CourtCard({ court }: { court: Court }) {
  const isOwned = court.ownerId !== null;
  return (
    <TouchableOpacity
      style={styles.courtCard}
      onPress={() => router.push(`/court/${court.id}` as any)}
      activeOpacity={0.8}
    >
      <View style={styles.courtImagePlaceholder}>
        <Ionicons name="tennisball-outline" size={28} color={Colors.accent} />
        {court.isPremium && (
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumBadgeText}>PREMIUM</Text>
          </View>
        )}
      </View>
      <View style={styles.courtCardBody}>
        <Text style={styles.courtCardName} numberOfLines={1}>
          {court.name}
        </Text>
        <Text style={styles.courtCardDistance}>{court.distance} km entfernt</Text>
        {isOwned ? (
          <Text style={styles.courtCardOwner} numberOfLines={1}>
            {court.ownerName} besitzt diesen Platz
          </Text>
        ) : (
          <Text style={styles.courtCardUnowned}>Unerobert</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

function ChallengeItem({ challenge }: { challenge: Challenge }) {
  const opponent = challenge.fromPlayer;
  const initials = opponent.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <View style={styles.challengeItem}>
      <View style={[styles.avatarCircle, { backgroundColor: opponent.avatarColor }]}>
        <Text style={styles.avatarInitials}>{initials}</Text>
      </View>
      <View style={styles.challengeInfo}>
        <Text style={styles.challengePlayerName}>{opponent.username}</Text>
        <Text style={styles.challengeElo}>ELO: {opponent.elo.toLocaleString('de-AT')}</Text>
      </View>
      <View style={styles.challengeActions}>
        {challenge.status === 'ausstehend' ? (
          <>
            <TouchableOpacity style={styles.btnAccept} activeOpacity={0.8}>
              <Text style={styles.btnAcceptText}>ANNEHMEN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnDecline} activeOpacity={0.8}>
              <Text style={styles.btnDeclineText}>ABLEHNEN</Text>
            </TouchableOpacity>
          </>
        ) : challenge.status === 'laufend' ? (
          <TouchableOpacity style={styles.btnWatch} activeOpacity={0.8}>
            <Text style={styles.btnWatchText}>BEOBACHTEN</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const eloFormatted = ME.elo.toLocaleString('de-AT');
  const levelProgress = (ME.level % 10) / 10;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bg} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerLogo}>CourtBuddy</Text>
          <TouchableOpacity
            style={styles.bellButton}
            onPress={() => router.push('/notifications' as any)}
            activeOpacity={0.7}
          >
            <Ionicons name="notifications-outline" size={24} color={Colors.textPrimary} />
            <View style={styles.notifDot} />
          </TouchableOpacity>
        </View>

        {/* Player Card */}
        <View style={styles.playerCard}>
          <View style={styles.playerCardTop}>
            <View>
              <Text style={styles.playerUsername}>{ME.username}</Text>
              <View style={styles.rankRow}>
                <Text style={styles.rankLabel}>Weltrang</Text>
                <Text style={styles.rankValue}>#{ME.rank}</Text>
              </View>
            </View>
            <View style={styles.eloBadge}>
              <Text style={styles.eloBadgeText}>ELO: {eloFormatted}</Text>
            </View>
          </View>

          <View style={styles.playerCardBottom}>
            <View style={styles.levelBadge}>
              <Text style={styles.levelBadgeText}>LEVEL {ME.level}</Text>
            </View>
          </View>

          <View style={styles.progressBarTrack}>
            <View style={[styles.progressBarFill, { width: `${levelProgress * 100}%` as any }]} />
          </View>
          <Text style={styles.progressLabel}>
            {Math.round(levelProgress * 100)}% zum nächsten Level
          </Text>
        </View>

        {/* Nearby Courts */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nahegelegene Plätze</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/map' as any)} activeOpacity={0.7}>
            <Text style={styles.sectionLink}>KARTE ANZEIGEN</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.courtsScrollContent}
          style={styles.courtsScroll}
        >
          {COURTS.map((court) => (
            <CourtCard key={court.id} court={court} />
          ))}
        </ScrollView>

        {/* Open Challenges */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Offene Herausforderungen</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Ionicons name="filter-outline" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.challengesList}>
          {CHALLENGES.map((challenge) => (
            <ChallengeItem key={challenge.id} challenge={challenge} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  scrollContent: {
    paddingBottom: 24,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  headerLogo: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.accent,
    letterSpacing: 0.5,
  },
  bellButton: {
    position: 'relative',
    padding: 4,
  },
  notifDot: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.danger,
  },

  // Player Card
  playerCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  playerCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  playerUsername: {
    fontSize: 20,
    fontWeight: '800',
    fontStyle: 'italic',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  rankRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  rankLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  rankValue: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: '700',
  },
  eloBadge: {
    backgroundColor: Colors.accentBg,
    borderWidth: 1,
    borderColor: Colors.accent,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  eloBadgeText: {
    color: Colors.accent,
    fontSize: 13,
    fontWeight: '700',
  },
  playerCardBottom: {
    marginBottom: 12,
  },
  levelBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.surface2,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  levelBadgeText: {
    color: Colors.accent,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  progressBarTrack: {
    height: 6,
    backgroundColor: Colors.surface2,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.accent,
    borderRadius: 3,
  },
  progressLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
  },

  // Section Headers
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  sectionLink: {
    fontSize: 11,
    color: Colors.accent,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // Courts Scroll
  courtsScroll: {
    marginBottom: 28,
  },
  courtsScrollContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  courtCard: {
    width: 160,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  courtImagePlaceholder: {
    height: 120,
    backgroundColor: '#0A2318',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  premiumBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: Colors.warning,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  premiumBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.bg,
    letterSpacing: 0.5,
  },
  courtCardBody: {
    padding: 10,
  },
  courtCardName: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 3,
  },
  courtCardDistance: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  courtCardOwner: {
    fontSize: 10,
    color: Colors.textSecondary,
  },
  courtCardUnowned: {
    fontSize: 10,
    color: Colors.accent,
    fontWeight: '600',
  },

  // Challenges
  challengesList: {
    paddingHorizontal: 20,
    gap: 10,
  },
  challengeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 12,
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  avatarInitials: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.bg,
  },
  challengeInfo: {
    flex: 1,
  },
  challengePlayerName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  challengeElo: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  challengeActions: {
    flexDirection: 'column',
    gap: 6,
    alignItems: 'flex-end',
  },
  btnAccept: {
    backgroundColor: Colors.accent,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  btnAcceptText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.bg,
    letterSpacing: 0.5,
  },
  btnDecline: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  btnDeclineText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textSecondary,
    letterSpacing: 0.5,
  },
  btnWatch: {
    backgroundColor: Colors.surface2,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  btnWatchText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textSecondary,
    letterSpacing: 0.5,
  },
});
