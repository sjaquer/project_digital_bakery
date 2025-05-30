import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, Printer } from 'lucide-react';
import OrderReceipt from '../components/orders/OrderReceipt';
import { orderApi } from '../api';
import { Order } from '../types';
import toast from 'react-hot-toast';

const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;
      
      try {
        const response = await orderApi.getById(orderId);
        if (response.data && Object.keys(response.data).length > 0) {
          setOrder(response.data);
        } else {
          throw new Error('No se pudo cargar el pedido');
        }
      } catch (error) {
        console.error('Error fetching order:', error);
        toast.error('Error al cargar los detalles del pedido');
        navigate('/');
      }
    };

    fetchOrder();
  }, [orderId, navigate]);

  const handlePrint = () => {
    window.print();
  };

  if (!orderId || !order) {
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
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <CheckCircle className="text-success mx-auto mb-4" size={64} />
          <h1 className="font-serif text-3xl font-bold text-primary mb-2">
            ¡Pedido Confirmado!
          </h1>
          <p className="text-gray-600 mb-6">
            Gracias por tu pedido. Hemos recibido tu solicitud y estamos trabajando en ella.
          </p>
        </div>

        <div className="print:shadow-none">
          <OrderReceipt order={order} />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 print:hidden">
          <button 
            onClick={handlePrint}
            className="btn-outline flex items-center justify-center"
          >
            <Printer size={16} className="mr-2" />
            Imprimir Comprobante
          </button>
          <Link to={`/tracking/${orderId}`} className="btn-primary">
            Seguir mi pedido
            <ArrowRight size={16} className="ml-2" />
          </Link>
          <Link to="/" className="btn-outline">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;