import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase.config.js';

const showAlert = (title, message, onOk) => {
  if (Platform.OS === 'web') {
    window.alert(title + '\n' + message);
    if (onOk) onOk();
  } else {
    Alert.alert(title, message, onOk ? [{ text: 'OK', onPress: onOk }] : undefined);
  }
};

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const { user } = useAuth();
  
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.profile) {
      setName(user.profile.name || '');
      setAge(user.profile.age?.toString() || '');
      setWeight(user.profile.weight?.toString() || '');
      setHeight(user.profile.height?.toString() || '');
    }
  }, [user]);

  const saveProfile = async () => {
    if (!name.trim()) {
      showAlert('Błąd', 'Podaj imię');
      return;
    }
    if (!age || parseInt(age) < 10 || parseInt(age) > 120) {
      showAlert('Błąd', 'Podaj poprawny wiek (10-120 lat)');
      return;
    }
    if (!weight || parseFloat(weight) < 30 || parseFloat(weight) > 300) {
      showAlert('Błąd', 'Podaj poprawną wagę (30-300 kg)');
      return;
    }
    if (!height || parseInt(height) < 100 || parseInt(height) > 250) {
      showAlert('Błąd', 'Podaj poprawny wzrost (100-250 cm)');
      return;
    }

    setLoading(true);
    try {
      // Zapis na płaskim poziomie — zgodnie z RegisterScreen
      await updateDoc(doc(db, 'users', user.uid), {
        name: name.trim(),
        age: parseInt(age),
        weight: parseFloat(weight),
        height: parseInt(height),
        updatedAt: new Date().toISOString(),
      });

      showAlert('Sukces!', 'Profil został zaktualizowany', () => {
        navigation.goBack();
      });
    } catch (error) {
      showAlert('Błąd', 'Nie udało się zapisać profilu');
      console.error('Błąd zapisu profilu:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Edytuj profil</Text>
      </View>

      <View style={styles.avatarSection}>
        <View style={styles.avatar}>
          <Ionicons name="person-circle" size={100} color="#28a745" />
        </View>
        <TextInput
          style={styles.nameInput}
          placeholder="Imię i nazwisko"
          value={name}
          onChangeText={setName}
        />
      </View>

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

      <TouchableOpacity 
        style={[styles.saveButton, loading && styles.saveButtonDisabled]} 
        onPress={saveProfile}
        disabled={loading}
      >
        <Ionicons name="checkmark-circle" size={24} color="white" />
        <Text style={styles.saveButtonText}>
          {loading ? 'Zapisywanie...' : 'Zapisz zmiany'}
        </Text>
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
});