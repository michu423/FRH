import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

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
      {/* Header z ikoną użytkownika */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle" size={120} color="#28a745" />
        </View>
        <Text style={styles.name}>{user?.profile?.name || 'Użytkownik'}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      {/* Karta z danymi */}
      <View style={styles.infoCard}>
        <Text style={styles.cardTitle}>Twoje dane</Text>
        
        <View style={styles.infoRow}>
          <View style={styles.infoLeft}>
            <Ionicons name="calendar-outline" size={20} color="#7f8c8d" />
            <Text style={styles.infoLabel}>Wiek</Text>
          </View>
          <Text style={styles.infoValue}>{user?.profile?.age || '-'} lat</Text>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoLeft}>
            <Ionicons name="scale-outline" size={20} color="#7f8c8d" />
            <Text style={styles.infoLabel}>Waga</Text>
          </View>
          <Text style={styles.infoValue}>{user?.profile?.weight || '-'} kg</Text>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoLeft}>
            <Ionicons name="resize-outline" size={20} color="#7f8c8d" />
            <Text style={styles.infoLabel}>Wzrost</Text>
          </View>
          <Text style={styles.infoValue}>{user?.profile?.height || '-'} cm</Text>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoLeft}>
            <Ionicons name="fitness-outline" size={20} color="#7f8c8d" />
            <Text style={styles.infoLabel}>Aktywny plan</Text>
          </View>
          <Text style={styles.infoValue}>{user?.profile?.activePlan || 'Brak'}</Text>
        </View>
      </View>

      {/* Przycisk edycji (placeholder) */}
      <TouchableOpacity style={styles.editButton}>
        <Ionicons name="create-outline" size={24} color="#007bff" />
        <Text style={styles.editText}>Edytuj profil</Text>
      </TouchableOpacity>

      {/* Przycisk wylogowania */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color="white" />
        <Text style={styles.logoutText}>Wyloguj się</Text>
      </TouchableOpacity>

      {/* Dodatkowa przestrzeń na dole */}
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
  editButton: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 20,
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