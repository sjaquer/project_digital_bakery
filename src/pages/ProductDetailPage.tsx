import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductDetail from '../components/products/ProductDetail';
import { Product } from '../types';
import { productApi, mockApi } from '../api';
import toast from 'react-hot-toast';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        navigate('/');
        return;
      }
      
      try {
        // In a production environment, you would use the real API
        // const response = await productApi.getById(id);
        
        // For development/demo purposes, use mock data
        const mockProducts = mockApi.getProducts();
        const foundProduct = mockProducts.find(p => p.id === id);
        
        if (!foundProduct) {
          toast.error('Producto no encontrado');
          navigate('/');
          return;
        }
        
        setProduct(foundProduct);
        
        // If there was an error with the real API
        // if (response.error) {
        //   throw new Error(response.error);
        // }
        // setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Error al cargar el producto');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id, navigate]);
  
  if (loading) {
    return (
      <div className="container-custom py-12">
        <div className="animate-pulse bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-80 bg-gray-200"></div>
            <div className="p-6 md:p-8">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="space-y-2 mb-6">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
              <div className="h-10 bg-gray-200 rounded mt-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return null;
  }
  
  return (
    <div className="container-custom py-12">
      <ProductDetail product={product} />
    </div>
  );
};

export default ProductDetailPage;