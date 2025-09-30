import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, Modal, TextInput, Dimensions } from 'react-native';
import { useApp } from '../context/AppContext';

const { width } = Dimensions.get('window');

export const TelaLista = () => {
  const { estado, dispatch, adicionarTarefa } = useApp();
  const temaEscuro = estado.tema === 'escuro';

  const removerTarefa = (id: string) => {
    dispatch({ type: 'REMOVE_TAREFA', payload: id });
  };

  const ItemTarefa = ({ item }) => (
    <View style={{
      backgroundColor: temaEscuro ? '#2d2d2d' : '#f8f9fa',
      padding: 16,
      margin: 8,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'flex-start'
    }}>
      <TouchableOpacity onPress={() => dispatch({ type: 'TOGGLE_CONCLUIDO', payload: item.id })}>
        <Text style={{ fontSize: 20, marginRight: 12, color: temaEscuro ? '#fff' : '#000' }}>
          {item.concluido ? '☑️' : '🔲'}
        </Text>
      </TouchableOpacity>
      
      <Image 
        source={{ uri: item.imagem }} 
        style={{ width: 50, height: 50, borderRadius: 8, marginRight: 12 }} 
        resizeMode="cover" 
      />
      
      <View style={{ flex: 1 }}>
        <Text style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: temaEscuro ? '#fff' : '#333',
          textDecorationLine: item.concluido ? 'line-through' : 'none',
          marginBottom: 4
        }}>
          {item.titulo}
        </Text>
        {item.descricao ? (
          <Text style={{ 
            fontSize: 14, 
            color: temaEscuro ? '#ccc' : '#666',
            textDecorationLine: item.concluido ? 'line-through' : 'none'
          }}>
            {item.descricao}
          </Text>
        ) : null}
      </View>
      
      <TouchableOpacity onPress={() => removerTarefa(item.id)}>
        <Text style={{ fontSize: 20, color: '#ff4444' }}>⛔</Text>
      </TouchableOpacity>
    </View>
  );

  const handleAdicionarTarefa = () => {
    if (estado.novoTitulo.trim()) {
      adicionarTarefa(estado.novoTitulo, estado.novaDescricao);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: temaEscuro ? '#1a1a1a' : '#fff' }}>
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: temaEscuro ? '#fff' : '#333' }}>
          Tarefas ({estado.tarefas.length})
        </Text>
        <TouchableOpacity 
          style={{ backgroundColor: '#2E8B57', padding: 12, borderRadius: 8 }}
          onPress={() => dispatch({ type: 'TOGGLE_MODAL' })}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>+ Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={estado.tarefas}
        renderItem={({ item }) => <ItemTarefa item={item} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', color: temaEscuro ? '#ccc' : '#666', marginTop: 50 }}>
            Nenhuma tarefa
          </Text>
        }
      />

      <Modal visible={estado.modalVisivel} animationType="slide" transparent>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: temaEscuro ? '#2d2d2d' : 'white', padding: 20, borderRadius: 12, width: '90%' }}>
            
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: temaEscuro ? '#fff' : '#333', textAlign: 'center' }}>
              Nova Tarefa
            </Text>
            
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: temaEscuro ? '#555' : '#ddd',
                borderRadius: 8,
                padding: 12,
                marginBottom: 12,
                backgroundColor: temaEscuro ? '#333' : 'white',
                color: temaEscuro ? 'white' : 'black'
              }}
              placeholder="Título da tarefa"
              placeholderTextColor={temaEscuro ? '#888' : '#999'}
              value={estado.novoTitulo}
              onChangeText={texto => dispatch({ type: 'SET_TITULO', payload: texto })}
            />

            <TextInput
              style={{
                borderWidth: 1,
                borderColor: temaEscuro ? '#555' : '#ddd',
                borderRadius: 8,
                padding: 12,
                marginBottom: 16,
                backgroundColor: temaEscuro ? '#333' : 'white',
                color: temaEscuro ? 'white' : 'black',
                height: 80,
                textAlignVertical: 'top'
              }}
              placeholder="Descrição da tarefa (opcional)"
              placeholderTextColor={temaEscuro ? '#888' : '#999'}
              value={estado.novaDescricao}
              onChangeText={texto => dispatch({ type: 'SET_DESCRICAO', payload: texto })}
              multiline
              numberOfLines={3}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity 
                style={{ backgroundColor: '#6c757d', padding: 12, borderRadius: 8, flex: 1, marginRight: 8, alignItems: 'center' }}
                onPress={() => dispatch({ type: 'TOGGLE_MODAL' })}
              >
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={{ backgroundColor: '#2E8B57', padding: 12, borderRadius: 8, flex: 1, marginLeft: 8, alignItems: 'center' }}
                onPress={handleAdicionarTarefa}
              >
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Adicionar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};