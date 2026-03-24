import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { trainingPlans } from '../../data/trainingPlans';

export default function HomeScreen() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [activePlan, setActivePlan] = useState(null);

  useEffect(() => {
    loadActivePlan();
  }, [user]);

  const loadActivePlan = async () => {
    if (!user?.profile?.activePlan) {
      setActivePlan(null);
      return;
    }

    const planId = user.profile.activePlan;
    const foundPlan = trainingPlans.find(p => p.id === planId);
    
    if (foundPlan) {
      setActivePlan(foundPlan);
    }
  };

  const startWorkout = () => {
    if (activePlan) {
      navigation.navigate('Workout', {
        planId: activePlan.id,
        dayIndex: 0,
      });
    } else {
      // Alert z przyciskiem nawigacji — na web uproszczony
      if (Platform.OS === 'web') {
        const goToPlans = window.confirm('Brak planu\nWybierz najpierw plan treningowy.\n\nKliknij OK aby przejść do planów.');
        if (goToPlans) {
          navigation.navigate('PlansTab');
        }
      } else {
        Alert.alert(
          'Brak planu', 
          'Wybierz najpierw plan treningowy',
          [
            { text: 'Anuluj', style: 'cancel' },
            { text: 'Wybierz plan', onPress: () => navigation.navigate('PlansTab') }
          ]
        );
      }
    }
  };

  const menuItems = [
    { 
      id: 1, 
      title: 'Rozpocznij trening', 
      icon: 'play-circle', 
      color: '#28a745', 
      action: startWorkout,
      subtitle: activePlan ? activePlan.name : 'Wybierz plan'
    },
    { 
      id: 2, 
      title: 'Plany treningowe', 
      icon: 'calendar', 
      color: '#007bff', 
      screen: 'PlansTab',
      subtitle: 'Wybierz swój plan'
    },
    { 
      id: 3, 
      title: 'Baza ćwiczeń', 
      icon: 'barbell', 
      color: '#6f42c1', 
      screen: 'ExercisesTab',
      subtitle: 'Przeglądaj wszystkie ćwiczenia'
    },
    { 
      id: 4, 
      title: 'Postępy', 
      icon: 'stats-chart', 
      color: '#ffc107', 
      screen: 'ProgressTab',
      subtitle: 'Zobacz swoją historię'
    },
    { 
      id: 5, 
      title: 'Kalkulator kalorii', 
      icon: 'calculator', 
      color: '#fd7e14', 
      screen: 'ProfileTab',
      subtitle: 'Oblicz zapotrzebowanie'
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Witaj, {user?.profile?.name || 'Użytkowniku'}!</Text>
        <Text style={styles.subtitle}>Co chcesz dzisiaj zrobić?</Text>
      </View>

      <View style={styles.spacer} />

      <View style={styles.menuGrid}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.menuCard, { borderLeftColor: item.color }]}
            onPress={() => {
              if (item.action) {
                item.action();
              } else if (item.screen) {
                navigation.navigate(item.screen);
              }
            }}
          >
            <Ionicons name={item.icon} size={36} color={item.color} />
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#dee2e6" />
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ height: 30 }} />
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
    paddingBottom: 20,
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
  spacer: {
    height: 40,
    backgroundColor: '#f8f9fa',
  },
  menuGrid: {
    paddingHorizontal: 20,
    paddingTop: 10,
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
  menuTextContainer: {
    flex: 1,
    marginLeft: 20,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 3,
  },
  menuSubtitle: {
    fontSize: 13,
    color: '#7f8c8d',
  },
});