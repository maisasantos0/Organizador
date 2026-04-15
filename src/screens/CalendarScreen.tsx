import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { CalendarView } from '../components/Calendar/CalendarView';
import { useTasks } from '../hooks/useTasks';

export const CalendarScreen: React.FC = () => {
  const { tasks, getTasksByDate, loading } = useTasks();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando tarefas...</Text>
      </View>
    );
  }

  const selectedTasks = selectedDate ? getTasksByDate(selectedDate) : [];

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Calendário</Text>
      <CalendarView
        currentMonth={new Date()}
        tasks={tasks}
        onSelectDate={setSelectedDate}
      />

      <View style={styles.taskSection}>
        {selectedDate ? (
          <>
            <Text style={styles.taskTitle}>Tarefas de {selectedDate}</Text>
            {selectedTasks.length === 0 ? (
              <Text style={styles.emptyText}>Nenhuma tarefa registrada para este dia.</Text>
            ) : (
              <ScrollView contentContainerStyle={styles.taskList} showsVerticalScrollIndicator={false}>
                {selectedTasks.map(task => (
                  <View key={task.id} style={styles.taskCard}>
                    <Text style={styles.taskCardTitle}>{task.name}</Text>
                    <Text style={styles.taskCardDate}>{task.date}</Text>
                  </View>
                ))}
              </ScrollView>
            )}
          </>
        ) : (
          <Text style={styles.emptyText}>Toque em um dia do calendário para ver as tarefas.</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F3FF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F3FF',
  },
  loadingText: {
    color: '#6F5AE0',
    fontSize: 16,
    fontWeight: '600',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#3D2C8D',
    marginTop: 24,
    marginLeft: 24,
  },
  taskSection: {
    flex: 1,
    marginTop: 16,
    paddingHorizontal: 24,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#422C99',
    marginBottom: 12,
  },
  taskList: {
    paddingBottom: 24,
  },
  taskCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(141, 96, 198, 0.14)',
  },
  taskCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D1D83',
    marginBottom: 6,
  },
  taskCardDate: {
    fontSize: 14,
    color: '#7D7A9A',
  },
  emptyText: {
    color: '#7D7A9A',
    fontSize: 16,
    marginTop: 10,
  },
});
