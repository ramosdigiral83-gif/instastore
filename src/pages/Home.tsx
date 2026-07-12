import { Plus } from 'lucide-react';
import { useCart } from '../CartContext';
import { useProducts } from '../ProductContext';
import { formatCurrency } from '../utils/format';
import { useState } from 'react';

export function Home() {
  const { addToCart } = useCart();
  const { products } = useProducts();
  const [addedId, setAddedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'physical' | 'digital'>('physical');

  const filteredProducts = products.filter(p => (p.type || 'physical') === activeTab);

  const handleAdd = (product: any) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1000);
  };

  return (
    <div className="space-y-8">
      <div className="text-center md:text-left space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Nossos Produtos</h1>
        <p className="text-gray-500">Encontre os melhores equipamentos com os melhores preços.</p>
      </div>

      <div className="flex border-b border-gray-200">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('physical')}
            className={`py-4 px-1 text-base font-medium border-b-2 transition-colors ${
              activeTab === 'physical'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Produtos Físicos
          </button>
          <button
            onClick={() => setActiveTab('digital')}
            className={`py-4 px-1 text-base font-medium border-b-2 transition-colors ${
              activeTab === 'digital'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Produtos Digitais
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col group">
            <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 flex flex-col flex-1">
              <div className="flex-1 space-y-2">
                <h3 className="font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">
                  {formatCurrency(product.price)}
                </span>
                {product.affiliateLink ? (
                  <a
                    href={product.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium transition-colors bg-gray-100 text-gray-900 hover:bg-primary hover:text-white"
                  >
                    Comprar
                  </a>
                ) : (
                  <button
                    onClick={() => handleAdd(product)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                      addedId === product.id 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-900 hover:bg-primary hover:text-white'
                    }`}
                  >
                    {addedId === product.id ? (
                      'Adicionado'
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        Comprar
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
