'use client';

import React from 'react';

export function ApiKeyTable({ 
  apiKeys, 
  loading, 
  visibleKeys, 
  toggleKeyVisibility, 
  formatKey,
  copyToClipboard,
  startEditing,
  deleteApiKey
}) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          A chave é usada para autenticar suas solicitações para a API de Pesquisa. Para saber mais, consulte a página de documentação.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr key="table-header">
              <th key="header-name" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-[140px]">Nome</th>
              <th key="header-type" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-[100px]">Tipo</th>
              <th key="header-usage" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-[100px]">Uso</th>
              <th key="header-key" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-0">Key</th>
              <th key="header-options" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-[160px]">Opções</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {loading ? (
              <tr key="loading">
                <td key="loading-cell" colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  Carregando...
                </td>
              </tr>
            ) : apiKeys.length === 0 ? (
              <tr key="empty-state">
                <td key="empty-state-cell" colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  Nenhuma API key encontrada. Crie uma para começar.
                </td>
              </tr>
            ) : (
              apiKeys.map((key) => (
                <tr key={key.id}>
                  <td key={`${key.id}-name`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{key.name}</td>
                  <td key={`${key.id}-type`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{key.type || 'dev'}</td>
                  <td key={`${key.id}-usage`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{key.usage || 0}</td>
                  <td key={`${key.id}-key`} className="px-6 py-4 text-sm font-mono text-gray-500 dark:text-gray-400 truncate max-w-0">{formatKey(key.key, visibleKeys.has(key.id))}</td>
                  <td key={`${key.id}-options`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => toggleKeyVisibility(key.id)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 shrink-0"
                        title={visibleKeys.has(key.id) ? "Ocultar API Key" : "Mostrar API Key"}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {visibleKeys.has(key.id) ? (
                            <path key="visible" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          ) : (
                            <path key="hidden" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          )}
                        </svg>
                      </button>
                      <button 
                        onClick={() => copyToClipboard(key.key)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 shrink-0"
                        title="Copiar API Key"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path key="copy-icon" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => startEditing(key)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 shrink-0"
                        title="Editar Nome da API Key"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path key="edit-icon" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => deleteApiKey(key.id)}
                        className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 shrink-0"
                        title="Deletar API Key"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path key="delete-icon" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 