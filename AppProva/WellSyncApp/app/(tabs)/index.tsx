import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter } from 'expo-router';
import { useUser } from '@/context/UserContext';
import { useState } from 'react';

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  const router = useRouter();
  const { user, updateUser } = useUser();
  const [water, setWater] = useState(1.5);

  const addWater = () => {
    setWater(prev => Math.min(prev + 0.25, 4.0));
  };

  const showPaywall = (feature: string) => {
    router.push({ pathname: '/modal', params: { feature } });
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: theme.text }]}>Buongiorno,</Text>
            <Text style={[styles.userName, { color: theme.tint }]}>{user.name || 'Atleta'}!</Text>
          </View>
          <TouchableOpacity
            style={[styles.profileButton, { backgroundColor: theme.surface, borderColor: theme.border }]}
            onPress={() => router.push('/profile')}
          >
            <IconSymbol name="person.3.fill" size={24} color={theme.tint} />
          </TouchableOpacity>
        </View>

        {/* Health Summary Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Sintesi Salute</Text>
          <View style={styles.metricsGrid}>
            <TouchableOpacity
              style={[styles.metricCard, { backgroundColor: theme.surface, borderColor: theme.border }]}
              onPress={() => showPaywall('Analytics Passi Avanzati')}
            >
              <View style={[styles.metricIconWrap, { backgroundColor: theme.tint + '20' }]}>
                <IconSymbol name="house.fill" size={20} color={theme.tint} />
              </View>
              <Text style={[styles.metricValue, { color: theme.text }]}>6,243</Text>
              <Text style={[styles.metricLabel, { color: theme.icon }]}>Passi</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.metricCard, { backgroundColor: theme.surface, borderColor: theme.border }]}
              onPress={() => showPaywall('Qualità del Sonno Premium')}
            >
              <View style={[styles.metricIconWrap, { backgroundColor: theme.accent + '20' }]}>
                <IconSymbol name="heart.fill" size={20} color={theme.accent} />
              </View>
              <Text style={[styles.metricValue, { color: theme.text }]}>7h 15m</Text>
              <Text style={[styles.metricLabel, { color: theme.icon }]}>Sonno</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.metricCard, { backgroundColor: theme.surface, borderColor: theme.border }]}
              onPress={addWater}
            >
              <View style={[styles.metricIconWrap, { backgroundColor: '#4299E120' }]}>
                <IconSymbol name="chevron.right" size={20} color="#4299E1" />
              </View>
              <Text style={[styles.metricValue, { color: theme.text }]}>{water.toFixed(2)} L</Text>
              <Text style={[styles.metricLabel, { color: theme.icon }]}>Acqua (+250ml)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.metricCard, { backgroundColor: theme.surface, borderColor: theme.border }]}
              onPress={() => showPaywall('Calcolo Macros Dettagliato')}
            >
              <View style={[styles.metricIconWrap, { backgroundColor: '#ED893620' }]}>
                <IconSymbol name="house.fill" size={20} color="#ED8936" />
              </View>
              <Text style={[styles.metricValue, { color: theme.text }]}>1,200</Text>
              <Text style={[styles.metricLabel, { color: theme.icon }]}>Kcal</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions / AI Coach */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Azioni Rapide</Text>

          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: theme.tint }]}
            onPress={() => router.push('/coach')}
          >
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Il tuo AI Coach ti aspetta</Text>
              <Text style={styles.actionDesc}>Dato il tuo obiettivo di {user.goal}, ho preparato un consiglio per te.</Text>
            </View>
            <View style={styles.actionIcon}>
              <IconSymbol name="message.fill" size={32} color="#FFF" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Upcoming Session */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Prossima Sessione</Text>
            <TouchableOpacity onPress={() => router.push('/professionals')}>
              <Text style={[styles.sectionLink, { color: theme.tint }]}>Vedi tutti</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.sessionCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <View style={[styles.sessionAvatar, { backgroundColor: theme.tint + '30' }]}>
              <IconSymbol name="person.3.fill" size={24} color={theme.tint} />
            </View>
            <View style={styles.sessionInfo}>
              <Text style={[styles.sessionName, { color: theme.text }]}>Dott. Marco Neri</Text>
              <Text style={[styles.sessionRole, { color: theme.icon }]}>Nutrizionista</Text>
              <Text style={[styles.sessionTime, { color: theme.tint }]}>Oggi, 15:30</Text>
            </View>
            <TouchableOpacity
              style={[styles.joinBtn, { backgroundColor: theme.tint }]}
              onPress={() => showPaywall('Consulenza Pro')}
            >
              <Text style={styles.joinBtnText}>Entra</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Padding for bottom tab bar on mobile */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  greeting: {
    fontSize: 18,
    fontFamily: 'Inter',
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Outfit',
  },
  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Outfit',
    marginBottom: 15,
  },
  sectionLink: {
    fontFamily: 'Inter',
    fontWeight: '500',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  metricCard: {
    width: '47%',
    padding: 15,
    borderRadius: 16,
    borderWidth: 1,
  },
  metricIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Outfit',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 14,
    fontFamily: 'Inter',
  },
  actionCard: {
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionContent: {
    flex: 1,
    marginRight: 15,
  },
  actionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Outfit',
    marginBottom: 8,
  },
  actionDesc: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    fontFamily: 'Inter',
    lineHeight: 20,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sessionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 16,
    borderWidth: 1,
  },
  sessionAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  sessionInfo: {
    flex: 1,
  },
  sessionName: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Outfit',
    marginBottom: 2,
  },
  sessionRole: {
    fontSize: 13,
    fontFamily: 'Inter',
    marginBottom: 4,
  },
  sessionTime: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter',
  },
  joinBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  joinBtnText: {
    color: '#FFF',
    fontWeight: '600',
    fontFamily: 'Inter',
    fontSize: 14,
  },
});
