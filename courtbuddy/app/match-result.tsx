import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';

interface SetScore {
  p1: number;
  p2: number;
}

function PlayerCard({
  name,
  initials,
  avatarColor,
  badge,
  badgeColor,
  badgeTextColor,
  isWinner,
}: {
  name: string;
  initials: string;
  avatarColor: string;
  badge: string;
  badgeColor: string;
  badgeTextColor: string;
  isWinner: boolean;
}) {
  return (
    <View style={styles.playerCardWrapper}>
      <View style={styles.playerCard}>
        {isWinner && (
          <View style={styles.winBanner}>
            <Text style={styles.winBannerText}>SIEG</Text>
          </View>
        )}
        <View style={[styles.bigAvatar, { backgroundColor: avatarColor }]}>
          <Text style={styles.bigAvatarText}>{initials}</Text>
        </View>
        <Text style={styles.playerCardName}>{name}</Text>
        <View style={[styles.levelBadge, { backgroundColor: badgeColor }]}>
          <Text style={[styles.levelBadgeText, { color: badgeTextColor }]}>
            {badge}
          </Text>
        </View>
      </View>
    </View>
  );
}

function ScoreBox({
  value,
  onPress,
  dimmed,
}: {
  value: number;
  onPress: () => void;
  dimmed?: boolean;
}) {
  return (
    <TouchableOpacity
      style={[styles.scoreBox, dimmed && styles.scoreBoxDimmed]}
      onPress={onPress}
      disabled={dimmed}
      activeOpacity={0.7}
    >
      <Text style={[styles.scoreBoxText, dimmed && styles.scoreBoxTextDimmed]}>
        {value}
      </Text>
    </TouchableOpacity>
  );
}

