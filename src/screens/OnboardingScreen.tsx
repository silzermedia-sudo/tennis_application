import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Onboarding'>;
};

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* Dark background with gradient */}
      <LinearGradient
        colors={['#0D0D0D', '#0A1A12', '#0D0D0D']}
        style={StyleSheet.absoluteFill}
      />

      {/* Decorative tennis court lines */}
      <View style={styles.courtLines}>
        <View style={styles.courtOuter} />
        <View style={styles.courtInner} />
        <View style={styles.courtMidLine} />
      </View>

      {/* Green glow effect */}
      <View style={styles.glowEffect} />

      {/* Top skip button */}
      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => navigation.navigate('MainTabs')}
      >
        <Text style={styles.skipText}>Überspringen</Text>
      </TouchableOpacity>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <View style={styles.logoBadge}>
          <Text style={styles.logoIcon}>🎾</Text>
        </View>
        <Text style={styles.logoText}>CourtBuddy</Text>
      </View>

      {/* Hero content */}
      <View style={styles.heroContent}>
        <Text style={styles.heroTitle}>
          Beherrsche{'\n'}
          <Text style={styles.heroTitleAccent}>Deinen Platz.</Text>
        </Text>
        <Text style={styles.heroSubtitle}>
          Finde Spieler. Fordere sie heraus.{'\n'}Besitze den Platz.
        </Text>
      </View>

      {/* Feature icons */}
      <View style={styles.featuresRow}>
        <View style={styles.featureItem}>
          <Text style={styles.featureIcon}>🎾</Text>
          <Text style={styles.featureLabel}>MATCH</Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={styles.featureIcon}>🏆</Text>
          <Text style={styles.featureLabel}>RANG</Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={styles.featureIcon}>⚡</Text>
          <Text style={styles.featureLabel}>PULSE</Text>
        </View>
      </View>

      {/* CTA Button */}
      <View style={styles.ctaContainer}>
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => navigation.navigate('SkillSelection')}
          activeOpacity={0.85}
        >
          <Text style={styles.ctaText}>Jetzt starten →</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('MainTabs')}>
          <Text style={styles.signInText}>
            Bereits ein Profi?{' '}
            <Text style={styles.signInLink}>Anmelden</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  courtLines: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.06,
  },
  courtOuter: {
    width: width * 0.85,
    height: height * 0.55,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    position: 'absolute',
    top: height * 0.2,
  },
  courtInner: {
    width: width * 0.85,
    height: height * 0.28,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    position: 'absolute',
    top: height * 0.2,
  },
  courtMidLine: {
    width: width * 0.85,
    height: 2,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    top: height * 0.475,
  },
  glowEffect: {
    position: 'absolute',
    bottom: -100,
    left: width / 2 - 200,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: '#00FF87',
    opacity: 0.04,
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: 24,
    zIndex: 10,
  },
  skipText: {
    color: '#888888',
    fontSize: 14,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 70,
    paddingLeft: 24,
    gap: 10,
  },
  logoBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#00FF87',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: {
    fontSize: 22,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  heroContent: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    marginTop: -40,
  },
  heroTitle: {
    fontSize: 52,
    fontWeight: '900',
    color: '#FFFFFF',
    lineHeight: 58,
    letterSpacing: -1,
  },
  heroTitleAccent: {
    color: '#00FF87',
  },
  heroSubtitle: {
    color: '#888888',
    fontSize: 16,
    marginTop: 16,
    lineHeight: 24,
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
    paddingBottom: 40,
  },
  featureItem: {
    alignItems: 'center',
    gap: 6,
  },
  featureIcon: {
    fontSize: 28,
  },
  featureLabel: {
    color: '#555555',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  ctaContainer: {
    paddingHorizontal: 24,
    paddingBottom: 50,
    gap: 16,
    alignItems: 'center',
  },
  ctaButton: {
    width: '100%',
    backgroundColor: '#00FF87',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
  },
  ctaText: {
    color: '#0D0D0D',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  signInText: {
    color: '#555555',
    fontSize: 14,
  },
  signInLink: {
    color: '#00FF87',
    fontWeight: '600',
  },
});
