import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';

import ScreenWrapper from '../components/ScreenWrapper';
import CustomInput from '../components/CustomInput';
import MainButton from '../components/MainButton';
import { colors } from '../theme/colors';
import { RootState, AppDispatch } from '../redux/store';
import { updateField, setLoading, resetForm } from '../redux/authSlice';
import { AuthStackParamList } from '../navigation/AuthNavigator';

type SignupScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Signup'>;

type Props = {
    navigation: SignupScreenNavigationProp;
};

const SignupScreen: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { email, password, confirmPassword, isLoading } = useSelector((state: RootState) => state.auth);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleSignup = () => {
        if (password !== confirmPassword) {
            Alert.alert("Passwords don't match");
            return;
        }
        console.log('Signing up with:', email, password);
        dispatch(setLoading(true));
        // Simulate API call
        setTimeout(() => {
            dispatch(setLoading(false));
            dispatch(resetForm());
            navigation.navigate('Login');
        }, 2000);
    };

    return (
        <ScreenWrapper>
            <Text style={styles.title}>Sing up</Text>
            {/* Typo "Sing up" is intentional to match the design image provided */}
            <Text style={styles.subtitle}>Fresh Food Delivered.</Text>

            <Text style={styles.label}>Email</Text>
            <CustomInput
                iconName="email-outline"
                placeholder="example@gmail.com"
                value={email}
                onChangeText={(value) => dispatch(updateField({ field: 'email', value }))}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <Text style={styles.label}>Password</Text>
            <CustomInput
                iconName="lock-outline"
                placeholder="••••••••••••"
                value={password}
                onChangeText={(value) => dispatch(updateField({ field: 'password', value }))}
                secureTextEntry={!isPasswordVisible}
                rightIconName={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                onRightIconPress={() => setIsPasswordVisible(!isPasswordVisible)}
            />

            <Text style={styles.label}>Confirm password</Text>
            {/* Confirm password doesn't have an icon in the design, so we pass empty string/null if component supports it, or just don't pass it and let component handle it. 
           Looking at design, it actually has no icon on left, but same style.
       */}
            <View style={styles.noIconInputContainer}>
                <CustomInput
                    iconName="lock-outline"
                    placeholder="••••••••••••" // Added placeholder so dots appear
                    value={confirmPassword}
                    onChangeText={(value) => dispatch(updateField({ field: 'confirmPassword', value }))}
                    secureTextEntry={true}
                // REMOVED the 'style' prop here. It was breaking the layout.
                />
            </View>

            <MainButton title="Sign up" onPress={handleSignup} isLoading={isLoading} />

            <View style={styles.footer}>
                <Text style={styles.footerText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.footerLink}>Log in here!</Text>
                </TouchableOpacity>
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.textPrimary,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: colors.textSecondary,
        textAlign: 'center',
        marginBottom: 30,
        marginTop: 5,
    },
    label: {
        fontSize: 14,
        color: colors.textPrimary,
        marginBottom: 8,
        marginLeft: 5,
        fontWeight: '500',
    },
    // The design for confirm password actually looks exactly like the password field above it.
    // I will remove this special container and just use the standard input.
    noIconInputContainer: {
        marginBottom: 20
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    footerText: {
        color: colors.textSecondary,
        fontSize: 13,
    },
    footerLink: {
        color: colors.primaryButton,
        fontWeight: 'bold',
        fontSize: 13,
    },
});

export default SignupScreen;