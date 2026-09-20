import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  const systems = [
    { name: 'Decimal', base: 'Base 10', digits: '0–9' },
    { name: 'Binary', base: 'Base 2', digits: '0–1' },
    { name: 'Octal', base: 'Base 8', digits: '0–7' },
    { name: 'Hexadecimal', base: 'Base 16', digits: '0–9, A–F' },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>01</Text>
        </View>

        <View style={styles.headerTextContainer}>
          <Text style={styles.appName}>No. Systems</Text>
          <Text style={styles.tagline}>Understand number systems</Text>
        </View>
      </View>

      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeSmall}>WELCOME</Text>

        <Text style={styles.welcomeTitle}>
          Convert numbers.{'\n'}
          Understand systems.
        </Text>

        <Text style={styles.welcomeDescription}>
          Easily convert values between Decimal, Binary, Octal,
          and Hexadecimal number systems.
        </Text>
      </View>

      <View style={styles.mainCard}>
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>⇄</Text>
        </View>

        <Text style={styles.cardTitle}>Number Converter</Text>

        <Text style={styles.cardDescription}>
          Convert numbers between different number systems quickly
          and accurately.
        </Text>

        <Pressable
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => router.push('/explore')}
        >
          <Text style={styles.primaryButtonText}>Start Converting</Text>
          <Text style={styles.arrow}>→</Text>
        </Pressable>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.learnCard,
          pressed && styles.cardPressed,
        ]}
        onPress={() => router.push('/learn')}
      >
        <View style={styles.learnIcon}>
          <Text style={styles.learnIconText}>?</Text>
        </View>

        <View style={styles.learnTextContainer}>
          <Text style={styles.learnTitle}>Learn the Basics</Text>

          <Text style={styles.learnDescription}>
            Understand how number systems work and how conversions
            are performed.
          </Text>
        </View>

        <Text style={styles.learnArrow}>›</Text>
      </Pressable>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Supported Systems</Text>

        <Text style={styles.sectionSubtitle}>
          Four common number systems
        </Text>

        <View style={styles.systemGrid}>
          {systems.map((system) => (
            <View style={styles.systemCard} key={system.name}>
              <Text style={styles.systemName}>{system.name}</Text>

              <Text style={styles.systemBase}>{system.base}</Text>

              <View style={styles.digitsContainer}>
                <Text style={styles.digitsText}>{system.digits}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.howItWorksCard}>
        <Text style={styles.howTitle}>How It Works</Text>

        <Text style={styles.howSubtitle}>
          Convert a number in three simple steps
        </Text>

        <View style={styles.step}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>1</Text>
          </View>

          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Enter a number</Text>

            <Text style={styles.stepDescription}>
              Enter the value you want to convert.
            </Text>
          </View>
        </View>

        <View style={styles.step}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>2</Text>
          </View>

          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Choose systems</Text>

            <Text style={styles.stepDescription}>
              Select the original and target number systems.
            </Text>
          </View>
        </View>

        <View style={styles.step}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>3</Text>
          </View>

          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Get your result</Text>

            <Text style={styles.stepDescription}>
              See the converted value and the calculation steps.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerTitle}>No. Systems</Text>

        <Text style={styles.footerText}>
          A simple number-system learning and conversion tool.
        </Text>

        <Text style={styles.footerCopyright}>
          Built for learning • 2026
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1020',
  },

  contentContainer: {
    paddingHorizontal: 18,
    paddingTop: 55,
    paddingBottom: 35,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },

  logo: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#7C5CFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  logoText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },

  headerTextContainer: {
    flex: 1,
  },

  appName: {
    color: '#F8FAFC',
    fontSize: 23,
    fontWeight: '800',
  },

  tagline: {
    color: '#A7B0C0',
    fontSize: 13,
    marginTop: 2,
  },

  welcomeSection: {
    marginBottom: 24,
  },

  welcomeSmall: {
    color: '#22D3EE',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 8,
  },

  welcomeTitle: {
    color: '#F8FAFC',
    fontSize: 31,
    lineHeight: 37,
    fontWeight: '800',
    marginBottom: 12,
  },

  welcomeDescription: {
    color: '#A7B0C0',
    fontSize: 15,
    lineHeight: 23,
  },

  mainCard: {
    backgroundColor: '#151C32',
    borderRadius: 24,
    padding: 22,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#252E49',
  },

  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: '#211A45',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },

  iconText: {
    color: '#22D3EE',
    fontSize: 26,
    fontWeight: '700',
  },

  cardTitle: {
    color: '#F8FAFC',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 8,
  },

  cardDescription: {
    color: '#A7B0C0',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 20,
  },

  primaryButton: {
    backgroundColor: '#7C5CFC',
    minHeight: 54,
    borderRadius: 16,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  arrow: {
    color: '#FFFFFF',
    fontSize: 23,
    marginLeft: 10,
  },

  learnCard: {
    backgroundColor: '#151C32',
    borderRadius: 22,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#252E49',
  },

  cardPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.99 }],
  },

  learnIcon: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: '#211A45',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  learnIconText: {
    color: '#22D3EE',
    fontSize: 22,
    fontWeight: '800',
  },

  learnTextContainer: {
    flex: 1,
  },

  learnTitle: {
    color: '#F8FAFC',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 4,
  },

  learnDescription: {
    color: '#A7B0C0',
    fontSize: 13,
    lineHeight: 19,
  },

  learnArrow: {
    color: '#7C5CFC',
    fontSize: 30,
    marginLeft: 8,
  },

  section: {
    marginBottom: 30,
  },

  sectionTitle: {
    color: '#F8FAFC',
    fontSize: 21,
    fontWeight: '800',
  },

  sectionSubtitle: {
    color: '#A7B0C0',
    fontSize: 13,
    marginTop: 4,
    marginBottom: 15,
  },

  systemGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  systemCard: {
    width: '48%',
    backgroundColor: '#151C32',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#252E49',
  },

  systemName: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 5,
  },

  systemBase: {
    color: '#A7B0C0',
    fontSize: 12,
    marginBottom: 12,
  },

  digitsContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#0F172A',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },

  digitsText: {
    color: '#22D3EE',
    fontSize: 11,
    fontWeight: '600',
  },

  howItWorksCard: {
    backgroundColor: '#151C32',
    borderRadius: 22,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#252E49',
  },

  howTitle: {
    color: '#F8FAFC',
    fontSize: 21,
    fontWeight: '800',
  },

  howSubtitle: {
    color: '#A7B0C0',
    fontSize: 13,
    marginTop: 4,
    marginBottom: 22,
  },

  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },

  stepNumber: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: '#211A45',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  stepNumberText: {
    color: '#22D3EE',
    fontSize: 14,
    fontWeight: '800',
  },

  stepContent: {
    flex: 1,
  },

  stepTitle: {
    color: '#F8FAFC',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 3,
  },

  stepDescription: {
    color: '#A7B0C0',
    fontSize: 13,
    lineHeight: 19,
  },

  footer: {
    alignItems: 'center',
    paddingTop: 5,
  },

  footerTitle: {
    color: '#7C5CFC',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 5,
  },

  footerText: {
    color: '#A7B0C0',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },

  footerCopyright: {
    color: '#64748B',
    fontSize: 11,
    marginTop: 8,
  },
});