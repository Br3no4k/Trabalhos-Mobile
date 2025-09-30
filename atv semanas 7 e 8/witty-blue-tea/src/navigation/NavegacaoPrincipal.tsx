import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { TelaLista } from '../views/TelaLista';
import { TelaConfig } from '../views/TelaConfig';

const Tab = createBottomTabNavigator();

function NavegacaoTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Lista') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Config') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2E8B57',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen 
        name="Lista" 
        component={TelaLista} 
        options={{ 
          title: 'Minhas Tarefas',
          headerStyle: {
            backgroundColor: '#2E8B57',
          },
          headerTintColor: '#fff',
        }} 
      />
      <Tab.Screen 
        name="Config" 
        component={TelaConfig} 
        options={{ 
          title: 'Configuracoes',
          headerStyle: {
            backgroundColor: '#2E8B57',
          },
          headerTintColor: '#fff',
        }} 
      />
    </Tab.Navigator>
  );
}

export function NavegacaoPrincipal() {
  return (
    <NavigationContainer>
      <NavegacaoTabs />
    </NavigationContainer>
  );
}