import React from 'react';
import { View, Text, Switch, ScrollView } from 'react-native';
import { useApp } from '../context/AppContext';

export const TelaConfig = () => {
  const { estado, dispatch } = useApp();
  const temaEscuro = estado.tema === 'escuro';

  const tarefasConcluidas = estado.tarefas.filter(t => t.concluido).length;
  const tarefasPendentes = estado.tarefas.filter(t => !t.concluido).length;

  return (
    <ScrollView style={{ flex: 1, padding: 16, backgroundColor: temaEscuro ? '#1a1a1a' : '#fff' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 30, color: temaEscuro ? '#fff' : '#333', textAlign: 'center' }}>
        Configurações
      </Text>

      <View style={{ marginBottom: 30 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: temaEscuro ? '#fff' : '#333', marginBottom: 15 }}>
          Aparência
        </Text>
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: temaEscuro ? '#444' : '#e0e0e0' }}>
          <Text style={{ fontSize: 16, color: temaEscuro ? '#fff' : '#333', flex: 1 }}>
            Tema Escuro
          </Text>
          <Switch
            value={temaEscuro}
            onValueChange={() => dispatch({ type: 'TOGGLE_TEMA' })}
            trackColor={{ false: '#767577', true: '#2E8B57' }}
          />
        </View>
      </View>

      <View style={{ marginBottom: 30 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: temaEscuro ? '#fff' : '#333', marginBottom: 15 }}>
          Estatísticas
        </Text>
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: temaEscuro ? '#444' : '#e0e0e0' }}>
          <Text style={{ fontSize: 16, color: temaEscuro ? '#fff' : '#333', flex: 1 }}>
            Total de Tarefas
          </Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#2E8B57' }}>
            {estado.tarefas.length}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: temaEscuro ? '#444' : '#e0e0e0' }}>
          <Text style={{ fontSize: 16, color: temaEscuro ? '#fff' : '#333', flex: 1 }}>
            Concluídas
          </Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#2E8B57' }}>
            {tarefasConcluidas}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: temaEscuro ? '#444' : '#e0e0e0' }}>
          <Text style={{ fontSize: 16, color: temaEscuro ? '#fff' : '#333', flex: 1 }}>
            Pendentes
          </Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#2E8B57' }}>
            {tarefasPendentes}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};