import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Package, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

export function StorefrontLayout() {
  const { isAuthenticated, logout } = useAuth();
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      {/* Navbar */}
      <header 
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-border shadow-sm py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link 
              to="/" 
              className="flex items-center gap-2 group"
            >
              <div className="w-10 h-10 bg-primary text-primary-foreground rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-md">
                <Package className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold tracking-tight font-heading">
                InstaStore<span className="text-primary/70">.</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">Início</Link>
              <Link to="/products" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">Produtos</Link>
              <Link to="/categories" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">Categorias</Link>
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Bar - Desktop Only */}
            <div className="hidden lg:flex relative group">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Buscar produtos..." 
                className="pl-9 pr-4 py-2 bg-secondary/50 border-transparent rounded-full text-sm focus:bg-background focus:border-border focus:ring-2 focus:ring-primary/20 outline-none w-64 transition-all"
              />
            </div>

            <Link 
              to="/cart" 
              className="relative p-2.5 text-foreground/80 hover:text-primary hover:bg-secondary rounded-full transition-all"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-0 right-0 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-background"
                >
                  {totalItems}
                </motion.span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-2 border-l border-border pl-4 ml-2">
                <button 
                  onClick={() => logout()}
                  className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-red-600 transition-colors"
                >
                  Sair
                </button>
                <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center cursor-pointer">
                  <span className="text-sm font-bold text-primary">US</span>
                </div>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-full hover:bg-primary-hover hover:shadow-md transition-all active:scale-95"
              >
                <User className="w-4 h-4" />
                Entrar
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-foreground"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[72px] bg-background border-b border-border shadow-xl z-40 md:hidden p-4 flex flex-col gap-4"
          >
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Buscar produtos..." 
                className="w-full pl-9 pr-4 py-3 bg-secondary rounded-xl text-sm outline-none"
              />
            </div>
            <nav className="flex flex-col">
              <Link to="/" className="py-3 px-4 rounded-lg hover:bg-secondary font-medium">Início</Link>
              <Link to="/products" className="py-3 px-4 rounded-lg hover:bg-secondary font-medium">Produtos</Link>
              <Link to="/categories" className="py-3 px-4 rounded-lg hover:bg-secondary font-medium">Categorias</Link>
            </nav>
            <div className="border-t border-border pt-4">
              {isAuthenticated ? (
                <div className="flex flex-col gap-2">
                  <button onClick={() => logout()} className="text-left py-3 px-4 rounded-lg hover:bg-red-50 text-red-600 font-medium">
                    Sair da conta
                  </button>
                </div>
              ) : (
                <Link to="/login" className="flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-xl font-medium">
                  <User className="w-5 h-5" />
                  Entrar na conta
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-border pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center">
                  <Package className="w-4 h-4" />
                </div>
                <span className="text-xl font-bold font-heading">InstaStore.</span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A plataforma mais completa para criar sua vitrine virtual moderna e escalável.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Departamentos</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link to="#" className="hover:text-primary transition-colors">Eletrônicos</Link></li>
                <li><Link to="#" className="hover:text-primary transition-colors">Casa e Decoração</Link></li>
                <li><Link to="#" className="hover:text-primary transition-colors">Moda</Link></li>
                <li><Link to="#" className="hover:text-primary transition-colors">Esportes</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Institucional</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link to="#" className="hover:text-primary transition-colors">Sobre Nós</Link></li>
                <li><Link to="#" className="hover:text-primary transition-colors">Contato</Link></li>
                <li><Link to="#" className="hover:text-primary transition-colors">Política de Privacidade</Link></li>
                <li><Link to="#" className="hover:text-primary transition-colors">Termos de Serviço</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Newsletter</h4>
              <p className="text-sm text-muted-foreground mb-4">Receba ofertas exclusivas por e-mail.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Seu e-mail" className="flex-1 px-3 py-2 bg-secondary rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20" />
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary-hover">Assinar</button>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col items-center justify-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} InstaStore. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
