import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Lock, Mail } from 'lucide-react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'ramos.digiral83@gmail.com' && password === 'admin123') {
      login();
      navigate('/admin');
    } else {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Lock className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-center text-slate-900 mb-2">Acesso Restrito</h1>
        <p className="text-center text-slate-500 mb-8">Faça login para acessar o painel administrativo.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 block">E-mail</label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu e-mail"
                className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                  error 
                    ? 'border-red-300 focus:ring-red-200 focus:border-red-500' 
                    : 'border-slate-200 focus:ring-primary/20 focus:border-primary'
                }`}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 block">Senha de Acesso</label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite a senha"
                className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                  error 
                    ? 'border-red-300 focus:ring-red-200 focus:border-red-500' 
                    : 'border-slate-200 focus:ring-primary/20 focus:border-primary'
                }`}
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-1 font-medium animate-in slide-in-from-top-1">
                E-mail ou senha incorretos.
              </p>
            )}
          </div>
          
          <button
            type="submit"
            className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-colors shadow-sm"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
