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
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootStackParamList, MainTabsParamList } from '../navigation/types';
import { currentUser, mockCourts, mockMatches } from '../data/mockData';

type Props = {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<MainTabsParamList, 'Profile'>,
    StackNavigationProp<RootStackParamList>
  >;
};

export default function ProfileScreen({ navigation }: Props) {
  const ownedCourts = mockCourts.filter((c) => currentUser.ownedCourts.includes(c.id));
  const userMatches = mockMatches.filter(
    (m) => m.player1.id === currentUser.id || m.player2.id === currentUser.id
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuBtn}>
          <Text style={styles.menuIcon}>≡</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CourtBuddy</Text>
        <TouchableOpacity style={styles.settingsBtn}>
          <Text style={styles.settingsIcon}>⚙</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Hero */}
        <View style={styles.profileHero}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: currentUser.avatar }} style={styles.avatar} />
            <View style={styles.onlineDot} />
          </View>
          <Text style={styles.profileName}>{currentUser.name}</Text>
          <Text style={styles.profileLocation}>📍 {currentUser.location}</Text>
          <Text style={styles.profileMember}>MITGLIED SEIT {currentUser.memberSince.toUpperCase()}</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsGrid}>
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
            <Text style={styles.statLabel}>GEWINN-{'\n'}RATE</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{currentUser.ownedCourts.length}</Text>
            <Text style={styles.statLabel}>PLÄTZE</Text>
          </View>
        </View>

        {/* Owned Courts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Eigene Plätze</Text>
            <TouchableOpacity>
              <Text style={styles.sectionLink}>Alle anzeigen</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {ownedCourts.map((court) => (
              <TouchableOpacity
                key={court.id}
                style={styles.courtCard}
                onPress={() => navigation.navigate('CourtDetail', { courtId: court.id })}
                activeOpacity={0.85}
              >
                <View style={styles.courtImagePlaceholder}>
                  <Text style={styles.courtImageIcon}>🎾</Text>
                </View>
                <View style={styles.courtCardContent}>
                  <Text style={styles.courtName} numberOfLines={1}>{court.name}</Text>
                  <Text style={styles.courtDate}>
                    🏆 Erobert im Jan 12
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
            {ownedCourts.length === 0 && (
              <View style={styles.emptyCourtCard}>
                <Text style={styles.emptyCourtText}>Noch keine Plätze. Fordere raus!</Text>
              </View>
            )}
          </ScrollView>
        </View>

        {/* Match History */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Match-Verlauf</Text>
          </View>
          {userMatches.map((match) => {
            const isWinner = match.winner.id === currentUser.id;
            const opponent = match.player1.id === currentUser.id ? match.player2 : match.player1;
            return (
              <View key={match.id} style={styles.matchItem}>
                <Image source={{ uri: opponent.avatar }} style={styles.matchAvatar} />
                <View style={styles.matchInfo}>
                  <Text style={styles.matchOpponent}>{opponent.username}</Text>
                  <Text style={styles.matchFormat}>{match.format}</Text>
                </View>
                <View style={styles.matchRight}>
                  <Text style={styles.matchScore}>{match.score}</Text>
                  <View style={[
                    styles.matchResultBadge,
                    isWinner ? styles.matchWin : styles.matchLoss,
                  ]}>
                    <Text style={styles.matchResultText}>
                      {isWinner ? 'SIEG' : 'NIEDERLAGE'}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonIcon}>✏</Text>
            <Text style={styles.editButtonText}>Profil bearbeiten</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsButton}>
            <Text style={styles.settingsButtonIcon}>⚙</Text>
            <Text style={styles.settingsButtonText}>Einstellungen</Text>
          </TouchableOpacity>
        </View>

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
  settingsBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIcon: {
    color: '#888888',
    fontSize: 18,
  },
  profileHero: {
    alignItems: 'center',
    paddingVertical: 24,
    gap: 6,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 4,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 3,
    borderColor: '#00FF87',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#00FF87',
    borderWidth: 2,
    borderColor: '#0D0D0D',
  },
  profileName: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: -0.3,
  },
  profileLocation: {
    color: '#888888',
    fontSize: 13,
  },
  profileMember: {
    color: '#555555',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 20,
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
  section: {
    marginTop: 20,
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
    fontSize: 12,
    fontWeight: '600',
  },
  courtCard: {
    width: 150,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    marginRight: 12,
    overflow: 'hidden',
  },
  courtImagePlaceholder: {
    height: 80,
    backgroundColor: '#0A1A0A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  courtImageIcon: {
    fontSize: 28,
  },
  courtCardContent: {
    padding: 10,
  },
  courtName: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
  },
  courtDate: {
    color: '#888888',
    fontSize: 10,
  },
  emptyCourtCard: {
    width: 200,
    height: 100,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    borderStyle: 'dashed',
  },
  emptyCourtText: {
    color: '#555555',
    fontSize: 12,
    textAlign: 'center',
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
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  matchInfo: {
    flex: 1,
  },
  matchOpponent: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 3,
  },
  matchFormat: {
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
  matchResultBadge: {
    borderRadius: 6,
    paddingHorizontal: 7,
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
  matchResultText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  actionButtons: {
    gap: 12,
    marginTop: 24,
    paddingHorizontal: 20,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#1A1A1A',
    borderRadius: 14,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  editButtonIcon: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#1A1A1A',
    borderRadius: 14,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  settingsButtonIcon: {
    fontSize: 14,
    color: '#888888',
  },
  settingsButtonText: {
    color: '#888888',
    fontSize: 14,
    fontWeight: '600',
  },
});
