import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

type RootStackParamList = {
  Home: undefined;
  Details: { itemId: number; title: string };
  Profile: undefined;
};

type TabParamList = {
  Main: undefined;
  Settings: undefined;
  ProfileStack: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function SplashScreen({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.splashContainer}>
      <View style={styles.splashContent}>
        <Image 
          source={{ uri: "https://blog.esportudo.com/hs-fs/hubfs/Valdir%20Papel-1.jpg?width=1024&name=Valdir%20Papel-1.jpg" }} 
          style={styles.splashImage}
        />
      </View>
    </View>
  );
}


function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela Inicial</Text>
    </View>
  );
}


function DetailsScreen({ route, navigation }: any) {
  const { itemId, title } = route.params;
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text>ID do Item: {itemId}</Text>
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText} onPress={() => navigation.goBack()}>
          Voltar
        </Text>
      </View>
    </View>
  );
}

function ProfileScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>
    </View>
  );
}

function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Página Inicial' }}
      />
      <Stack.Screen 
        name="Details" 
        component={DetailsScreen} 
        options={({ route }) => ({ title: route.params.title })}
      />
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ title: 'Perfil' }}
      />
    </Stack.Navigator>
  );
}

function MainApp() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: any;

            if (route.name === 'Main') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            } else if (route.name === 'ProfileStack') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen 
          name="Main" 
          component={MainStack} 
          options={{ 
            headerShown: false,
            title: 'Principal' 
          }} 
        />
        <Tab.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{ title: 'Configurações' }} 
        />
        <Tab.Screen 
          name="ProfileStack" 
          component={ProfileScreen} 
          options={{ title: 'Perfil' }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <SplashScreen onFinish={() => setIsLoading(false)} />;
  }

  return <MainApp />;
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2E8B57',
  },
  splashContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashImage: {
    width: 200,
    height: 150,
    resizeMode: 'contain',
  },
  
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center', 
  },

  buttonContainer: {
    backgroundColor: '#008B8B',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 8,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});