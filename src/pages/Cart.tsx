import { Minus, Plus, Trash2, ArrowRight, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';
import { formatCurrency } from '../utils/format';

export function Cart() {
  const { items, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center space-y-4">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
          <ShoppingCart className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Seu carrinho está vazio</h2>
        <p className="text-gray-500 max-w-sm">
          Parece que você ainda não adicionou nenhum produto. Que tal explorar nossas ofertas?
        </p>
        <Link 
          to="/" 
          className="mt-6 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary hover:bg-primary-hover transition-colors"
        >
          Ver Produtos
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Carrinho de Compras</h1>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {items.map((item) => (
            <li key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between text-center sm:text-left w-full">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-1">{item.description}</p>
                </div>
                
                <div className="mt-4 flex items-center justify-between sm:justify-start sm:gap-8 w-full">
                  <p className="text-lg font-semibold text-gray-900">
                    {formatCurrency(item.price)}
                  </p>
                  
                  <div className="flex items-center border border-gray-300 rounded-full">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="p-1.5 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium text-gray-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1.5 text-gray-500 hover:text-gray-700"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-red-500 hover:text-red-700 transition-colors bg-red-50 rounded-full"
                    title="Remover produto"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        
        <div className="bg-gray-50 p-6 border-t border-gray-200">
          <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
            <p>Subtotal</p>
            <p className="text-2xl">{formatCurrency(cartTotal)}</p>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            Frete e impostos calculados no checkout.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={clearCart}
              className="flex-1 py-3 px-4 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-100 transition-colors"
            >
              Limpar Carrinho
            </button>
            <Link
              to="/checkout"
              className="flex-[2] flex items-center justify-center gap-2 py-3 px-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-medium transition-colors"
            >
              Ir para o Pagamento
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

