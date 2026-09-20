import { useRouter } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function LearnScreen() {
  const router = useRouter();

  const systems = [
    {
      name: 'Decimal',
      base: 'Base 10',
      digits: '0–9',
      description:
        'The decimal system is the number system we use in everyday life.',
    },
    {
      name: 'Binary',
      base: 'Base 2',
      digits: '0–1',
      description:
        'Binary uses only 0 and 1 and is the fundamental system used by computers.',
    },
    {
      name: 'Octal',
      base: 'Base 8',
      digits: '0–7',
      description:
        'Octal uses eight digits and was historically useful for representing binary values.',
    },
    {
      name: 'Hexadecimal',
      base: 'Base 16',
      digits: '0–9, A–F',
      description:
        'Hexadecimal uses sixteen symbols and provides a compact way to represent binary values.',
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backArrow}>‹</Text>
        </Pressable>

        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Learn the Basics</Text>

          <Text style={styles.headerSubtitle}>
            Understand number systems
          </Text>
        </View>

        <View style={styles.questionButton}>
          <Text style={styles.questionText}>?</Text>
        </View>
      </View>

      <View style={styles.introCard}>
        <View style={styles.introIcon}>
          <Text style={styles.introIconText}>01</Text>
        </View>

        <Text style={styles.introTitle}>
          What is a Number System?
        </Text>

        <Text style={styles.introText}>
          A number system is a method of representing numbers using
          a specific set of symbols and rules. Different number
          systems use different bases.
        </Text>

        <View style={styles.baseHighlight}>
          <Text style={styles.baseHighlightText}>
            The base tells us how many different digits are available.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Common Number Systems
        </Text>

        <Text style={styles.sectionSubtitle}>
          The four systems used in No. Systems
        </Text>

        {systems.map((system, index) => (
          <View style={styles.systemCard} key={system.name}>
            <View style={styles.systemTop}>
              <View style={styles.systemNumber}>
                <Text style={styles.systemNumberText}>
                  {index + 1}
                </Text>
              </View>

              <View style={styles.systemHeading}>
                <Text style={styles.systemName}>{system.name}</Text>

                <Text style={styles.systemBase}>{system.base}</Text>
              </View>

              <View style={styles.digitsBadge}>
                <Text style={styles.digitsText}>
                  {system.digits}
                </Text>
              </View>
            </View>

            <Text style={styles.systemDescription}>
              {system.description}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Positional Value</Text>

        <Text style={styles.sectionSubtitle}>
          A digit's position determines its value
        </Text>

        <View style={styles.positionCard}>
          <Text style={styles.positionIntro}>
            Consider the binary number:
          </Text>

          <Text style={styles.binaryNumber}>1010₂</Text>

          <View style={styles.powerRow}>
            <View style={styles.powerColumn}>
              <Text style={styles.powerValue}>2³</Text>
              <Text style={styles.powerDigit}>1</Text>
              <Text style={styles.powerResult}>8</Text>
            </View>

            <View style={styles.powerColumn}>
              <Text style={styles.powerValue}>2²</Text>
              <Text style={styles.powerDigit}>0</Text>
              <Text style={styles.powerResult}>0</Text>
            </View>

            <View style={styles.powerColumn}>
              <Text style={styles.powerValue}>2¹</Text>
              <Text style={styles.powerDigit}>1</Text>
              <Text style={styles.powerResult}>2</Text>
            </View>

            <View style={styles.powerColumn}>
              <Text style={styles.powerValue}>2⁰</Text>
              <Text style={styles.powerDigit}>0</Text>
              <Text style={styles.powerResult}>0</Text>
            </View>
          </View>

          <View style={styles.calculationBox}>
            <Text style={styles.calculationText}>
              (1 × 8) + (0 × 4) + (1 × 2) + (0 × 1)
            </Text>

            <Text style={styles.calculationResult}>
              = 10₁₀
            </Text>
          </View>

          <Text style={styles.positionExplanation}>
            Therefore, binary 1010 is equal to decimal 10.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          How Conversion Works
        </Text>

        <Text style={styles.sectionSubtitle}>
          A simple way to understand the process
        </Text>

        <View style={styles.processCard}>
          <View style={styles.processStep}>
            <View style={styles.processNumber}>
              <Text style={styles.processNumberText}>1</Text>
            </View>

            <View style={styles.processContent}>
              <Text style={styles.processTitle}>
                Identify the source base
              </Text>

              <Text style={styles.processDescription}>
                Determine which number system the original value
                belongs to.
              </Text>
            </View>
          </View>

          <View style={styles.connector} />

          <View style={styles.processStep}>
            <View style={styles.processNumber}>
              <Text style={styles.processNumberText}>2</Text>
            </View>

            <View style={styles.processContent}>
              <Text style={styles.processTitle}>
                Convert to decimal
              </Text>

              <Text style={styles.processDescription}>
                Use positional values to find the decimal equivalent.
              </Text>
            </View>
          </View>

          <View style={styles.connector} />

          <View style={styles.processStep}>
            <View style={styles.processNumber}>
              <Text style={styles.processNumberText}>3</Text>
            </View>

            <View style={styles.processContent}>
              <Text style={styles.processTitle}>
                Convert to the target base
              </Text>

              <Text style={styles.processDescription}>
                Repeated division is used to obtain the target
                number system.
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Common Conversion Methods
        </Text>

        <View style={styles.methodCard}>
          <View style={styles.methodIcon}>
            <Text style={styles.methodIconText}>÷</Text>
          </View>

          <View style={styles.methodContent}>
            <Text style={styles.methodTitle}>
              Repeated Division
            </Text>

            <Text style={styles.methodDescription}>
              Used when converting decimal numbers into another
              number system.
            </Text>
          </View>
        </View>

        <View style={styles.methodCard}>
          <View style={styles.methodIcon}>
            <Text style={styles.methodIconText}>×</Text>
          </View>

          <View style={styles.methodContent}>
            <Text style={styles.methodTitle}>
              Positional Expansion
            </Text>

            <Text style={styles.methodDescription}>
              Used to convert numbers from binary, octal, or
              hexadecimal into decimal.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.tryCard}>
        <View style={styles.tryIcon}>
          <Text style={styles.tryIconText}>⇄</Text>
        </View>

        <Text style={styles.tryTitle}>Ready to try it?</Text>

        <Text style={styles.tryDescription}>
          Put what you've learned into practice with the No.
          Systems converter.
        </Text>

        <Pressable
          style={({ pressed }) => [
            styles.tryButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => router.push('/explore')}
        >
          <Text style={styles.tryButtonText}>Open Converter</Text>

          <Text style={styles.tryButtonArrow}>→</Text>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerTitle}>No. Systems</Text>

        <Text style={styles.footerText}>
          Learn • Convert • Understand
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
    paddingTop: 48,
    paddingBottom: 35,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#151C32',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#252E49',
  },

  backArrow: {
    color: '#F8FAFC',
    fontSize: 32,
    lineHeight: 35,
    marginTop: -3,
  },

  headerTextContainer: {
    flex: 1,
  },

  headerTitle: {
    color: '#F8FAFC',
    fontSize: 23,
    fontWeight: '800',
  },

  headerSubtitle: {
    color: '#A7B0C0',
    fontSize: 13,
    marginTop: 3,
  },

  questionButton: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: '#151C32',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#252E49',
  },

  questionText: {
    color: '#22D3EE',
    fontSize: 19,
    fontWeight: '800',
  },

  introCard: {
    backgroundColor: '#151C32',
    borderRadius: 24,
    padding: 21,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#252E49',
  },

  introIcon: {
    width: 50,
    height: 50,
    borderRadius: 17,
    backgroundColor: '#211A45',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },

  introIconText: {
    color: '#22D3EE',
    fontSize: 15,
    fontWeight: '900',
  },

  introTitle: {
    color: '#F8FAFC',
    fontSize: 21,
    fontWeight: '800',
    marginBottom: 9,
  },

  introText: {
    color: '#A7B0C0',
    fontSize: 14,
    lineHeight: 22,
  },

  baseHighlight: {
    backgroundColor: '#211A45',
    borderRadius: 13,
    padding: 12,
    marginTop: 15,
  },

  baseHighlightText: {
    color: '#22D3EE',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '600',
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
    lineHeight: 19,
    marginTop: 4,
    marginBottom: 15,
  },

  systemCard: {
    backgroundColor: '#151C32',
    borderRadius: 20,
    padding: 17,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#252E49',
  },

  systemTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  systemNumber: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#211A45',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  systemNumberText: {
    color: '#22D3EE',
    fontSize: 14,
    fontWeight: '800',
  },

  systemHeading: {
    flex: 1,
  },

  systemName: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '800',
  },

  systemBase: {
    color: '#A7B0C0',
    fontSize: 12,
    marginTop: 2,
  },

  digitsBadge: {
    backgroundColor: '#0F172A',
    borderRadius: 9,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },

  digitsText: {
    color: '#22D3EE',
    fontSize: 10,
    fontWeight: '700',
  },

  systemDescription: {
    color: '#A7B0C0',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 13,
  },

  positionCard: {
    backgroundColor: '#151C32',
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: '#252E49',
  },

  positionIntro: {
    color: '#A7B0C0',
    fontSize: 13,
    textAlign: 'center',
  },

  binaryNumber: {
    color: '#F8FAFC',
    fontSize: 32,
    fontWeight: '900',
    textAlign: 'center',
    marginVertical: 16,
  },

  powerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#252E49',
    paddingVertical: 15,
  },

  powerColumn: {
    alignItems: 'center',
    flex: 1,
  },

  powerValue: {
    color: '#A7B0C0',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
  },

  powerDigit: {
    color: '#22D3EE',
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 5,
  },

  powerResult: {
    color: '#F8FAFC',
    fontSize: 12,
    fontWeight: '700',
  },

  calculationBox: {
    backgroundColor: '#0F172A',
    borderRadius: 14,
    padding: 13,
    marginTop: 15,
    alignItems: 'center',
  },

  calculationText: {
    color: '#CBD5E1',
    fontSize: 12,
    lineHeight: 19,
    textAlign: 'center',
  },

  calculationResult: {
    color: '#22D3EE',
    fontSize: 15,
    fontWeight: '800',
    marginTop: 4,
  },

  positionExplanation: {
    color: '#A7B0C0',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 13,
  },

  processCard: {
    backgroundColor: '#151C32',
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: '#252E49',
  },

  processStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  processNumber: {
    width: 35,
    height: 35,
    borderRadius: 11,
    backgroundColor: '#211A45',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  processNumberText: {
    color: '#22D3EE',
    fontSize: 13,
    fontWeight: '900',
  },

  processContent: {
    flex: 1,
  },

  processTitle: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 4,
  },

  processDescription: {
    color: '#A7B0C0',
    fontSize: 12,
    lineHeight: 18,
  },

  connector: {
    width: 1,
    height: 18,
    backgroundColor: '#334155',
    marginLeft: 17,
    marginVertical: 5,
  },

  methodCard: {
    backgroundColor: '#151C32',
    borderRadius: 19,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 11,
    borderWidth: 1,
    borderColor: '#252E49',
  },

  methodIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: '#211A45',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },

  methodIconText: {
    color: '#22D3EE',
    fontSize: 22,
    fontWeight: '800',
  },

  methodContent: {
    flex: 1,
  },

  methodTitle: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 3,
  },

  methodDescription: {
    color: '#A7B0C0',
    fontSize: 12,
    lineHeight: 18,
  },

  tryCard: {
    backgroundColor: '#7C5CFC',
    borderRadius: 24,
    padding: 22,
    marginBottom: 28,
    alignItems: 'center',
  },

  tryIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#6748E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 13,
  },

  tryIconText: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: '800',
  },

  tryTitle: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '800',
    marginBottom: 7,
  },

  tryDescription: {
    color: '#EDE9FE',
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 18,
  },

  tryButton: {
    width: '100%',
    height: 52,
    borderRadius: 15,
    backgroundColor: '#0F172A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },

  tryButtonText: {
    color: '#22D3EE',
    fontSize: 15,
    fontWeight: '800',
  },

  tryButtonArrow: {
    color: '#22D3EE',
    fontSize: 21,
    marginLeft: 9,
  },

  footer: {
    alignItems: 'center',
    paddingBottom: 5,
  },

  footerTitle: {
    color: '#7C5CFC',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 4,
  },

  footerText: {
    color: '#A7B0C0',
    fontSize: 12,
  },

  footerCopyright: {
    color: '#64748B',
    fontSize: 11,
    marginTop: 7,
  },
});