'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useApiKeys } from '../hooks/useApiKeys';
import { ApiKeyTable } from '../components/ApiKeyTable';
import { CurrentPlanCard } from '../components/CurrentPlanCard';
import { CreateKeyModal } from '../components/CreateKeyModal';
import { EditKeyModal } from '../components/EditKeyModal';
import { Sidebar } from '../components/Sidebar';

export default function Dashboard() {
  const {
    apiKeys,
    loading,
    visibleKeys,
    newKeyName,
    editingKey,
    editName,
    showNewKeyModal,
    setNewKeyName,
    setShowNewKeyModal,
    setEditingKey,
    setEditName,
    toggleKeyVisibility,
    formatKey,
    copyToClipboard,
    startEditing,
    createApiKey,
    updateApiKey,
    deleteApiKey
  } = useApiKeys();

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex flex-col items-start">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                Dashboard
              </div>
              <div className="w-full flex justify-between items-end">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Overview</h2>
                <Link 
                  href="/" 
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Home
                </Link>
              </div>
            </div>

            {/* Current Plan Card */}
            <CurrentPlanCard />

            {/* API Keys Section */}
            <div id="api-keys">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">API Keys</h3>
                <button
                  onClick={() => setShowNewKeyModal(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path key="add-icon" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Nova API Key
                </button>
              </div>

              <ApiKeyTable 
                apiKeys={apiKeys}
                loading={loading}
                visibleKeys={visibleKeys}
                toggleKeyVisibility={toggleKeyVisibility}
                formatKey={formatKey}
                copyToClipboard={copyToClipboard}
                startEditing={startEditing}
                deleteApiKey={deleteApiKey}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreateKeyModal
        showNewKeyModal={showNewKeyModal}
        setShowNewKeyModal={setShowNewKeyModal}
        newKeyName={newKeyName}
        setNewKeyName={setNewKeyName}
        createApiKey={createApiKey}
      />
      
      <EditKeyModal
        editingKey={editingKey}
        setEditingKey={setEditingKey}
        editName={editName}
        setEditName={setEditName}
        updateApiKey={updateApiKey}
      />
    </div>
  );
} 