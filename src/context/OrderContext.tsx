import React, { createContext, useContext, useState } from 'react';
import { Customer, DeliveryMethod, PaymentMethod, Order, CartItem } from '../types';
import { orderApi } from '../api';
import { useCart } from './CartContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface OrderContextType {
  createOrder: (customerData: Customer, deliveryMethod: DeliveryMethod, paymentMethod: PaymentMethod, notes?: string) => Promise<string | undefined>;
  getOrderStatus: (orderId: string) => Promise<string>;
  loading: boolean;
  error: string | null;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();

  const createOrder = async (
    customerData: Customer, 
    deliveryMethod: DeliveryMethod, 
    paymentMethod: PaymentMethod,
    notes?: string
  ): Promise<string | undefined> => {
    if (items.length === 0) {
      setError('No hay productos en el carrito');
      toast.error('No hay productos en el carrito');
      return undefined;
    }

    setLoading(true);
    setError(null);

    try {
      const orderData: Order = {
        items: items as CartItem[],
        customer: customerData,
        deliveryMethod,
        paymentMethod,
        total,
        notes,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      const response = await orderApi.create(orderData);

      if (response.error) {
        throw new Error(response.error);
      }

      // Asegúrate de que response.data tiene un id
      if (!response.data?.id) {
        throw new Error('No se recibió ID del pedido');
      }

      // Clear cart after successful order
      clearCart();
      
      toast.success('¡Pedido creado con éxito!');

      // Asegúrate de que tienes un ID antes de navegar
      const orderId = response.data.id;
      navigate(`/confirmation/${orderId}`);
      
      return orderId;
    } catch (err) {
      console.error('Error detallado:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error al crear el pedido';
      setError(errorMessage);
      toast.error(errorMessage);
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  const getOrderStatus = async (orderId: string): Promise<string> => {
    setLoading(true);
    setError(null);

    try {
      const response = await orderApi.getStatus(orderId);
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al obtener el estado del pedido';
      setError(errorMessage);
      toast.error(errorMessage);
      return '';
    } finally {
      setLoading(false);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        createOrder,
        getOrderStatus,
        loading,
        error
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};