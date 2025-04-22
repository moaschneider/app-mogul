'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Sidebar } from '../components/Sidebar';
import { successToast, errorToast } from '@/lib/toast';

// Extract the search params logic into a separate component
function SearchParamsHandler({ onParamsReady }) {
  const searchParams = useSearchParams();
  const key = searchParams.get('key');
  
  useEffect(() => {
    onParamsReady(key);
  }, [key, onParamsReady]);
  
  return null;
}

function ProtectedContent() {
  const [validating, setValidating] = useState(true);
  const [apiKeyInfo, setApiKeyInfo] = useState(null);
  const router = useRouter();
  const toastShownRef = useRef(false);
  
  const handleSearchParams = async (key) => {
    toastShownRef.current = false;
    
    if (!key) {
      errorToast('API Key não fornecida');
      router.push('/playground');
      return;
    }
    
    try {
      const response = await fetch(`/api/validate-key?key=${encodeURIComponent(key)}&showToast=false`);
      const data = await response.json();
      
      if (data.valid) {
        setApiKeyInfo({
          valid: true,
          name: data.name,
          type: data.type,
          usage: data.usage,
          lastUsed: data.lastUsed
        });
      } else {
        setApiKeyInfo({
          valid: false,
          error: data.error || "API Key inválida"
        });
      }
    } catch (error) {
      console.error('Error validating API key:', error);
      errorToast('Erro ao validar API Key');
      router.push('/playground');
    } finally {
      setValidating(false);
    }
  };
  
  useEffect(() => {
    if (!validating && apiKeyInfo && !toastShownRef.current) {
      if (apiKeyInfo.valid) {
        successToast('API Key válida');
      } else if (apiKeyInfo.error) {
        errorToast(apiKeyInfo.error);
      }
      toastShownRef.current = true;
    }
  }, [validating, apiKeyInfo]);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Wrap the search params handler in its own Suspense boundary */}
        <Suspense fallback={null}>
          <SearchParamsHandler onParamsReady={handleSearchParams} />
        </Suspense>
        
        <div className="p-8">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex flex-col items-start">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                API Playground
              </div>
              <div className="w-full flex justify-between items-end">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Validação da API Key</h2>
                <button
                  onClick={() => router.push('/playground')}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Voltar ao Playground
                </button>
              </div>
            </div>

            {/* Validation Result */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              {validating ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <svg className="animate-spin h-10 w-10 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="text-lg text-gray-600 dark:text-gray-300">Validando API Key...</p>
                </div>
              ) : apiKeyInfo?.valid ? (
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        API Key Válida
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Sua API Key foi validada com sucesso.
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Nome</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{apiKeyInfo.name}</p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Tipo</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{apiKeyInfo.type}</p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Uso</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{apiKeyInfo.usage} requisições</p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Último uso</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {new Date(apiKeyInfo.lastUsed).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <button
                      onClick={() => router.push('/playground')}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Voltar ao Playground
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        API Key Inválida
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {apiKeyInfo?.error || 'A API Key fornecida não é válida.'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg mt-6">
                    <p className="text-sm text-red-600 dark:text-red-400">
                      Certifique-se de que a API Key está no formato correto (ex: mog-xxxxxxxxxxxxxxxx) e existe no banco de dados.
                    </p>
                  </div>
                  
                  <div className="mt-8">
                    <button
                      onClick={() => router.push('/playground')}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Tentar Novamente
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProtectedPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProtectedContent />
    </Suspense>
  );
} 