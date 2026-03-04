import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, SafeAreaView, Dimensions, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useUser } from '@/context/UserContext';

const { width } = Dimensions.get('window');

export default function OnboardingScreen() {
    const [step, setStep] = useState(1);
    const { user, updateUser } = useUser();
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        age: user.age,
        weight: user.weight,
        height: user.height,
        goal: user.goal,
        level: user.level,
        days: user.days,
    });

    const nextStep = () => {
        if (step < 3) setStep(step + 1);
        else finish();
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    const finish = async () => {
        await updateUser({ ...formData, onboarded: true });
        router.replace('/(tabs)');
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <View style={styles.stepContainer}>
                        <ThemedText type="title" style={styles.title}>Benvenuto!</ThemedText>
                        <ThemedText style={styles.subtitle}>Iniziamo a conoscerti meglio.</ThemedText>

                        <View style={styles.inputGroup}>
                            <ThemedText style={styles.label}>Nome Completo</ThemedText>
                            <TextInput
                                style={[styles.input, { color: theme.text, borderColor: theme.border, backgroundColor: theme.surface }]}
                                placeholder="Mario Rossi"
                                placeholderTextColor={theme.icon}
                                value={formData.name}
                                onChangeText={(text) => setFormData({ ...formData, name: text })}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <ThemedText style={styles.label}>Email</ThemedText>
                            <TextInput
                                style={[styles.input, { color: theme.text, borderColor: theme.border, backgroundColor: theme.surface }]}
                                placeholder="mario@esempio.com"
                                placeholderTextColor={theme.icon}
                                keyboardType="email-address"
                                value={formData.email}
                                onChangeText={(text) => setFormData({ ...formData, email: text })}
                            />
                        </View>
                    </View>
                );
            case 2:
                return (
                    <View style={styles.stepContainer}>
                        <ThemedText type="title" style={styles.title}>Dati Fisici</ThemedText>
                        <ThemedText style={styles.subtitle}>Questi dati aiutano l'AI a calcolare i tuoi piani.</ThemedText>

                        <View style={styles.row}>
                            <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                                <ThemedText style={styles.label}>Età</ThemedText>
                                <TextInput
                                    style={[styles.input, { color: theme.text, borderColor: theme.border, backgroundColor: theme.surface }]}
                                    keyboardType="numeric"
                                    value={formData.age}
                                    onChangeText={(text) => setFormData({ ...formData, age: text })}
                                />
                            </View>
                            <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                                <ThemedText style={styles.label}>Peso (kg)</ThemedText>
                                <TextInput
                                    style={[styles.input, { color: theme.text, borderColor: theme.border, backgroundColor: theme.surface }]}
                                    keyboardType="numeric"
                                    value={formData.weight}
                                    onChangeText={(text) => setFormData({ ...formData, weight: text })}
                                />
                            </View>
                            <View style={[styles.inputGroup, { flex: 1 }]}>
                                <ThemedText style={styles.label}>Altezza (cm)</ThemedText>
                                <TextInput
                                    style={[styles.input, { color: theme.text, borderColor: theme.border, backgroundColor: theme.surface }]}
                                    keyboardType="numeric"
                                    value={formData.height}
                                    onChangeText={(text) => setFormData({ ...formData, height: text })}
                                />
                            </View>
                        </View>
                    </View>
                );
            case 3:
                return (
                    <View style={styles.stepContainer}>
                        <ThemedText type="title" style={styles.title}>I tuoi Obiettivi</ThemedText>
                        <ThemedText style={styles.subtitle}>Cosa vuoi ottenere con WellSync?</ThemedText>

                        <ThemedText style={styles.label}>Obiettivo Principale</ThemedText>
                        <View style={styles.goalGrid}>
                            {['massa', 'dimagrimento', 'forza', 'definizione'].map((g) => (
                                <TouchableOpacity
                                    key={g}
                                    style={[
                                        styles.goalItem,
                                        { borderColor: theme.border },
                                        formData.goal === g && { backgroundColor: theme.tint, borderColor: theme.tint }
                                    ]}
                                    onPress={() => setFormData({ ...formData, goal: g })}
                                >
                                    <ThemedText style={[styles.goalText, formData.goal === g && { color: '#FFF' }]}>
                                        {g.charAt(0).toUpperCase() + g.slice(1)}
                                    </ThemedText>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View style={styles.inputGroup}>
                            <ThemedText style={styles.label}>Giorni di allenamento: {formData.days}</ThemedText>
                            <View style={styles.daysContainer}>
                                {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                                    <TouchableOpacity
                                        key={d}
                                        style={[
                                            styles.dayCircle,
                                            { borderColor: theme.border },
                                            formData.days === d && { backgroundColor: theme.tint, borderColor: theme.tint }
                                        ]}
                                        onPress={() => setFormData({ ...formData, days: d })}
                                    >
                                        <ThemedText style={[styles.dayText, formData.days === d && { color: '#FFF' }]}>{d}</ThemedText>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </View>
                );
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.progressHeader}>
                        <View style={styles.progressBar}>
                            <View style={[styles.progressFill, { backgroundColor: theme.tint, width: `${(step / 3) * 100}%` }]} />
                        </View>
                        <ThemedText style={styles.stepText}>Passo {step} di 3</ThemedText>
                    </View>

                    {renderStep()}

                    <View style={styles.footer}>
                        {step > 1 && (
                            <TouchableOpacity onPress={prevStep} style={[styles.btn, styles.btnOutline, { borderColor: theme.border }]}>
                                <ThemedText>Indietro</ThemedText>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity onPress={nextStep} style={[styles.btn, styles.btnPrimary, { backgroundColor: theme.tint }]}>
                            <ThemedText style={styles.btnText}>{step === 3 ? 'Inizia' : 'Avanti'}</ThemedText>
                            <IconSymbol name="chevron.right" size={20} color="#FFF" />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        padding: 25,
    },
    progressHeader: {
        marginBottom: 40,
    },
    progressBar: {
        height: 6,
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        marginBottom: 10,
    },
    progressFill: {
        height: '100%',
        borderRadius: 3,
    },
    stepText: {
        fontSize: 14,
        opacity: 0.6,
    },
    stepContainer: {
        flex: 1,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
        fontFamily: 'Outfit',
    },
    subtitle: {
        fontSize: 18,
        opacity: 0.7,
        marginBottom: 30,
        lineHeight: 24,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        fontFamily: 'Inter',
    },
    input: {
        height: 55,
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 15,
        fontSize: 16,
    },
    row: {
        flexDirection: 'row',
    },
    goalGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginBottom: 25,
    },
    goalItem: {
        width: (width - 70) / 2,
        height: 50,
        borderWidth: 1,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    goalText: {
        fontSize: 14,
        fontWeight: '600',
    },
    daysContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    dayCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dayText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 15,
        marginTop: 40,
        paddingBottom: 20,
    },
    btn: {
        height: 55,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 25,
    },
    btnOutline: {
        borderWidth: 1,
    },
    btnPrimary: {
        flex: 1,
    },
    btnText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 8,
    },
});
