import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../theme/colors';
import { Task, Priority } from '../types/task';

interface TaskItemProps {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void; // <--- Add this new prop
}

const getPriorityColor = (priority: Priority) => {
    switch (priority) {
        case 'High': return colors.error;
        case 'Medium': return 'orange';
        case 'Low': return colors.primaryButton;
        default: return colors.textSecondary;
    }
};

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
    return (
        <View style={styles.container}>
            {/* Left Checkbox */}
            <TouchableOpacity onPress={() => onToggle(task.id)} style={styles.checkboxContainer}>
                <Icon
                    name={task.isCompleted ? "checkbox-marked-circle-outline" : "checkbox-blank-circle-outline"}
                    size={28}
                    color={task.isCompleted ? colors.primaryButton : colors.textSecondary}
                />
            </TouchableOpacity>

            {/* Middle Text */}
            <View style={styles.textContainer}>
                <Text style={[styles.title, task.isCompleted && styles.completedText]}>
                    {task.title}
                </Text>
                {task.description ? (
                    <Text style={styles.description} numberOfLines={1}>
                        {task.description}
                    </Text>
                ) : null}
                <Text style={styles.dateText}>{task.date}</Text>
            </View>

            {/* Right Side: Priority & Delete */}
            <View style={styles.rightContainer}>
                <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(task.priority) }]}>
                    <Text style={styles.priorityText}>{task.priority}</Text>
                </View>

                {/* Delete Button */}
                <TouchableOpacity onPress={() => onDelete(task.id)} style={styles.deleteButton}>
                    <Icon name="trash-can-outline" size={24} color={colors.error} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        padding: 15,
        borderRadius: 15,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    checkboxContainer: {
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.textPrimary,
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: colors.textSecondary,
    },
    description: {
        fontSize: 12,
        color: colors.textSecondary,
        marginTop: 2,
    },
    dateText: {
        fontSize: 10,
        color: '#999',
        marginTop: 4
    },
    rightContainer: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: '100%'
    },
    priorityBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
        marginBottom: 8
    },
    priorityText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: colors.white
    },
    deleteButton: {
        padding: 5
    }
});

export default TaskItem;