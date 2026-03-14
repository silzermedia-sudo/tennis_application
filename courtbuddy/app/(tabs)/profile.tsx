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
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { ME, MATCH_RESULTS, COURTS } from '../../constants/mockData';
import type { MatchResult, Court } from '../../types';

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function OwnedCourtCard({ court }: { court: Court }) {
  return (
    <View style={styles.ownedCourtCard}>
      <View style={styles.ownedCourtIcon}>
        <Ionicons name="tennisball-outline" size={22} color={Colors.accent} />
      </View>
      <View style={styles.ownedCourtInfo}>
        <Text style={styles.ownedCourtName} numberOfLines={1}>
          {court.name}
        </Text>
        <Text style={styles.ownedCourtDate}>Erobert am 08. Okt 2024</Text>
      </View>
    </View>
  );
}

function MatchHistoryRow({ match }: { match: MatchResult }) {
  const won = match.player1.id === 'me' ? match.eloChange1 > 0 : match.eloChange2 > 0;
  const opponent = match.player1.id === 'me' ? match.player2 : match.player1;
  const eloChange = match.player1.id === 'me' ? match.eloChange1 : match.eloChange2;

  return (
    <View style={styles.matchRow}>
      <View style={[styles.matchAvatar, { backgroundColor: opponent.avatarColor }]}>
        <Text style={styles.matchAvatarText}>
          {opponent.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)}
        </Text>
      </View>
      <View style={styles.matchInfo}>
        <Text style={styles.matchOpponent}>{opponent.username}</Text>
        <Text style={styles.matchLeague}>{opponent.skillLevel} • {match.courtName}</Text>
      </View>
      <View style={styles.matchRight}>
        <Text style={styles.matchScore}>{match.score}</Text>
        <View style={[styles.matchBadge, won ? styles.matchBadgeWin : styles.matchBadgeLoss]}>
          <Text style={[styles.matchBadgeText, won ? styles.matchBadgeTextWin : styles.matchBadgeTextLoss]}>
            {won ? 'SIEG' : 'NL'}
          </Text>
        </View>
        <Text style={[styles.matchEloChange, eloChange >= 0 ? styles.eloPos : styles.eloNeg]}>
          {eloChange >= 0 ? '+' : ''}{eloChange}
        </Text>
      </View>
    </View>
  );
}

const myCourts = COURTS.filter((c) => c.ownerId === 'me');

export default function ProfileScreen() {
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
          <TouchableOpacity style={styles.headerIconBtn} activeOpacity={0.7}>
            <Ionicons name="menu-outline" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerLogo}>CourtBuddy</Text>
          <TouchableOpacity style={styles.headerIconBtn} activeOpacity={0.7}>
            <Ionicons name="settings-outline" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Profile Hero */}
        <View style={styles.profileHero}>
          <View style={styles.avatarCircleLarge}>
            <Text style={styles.avatarInitialsLarge}>AV</Text>
          </View>
          <Text style={styles.profileName}>{ME.name}</Text>
          <View style={styles.profileLocationRow}>
            <Ionicons name="location-outline" size={14} color={Colors.textSecondary} />
            <Text style={styles.profileLocation}>{ME.location}</Text>
          </View>
          <View style={styles.memberBadge}>
            <Text style={styles.memberBadgeText}>MITGLIED SEIT JAN 2024</Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <StatCard label="ELO" value={ME.elo.toLocaleString('de-AT')} />
          <StatCard label="Matches" value={ME.matchCount} />
          <StatCard label="Siegrate" value={`${ME.winRate}%`} />
          <StatCard label="Plätze" value={ME.courtCount} />
        </View>

        {/* Owned Courts */}
        {myCourts.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Eigene Plätze</Text>
              <Text style={styles.sectionCount}>{myCourts.length}</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.ownedCourtsScroll}
              style={styles.ownedCourtsScrollView}
            >
              {myCourts.map((court) => (
                <OwnedCourtCard key={court.id} court={court} />
              ))}
            </ScrollView>
          </>
        )}

        {/* Match History */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Matchverlauf</Text>
          <View style={styles.sectionBadge}>
            <Text style={styles.sectionBadgeText}>{ME.matchCount} gesamt</Text>
          </View>
        </View>

        <View style={styles.matchList}>
          {MATCH_RESULTS.slice(0, 3).map((match) => (
            <MatchHistoryRow key={match.id} match={match} />
          ))}
        </View>

        {/* Bottom Buttons */}
        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.outlineBtn} activeOpacity={0.8}>
            <Ionicons name="pencil-outline" size={16} color={Colors.textPrimary} />
            <Text style={styles.outlineBtnText}>Profil bearbeiten</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.outlineBtn} activeOpacity={0.8}>
            <Ionicons name="settings-outline" size={16} color={Colors.textPrimary} />
            <Text style={styles.outlineBtnText}>Einstellungen</Text>
          </TouchableOpacity>
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
    paddingBottom: 32,
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
  headerIconBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLogo: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.accent,
    letterSpacing: 0.5,
  },

  // Profile Hero
  profileHero: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  avatarCircleLarge: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    borderWidth: 3,
    borderColor: Colors.accentDim,
  },
  avatarInitialsLarge: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.bg,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  profileLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  profileLocation: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  memberBadge: {
    backgroundColor: Colors.surface2,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  memberBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textSecondary,
    letterSpacing: 1,
  },

  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 28,
  },
  statCard: {
    width: '47%',
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // Section Headers
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  sectionCount: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.accent,
  },
  sectionBadge: {
    backgroundColor: Colors.surface2,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  sectionBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textSecondary,
  },

  // Owned Courts
  ownedCourtsScrollView: {
    marginBottom: 28,
  },
  ownedCourtsScroll: {
    paddingHorizontal: 20,
    gap: 10,
  },
  ownedCourtCard: {
    width: 180,
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  ownedCourtIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0A2318',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  ownedCourtInfo: {
    flex: 1,
  },
  ownedCourtName: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 3,
  },
  ownedCourtDate: {
    fontSize: 10,
    color: Colors.textSecondary,
  },

  // Match List
  matchList: {
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 28,
  },
  matchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 12,
  },
  matchAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  matchAvatarText: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.bg,
  },
  matchInfo: {
    flex: 1,
  },
  matchOpponent: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  matchLeague: {
    fontSize: 11,
    color: Colors.textSecondary,
    textTransform: 'capitalize',
  },
  matchRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  matchScore: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  matchBadge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  matchBadgeWin: {
    backgroundColor: Colors.accentBg,
    borderWidth: 1,
    borderColor: Colors.accent,
  },
  matchBadgeLoss: {
    backgroundColor: Colors.dangerBg,
    borderWidth: 1,
    borderColor: Colors.danger,
  },
  matchBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  matchBadgeTextWin: {
    color: Colors.accent,
  },
  matchBadgeTextLoss: {
    color: Colors.danger,
  },
  matchEloChange: {
    fontSize: 11,
    fontWeight: '600',
  },
  eloPos: {
    color: Colors.accent,
  },
  eloNeg: {
    color: Colors.danger,
  },

  // Bottom Buttons
  bottomButtons: {
    paddingHorizontal: 20,
    gap: 10,
  },
  outlineBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: Colors.surface,
  },
  outlineBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
});
