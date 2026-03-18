import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function ExerciseDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { exercise } = route.params;

  const getDifficultyColor = (diff) => {
    switch(diff) {
      case 'beginner': return '#28a745';
      case 'intermediate': return '#ffc107';
      case 'advanced': return '#dc3545';
      default: return '#7f8c8d';
    }
  };

  const getDifficultyLabel = (diff) => {
    switch(diff) {
      case 'beginner': return 'Początkujący';
      case 'intermediate': return 'Średniozaawansowany';
      case 'advanced': return 'Zaawansowany';
      default: return '';
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>{exercise.name}</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Info card */}
        <View style={styles.infoCard}>
          <View style={styles.badges}>
            <View style={[styles.badge, { backgroundColor: getDifficultyColor(exercise.difficulty) }]}>
              <Text style={styles.badgeText}>{getDifficultyLabel(exercise.difficulty)}</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: '#007bff' }]}>
              <Text style={styles.badgeText}>{exercise.categoryLabel}</Text>
            </View>
          </View>

          <Text style={styles.description}>{exercise.description}</Text>
        </View>

        {/* Zaangażowane mięśnie */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="body" size={20} color="#2c3e50" /> Zaangażowane mięśnie
          </Text>
          <View style={styles.musclesList}>
            {exercise.muscles.map((muscle, idx) => (
              <View key={idx} style={styles.muscleItem}>
                <Ionicons name="checkmark-circle" size={20} color="#28a745" />
                <Text style={styles.muscleText}>{muscle}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Wskazówki */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="bulb" size={20} color="#2c3e50" /> Wskazówki techniczne
          </Text>
          {exercise.tips.map((tip, idx) => (
            <View key={idx} style={styles.tipItem}>
              <Text style={styles.tipNumber}>{idx + 1}</Text>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>

        {/* Bezpieczeństwo */}
        {exercise.safety && (
        <View style={styles.section}>
          <View style={styles.safetyCard}>
            <Ionicons name="warning" size={24} color="#dc3545" />
            <View style={styles.safetyContent}>
              <Text style={styles.safetyTitle}>BHP podczas wykonywania ćwiczenia</Text>
              <Text style={styles.safetyText}>{exercise.safety}</Text>
            </View>
          </View>
        </View>
        )}

        <View style={{ height: 50 }} />
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
    padding: 20,
    paddingTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 18,
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
  badges: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 10,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#2c3e50',
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  musclesList: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
  },
  muscleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  muscleText: {
    fontSize: 15,
    color: '#2c3e50',
    marginLeft: 12,
  },
  tipItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  tipNumber: {
    width: 28,
    height: 28,
    backgroundColor: '#28a745',
    color: 'white',
    textAlign: 'center',
    lineHeight: 28,
    borderRadius: 14,
    fontWeight: 'bold',
    marginRight: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#2c3e50',
    lineHeight: 20,
  },
  safetyCard: {
    flexDirection: 'row',
    backgroundColor: '#fff3cd',
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#dc3545',
  },
  safetyContent: {
    flex: 1,
    marginLeft: 12,
  },
  safetyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#dc3545',
    marginBottom: 5,
  },
  safetyText: {
    fontSize: 14,
    color: '#856404',
    lineHeight: 20,
  },
});