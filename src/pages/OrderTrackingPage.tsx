import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import OrderStatus from '../components/orders/OrderStatus';
import { Order } from '../types';
import { orderApi } from '../api';
import toast from 'react-hot-toast';

const OrderTrackingPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;
      
      try {
        // In a production environment, you would use the real API
        // const response = await orderApi.getById(orderId);
        
        // For development/demo purposes, create mock order
        const mockOrder: Order = {
          id: orderId,
          items: [],
          customer: {
            name: 'Cliente de Ejemplo',
            phone: '123456789',
            email: 'cliente@ejemplo.com'
          },
          deliveryMethod: 'pickup',
          paymentMethod: 'cash',
          status: 'pending',
          total: 0,
          createdAt: new Date().toISOString()
        };
        
        setOrder(mockOrder);
        
        // If there was an error with the real API
        // if (response.error) {
        //   throw new Error(response.error);
        // }
        // setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order:', error);
        toast.error('Error al cargar el pedido');
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrder();
  }, [orderId]);
  
  if (!orderId) {
    return (
      <div className="container-custom py-12 text-center">
        <p className="text-error">ID de pedido no válido</p>
        <Link to="/" className="btn-primary mt-4">
          Volver al inicio
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container-custom py-12">
      <div className="flex items-center mb-8">
        <Link to="/" className="inline-flex items-center text-primary hover:text-primary-dark mr-4">
          <ArrowLeft size={16} className="mr-1" />
          Volver al inicio
        </Link>
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary">
          Seguimiento de Pedido
        </h1>
      </div>
      
      <div className="max-w-3xl mx-auto">
        {loading ? (
          <div className="text-center py-8">
            <Clock className="animate-pulse mx-auto text-gray-400 mb-4\" size={48} />
            <p className="text-gray-500">Cargando información del pedido...</p>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="font-serif text-xl font-bold text-primary mb-4">
                Detalles del pedido
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Número de pedido</p>
                  <p className="font-medium">{orderId}</p>
                </div>
                {order?.createdAt && (
                  <div>
                    <p className="text-sm text-gray-500">Fecha</p>
                    <p className="font-medium">
                      {new Date(order.createdAt).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                )}
                {order?.customer && (
                  <div>
                    <p className="text-sm text-gray-500">Cliente</p>
                    <p className="font-medium">{order.customer.name}</p>
                  </div>
                )}
                {order?.deliveryMethod && (
                  <div>
                    <p className="text-sm text-gray-500">Método de entrega</p>
                    <p className="font-medium capitalize">
                      {order.deliveryMethod === 'pickup' ? 'Recoger en tienda' : 'Entrega a domicilio'}
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <OrderStatus orderId={orderId} />
          </>
        )}
      </div>
    </div>
  );
};

export default OrderTrackingPage;