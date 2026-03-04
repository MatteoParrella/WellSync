import { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useUser } from '@/context/UserContext';

interface Message {
    id: string;
    text: string;
    sender: 'ai' | 'user';
    time: string;
    isPlan?: boolean;
}

export default function CoachScreen() {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];
    const { user } = useUser();
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);

    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: `Ciao ${user.name || 'Atleta'}! Sono il tuo coach virtuale. Basandomi sul tuo obiettivo di ${user.goal}, sono pronto ad aiutarti oggi. Cosa vorresti fare?`,
            sender: 'ai',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);

    useEffect(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    }, [messages, isTyping]);

    const sendMessage = (text: string = inputText) => {
        const msgText = text.trim();
        if (!msgText) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            text: msgText,
            sender: 'user',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, newMessage]);
        setInputText('');
        setIsTyping(true);

        // Simulate AI response based on context
        setTimeout(() => {
            let responseText = "Interessante! Sto analizzando le tue statistiche.";

            if (msgText.toLowerCase().includes('allenamento') || msgText.toLowerCase().includes('palestra')) {
                responseText = `Dato che sei a livello ${user.level}, ti consiglio di concentrarti sulla tecnica. Vuoi che generi una scheda per i tuoi ${user.days} giorni di allenamento?`;
            } else if (msgText.toLowerCase().includes('dieta') || msgText.toLowerCase().includes('mangiare')) {
                responseText = `Per il tuo peso di ${user.weight}kg, dovresti mirare a circa ${parseInt(user.weight) * 2}g di proteine al giorno per supportare l'obiettivo: ${user.goal}.`;
            }

            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                text: responseText,
                sender: 'ai',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
            setIsTyping(false);
        }, 1500);
    };

    const generateWorkout = () => {
        setIsTyping(true);
        setTimeout(() => {
            const plan = `Ecco la tua scheda ${user.goal.toUpperCase()}:\n\n- Squat: 3x10 (90s)\n- Panca: 4x8 (2min)\n- Trazioni: 3xMax (90s)\n\nBuon allenamento!`;
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                text: plan,
                sender: 'ai',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isPlan: true
            }]);
            setIsTyping(false);
        }, 2000);
    };

    const generateDiet = () => {
        setIsTyping(true);
        setTimeout(() => {
            const calories = user.goal === 'massa' ? 2800 : 1800;
            const plan = `Piano Alimentare (~${calories} kcal):\n\nColazione: Porridge proteico\nPranzo: Riso, Pollo e Broccoli\nCena: Salmone e Patate`;
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                text: plan,
                sender: 'ai',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isPlan: true
            }]);
            setIsTyping(false);
        }, 2000);
    };

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
                {/* Header */}
                <View style={[styles.header, { borderBottomColor: theme.border }]}>
                    <View style={[styles.avatar, { backgroundColor: theme.tint + '20' }]}>
                        <IconSymbol name="message.fill" size={24} color={theme.tint} />
                    </View>
                    <View>
                        <Text style={[styles.headerTitle, { color: theme.text }]}>AI Coach</Text>
                        <Text style={[styles.headerStatus, { color: theme.tint }]}>Contestuale: {user.goal}</Text>
                    </View>
                </View>

                {/* Chat Area */}
                <ScrollView
                    ref={scrollViewRef}
                    style={styles.chatArea}
                    contentContainerStyle={styles.chatContent}
                    showsVerticalScrollIndicator={false}
                >
                    {messages.map((msg) => (
                        <View
                            key={msg.id}
                            style={[
                                styles.messageRow,
                                msg.sender === 'user' ? styles.messageRowUser : styles.messageRowAi
                            ]}
                        >
                            {msg.sender === 'ai' && (
                                <View style={[styles.msgAvatar, { backgroundColor: theme.tint + '20' }]}>
                                    <IconSymbol name="message.fill" size={14} color={theme.tint} />
                                </View>
                            )}
                            <View style={[
                                styles.messageBubble,
                                msg.sender === 'user'
                                    ? [styles.messageBubbleUser, { backgroundColor: theme.tint }]
                                    : [styles.messageBubbleAi, { backgroundColor: theme.surface, borderColor: theme.border, borderWidth: 1 }],
                                msg.isPlan && { borderLeftWidth: 4, borderLeftColor: theme.accent }
                            ]}>
                                <Text style={[
                                    styles.messageText,
                                    msg.sender === 'user' ? { color: '#FFF' } : { color: theme.text }
                                ]}>
                                    {msg.text}
                                </Text>
                                <Text style={[
                                    styles.messageTime,
                                    msg.sender === 'user' ? { color: 'rgba(255,255,255,0.7)' } : { color: theme.icon }
                                ]}>
                                    {msg.time}
                                </Text>
                            </View>
                        </View>
                    ))}
                    {isTyping && (
                        <View style={styles.messageRowAi}>
                            <View style={[styles.msgAvatar, { backgroundColor: theme.tint + '20' }]}>
                                <ActivityIndicator size="small" color={theme.tint} />
                            </View>
                        </View>
                    )}
                </ScrollView>

                {/* Suggestion Chips */}
                <View style={styles.chipsContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsScroll}>
                        <TouchableOpacity style={[styles.chip, { backgroundColor: theme.surface, borderColor: theme.border }]} onPress={generateWorkout}>
                            <IconSymbol name="house.fill" size={16} color={theme.tint} />
                            <Text style={[styles.chipText, { color: theme.text }]}>Genera Scheda</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.chip, { backgroundColor: theme.surface, borderColor: theme.border }]} onPress={generateDiet}>
                            <IconSymbol name="house.fill" size={16} color={theme.accent} />
                            <Text style={[styles.chipText, { color: theme.text }]}>Piano Dieta</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.chip, { backgroundColor: theme.surface, borderColor: theme.border }]} onPress={() => sendMessage("Consigli riposo")}>
                            <Text style={[styles.chipText, { color: theme.text }]}>Consigli Riposo</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>

                {/* Input Area */}
                <View style={[styles.inputArea, { backgroundColor: theme.surface, borderTopColor: theme.border }]}>
                    <TextInput
                        style={[styles.input, { backgroundColor: theme.background, color: theme.text, borderColor: theme.border }]}
                        placeholder="Scrivi al tuo Coach..."
                        placeholderTextColor={theme.icon}
                        value={inputText}
                        onChangeText={setInputText}
                        multiline
                    />
                    <TouchableOpacity
                        style={[styles.sendButton, { backgroundColor: inputText.trim() ? theme.tint : theme.border }]}
                        onPress={() => sendMessage()}
                        disabled={!inputText.trim()}
                    >
                        <IconSymbol name="paperplane.fill" size={20} color={inputText.trim() ? '#FFF' : theme.icon} />
                    </TouchableOpacity>
                </View>

                {/* Padding for bottom tab bar */}
                <View style={{ height: Platform.OS === 'ios' ? 80 : 60 }} />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Outfit',
    },
    headerStatus: {
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'Inter',
    },
    chatArea: {
        flex: 1,
    },
    chatContent: {
        padding: 20,
        paddingBottom: 20,
    },
    messageRow: {
        flexDirection: 'row',
        marginBottom: 20,
        maxWidth: '85%',
    },
    messageRowUser: {
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
    },
    messageRowAi: {
        alignSelf: 'flex-start',
    },
    msgAvatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        alignSelf: 'flex-end',
    },
    messageBubble: {
        padding: 15,
        borderRadius: 20,
    },
    messageBubbleUser: {
        borderBottomRightRadius: 5,
    },
    messageBubbleAi: {
        borderBottomLeftRadius: 5,
    },
    messageText: {
        fontSize: 15,
        fontFamily: 'Inter',
        lineHeight: 22,
    },
    messageTime: {
        fontSize: 11,
        fontFamily: 'Inter',
        marginTop: 5,
        alignSelf: 'flex-end',
    },
    chipsContainer: {
        paddingVertical: 10,
    },
    chipsScroll: {
        paddingHorizontal: 20,
        gap: 10,
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        gap: 5,
    },
    chipText: {
        fontSize: 13,
        fontWeight: '600',
        fontFamily: 'Inter',
    },
    inputArea: {
        flexDirection: 'row',
        padding: 15,
        borderTopWidth: 1,
        alignItems: 'flex-end',
    },
    input: {
        flex: 1,
        minHeight: 45,
        maxHeight: 120,
        borderWidth: 1,
        borderRadius: 22.5,
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 12,
        fontSize: 15,
        fontFamily: 'Inter',
        marginRight: 10,
    },
    sendButton: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
