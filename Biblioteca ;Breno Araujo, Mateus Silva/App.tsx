import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ItemView } from './src/Views/ItemView';
import { ItemViewModel } from './src/viewmodels/ItemViewModel';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const viewModel = new ItemViewModel();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (
      <View style={styles.splashContainer}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return <ItemView viewModel={viewModel} />;
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6200ee',
  },
  loadingText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});