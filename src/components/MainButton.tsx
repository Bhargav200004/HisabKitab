import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../theme/colors';

interface MainButtonProps {
    title: string;
    onPress: () => void;
    isLoading?: boolean;
}

const MainButton: React.FC<MainButtonProps> = ({ title, onPress, isLoading = false }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress} disabled={isLoading}>
            {isLoading ? (
                <ActivityIndicator color={colors.white} />
            ) : (
                <Text style={styles.buttonText}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primaryButton,
        borderRadius: 25,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MainButton;