// src/screens/Profile/CalorieCalculatorScreen.js - PEŁNY (z formularzem)
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function CalorieCalculatorScreen() {
  const navigation = useNavigation();
  
  // Dane z formularza
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('male');
  const [activity, setActivity] = useState('moderate');
  const [goal, setGoal] = useState('maintain');
  const [calories, setCalories] = useState(null);

  const calculateCalories = () => {
    // Walidacja
    if (!age || !weight || !height) {
      alert('Wypełnij wszystkie pola!');
      return;
    }

    const ageNum = parseInt(age);
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (ageNum < 10 || ageNum > 120 || weightNum < 30 || weightNum > 300 || heightNum < 100 || heightNum > 250) {
      alert('Podaj prawidłowe wartości');
      return;
    }

    // BMR (podstawowa przemiana materii)
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
    }

    // Poziom aktywności
    let multiplier = 1.55; // moderate
    if (activity === 'low') multiplier = 1.3;
    if (activity === 'high') multiplier = 1.7;

    // TDEE
    let tdee = bmr * multiplier;

    // Cel
    if (goal === 'lose') tdee -= 500;
    if (goal === 'gain') tdee += 500;

    setCalories(Math.round(tdee));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Kalkulator kalorii</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Formularz danych */}
        <View style={styles.section}>
          <Text style={styles.label}>📊 Twoje dane</Text>
          
          <Text style={styles.inputLabel}>Wiek (lata)</Text>
          <TextInput
            style={styles.input}
            placeholder="np. 25"
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
          />

          <Text style={styles.inputLabel}>Waga (kg)</Text>
          <TextInput
            style={styles.input}
            placeholder="np. 75"
            keyboardType="decimal-pad"
            value={weight}
            onChangeText={setWeight}
          />

          <Text style={styles.inputLabel}>Wzrost (cm)</Text>
          <TextInput
            style={styles.input}
            placeholder="np. 180"
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
          />

          <Text style={styles.inputLabel}>Płeć</Text>
          <View style={styles.genderRow}>
            <TouchableOpacity
              style={[styles.genderButton, gender === 'male' && styles.genderActive]}
              onPress={() => setGender('male')}
            >
              <Ionicons 
                name="male" 
                size={24} 
                color={gender === 'male' ? 'white' : '#7f8c8d'} 
              />
              <Text style={[styles.genderText, gender === 'male' && styles.genderTextActive]}>
                Mężczyzna
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.genderButton, gender === 'female' && styles.genderActive]}
              onPress={() => setGender('female')}
            >
              <Ionicons 
                name="female" 
                size={24} 
                color={gender === 'female' ? 'white' : '#7f8c8d'} 
              />
              <Text style={[styles.genderText, gender === 'female' && styles.genderTextActive]}>
                Kobieta
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Poziom aktywności */}
        <View style={styles.section}>
          <Text style={styles.label}>🏃 Poziom aktywności</Text>
          
          <TouchableOpacity
            style={[styles.option, activity === 'low' && styles.optionActive]}
            onPress={() => setActivity('low')}
          >
            <Text style={styles.optionText}>Mało (siedzący tryb)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.option, activity === 'moderate' && styles.optionActive]}
            onPress={() => setActivity('moderate')}
          >
            <Text style={styles.optionText}>Średnio (3-4x/tydzień)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.option, activity === 'high' && styles.optionActive]}
            onPress={() => setActivity('high')}
          >
            <Text style={styles.optionText}>Dużo (5-7x/tydzień)</Text>
          </TouchableOpacity>
        </View>

        {/* Cel */}
        <View style={styles.section}>
          <Text style={styles.label}>🎯 Twój cel</Text>
          
          <TouchableOpacity
            style={[styles.option, goal === 'lose' && styles.optionActive]}
            onPress={() => setGoal('lose')}
          >
            <Text style={styles.optionText}>📉 Schudnąć</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.option, goal === 'maintain' && styles.optionActive]}
            onPress={() => setGoal('maintain')}
          >
            <Text style={styles.optionText}>⚖️ Utrzymać wagę</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.option, goal === 'gain' && styles.optionActive]}
            onPress={() => setGoal('gain')}
          >
            <Text style={styles.optionText}>📈 Nabrać masy</Text>
          </TouchableOpacity>
        </View>

        {/* Przycisk Oblicz */}
        <TouchableOpacity style={styles.button} onPress={calculateCalories}>
          <Ionicons name="calculator" size={24} color="white" />
          <Text style={styles.buttonText}>Oblicz zapotrzebowanie</Text>
        </TouchableOpacity>

        {/* Wynik */}
        {calories && (
          <View style={styles.result}>
            <Text style={styles.resultTitle}>Twoje dzienne zapotrzebowanie:</Text>
            <Text style={styles.resultValue}>{calories} kcal</Text>
            <Text style={styles.resultHint}>
              {goal === 'lose' && '💡 Jedz mniej niż ta wartość, aby schudnąć'}
              {goal === 'maintain' && '💡 Jedz tyle, aby utrzymać wagę'}
              {goal === 'gain' && '💡 Jedz więcej niż ta wartość, aby przytyć'}
            </Text>
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
    gap: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 25,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#dee2e6',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: '#2c3e50',
  },
  genderRow: {
    flexDirection: 'row',
    gap: 10,
  },
  genderButton: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#dee2e6',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  genderActive: {
    backgroundColor: '#28a745',
    borderColor: '#28a745',
  },
  genderText: {
    fontSize: 15,
    color: '#7f8c8d',
    fontWeight: '600',
  },
  genderTextActive: {
    color: 'white',
  },
  option: {
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#dee2e6',
  },
  optionActive: {
    borderColor: '#28a745',
    backgroundColor: '#e8f5e9',
  },
  optionText: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#28a745',
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  result: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 15,
    marginTop: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  resultTitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 10,
  },
  resultValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#28a745',
    marginBottom: 15,
  },
  resultHint: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 20,
  },
});