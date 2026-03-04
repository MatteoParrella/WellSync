import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ModalScreen() {
  const { feature } = useLocalSearchParams();
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <IconSymbol name="heart.fill" size={60} color={theme.accent} />
          <ThemedText type="title" style={styles.title}>WellSync Premium</ThemedText>
          <ThemedText style={styles.subtitle}>
            Sblocca la funzione "{feature || 'Premium'}" e molto altro.
          </ThemedText>
        </View>

        <View style={styles.benefits}>
          <Benefit icon="house.fill" text="Schede Allenamento Illimitate" theme={theme} />
          <Benefit icon="house.fill" text="Piani Alimentari Personalizzati" theme={theme} />
          <Benefit icon="message.fill" text="AI Coach Pro 24/7" theme={theme} />
          <Benefit icon="person.3.fill" text="Accesso ai Professionisti" theme={theme} />
        </View>

        <TouchableOpacity style={[styles.subscribeBtn, { backgroundColor: theme.tint }]}>
          <ThemedText style={styles.subscribeText}>Abbonati ora - €12.99/mese</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
          <ThemedText style={{ color: theme.icon }}>Più tardi</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </SafeAreaView>
  );
}

function Benefit({ icon, text, theme }: any) {
  return (
    <View style={styles.benefitRow}>
      <IconSymbol name={icon} size={20} color={theme.tint} />
      <ThemedText style={styles.benefitText}>{text}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    fontFamily: 'Outfit',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
    marginTop: 10,
    lineHeight: 22,
  },
  benefits: {
    width: '100%',
    marginBottom: 40,
    gap: 15,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  benefitText: {
    fontSize: 16,
    fontWeight: '500',
  },
  subscribeBtn: {
    width: '100%',
    height: 55,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  subscribeText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeBtn: {
    padding: 10,
  },
});
