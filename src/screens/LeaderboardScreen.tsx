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
import { leaderboardData, currentUser } from '../data/mockData';

type TabType = 'regional' | 'national' | 'friends';

export default function LeaderboardScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('regional');

  const data = leaderboardData[activeTab];
  const top3 = data.slice(0, 3);
  const rest = data.slice(3);

  const isCurrentUser = (id: string) => id === currentUser.id;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuBtn}>
          <Text style={styles.menuIcon}>≡</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CourtBuddy</Text>
        <TouchableOpacity style={styles.notificationBtn}>
          <Text style={styles.notificationIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      {/* Title */}
      <View style={styles.titleSection}>
        <Text style={styles.sectionLabel}>GLOBALE RANGLISTE</Text>
        <Text style={styles.title}>Rangliste</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {(['regional', 'national', 'friends'] as TabType[]).map((tab) => {
          const labels = { regional: 'Regional', national: 'National', friends: 'Freunde' };
          return (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {labels[tab]}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Top 3 Podium */}
        <View style={styles.podium}>
          {/* 2nd place */}
          {top3[1] && (
            <View style={[styles.podiumItem, styles.podiumSecond]}>
              <View style={styles.podiumAvatarContainer}>
                <Image source={{ uri: top3[1].player.avatar }} style={styles.podiumAvatar} />
                <View style={[styles.podiumRankBadge, styles.rankBadgeSilver]}>
                  <Text style={styles.podiumRankText}>2</Text>
                </View>
              </View>
              <Text style={styles.podiumUsername} numberOfLines={1}>{top3[1].player.username}</Text>
              <Text style={styles.podiumElo}>{top3[1].player.elo.toLocaleString()}</Text>
              <View style={[styles.podiumBase, styles.podiumBase2]} />
            </View>
          )}

          {/* 1st place */}
          {top3[0] && (
            <View style={[styles.podiumItem, styles.podiumFirst]}>
              <Text style={styles.crownEmoji}>👑</Text>
              <View style={styles.podiumAvatarContainer}>
                <Image source={{ uri: top3[0].player.avatar }} style={[styles.podiumAvatar, styles.podiumAvatarLarge]} />
                <View style={[styles.podiumRankBadge, styles.rankBadgeGold]}>
                  <Text style={styles.podiumRankText}>1</Text>
                </View>
              </View>
              <Text style={styles.podiumUsername} numberOfLines={1}>{top3[0].player.username}</Text>
              <Text style={[styles.podiumElo, styles.podiumEloFirst]}>
                {top3[0].player.elo.toLocaleString()}
              </Text>
              <View style={[styles.podiumBase, styles.podiumBase1]} />
            </View>
          )}

          {/* 3rd place */}
          {top3[2] && (
            <View style={[styles.podiumItem, styles.podiumThird]}>
              <View style={styles.podiumAvatarContainer}>
                <Image source={{ uri: top3[2].player.avatar }} style={styles.podiumAvatar} />
                <View style={[styles.podiumRankBadge, styles.rankBadgeBronze]}>
                  <Text style={styles.podiumRankText}>3</Text>
                </View>
              </View>
              <Text style={styles.podiumUsername} numberOfLines={1}>{top3[2].player.username}</Text>
              <Text style={styles.podiumElo}>{top3[2].player.elo.toLocaleString()}</Text>
              <View style={[styles.podiumBase, styles.podiumBase3]} />
            </View>
          )}
        </View>

        {/* Rankings list header */}
        <View style={styles.listHeader}>
          <Text style={styles.listHeaderText}>RANGLISTE</Text>
          <Text style={styles.listHeaderRight}>ELO / PLÄTZE</Text>
        </View>

        {/* Rankings list */}
        {rest.map((item) => (
          <View
            key={item.player.id}
            style={[
              styles.rankItem,
              isCurrentUser(item.player.id) && styles.rankItemHighlighted,
            ]}
          >
            <Text style={[
              styles.rankNumber,
              isCurrentUser(item.player.id) && styles.rankNumberHighlighted,
            ]}>
              {item.rank}
            </Text>
            <Image source={{ uri: item.player.avatar }} style={styles.rankAvatar} />
            <View style={styles.rankInfo}>
              <View style={styles.rankNameRow}>
                <Text style={styles.rankUsername}>{item.player.username}</Text>
                {isCurrentUser(item.player.id) && (
                  <View style={styles.youBadge}>
                    <Text style={styles.youBadgeText}>DU</Text>
                  </View>
                )}
              </View>
              <Text style={styles.rankSkill}>{item.player.skillLevel}</Text>
            </View>
            <View style={styles.rankStats}>
              <Text style={styles.rankElo}>{item.player.elo.toLocaleString()}</Text>
              <Text style={[
                styles.rankChange,
                item.eloChange.startsWith('+') ? styles.rankChangePositive : styles.rankChangeNegative,
              ]}>
                {item.eloChange}
              </Text>
            </View>
            <View style={styles.courtsCount}>
              <Text style={styles.courtsNumber}>{item.courts}</Text>
              <Text style={styles.courtsIcon}>🏛</Text>
            </View>
          </View>
        ))}

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
    paddingBottom: 8,
  },
  menuBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    color: '#FFFFFF',
    fontSize: 22,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  notificationBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationIcon: {
    fontSize: 18,
  },
  titleSection: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  sectionLabel: {
    color: '#00FF87',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 4,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: '#2A2A2A',
  },
  tabText: {
    color: '#555555',
    fontSize: 13,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  podium: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 0,
    gap: 0,
    height: 220,
  },
  podiumItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  podiumFirst: {
    zIndex: 2,
  },
  podiumSecond: {},
  podiumThird: {},
  crownEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  podiumAvatarContainer: {
    position: 'relative',
  },
  podiumAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#555555',
  },
  podiumAvatarLarge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderColor: '#FFD700',
  },
  podiumRankBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#0D0D0D',
  },
  rankBadgeGold: {
    backgroundColor: '#FFD700',
  },
  rankBadgeSilver: {
    backgroundColor: '#C0C0C0',
  },
  rankBadgeBronze: {
    backgroundColor: '#CD7F32',
  },
  podiumRankText: {
    color: '#0D0D0D',
    fontSize: 10,
    fontWeight: '900',
  },
  podiumUsername: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 8,
    textAlign: 'center',
  },
  podiumElo: {
    color: '#888888',
    fontSize: 11,
    fontWeight: '600',
  },
  podiumEloFirst: {
    color: '#FFD700',
    fontWeight: '700',
  },
  podiumBase: {
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginTop: 8,
  },
  podiumBase1: {
    height: 70,
    backgroundColor: '#FFD700',
    opacity: 0.15,
  },
  podiumBase2: {
    height: 50,
    backgroundColor: '#C0C0C0',
    opacity: 0.1,
  },
  podiumBase3: {
    height: 35,
    backgroundColor: '#CD7F32',
    opacity: 0.1,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#1A1A1A',
  },
  listHeaderText: {
    color: '#555555',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  listHeaderRight: {
    color: '#555555',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  rankItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
    gap: 12,
  },
  rankItemHighlighted: {
    backgroundColor: '#0D2018',
  },
  rankNumber: {
    color: '#555555',
    fontSize: 14,
    fontWeight: '700',
    width: 24,
    textAlign: 'center',
  },
  rankNumberHighlighted: {
    color: '#00FF87',
  },
  rankAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  rankInfo: {
    flex: 1,
    gap: 2,
  },
  rankNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  rankUsername: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  youBadge: {
    backgroundColor: '#00FF87',
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  youBadgeText: {
    color: '#0D0D0D',
    fontSize: 8,
    fontWeight: '900',
  },
  rankSkill: {
    color: '#555555',
    fontSize: 11,
  },
  rankStats: {
    alignItems: 'flex-end',
    gap: 2,
  },
  rankElo: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  rankChange: {
    fontSize: 11,
    fontWeight: '700',
  },
  rankChangePositive: {
    color: '#00FF87',
  },
  rankChangeNegative: {
    color: '#FF4444',
  },
  courtsCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    width: 36,
    justifyContent: 'flex-end',
  },
  courtsNumber: {
    color: '#888888',
    fontSize: 13,
    fontWeight: '600',
  },
  courtsIcon: {
    fontSize: 12,
  },
});
