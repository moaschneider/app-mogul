'use client';

import { useState, useEffect } from 'react';
import { successToast, errorToast } from '@/lib/toast';

export function useApiKeys() {
  const [apiKeys, setApiKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleKeys, setVisibleKeys] = useState(new Set());
  const [newKeyName, setNewKeyName] = useState('');
  const [editingKey, setEditingKey] = useState(null);
  const [editName, setEditName] = useState('');
  const [showNewKeyModal, setShowNewKeyModal] = useState(false);

  const toggleKeyVisibility = (keyId) => {
    setVisibleKeys(prev => {
      const newSet = new Set(prev);
      if (newSet.has(keyId)) {
        newSet.delete(keyId);
      } else {
        newSet.add(keyId);
      }
      return newSet;
    });
  };

  const formatKey = (key, isVisible) => {
    if (!key) return '';
    const prefix = key.substring(0, 4); // Get "mog-"
    const remainingLength = key.length - 4;
    return isVisible ? key : `${prefix}${'*'.repeat(remainingLength)}`;
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      successToast('API Key copiada para clipboard');
    } catch (err) {
      console.error('Failed to copy text: ', err);
      errorToast('Erro ao copiar API Key');
    }
  };

  const startEditing = (key) => {
    setEditingKey(key.id);
    setEditName(key.name);
  };

  const fetchApiKeys = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/keys');
      const data = await response.json();
      setApiKeys(data);
    } catch (error) {
      console.error('Error fetching API keys:', error);
      errorToast('Erro ao carregar API Keys');
    } finally {
      setLoading(false);
    }
  };

  const createApiKey = async (e) => {
    e.preventDefault();
     
    if (!newKeyName?.trim()) {
      errorToast('Nome da API Key é obrigatório');
      return;
    }

    try {
      const response = await fetch('/api/keys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newKeyName.trim() }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create API key');
      }

      const newKey = await response.json();
      setApiKeys(currentKeys => [...currentKeys, newKey]);
      setShowNewKeyModal(false);
      setNewKeyName('');
      successToast('API Key criada com sucesso');
    } catch (error) {
      console.error('Error creating API key:', error);
      errorToast(`Erro ao criar API Key: ${error.message}`);
    }
  };

  const updateApiKey = async (id) => {
    try {
      const response = await fetch(`/api/keys/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: editName }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update API key');
      }
      
      await response.json();
      setApiKeys(keys => keys.map(k => k.id === id ? { ...k, name: editName } : k));
      setEditingKey(null);
      successToast('API Key atualizada com sucesso');
    } catch (error) {
      console.error('Error updating API key:', error);
      errorToast(`Erro ao atualizar API Key: ${error.message}`);
    }
  };

  const deleteApiKey = async (id) => {
    try {
      const response = await fetch(`/api/keys/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete API key');
      }
      
      setApiKeys(apiKeys.filter(key => key.id !== id));
      errorToast('API Key removida com sucesso');
    } catch (error) {
      console.error('Error deleting API key:', error);
      errorToast(`Erro ao remover API Key: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchApiKeys();
  }, []);

  return {
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
  };
} 