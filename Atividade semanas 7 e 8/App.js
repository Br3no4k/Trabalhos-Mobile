import React, { useState, useEffect } from 'react';
import { AppProvider } from './src/context/AppContext';
import { TelaSplash } from './src/views/TelaSplash';
import AppContent from './src/AppContent';

export default function App() {
  const [mostrarSplash, setMostrarSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMostrarSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (mostrarSplash) {
    return <TelaSplash />;
  }

  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}