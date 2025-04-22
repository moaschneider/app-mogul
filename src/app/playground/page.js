'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Sidebar } from '../components/Sidebar';

export default function ApiPlayground() {
  const [apiKey, setApiKey] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Redirect to the protected route with the API key
    router.push(`/protected?key=${encodeURIComponent(apiKey.trim())}`);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex flex-col items-start">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                Dashboard
              </div>
              <div className="w-full flex justify-between items-end">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">API Playground</h2>
                <Link 
                  href="/dashboard" 
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Voltar ao Dashboard
                </Link>
              </div>
            </div>

            {/* API Key Form */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Testar API Key
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Insira sua API Key para testar sua validade e explorar os endpoints disponíveis.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    API Key
                  </label>
                  <input
                    type="text"
                    id="apiKey"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Exemplo: mog-xxxxxxxxxxxxxxxx"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting || !apiKey.trim()}
                  className={`w-full px-4 py-2 text-white rounded-lg ${
                    isSubmitting || !apiKey.trim()
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600'
                  } transition-colors flex items-center justify-center gap-2`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Processando...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                      <span>Testar API Key</span>
                    </>
                  )}
                </button>
              </form>
            </div>
            
            {/* Documentation Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                API Endpoints
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h4 className="font-mono text-sm font-semibold text-gray-800 dark:text-gray-200">GET /api/search</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Realiza buscas no repositório com base em palavras-chave.
                  </p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <h4 className="font-mono text-sm font-semibold text-gray-800 dark:text-gray-200">GET /api/analyze</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Analisa a qualidade do código e fornece métricas detalhadas.
                  </p>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-4 py-2">
                  <h4 className="font-mono text-sm font-semibold text-gray-800 dark:text-gray-200">GET /api/summarize</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Gera resumos inteligentes sobre a estrutura e funcionalidades do repositório.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 