import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ScreenWrapper from '../components/ScreenWrapper';
import CustomInput from '../components/CustomInput';
import MainButton from '../components/MainButton';
import { colors } from '../theme/colors';
import { RootState, AppDispatch } from '../redux/store';
import { updateField, setLoading } from '../redux/authSlice';
import { AuthStackParamList } from '../navigation/AuthNavigator';


type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

type Props = {
    navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { email, password, isLoading } = useSelector((state: RootState) => state.auth);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = () => {
        // Implement actual login logic here
        console.log('Logging in with:', email, password);
        dispatch(setLoading(true));
        // Simulate API call
        setTimeout(() => dispatch(setLoading(false)), 2000);
    };

    return (
        <ScreenWrapper>
            <Text style={styles.title}>Log in</Text>
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

            <View style={styles.optionsRow}>
                <TouchableOpacity style={styles.rememberMeContainer} onPress={() => setRememberMe(!rememberMe)}>
                    <Icon
                        name={rememberMe ? "checkbox-marked" : "checkbox-blank-outline"}
                        size={20}
                        color={colors.textSecondary}
                    />
                    <Text style={styles.optionText}> Remember me</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.forgotText}>Forget your password</Text>
                </TouchableOpacity>
            </View>

            <MainButton title="Log in" onPress={handleLogin} isLoading={isLoading} />

            <View style={styles.footer}>
                <Text style={styles.footerText}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.footerLink}>Register here!</Text>
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
    optionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    rememberMeContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    optionText: {
        color: colors.textSecondary,
        fontSize: 12
    },
    forgotText: {
        color: colors.textSecondary,
        fontSize: 12,
        fontWeight: '600'
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

export default LoginScreen;