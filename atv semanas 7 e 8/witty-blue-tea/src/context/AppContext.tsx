import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { EstadoApp, AcaoApp, Tarefa } from '../models/AppModels';

const estadoInicial: EstadoApp = {
  tema: 'claro',
  tarefas: [],
  modalVisivel: false,
  novoTitulo: '',
  novaDescricao: ''
};

const appReducer = (estado: EstadoApp, acao: AcaoApp): EstadoApp => {
  switch (acao.type) {
    case 'TOGGLE_TEMA':
      return { ...estado, tema: estado.tema === 'claro' ? 'escuro' : 'claro' };
    case 'TOGGLE_MODAL':
      return { ...estado, modalVisivel: !estado.modalVisivel };
    case 'SET_TITULO':
      return { ...estado, novoTitulo: acao.payload };
    case 'SET_DESCRICAO':
      return { ...estado, novaDescricao: acao.payload };
    case 'ADD_TAREFA':
      return { 
        ...estado, 
        tarefas: [...estado.tarefas, acao.payload],
        novoTitulo: '',
        novaDescricao: '',
        modalVisivel: false
      };
    case 'REMOVE_TAREFA':
      return {
        ...estado,
        tarefas: estado.tarefas.filter(t => t.id !== acao.payload)
      };
    case 'TOGGLE_CONCLUIDO':
      return {
        ...estado,
        tarefas: estado.tarefas.map(t =>
          t.id === acao.payload ? { ...t, concluido: !t.concluido } : t
        )
      };
    default:
      return estado;
  }
};

interface ContextoApp {
  estado: EstadoApp;
  dispatch: React.Dispatch<AcaoApp>;
  adicionarTarefa: (titulo: string, descricao: string) => void;
}

const AppContext = createContext<ContextoApp | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [estado, dispatch] = useReducer(appReducer, estadoInicial);

  const obterImagemAleatoria = (): string => {
    return `https://picsum.photos/200/200?random=${Math.random()}`;
  };

  const adicionarTarefa = (titulo: string, descricao: string) => {
    const novaTarefa: Tarefa = {
      id: Date.now().toString(),
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      imagem: obterImagemAleatoria(),
      concluido: false
    };

    dispatch({ type: 'ADD_TAREFA', payload: novaTarefa });
  };

  return (
    <AppContext.Provider value={{ estado, dispatch, adicionarTarefa }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const contexto = useContext(AppContext);
  if (!contexto) throw new Error('useApp deve ser usado dentro de AppProvider');
  return contexto;
};