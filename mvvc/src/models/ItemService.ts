import { Item } from './Item';

export class ItemService {
  private static instance: ItemService;
  private items: Item[] = [
    { id: '1', title: 'Item Exemplo 1' },
    { id: '2', title: 'Item Exemplo 2' },
  ];

  static getInstance(): ItemService {
    if (!ItemService.instance) {
      ItemService.instance = new ItemService();
    }
    return ItemService.instance;
  }

  getAllItems(): Item[] {
    return this.items;
  }

  addItem(title: string): Item {
    if (!title.trim()) {
      throw new Error('Título não pode estar vazio');
    }

    const newItem: Item = {
      id: Date.now().toString(),
      title: title.trim(),
    };

    this.items = [...this.items, newItem];
    return newItem;
  }

  updateItem(id: string, title: string): Item {
    if (!title.trim()) {
      throw new Error('Título não pode estar vazio');
    }

    const itemIndex = this.items.findIndex(item => item.id === id);
    if (itemIndex === -1) {
      throw new Error('Item não encontrado');
    }

    const updatedItem = { ...this.items[itemIndex], title: title.trim() };
    this.items[itemIndex] = updatedItem;
    return updatedItem;
  }

  deleteItem(id: string): void {
    this.items = this.items.filter(item => item.id !== id);
  }
}