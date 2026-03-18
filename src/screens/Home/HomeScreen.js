import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const { user } = useAuth();
  const navigation = useNavigation();

  const menuItems = [
    { id: 1, title: 'Plany treningowe', icon: 'calendar', color: '#28a745', screen: 'PlansTab' },
    { id: 2, title: 'Baza ćwiczeń', icon: 'barbell', color: '#007bff', screen: 'ExercisesTab' },
    { id: 3, title: 'Postępy', icon: 'stats-chart', color: '#ffc107', screen: 'ProgressTab' },
    { id: 4, title: 'Kalkulator kalorii', icon: 'calculator', color: '#fd7e14', screen: 'ProfileTab' },
    { id: 5, title: 'Rehabilitacja', icon: 'medical', color: '#dc3545', screen: 'PlansTab' },
    { id: 6, title: 'Ćwiczenia biurowe', icon: 'desktop', color: '#6c757d', screen: 'ExercisesTab' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Witaj, {user?.profile?.name || 'Użytkowniku'}! 👋</Text>
        <Text style={styles.subtitle}>Gotowy na trening?</Text>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Ionicons name="flame" size={28} color="#ff6b6b" />
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Treningi</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="trophy" size={28} color="#ffd700" />
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Osiągnięcia</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="time" size={28} color="#4dabf7" />
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Dni z rzędu</Text>
        </View>
      </View>

      {/* Menu Cards */}
      <Text style={styles.sectionTitle}>Co chcesz dzisiaj zrobić?</Text>
      <View style={styles.menuGrid}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.menuCard, { borderLeftColor: item.color }]}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Ionicons name={item.icon} size={32} color={item.color} />
            <Text style={styles.menuTitle}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#28a745',
    padding: 30,
    paddingTop: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  greeting: {
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  menuGrid: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  menuCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginLeft: 20,
  },
});