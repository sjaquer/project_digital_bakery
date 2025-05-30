import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Plus, Minus, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, items } = useCart();
  
  const cartItem = items.find(item => item.product.id === product.id);
  const totalInCart = cartItem?.quantity || 0;
  
  const handleIncrease = () => {
    if (quantity < product.stock - totalInCart) {
      setQuantity(prev => prev + 1);
    }
  };
  
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };
  
  // Stock status
  const getStockStatus = () => {
    if (product.stock <= 0) return { text: 'Agotado', color: 'text-error' };
    if (product.stock < 5) return { text: 'Pocas unidades', color: 'text-warning-dark' };
    return { text: 'En stock', color: 'text-success' };
  };
  
  const stockStatus = getStockStatus();
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="h-80 md:h-full overflow-hidden">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Product Info */}
        <div className="p-6 md:p-8 flex flex-col">
          <Link to="/" className="inline-flex items-center text-primary hover:text-primary-dark mb-4">
            <ArrowLeft size={16} className="mr-1" />
            Volver a productos
          </Link>
          
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-2">
            {product.name}
          </h1>
          
          <div className="flex items-center mb-4">
            <span className="inline-flex items-center mr-4">
              <CheckCircle size={16} className={`mr-1 ${stockStatus.color}`} />
              <span className={`text-sm ${stockStatus.color}`}>{stockStatus.text}</span>
            </span>
            <span className="text-sm text-gray-500">
              Categoría: <span className="capitalize">{product.category}</span>
            </span>
          </div>
          
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          <div className="mt-auto">
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-bold text-primary-dark">
                {formatPrice(product.price)}
              </span>
              
              <div className="flex items-center border border-primary rounded-md">
                <button 
                  onClick={handleDecrease}
                  className="p-2 text-primary hover:bg-primary hover:text-white transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 text-primary font-medium">{quantity}</span>
                <button 
                  onClick={handleIncrease}
                  className="p-2 text-primary hover:bg-primary hover:text-white transition-colors"
                  disabled={quantity >= product.stock - totalInCart}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            
            {totalInCart > 0 && (
              <p className="text-sm text-primary mb-2">
                Ya tienes {totalInCart} {totalInCart === 1 ? 'unidad' : 'unidades'} en el carrito
              </p>
            )}
            
            <button 
              onClick={handleAddToCart}
              className="btn-primary w-full"
              disabled={product.stock <= 0 || product.stock - totalInCart < 1}
            >
              <ShoppingCart size={20} className="mr-2" />
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;