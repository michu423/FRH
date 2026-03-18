import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PlansScreen() {
  return (
    <View style={styles.container}>
      <Ionicons name="calendar" size={80} color="#28a745" />
      <Text style={styles.title}>Plany treningowe</Text>
      <Text style={styles.subtitle}>Wkrótce dostępne...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 10,
  },
});