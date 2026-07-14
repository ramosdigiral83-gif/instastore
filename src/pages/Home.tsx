import React, { useState } from 'react';
import { ShoppingCart, ArrowRight, Star, TrendingUp, Zap, ShieldCheck, Package } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { useProducts } from '../contexts/ProductContext';
import { formatCurrency } from '../utils/format';
import { Product } from '../types';

export function Home() {
  const { products } = useProducts();
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [addedId, setAddedId] = useState<string | null>(null);

  // Mock Categories
  const categories = [
    { id: 'all', name: 'Todos os Produtos' },
    { id: 'physical', name: 'Físicos' },
    { id: 'digital', name: 'Digitais' },
  ];

  const filteredProducts = products.filter(p => {
    if (activeCategory === 'all') return true;
    return p.type === activeCategory;
  });

  const handleAddToCart = (product: Product) => {
    if (product.type === 'digital' && product.affiliateLink) {
      window.open(product.affiliateLink, '_blank');
      return;
    }
    
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-secondary/50 -z-10" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent -z-10 blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl mx-auto space-y-8"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-sm font-semibold tracking-wide border border-primary/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Lançamento Oficial
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground font-heading">
              A vitrine <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">definitiva</span> para o seu negócio.
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Descubra os melhores produtos físicos e digitais em uma experiência de compra premium, rápida e segura.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl shadow-primary/20 flex items-center justify-center gap-2">
                Explorar Produtos <ArrowRight className="w-5 h-5" />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-white text-foreground rounded-full font-bold text-lg border border-border hover:bg-secondary transition-colors">
                Ver Categorias
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Zap, title: "Entrega Instantânea", desc: "Acesso imediato a produtos digitais após a confirmação do pagamento." },
            { icon: ShieldCheck, title: "Compra 100% Segura", desc: "Seus dados protegidos com criptografia de ponta a ponta." },
            { icon: Star, title: "Qualidade Premium", desc: "Curadoria especializada selecionando apenas os melhores produtos." }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="p-6 rounded-3xl bg-white border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2 font-heading">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Product Catalog */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-end md:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground font-heading flex items-center gap-2">
              <TrendingUp className="w-8 h-8 text-primary" />
              Destaques da Semana
            </h2>
            <p className="text-muted-foreground mt-2">Os produtos mais desejados pelos nossos clientes.</p>
          </div>

          <div className="flex bg-secondary p-1.5 rounded-full overflow-x-auto w-full md:w-auto">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2.5 text-sm font-semibold rounded-full transition-all whitespace-nowrap ${
                  activeCategory === category.id 
                    ? 'bg-white text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-secondary/30 rounded-3xl border border-dashed border-border">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-lg text-muted-foreground font-medium">Nenhum produto encontrado.</p>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filteredProducts.map(product => (
              <motion.div 
                key={product.id} 
                variants={itemVariants}
                className="group flex flex-col bg-white rounded-3xl border border-border overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden bg-secondary relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1.5 text-xs font-bold rounded-full backdrop-blur-md shadow-sm ${
                      product.type === 'digital' 
                        ? 'bg-purple-500/90 text-white' 
                        : 'bg-white/90 text-foreground'
                    }`}>
                      {product.type === 'digital' ? 'Digital' : 'Físico'}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-bold text-lg text-foreground line-clamp-1 mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-6 flex-grow">{product.description}</p>
                  
                  <div className="flex items-end justify-between mt-auto">
                    <div>
                      <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider block mb-1">Preço</span>
                      <span className="text-2xl font-extrabold text-foreground font-heading">
                        {formatCurrency(product.price)}
                      </span>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        addedId === product.id
                          ? 'bg-emerald-500 text-white scale-110'
                          : product.type === 'digital' && product.affiliateLink
                            ? 'bg-primary text-primary-foreground hover:bg-primary-hover hover:scale-105'
                            : 'bg-primary text-primary-foreground hover:bg-primary-hover hover:scale-105'
                      }`}
                      title={product.type === 'digital' ? "Acessar Produto" : "Adicionar ao Carrinho"}
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
}

