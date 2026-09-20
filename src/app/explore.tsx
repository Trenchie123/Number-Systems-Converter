import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const numberSystems = [
  'Decimal',
  'Binary',
  'Octal',
  'Hexadecimal',
];

export default function ExploreScreen() {
  const router = useRouter();

  const [input, setInput] = useState('');
  const [fromSystem, setFromSystem] = useState('Decimal');
  const [toSystem, setToSystem] = useState('Binary');

  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  const [result, setResult] = useState('');
  const [explanation, setExplanation] = useState('');
  const [steps, setSteps] = useState<string[]>([]);
  const [showSteps, setShowSteps] = useState(false);

  const getBase = (system: string) => {
    switch (system) {
      case 'Binary':
        return 2;
      case 'Octal':
        return 8;
      case 'Hexadecimal':
        return 16;
      default:
        return 10;
    }
  };

  const getDigits = (system: string) => {
    switch (system) {
      case 'Binary':
        return '01';
      case 'Octal':
        return '01234567';
      case 'Hexadecimal':
        return '0123456789ABCDEF';
      default:
        return '0123456789';
    }
  };

  const getDigitValue = (digit: string) => {
    if (digit >= '0' && digit <= '9') {
      return Number(digit);
    }

    return digit.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
  };

  const getDigitSymbol = (value: number) => {
    if (value < 10) {
      return String(value);
    }

    return String.fromCharCode('A'.charCodeAt(0) + value - 10);
  };

  const getSystemSymbol = (system: string) => {
    switch (system) {
      case 'Binary':
        return '₂';
      case 'Octal':
        return '₈';
      case 'Hexadecimal':
        return '₁₆';
      default:
        return '₁₀';
    }
  };

  const convertToDecimal = (value: string, base: number) => {
    let decimal = 0;
    const conversionSteps: string[] = [];

    const reversed = value.split('').reverse();

    reversed.forEach((digit, index) => {
      const digitValue = getDigitValue(digit);
      const powerValue = Math.pow(base, index);
      const contribution = digitValue * powerValue;

      decimal += contribution;

      conversionSteps.push(
        `${digit} × ${base}^${index} = ${contribution}`
      );
    });

    conversionSteps.push(`Total = ${decimal}`);

    return {
      decimal,
      steps: conversionSteps,
    };
  };

  const convertFromDecimal = (
    decimalValue: number,
    targetBase: number
  ) => {
    if (decimalValue === 0) {
      return {
        result: '0',
        steps: ['0 ÷ base = 0 remainder 0'],
      };
    }

    let value = decimalValue;
    const remainders: string[] = [];
    const conversionSteps: string[] = [];

    while (value > 0) {
      const quotient = Math.floor(value / targetBase);
      const remainder = value % targetBase;

      remainders.push(getDigitSymbol(remainder));

      conversionSteps.push(
        `${value} ÷ ${targetBase} = ${quotient} remainder ${getDigitSymbol(
          remainder
        )}`
      );

      value = quotient;
    }

    remainders.reverse();

    conversionSteps.push(
      `Read the remainders from bottom to top = ${remainders.join('')}`
    );

    return {
      result: remainders.join(''),
      steps: conversionSteps,
    };
  };

  const convertNumber = () => {
    setShowSteps(false);
    setSteps([]);

    const value = input.trim().toUpperCase();

    if (!value) {
      setResult('');
      setExplanation('Please enter a number to convert.');
      return;
    }

    const allowedDigits = getDigits(fromSystem);

    for (const character of value) {
      if (!allowedDigits.includes(character)) {
        setResult('');
        setExplanation(
          `Invalid input. ${fromSystem} only allows these digits: ${allowedDigits}`
        );
        return;
      }
    }

    const fromBase = getBase(fromSystem);
    const toBase = getBase(toSystem);

    if (fromSystem === toSystem) {
      setResult(value);

      setExplanation(
        `${value}${getSystemSymbol(
          fromSystem
        )} is already in the ${fromSystem} system.`
      );

      setSteps([
        `No conversion is required because both systems are ${fromSystem}.`,
      ]);

      return;
    }

    let decimalValue: number;
    let allSteps: string[] = [];

    if (fromSystem === 'Decimal') {
      decimalValue = Number(value);

      if (!Number.isInteger(decimalValue)) {
        setResult('');
        setExplanation('Please enter a valid whole number.');
        return;
      }

      if (!Number.isSafeInteger(decimalValue)) {
        setResult('');
        setExplanation(
          'Please enter a smaller whole number for accurate conversion.'
        );
        return;
      }

      allSteps.push(`Starting decimal value = ${decimalValue}`);
    } else {
      const decimalConversion = convertToDecimal(
        value,
        fromBase
      );

      decimalValue = decimalConversion.decimal;

      if (!Number.isSafeInteger(decimalValue)) {
        setResult('');
        setExplanation(
          'This number is too large for accurate conversion.'
        );
        return;
      }

      allSteps = [
        `Convert ${value}${getSystemSymbol(
          fromSystem
        )} to decimal:`,
        ...decimalConversion.steps,
      ];
    }

    if (toSystem === 'Decimal') {
      setResult(String(decimalValue));

      setExplanation(
        `${value}${getSystemSymbol(
          fromSystem
        )} = ${decimalValue}${getSystemSymbol(toSystem)}`
      );

      setSteps(allSteps);
      return;
    }

    const targetConversion = convertFromDecimal(
      decimalValue,
      toBase
    );

    setResult(targetConversion.result);

    setExplanation(
      `${value}${getSystemSymbol(
        fromSystem
      )} = ${targetConversion.result}${getSystemSymbol(toSystem)}`
    );

    setSteps([
      ...allSteps,
      `Convert ${decimalValue}₁₀ to ${toSystem}:`,
      ...targetConversion.steps,
    ]);
  };

  const swapSystems = () => {
    const oldFrom = fromSystem;

    setFromSystem(toSystem);
    setToSystem(oldFrom);

    setResult('');
    setExplanation('');
    setSteps([]);
    setShowSteps(false);
  };

  const clearConverter = () => {
    setInput('');
    setFromSystem('Decimal');
    setToSystem('Binary');
    setResult('');
    setExplanation('');
    setSteps([]);
    setShowSteps(false);
    setShowFromDropdown(false);
    setShowToDropdown(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backArrow}>‹</Text>
          </Pressable>

          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>
              Number Converter
            </Text>

            <Text style={styles.headerSubtitle}>
              Convert between number systems
            </Text>
          </View>
        </View>

        <View style={styles.converterCard}>
          <Text style={styles.sectionLabel}>
            NUMBER TO CONVERT
          </Text>

          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={setInput}
              placeholder="Enter a number"
              placeholderTextColor="#64748B"
              autoCapitalize="characters"
              keyboardType="default"
              returnKeyType="done"
            />

            <Pressable
              style={styles.clearButton}
              onPress={clearConverter}
            >
              <Text style={styles.clearButtonText}>Clear</Text>
            </Pressable>
          </View>

          <Text style={styles.fieldLabel}>From</Text>

          <Pressable
            style={styles.dropdown}
            onPress={() => {
              setShowFromDropdown(!showFromDropdown);
              setShowToDropdown(false);
            }}
          >
            <Text style={styles.dropdownText}>{fromSystem}</Text>
            <Text style={styles.dropdownArrow}>⌄</Text>
          </Pressable>

          {showFromDropdown && (
            <View style={styles.dropdownMenu}>
              {numberSystems.map((system) => (
                <Pressable
                  key={system}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setFromSystem(system);
                    setShowFromDropdown(false);
                    setResult('');
                    setExplanation('');
                    setSteps([]);
                  }}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      system === fromSystem &&
                        styles.selectedDropdownItemText,
                    ]}
                  >
                    {system}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}

          <Pressable
            style={styles.swapButton}
            onPress={swapSystems}
          >
            <View style={styles.swapIconCircle}>
              <Text style={styles.swapIcon}>⇅</Text>
            </View>

            <Text style={styles.swapText}>Swap Systems</Text>
          </Pressable>

          <Text style={styles.fieldLabel}>To</Text>

          <Pressable
            style={styles.dropdown}
            onPress={() => {
              setShowToDropdown(!showToDropdown);
              setShowFromDropdown(false);
            }}
          >
            <Text style={styles.dropdownText}>{toSystem}</Text>
            <Text style={styles.dropdownArrow}>⌄</Text>
          </Pressable>

          {showToDropdown && (
            <View style={styles.dropdownMenu}>
              {numberSystems.map((system) => (
                <Pressable
                  key={system}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setToSystem(system);
                    setShowToDropdown(false);
                    setResult('');
                    setExplanation('');
                    setSteps([]);
                  }}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      system === toSystem &&
                        styles.selectedDropdownItemText,
                    ]}
                  >
                    {system}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}

          <Pressable
            style={({ pressed }) => [
              styles.convertButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={convertNumber}
          >
            <Text style={styles.convertButtonText}>
              Convert Number
            </Text>

            <Text style={styles.convertArrow}>→</Text>
          </Pressable>
        </View>

        {result !== '' && (
          <View style={styles.resultCard}>
            <View style={styles.resultHeader}>
              <Text style={styles.resultLabel}>RESULT</Text>

              <View style={styles.successBadge}>
                <Text style={styles.successBadgeText}>
                  ✓ Converted
                </Text>
              </View>
            </View>

            <Text style={styles.resultText}>{result}</Text>

            <Text style={styles.explanationText}>
              {explanation}
            </Text>

            <Pressable
              style={styles.stepsButton}
              onPress={() => setShowSteps(!showSteps)}
            >
              <Text style={styles.stepsButtonText}>
                {showSteps
                  ? 'Hide Conversion Steps'
                  : 'Show Conversion Steps'}
              </Text>

              <Text style={styles.stepsArrow}>
                {showSteps ? '⌃' : '⌄'}
              </Text>
            </Pressable>

            {showSteps && (
              <View style={styles.stepsContainer}>
                {steps.map((step, index) => (
                  <View style={styles.stepRow} key={index}>
                    <View style={styles.stepNumber}>
                      <Text style={styles.stepNumberText}>
                        {index + 1}
                      </Text>
                    </View>

                    <Text style={styles.stepText}>{step}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        {explanation !== '' && result === '' && (
          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Text style={styles.infoIconText}>!</Text>
            </View>

            <Text style={styles.infoText}>{explanation}</Text>
          </View>
        )}

        <View style={styles.exampleCard}>
          <Text style={styles.exampleTitle}>Quick Example</Text>

          <Text style={styles.exampleSubtitle}>
            Decimal to Binary
          </Text>

          <View style={styles.exampleEquation}>
            <Text style={styles.exampleNumber}>10₁₀</Text>

            <Text style={styles.exampleArrow}>→</Text>

            <Text style={styles.exampleNumber}>1010₂</Text>
          </View>

          <Text style={styles.exampleExplanation}>
            10 in decimal is equal to 1010 in binary.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            No. Systems • Number Conversion
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },

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

  converterCard: {
    backgroundColor: '#151C32',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#252E49',
  },

  sectionLabel: {
    color: '#22D3EE',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 10,
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },

  input: {
    flex: 1,
    height: 54,
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#303A58',
    borderRadius: 15,
    paddingHorizontal: 15,
    color: '#F8FAFC',
    fontSize: 17,
    fontWeight: '600',
  },

  clearButton: {
    height: 54,
    paddingHorizontal: 14,
    justifyContent: 'center',
    marginLeft: 8,
  },

  clearButtonText: {
    color: '#A7B0C0',
    fontSize: 13,
    fontWeight: '700',
  },

  fieldLabel: {
    color: '#CBD5E1',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
  },

  dropdown: {
    height: 52,
    borderWidth: 1,
    borderColor: '#303A58',
    borderRadius: 15,
    backgroundColor: '#0F172A',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  dropdownText: {
    color: '#F8FAFC',
    fontSize: 15,
    fontWeight: '600',
  },

  dropdownArrow: {
    color: '#22D3EE',
    fontSize: 20,
  },

  dropdownMenu: {
    backgroundColor: '#151C32',
    borderWidth: 1,
    borderColor: '#303A58',
    borderRadius: 15,
    marginTop: 6,
    overflow: 'hidden',
  },

  dropdownItem: {
    paddingHorizontal: 15,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#252E49',
  },

  dropdownItemText: {
    color: '#CBD5E1',
    fontSize: 14,
    fontWeight: '600',
  },

  selectedDropdownItemText: {
    color: '#22D3EE',
    fontWeight: '800',
  },

  swapButton: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    paddingVertical: 5,
  },

  swapIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: '#211A45',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },

  swapIcon: {
    color: '#22D3EE',
    fontSize: 19,
    fontWeight: '800',
  },

  swapText: {
    color: '#22D3EE',
    fontSize: 13,
    fontWeight: '700',
  },

  convertButton: {
    height: 55,
    borderRadius: 16,
    backgroundColor: '#7C5CFC',
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },

  convertButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  convertArrow: {
    color: '#FFFFFF',
    fontSize: 22,
    marginLeft: 9,
  },

  resultCard: {
    backgroundColor: '#151C32',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#252E49',
  },

  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  resultLabel: {
    color: '#22D3EE',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
  },

  successBadge: {
    backgroundColor: '#123B3D',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
  },

  successBadgeText: {
    color: '#22D3EE',
    fontSize: 11,
    fontWeight: '700',
  },

  resultText: {
    color: '#F8FAFC',
    fontSize: 38,
    fontWeight: '800',
    marginBottom: 8,
  },

  explanationText: {
    color: '#A7B0C0',
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 18,
  },

  stepsButton: {
    borderTopWidth: 1,
    borderTopColor: '#252E49',
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  stepsButtonText: {
    color: '#22D3EE',
    fontSize: 13,
    fontWeight: '700',
  },

  stepsArrow: {
    color: '#22D3EE',
    fontSize: 18,
  },

  stepsContainer: {
    marginTop: 15,
    backgroundColor: '#0F172A',
    borderRadius: 15,
    padding: 12,
  },

  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 11,
  },

  stepNumber: {
    width: 25,
    height: 25,
    borderRadius: 8,
    backgroundColor: '#211A45',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 9,
  },

  stepNumberText: {
    color: '#22D3EE',
    fontSize: 11,
    fontWeight: '800',
  },

  stepText: {
    flex: 1,
    color: '#CBD5E1',
    fontSize: 12,
    lineHeight: 18,
    paddingTop: 3,
  },

  infoCard: {
    backgroundColor: '#352719',
    borderRadius: 18,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  infoIcon: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: '#5A3519',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  infoIconText: {
    color: '#FDBA74',
    fontSize: 16,
    fontWeight: '800',
  },

  infoText: {
    flex: 1,
    color: '#FDBA74',
    fontSize: 13,
    lineHeight: 19,
  },

  exampleCard: {
    backgroundColor: '#151C32',
    borderRadius: 22,
    padding: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#252E49',
  },

  exampleTitle: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '800',
  },

  exampleSubtitle: {
    color: '#A7B0C0',
    fontSize: 13,
    marginTop: 3,
    marginBottom: 18,
  },

  exampleEquation: {
    backgroundColor: '#0F172A',
    borderRadius: 15,
    paddingVertical: 17,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 13,
  },

  exampleNumber: {
    color: '#F8FAFC',
    fontSize: 21,
    fontWeight: '800',
  },

  exampleArrow: {
    color: '#22D3EE',
    fontSize: 23,
    marginHorizontal: 18,
  },

  exampleExplanation: {
    color: '#A7B0C0',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
  },

  footer: {
    alignItems: 'center',
    paddingTop: 5,
  },

  footerText: {
    color: '#64748B',
    fontSize: 11,
  },
});