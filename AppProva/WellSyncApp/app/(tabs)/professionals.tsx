import { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, Platform, StatusBar, TextInput } from 'react-native';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { IconSymbol } from '@/components/ui/icon-symbol';

interface Professional {
    id: string;
    name: string;
    role: string;
    rating: number;
    reviews: number;
    price: string;
    availability: string;
}

const PROFESSIONALS: Professional[] = [
    { id: '1', name: 'Dott. Marco Neri', role: 'Nutrizionista', rating: 4.9, reviews: 124, price: '€50/seduta', availability: 'Oggi' },
    { id: '2', name: 'Dott.ssa Sara Tosi', role: 'Psicologa', rating: 5.0, reviews: 89, price: '€60/seduta', availability: 'Domani' },
    { id: '3', name: 'Alex Rossi', role: 'Personal Trainer', rating: 4.8, reviews: 210, price: '€35/seduta', availability: 'Mercoledì' },
    { id: '4', name: 'Dott. Luca Bianchi', role: 'Nutrizionista', rating: 4.7, reviews: 56, price: '€45/seduta', availability: 'Oggi' },
];

const CATEGORIES = ['Tutti', 'Nutrizionista', 'Psicologo', 'Personal Trainer'];

export default function ProfessionalsScreen() {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];
    const [activeCategory, setActiveCategory] = useState('Tutti');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProfessionals = PROFESSIONALS.filter(p => {
        const matchesCategory = activeCategory === 'Tutti' || p.role === activeCategory;
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.role.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
            <View style={styles.header}>
                <Text style={[styles.headerTitle, { color: theme.text }]}>Professionisti</Text>
                <Text style={[styles.headerSubtitle, { color: theme.icon }]}>Trova l'esperto giusto per te</Text>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <View style={[styles.searchInputWrap, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                    <IconSymbol name="house.fill" size={20} color={theme.icon} style={styles.searchIcon} />
                    {/* Note: using house.fill here as placeholder since magnifyingglass isn't mapped. In production map a real search icon */}
                    <TextInput
                        style={[styles.searchInput, { color: theme.text }]}
                        placeholder="Cerca per nome o specialità..."
                        placeholderTextColor={theme.icon}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            {/* Categories */}
            <View style={styles.categoriesContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContent}>
                    {CATEGORIES.map(category => (
                        <TouchableOpacity
                            key={category}
                            style={[
                                styles.categoryChip,
                                activeCategory === category
                                    ? { backgroundColor: theme.tint, borderColor: theme.tint }
                                    : { backgroundColor: theme.surface, borderColor: theme.border }
                            ]}
                            onPress={() => setActiveCategory(category)}
                        >
                            <Text style={[
                                styles.categoryText,
                                activeCategory === category ? { color: '#FFF' } : { color: theme.text }
                            ]}>
                                {category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* List */}
            <ScrollView style={styles.listContainer} contentContainerStyle={styles.listContent}>
                {filteredProfessionals.map(prof => (
                    <View key={prof.id} style={[styles.profCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                        <View style={styles.profHeader}>
                            <View style={[styles.avatar, { backgroundColor: theme.tint + '20' }]}>
                                <IconSymbol name="person.3.fill" size={24} color={theme.tint} />
                            </View>
                            <View style={styles.profInfo}>
                                <Text style={[styles.profName, { color: theme.text }]}>{prof.name}</Text>
                                <Text style={[styles.profRole, { color: theme.icon }]}>{prof.role}</Text>
                            </View>
                            <View style={styles.ratingBadge}>
                                <IconSymbol name="heart.fill" size={12} color={theme.accent} />
                                <Text style={[styles.ratingText, { color: theme.text }]}>{prof.rating}</Text>
                            </View>
                        </View>

                        <View style={styles.profDetails}>
                            <View style={styles.detailItem}>
                                <Text style={[styles.detailLabel, { color: theme.icon }]}>Tariffa</Text>
                                <Text style={[styles.detailValue, { color: theme.text }]}>{prof.price}</Text>
                            </View>
                            <View style={styles.detailItem}>
                                <Text style={[styles.detailLabel, { color: theme.icon }]}>Disponibilità</Text>
                                <Text style={[styles.detailValue, { color: theme.tint }]}>{prof.availability}</Text>
                            </View>
                        </View>

                        <TouchableOpacity style={[styles.bookBtn, { backgroundColor: theme.tint }]}>
                            <Text style={styles.bookBtnText}>Prenota Sessione</Text>
                        </TouchableOpacity>
                    </View>
                ))}

                {filteredProfessionals.length === 0 && (
                    <View style={styles.emptyState}>
                        <Text style={[styles.emptyText, { color: theme.icon }]}>Nessun professionista trovato.</Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        fontFamily: 'Outfit',
    },
    headerSubtitle: {
        fontSize: 16,
        fontFamily: 'Inter',
        marginTop: 4,
    },
    searchContainer: {
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    searchInputWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 15,
        height: 48,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontFamily: 'Inter',
        fontSize: 15,
    },
    categoriesContainer: {
        marginBottom: 15,
    },
    categoriesContent: {
        paddingHorizontal: 20,
        gap: 10,
    },
    categoryChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
    },
    categoryText: {
        fontFamily: 'Inter',
        fontWeight: '500',
        fontSize: 14,
    },
    listContainer: {
        flex: 1,
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 100, // For tab bar
        gap: 15,
    },
    profCard: {
        borderWidth: 1,
        borderRadius: 16,
        padding: 15,
    },
    profHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
    },
    profInfo: {
        flex: 1,
    },
    profName: {
        fontSize: 18,
        fontWeight: '600',
        fontFamily: 'Outfit',
        marginBottom: 4,
    },
    profRole: {
        fontSize: 14,
        fontFamily: 'Inter',
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(212, 175, 55, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        gap: 4,
    },
    ratingText: {
        fontSize: 13,
        fontWeight: '600',
        fontFamily: 'Inter',
    },
    profDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0,0,0,0.02)',
        padding: 12,
        borderRadius: 12,
        marginBottom: 15,
    },
    detailItem: {
        flex: 1,
    },
    detailLabel: {
        fontSize: 12,
        fontFamily: 'Inter',
        marginBottom: 4,
    },
    detailValue: {
        fontSize: 14,
        fontWeight: '600',
        fontFamily: 'Outfit',
    },
    bookBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 12,
    },
    bookBtnText: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: '600',
        fontFamily: 'Inter',
    },
    emptyState: {
        padding: 30,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        fontFamily: 'Inter',
    },
});
