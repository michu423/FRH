import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../../firebase.config.js';

export default function WorkoutCompleteScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useAuth();
  const { planName, dayName, dayId, planId, completed, total, duration } = route.params;

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    saveWorkoutSession();
  }, []);

  const saveWorkoutSession = async () => {
    try {
      const sessionsRef = collection(db, 'users', user.uid, 'sessions');
      await addDoc(sessionsRef, {
        planId,
        planName,
        dayId,
        dayName,
        completed,
        total,
        duration,
        date: Timestamp.now(),
        createdAt: Timestamp.now(),
      });
      setSaved(true);
    } catch (error) {
      console.error('Błąd zapisu sesji:', error);
    }
  };

  const percentage = Math.round((completed / total) * 100);

  return (
    <View style={styles.container}>
      {/* Success animation */}
      <View style={styles.iconContainer}>
        <Ionicons name="checkmark-circle" size={120} color="#28a745" />
      </View>

      <Text style={styles.title}>Gratulacje! 🎉</Text>
      <Text style={styles.subtitle}>Trening ukończony!</Text>

      {/* Stats */}
      <View style={styles.statsCard}>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Plan:</Text>
          <Text style={styles.statValue}>{planName}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Dzień:</Text>
          <Text style={styles.statValue}>{dayName}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Ćwiczenia:</Text>
          <Text style={styles.statValue}>{completed}/{total} ({percentage}%)</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Czas:</Text>
          <Text style={styles.statValue}>{duration} min</Text>
        </View>
      </View>

      {/*励励 */}
      {percentage === 100 && (
        <View style={styles.perfectCard}>
          <Ionicons name="trophy" size={32} color="#ffd700" />
          <Text style={styles.perfectText}>Perfekcyjne wykonanie! 💪</Text>
        </View>
      )}

      {saved && (
        <Text style={styles.savedText}>✅ Trening zapisany w postępach</Text>
      )}

      {/* Przyciski */}
      <TouchableOpacity
        style={styles.progressButton}
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Main' }],
          });
          navigation.navigate('Main', { screen: 'ProgressTab' });
        }}
      >
        <Ionicons name="stats-chart" size={20} color="white" />
        <Text style={styles.progressButtonText}>Zobacz postępy</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Main' }],
          });
        }}
      >
        <Text style={styles.homeButtonText}>Wróć do głównej</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  iconContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 40,
  },
  statsCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    width: '100%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  statLabel: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  perfectCard: {
    backgroundColor: '#fff3cd',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  perfectText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#856404',
  },
  savedText: {
    fontSize: 14,
    color: '#28a745',
    marginBottom: 30,
    fontWeight: '600',
  },
  progressButton: {
    backgroundColor: '#28a745',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 15,
    width: '100%',
    justifyContent: 'center',
  },
  progressButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  homeButton: {
    paddingVertical: 15,
  },
  homeButtonText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: '600',
  },
});