import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserProfile {
    name: string;
    email: string;
    age: string;
    weight: string;
    height: string;
    goal: string;
    level: string;
    days: number;
    onboarded: boolean;
    subscription: 'free' | 'premium' | 'pro';
}

interface UserContextType {
    user: UserProfile;
    updateUser: (data: Partial<UserProfile>) => void;
    resetUser: () => void;
    isLoading: boolean;
}

const defaultUser: UserProfile = {
    name: '',
    email: '',
    age: '25',
    weight: '70',
    height: '175',
    goal: 'massa',
    level: 'principiante',
    days: 3,
    onboarded: false,
    subscription: 'free',
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserProfile>(defaultUser);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const savedUser = await AsyncStorage.getItem('wellsync_user');
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            }
        } catch (e) {
            console.error('Failed to load user', e);
        } finally {
            setIsLoading(false);
        }
    };

    const updateUser = async (data: Partial<UserProfile>) => {
        const newUser = { ...user, ...data };
        setUser(newUser);
        try {
            await AsyncStorage.setItem('wellsync_user', JSON.stringify(newUser));
        } catch (e) {
            console.error('Failed to save user', e);
        }
    };

    const resetUser = async () => {
        setUser(defaultUser);
        try {
            await AsyncStorage.removeItem('wellsync_user');
        } catch (e) {
            console.error('Failed to reset user', e);
        }
    };

    return (
        <UserContext.Provider value={{ user, updateUser, resetUser, isLoading }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
