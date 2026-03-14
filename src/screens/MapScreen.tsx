import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  ScrollView,
  Dimensions,
  Animated,
  Image,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootStackParamList, MainTabsParamList } from '../navigation/types';
import { mockCourts } from '../data/mockData';
import { Court } from '../types';

type Props = {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<MainTabsParamList, 'Map'>,
    StackNavigationProp<RootStackParamList>
  >;
};

const { width, height } = Dimensions.get('window');

// Fake map with court markers
function FakeMap({ courts, onCourtPress }: { courts: Court[]; onCourtPress: (court: Court) => void }) {
  // Simulate a map background with a grid
  const positions = [
    { x: 0.3, y: 0.35 },
    { x: 0.6, y: 0.45 },
    { x: 0.45, y: 0.6 },
    { x: 0.7, y: 0.3 },
  ];

  return (
    <View style={mapStyles.container}>
      {/* Map grid background */}
      <View style={mapStyles.mapBg}>
        {/* Simulated streets */}
        <View style={[mapStyles.street, { top: '25%', width: '100%', height: 2 }]} />
        <View style={[mapStyles.street, { top: '50%', width: '100%', height: 2 }]} />
        <View style={[mapStyles.street, { top: '75%', width: '100%', height: 2 }]} />
        <View style={[mapStyles.streetV, { left: '25%', height: '100%', width: 2 }]} />
        <View style={[mapStyles.streetV, { left: '50%', height: '100%', width: 2 }]} />
        <View style={[mapStyles.streetV, { left: '75%', height: '100%', width: 2 }]} />
        {/* Parks */}
        <View style={[mapStyles.park, { top: '15%', left: '10%', width: 80, height: 60 }]} />
        <View style={[mapStyles.park, { top: '55%', left: '55%', width: 100, height: 70 }]} />
        <Text style={mapStyles.mapLabel}>Prenzlauer Berg</Text>
        <Text style={[mapStyles.mapLabel, { top: '45%', left: '5%' }]}>Mitte</Text>
        <Text style={[mapStyles.mapLabel, { top: '70%', right: 20, left: undefined }]}>Kreuzberg</Text>
      </View>

      {/* Court markers */}
      {courts.map((court, index) => {
        const pos = positions[index] || { x: 0.5, y: 0.5 };
        return (
          <TouchableOpacity
            key={court.id}
            style={[
              mapStyles.marker,
              {
                left: pos.x * width - 22,
                top: pos.y * (height * 0.55) - 22,
              },
              court.isPremiumHub && mapStyles.markerPremium,
            ]}
            onPress={() => onCourtPress(court)}
            activeOpacity={0.85}
          >
            <Text style={mapStyles.markerIcon}>🎾</Text>
            {court.currentOwner && (
              <View style={mapStyles.markerOwnerDot} />
            )}
          </TouchableOpacity>
        );
      })}

      {/* User location */}
      <View style={[mapStyles.userLocation, { left: width / 2 - 15, top: height * 0.55 * 0.5 - 15 }]}>
        <View style={mapStyles.userLocationInner} />
      </View>
    </View>
  );
}

const mapStyles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  mapBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#111111',
  },
  street: {
    position: 'absolute',
    backgroundColor: '#1E1E1E',
  },
  streetV: {
    position: 'absolute',
    backgroundColor: '#1E1E1E',
  },
  park: {
    position: 'absolute',
    backgroundColor: '#0D1A0D',
    borderRadius: 8,
  },
  mapLabel: {
    position: 'absolute',
    top: '30%',
    left: '30%',
    color: '#333333',
    fontSize: 11,
    fontWeight: '600',
  },
  marker: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1A1A1A',
    borderWidth: 2,
    borderColor: '#2A2A2A',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  markerPremium: {
    borderColor: '#00FF87',
    backgroundColor: '#0D2018',
  },
  markerIcon: {
    fontSize: 20,
  },
  markerOwnerDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00FF87',
    borderWidth: 1.5,
    borderColor: '#0D0D0D',
  },
  userLocation: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0,120,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,120,255,0.4)',
  },
  userLocationInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#0078FF',
  },
});

