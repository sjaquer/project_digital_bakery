import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import CheckoutForm from '../components/checkout/CheckoutForm';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatters';

const CheckoutPage: React.FC = () => {
  const { items, total } = useCart();
  const navigate = useNavigate();
  
  // Calculate subtotal and taxes
  const TAX_RATE = 0.1; // 10% tax rate
  const subtotal = total;
  const taxes = subtotal * TAX_RATE;
  const totalWithTaxes = subtotal + taxes;
  
  // Redirect to cart if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items.length, navigate]);
  
  if (items.length === 0) {
    return null;
  }
  
  return (
    <div className="container-custom py-12">
      <div className="flex items-center mb-8">
        <Link to="/cart" className="inline-flex items-center text-primary hover:text-primary-dark mr-4">
          <ArrowLeft size={16} className="mr-1" />
          Volver al carrito
        </Link>
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary">
          Finalizar Compra
        </h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2 order-2 lg:order-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <CheckoutForm />
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="order-1 lg:order-2">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="font-serif text-xl font-bold mb-4 text-primary">Resumen del pedido</h2>
            
            {/* Products list */}
            <div className="mb-6">
              <div className="max-h-60 overflow-y-auto space-y-4 mb-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center">
                    <div className="w-12 h-12 rounded overflow-hidden mr-3">
                      <img 
                        src={item.product.imageUrl} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium">{item.product.name}</p>
                      <p className="text-xs text-gray-500">
                        {item.quantity} x {formatPrice(item.product.price)}
                      </p>
                    </div>
                    <div className="text-right text-sm font-medium text-primary-dark">
                      {formatPrice(item.quantity * item.product.price)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">IVA (10%)</span>
                  <span>{formatPrice(taxes)}</span>
                </div>
                <div className="flex justify-between font-bold mt-4 pt-4 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-primary-dark">{formatPrice(totalWithTaxes)}</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-cream-light rounded-md flex items-start">
              <ShoppingBag size={20} className="text-primary-dark mt-1 mr-3 flex-shrink-0" />
              <p className="text-sm text-gray-600">
                Los pedidos se preparan en el momento. Dependiendo del volumen de pedidos, 
                el tiempo de espera puede variar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;