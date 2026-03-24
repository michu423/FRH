import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { exercises, categories } from '../../data/exercises';

export default function ExercisesScreen() {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // filtrowanie ćwiczeń
  const filteredExercises = exercises.filter(ex => {
    const matchCategory = selectedCategory === 'all' || ex.category === selectedCategory;
    const matchSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Baza ćwiczeń</Text>
        <Text style={styles.subtitle}>{exercises.length} ćwiczeń</Text>
      </View>

      {/* Wyszukiwarka */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#7f8c8d" />
        <TextInput
          style={styles.searchInput}
          placeholder="Szukaj ćwiczenia..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="#7f8c8d" />
          </TouchableOpacity>
        )}
      </View>

      {/* Filtry */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {categories.map(cat => (
          <TouchableOpacity
            key={cat.key}
            style={[
              styles.categoryButton,
              selectedCategory === cat.key && styles.categoryButtonActive
            ]}
            onPress={() => setSelectedCategory(cat.key)}
          >
            <Ionicons
              name={cat.icon}
              size={20}
              color={selectedCategory === cat.key ? 'white' : '#7f8c8d'}
            />
            <Text style={[
              styles.categoryText,
              selectedCategory === cat.key && styles.categoryTextActive
            ]}>
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Lista ćwiczeń */}
      <ScrollView style={styles.exercisesList}>
        {filteredExercises.length > 0 ? (
          filteredExercises.map(exercise => (
            <TouchableOpacity
              key={exercise.id}
              style={styles.exerciseCard}
              onPress={() => navigation.navigate('ExerciseDetail', { exercise })}
            >
              <Ionicons name="fitness" size={32} color="#28a745" />
              <View style={styles.exerciseInfo}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <Text style={styles.exerciseCategory}>{exercise.categoryLabel}</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#dee2e6" />
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="search" size={60} color="#dee2e6" />
            <Text style={styles.emptyText}>Nie znaleziono ćwiczeń</Text>
          </View>
        )}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: '#2c3e50',
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
    maxHeight: 60,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  categoryButtonActive: {
    backgroundColor: '#28a745',
    borderColor: '#28a745',
  },
  categoryText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginLeft: 8,
    fontWeight: '600',
  },
  categoryTextActive: {
    color: 'white',
  },
  exercisesList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  exerciseInfo: {
    flex: 1,
    marginLeft: 15,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 3,
  },
  exerciseCategory: {
    fontSize: 13,
    color: '#7f8c8d',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 15,
  },
});