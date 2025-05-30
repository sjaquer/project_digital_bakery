import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, items, updateQuantity } = useCart();
  
  // Check if product is in cart
  const cartItem = items.find(item => item.product.id === product.id);
  const isInCart = !!cartItem;
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };
  
  const handleIncreaseQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartItem) {
      updateQuantity(product.id, cartItem.quantity + 1);
    }
  };
  
  const handleDecreaseQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartItem && cartItem.quantity > 1) {
      updateQuantity(product.id, cartItem.quantity - 1);
    }
  };
  
  return (
    <Link 
      to={`/product/${product.id}`}
      className="card group hover:shadow-lg hover:-translate-y-1"
    >
      <div className="relative overflow-hidden">
        {/* Product image */}
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Featured badge */}
        {product.featured && (
          <div className="absolute top-2 left-2 bg-secondary text-white text-xs px-2 py-1 rounded">
            Destacado
          </div>
        )}
        
        {/* Stock badge */}
        {product.stock < 5 && (
          <div className="absolute top-2 right-2 bg-error text-white text-xs px-2 py-1 rounded">
            ¡Últimas unidades!
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-serif text-lg font-bold mb-1 text-primary">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-primary-dark font-bold">{formatPrice(product.price)}</span>
          
          {!isInCart ? (
            <button 
              onClick={handleAddToCart}
              className="btn-primary btn-sm"
              disabled={product.stock === 0}
            >
              <ShoppingCart size={16} className="mr-1" />
              Añadir
            </button>
          ) : (
            <div className="flex items-center border border-primary rounded-md">
              <button 
                onClick={handleDecreaseQuantity}
                className="p-1 text-primary hover:bg-primary hover:text-white transition-colors"
                aria-label="Disminuir cantidad"
              >
                <Minus size={16} />
              </button>
              <span className="px-2 text-primary font-medium">{cartItem.quantity}</span>
              <button 
                onClick={handleIncreaseQuantity}
                className="p-1 text-primary hover:bg-primary hover:text-white transition-colors"
                aria-label="Aumentar cantidad"
                disabled={cartItem.quantity >= product.stock}
              >
                <Plus size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;