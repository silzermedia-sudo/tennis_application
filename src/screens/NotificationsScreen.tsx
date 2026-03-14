import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { mockNotifications } from '../data/mockData';
import { Notification } from '../types';

type TabType = 'challenges' | 'activity';

const notifIcons: Record<Notification['type'], string> = {
  challenge: '⚔',
  match_result: '🏆',
  court_conquered: '🏛',
  new_player: '👤',
  elo_change: 'ℹ',
};

const notifColors: Record<Notification['type'], string> = {
  challenge: '#00FF87',
  match_result: '#00FF87',
  court_conquered: '#00FF87',
  new_player: '#888888',
  elo_change: '#888888',
};

// Weekly performance bar data
const weekData = [40, 70, 55, 90, 60, 80, 85];
const dayLabels = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

export default function NotificationsScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('activity');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuBtn}>
          <Text style={styles.menuIcon}>≡</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CourtBuddy</Text>
        <View style={styles.notifBellContainer}>
          <TouchableOpacity style={styles.notifBell}>
            <Text style={styles.notifBellIcon}>🔔</Text>
          </TouchableOpacity>
          <View style={styles.notifDot} />
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'challenges' && styles.tabActive]}
          onPress={() => setActiveTab('challenges')}
        >
          <Text style={[styles.tabText, activeTab === 'challenges' && styles.tabTextActive]}>
            Herausforderungen
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'activity' && styles.tabActive]}
          onPress={() => setActiveTab('activity')}
        >
          <Text style={[styles.tabText, activeTab === 'activity' && styles.tabTextActive]}>
            Aktivität
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>LETZTE AKTIVITÄT</Text>
          {mockNotifications.map((notif) => (
            <TouchableOpacity key={notif.id} style={[
              styles.notifItem,
              !notif.read && styles.notifItemUnread,
            ]} activeOpacity={0.85}>
              <View style={[
                styles.notifIconContainer,
                { borderColor: notifColors[notif.type] },
                notif.type === 'elo_change' && styles.notifIconDark,
              ]}>
                <Text style={styles.notifIcon}>{notifIcons[notif.type]}</Text>
              </View>
              <View style={styles.notifContent}>
                <Text style={styles.notifTitle}>{notif.title}</Text>
                <Text style={styles.notifMessage}>{notif.message}</Text>
              </View>
              <Text style={styles.notifTime}>{notif.time}</Text>
              {!notif.read && <View style={styles.unreadDot} />}
            </TouchableOpacity>
          ))}
        </View>

        {/* Performance Summary */}
        <View style={styles.performanceSection}>
          <Text style={styles.performanceLabel}>LEISTUNGSÜBERSICHT</Text>
          <Text style={styles.performanceSubLabel}>DIESE WOCHE</Text>
          <View style={styles.performanceEloRow}>
            <Text style={styles.performanceElo}>+142 ELO</Text>
            <View style={styles.performanceBars}>
              {weekData.map((val, index) => (
                <View key={index} style={styles.barContainer}>
                  <View style={[
                    styles.bar,
                    { height: (val / 100) * 40 },
                    index === weekData.length - 1 && styles.barActive,
                  ]} />
                  <Text style={styles.barLabel}>{dayLabels[index]}</Text>
                </View>
              ))}
            </View>
          </View>
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
  notifBellContainer: {
    position: 'relative',
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifBell: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifBellIcon: {
    fontSize: 18,
  },
  notifDot: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00FF87',
    borderWidth: 1.5,
    borderColor: '#0D0D0D',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 0,
    marginBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 4,
    marginRight: 24,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#00FF87',
  },
  tabText: {
    color: '#555555',
    fontSize: 15,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionLabel: {
    color: '#555555',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  notifItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
    gap: 12,
  },
  notifItemUnread: {},
  notifIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#00FF87',
  },
  notifIconDark: {
    borderColor: '#2A2A2A',
  },
  notifIcon: {
    fontSize: 18,
  },
  notifContent: {
    flex: 1,
  },
  notifTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 3,
  },
  notifMessage: {
    color: '#888888',
    fontSize: 12,
    lineHeight: 16,
  },
  notifTime: {
    color: '#555555',
    fontSize: 11,
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00FF87',
    position: 'absolute',
    left: -4,
    top: '50%',
    marginTop: -4,
  },
  performanceSection: {
    marginHorizontal: 20,
    marginTop: 24,
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
  },
  performanceLabel: {
    color: '#555555',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  performanceSubLabel: {
    color: '#888888',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 12,
  },
  performanceEloRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  performanceElo: {
    color: '#00FF87',
    fontSize: 28,
    fontWeight: '900',
  },
  performanceBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
    height: 60,
  },
  barContainer: {
    alignItems: 'center',
    gap: 4,
    height: 60,
    justifyContent: 'flex-end',
  },
  bar: {
    width: 12,
    backgroundColor: '#2A2A2A',
    borderRadius: 3,
  },
  barActive: {
    backgroundColor: '#00FF87',
  },
  barLabel: {
    color: '#555555',
    fontSize: 9,
    fontWeight: '600',
  },
});
