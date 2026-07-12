import { Link, Outlet, useLocation } from 'react-router-dom';
import { ShoppingCart, Store, Settings, LogOut } from 'lucide-react';
import { useCart } from '../CartContext';
import { useSettings } from '../SettingsContext';
import { useAuth } from '../AuthContext';

export function Layout() {
  const { cartCount } = useCart();
  const { storeName, storeLogo } = useSettings();
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 text-primary hover:text-primary-hover transition-colors">
              {storeLogo ? (
                <img src={storeLogo} alt="Logo" className="w-8 h-8 object-contain rounded" />
              ) : (
                <Store className="w-8 h-8" />
              )}
              <span className="text-xl font-bold tracking-tight">{storeName}</span>
            </Link>

            <nav className="hidden sm:flex gap-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === '/' || location.pathname === '/cart' || location.pathname === '/success'
                    ? 'bg-primary-light text-primary-text'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                Início
              </Link>
              {isAuthenticated && (
                <Link
                  to="/admin"
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === '/admin'
                      ? 'bg-primary-light text-primary-text'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  Admin
                </Link>
              )}
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-primary transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </Link>
            {isAuthenticated && (
              <button onClick={logout} className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Sair">
                <LogOut className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Outlet />
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-8 text-center text-gray-500 text-sm">
        <p>&copy; 2026 {storeName}. Todos os direitos reservados.</p>
        {!isAuthenticated && (
           <Link to="/login" className="inline-block mt-4 text-xs text-gray-300 hover:text-gray-400">
             Acesso Lojista
           </Link>
        )}
      </footer>
    </div>
  );
}
