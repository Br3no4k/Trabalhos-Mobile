export interface Tarefa {
  id: string;
  titulo: string;
  descricao: string;
  imagem: string;
  concluido: boolean;
}

export interface EstadoApp {
  tema: 'claro' | 'escuro';
  tarefas: Tarefa[];
  modalVisivel: boolean;
  novoTitulo: string;
  novaDescricao: string;
}

export type AcaoApp =
  | { type: 'TOGGLE_TEMA' }
  | { type: 'TOGGLE_MODAL' }
  | { type: 'SET_TITULO'; payload: string }
  | { type: 'SET_DESCRICAO'; payload: string }
  | { type: 'ADD_TAREFA'; payload: Tarefa }
  | { type: 'REMOVE_TAREFA'; payload: string }
  | { type: 'TOGGLE_CONCLUIDO'; payload: string };