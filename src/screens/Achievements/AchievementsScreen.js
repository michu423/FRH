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
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase.config.js';

// Definicja wszystkich osiągnięć w aplikacji.
// Każde osiągnięcie zawiera: id, nazwę, opis, ikonę, kolor
// oraz funkcję check(), która sprawdza czy zostało odblokowane
// na podstawie statystyk (stats) przekazanych z Firestore.
const ACHIEVEMENTS_DEFINITIONS = [
  {
    id: 'first_workout',
    name: 'Pierwsze kroki',
    description: 'Ukończ swój pierwszy trening',
    icon: 'flag',
    color: '#28a745',
    check: (stats) => stats.total >= 1,
  },
  {
    id: 'five_workouts',
    name: 'Regularna praktyka',
    description: 'Ukończ 5 treningów',
    icon: 'medal',
    color: '#fd7e14',
    check: (stats) => stats.total >= 5,
  },
  {
    id: 'ten_workouts',
    name: 'Zahartowany',
    description: 'Ukończ 10 treningów',
    icon: 'trophy',
    color: '#ffc107',
    check: (stats) => stats.total >= 10,
  },
  {
    id: 'twenty_five_workouts',
    name: 'Wojownik siłowni',
    description: 'Ukończ 25 treningów',
    icon: 'trophy',
    color: '#6f42c1',
    check: (stats) => stats.total >= 25,
  },
  {
    id: 'fifty_workouts',
    name: 'Legenda',
    description: 'Ukończ 50 treningów',
    icon: 'star',
    color: '#dc3545',
    check: (stats) => stats.total >= 50,
  },
  {
    id: 'three_day_streak',
    name: 'Trzy dni z rzędu',
    description: 'Trenuj przez 3 kolejne dni',
    icon: 'flame',
    color: '#fd7e14',
    check: (stats) => stats.streak >= 3,
  },
  {
    id: 'seven_day_streak',
    name: 'Tygodniowy wojownik',
    description: 'Trenuj przez 7 kolejnych dni',
    icon: 'flame',
    color: '#dc3545',
    check: (stats) => stats.streak >= 7,
  },
  {
    id: 'week_worker',
    name: 'Pracowity tydzień',
    description: 'Wykonaj 4 treningi w ciągu jednego tygodnia',
    icon: 'calendar',
    color: '#007bff',
    check: (stats) => stats.maxInOneWeek >= 4,
  },
  {
    id: 'month_worker',
    name: 'Miesięczna misja',
    description: 'Wykonaj 12 treningów w jednym miesiącu',
    icon: 'calendar',
    color: '#6f42c1',
    check: (stats) => stats.maxInOneMonth >= 12,
  },
  {
    id: 'early_bird',
    name: 'Ranny ptaszek',
    description: 'Ukończ trening przed godziną 8:00',
    icon: 'sunny',
    color: '#ffc107',
    check: (stats) => stats.hasEarlyWorkout,
  },
];

// Oblicza statystyki potrzebne do sprawdzenia osiągnięć.
function calculateStats(sessions) {
  const total = sessions.length;

  // --- Seria dni z rzędu (streak) ---
  const uniqueDays = [
    ...new Set(
      sessions.map((s) => {
        const d = s.date?.toDate ? s.date.toDate() : new Date(s.date);
        return d.toISOString().split('T')[0];
      })
    ),
  ].sort((a, b) => new Date(b) - new Date(a));

  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  let streak = 0;
  if (uniqueDays.length > 0 && (uniqueDays[0] === today || uniqueDays[0] === yesterday)) {
    streak = 1;
    for (let i = 1; i < uniqueDays.length; i++) {
      const prev = new Date(uniqueDays[i - 1]);
      const curr = new Date(uniqueDays[i]);
      const diff = Math.floor((prev - curr) / 86400000);
      if (diff === 1) {
        streak++;
      } else {
        break;
      }
    }
  }

  // --- Maksymalna liczba treningów w jednym tygodniu ---
  const weekMap = {};
  sessions.forEach((s) => {
    const d = s.date?.toDate ? s.date.toDate() : new Date(s.date);
    // Klucz tygodnia: rok + numer tygodnia ISO
    const year = d.getFullYear();
    const startOfYear = new Date(year, 0, 1);
    const weekNumber = Math.ceil(((d - startOfYear) / 86400000 + startOfYear.getDay() + 1) / 7);
    const key = `${year}-W${weekNumber}`;
    weekMap[key] = (weekMap[key] || 0) + 1;
  });
  const maxInOneWeek = weekMap && Object.keys(weekMap).length > 0
    ? Math.max(...Object.values(weekMap))
    : 0;

  // --- Maksymalna liczba treningów w jednym miesiącu ---
  const monthMap = {};
  sessions.forEach((s) => {
    const d = s.date?.toDate ? s.date.toDate() : new Date(s.date);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    monthMap[key] = (monthMap[key] || 0) + 1;
  });
  const maxInOneMonth = monthMap && Object.keys(monthMap).length > 0
    ? Math.max(...Object.values(monthMap))
    : 0;

  // --- Trening przed 8:00 ---
  const hasEarlyWorkout = sessions.some((s) => {
    const d = s.date?.toDate ? s.date.toDate() : new Date(s.date);
    return d.getHours() < 8;
  });

  return { total, streak, maxInOneWeek, maxInOneMonth, hasEarlyWorkout };
}

