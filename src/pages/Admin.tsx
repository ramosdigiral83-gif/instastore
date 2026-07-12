import React, { useState } from 'react';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { useProducts } from '../ProductContext';
import { useTheme } from '../ThemeContext';
import { useSettings } from '../SettingsContext';
import { formatCurrency } from '../utils/format';
import { Product } from '../types';
import { ImageDropzone } from '../components/ImageDropzone';

const THEMES = [
  { id: 'theme-default', name: 'Índigo (Padrão)', colorClass: 'bg-indigo-600' },
  { id: 'theme-rose', name: 'Rosa', colorClass: 'bg-rose-600' },
  { id: 'theme-emerald', name: 'Esmeralda', colorClass: 'bg-emerald-600' },
  { id: 'theme-amber', name: 'Âmbar', colorClass: 'bg-amber-600' },
  { id: 'theme-violet', name: 'Violeta', colorClass: 'bg-violet-600' },
  { id: 'theme-slate', name: 'Grafite', colorClass: 'bg-slate-800' },
];

export function Admin() {
  const { products, addProduct, updateProduct, removeProduct } = useProducts();
  const { theme, setTheme } = useTheme();
  const { storeName, setStoreName, storeLogo, setStoreLogo, whatsappNumber, setWhatsappNumber } = useSettings();
  const [isEditing, setIsEditing] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [activeTab, setActiveTab] = useState<'physical' | 'digital'>('physical');
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    price: string | number;
    image: string;
    affiliateLink: string;
    type: 'physical' | 'digital';
  }>({ name: '', description: '', price: '', image: '', affiliateLink: '', type: 'physical' });

  const filteredProducts = products.filter(p => (p.type || 'physical') === activeTab);

  const handleEdit = (product: Product) => {
    setIsEditing(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      affiliateLink: product.affiliateLink || '',
      type: product.type || 'physical',
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
    
    if (isNaN(price)) {
      alert("Preço inválido.");
      return;
    }

    if (!formData.image) {
      alert("A imagem do produto é obrigatória.");
      return;
    }

    if (isEditing) {
      updateProduct({ ...isEditing, ...formData, price });
      setIsEditing(null);
    } else if (isAdding) {
      addProduct({ ...formData, price });
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-gray-900">Configurações da Loja</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Nome da Loja</label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-ring"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Logo da Loja</label>
              <ImageDropzone 
                value={storeLogo} 
                onChange={setStoreLogo} 
                label="Arraste e solte a logo aqui"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">WhatsApp para Pedidos</label>
              <input
                type="text"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="Ex: 5511999999999"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-ring"
              />
              <p className="text-xs text-gray-500">Inclua o código do país e DDD (somente números).</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-gray-900">Aparência</h2>
          <div className="flex flex-wrap gap-4">
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${t.colorClass} ${theme === t.id ? 'ring-4 ring-offset-2 ring-gray-300' : ''}`}
                title={t.name}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex space-x-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('physical')}
            className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'physical'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Produtos Físicos
          </button>
          <button
            onClick={() => setActiveTab('digital')}
            className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'digital'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Produtos Digitais
          </button>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Novo Produto
        </button>
      </div>

      {(isEditing || isAdding) && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-4">{isEditing ? 'Editar Produto' : 'Adicionar Produto'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Nome</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-ring"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Preço (R$)</label>
                <input
                  required
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-ring"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Imagem do Produto</label>
                <ImageDropzone 
                  value={formData.image} 
                  onChange={(val) => setFormData({ ...formData, image: val })} 
                  label="Arraste e solte a imagem do produto aqui"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Link de Afiliado (Opcional)</label>
                <input
                  type="url"
                  value={formData.affiliateLink}
                  onChange={(e) => setFormData({ ...formData, affiliateLink: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-ring"
                  placeholder="https://hotmart.com/..."
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Descrição</label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-ring resize-none"
              ></textarea>
            </div>

            <div className="flex gap-4 justify-end pt-2">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover font-medium"
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-sm font-medium text-gray-500">Produto</th>
                <th className="px-6 py-4 text-sm font-medium text-gray-500">Preço</th>
                <th className="px-6 py-4 text-sm font-medium text-gray-500">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500 line-clamp-1">{product.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {formatCurrency(product.price)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 text-gray-500 hover:text-primary transition-colors"
                        title="Editar"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeProduct(product.id)}
                        className="p-2 text-gray-500 hover:text-red-600 transition-colors"
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
                  <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                    Nenhum produto cadastrado nesta categoria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
