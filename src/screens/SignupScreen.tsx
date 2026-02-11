import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';

import ScreenWrapper from '../components/ScreenWrapper';
import CustomInput from '../components/CustomInput';
import MainButton from '../components/MainButton';
import { colors } from '../theme/colors';
import { RootState, AppDispatch } from '../redux/store';
import { clearError } from '../redux/authSlice';
import { AuthStackParamList } from '../navigation/AuthNavigator';
import { signupUser } from '../service/FirebaseAuthentication';

type SignupScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Signup'>;

type Props = {
    navigation: SignupScreenNavigationProp;
};

const SignupScreen: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch<AppDispatch>();

    const { isLoading, error } = useSelector((state: RootState) => state.auth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    useEffect(() => {
        if (error) {
            Alert.alert("Registration Failed", error);
            dispatch(clearError());
        }
    }, [error, dispatch]);

    const handleSignup = () => {
        if (!email || !password || !confirmPassword) {
            Alert.alert("Missing Fields", "Please fill in all fields.");
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match.");
            return;
        }

        dispatch(signupUser({ email, password }));
    };

    return (
        <ScreenWrapper>
            <Text style={styles.title}>Sign up</Text>
            <Text style={styles.subtitle}>Create your HisabKitab account.</Text>

            <Text style={styles.label}>Email</Text>
            <CustomInput
                iconName="email-outline"
                placeholder="example@gmail.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <Text style={styles.label}>Password</Text>
            <CustomInput
                iconName="lock-outline"
                placeholder="••••••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible}
                rightIconName={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                onRightIconPress={() => setIsPasswordVisible(!isPasswordVisible)}
            />

            <Text style={styles.label}>Confirm password</Text>
            <View style={styles.noIconInputContainer}>
                <CustomInput
                    iconName="lock-check-outline"
                    placeholder="••••••••••••"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={true}
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