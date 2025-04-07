'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [letterIndex, setLetterIndex] = useState(0);
  const title = "MOGUL";
  
  useEffect(() => {
    const timer = setInterval(() => {
      setLetterIndex((prev) => (prev + 1) % (title.length + 1));
    }, 200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-indigo-900 to-purple-900">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 p-6 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-white/90 font-light">MOGUL</div>
          <div className="flex gap-8">
            <Link href="/dashboard" className="text-white/75 hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="#" className="text-white/75 hover:text-white transition-colors">
              Docs
            </Link>
            <Link href="#" className="text-white/75 hover:text-white transition-colors">
              Contato
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative min-h-screen flex flex-col items-center justify-center p-12">
        {/* Animated text */}
        <div className="text-center mb-2">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-9xl font-light tracking-widest sm:tracking-[0.2em] text-white mb-8 relative">
            {title.split('').map((letter, index) => (
              <span
                key={index}
                className={`inline-block transition-all duration-200 ${
                  index === letterIndex ? 'text-blue-400 scale-110' : ''
                }`}
              >
                {letter}
              </span>
            ))}
          </h1>
          <p className="text-white/60 text-xl tracking-wider">
            Gerenciamento seguro de API Key
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl w-full mt-12">
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 transform hover:scale-105 transition-all">
            <h3 className="text-blue-400 text-xl font-semibold mb-4">Armazenamento Seguro</h3>
            <p className="text-white/70">
              Criptografia e armazenamento empresarial seguro para todas as suas API keys
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 transform hover:scale-105 transition-all">
            <h3 className="text-blue-400 text-xl font-semibold mb-4">Gerenciamento Fácil</h3>
            <p className="text-white/70">
              Dashboard intuitivo para criar, atualizar e revogar API keys
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 transform hover:scale-105 transition-all">
            <h3 className="text-blue-400 text-xl font-semibold mb-4">Análise de Uso</h3>
            <p className="text-white/70">
              Monitoramento em tempo real e análise detalhada do uso da API key
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href="/dashboard"
          className="mt-16 px-12 py-4 bg-blue-500 hover:bg-blue-400 text-white rounded-full 
                   font-medium tracking-wide transform hover:scale-105 transition-all
                   shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:shadow-[0_0_50px_rgba(59,130,246,0.6)]"
        >
          Comece agora
        </Link>

        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
      </main>
    </div>
  );
}
