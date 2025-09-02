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
import Icon from 'react-native-vector-icons/FontAwesome';
import QRCode from 'react-native-qrcode-svg';

interface ItemViewProps {
  viewModel: ItemViewModel;
}

interface ItemViewState {
  items: Item[];
  modalVisible: boolean;
  editingItem: Item | null;
  inputText: string;
  showQrModal: boolean; 
}

export class ItemView extends React.Component<ItemViewProps, ItemViewState> {
  constructor(props: ItemViewProps) {
    super(props);
    
    this.state = {
      items: this.props.viewModel.items,
      modalVisible: this.props.viewModel.modalVisible,
      editingItem: this.props.viewModel.editingItem,
      inputText: this.props.viewModel.inputText,
      showQrModal: false, 
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
      <Icon name="list-alt" size={20} color="#6200ee" style={styles.icon} />
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );

  render() {
    const { items, modalVisible, editingItem, inputText, showQrModal } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Lista de Itens</Text>
        
        <TouchableOpacity style={styles.addButton} onPress={() => this.props.viewModel.openAddModal()}>
          <Icon name="plus" size={20} color="white" />
          <Text> Adicionar Item</Text>
        </TouchableOpacity>

        <FlatList
          data={items}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />

        <TouchableOpacity 
          style={styles.qrButton}
          onPress={() => this.setState({ showQrModal: true })}
        >
          <Text style={styles.qrButtonText}> QR Code</Text>
        </TouchableOpacity>

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

        <Modal 
          visible={showQrModal} 
          transparent={true} 
          animationType="fade"
          onRequestClose={() => this.setState({ showQrModal: false })}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.dialog}>
              <Text style={styles.modalTitle}>QR Code</Text>
              
              <View style={styles.qrContainer}>
                <QRCode
                  value="https://thf.bing.com/th/id/OIP.9kXehtAX8KW0TLbfjehyzgHaEo?w=308&h=192&c=7&r=0&o=7&cb=thfc1&pid=1.7&rm=3"
                  size={200}
                  color="black"
                  backgroundColor="white"
                />
              </View>

              <TouchableOpacity 
                style={styles.button}
                onPress={() => this.setState({ showQrModal: false })}
              >
                <Text style={styles.buttonText}>Fechar</Text>
              </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'center',
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
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
    alignItems: 'center',
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
    width: '100%',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
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
  
  qrButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  qrButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  qrContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  qrText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
});