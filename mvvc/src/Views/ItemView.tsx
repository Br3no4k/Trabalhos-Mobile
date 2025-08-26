import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  StyleSheet,
} from 'react-native';
import { Item } from '../models/Item';
import { ItemViewModel } from '../viewmodels/ItemViewModel';

interface ItemViewProps {
  viewModel: ItemViewModel;
}

interface ItemViewState {
  items: Item[];
  modalVisible: boolean;
  editingItem: Item | null;
  inputText: string;
}

export class ItemView extends React.Component<ItemViewProps, ItemViewState> {
  constructor(props: ItemViewProps) {
    super(props);
    
    this.state = {
      items: this.props.viewModel.items,
      modalVisible: this.props.viewModel.modalVisible,
      editingItem: this.props.viewModel.editingItem,
      inputText: this.props.viewModel.inputText,
    };

    this.props.viewModel.setOnItemsChanged(items => this.setState({ items }));
    this.props.viewModel.setOnModalVisibleChanged(modalVisible => this.setState({ modalVisible }));
    this.props.viewModel.setOnEditingItemChanged(editingItem => this.setState({ editingItem }));
    this.props.viewModel.setOnInputTextChanged(inputText => this.setState({ inputText }));
  }

  renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity 
      style={styles.item} 
      onPress={() => this.props.viewModel.openEditModal(item)}
    >
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );

  render() {
    const { items, modalVisible, editingItem, inputText } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Lista de Itens</Text>
        
        <TouchableOpacity style={styles.addButton} onPress={() => this.props.viewModel.openAddModal()}>
          <Text>Adicionar Item</Text>
        </TouchableOpacity>

        <FlatList
          data={items}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />

        <Modal 
          visible={modalVisible} 
          transparent={true} 
          animationType="fade"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.dialog}>
              <Text style={styles.modalTitle}>
                {editingItem ? 'Editar Item' : 'Novo Item'}
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Digite o título"
                value={inputText}
                onChangeText={text => this.props.viewModel.setInputText(text)}
              />

              <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={() => this.props.viewModel.closeModal()}>
                  <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>

                {editingItem && (
                  <TouchableOpacity 
                    style={[styles.button, styles.deleteButton]} 
                    onPress={() => this.props.viewModel.deleteItem()}
                  >
                    <Text style={[styles.buttonText, styles.deleteButtonText]}>Excluir</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity 
                  style={styles.button} 
                  onPress={editingItem ? () => this.props.viewModel.updateItem() : () => this.props.viewModel.addItem()}
                >
                  <Text style={styles.buttonText}>
                    {editingItem ? 'Salvar' : 'Adicionar'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#ddd',
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dialog: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#ddd',
    padding: 8,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: '#ffebee',
  },
  deleteButtonText: {
    color: '#d32f2f',
  },
});