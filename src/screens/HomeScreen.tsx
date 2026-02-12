import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Text, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ScreenWrapper from '../components/ScreenWrapper';
import TaskItem from '../components/TaskItem';
import AddTaskModal from '../components/AddTaskModal';
import { colors } from '../theme/colors';
import { RootState, AppDispatch } from '../redux/store';
import { addTask, toggleTaskCompletion, fetchTasks, deleteTask } from '../service/FirebaseFirestore';
import { Priority } from '../types/task';

const HomeScreen = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { tasks, loading } = useSelector((state: RootState) => state.todos);
    const [isModalVisible, setModalVisible] = useState(false);

    // 1. Fetch data when screen loads
    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const handleAddTask = (taskData: { title: string; description: string; priority: Priority; date: string; deadline: string }) => {
        dispatch(addTask(taskData));
        setModalVisible(false);
    };

    const handleToggle = (id: string, currentStatus: boolean) => {
        dispatch(toggleTaskCompletion({ id, isCompleted: currentStatus }));
    };

    const handleDelete = (id: string) => {
        Alert.alert(
            "Delete Task",
            "Are you sure you want to delete this task?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => dispatch(deleteTask(id))
                }
            ]
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <ScreenWrapper>
                {/* Header */}
                <Text style={styles.headerTitle}>My Tasks</Text>

                {loading && tasks.length === 0 ? (
                    <ActivityIndicator size="large" color={colors.primaryButton} style={{ marginTop: 20 }} />
                ) : (
                    <FlatList
                        data={tasks}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TaskItem
                                task={item}
                                onToggle={() => handleToggle(item.id, item.isCompleted)}
                                onDelete={handleDelete}
                            />
                        )}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={
                            <Text style={styles.emptyText}>No tasks yet. Add one!</Text>
                        }
                    />
                )}
            </ScreenWrapper>

            {/* Floating Add Button */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => setModalVisible(true)}
            >
                <Icon name="plus" size={30} color={colors.white} />
            </TouchableOpacity>

            <AddTaskModal
                isVisible={isModalVisible}
                onClose={() => setModalVisible(false)}
                onSave={handleAddTask}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.textPrimary,
        marginBottom: 15,
    },
    listContent: {
        paddingBottom: 80,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        color: colors.textSecondary,
        fontSize: 16
    },
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: colors.primaryButton,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    }
});

export default HomeScreen;