import React from 'react';
import { View, Image, Text, Dimensions, ActivityIndicator } from 'react-native';

const { width, height } = Dimensions.get('window');

export const TelaSplash = () => {
  return (
    <View style={{ 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: '#2E8B57' 
    }}>
      <Image 
        source={{ uri: "https://blog.esportudo.com/hs-fs/hubfs/Valdir%20Papel-1.jpg" }} 
        style={{ 
          width: width * 0.6, 
          height: height * 0.3, 
          resizeMode: 'contain',
          borderRadius: 10,
          marginBottom: 30
        }}
      />
      <Text style={{ 
        fontSize: 28, 
        fontWeight: 'bold', 
        color: 'white', 
        marginBottom: 10,
        textAlign: 'center'
      }}>
        Lista de Tarefas
      </Text>
      <Text style={{ 
        fontSize: 16, 
        color: 'white', 
        marginBottom: 30,
        textAlign: 'center'
      }}>
        Organize suas tarefas com estilo
      </Text>
      <ActivityIndicator size="large" color="#FFFFFF" />
      <Text style={{ 
        fontSize: 14, 
        color: 'white', 
        marginTop: 20,
        textAlign: 'center'
      }}>
        Carregando...
      </Text>
    </View>
  );
};