import React, { useState } from 'react';
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
import { CHALLENGES } from '../../constants/mockData';
import type { Challenge } from '../../types';

type TabKey = 'eingehend' | 'ausgehend' | 'laufend';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'eingehend', label: 'Eingehend' },
  { key: 'ausgehend', label: 'Ausgehend' },
  { key: 'laufend', label: 'Laufend' },
];

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function ChallengeCard({ challenge, tab }: { challenge: Challenge; tab: TabKey }) {
  const opponent = tab === 'ausgehend' ? challenge.toPlayer : challenge.fromPlayer;
  const initials = getInitials(opponent.name);

  return (
    <View style={styles.card}>
      {/* Card Header */}
      <View style={styles.cardHeader}>
        <View style={[styles.avatarCircle, { backgroundColor: opponent.avatarColor }]}>
          <Text style={styles.avatarInitials}>{initials}</Text>
        </View>
        <View style={styles.cardPlayerInfo}>
          <Text style={styles.cardPlayerName}>{opponent.username}</Text>
          <Text style={styles.cardPlayerElo}>ELO: {opponent.elo.toLocaleString('de-AT')}</Text>
        </View>
        {tab === 'laufend' && (
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveBadgeText}>Live</Text>
          </View>
        )}
        {tab === 'ausgehend' && (
          <View style={styles.waitingBadge}>
            <Text style={styles.waitingBadgeText}>Wartet auf Antwort</Text>
          </View>
        )}
      </View>

      {/* Court + Time */}
      <View style={styles.cardMeta}>
        <View style={styles.cardMetaRow}>
          <Ionicons name="location-outline" size={14} color={Colors.textSecondary} />
          <Text style={styles.cardMetaText}>{challenge.court.name}</Text>
        </View>
        <View style={styles.cardMetaRow}>
          <Ionicons name="time-outline" size={14} color={Colors.textSecondary} />
          <Text style={styles.cardMetaText}>{challenge.proposedTime}</Text>
        </View>
      </View>

      {/* Actions */}
      {tab === 'eingehend' && (
        <View style={styles.cardActions}>
          <TouchableOpacity style={styles.btnAccept} activeOpacity={0.8}>
            <Ionicons name="checkmark-outline" size={14} color={Colors.bg} />
            <Text style={styles.btnAcceptText}>ANNEHMEN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnDecline} activeOpacity={0.8}>
            <Ionicons name="close-outline" size={14} color={Colors.textSecondary} />
            <Text style={styles.btnDeclineText}>ABLEHNEN</Text>
          </TouchableOpacity>
        </View>
      )}

      {tab === 'laufend' && (
        <TouchableOpacity
          style={styles.btnResult}
          activeOpacity={0.8}
          onPress={() => router.push('/match-result' as any)}
        >
          <Ionicons name="create-outline" size={14} color={Colors.bg} />
          <Text style={styles.btnResultText}>ERGEBNIS EINTRAGEN</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default function ChallengeScreen() {
  const [activeTab, setActiveTab] = useState<TabKey>('eingehend');

  const filteredChallenges = CHALLENGES.filter((c) => {
    if (activeTab === 'eingehend') return c.status === 'ausstehend';
    if (activeTab === 'laufend') return c.status === 'laufend';
    if (activeTab === 'ausgehend') return c.status === 'angenommen';
    return false;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bg} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Herausforderungen</Text>
      </View>

      {/* Pill Tabs */}
      <View style={styles.pillTabsContainer}>
        <View style={styles.pillTabs}>
          {TABS.map((tab) => {
            const count = CHALLENGES.filter((c) => {
              if (tab.key === 'eingehend') return c.status === 'ausstehend';
              if (tab.key === 'laufend') return c.status === 'laufend';
              if (tab.key === 'ausgehend') return c.status === 'angenommen';
              return false;
            }).length;

            return (
              <TouchableOpacity
                key={tab.key}
                style={[styles.pillTab, activeTab === tab.key && styles.pillTabActive]}
                onPress={() => setActiveTab(tab.key)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.pillTabText,
                    activeTab === tab.key && styles.pillTabTextActive,
                  ]}
                >
                  {tab.label}
                </Text>
                {count > 0 && (
                  <View
                    style={[
                      styles.pillTabBadge,
                      activeTab === tab.key && styles.pillTabBadgeActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.pillTabBadgeText,
                        activeTab === tab.key && styles.pillTabBadgeTextActive,
                      ]}
                    >
                      {count}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredChallenges.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="flash-outline" size={48} color={Colors.border} />
            <Text style={styles.emptyStateTitle}>Keine Herausforderungen</Text>
            <Text style={styles.emptyStateSubtitle}>
              {activeTab === 'eingehend'
                ? 'Du hast keine ausstehenden Herausforderungen.'
                : activeTab === 'ausgehend'
                ? 'Du hast keine gesendeten Herausforderungen.'
                : 'Kein laufendes Match.'}
            </Text>
          </View>
        ) : (
          filteredChallenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} tab={activeTab} />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bg,
  },

  // Header
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: 0.3,
  },

  // Pill Tabs
  pillTabsContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  pillTabs: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 4,
  },
  pillTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 9,
    gap: 6,
  },
  pillTabActive: {
    backgroundColor: Colors.accent,
  },
  pillTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  pillTabTextActive: {
    color: Colors.bg,
    fontWeight: '800',
  },
  pillTabBadge: {
    backgroundColor: Colors.surface2,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  pillTabBadgeActive: {
    backgroundColor: Colors.bg,
  },
  pillTabBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.textSecondary,
  },
  pillTabBadgeTextActive: {
    color: Colors.accent,
  },

  // Scroll
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 12,
  },

  // Card
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 12,
  },
  avatarCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  avatarInitials: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.bg,
  },
  cardPlayerInfo: {
    flex: 1,
  },
  cardPlayerName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  cardPlayerElo: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dangerBg,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.danger,
  },
  liveBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.danger,
  },
  waitingBadge: {
    backgroundColor: Colors.warningBg,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  waitingBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.warning,
  },
  cardMeta: {
    gap: 6,
    marginBottom: 14,
  },
  cardMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cardMetaText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 10,
  },
  btnAccept: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.accent,
    borderRadius: 10,
    paddingVertical: 11,
    gap: 6,
  },
  btnAcceptText: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.bg,
    letterSpacing: 0.5,
  },
  btnDecline: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    paddingVertical: 11,
    gap: 6,
  },
  btnDeclineText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
    letterSpacing: 0.5,
  },
  btnResult: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.accent,
    borderRadius: 10,
    paddingVertical: 11,
    gap: 6,
  },
  btnResultText: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.bg,
    letterSpacing: 0.5,
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 12,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  emptyStateSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
});
