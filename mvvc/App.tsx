import React from 'react';
import { ItemView } from './src/Views/ItemView';
import { ItemViewModel } from './src/viewmodels/ItemViewModel';

export default function App() {
  const viewModel = new ItemViewModel();
  
  return (
    <ItemView viewModel={viewModel} />
  );
}