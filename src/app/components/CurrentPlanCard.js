'use client';

import React from 'react';

export function CurrentPlanCard() {
  return (
    <div className="rounded-xl overflow-hidden bg-gradient-to-r from-purple-500 to-orange-500 dark:from-rose-900 dark:via-purple-900 dark:to-blue-900 p-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="text-sm font-medium text-white dark:text-gray-300 mb-2">PLANO ATUAL</div>
          <h3 className="text-4xl font-bold text-white dark:text-white">Básico</h3>
        </div>
        <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm text-white font-medium dark:text-white transition-colors">
          Preferências
        </button>
      </div>
      
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-medium text-white dark:text-gray-200">Uso da API</span>
          <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path key="info-icon" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="mb-2">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-white dark:text-gray-200">Plano</span>
            <span className="font-medium text-white dark:text-gray-200">100 / 1000 Créditos</span>
          </div>
          <div className="h-2 bg-white/30 rounded-full overflow-hidden">
            <div className="h-full w-[10%] bg-white/60 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
} 