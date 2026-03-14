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
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { mockPlayers, mockCourts } from '../data/mockData';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Challenge'>;
  route: RouteProp<RootStackParamList, 'Challenge'>;
};

const days = ['MO', 'DI', 'MI', 'DO', 'FR'];
const dates = [12, 13, 14, 15, 16];
const times = ['08:00', '11:30', '14:00', '16:30', '18:00', '20:00'];

export default function ChallengeScreen({ navigation, route }: Props) {
  const opponent = mockPlayers[0]; // Sam Smash as default
  const court = mockCourts[0];
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedTime, setSelectedTime] = useState('11:30');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Herausforderung senden</Text>
          <TouchableOpacity style={styles.moreBtn}>
            <Text style={styles.moreIcon}>⋮</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Opponent Card */}
        <View style={styles.opponentCard}>
          <Image
            source={{ uri: opponent.avatar }}
            style={styles.opponentAvatar}
          />
          <View style={styles.opponentInfo}>
            <Text style={styles.opponentName}>{opponent.name}</Text>
            <View style={styles.opponentBadge}>
              <Text style={styles.opponentBadgeText}>PRO</Text>
            </View>
          </View>
          <View style={styles.opponentStats}>
            <View style={styles.opponentStatItem}>
              <Text style={styles.opponentStatValue}>{opponent.elo}</Text>
              <Text style={styles.opponentStatLabel}>ELO-WERTUNG</Text>
            </View>
          </View>
        </View>

        {/* Win Rate & Record */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>GEWINNRATE</Text>
            <Text style={styles.statValue}>{opponent.winRate}%</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>MATCH-REKORD</Text>
            <Text style={styles.statValue}>
              S: {opponent.wins} / N: {opponent.losses}
            </Text>
          </View>
        </View>

        {/* Select Court */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>PLATZ AUSWÄHLEN</Text>
            <TouchableOpacity>
              <Text style={styles.sectionLink}>ALLE ANZEIGEN</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.courtCard} activeOpacity={0.85}>
            <View style={styles.courtImagePlaceholder}>
              <Text style={styles.courtImageIcon}>🎾</Text>
            </View>
            <View style={styles.courtInfo}>
              <Text style={styles.courtName}>{court.name}</Text>
              <Text style={styles.courtDistance}>📍 {court.distance} entfernt</Text>
            </View>
            <TouchableOpacity style={styles.expandBtn}>
              <Text style={styles.expandIcon}>▾</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        {/* Proposed Time */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>VORGESCHLAGENE ZEIT</Text>

          {/* Day selector */}
          <View style={styles.daysRow}>
            {days.map((day, index) => (
              <TouchableOpacity
                key={day}
                style={[
                  styles.dayButton,
                  selectedDay === index && styles.dayButtonSelected,
                ]}
                onPress={() => setSelectedDay(index)}
              >
                <Text style={[styles.dayLabel, selectedDay === index && styles.dayLabelSelected]}>
                  {day}
                </Text>
                <Text style={[styles.dayDate, selectedDay === index && styles.dayDateSelected]}>
                  {dates[index]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Time slider indicator */}
          <View style={styles.timeSliderContainer}>
            <View style={styles.timeSliderTrack}>
              <View style={styles.timeSliderFill} />
            </View>
          </View>

          {/* Time slots */}
          <View style={styles.timesRow}>
            {times.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeButton,
                  selectedTime === time && styles.timeButtonSelected,
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <Text style={[styles.timeText, selectedTime === time && styles.timeTextSelected]}>
                  {time} Uhr
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Send Challenge Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => {
            navigation.goBack();
          }}
          activeOpacity={0.85}
        >
          <Text style={styles.sendButtonIcon}>👤</Text>
          <Text style={styles.sendButtonText}>Herausforderung senden</Text>
        </TouchableOpacity>
        <Text style={styles.footerNote}>
          {opponent.name.toUpperCase()} HAT 24 STUNDEN ZUM ANTWORTEN
        </Text>
      </View>
    </View>
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
    paddingVertical: 16,
  },
  backIcon: {
    color: '#FFFFFF',
    fontSize: 22,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  moreBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreIcon: {
    color: '#555555',
    fontSize: 22,
  },
  opponentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#1A1A1A',
    marginHorizontal: 20,
    borderRadius: 16,
    gap: 14,
  },
  opponentAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#00FF87',
  },
  opponentInfo: {
    flex: 1,
    gap: 6,
  },
  opponentName: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  opponentBadge: {
    backgroundColor: '#00FF87',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  opponentBadgeText: {
    color: '#0D0D0D',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },
  opponentStats: {},
  opponentStatItem: {
    alignItems: 'center',
  },
  opponentStatValue: {
    color: '#00FF87',
    fontSize: 22,
    fontWeight: '900',
  },
  opponentStatLabel: {
    color: '#555555',
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    marginTop: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    gap: 4,
  },
  statLabel: {
    color: '#555555',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#555555',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  sectionLink: {
    color: '#00FF87',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  courtCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 14,
    overflow: 'hidden',
    gap: 12,
  },
  courtImagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#0A1A0A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  courtImageIcon: {
    fontSize: 32,
  },
  courtInfo: {
    flex: 1,
    paddingVertical: 12,
  },
  courtName: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  courtDistance: {
    color: '#888888',
    fontSize: 12,
  },
  expandBtn: {
    width: 32,
    height: 32,
    marginRight: 12,
    borderRadius: 16,
    backgroundColor: '#2A2A2A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandIcon: {
    color: '#888888',
    fontSize: 16,
  },
  daysRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  dayButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  dayButtonSelected: {
    backgroundColor: '#00FF87',
    borderColor: '#00FF87',
  },
  dayLabel: {
    color: '#555555',
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 4,
  },
  dayLabelSelected: {
    color: '#0D0D0D',
  },
  dayDate: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  dayDateSelected: {
    color: '#0D0D0D',
  },
  timeSliderContainer: {
    marginBottom: 16,
  },
  timeSliderTrack: {
    height: 3,
    backgroundColor: '#2A2A2A',
    borderRadius: 2,
  },
  timeSliderFill: {
    width: '45%',
    height: 3,
    backgroundColor: '#00FF87',
    borderRadius: 2,
  },
  timesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  timeButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  timeButtonSelected: {
    backgroundColor: '#00FF87',
    borderColor: '#00FF87',
  },
  timeText: {
    color: '#888888',
    fontSize: 13,
    fontWeight: '600',
  },
  timeTextSelected: {
    color: '#0D0D0D',
    fontWeight: '800',
  },
  footer: {
    padding: 20,
    paddingBottom: 34,
    alignItems: 'center',
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: '#1A1A1A',
    backgroundColor: '#0D0D0D',
  },
  sendButton: {
    width: '100%',
    backgroundColor: '#00FF87',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  sendButtonIcon: {
    fontSize: 16,
  },
  sendButtonText: {
    color: '#0D0D0D',
    fontSize: 15,
    fontWeight: '800',
  },
  footerNote: {
    color: '#555555',
    fontSize: 11,
    letterSpacing: 0.5,
  },
});
