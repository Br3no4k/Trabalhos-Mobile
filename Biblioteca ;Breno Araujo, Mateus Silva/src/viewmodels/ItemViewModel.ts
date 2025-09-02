import { Item } from '../models/Item';
import { ItemService } from '../models/ItemService';
import { Alert } from 'react-native';

export class ItemViewModel {
  private itemService: ItemService;
  private _items: Item[] = [];
  private _modalVisible: boolean = false;
  private _editingItem: Item | null = null;
  private _inputText: string = '';

  private onItemsChanged: (items: Item[]) => void = () => {};
  private onModalVisibleChanged: (visible: boolean) => void = () => {};
  private onEditingItemChanged: (item: Item | null) => void = () => {};
  private onInputTextChanged: (text: string) => void = () => {};

  constructor() {
    this.itemService = ItemService.getInstance();
    this.loadItems();
  }

  get items(): Item[] {
    return this._items;
  }

  get modalVisible(): boolean {
    return this._modalVisible;
  }

  get editingItem(): Item | null {
    return this._editingItem;
  }

  get inputText(): string {
    return this._inputText;
  }

  setItems(items: Item[]) {
    this._items = items;
    this.onItemsChanged(items);
  }

  setModalVisible(visible: boolean) {
    this._modalVisible = visible;
    this.onModalVisibleChanged(visible);
  }

  setEditingItem(item: Item | null) {
    this._editingItem = item;
    this.onEditingItemChanged(item);
  }

  setInputText(text: string) {
    this._inputText = text;
    this.onInputTextChanged(text);
  }

  setOnItemsChanged(callback: (items: Item[]) => void) {
    this.onItemsChanged = callback;
  }

  setOnModalVisibleChanged(callback: (visible: boolean) => void) {
    this.onModalVisibleChanged = callback;
  }

  setOnEditingItemChanged(callback: (item: Item | null) => void) {
    this.onEditingItemChanged = callback;
  }

  setOnInputTextChanged(callback: (text: string) => void) {
    this.onInputTextChanged = callback;
  }

  loadItems() {
    this.setItems(this.itemService.getAllItems());
  }

  addItem() {
    try {
      this.itemService.addItem(this.inputText);
      this.loadItems();
      this.closeModal();
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    }
  }

  updateItem() {
    if (!this.editingItem) return;

    try {
      this.itemService.updateItem(this.editingItem.id, this.inputText);
      this.loadItems();
      this.closeModal();
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    }
  }

  deleteItem() {
    if (!this.editingItem) return;

    this.itemService.deleteItem(this.editingItem.id);
    this.loadItems();
    this.closeModal();
  }

  closeModal() {
    this.setInputText('');
    this.setEditingItem(null);
    this.setModalVisible(false);
  }

  openAddModal() {
    this.setInputText('');
    this.setEditingItem(null);
    this.setModalVisible(true);
  }

  openEditModal(item: Item) {
    this.setInputText(item.title);
    this.setEditingItem(item);
    this.setModalVisible(true);
  }
}