import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Package, LayoutDashboard, Users, Settings, Search, BarChart3, TrendingUp, Filter, Upload } from 'lucide-react';
import { motion } from 'framer-motion';
import { useProducts } from '../contexts/ProductContext';
import { formatCurrency } from '../utils/format';
import { Product } from '../types';

export function Admin() {
  const { products, addProduct, updateProduct, removeProduct } = useProducts();
  const [isEditing, setIsEditing] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [activeTab, setActiveTab] = useState<'physical' | 'digital'>('physical');
  const [activeMenu, setActiveMenu] = useState('products');
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    price: string | number;
    image: string;
    affiliateLink: string;
    type: 'physical' | 'digital';
  }>({ name: '', description: '', price: '', image: '', affiliateLink: '', type: 'physical' });

  const filteredProducts = products.filter(p => p.type === activeTab);

  const handleEdit = (product: Product) => {
    setIsEditing(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      affiliateLink: product.affiliateLink || '',
      type: product.type,
    });
    setIsAdding(false);
  };

  const handleAdd = () => {
    setIsAdding(true);
    setIsEditing(null);
    setFormData({ name: '', description: '', price: '', image: '', affiliateLink: '', type: activeTab });
  };

  const handleCancel = () => {
    setIsEditing(null);
    setIsAdding(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const price = typeof formData.price === 'string' ? parseFloat(formData.price) : formData.price;
    
    if (isEditing) {
      updateProduct({ ...isEditing, ...formData, price });
    } else {
      addProduct({ ...formData, price });
    }
    
    setIsEditing(null);
    setIsAdding(false);
  };

  const sidebarMenu = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'products', icon: Package, label: 'Produtos' },
    { id: 'customers', icon: Users, label: 'Clientes' },
    { id: 'analytics', icon: BarChart3, label: 'Relatórios' },
    { id: 'settings', icon: Settings, label: 'Configurações' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-secondary/30 mt-[-72px] pt-[72px]">
      {/* Sidebar */}
      <aside className="w-64 bg-background border-r border-border flex flex-col hidden md:flex">
        <div className="p-4">
          <nav className="space-y-1">
            {sidebarMenu.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeMenu === item.id 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4 border-t border-border">
          <div className="bg-secondary/50 p-4 rounded-xl">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Plano Pro</p>
            <div className="w-full bg-border rounded-full h-2 mb-2">
              <div className="bg-primary h-2 rounded-full w-3/4"></div>
            </div>
            <p className="text-xs text-muted-foreground">75% do limite de armazenamento usado.</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 md:p-8">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto space-y-8"
        >
          {activeMenu === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold font-heading">Dashboard</h1>
                  <p className="text-muted-foreground">Bem-vindo de volta! Aqui está o resumo da sua loja.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: "Receita Total", value: "R$ 14.590,00", increase: "+12.5%", icon: TrendingUp },
                  { label: "Pedidos", value: "145", increase: "+5.2%", icon: Package },
                  { label: "Novos Clientes", value: "48", increase: "+18.1%", icon: Users },
                ].map((stat, i) => (
                  <div key={i} className="bg-background p-6 rounded-3xl border border-border shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center">
                        <stat.icon className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-sm font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">
                        {stat.increase}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground font-medium mb-1">{stat.label}</p>
                    <h3 className="text-2xl font-extrabold font-heading">{stat.value}</h3>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeMenu === 'products' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold font-heading">Catálogo de Produtos</h1>
                  <p className="text-muted-foreground">Gerencie seus produtos, estoque e preços.</p>
                </div>
                <button
                  onClick={handleAdd}
                  className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-full hover:bg-primary-hover hover:scale-105 transition-all shadow-md font-semibold text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Novo Produto
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-background p-2 rounded-2xl border border-border shadow-sm">
                <div className="flex w-full sm:w-auto p-1 bg-secondary rounded-xl">
                  <button
                    onClick={() => { setActiveTab('physical'); handleCancel(); }}
                    className={`flex-1 sm:flex-none py-2 px-6 text-sm font-bold rounded-lg transition-all ${
                      activeTab === 'physical'
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Físicos
                  </button>
                  <button
                    onClick={() => { setActiveTab('digital'); handleCancel(); }}
                    className={`flex-1 sm:flex-none py-2 px-6 text-sm font-bold rounded-lg transition-all ${
                      activeTab === 'digital'
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Digitais
                  </button>
                </div>
                
                <div className="flex items-center gap-2 w-full sm:w-auto px-2">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input 
                      type="text" 
                      placeholder="Buscar produto..."
                      className="w-full pl-9 pr-4 py-2 bg-secondary border-transparent rounded-lg text-sm focus:bg-background focus:border-border focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                  <button className="p-2 border border-border rounded-lg text-muted-foreground hover:bg-secondary transition-colors">
                    <Filter className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {(isEditing || isAdding) && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-background p-6 md:p-8 rounded-3xl shadow-sm border border-border"
                >
                  <h2 className="text-xl font-bold mb-6 font-heading">
                    {isEditing ? 'Editar Produto' : 'Adicionar Novo Produto'}
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">Nome do Produto</label>
                        <input
                          required
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-background transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">Preço (R$)</label>
                        <input
                          required
                          type="number"
                          step="0.01"
                          min="0"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-background transition-all"
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-semibold text-foreground">Imagem do Produto</label>
                        <div 
                          className={`w-full relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-all ${formData.image ? 'border-primary bg-primary/5' : 'border-border bg-secondary/30 hover:bg-secondary/50'}`}
                          onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                          onDrop={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const file = e.dataTransfer.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                setFormData({ ...formData, image: event.target?.result as string });
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        >
                          <input 
                            type="file" 
                            accept="image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                  setFormData({ ...formData, image: event.target?.result as string });
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                          {formData.image ? (
                            <div className="flex flex-col items-center gap-4">
                              <img src={formData.image} alt="Preview" className="h-32 object-contain rounded-lg shadow-sm" />
                              <span className="text-sm font-medium text-primary bg-background px-3 py-1 rounded-md shadow-sm border border-border">Alterar imagem</span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                              <Upload className="w-8 h-8 mb-2" />
                              <p className="text-sm font-semibold">Arraste e solte uma imagem aqui</p>
                              <p className="text-xs">ou clique para selecionar</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {formData.type === 'digital' && (
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-semibold text-foreground">Link de Afiliado (Checkout Externo)</label>
                          <input
                            type="url"
                            value={formData.affiliateLink}
                            onChange={(e) => setFormData({ ...formData, affiliateLink: e.target.value })}
                            className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-background transition-all"
                            placeholder="https://pay.hotmart.com/..."
                          />
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Descrição</label>
                      <textarea
                        required
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-background transition-all resize-none"
                      />
                    </div>

                    <div className="flex gap-3 justify-end pt-6 border-t border-border">
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="px-6 py-3 border border-border rounded-xl text-foreground font-semibold hover:bg-secondary transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary-hover hover:scale-105 transition-all shadow-md"
                      >
                        {isEditing ? 'Salvar Alterações' : 'Publicar Produto'}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              <div className="bg-background rounded-3xl shadow-sm border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-secondary/50 border-b border-border">
                        <th className="px-6 py-5 text-xs font-bold text-muted-foreground uppercase tracking-wider">Produto</th>
                        <th className="px-6 py-5 text-xs font-bold text-muted-foreground uppercase tracking-wider">Preço</th>
                        <th className="px-6 py-5 text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                        <th className="px-6 py-5 text-xs font-bold text-muted-foreground uppercase tracking-wider w-24">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-secondary/30 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <div className="w-14 h-14 rounded-xl bg-secondary overflow-hidden flex-shrink-0 border border-border relative">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <div className="font-bold text-foreground text-base mb-1">{product.name}</div>
                                <div className="text-sm text-muted-foreground line-clamp-1 max-w-md">{product.description}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-bold text-foreground">
                            {formatCurrency(product.price)}
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-emerald-100 text-emerald-700 border border-emerald-200">
                              Ativo
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => handleEdit(product)}
                                className="p-2 text-muted-foreground hover:text-primary transition-colors bg-background rounded-lg border border-border hover:border-primary/30 shadow-sm"
                                title="Editar"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => removeProduct(product.id)}
                                className="p-2 text-muted-foreground hover:text-red-600 transition-colors bg-background rounded-lg border border-border hover:border-red-200 shadow-sm"
                                title="Excluir"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredProducts.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-6 py-16 text-center">
                            <Package className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                            <p className="text-muted-foreground font-medium">Nenhum produto cadastrado.</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}

