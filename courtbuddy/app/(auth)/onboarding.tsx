import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';

const { width, height } = Dimensions.get('window');

type FeatureItem = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
};

const features: FeatureItem[] = [
  { icon: 'tennisball-outline', label: 'Match' },
  { icon: 'trophy-outline', label: 'Rang' },
  { icon: 'pulse-outline', label: 'Puls' },
];

export default function Onboarding() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#0A1A0F', '#0D1A10', '#0D0D0D']}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.container}>
        {/* Court grid decorative lines */}
        <View style={styles.courtDecoration} pointerEvents="none">
          <View style={styles.courtLine} />
          <View style={styles.courtLineHorizontal} />
          <View style={styles.courtCircle} />
        </View>

        {/* Top badge */}
        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Ionicons name="tennisball" size={12} color={Colors.accent} />
            <Text style={styles.badgeText}>CourtBuddy</Text>
          </View>
        </View>

        {/* Main headline */}
        <View style={styles.headlineContainer}>
          <Text style={styles.headline}>Dominiere{'\n'}Deinen{' '}
            <Text style={styles.headlineAccent}>Court.</Text>
          </Text>
          <Text style={styles.subtext}>
            Spieler finden. Herausfordern. Den Platz besitzen.
          </Text>
        </View>

        {/* Feature icons row */}
        <View style={styles.featuresRow}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <View style={styles.featureIconWrapper}>
                <Ionicons name={feature.icon} size={24} color={Colors.accent} />
              </View>
              <Text style={styles.featureLabel}>{feature.label}</Text>
            </View>
          ))}
        </View>

        {/* Bottom CTA */}
        <View style={styles.bottomSection}>
          <Pressable
            style={({ pressed }) => [
              styles.ctaButton,
              pressed && styles.ctaButtonPressed,
            ]}
            onPress={() => router.push('/(auth)/register')}
          >
            <Text style={styles.ctaButtonText}>Loslegen →</Text>
          </Pressable>

          <Pressable
            style={styles.loginLink}
            onPress={() => router.push('/(auth)/register')}
          >
            <Text style={styles.loginLinkText}>
              Bereits ein Profi?{' '}
              <Text style={styles.loginLinkAccent}>Anmelden</Text>
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 16,
    paddingBottom: 24,
  },
  courtDecoration: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  courtLine: {
    position: 'absolute',
    top: height * 0.15,
    left: width * 0.1,
    right: width * 0.1,
    height: height * 0.5,
    borderWidth: 1,
    borderColor: 'rgba(0,255,135,0.06)',
    borderRadius: 2,
  },
  courtLineHorizontal: {
    position: 'absolute',
    top: height * 0.4,
    left: width * 0.1,
    right: width * 0.1,
    height: 1,
    backgroundColor: 'rgba(0,255,135,0.06)',
  },
  courtCircle: {
    position: 'absolute',
    top: height * 0.3,
    left: width * 0.5 - 60,
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: 'rgba(0,255,135,0.06)',
  },
  badgeRow: {
    alignItems: 'flex-start',
    marginBottom: 48,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0,255,135,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0,255,135,0.2)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeText: {
    color: Colors.accent,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  headlineContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 40,
  },
  headline: {
    fontSize: 48,
    fontWeight: '900',
    color: Colors.textPrimary,
    lineHeight: 56,
    letterSpacing: -1,
    marginBottom: 20,
  },
  headlineAccent: {
    color: Colors.accent,
  },
  subtext: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 24,
    letterSpacing: 0.2,
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 48,
  },
  featureItem: {
    alignItems: 'center',
    gap: 10,
  },
  featureIconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: 'rgba(0,255,135,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(0,255,135,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureLabel: {
    color: Colors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
  },
  bottomSection: {
    gap: 16,
  },
  ctaButton: {
    backgroundColor: Colors.accent,
    borderRadius: 16,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaButtonPressed: {
    backgroundColor: Colors.accentDim,
    transform: [{ scale: 0.98 }],
  },
  ctaButtonText: {
    color: '#0D0D0D',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  loginLink: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  loginLinkText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
  loginLinkAccent: {
    color: Colors.accent,
    fontWeight: '600',
  },
});
