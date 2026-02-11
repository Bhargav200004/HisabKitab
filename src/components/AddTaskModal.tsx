import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Alert,
    Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from '../theme/colors';
import MainButton from './MainButton';
import { Priority } from '../types/task';

interface AddTaskModalProps {
    isVisible: boolean;
    onClose: () => void;
    onSave: (taskData: { title: string; description: string; priority: Priority; date: string; deadline: string }) => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isVisible, onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<Priority>('Medium');

    // Date State
    const [date, setDate] = useState(new Date());
    const [deadline, setDeadline] = useState(new Date(Date.now() + 86400000)); // Default +1 day

    // Picker Visibility State
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [pickerMode, setPickerMode] = useState<'date' | 'deadline'>('date');

    const handleSave = () => {
        if (!title.trim()) {
            Alert.alert("Error", "Please enter a title");
            return;
        }
        // Format dates to simple strings (DD/MM/YYYY)
        onSave({
            title,
            description,
            priority,
            date: date.toLocaleDateString(),
            deadline: deadline.toLocaleDateString()
        });
        resetForm();
    };

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setPriority('Medium');
        setDate(new Date());
        setDeadline(new Date(Date.now() + 86400000));
        onClose();
    }

    const onDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false); // Hide picker immediately after selection
        if (selectedDate) {
            if (pickerMode === 'date') {
                setDate(selectedDate);
            } else {
                setDeadline(selectedDate);
            }
        }
    };

    const openDatePicker = (mode: 'date' | 'deadline') => {
        setPickerMode(mode);
        setShowDatePicker(true);
    };

    const PriorityButton = ({ label, value }: { label: string, value: Priority }) => (
        <TouchableOpacity
            style={[
                styles.prioButton,
                priority === value && styles.prioButtonSelected,
                value === 'High' && priority === value && { backgroundColor: colors.error },
                value === 'Medium' && priority === value && { backgroundColor: 'orange' },
                value === 'Low' && priority === value && { backgroundColor: colors.primaryButton }
            ]}
            onPress={() => setPriority(value)}
        >
            <Text style={[styles.prioBtnText, priority === value && styles.prioBtnTextSelected]}>{label}</Text>
        </TouchableOpacity>
    );

    return (
        <Modal transparent animationType="fade" visible={isVisible} onRequestClose={resetForm}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Add New Task</Text>

                    {/* Title Field */}
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter task title"
                        value={title}
                        onChangeText={setTitle}
                        placeholderTextColor={colors.textSecondary}
                    />

                    {/* Description Field */}
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Enter task details"
                        value={description}
                        onChangeText={setDescription}
                        multiline
                        numberOfLines={3}
                        placeholderTextColor={colors.textSecondary}
                    />

                    {/* Date & Deadline Clickable Boxes */}
                    <View style={styles.dateRow}>
                        <TouchableOpacity style={styles.dateBox} onPress={() => openDatePicker('date')}>
                            <Text style={styles.dateLabelStatic}>Date</Text>
                            <Text style={styles.dateValue}>{date.toLocaleDateString()}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.dateBox} onPress={() => openDatePicker('deadline')}>
                            <Text style={styles.dateLabelStatic}>Deadline</Text>
                            <Text style={styles.dateValue}>{deadline.toLocaleDateString()}</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Priority Selection */}
                    <Text style={styles.label}>Priority</Text>
                    <View style={styles.priorityRow}>
                        <PriorityButton label="High" value="High" />
                        <PriorityButton label="Medium" value="Medium" />
                        <PriorityButton label="Low" value="Low" />
                    </View>

                    {/* Buttons */}
                    <View style={styles.buttonRow}>
                        <TouchableOpacity onPress={resetForm} style={styles.cancelButton}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        <View style={{ flex: 1 }}>
                            <MainButton title="Save Task" onPress={handleSave} />
                        </View>
                    </View>

                    {/* The Hidden Date Picker (Shows up when state is true) */}
                    {showDatePicker && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={pickerMode === 'date' ? date : deadline}
                            mode="date"
                            is24Hour={true}
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={onDateChange}
                        />
                    )}

                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        padding: 20,
    },
    modalContainer: {
        backgroundColor: colors.cardBackground,
        borderRadius: 20,
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: colors.textPrimary,
        textAlign: 'center'
    },
    input: {
        backgroundColor: colors.inputBackground,
        borderRadius: 10,
        padding: 12,
        marginBottom: 15,
        fontSize: 16,
        color: colors.textPrimary,
        borderWidth: 1,
        borderColor: '#E0E0E0'
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top'
    },
    label: {
        fontWeight: '600',
        marginBottom: 5,
        marginLeft: 4,
        color: colors.textPrimary,
        fontSize: 14
    },
    priorityRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    prioButton: {
        flex: 1,
        paddingVertical: 10,
        marginHorizontal: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.textSecondary,
        alignItems: 'center',
        backgroundColor: colors.white
    },
    prioButtonSelected: {
        borderWidth: 0,
    },
    prioBtnText: {
        color: colors.textSecondary,
        fontWeight: '600'
    },
    prioBtnTextSelected: {
        color: colors.white
    },
    dateRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    dateBox: {
        backgroundColor: colors.inputBackground,
        padding: 12,
        borderRadius: 10,
        flex: 0.48,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0'
    },
    dateLabelStatic: {
        color: colors.textSecondary,
        fontSize: 12,
        marginBottom: 4
    },
    dateValue: {
        color: colors.textPrimary,
        fontWeight: 'bold',
        fontSize: 15
    },
    buttonRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    cancelButton: {
        flex: 1,
        marginRight: 10,
        alignItems: 'center',
        paddingVertical: 15
    },
    cancelButtonText: {
        color: colors.textSecondary,
        fontWeight: 'bold',
        fontSize: 16
    }
});

export default AddTaskModal;