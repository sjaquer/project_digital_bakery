import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
  const { items } = useCart();
  
  return (
    <div className="container-custom py-12">
      <div className="flex items-center mb-8">
        <Link to="/" className="inline-flex items-center text-primary hover:text-primary-dark mr-4">
          <ArrowLeft size={16} className="mr-1" />
          Continuar comprando
        </Link>
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary">
          Tu Carrito
        </h1>
      </div>
      
      {items.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <ShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
          <h2 className="font-serif text-xl font-bold mb-2 text-primary">Tu carrito está vacío</h2>
          <p className="text-gray-600 mb-6">Parece que aún no has añadido productos a tu carrito.</p>
          <Link to="/" className="btn-primary">
            Explorar productos
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-4 pb-4 border-b border-gray-200">
                <h2 className="font-serif text-xl font-bold text-primary">
                  {items.length} {items.length === 1 ? 'Producto' : 'Productos'}
                </h2>
              </div>
              
              <div className="space-y-1">
                {items.map((item) => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;