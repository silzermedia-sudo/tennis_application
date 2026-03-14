import { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import type { SkillLevel } from '../../types';

type SkillCard = {
  key: SkillLevel;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const SKILL_CARDS: SkillCard[] = [
  {
    key: 'anfaenger',
    title: 'Anfänger',
    subtitle: 'Lerne die gelbe Filzkugel kennen',
    icon: 'person-outline',
  },
  {
    key: 'fortgeschritten',
    title: 'Fortgeschritten',
    subtitle: 'Konstante Ballwechsel und taktisches Spiel',
    icon: 'tennisball-outline',
  },
  {
    key: 'experte',
    title: 'Experte',
    subtitle: 'Starke Schläge und Matchbeherrschung',
    icon: 'flash-outline',
  },
  {
    key: 'profi',
    title: 'Profi',
    subtitle: 'Turnierreif und Spitzenperformance',
    icon: 'trophy-outline',
  },
];

export default function Skill() {
  const router = useRouter();
  const [selected, setSelected] = useState<SkillLevel>('fortgeschritten');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with back button */}
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color={Colors.textPrimary} />
          </Pressable>
        </View>

        {/* Title section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Was ist dein{'\n'}Spielniveau?</Text>
          <Text style={styles.subtitle}>
            Wir matchen dich mit Spielern die deine Energie teilen.
          </Text>
        </View>

        {/* Skill cards grid (2x2) */}
        <View style={styles.grid}>
          {SKILL_CARDS.map((card) => {
            const isSelected = selected === card.key;
            return (
              <Pressable
                key={card.key}
                style={[
                  styles.card,
                  isSelected && styles.cardSelected,
                ]}
                onPress={() => setSelected(card.key)}
              >
                {/* Checkmark badge */}
                {isSelected && (
                  <View style={styles.checkBadge}>
                    <Ionicons name="checkmark" size={12} color={Colors.bg} />
                  </View>
                )}

                {/* Icon */}
                <View
                  style={[
                    styles.iconWrapper,
                    isSelected && styles.iconWrapperSelected,
                  ]}
                >
                  <Ionicons
                    name={card.icon}
                    size={26}
                    color={isSelected ? Colors.accent : Colors.textSecondary}
                  />
                </View>

                {/* Text */}
                <Text
                  style={[
                    styles.cardTitle,
                    isSelected && styles.cardTitleSelected,
                  ]}
                >
                  {card.title}
                </Text>
                <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
              </Pressable>
            );
          })}
        </View>

        {/* Info text */}
        <Text style={styles.infoText}>
          Du kannst dein Spielniveau jederzeit in deinen Profileinstellungen ändern.
        </Text>

        {/* Continue button */}
        <Pressable
          style={({ pressed }) => [
            styles.continueButton,
            pressed && styles.continueButtonPressed,
          ]}
          onPress={() => router.replace('/(tabs)')}
        >
          <Text style={styles.continueButtonText}>Weiter</Text>
          <Ionicons name="arrow-forward" size={18} color={Colors.bg} />
        </Pressable>
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
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleSection: {
    marginTop: 24,
    marginBottom: 36,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: Colors.textPrimary,
    lineHeight: 44,
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  card: {
    width: '47.5%',
    backgroundColor: Colors.surface,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: Colors.border,
    padding: 18,
    minHeight: 160,
    position: 'relative',
  },
  cardSelected: {
    borderColor: Colors.accent,
    backgroundColor: Colors.accentBg,
  },
  checkBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: Colors.surface2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  iconWrapperSelected: {
    backgroundColor: 'rgba(0,255,135,0.15)',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 6,
    letterSpacing: 0.1,
  },
  cardTitleSelected: {
    color: Colors.accent,
  },
  cardSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
  infoText: {
    fontSize: 13,
    color: Colors.textMuted,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 28,
    paddingHorizontal: 8,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.accent,
    borderRadius: 16,
    height: 58,
    gap: 8,
  },
  continueButtonPressed: {
    backgroundColor: Colors.accentDim,
    transform: [{ scale: 0.98 }],
  },
  continueButtonText: {
    color: Colors.bg,
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
});
