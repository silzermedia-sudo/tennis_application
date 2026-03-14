import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { REGIONAL_RANKING } from '../../constants/mockData';
import type { RankingEntry } from '../../types';

type FilterKey = 'regional' | 'national' | 'freunde';

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'regional', label: 'Regional' },
  { key: 'national', label: 'National' },
  { key: 'freunde', label: 'Freunde' },
];

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function PodiumCard({
  entry,
  height,
  showCrown,
}: {
  entry: RankingEntry;
  height: number;
  showCrown: boolean;
}) {
  const initials = getInitials(entry.player.name);
  const rankColors: Record<number, string> = {
    1: Colors.gold,
    2: Colors.silver,
    3: Colors.bronze,
  };
  const rankColor = rankColors[entry.rank] ?? Colors.textSecondary;

  return (
    <View style={[styles.podiumCard, { height }]}>
      {showCrown && (
        <Ionicons
          name="crown"
          size={20}
          color={Colors.gold}
          style={styles.crownIcon}
        />
      )}
      <View style={[styles.podiumAvatar, { backgroundColor: entry.player.avatarColor }]}>
        <Text style={styles.podiumAvatarText}>{initials}</Text>
      </View>
      <Text style={styles.podiumUsername} numberOfLines={1}>
        {entry.player.username}
      </Text>
      <Text style={styles.podiumElo}>{entry.player.elo.toLocaleString('de-AT')}</Text>
      <View style={[styles.podiumRankBadge, { borderColor: rankColor }]}>
        <Text style={[styles.podiumRankText, { color: rankColor }]}>#{entry.rank}</Text>
      </View>
    </View>
  );
}

function RankingRow({ entry }: { entry: RankingEntry }) {
  const initials = getInitials(entry.player.name);
  const eloChangePositive = entry.eloChange >= 0;

  return (
    <View style={[styles.rankingRow, entry.isMe && styles.rankingRowMe]}>
      <Text style={[styles.rankingRowRank, entry.isMe && styles.rankingRowRankMe]}>
        {entry.rank}
      </Text>
      <View style={[styles.rankingRowAvatar, { backgroundColor: entry.player.avatarColor }]}>
        <Text style={styles.rankingRowAvatarText}>{initials}</Text>
      </View>
      <View style={styles.rankingRowInfo}>
        <View style={styles.rankingRowNameRow}>
          <Text style={[styles.rankingRowName, entry.isMe && styles.rankingRowNameMe]}>
            {entry.player.username}
          </Text>
          {entry.isMe && (
            <View style={styles.duBadge}>
              <Text style={styles.duBadgeText}>Du</Text>
            </View>
          )}
        </View>
        <Text style={styles.rankingRowLeague}>
          {entry.player.skillLevel} • {entry.player.courtCount} Plätze
        </Text>
      </View>
      <View style={styles.rankingRowRight}>
        <Text style={[styles.rankingRowElo, entry.isMe && styles.rankingRowEloMe]}>
          {entry.player.elo.toLocaleString('de-AT')}
        </Text>
        <Text
          style={[
            styles.rankingRowChange,
            eloChangePositive ? styles.rankingRowChangePos : styles.rankingRowChangeNeg,
          ]}
        >
          {eloChangePositive ? '+' : ''}
          {entry.eloChange}
        </Text>
      </View>
    </View>
  );
}

export default function RankingScreen() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('regional');

  const top3 = REGIONAL_RANKING.slice(0, 3);
  const rest = REGIONAL_RANKING.slice(3);

  // Podium order: 2nd left, 1st center, 3rd right
  const podiumOrder = [top3[1], top3[0], top3[2]].filter(Boolean);
  const podiumHeights: Record<number, number> = { 1: 180, 2: 155, 3: 140 };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bg} />

      <FlatList
        data={rest}
        keyExtractor={(item) => String(item.rank)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View>
            {/* Header */}
            <View style={styles.header}>
              <View>
                <Text style={styles.headerLogo}>CourtBuddy</Text>
                <Text style={styles.headerSubtitle}>GLOBALE RANGLISTEN</Text>
              </View>
            </View>

            <Text style={styles.pageTitle}>Rangliste</Text>

            {/* Filter Tabs */}
            <View style={styles.filterContainer}>
              {FILTERS.map((f) => (
                <TouchableOpacity
                  key={f.key}
                  style={[styles.filterTab, activeFilter === f.key && styles.filterTabActive]}
                  onPress={() => setActiveFilter(f.key)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.filterTabText,
                      activeFilter === f.key && styles.filterTabTextActive,
                    ]}
                  >
                    {f.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Podium */}
            <View style={styles.podiumSection}>
              <View style={styles.podiumRow}>
                {podiumOrder.map((entry) => (
                  <PodiumCard
                    key={entry.rank}
                    entry={entry}
                    height={podiumHeights[entry.rank] ?? 150}
                    showCrown={entry.rank === 1}
                  />
                ))}
              </View>
            </View>

            {/* Rest header */}
            <View style={styles.restHeader}>
              <Text style={styles.restHeaderText}>Weitere Platzierungen</Text>
            </View>
          </View>
        }
        renderItem={({ item }) => <RankingRow entry={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  listContent: {
    paddingBottom: 24,
  },

  // Header
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 4,
  },
  headerLogo: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.accent,
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.textSecondary,
    letterSpacing: 1.5,
    marginTop: 2,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: Colors.textPrimary,
    paddingHorizontal: 20,
    marginTop: 6,
    marginBottom: 20,
    letterSpacing: 0.3,
  },

  // Filter
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 24,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterTabActive: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  filterTabText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  filterTabTextActive: {
    color: Colors.bg,
    fontWeight: '800',
  },

  // Podium
  podiumSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  podiumRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 8,
  },
  podiumCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 14,
    paddingTop: 14,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    position: 'relative',
  },
  crownIcon: {
    position: 'absolute',
    top: 10,
  },
  podiumAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  podiumAvatarText: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.bg,
  },
  podiumUsername: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 2,
    textAlign: 'center',
  },
  podiumElo: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginBottom: 8,
    textAlign: 'center',
  },
  podiumRankBadge: {
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  podiumRankText: {
    fontSize: 12,
    fontWeight: '800',
  },

  // Rest header
  restHeader: {
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  restHeaderText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },

  // Ranking Row
  rankingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
  },
  rankingRowMe: {
    backgroundColor: Colors.accentBg,
    borderRadius: 12,
    marginHorizontal: 8,
    paddingHorizontal: 12,
  },
  rankingRowRank: {
    width: 28,
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  rankingRowRankMe: {
    color: Colors.accent,
  },
  rankingRowAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  rankingRowAvatarText: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.bg,
  },
  rankingRowInfo: {
    flex: 1,
  },
  rankingRowNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  rankingRowName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  rankingRowNameMe: {
    color: Colors.accent,
  },
  duBadge: {
    backgroundColor: Colors.accent,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  duBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.bg,
  },
  rankingRowLeague: {
    fontSize: 11,
    color: Colors.textSecondary,
    textTransform: 'capitalize',
  },
  rankingRowRight: {
    alignItems: 'flex-end',
    gap: 2,
  },
  rankingRowElo: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  rankingRowEloMe: {
    color: Colors.accent,
  },
  rankingRowChange: {
    fontSize: 11,
    fontWeight: '600',
  },
  rankingRowChangePos: {
    color: Colors.accent,
  },
  rankingRowChangeNeg: {
    color: Colors.danger,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: 20,
  },
});
