import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { trainingPlans } from '../../data/trainingPlans';

export default function PlansScreen() {
  const navigation = useNavigation();
  const [selectedLevel, setSelectedLevel] = useState('beginner');

  const levels = [
    { key: 'beginner', label: 'Początkujący', color: '#28a745' },
    { key: 'intermediate', label: 'Średniozaawansowany', color: '#ffc107' },
    { key: 'advanced', label: 'Zaawansowany', color: '#dc3545' },
  ];

  const filteredPlans = trainingPlans.filter(plan => plan.level === selectedLevel);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Plany treningowe</Text>
        <Text style={styles.subtitle}>Wybierz poziom zaawansowania</Text>
      </View>

      {/* Level selector */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.levelSelector}>
        {levels.map((level) => (
          <TouchableOpacity
            key={level.key}
            style={[
              styles.levelButton,
              selectedLevel === level.key && { backgroundColor: level.color }
            ]}
            onPress={() => setSelectedLevel(level.key)}
          >
            <Text style={[
              styles.levelText,
              selectedLevel === level.key && styles.levelTextActive
            ]}>
              {level.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Plans list */}
      <ScrollView style={styles.plansList}>
        {filteredPlans.map((plan) => (
          <TouchableOpacity
            key={plan.id}
            style={styles.planCard}
            onPress={() => navigation.navigate('PlanDetail', { plan })}
          >
            <View style={styles.planHeader}>
              <Ionicons name="barbell" size={32} color="#28a745" />
              <View style={styles.planInfo}>
                <Text style={styles.planName}>{plan.name}</Text>
                <Text style={styles.planLevel}>{plan.levelLabel}</Text>
              </View>
            </View>
            
            <Text style={styles.planGoal}>{plan.goal}</Text>
            
            <View style={styles.planDetails}>
              <View style={styles.detailItem}>
                <Ionicons name="calendar-outline" size={16} color="#7f8c8d" />
                <Text style={styles.detailText}>{plan.daysPerWeek} dni/tydzień</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="time-outline" size={16} color="#7f8c8d" />
                <Text style={styles.detailText}>{plan.duration}</Text>
              </View>
            </View>

            <View style={styles.arrow}>
              <Ionicons name="chevron-forward" size={24} color="#28a745" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  levelSelector: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    maxHeight: 80,
  },
  levelButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#dee2e6',
  },
  levelText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7f8c8d',
  },
  levelTextActive: {
    color: 'white',
  },
  plansList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  planCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  planInfo: {
    marginLeft: 15,
    flex: 1,
  },
  planName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 3,
  },
  planLevel: {
    fontSize: 14,
    color: '#28a745',
    fontWeight: '600',
  },
  planGoal: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
    marginBottom: 15,
  },
  planDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginLeft: 5,
  },
  arrow: {
    position: 'absolute',
    right: 20,
    top: '50%',
    marginTop: -12,
  },
});