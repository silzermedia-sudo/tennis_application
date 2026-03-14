import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [location] = useState('Wien, Österreich');

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
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
            <Text style={styles.appName}>CourtBuddy</Text>
            <Text style={styles.subtitle}>Erstelle dein Konto</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Vollständiger Name */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Vollständiger Name</Text>
              <View style={styles.inputWrapper}>
                <Ionicons
                  name="person-outline"
                  size={18}
                  color={Colors.textMuted}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Max Mustermann"
                  placeholderTextColor={Colors.textMuted}
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                  autoComplete="name"
                  returnKeyType="next"
                />
              </View>
            </View>

            {/* E-Mail-Adresse */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>E-Mail-Adresse</Text>
              <View style={styles.inputWrapper}>
                <Ionicons
                  name="mail-outline"
                  size={18}
                  color={Colors.textMuted}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="max@beispiel.at"
                  placeholderTextColor={Colors.textMuted}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  returnKeyType="next"
                />
              </View>
            </View>

            {/* Passwort */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Passwort</Text>
              <View style={styles.inputWrapper}>
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color={Colors.textMuted}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, styles.inputPassword]}
                  placeholder="Mindestens 8 Zeichen"
                  placeholderTextColor={Colors.textMuted}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!passwordVisible}
                  autoCapitalize="none"
                  autoComplete="password-new"
                  returnKeyType="next"
                />
                <Pressable
                  style={styles.eyeButton}
                  onPress={() => setPasswordVisible((v) => !v)}
                >
                  <Ionicons
                    name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
                    size={18}
                    color={Colors.textMuted}
                  />
                </Pressable>
              </View>
            </View>

            {/* Standort */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Standort</Text>
              <Pressable style={styles.locationPicker}>
                <Ionicons
                  name="location-outline"
                  size={18}
                  color={Colors.textMuted}
                  style={styles.inputIcon}
                />
                <Text style={styles.locationText}>{location}</Text>
                <Ionicons
                  name="chevron-down"
                  size={16}
                  color={Colors.textMuted}
                />
              </Pressable>
            </View>
          </View>

          {/* Terms note */}
          <Text style={styles.termsText}>
            Mit der Registrierung stimmst du unseren{' '}
            <Text style={styles.termsLink}>Nutzungsbedingungen</Text>
            {' '}und der{' '}
            <Text style={styles.termsLink}>Datenschutzerklärung</Text>
            {' '}zu.
          </Text>

          {/* Submit button */}
          <Pressable
            style={({ pressed }) => [
              styles.submitButton,
              pressed && styles.submitButtonPressed,
            ]}
            onPress={() => router.push('/(auth)/skill')}
          >
            <Text style={styles.submitButtonText}>Weiter</Text>
            <Ionicons name="arrow-forward" size={18} color="#0D0D0D" />
          </Pressable>

          {/* Login link */}
          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Bereits ein Konto? </Text>
            <Pressable onPress={() => router.back()}>
              <Text style={styles.loginLink}>Anmelden</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  keyboardAvoid: {
    flex: 1,
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
  appName: {
    fontSize: 32,
    fontWeight: '900',
    color: Colors.textPrimary,
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  form: {
    gap: 20,
    marginBottom: 24,
  },
  fieldGroup: {
    gap: 8,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    height: 54,
    paddingHorizontal: 16,
    gap: 10,
  },
  inputIcon: {
    width: 20,
  },
  input: {
    flex: 1,
    color: Colors.textPrimary,
    fontSize: 15,
    fontWeight: '400',
  },
  inputPassword: {
    flex: 1,
  },
  eyeButton: {
    padding: 4,
  },
  locationPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    height: 54,
    paddingHorizontal: 16,
    gap: 10,
  },
  locationText: {
    flex: 1,
    color: Colors.textPrimary,
    fontSize: 15,
  },
  termsText: {
    fontSize: 13,
    color: Colors.textMuted,
    lineHeight: 20,
    marginBottom: 24,
  },
  termsLink: {
    color: Colors.accent,
    fontWeight: '500',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.accent,
    borderRadius: 16,
    height: 58,
    gap: 8,
    marginBottom: 20,
  },
  submitButtonPressed: {
    backgroundColor: Colors.accentDim,
    transform: [{ scale: 0.98 }],
  },
  submitButtonText: {
    color: '#0D0D0D',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
  loginLink: {
    color: Colors.accent,
    fontSize: 14,
    fontWeight: '600',
  },
});
