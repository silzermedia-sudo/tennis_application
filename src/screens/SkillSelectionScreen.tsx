import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { SkillLevel } from '../types';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'SkillSelection'>;
};

const skillLevels: { level: SkillLevel; icon: string; description: string }[] = [
  {
    level: 'Anfänger',
    icon: '😊',
    description: 'Gerade damit begonnen, den gelben Ball zu treffen.',
  },
  {
    level: 'Fortgeschrittener',
    icon: '🎾',
    description: 'Gleichmäßige Ballwechsel und taktische Aufschläge.',
  },
  {
    level: 'Geübt',
    icon: '⚡',
    description: 'Kraftvolle Schläge und Spielbeherrschung.',
  },
  {
    level: 'Profi',
    icon: '🏆',
    description: 'Turniererfahren und Spitzenniveau.',
  },
];

export default function SkillSelectionScreen({ navigation }: Props) {
  const [selected, setSelected] = useState<SkillLevel>('Fortgeschrittener');
  const [step, setStep] = useState(1);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={styles.logoRow}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoIcon}>🎾</Text>
          </View>
          <Text style={styles.logoText}>CourtBuddy</Text>
        </View>
        <Text style={styles.stepIndicator}>{step}/3</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Title */}
        <View style={styles.titleSection}>
          <Text style={styles.sectionLabel}>EINRICHTUNG</Text>
          <Text style={styles.title}>
            Was ist dein{'\n'}
            <Text style={styles.titleAccent}>Spielniveau?</Text>
          </Text>
          <Text style={styles.subtitle}>
            Wir bringen dich mit Spielern zusammen, die deine Energie teilen.
          </Text>
        </View>

        {/* Skill level grid */}
        <View style={styles.skillGrid}>
          {skillLevels.map((item) => (
            <TouchableOpacity
              key={item.level}
              style={[
                styles.skillCard,
                selected === item.level && styles.skillCardSelected,
              ]}
              onPress={() => setSelected(item.level)}
              activeOpacity={0.8}
            >
              {selected === item.level && (
                <View style={styles.checkmark}>
                  <Text style={styles.checkmarkText}>✓</Text>
                </View>
              )}
              <Text style={styles.skillIcon}>{item.icon}</Text>
              <Text style={[
                styles.skillName,
                selected === item.level && styles.skillNameSelected,
              ]}>
                {item.level}
              </Text>
              <Text style={styles.skillDescription}>{item.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Info note */}
        <View style={styles.infoNote}>
          <Text style={styles.infoIcon}>ℹ</Text>
          <Text style={styles.infoText}>
            Du kannst dein Spielniveau jederzeit in deinen Profileinstellungen ändern. Deine ersten Matches werden entsprechend angepasst.
          </Text>
        </View>
      </ScrollView>

      {/* Continue button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate('MainTabs')}
          activeOpacity={0.85}
        >
          <Text style={styles.continueText}>Weiter</Text>
        </TouchableOpacity>
      </View>
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
    paddingVertical: 16,
  },
  backArrow: {
    color: '#FFFFFF',
    fontSize: 22,
    width: 32,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#00FF87',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: {
    fontSize: 16,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  stepIndicator: {
    color: '#555555',
    fontSize: 14,
    width: 32,
    textAlign: 'right',
  },
  scrollView: {
    flex: 1,
  },
  titleSection: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 24,
  },
  sectionLabel: {
    color: '#00FF87',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFFFFF',
    lineHeight: 42,
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  titleAccent: {
    color: '#00FF87',
  },
  subtitle: {
    color: '#888888',
    fontSize: 15,
    lineHeight: 22,
  },
  skillGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
  },
  skillCard: {
    width: '47%',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: '#2A2A2A',
    minHeight: 120,
  },
  skillCardSelected: {
    borderColor: '#00FF87',
    backgroundColor: '#0D2018',
  },
  checkmark: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#00FF87',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: '#0D0D0D',
    fontSize: 13,
    fontWeight: '800',
  },
  skillIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  skillName: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  skillNameSelected: {
    color: '#00FF87',
  },
  skillDescription: {
    color: '#666666',
    fontSize: 11,
    lineHeight: 15,
  },
  infoNote: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#141414',
    borderRadius: 12,
    padding: 14,
    gap: 10,
    alignItems: 'flex-start',
  },
  infoIcon: {
    color: '#00FF87',
    fontSize: 14,
    marginTop: 1,
  },
  infoText: {
    flex: 1,
    color: '#666666',
    fontSize: 12,
    lineHeight: 18,
  },
  footer: {
    padding: 24,
    paddingBottom: 34,
  },
  continueButton: {
    backgroundColor: '#00FF87',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
  },
  continueText: {
    color: '#0D0D0D',
    fontSize: 17,
    fontWeight: '800',
  },
});