export default function MatchResultScreen() {
  const [satz1, setSatz1] = useState<SetScore>({ p1: 6, p2: 4 });
  const [satz2, setSatz2] = useState<SetScore>({ p1: 7, p2: 5 });

  function incrementScore(
    setter: React.Dispatch<React.SetStateAction<SetScore>>,
    side: 'p1' | 'p2'
  ) {
    setter((prev) => ({
      ...prev,
      [side]: prev[side] >= 7 ? 0 : prev[side] + 1,
    }));
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.headerIconBtn}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Match Ergebnis</Text>
          <TouchableOpacity style={styles.headerIconBtn}>
            <Ionicons name="ellipsis-vertical" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* VS Section */}
        <View style={styles.vsSection}>
          <PlayerCard
            name="Alex Rivers"
            initials="AR"
            avatarColor={Colors.gold}
            badge="GOLD"
            badgeColor={Colors.warningBg}
            badgeTextColor={Colors.gold}
            isWinner={true}
          />

          <View style={styles.vsCircle}>
            <Text style={styles.vsCircleText}>VS</Text>
          </View>

          <PlayerCard
            name="Jordan Case"
            initials="JC"
            avatarColor={Colors.silver}
            badge="SILVER"
            badgeColor="rgba(192,192,192,0.15)"
            badgeTextColor={Colors.silver}
            isWinner={false}
          />
        </View>

        {/* Score Entry Section */}
        <View style={styles.scoreSection}>
          <Text style={styles.scoreSectionTitle}>ERGEBNIS EINGEBEN</Text>

          {/* Satz 1 */}
          <View style={styles.satzRow}>
            <Text style={styles.satzLabel}>SATZ 1</Text>
            <View style={styles.satzScores}>
              <ScoreBox
                value={satz1.p1}
                onPress={() => incrementScore(setSatz1, 'p1')}
              />
              <Text style={styles.colonSeparator}>:</Text>
              <ScoreBox
                value={satz1.p2}
                onPress={() => incrementScore(setSatz1, 'p2')}
              />
            </View>
          </View>

          {/* Satz 2 */}
          <View style={styles.satzRow}>
            <Text style={styles.satzLabel}>SATZ 2</Text>
            <View style={styles.satzScores}>
              <ScoreBox
                value={satz2.p1}
                onPress={() => incrementScore(setSatz2, 'p1')}
              />
              <Text style={styles.colonSeparator}>:</Text>
              <ScoreBox
                value={satz2.p2}
                onPress={() => incrementScore(setSatz2, 'p2')}
              />
            </View>
          </View>

          {/* Satz 3 optional / greyed out */}
          <View style={styles.satzRow}>
            <View style={styles.satzLabelRow}>
              <Text style={[styles.satzLabel, styles.satzLabelDimmed]}>
                SATZ 3
              </Text>
              <Text style={styles.optionalTag}>Optional</Text>
            </View>
            <View style={styles.satzScores}>
              <ScoreBox value={0} onPress={() => {}} dimmed />
              <Text style={[styles.colonSeparator, styles.colonSeparatorDimmed]}>
                :
              </Text>
              <ScoreBox value={0} onPress={() => {}} dimmed />
            </View>
          </View>
        </View>

        {/* Rang-Vorschau Section */}
        <View style={styles.rangSection}>
          <Text style={styles.rangSectionTitle}>RANG-VORSCHAU</Text>

          {/* Alex Rivers row */}
          <View style={styles.rangRow}>
            <View style={styles.rangPlayerLeft}>
              <View style={[styles.rangAvatar, { backgroundColor: Colors.gold }]}>
                <Text style={styles.rangAvatarText}>AR</Text>
              </View>
              <Text style={styles.rangPlayerName}>Alex Rivers</Text>
            </View>
            <View style={styles.rangStatsRight}>
              <View style={styles.rangArrowUp}>
                <Ionicons name="arrow-up" size={14} color={Colors.accent} />
              </View>
              <Text style={styles.rangNewRank}>Neue Rangliste: 1.424</Text>
              <Text style={styles.eloGain}>+24 ELO</Text>
            </View>
          </View>

          <View style={styles.rangDivider} />

          {/* Jordan Case row */}
          <View style={styles.rangRow}>
            <View style={styles.rangPlayerLeft}>
              <View style={[styles.rangAvatar, { backgroundColor: Colors.silver }]}>
                <Text style={styles.rangAvatarText}>JC</Text>
              </View>
              <Text style={styles.rangPlayerName}>Jordan Case</Text>
            </View>
            <View style={styles.rangStatsRight}>
              <View style={styles.rangArrowDown}>
                <Ionicons name="arrow-down" size={14} color={Colors.danger} />
              </View>
              <Text style={styles.rangNewRank}>Neue Rangliste: 1.182</Text>
              <Text style={styles.eloLoss}>-18 ELO</Text>
            </View>
          </View>
        </View>

        {/* Confirm Button */}
        <TouchableOpacity
          style={styles.confirmButton}
          activeOpacity={0.85}
          onPress={() => router.back()}
        >
          <Text style={styles.confirmButtonText}>Ergebnis bestätigen</Text>
        </TouchableOpacity>

        {/* Info Text */}
        <Text style={styles.infoText}>
          Jordan wird 24 Stunden Zeit haben, das Ergebnis zu bestätigen.
        </Text>
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

  // VS Section
  vsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 8,
  },
  playerCardWrapper: {
    flex: 1,
  },
  playerCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 8,
    position: 'relative',
    overflow: 'hidden',
  },
  winBanner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.accent,
    paddingVertical: 4,
    alignItems: 'center',
  },
  winBannerText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0D0D0D',
    letterSpacing: 1.5,
  },
  bigAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  bigAvatarText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0D0D0D',
  },
  playerCardName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  levelBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  levelBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // VS Circle
  vsCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.surface2,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    flexShrink: 0,
  },
  vsCircleText: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.textSecondary,
    letterSpacing: 1,
  },

  // Score Entry
  scoreSection: {
    backgroundColor: Colors.surface,
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  scoreSectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textSecondary,
    letterSpacing: 1.2,
    marginBottom: 16,
  },
  satzRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  satzLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  satzLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: 0.5,
    minWidth: 60,
  },
  satzLabelDimmed: {
    color: Colors.textMuted,
  },
  optionalTag: {
    fontSize: 10,
    color: Colors.textMuted,
    fontWeight: '500',
    fontStyle: 'italic',
  },
  satzScores: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  scoreBox: {
    width: 52,
    height: 52,
    backgroundColor: Colors.surface2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.accent,
  },
  scoreBoxDimmed: {
    borderColor: Colors.border,
  },
  scoreBoxText: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  scoreBoxTextDimmed: {
    color: Colors.textMuted,
  },
  colonSeparator: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  colonSeparatorDimmed: {
    color: Colors.textMuted,
  },

  // Rang-Vorschau
  rangSection: {
    backgroundColor: Colors.surface,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  rangSectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textSecondary,
    letterSpacing: 1.2,
    marginBottom: 14,
  },
  rangRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  rangPlayerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  rangAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rangAvatarText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0D0D0D',
  },
  rangPlayerName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  rangStatsRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  rangArrowUp: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.accentBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rangArrowDown: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.dangerBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rangNewRank: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  eloGain: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.accent,
  },
  eloLoss: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.danger,
  },
  rangDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 4,
  },

  // Confirm Button
  confirmButton: {
    backgroundColor: Colors.accent,
    marginHorizontal: 16,
    marginTop: 24,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0D0D0D',
    letterSpacing: 0.5,
  },

  // Info Text
  infoText: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginHorizontal: 32,
    marginTop: 14,
    lineHeight: 18,
  },
});
