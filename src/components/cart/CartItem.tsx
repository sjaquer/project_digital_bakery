import React from 'react';
import { Trash, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { product, quantity } = item;
  const { updateQuantity, removeFromCart } = useCart();
  
  const handleIncrease = () => {
    updateQuantity(product.id, quantity + 1);
  };
  
  const handleDecrease = () => {
    updateQuantity(product.id, quantity - 1);
  };
  
  const handleRemove = () => {
    removeFromCart(product.id);
  };
  
  return (
    <div className="flex flex-col sm:flex-row items-center py-4 border-b border-gray-200 animate-fade-in">
      {/* Product Image */}
      <div className="w-full sm:w-20 h-20 mb-4 sm:mb-0 sm:mr-4">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover rounded"
          />
        </Link>
      </div>
      
      {/* Product Details */}
      <div className="flex-grow mb-4 sm:mb-0">
        <Link to={`/product/${product.id}`} className="font-medium text-primary hover:text-primary-dark">
          {product.name}
        </Link>
        <p className="text-sm text-gray-500 mt-1">{formatPrice(product.price)} por unidad</p>
      </div>
      
      {/* Quantity Controls */}
      <div className="flex items-center border border-gray-300 rounded-md mr-4">
        <button 
          onClick={handleDecrease}
          className="p-1 text-gray-500 hover:bg-gray-100 transition-colors"
          aria-label="Disminuir cantidad"
        >
          <Minus size={16} />
        </button>
        <span className="px-3 text-gray-700">{quantity}</span>
        <button 
          onClick={handleIncrease}
          className="p-1 text-gray-500 hover:bg-gray-100 transition-colors"
          aria-label="Aumentar cantidad"
          disabled={quantity >= product.stock}
        >
          <Plus size={16} />
        </button>
      </div>
      
      {/* Price */}
      <div className="font-medium text-primary-dark mr-4 text-right w-24">
        {formatPrice(product.price * quantity)}
      </div>
      
      {/* Remove Button */}
      <button 
        onClick={handleRemove}
        className="text-gray-400 hover:text-error transition-colors p-1"
        aria-label="Eliminar producto"
      >
        <Trash size={18} />
      </button>
    </div>
  );
};

export default CartItem;