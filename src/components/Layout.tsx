import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, LogOut, Store, X, Plus, Minus } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { formatCurrency } from '../utils/format';

export function Layout() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
            <Store className="w-6 h-6" />
            <span className="text-xl font-bold tracking-tight">Minha Loja</span>
          </Link>

          <div className="flex items-center gap-6">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link to="/admin" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
                  Painel Admin
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sair
                </button>
              </div>
            ) : null}

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-slate-600 hover:text-primary transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center transform translate-x-1 -translate-y-1">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-slate-200 py-8 text-center text-slate-500 text-sm">
        <p>&copy; 2026 Minha Loja. Todos os direitos reservados.</p>
        {!isAuthenticated && (
          <Link to="/admin" className="inline-block mt-4 text-xs text-slate-400 hover:text-slate-600 transition-colors">
            Acesso Lojista
          </Link>
        )}
      </footer>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50 transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
            <div className="p-4 flex items-center justify-between border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" /> Carrinho
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center text-slate-500 mt-10">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p>Seu carrinho está vazio.</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 border border-slate-100 p-3 rounded-xl">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 line-clamp-2">{item.name}</h3>
                        <p className="text-sm font-medium text-slate-600 mt-1">
                          {formatCurrency(item.price)}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-3 bg-slate-50 rounded-lg px-2 py-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-slate-500 hover:text-primary transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-slate-500 hover:text-primary transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-xs text-red-500 hover:text-red-600 font-medium transition-colors"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-4 border-t border-slate-100 bg-slate-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-slate-600">Total</span>
                  <span className="text-lg font-bold text-slate-900">{formatCurrency(cartTotal)}</span>
                </div>
                <button className="w-full py-3 px-4 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition-colors shadow-sm">
                  Finalizar Compra
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
