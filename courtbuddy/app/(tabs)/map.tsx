import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TextInput,
  Animated,
  ScrollView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { COURTS } from '../../constants/mockData';
import type { Court } from '../../types';

let MapView: any = null;
let Marker: any = null;
try {
  const maps = require('react-native-maps');
  MapView = maps.default;
  Marker = maps.Marker;
} catch (_e) {
  // maps not available
}

const VIENNA_REGION = {
  latitude: 48.2082,
  longitude: 16.3738,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

function CourtMarker({ court, onPress }: { court: Court; onPress: (c: Court) => void }) {
  return (
    <Marker
      coordinate={{ latitude: court.latitude, longitude: court.longitude }}
      onPress={() => onPress(court)}
    >
      <View style={styles.markerContainer}>
        <View style={styles.markerCircle}>
          <Ionicons name="tennisball-outline" size={16} color={Colors.bg} />
        </View>
      </View>
    </Marker>
  );
}

function CourtListItem({ court, onPress }: { court: Court; onPress: (c: Court) => void }) {
  const isOwned = court.ownerId !== null;
  return (
    <TouchableOpacity style={styles.courtListItem} onPress={() => onPress(court)} activeOpacity={0.8}>
      <View style={styles.courtListIcon}>
        <Ionicons name="tennisball-outline" size={20} color={Colors.accent} />
      </View>
      <View style={styles.courtListInfo}>
        <Text style={styles.courtListName}>{court.name}</Text>
        <Text style={styles.courtListAddress}>{court.address}</Text>
      </View>
      <View style={styles.courtListRight}>
        <Text style={styles.courtListDistance}>{court.distance} km</Text>
        {isOwned ? (
          <Text style={styles.courtListOwner} numberOfLines={1}>
            {court.ownerName}
          </Text>
        ) : (
          <Text style={styles.courtListUnowned}>Unerobert</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default function MapScreen() {
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  const [searchText, setSearchText] = useState('');
  const sheetAnim = useRef(new Animated.Value(300)).current;
  const mapsAvailable = MapView !== null;

  const showBottomSheet = (court: Court) => {
    setSelectedCourt(court);
    Animated.spring(sheetAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 80,
      friction: 12,
    }).start();
  };

  const hideBottomSheet = () => {
    Animated.timing(sheetAnim, {
      toValue: 300,
      duration: 220,
      useNativeDriver: true,
    }).start(() => setSelectedCourt(null));
  };

  const filteredCourts = COURTS.filter(
    (c) =>
      searchText.trim() === '' ||
      c.name.toLowerCase().includes(searchText.toLowerCase()) ||
      c.city.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bg} />

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

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={18} color={Colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Plätze oder Orte suchen..."
          placeholderTextColor={Colors.textSecondary}
          value={searchText}
          onChangeText={setSearchText}
          returnKeyType="search"
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={() => setSearchText('')} activeOpacity={0.7}>
            <Ionicons name="close-circle" size={18} color={Colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Map or Fallback List */}
      <View style={styles.mapContainer}>
        {mapsAvailable ? (
          <MapView
            style={styles.map}
            initialRegion={VIENNA_REGION}
            customMapStyle={darkMapStyle}
          >
            {filteredCourts.map((court) => (
              <CourtMarker key={court.id} court={court} onPress={showBottomSheet} />
            ))}
          </MapView>
        ) : (
          <ScrollView
            style={styles.fallbackList}
            contentContainerStyle={styles.fallbackListContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.fallbackTitle}>Plätze in Wien</Text>
            {filteredCourts.map((court) => (
              <CourtListItem key={court.id} court={court} onPress={showBottomSheet} />
            ))}
          </ScrollView>
        )}
      </View>

      {/* Background Dismiss Overlay */}
      {selectedCourt !== null && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={hideBottomSheet}
        />
      )}

      {/* Bottom Sheet */}
      {selectedCourt !== null && (
        <Animated.View
          style={[styles.bottomSheet, { transform: [{ translateY: sheetAnim }] }]}
        >
          <View style={styles.bottomSheetHandle} />

          <View style={styles.bottomSheetHeader}>
            <View style={styles.bottomSheetTitleRow}>
              <Text style={styles.bottomSheetCourtName}>{selectedCourt.name}</Text>
              {selectedCourt.isPremium && (
                <View style={styles.premiumBadge}>
                  <Text style={styles.premiumBadgeText}>PREMIUM</Text>
                </View>
              )}
            </View>
            <Text style={styles.bottomSheetAddress}>{selectedCourt.address}, {selectedCourt.city}</Text>
          </View>

          <View style={styles.bottomSheetOwnerRow}>
            <Ionicons name="person-outline" size={16} color={Colors.textSecondary} />
            <Text style={styles.bottomSheetOwnerLabel}>Eigentümer: </Text>
            {selectedCourt.ownerId ? (
              <Text style={styles.bottomSheetOwnerName}>{selectedCourt.ownerName}</Text>
            ) : (
              <Text style={styles.bottomSheetUnowned}>Unerobert</Text>
            )}
          </View>

          <View style={styles.bottomSheetMeta}>
            <View style={styles.bottomSheetMetaItem}>
              <Ionicons name="layers-outline" size={14} color={Colors.textSecondary} />
              <Text style={styles.bottomSheetMetaText}>{selectedCourt.surface}</Text>
            </View>
            <View style={styles.bottomSheetMetaItem}>
              <Ionicons name="star-outline" size={14} color={Colors.textSecondary} />
              <Text style={styles.bottomSheetMetaText}>{selectedCourt.rating}</Text>
            </View>
            <View style={styles.bottomSheetMetaItem}>
              <Ionicons name="navigate-outline" size={14} color={Colors.textSecondary} />
              <Text style={styles.bottomSheetMetaText}>{selectedCourt.distance} km</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.challengeButton}
            onPress={() => {
              hideBottomSheet();
              router.push(`/court/${selectedCourt.id}` as any);
            }}
            activeOpacity={0.8}
          >
            <Ionicons name="flash-outline" size={18} color={Colors.bg} />
            <Text style={styles.challengeButtonText}>Eigentümer herausfordern</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

const darkMapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#1a1a1a' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#888888' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#0d0d0d' }] },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#2a2a2a' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#0d1f2d' }],
  },
];

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bg,
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

  // Search
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 12,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 10,
  },
  searchIcon: {
    flexShrink: 0,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.textPrimary,
    padding: 0,
  },

  // Map
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },

  // Fallback list
  fallbackList: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  fallbackListContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  fallbackTitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 12,
    marginTop: 4,
  },
  courtListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 12,
  },
  courtListIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0A2318',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  courtListInfo: {
    flex: 1,
  },
  courtListName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  courtListAddress: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  courtListRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  courtListDistance: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  courtListOwner: {
    fontSize: 10,
    color: Colors.textSecondary,
    maxWidth: 80,
  },
  courtListUnowned: {
    fontSize: 10,
    color: Colors.accent,
    fontWeight: '600',
  },

  // Marker
  markerContainer: {
    alignItems: 'center',
  },
  markerCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.bg,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },

  // Overlay
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.overlay,
  },

  // Bottom Sheet
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 34,
    borderTopWidth: 1,
    borderColor: Colors.border,
  },
  bottomSheetHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border,
    alignSelf: 'center',
    marginBottom: 20,
  },
  bottomSheetHeader: {
    marginBottom: 14,
  },
  bottomSheetTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 6,
  },
  bottomSheetCourtName: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
    flex: 1,
  },
  premiumBadge: {
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
  bottomSheetAddress: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  bottomSheetOwnerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  bottomSheetOwnerLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  bottomSheetOwnerName: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  bottomSheetUnowned: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.accent,
  },
  bottomSheetMeta: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  bottomSheetMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  bottomSheetMetaText: {
    fontSize: 12,
    color: Colors.textSecondary,
    textTransform: 'capitalize',
  },
  challengeButton: {
    backgroundColor: Colors.accent,
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  challengeButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.bg,
    letterSpacing: 0.5,
  },
});
