import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase.config.js';

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const { user } = useAuth();
  
  // Domyślne wartości z profilu
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Wczytaj aktualne dane z profilu
    if (user?.profile) {
      setName(user.profile.name || '');
      setAge(user.profile.age?.toString() || '');
      setWeight(user.profile.weight?.toString() || '');
      setHeight(user.profile.height?.toString() || '');
    }
  }, [user]);

  const saveProfile = async () => {
    // Walidacja
    if (!name.trim()) {
      Alert.alert('Błąd', 'Podaj imię');
      return;
    }
    if (!age || age < 10 || age > 120) {
      Alert.alert('Błąd', 'Podaj poprawny wiek (10-120 lat)');
      return;
    }
    if (!weight || weight < 30 || weight > 300) {
      Alert.alert('Błąd', 'Podaj poprawną wagę (30-300 kg)');
      return;
    }
    if (!height || height < 100 || height > 250) {
      Alert.alert('Błąd', 'Podaj poprawny wzrost (100-250 cm)');
      return;
    }

    setLoading(true);
    try {
      // Aktualizuj Firestore
      await updateDoc(doc(db, 'users', user.uid), {
        'profile.name': name.trim(),
        'profile.age': parseInt(age),
        'profile.weight': parseFloat(weight),
        'profile.height': parseInt(height),
        updatedAt: new Date(),
      });

      Alert.alert(
        'Sukces! ✅', 
        'Profil został zaktualizowany',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się zapisać profilu');
      console.error('Błąd zapisu profilu:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Edytuj profil</Text>
      </View>

      {/* Avatar + Imię */}
      <View style={styles.avatarSection}>
        <View style={styles.avatar}>
          <Ionicons name="person-circle" size={100} color="#28a745" />
        </View>
        <TextInput
          style={styles.nameInput}
          placeholder="Imię i nazwisko"
          value={name}
          onChangeText={setName}
          autoFocus
        />
      </View>

      {/* Dane antropometryczne */}
      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Dane fizyczne</Text>
        
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Wiek (lata)"
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
          />
          <TextInput
            style={styles.input}
            placeholder="Waga (kg)"
            keyboardType="decimal-pad"
            value={weight}
            onChangeText={setWeight}
          />
        </View>

        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Wzrost (cm)"
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
          />
        </View>
      </View>

      {/* Przycisk zapisz */}
      <TouchableOpacity 
        style={[styles.saveButton, loading && styles.saveButtonDisabled]} 
        onPress={saveProfile}
        disabled={loading}
      >
        {loading ? (
          <View style={styles.loadingSpinner}>
            <Ionicons name="ellipse-horizontal" size={24} color="white" />
          </View>
        ) : (
          <>
            <Ionicons name="checkmark-circle" size={24} color="white" />
            <Text style={styles.saveButtonText}>Zapisz zmiany</Text>
          </>
        )}
      </TouchableOpacity>

      <View style={{ height: 50 }} />
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
    padding: 20,
    paddingTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  avatarSection: {
    backgroundColor: 'white',
    margin: 20,
    marginTop: 20,
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  avatar: {
    marginBottom: 20,
  },
  nameInput: {
    backgroundColor: '#f8f9fa',
    borderWidth: 2,
    borderColor: '#dee2e6',
    borderRadius: 12,
    padding: 15,
    fontSize: 20,
    textAlign: 'center',
    width: '100%',
    fontWeight: '600',
  },
  formSection: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    marginLeft: 5,
  },
  inputGroup: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#dee2e6',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: '#2c3e50',
  },
  saveButton: {
    backgroundColor: '#28a745',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  saveButtonDisabled: {
    backgroundColor: '#adb5bd',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingSpinner: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});