export default function AchievementsScreen() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [achievements, setAchievements] = useState([]);
  const [unlockedCount, setUnlockedCount] = useState(0);

  useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements = async () => {
    try {
      const sessionsRef = collection(db, 'users', user.uid, 'sessions');
      const q = query(sessionsRef, orderBy('date', 'desc'));
      const snapshot = await getDocs(q);
      const sessions = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      const stats = calculateStats(sessions);

      // Sprawdzamy każde osiągnięcie i zapisujemy wynik (odblokowane / nie)
      const evaluated = ACHIEVEMENTS_DEFINITIONS.map((achievement) => ({
        ...achievement,
        unlocked: achievement.check(stats),
      }));

      setAchievements(evaluated);
      setUnlockedCount(evaluated.filter((a) => a.unlocked).length);
    } catch (error) {
      console.error('Błąd ładowania osiągnięć:', error);
      // Nawet przy błędzie pokazujemy osiągnięcia (wszystkie zablokowane)
      setAchievements(ACHIEVEMENTS_DEFINITIONS.map((a) => ({ ...a, unlocked: false })));
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

  const unlockedAchievements = achievements.filter((a) => a.unlocked);
  const lockedAchievements = achievements.filter((a) => !a.unlocked);

  return (
    <ScrollView style={styles.container}>
      {/* Nagłówek */}
      <View style={styles.header}>
        <Text style={styles.title}>Osiągnięcia</Text>
        <Text style={styles.subtitle}>
          {unlockedCount} / {achievements.length} odblokowanych
        </Text>
      </View>

      {/* Pasek postępu */}
      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Ionicons name="trophy" size={24} color="#ffc107" />
          <Text style={styles.progressTitle}>Twój postęp</Text>
        </View>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: achievements.length > 0
                  ? `${(unlockedCount / achievements.length) * 100}%`
                  : '0%',
              },
            ]}
          />
        </View>
        <Text style={styles.progressHint}>
          Odblokowano {unlockedCount} z {achievements.length} osiągnięć
        </Text>
      </View>

      {/* Odblokowane osiągnięcia */}
      {unlockedAchievements.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✅ Odblokowane</Text>
          {unlockedAchievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </View>
      )}

      {/* Zablokowane osiągnięcia */}
      {lockedAchievements.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔒 Do odblokowania</Text>
          {lockedAchievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </View>
      )}

      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

// Komponent karty pojedynczego osiągnięcia
function AchievementCard({ achievement }) {
  return (
    <View style={[styles.card, !achievement.unlocked && styles.cardLocked]}>
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: achievement.unlocked ? achievement.color : '#dee2e6' },
        ]}
      >
        <Ionicons
          name={achievement.unlocked ? achievement.icon : 'lock-closed'}
          size={28}
          color="white"
        />
      </View>
      <View style={styles.cardInfo}>
        <Text style={[styles.cardName, !achievement.unlocked && styles.cardNameLocked]}>
          {achievement.name}
        </Text>
        <Text style={styles.cardDescription}>{achievement.description}</Text>
      </View>
      {achievement.unlocked && (
        <Ionicons name="checkmark-circle" size={24} color="#28a745" />
      )}
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
  progressCard: {
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
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginLeft: 10,
  },
  progressBar: {
    height: 12,
    backgroundColor: '#e9ecef',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#ffc107',
    borderRadius: 6,
  },
  progressHint: {
    fontSize: 13,
    color: '#7f8c8d',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
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
    width: 52,
    height: 52,
    borderRadius: 26,
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
    marginBottom: 3,
  },
  cardNameLocked: {
    color: '#7f8c8d',
  },
  cardDescription: {
    fontSize: 13,
    color: '#7f8c8d',
    lineHeight: 18,
  },
});