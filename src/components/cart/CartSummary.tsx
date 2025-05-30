import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';

const CartSummary: React.FC = () => {
  const { items, total } = useCart();
  
  // Calculate subtotal and taxes
  const TAX_RATE = 0.1; // 10% tax rate
  const subtotal = total;
  const taxes = subtotal * TAX_RATE;
  const totalWithTaxes = subtotal + taxes;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="font-serif text-xl font-bold mb-4 text-primary">Resumen del pedido</h2>
      
      {/* Summary details */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">IVA (10%)</span>
          <span>{formatPrice(taxes)}</span>
        </div>
        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span className="text-primary-dark">{formatPrice(totalWithTaxes)}</span>
          </div>
        </div>
      </div>
      
      {/* Items count */}
      <p className="text-sm text-gray-500 mb-6">
        {items.length} {items.length === 1 ? 'producto' : 'productos'} en tu carrito
      </p>
      
      {/* Checkout button */}
      <Link 
        to="/checkout"
        className={`btn-primary w-full ${items.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        aria-disabled={items.length === 0}
        onClick={(e) => items.length === 0 && e.preventDefault()}
      >
        Finalizar compra
        <ArrowRight size={16} className="ml-2" />
      </Link>
      
      {/* Continue shopping link */}
      <Link to="/" className="block text-center text-primary hover:text-primary-dark mt-4">
        Continuar comprando
      </Link>
    </div>
  );
};

export default CartSummary;