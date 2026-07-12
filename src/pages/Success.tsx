import { CheckCircle2 } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useCart } from '../CartContext';

export function Success() {
  const [searchParams] = useSearchParams();
  const simulated = searchParams.get('simulated');
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear cart upon successful payment
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 text-center max-w-lg w-full space-y-6">
        <div className="flex justify-center">
          <CheckCircle2 className="w-20 h-20 text-green-500" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Pagamento Aprovado!</h1>
          <p className="text-gray-500">
            Sua compra foi processada com sucesso. Em breve você receberá um e-mail com os detalhes do seu pedido.
          </p>
        </div>

        {simulated && (
          <div className="bg-blue-50 text-blue-700 p-4 rounded-xl text-sm">
            <strong>Modo Simulado:</strong> O pagamento foi simulado pois a chave do Stripe não foi configurada.
          </div>
        )}

        <div className="pt-6">
          <Link 
            to="/"
            className="inline-block w-full py-3 px-6 bg-primary hover:bg-primary-hover text-white rounded-xl font-medium transition-colors"
          >
            Voltar para a Loja
          </Link>
        </div>
      </div>
    </div>
  );
}
