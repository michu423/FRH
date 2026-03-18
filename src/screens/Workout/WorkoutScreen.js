import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { trainingPlans } from '../../data/trainingPlans';

export default function WorkoutScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { planId, dayIndex } = route.params;

  const [plan, setPlan] = useState(null);
  const [currentDay, setCurrentDay] = useState(null);
  const [startTime] = useState(new Date());

  useEffect(() => {
    loadPlan();
  }, []);

  const loadPlan = () => {
    const foundPlan = trainingPlans.find(p => p.id === planId);
    if (foundPlan && foundPlan.days[dayIndex]) {
      setPlan(foundPlan);
      setCurrentDay(foundPlan.days[dayIndex]);
    } else {
      Alert.alert('Błąd', 'Nie znaleziono planu treningowego');
      navigation.goBack();
    }
  };

  const handleFinishWorkout = () => {
    const endTime = new Date();
    const duration = Math.round((endTime - startTime) / 60000); // minuty
    const totalExercises = currentDay?.exercises?.length || 0;

    navigation.navigate('WorkoutComplete', {
      planName: plan.name,
      dayName: currentDay.name,
      dayId: currentDay.day,
      planId: plan.id,
      completed: totalExercises, // Wszystkie jako wykonane
      total: totalExercises,
      duration,
    });
  };

  if (!currentDay || !plan) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Ładowanie...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="close" size={28} color="white" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>{plan.name}</Text>
          <Text style={styles.headerSubtitle}>{currentDay.name}</Text>
        </View>
      </View>

      {/* Info card */}
      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={24} color="#007bff" />
        <Text style={styles.infoText}>
          Wykonaj poniższe ćwiczenia, a następnie kliknij "Zakończ trening"
        </Text>
      </View>

      {/* Lista ćwiczeń (tylko do podglądu) */}
      <ScrollView style={styles.exerciseList}>
        <Text style={styles.listTitle}>Twój plan na dzisiaj:</Text>
        {currentDay.exercises.map((exercise, index) => (
          <View key={index} style={styles.exerciseCard}>
            <View style={styles.exerciseNumber}>
              <Text style={styles.exerciseNumberText}>{index + 1}</Text>
            </View>
            <View style={styles.exerciseInfo}>
              <Text style={styles.exerciseName}>{exercise.name}</Text>
              <Text style={styles.exerciseSets}>
                {exercise.sets} serie × {exercise.reps} powtórzeń
              </Text>
            </View>
            <Ionicons name="barbell-outline" size={24} color="#28a745" />
          </View>
        ))}
      </ScrollView>

      {/* Przycisk zakończenia */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.finishButton} onPress={handleFinishWorkout}>
          <Ionicons name="checkmark-circle" size={24} color="white" />
          <Text style={styles.finishButtonText}>Zakończ trening</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#28a745',
    padding: 20,
    paddingTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 3,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#e0e0e0',
  },
  infoCard: {
    backgroundColor: '#e7f3ff',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#007bff',
  },
  infoText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#004085',
    lineHeight: 20,
  },
  exerciseList: {
    flex: 1,
    padding: 20,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  exerciseCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 18,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  exerciseNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#28a745',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  exerciseNumberText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  exerciseSets: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  footer: {
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  finishButton: {
    backgroundColor: '#28a745',
    padding: 18,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  finishButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});