import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase.config.js';
import { useAuth } from '../../context/AuthContext';

export default function PlanDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { plan } = route.params;
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleActivatePlan = async () => {
    setLoading(true);
    try {
      // zapisz plan do bazy danych użytkownika firestore
      await updateDoc(doc(db, 'users', user.uid), {
        activePlan: plan.id,
        activePlanName: plan.name,
      });

      Alert.alert(
        'Sukces!',
        `Plan "${plan.name}" został aktywowany!`,
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się aktywować planu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header z przyciskiem wstecz */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>{plan.name}</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Info card */}
        <View style={styles.infoCard}>
          <Text style={styles.levelBadge}>{plan.levelLabel}</Text>
          <Text style={styles.goal}>{plan.goal}</Text>
          
          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Ionicons name="calendar" size={24} color="#28a745" />
              <Text style={styles.statLabel}>{plan.daysPerWeek} dni/tydzień</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="time" size={24} color="#28a745" />
              <Text style={styles.statLabel}>{plan.duration}</Text>
            </View>
          </View>

          <Text style={styles.description}>{plan.description}</Text>
        </View>

        {/* Days */}
        <Text style={styles.sectionTitle}>Plan treningowy</Text>
        {plan.days.map((day, index) => (
          <View key={index} style={styles.dayCard}>
            <Text style={styles.dayTitle}>Dzień {day.day}: {day.name}</Text>
            {day.exercises.map((exercise, exIndex) => (
              <View key={exIndex} style={styles.exerciseRow}>
                <Ionicons name="fitness-outline" size={18} color="#28a745" />
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <Text style={styles.exerciseSets}>{exercise.sets} x {exercise.reps}</Text>
              </View>
            ))}
          </View>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Activate button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.activateButton, loading && styles.buttonDisabled]}
          onPress={handleActivatePlan}
          disabled={loading}
        >
          <Ionicons name="checkmark-circle" size={24} color="white" />
          <Text style={styles.buttonText}>
            {loading ? 'Aktywowanie...' : 'Rozpocznij ten plan'}
          </Text>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
  },
  content: {
    flex: 1,
  },
  infoCard: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  levelBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#28a745',
    color: 'white',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  goal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 5,
  },
  description: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  dayCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 15,
    borderRadius: 12,
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  exerciseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  exerciseName: {
    flex: 1,
    fontSize: 14,
    color: '#2c3e50',
    marginLeft: 10,
  },
  exerciseSets: {
    fontSize: 14,
    color: '#7f8c8d',
    fontWeight: '600',
  },
  footer: {
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  activateButton: {
    backgroundColor: '#28a745',
    padding: 18,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});