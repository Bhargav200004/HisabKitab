import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../redux/store';
import { logoutUser } from '../service/FirebaseAuthentication';

const HomeScreen = () => {
    const dispatch = useDispatch<AppDispatch>();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to HisabKitab Todo!</Text>
            <Button title="Logout" onPress={() => dispatch(logoutUser())} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    text: { fontSize: 20, marginBottom: 20 }
});

export default HomeScreen;