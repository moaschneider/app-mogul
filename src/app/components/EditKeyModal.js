'use client';

import React from 'react';

export function EditKeyModal({ 
  editingKey, 
  setEditingKey, 
  editName, 
  setEditName, 
  updateApiKey 
}) {
  if (!editingKey) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Editar Nome da API Key</h3>
        <form onSubmit={(e) => { e.preventDefault(); updateApiKey(editingKey); }}>
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="Digite o novo nome da API key"
            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white mb-4"
            required
          />
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => setEditingKey(null)}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 