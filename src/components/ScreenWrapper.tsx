import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { colors } from '../theme/colors';

interface ScreenWrapperProps {
    children: React.ReactNode;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ children }) => {
    return (
        // Replace View with ImageBackground and add source={require('path/to/pattern.png')} if you have it
        <View style={styles.backgroundContainer}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
                    <View style={styles.cardContainer}>
                        {children}
                    </View>

                    <View style={styles.logoContainer}>
                        {/* Stylized Logo based on the request */}
                        <Text style={styles.logoText}>HisabKitab</Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        backgroundColor: colors.backgroundPrimary,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
        paddingTop: 60, // Push down a bit
    },
    cardContainer: {
        backgroundColor: colors.cardBackground,
        borderRadius: 30,
        padding: 25,
        // Shadow for elevation effect
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20,
    },
    logoText: {
        // Using a cursive-style font if available, fallback to generic
        fontFamily: Platform.OS === 'ios' ? 'Snell Roundhand' : 'cursive',
        fontSize: 36,
        color: colors.primaryButton, // Using the dark green for the logo
        fontWeight: 'bold',
    }
});

export default ScreenWrapper;