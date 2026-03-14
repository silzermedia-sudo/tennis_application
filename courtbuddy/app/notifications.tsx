import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { NOTIFICATIONS } from '../constants/mockData';
import type { Notification } from '../types';

type TabType = 'herausforderungen' | 'aktivitaet';

type NotificationIconName =
  | 'people-outline'
  | 'trophy-outline'
  | 'flag-outline'
  | 'person-add-outline'
  | 'trending-down-outline';

interface NotificationIconConfig {
  name: NotificationIconName;
  bg: string;
  color: string;
}

function getIconConfig(type: Notification['type']): NotificationIconConfig {
  switch (type) {
    case 'herausforderung':
      return { name: 'people-outline', bg: Colors.accentBg, color: Colors.accent };
    case 'ergebnis':
      return { name: 'trophy-outline', bg: Colors.accentBg, color: Colors.accent };
    case 'platz_erobert':
      return { name: 'flag-outline', bg: Colors.accentBg, color: Colors.accent };
    case 'neuer_spieler':
      return { name: 'person-add-outline', bg: Colors.surface3, color: Colors.textSecondary };
    case 'elo_aenderung':
      return { name: 'trending-down-outline', bg: Colors.dangerBg, color: Colors.danger };
    default:
      return { name: 'people-outline', bg: Colors.surface3, color: Colors.textSecondary };
  }
}

const BAR_DATA = [
  { day: 'Mo', height: 28 },
  { day: 'Di', height: 44 },
  { day: 'Mi', height: 20 },
  { day: 'Do', height: 56 },
  { day: 'Fr', height: 36 },
  { day: 'Sa', height: 48 },
  { day: 'So', height: 72, highlighted: true },
];

function NotificationCard({ notification }: { notification: Notification }) {
  const iconCfg = getIconConfig(notification.type);
  return (
    <View
      style={[
        styles.notificationCard,
        !notification.read && styles.notificationCardUnread,
      ]}
    >
      <View style={[styles.notifIconWrapper, { backgroundColor: iconCfg.bg }]}>
        <Ionicons name={iconCfg.name} size={20} color={iconCfg.color} />
      </View>
      <View style={styles.notifContent}>
        <Text style={styles.notifTitle}>{notification.title}</Text>
        <Text style={styles.notifMessage}>{notification.message}</Text>
      </View>
      <Text style={styles.notifTimeAgo}>{notification.timeAgo}</Text>
    </View>
  );
}

export default function NotificationsScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('aktivitaet');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.headerIconBtn}>
            <Ionicons name="menu" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>CourtBuddy</Text>

          <TouchableOpacity style={styles.headerIconBtn}>
            <View style={styles.bellWrapper}>
              <Ionicons name="notifications-outline" size={24} color={Colors.textPrimary} />
              <View style={styles.bellDot} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Tab Pills */}
        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[
              styles.tabPill,
              activeTab === 'herausforderungen' && styles.tabPillActive,
            ]}
            onPress={() => setActiveTab('herausforderungen')}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.tabPillText,
                activeTab === 'herausforderungen' && styles.tabPillTextActive,
              ]}
            >
              Herausforderungen
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabPill,
              activeTab === 'aktivitaet' && styles.tabPillActive,
            ]}
            onPress={() => setActiveTab('aktivitaet')}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.tabPillText,
                activeTab === 'aktivitaet' && styles.tabPillTextActive,
              ]}
            >
              Aktivität
            </Text>
          </TouchableOpacity>
        </View>

        {/* Section Heading */}
        <Text style={styles.sectionHeading}>AKTUELLE AKTIVITÄT</Text>

        {/* Notification Cards */}
        {NOTIFICATIONS.map((notif) => (
          <NotificationCard key={notif.id} notification={notif} />
        ))}

        {/* Performance Summary */}
        <Text style={styles.perfHeading}>Performance Zusammenfassung</Text>

        <View style={styles.perfCard}>
          <View style={styles.perfCardHeader}>
            <Text style={styles.dieseWocheLabel}>DIESE WOCHE</Text>
          </View>

          <Text style={styles.eloTotal}>+142 ELO</Text>

          {/* Bar Chart */}
          <View style={styles.barChart}>
            {BAR_DATA.map((bar) => (
              <View key={bar.day} style={styles.barColumn}>
                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.bar,
                      { height: bar.height },
                      bar.highlighted && styles.barHighlighted,
                    ]}
                  />
                </View>
                <Text style={styles.barDayLabel}>{bar.day}</Text>
              </View>
            ))}
          </View>
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
  bellWrapper: {
    position: 'relative',
  },
  bellDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.accent,
    borderWidth: 1,
    borderColor: Colors.bg,
  },

  // Tabs
  tabRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    backgroundColor: Colors.surface,
    borderRadius: 24,
    padding: 4,
    gap: 4,
  },
  tabPill: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabPillActive: {
    backgroundColor: Colors.accent,
  },
  tabPillText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  tabPillTextActive: {
    color: '#0D0D0D',
    fontWeight: '700',
  },

  // Section Heading
  sectionHeading: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textSecondary,
    letterSpacing: 1.4,
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
  },

  // Notification Cards
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 12,
  },
  notificationCardUnread: {
    backgroundColor: '#202020',
    borderColor: '#333333',
  },
  notifIconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  notifContent: {
    flex: 1,
    gap: 3,
  },
  notifTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  notifMessage: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
  notifTimeAgo: {
    fontSize: 11,
    color: Colors.textSecondary,
    flexShrink: 0,
    alignSelf: 'flex-start',
  },

  // Performance Summary
  perfHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginHorizontal: 16,
    marginTop: 28,
    marginBottom: 12,
  },
  perfCard: {
    backgroundColor: Colors.surface,
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  perfCardHeader: {
    marginBottom: 8,
  },
  dieseWocheLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textSecondary,
    letterSpacing: 1.2,
  },
  eloTotal: {
    fontSize: 40,
    fontWeight: '800',
    color: Colors.accent,
    marginBottom: 20,
    letterSpacing: -0.5,
  },

  // Bar Chart
  barChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 88,
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  barTrack: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    alignItems: 'center',
  },
  bar: {
    width: '60%',
    backgroundColor: Colors.accentDim,
    borderRadius: 4,
    minHeight: 4,
  },
  barHighlighted: {
    backgroundColor: Colors.accent,
  },
  barDayLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginTop: 4,
  },
});