export default function MapScreen({ navigation }: Props) {
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  const [searchText, setSearchText] = useState('');

  const handleCourtPress = (court: Court) => {
    setSelectedCourt(court);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Map */}
      <FakeMap courts={mockCourts} onCourtPress={handleCourtPress} />

      {/* Search bar overlay */}
      <SafeAreaView style={styles.searchOverlay} pointerEvents="box-none">
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Plätze oder Orte suchen"
            placeholderTextColor="#555555"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>CourtBuddy</Text>
          <TouchableOpacity style={styles.menuBtn}>
            <Text style={styles.menuIcon}>≡</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Bottom Sheet - Court Detail Preview */}
      {selectedCourt ? (
        <View style={styles.bottomSheet}>
          <View style={styles.bottomSheetHandle} />

          <View style={styles.courtPreviewHeader}>
            <View style={styles.courtPreviewInfo}>
              {selectedCourt.isPremiumHub && (
                <View style={styles.premiumBadge}>
                  <Text style={styles.premiumText}>PREMIUM HUB</Text>
                </View>
              )}
              <Text style={styles.courtPreviewName}>{selectedCourt.name}</Text>
              <Text style={styles.courtPreviewLocation}>
                {selectedCourt.location}, {selectedCourt.city}
              </Text>
            </View>
            <TouchableOpacity onPress={() => setSelectedCourt(null)}>
              <Text style={styles.closeBtn}>✕</Text>
            </TouchableOpacity>
          </View>

          {selectedCourt.currentOwner && (
            <View style={styles.ownerSection}>
              <View style={styles.ownerLeft}>
                <Text style={styles.ownerLabel}>AKTUELLER CHAMPION</Text>
                <View style={styles.ownerRow}>
                  <Image
                    source={{ uri: selectedCourt.currentOwner.avatar }}
                    style={styles.ownerAvatar}
                  />
                  <View>
                    <Text style={styles.ownerUsername}>{selectedCourt.currentOwner.username}</Text>
                    <View style={styles.ownerStats}>
                      <Text style={styles.ownerElo}>{selectedCourt.currentOwner.elo}</Text>
                      <Text style={styles.ownerStatLabel}>ELO-WERTUNG</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.ownerRight}>
                <Text style={styles.defendingBadge}>⚡ VERTEIDIGT</Text>
                <Text style={styles.streakNumber}>{selectedCourt.ownerStreak} Siege</Text>
                <Text style={styles.streakLabel}>SIEGESSERIE</Text>
              </View>
            </View>
          )}

          <TouchableOpacity
            style={styles.challengeButton}
            onPress={() => navigation.navigate('CourtDetail', { courtId: selectedCourt.id })}
            activeOpacity={0.85}
          >
            <Text style={styles.challengeButtonIcon}>⚔</Text>
            <Text style={styles.challengeButtonText}>DIESEN PLATZ HERAUSFORDERN</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.nearbyBottomSheet}>
          <View style={styles.bottomSheetHandle} />
          <Text style={styles.nearbyTitle}>{mockCourts[2].name}</Text>
          <View style={styles.nearbyRatingRow}>
            <Text style={styles.ratingIcon}>★</Text>
            <Text style={styles.ratingText}>{mockCourts[2].rating}</Text>
            {mockCourts[2].livePlaying && (
              <View style={styles.liveMatchBadge}>
                <View style={styles.liveDot} />
                <Text style={styles.liveMatchText}>LIVE MATCHES</Text>
              </View>
            )}
          </View>
          {mockCourts[2].currentOwner && (
            <View style={styles.nearbyOwnerRow}>
              <Image
                source={{ uri: mockCourts[2].currentOwner.avatar }}
                style={styles.nearbyOwnerAvatar}
              />
              <View>
                <Text style={styles.nearbyOwnerLabel}>AKTUELLER BESITZER</Text>
                <Text style={styles.nearbyOwnerName}>{mockCourts[2].currentOwner.username}</Text>
              </View>
              <Text style={styles.nearbyStreak}>
                {mockCourts[2].ownerStreak} Siege{'\n'}
                <Text style={styles.nearbyStreakLabel}>SERIE</Text>
              </Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.challengeButton}
            onPress={() => navigation.navigate('CourtDetail', { courtId: mockCourts[2].id })}
          >
            <Text style={styles.challengeButtonText}>BESITZER HERAUSFORDERN</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  searchOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingBottom: 8,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  menuBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(26,26,26,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(26,26,26,0.95)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginTop: 8,
    gap: 8,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  searchIcon: {
    fontSize: 14,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#111111',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 36,
    borderTopWidth: 1,
    borderColor: '#2A2A2A',
  },
  nearbyBottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#111111',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 36,
    borderTopWidth: 1,
    borderColor: '#2A2A2A',
  },
  bottomSheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#333333',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  courtPreviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  courtPreviewInfo: {},
  premiumBadge: {
    backgroundColor: '#00FF87',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  premiumText: {
    color: '#0D0D0D',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },
  courtPreviewName: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 4,
  },
  courtPreviewLocation: {
    color: '#888888',
    fontSize: 13,
  },
  closeBtn: {
    color: '#555555',
    fontSize: 20,
  },
  ownerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  ownerLeft: {},
  ownerLabel: {
    color: '#555555',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 8,
  },
  ownerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  ownerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#00FF87',
  },
  ownerUsername: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  ownerStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ownerElo: {
    color: '#00FF87',
    fontSize: 16,
    fontWeight: '800',
  },
  ownerStatLabel: {
    color: '#555555',
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  ownerRight: {
    alignItems: 'flex-end',
  },
  defendingBadge: {
    color: '#00FF87',
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 4,
  },
  streakNumber: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
  },
  streakLabel: {
    color: '#555555',
    fontSize: 9,
    letterSpacing: 1,
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
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  nearbyTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 6,
  },
  nearbyRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 14,
  },
  ratingIcon: {
    color: '#FFB800',
    fontSize: 14,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  liveMatchBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0,255,135,0.1)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: '#00FF87',
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00FF87',
  },
  liveMatchText: {
    color: '#00FF87',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  nearbyOwnerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  nearbyOwnerAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  nearbyOwnerLabel: {
    color: '#555555',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 2,
  },
  nearbyOwnerName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  nearbyStreak: {
    marginLeft: 'auto',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'right',
  },
  nearbyStreakLabel: {
    color: '#555555',
    fontSize: 9,
    fontWeight: '600',
  },
});
