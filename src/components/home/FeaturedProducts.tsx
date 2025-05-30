import React from 'react';
import ProductGrid from '../products/ProductGrid';
import { Product } from '../../types';

interface FeaturedProductsProps {
  products: Product[];
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => {
  // Filter featured products
  const featuredProducts = products.filter(product => product.featured);
  
  return (
    <section id="productos\" className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">
            Productos Destacados
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Nuestras creaciones más populares, preparadas diariamente con ingredientes frescos y técnicas tradicionales.
          </p>
        </div>
        
        <ProductGrid products={featuredProducts} />
      </div>
    </section>
  );
};

export default FeaturedProducts;