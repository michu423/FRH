import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase.config.js';

// Dwa osiągnięcia oparte na liczbie ukończonych treningów
const ACHIEVEMENTS = [
  {
    id: 'first_workout',
    name: 'Pierwsze kroki',
    description: 'Ukończ swój pierwszy trening w aplikacji',
    icon: 'flag',
    color: '#28a745',
    requiredWorkouts: 1,
  },
  {
    id: 'five_workouts',
    name: 'Regularna praktyka',
    description: 'Ukończ 5 treningów — dobra robota!',
    icon: 'trophy',
    color: '#ffc107',
    requiredWorkouts: 5,
  },
];

export default function AchievementsScreen() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [totalWorkouts, setTotalWorkouts] = useState(0);

  useEffect(() => {
    loadWorkoutCount();
  }, []);

  // Pobiera liczbę ukończonych treningów z kolekcji sessions w Firestore
  const loadWorkoutCount = async () => {
    try {
      const sessionsRef = collection(db, 'users', user.uid, 'sessions');
      const snapshot = await getDocs(sessionsRef);
      setTotalWorkouts(snapshot.size);
    } catch (error) {
      console.error('Błąd pobierania sesji:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#28a745" />
        <Text style={styles.loadingText}>Ładowanie osiągnięć...</Text>
      </View>
    );
  }

  const unlockedCount = ACHIEVEMENTS.filter(
    (a) => totalWorkouts >= a.requiredWorkouts
  ).length;

  return (
    <ScrollView style={styles.container}>
      {/* Nagłówek */}
      <View style={styles.header}>
        <Text style={styles.title}>Osiągnięcia</Text>
        <Text style={styles.subtitle}>
          {unlockedCount} / {ACHIEVEMENTS.length} odblokowanych
        </Text>
      </View>

      {/* Informacja o liczbie treningów */}
      <View style={styles.statsCard}>
        <Ionicons name="barbell" size={28} color="#28a745" />
        <View style={styles.statsText}>
          <Text style={styles.statsNumber}>{totalWorkouts}</Text>
          <Text style={styles.statsLabel}>ukończonych treningów</Text>
        </View>
      </View>

      {/* Lista osiągnięć */}
      <View style={styles.listContainer}>
        {ACHIEVEMENTS.map((achievement) => {
          const unlocked = totalWorkouts >= achievement.requiredWorkouts;
          return (
            <View
              key={achievement.id}
              style={[styles.card, !unlocked && styles.cardLocked]}
            >
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: unlocked ? achievement.color : '#dee2e6' },
                ]}
              >
                <Ionicons
                  name={unlocked ? achievement.icon : 'lock-closed'}
                  size={28}
                  color="white"
                />
              </View>
              <View style={styles.cardInfo}>
                <Text
                  style={[styles.cardName, !unlocked && styles.cardNameLocked]}
                >
                  {achievement.name}
                </Text>
                <Text style={styles.cardDescription}>
                  {achievement.description}
                </Text>
                {!unlocked && (
                  <Text style={styles.cardRequirement}>
                    Wymagane: {achievement.requiredWorkouts} treningów
                    (masz {totalWorkouts})
                  </Text>
                )}
              </View>
              {unlocked && (
                <Ionicons name="checkmark-circle" size={28} color="#28a745" />
              )}
            </View>
          );
        })}
      </View>

      <View style={{ height: 50 }} />
    </ScrollView>
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
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#7f8c8d',
  },
  header: {
    backgroundColor: '#28a745',
    padding: 30,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#e0e0e0',
  },
  statsCard: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statsText: {
    marginLeft: 15,
  },
  statsNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  statsLabel: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 18,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardLocked: {
    opacity: 0.6,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 4,
  },
  cardNameLocked: {
    color: '#7f8c8d',
  },
  cardDescription: {
    fontSize: 13,
    color: '#7f8c8d',
    lineHeight: 18,
  },
  cardRequirement: {
    fontSize: 12,
    color: '#adb5bd',
    marginTop: 4,
    fontStyle: 'italic',
  },
});