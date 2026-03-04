import { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, Platform, StatusBar, Switch } from 'react-native';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function ProfileScreen() {
    const systemColorScheme = useColorScheme() ?? 'light';
    // Note: For a real app, you'd use a Context Provider to override the system theme.
    // Here we use local state to simulate the toggle visually for the user.
    const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

    // Use selected theme override for preview purposes within this screen
    const currentTheme = isDarkMode ? 'dark' : 'light';
    const theme = Colors[currentTheme];

    const SettingRow = ({ icon, label, value, showToggle, toggleValue, onToggle, showArrow = true }: any) => (
        <TouchableOpacity
            style={[styles.settingRow, { backgroundColor: theme.surface, borderBottomColor: theme.border }]}
            disabled={showToggle}
        >
            <View style={styles.settingLeft}>
                <View style={[styles.settingIcon, { backgroundColor: theme.tint + '15' }]}>
                    <IconSymbol name={icon} size={20} color={theme.tint} />
                </View>
                <Text style={[styles.settingLabel, { color: theme.text }]}>{label}</Text>
            </View>

            <View style={styles.settingRight}>
                {value && <Text style={[styles.settingValue, { color: theme.icon }]}>{value}</Text>}
                {showToggle && (
                    <Switch
                        value={toggleValue}
                        onValueChange={onToggle}
                        trackColor={{ false: theme.border, true: theme.tint }}
                        thumbColor={Platform.OS === 'ios' ? '#FFF' : '#FFF'}
                    />
                )}
                {showArrow && !showToggle && (
                    // using chevron.right mapped from SF Symbols earlier
                    <IconSymbol name="chevron.right" size={20} color={theme.icon} />
                )}
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <Text style={[styles.headerTitle, { color: theme.text }]}>Profilo</Text>
                </View>

                {/* Profile Card */}
                <View style={[styles.profileCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                    <View style={[styles.avatarLg, { backgroundColor: theme.tint + '20' }]}>
                        <IconSymbol name="person.3.fill" size={36} color={theme.tint} />
                    </View>
                    <View style={styles.profileInfo}>
                        <Text style={[styles.profileName, { color: theme.text }]}>Giulia Rossi</Text>
                        <Text style={[styles.profileEmail, { color: theme.icon }]}>giulia.rossi@example.com</Text>
                        <View style={[styles.planBadge, { backgroundColor: theme.accent + '20' }]}>
                            <IconSymbol name="heart.fill" size={12} color={theme.accent} />
                            <Text style={[styles.planText, { color: theme.accent }]}>Premium Plan</Text>
                        </View>
                    </View>
                </View>

                {/* Settings Sections */}
                <View style={styles.settingsGroup}>
                    <Text style={[styles.groupTitle, { color: theme.icon }]}>PREFERENZE APP</Text>
                    <View style={[styles.groupContainer, { borderColor: theme.border, backgroundColor: theme.surface }]}>
                        <SettingRow
                            icon="gearshape.fill"
                            label="Modalità Scura"
                            showToggle
                            toggleValue={isDarkMode}
                            onToggle={setIsDarkMode}
                        />
                        <SettingRow
                            icon="message.fill"
                            label="Notifiche"
                            value="Attivate"
                        />
                    </View>
                </View>

                <View style={styles.settingsGroup}>
                    <Text style={[styles.groupTitle, { color: theme.icon }]}>ACCOUNT</Text>
                    <View style={[styles.groupContainer, { borderColor: theme.border, backgroundColor: theme.surface }]}>
                        <SettingRow
                            icon="person.3.fill"
                            label="Dati Personali"
                        />
                        <SettingRow
                            icon="heart.fill"
                            label="Obiettivi Salute"
                        />
                        <SettingRow
                            icon="house.fill"
                            label="Gestione Piano"
                        />
                    </View>
                </View>

                {/* Logout Button */}
                <TouchableOpacity style={[styles.logoutBtn, { borderColor: theme.border }]}>
                    <Text style={styles.logoutText}>Esci dall'account</Text>
                </TouchableOpacity>

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
        paddingBottom: 100, // tab bar padding
    },
    header: {
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        fontFamily: 'Outfit',
    },
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        marginBottom: 30,
    },
    avatarLg: {
        width: 72,
        height: 72,
        borderRadius: 36,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20,
    },
    profileInfo: {
        flex: 1,
        alignItems: 'flex-start',
    },
    profileName: {
        fontSize: 22,
        fontWeight: '600',
        fontFamily: 'Outfit',
        marginBottom: 4,
    },
    profileEmail: {
        fontSize: 14,
        fontFamily: 'Inter',
        marginBottom: 8,
    },
    planBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
        gap: 6,
    },
    planText: {
        fontSize: 12,
        fontWeight: '600',
        fontFamily: 'Inter',
    },
    settingsGroup: {
        marginBottom: 25,
    },
    groupTitle: {
        fontSize: 13,
        fontWeight: '600',
        fontFamily: 'Inter',
        marginBottom: 10,
        marginLeft: 5,
        letterSpacing: 0.5,
    },
    groupContainer: {
        borderWidth: 1,
        borderRadius: 16,
        overflow: 'hidden',
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
    },
    settingLabel: {
        fontSize: 16,
        fontFamily: 'Inter',
        fontWeight: '500',
    },
    settingRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    settingValue: {
        fontSize: 14,
        fontFamily: 'Inter',
    },
    logoutBtn: {
        marginTop: 10,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 16,
    },
    logoutText: {
        color: '#E53E3E', // Red for logout
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'Inter',
    },
});
