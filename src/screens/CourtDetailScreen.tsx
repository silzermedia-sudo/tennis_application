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
import { mockCourts, mockMatches } from '../data/mockData';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'CourtDetail'>;
  route: RouteProp<RootStackParamList, 'CourtDetail'>;
};

export default function CourtDetailScreen({ navigation, route }: Props) {
  const { courtId } = route.params;
  const court = mockCourts.find((c) => c.id === courtId) || mockCourts[0];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Court hero image */}
      <View style={styles.heroContainer}>
        <View style={styles.heroPlaceholder}>
          <Text style={styles.heroIcon}>🎾</Text>
        </View>
        {court.isPremiumHub && (
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumText}>⭐ PREMIUM HUB</Text>
          </View>
        )}
        {court.currentOwner && (
          <View style={styles.conqueredBadge}>
            <Text style={styles.conqueredText}>
              EROBERT VON {court.currentOwner.username.toUpperCase()}
            </Text>
          </View>
        )}
        {/* Header buttons */}
        <SafeAreaView style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>CourtBuddy</Text>
          <TouchableOpacity style={styles.moreButton}>
            <Text style={styles.moreIcon}>⋮</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Court info */}
        <View style={styles.courtInfo}>
          <Text style={styles.courtName}>{court.name}</Text>
          <Text style={styles.courtLocation}>
            📍 {court.location}, {court.city}
          </Text>
          <View style={styles.courtMetaRow}>
            <View style={styles.courtMetaItem}>
              <Text style={styles.courtMetaIcon}>★</Text>
              <Text style={styles.courtMetaValue}>{court.rating}</Text>
            </View>
            <View style={styles.courtMetaItem}>
              <Text style={styles.courtMetaLabel}>Belag:</Text>
              <Text style={styles.courtMetaValue}>{court.surface}</Text>
            </View>
            <View style={styles.courtMetaItem}>
              <Text style={styles.courtMetaLabel}>Entfernung:</Text>
              <Text style={styles.courtMetaValue}>{court.distance}</Text>
            </View>
          </View>
        </View>

        {/* Current Champion */}
        {court.currentOwner && (
          <View style={styles.section}>
            <View style={styles.championHeader}>
              <Text style={styles.championLabel}>AKTUELLER CHAMPION</Text>
              <View style={styles.defendingBadge}>
                <View style={styles.defendingDot} />
                <Text style={styles.defendingText}>VERTEIDIGT</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.championCard}
              onPress={() => navigation.navigate('PlayerProfile', { playerId: court.currentOwner!.id })}
              activeOpacity={0.85}
            >
              <Image
                source={{ uri: court.currentOwner.avatar }}
                style={styles.championAvatar}
              />
              <View style={styles.championInfo}>
                <Text style={styles.championName}>{court.currentOwner.username}</Text>
                <View style={styles.championStats}>
                  <View style={styles.champStatItem}>
                    <Text style={styles.champStatValue}>{court.currentOwner.elo}</Text>
                    <Text style={styles.champStatLabel}>ELO-WERTUNG</Text>
                  </View>
                  <View style={styles.champStatDivider} />
                  <View style={styles.champStatItem}>
                    <Text style={styles.champStatValue}>{court.ownerStreak} Siege</Text>
                    <Text style={styles.champStatLabel}>SIEGESSERIE</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* Challenge Button */}
        <TouchableOpacity
          style={styles.challengeButton}
          onPress={() => navigation.navigate('Challenge', { courtId: court.id })}
          activeOpacity={0.85}
        >
          <Text style={styles.challengeButtonIcon}>⚔</Text>
          <Text style={styles.challengeButtonText}>DIESEN PLATZ HERAUSFORDERN</Text>
        </TouchableOpacity>

        {/* Recent Matches */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Letzte Matches</Text>
            <TouchableOpacity>
              <Text style={styles.sectionLink}>ALLE ANZEIGEN</Text>
            </TouchableOpacity>
          </View>
          {mockMatches.slice(0, 4).map((match) => (
            <View key={match.id} style={styles.matchItem}>
              <View style={styles.matchPlayers}>
                <View style={styles.matchPlayerRow}>
                  <Image
                    source={{ uri: match.player1.avatar }}
                    style={styles.matchAvatar}
                  />
                  <Image
                    source={{ uri: match.player2.avatar }}
                    style={[styles.matchAvatar, { marginLeft: -10 }]}
                  />
                </View>
                <View style={styles.matchInfo}>
                  <Text style={styles.matchTitle}>
                    {match.player1.username} vs {match.player2.username}
                  </Text>
                  <Text style={styles.matchDate}>{match.date}</Text>
                </View>
              </View>
              <View style={styles.matchScoreContainer}>
                <Text style={styles.matchScore}>{match.score}</Text>
                <Text style={styles.matchFormat}>{match.format}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  heroContainer: {
    height: 260,
    position: 'relative',
  },
  heroPlaceholder: {
    flex: 1,
    backgroundColor: '#0A1A0A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroIcon: {
    fontSize: 64,
    opacity: 0.4,
  },
  premiumBadge: {
    position: 'absolute',
    top: 100,
    left: 20,
    backgroundColor: '#00FF87',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  premiumText: {
    color: '#0D0D0D',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  conqueredBadge: {
    position: 'absolute',
    top: 100,
    right: 20,
    backgroundColor: 'rgba(0,255,135,0.15)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#00FF87',
  },
  conqueredText: {
    color: '#00FF87',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  headerButtons: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  moreButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreIcon: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  content: {
    flex: 1,
  },
  courtInfo: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  courtName: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '900',
    marginBottom: 6,
  },
  courtLocation: {
    color: '#888888',
    fontSize: 13,
    marginBottom: 12,
  },
  courtMetaRow: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
  },
  courtMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  courtMetaIcon: {
    color: '#FFB800',
    fontSize: 13,
  },
  courtMetaLabel: {
    color: '#555555',
    fontSize: 12,
  },
  courtMetaValue: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  sectionLink: {
    color: '#00FF87',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  championHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  championLabel: {
    color: '#555555',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  defendingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(0,255,135,0.1)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: '#00FF87',
  },
  defendingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00FF87',
  },
  defendingText: {
    color: '#00FF87',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  championCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  championAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#00FF87',
  },
  championInfo: {
    flex: 1,
  },
  championName: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 10,
  },
  championStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  champStatItem: {
    alignItems: 'center',
  },
  champStatValue: {
    color: '#00FF87',
    fontSize: 18,
    fontWeight: '900',
  },
  champStatLabel: {
    color: '#555555',
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  champStatDivider: {
    width: 1,
    height: 28,
    backgroundColor: '#2A2A2A',
  },
  challengeButton: {
    backgroundColor: '#00FF87',
    margin: 20,
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
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  matchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  matchPlayers: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  matchPlayerRow: {
    flexDirection: 'row',
  },
  matchAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#0D0D0D',
  },
  matchInfo: {
    flex: 1,
  },
  matchTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  matchDate: {
    color: '#555555',
    fontSize: 11,
  },
  matchScoreContainer: {
    alignItems: 'flex-end',
  },
  matchScore: {
    color: '#00FF87',
    fontSize: 13,
    fontWeight: '800',
  },
  matchFormat: {
    color: '#555555',
    fontSize: 10,
    marginTop: 2,
  },
});
