import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, Truck, ShoppingBag, AlertCircle } from 'lucide-react';
import { orderApi } from '../../api';

interface OrderStatusProps {
  orderId: string;
}

const OrderStatus: React.FC<OrderStatusProps> = ({ orderId }) => {
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await orderApi.getStatus(orderId);
        if (response.error) {
          throw new Error(response.error);
        }
        setStatus(response.data);
      } catch (err) {
        setError('No se pudo cargar el estado del pedido');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStatus();
    
    // Poll for status updates every 30 seconds
    const intervalId = setInterval(fetchStatus, 30000);
    
    return () => clearInterval(intervalId);
  }, [orderId]);
  
  const getStatusInfo = () => {
    switch (status) {
      case 'pending':
        return {
          text: 'Pendiente',
          description: 'Tu pedido ha sido recibido y está pendiente de confirmación.',
          icon: <Clock className="text-warning-dark\" size={32} />,
          color: 'text-warning-dark',
          progress: 25,
        };
      case 'processing':
        return {
          text: 'En preparación',
          description: 'Tu pedido está siendo preparado por nuestros panaderos.',
          icon: <ShoppingBag className="text-secondary" size={32} />,
          color: 'text-secondary',
          progress: 50,
        };
      case 'ready':
        return {
          text: 'Listo para recoger',
          description: 'Tu pedido está listo y te espera en nuestra tienda.',
          icon: <CheckCircle className="text-success\" size={32} />,
          color: 'text-success',
          progress: 75,
        };
      case 'delivered':
        return {
          text: 'Entregado',
          description: '¡Tu pedido ha sido entregado con éxito!',
          icon: <Truck className="text-success" size={32} />,
          color: 'text-success',
          progress: 100,
        };
      case 'cancelled':
        return {
          text: 'Cancelado',
          description: 'Lo sentimos, tu pedido ha sido cancelado.',
          icon: <AlertCircle className="text-error\" size={32} />,
          color: 'text-error',
          progress: 0,
        };
      default:
        return {
          text: 'Desconocido',
          description: 'No podemos determinar el estado de tu pedido.',
          icon: <AlertCircle className="text-gray-500" size={32} />,
          color: 'text-gray-500',
          progress: 0,
        };
    }
  };
  
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-10 w-10 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-48"></div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-8 text-error">
        <AlertCircle className="mx-auto mb-2" size={32} />
        <p>{error}</p>
      </div>
    );
  }
  
  const statusInfo = getStatusInfo();
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
      <div className="flex flex-col items-center mb-6">
        {statusInfo.icon}
        <h2 className={`font-serif font-bold text-xl mt-2 ${statusInfo.color}`}>
          {statusInfo.text}
        </h2>
        <p className="text-gray-600 text-center mt-1">
          {statusInfo.description}
        </p>
      </div>
      
      {/* Progress bar */}
      <div className="relative pt-1 mb-8">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-cream-dark text-primary">
              Progreso
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-primary">
              {statusInfo.progress}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-cream-dark">
          <div 
            style={{ width: `${statusInfo.progress}%` }} 
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary transition-all duration-500"
          ></div>
        </div>
      </div>
      
      {/* Status timeline */}
      <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-gray-100 text-secondary group-[.is-active]:bg-primary group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
            <Clock size={20} />
          </div>
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-lg bg-white shadow">
            <div className="font-bold text-primary">Pedido recibido</div>
          </div>
        </div>
        
        <div className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group ${status === 'processing' || status === 'ready' || status === 'delivered' ? 'is-active' : ''}`}>
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-gray-100 text-secondary group-[.is-active]:bg-primary group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
            <ShoppingBag size={20} />
          </div>
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-lg bg-white shadow">
            <div className="font-bold text-primary">En preparación</div>
          </div>
        </div>
        
        <div className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group ${status === 'ready' || status === 'delivered' ? 'is-active' : ''}`}>
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-gray-100 text-secondary group-[.is-active]:bg-primary group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
            <CheckCircle size={20} />
          </div>
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-lg bg-white shadow">
            <div className="font-bold text-primary">Listo para recoger</div>
          </div>
        </div>
        
        <div className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group ${status === 'delivered' ? 'is-active' : ''}`}>
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-gray-100 text-secondary group-[.is-active]:bg-primary group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
            <Truck size={20} />
          </div>
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-lg bg-white shadow">
            <div className="font-bold text-primary">Entregado</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;