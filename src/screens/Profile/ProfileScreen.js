import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase.config.js';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const navigation = useNavigation();
  
  const [profileData, setProfileData] = useState({
    name: '',
    age: null,
    weight: null,
    height: null,
    activePlan: null,
  });

  useEffect(() => {
    if (!user?.uid) return;

    const profileRef = doc(db, 'users', user.uid);
    const unsubscribe = onSnapshot(profileRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProfileData({
          name: data.profile?.name || data.name || 'Użytkownik',
          age: data.profile?.age || data.age || null,
          weight: data.profile?.weight || data.weight || null,
          height: data.profile?.height || data.height || null,
          activePlan: data.profile?.activePlan || data.activePlan || null,
        });
      }
    });

    return () => unsubscribe();
  }, [user?.uid]);

  const handleLogout = async () => {
    Alert.alert(
      'Wylogowanie',
      'Czy na pewno chcesz się wylogować?',
      [
        { text: 'Anuluj', style: 'cancel' },
        { 
          text: 'Wyloguj', 
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            } catch (error) {
              Alert.alert('Błąd', 'Problem z wylogowaniem');
            }
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle" size={120} color="#28a745" />
        </View>
        <Text style={styles.name}>{profileData.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.cardTitle}>Twoje dane</Text>
        
        <View style={styles.infoRow}>
          <View style={styles.infoLeft}>
            <Ionicons name="calendar-outline" size={20} color="#7f8c8d" />
            <Text style={styles.infoLabel}>Wiek</Text>
          </View>
          <Text style={styles.infoValue}>{profileData.age || '-'} lat</Text>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoLeft}>
            <Ionicons name="scale-outline" size={20} color="#7f8c8d" />
            <Text style={styles.infoLabel}>Waga</Text>
          </View>
          <Text style={styles.infoValue}>{profileData.weight || '-'} kg</Text>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoLeft}>
            <Ionicons name="resize-outline" size={20} color="#7f8c8d" />
            <Text style={styles.infoLabel}>Wzrost</Text>
          </View>
          <Text style={styles.infoValue}>{profileData.height || '-'} cm</Text>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoLeft}>
            <Ionicons name="fitness-outline" size={20} color="#7f8c8d" />
            <Text style={styles.infoLabel}>Aktywny plan</Text>
          </View>
          <Text style={styles.infoValue}>{profileData.activePlan || 'Brak'}</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.calculatorButton}
        onPress={() => navigation.navigate('CalorieCalculator')}
      >
        <Ionicons name="calculator-outline" size={24} color="#28a745" />
        <Text style={styles.calculatorText}>Kalkulator kalorii</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.editButton}
        onPress={() => navigation.navigate('EditProfile')}
      >
        <Ionicons name="create-outline" size={24} color="#007bff" />
        <Text style={styles.editText}>Edytuj profil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color="white" />
        <Text style={styles.logoutText}>Wyloguj się</Text>
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
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
    backgroundColor: 'white',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  infoCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 16,
    color: '#7f8c8d',
    marginLeft: 10,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  calculatorButton: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 18,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#28a745',
  },
  calculatorText: {
    color: '#28a745',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  editButton: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 15,
    padding: 18,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#007bff',
  },
  editText: {
    color: '#007bff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    marginHorizontal: 20,
    marginTop: 15,
    padding: 18,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});