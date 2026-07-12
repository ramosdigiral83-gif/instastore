import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useCart } from '../CartContext';
import { useSettings } from '../SettingsContext';
import { formatCurrency } from '../utils/format';

export function Checkout() {
  const { items, cartTotal, clearCart } = useCart();
  const { whatsappNumber } = useSettings();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (whatsappNumber) {
      // Build WhatsApp message
      let text = `*NOVO PEDIDO*\n\n`;
      text += `*Cliente:* ${formData.name}\n`;
      text += `*Email:* ${formData.email}\n`;
      text += `*Telefone:* ${formData.phone}\n\n`;
      text += `*Endereço de Entrega:*\n${formData.address}, ${formData.city} - ${formData.state}\nCEP: ${formData.zipCode}\n\n`;
      
      text += `*Itens do Pedido:*\n`;
      items.forEach(item => {
        text += `- ${item.quantity}x ${item.name} (${formatCurrency(item.price)})\n`;
      });
      text += `\n*Total a pagar: ${formatCurrency(cartTotal)}*\n\n`;
      text += `Aguardo instruções para pagamento!`;

      const encodedText = encodeURIComponent(text);
      const cleanNumber = whatsappNumber.replace(/\D/g, '');
      const waUrl = `https://wa.me/${cleanNumber}?text=${encodedText}`;
      
      window.open(waUrl, '_blank');
      
      // Clear cart and redirect to success
      clearCart();
      navigate('/success');
    } else {
      alert('Número de WhatsApp não configurado pelo lojista.');
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/cart')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-6 text-gray-900">Seus Dados</h2>
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Nome Completo</label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-ring"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">E-mail</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-ring"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Telefone / WhatsApp</label>
                <input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-ring"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Endereço (Rua, Número, Complemento)</label>
              <input
                required
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-ring"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">CEP</label>
                <input
                  required
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-ring"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-medium text-gray-700">Cidade</label>
                <input
                  required
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-ring"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Estado</label>
              <input
                required
                type="text"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-ring"
              />
            </div>
          </form>
        </div>

        <div>
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 sticky top-24">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Resumo do Pedido</h3>
            
            <div className="space-y-3 mb-6 max-h-48 overflow-y-auto">
              {items.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600 line-clamp-1">{item.quantity}x {item.name}</span>
                  <span className="font-medium text-gray-900">{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4 space-y-4">
              <div className="flex justify-between items-center text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>{formatCurrency(cartTotal)}</span>
              </div>
              <button
                type="submit"
                form="checkout-form"
                className="w-full py-3 px-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-medium transition-colors"
              >
                Finalizar via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
