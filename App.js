import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { AuthProvider, useAuth } from './src/context/AuthContext';

// Ekrany autoryzacji
import LoginScreen from './src/screens/Auth/LoginScreen';
import RegisterScreen from './src/screens/Auth/RegisterScreen';

// Główne ekrany
import HomeScreen from './src/screens/Home/HomeScreen';
import PlansScreen from './src/screens/Plans/PlansScreen';
import PlanDetailScreen from './src/screens/Plans/PlanDetailScreen';
import ExercisesScreen from './src/screens/Exercises/ExercisesScreen';
import ExerciseDetailScreen from './src/screens/Exercises/ExerciseDetailScreen';
import ProgressScreen from './src/screens/Progress/ProgressScreen';
import ProfileScreen from './src/screens/Profile/ProfileScreen';
import CalorieCalculatorScreen from './src/screens/Profile/CalorieCalculatorScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Lista planów i szczegóły
function PlansStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PlansList" component={PlansScreen} />
      <Stack.Screen name="PlanDetail" component={PlanDetailScreen} />
    </Stack.Navigator>
  );
}

// Ćwiczenia lista i szczegóły
function ExercisesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ExercisesList" component={ExercisesScreen} />
      <Stack.Screen name="ExerciseDetail" component={ExerciseDetailScreen} />
    </Stack.Navigator>
  );
}

// Kalkulator kalorii
function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="CalorieCalculator" component={CalorieCalculatorScreen} />
    </Stack.Navigator>
  );
}

// Główna nawigacja
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          
          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'PlansTab') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'ExercisesTab') {
            iconName = focused ? 'barbell' : 'barbell-outline';
          } else if (route.name === 'ProgressTab') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          } else if (route.name === 'ProfileTab') {
            iconName = focused ? 'person' : 'person-outline';
          }
          
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#28a745',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen} 
        options={{ tabBarLabel: 'Główna' }}
      />
      <Tab.Screen 
        name="PlansTab" 
        component={PlansStack}
        options={{ tabBarLabel: 'Plany' }}
      />
      <Tab.Screen 
        name="ExercisesTab" 
        component={ExercisesStack}
        options={{ tabBarLabel: 'Ćwiczenia' }}
      />
      <Tab.Screen 
        name="ProgressTab" 
        component={ProgressScreen} 
        options={{ tabBarLabel: 'Postępy' }}
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileStack}
        options={{ tabBarLabel: 'Profil' }}
      />
    </Tab.Navigator>
  );
}

// Logika zalogowany/niezalogowany
function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#f8f9fa' 
      }}>
        <ActivityIndicator size="large" color="#28a745" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Main" component={MainTabs} />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Root
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}