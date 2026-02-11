import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, TextInputProps } from 'react-native';
// Using MaterialCommunityIcons, ensure it's linked
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../theme/colors';

interface CustomInputProps extends TextInputProps {
    iconName: string;
    onRightIconPress?: () => void;
    rightIconName?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
    iconName,
    onRightIconPress,
    rightIconName,
    ...props
}) => {
    return (
        <View style={styles.container}>
            <Icon name={iconName} size={20} color={colors.inputIcon} style={styles.icon} />
            <TextInput
                style={styles.input}
                placeholderTextColor={colors.textSecondary}
                {...props}
            />
            {rightIconName && (
                <TouchableOpacity onPress={onRightIconPress} style={styles.rightIconBtn}>
                    <Icon name={rightIconName} size={20} color={colors.textSecondary} />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.inputBackground,
        borderRadius: 12,
        paddingHorizontal: 15,
        marginBottom: 15,
        height: 55,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        color: colors.textPrimary,
        fontSize: 14,
        height: '100%',
    },
    rightIconBtn: {
        padding: 5,
    }
});

export default CustomInput;