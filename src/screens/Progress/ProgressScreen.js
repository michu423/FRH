import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase.config.js';

export default function ProgressScreen() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    thisWeek: 0,
    thisMonth: 0,
    streak: 0,
  });

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      // Pobierz sesje treningowe użytkownika
      const sessionsRef = collection(db, 'users', user.uid, 'sessions');
      const q = query(sessionsRef, orderBy('date', 'desc'));
      const snapshot = await getDocs(q);
      
      const sessionsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setSessions(sessionsData);
      calculateStats(sessionsData);
    } catch (error) {
      console.error('Błąd ładowania sesji:', error);
      setSessions([]);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (sessionsData) => {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const thisWeek = sessionsData.filter(s => {
      const sessionDate = s.date?.toDate ? s.date.toDate() : new Date(s.date);
      return sessionDate >= oneWeekAgo;
    }).length;

    const thisMonth = sessionsData.filter(s => {
      const sessionDate = s.date?.toDate ? s.date.toDate() : new Date(s.date);
      return sessionDate >= oneMonthAgo;
    }).length;

    // Oblicz streak - dni
    let streak = 0;
    const sortedDates = sessionsData
      .map(s => {
        const d = s.date?.toDate ? s.date.toDate() : new Date(s.date);
        return d.toISOString().split('T')[0];
      })
      .filter((v, i, a) => a.indexOf(v) === i) // unikalne dni
      .sort((a, b) => new Date(b) - new Date(a));

    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    if (sortedDates.length > 0) {
      if (sortedDates[0] === today || sortedDates[0] === yesterday) {
        streak = 1;
        for (let i = 1; i < sortedDates.length; i++) {
          const prevDate = new Date(sortedDates[i - 1]);
          const currDate = new Date(sortedDates[i]);
          const diffDays = Math.floor((prevDate - currDate) / (24 * 60 * 60 * 1000));
          if (diffDays === 1) {
            streak++;
          } else {
            break;
          }
        }
      }
    }

    setStats({
      totalWorkouts: sessionsData.length,
      thisWeek,
      thisMonth,
      streak,
    });
  };

  const formatDate = (dateField) => {
    if (!dateField) return 'Brak daty';
    const date = dateField.toDate ? dateField.toDate() : new Date(dateField);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const formatTime = (dateField) => {
    if (!dateField) return '';
    const date = dateField.toDate ? dateField.toDate() : new Date(dateField);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#28a745" />
        <Text style={styles.loadingText}>Ładowanie postępów...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Twoje postępy</Text>
        <Text style={styles.subtitle}>Śledź swoje treningi</Text>
      </View>

      {/* Statystyki */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Ionicons name="barbell" size={28} color="#28a745" />
          <Text style={styles.statNumber}>{stats.totalWorkouts}</Text>
          <Text style={styles.statLabel}>Wszystkie treningi</Text>
        </View>

        <View style={styles.statCard}>
          <Ionicons name="calendar" size={28} color="#007bff" />
          <Text style={styles.statNumber}>{stats.thisWeek}</Text>
          <Text style={styles.statLabel}>W tym tygodniu</Text>
        </View>

        <View style={styles.statCard}>
          <Ionicons name="flame" size={28} color="#ff6b6b" />
          <Text style={styles.statNumber}>{stats.streak}</Text>
          <Text style={styles.statLabel}>Dni z rzędu</Text>
        </View>
      </View>

      {/* Postęp miesięczny */}
      <View style={styles.monthCard}>
        <View style={styles.monthHeader}>
          <Ionicons name="trending-up" size={24} color="#28a745" />
          <Text style={styles.monthTitle}>Ten miesiąc</Text>
        </View>
        <Text style={styles.monthNumber}>{stats.thisMonth} treningów</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${Math.min((stats.thisMonth / 20) * 100, 100)}%` }]} />
        </View>
        <Text style={styles.progressHint}>Cel: 20 treningów/miesiąc</Text>
      </View>

      {/* Historia treningów */}
      <View style={styles.historySection}>
        <Text style={styles.historyTitle}>📅 Historia treningów</Text>

        {sessions.length > 0 ? (
          sessions.map((session) => (
            <View key={session.id} style={styles.sessionCard}>
              <View style={styles.sessionIcon}>
                <Ionicons name="checkmark-circle" size={32} color="#28a745" />
              </View>
              <View style={styles.sessionInfo}>
                <Text style={styles.sessionPlan}>{session.planName || 'Trening'}</Text>
                <Text style={styles.sessionDay}>{session.dayName || `Dzień ${session.dayId || 1}`}</Text>
                <Text style={styles.sessionDate}>
                  {formatDate(session.date)} • {formatTime(session.date)}
                </Text>
              </View>
              <View style={styles.sessionBadge}>
                <Ionicons name="fitness" size={20} color="#28a745" />
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="barbell-outline" size={80} color="#dee2e6" />
            <Text style={styles.emptyTitle}>Brak treningów</Text>
            <Text style={styles.emptyText}>
              Rozpocznij swój pierwszy trening, aby zobaczyć postępy!
            </Text>
            <TouchableOpacity style={styles.emptyButton}>
              <Text style={styles.emptyButtonText}>Wybierz plan treningowy</Text>
            </TouchableOpacity>
          </View>
        )}
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginTop: -30,
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 11,
    color: '#7f8c8d',
    marginTop: 4,
    textAlign: 'center',
  },
  monthCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginLeft: 10,
  },
  monthNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#28a745',
    marginBottom: 15,
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
    backgroundColor: '#28a745',
    borderRadius: 6,
  },
  progressHint: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  historySection: {
    paddingHorizontal: 20,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  sessionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sessionIcon: {
    marginRight: 15,
  },
  sessionInfo: {
    flex: 1,
  },
  sessionPlan: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 3,
  },
  sessionDay: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 3,
  },
  sessionDate: {
    fontSize: 12,
    color: '#adb5bd',
  },
  sessionBadge: {
    backgroundColor: '#e8f5e9',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 40,
    marginBottom: 20,
  },
  emptyButton: {
    backgroundColor: '#28a745',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
  },
  emptyButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});