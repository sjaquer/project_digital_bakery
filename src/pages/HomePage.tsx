import React, { useState, useEffect } from 'react';
import Hero from '../components/home/Hero';
import FeaturedProducts from '../components/home/FeaturedProducts';
import CategorySection from '../components/home/CategorySection';
import ProductGrid from '../components/products/ProductGrid';
import { Product } from '../types';
import { productApi, mockApi } from '../api';
import toast from 'react-hot-toast';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasShownError, setHasShownError] = useState(false); // Añadir este estado

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productApi.getAll();
        
        if (response.error) {
          throw new Error(response.error);
        }
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Solo mostrar el toast si no se ha mostrado antes
        if (!hasShownError) {
          toast.error('Error al cargar los productos. Mostrando datos de muestra.');
          setHasShownError(true);
        }
        
        // Fallback to mock data
        const mockProducts = mockApi.getProducts();
        setProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [hasShownError]); // Añadir hasShownError como dependencia
  
  // Group products by category
  const productsByCategory = products.reduce<Record<string, Product[]>>((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});
  
  return (
    <div>
      <Hero />
      
      {loading ? (
        <div className="py-16 text-center">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded max-w-md mx-auto"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-6 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <section id="productos">
            <FeaturedProducts products={products} />
          </section>
          
          <section id="categorias">
            <CategorySection />
          </section>
          
          {/* Products by category */}
          <section id="productos-por-categoria" className="py-16 bg-cream-light">
            <div className="container-custom">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-12 text-center">
                Nuestros Productos
              </h2>
              {Object.entries(productsByCategory).map(([category, categoryProducts]) => (
                <div key={category} id={category} className="mb-16 last:mb-0 scroll-mt-24">
                  <ProductGrid 
                    products={categoryProducts} 
                    title={category.charAt(0).toUpperCase() + category.slice(1)}
                  />
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default HomePage;