import React from 'react';
import { Order } from '../../types';
import { formatPrice } from '../../utils/formatters';

interface OrderReceiptProps {
  order: Order;
}

const OrderReceipt: React.FC<OrderReceiptProps> = ({ order }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="border-b-2 border-primary pb-4 mb-4">
        <h2 className="font-serif text-2xl font-bold text-primary text-center">
          Comprobante de Pedido
        </h2>
      </div>

      <div className="space-y-4">
        {/* Detalles del pedido */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <p className="text-gray-600">Nº Pedido:</p>
          <p className="font-medium">{order.id}</p>
          <p className="text-gray-600">Fecha:</p>
          <p className="font-medium">
            {new Date(order.createdAt || '').toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>

        {/* Detalles del cliente */}
        <div className="border-t border-gray-200 pt-4">
          <h3 className="font-medium mb-2">Datos del Cliente</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <p className="text-gray-600">Nombre:</p>
            <p>{order.customer.name}</p>
            <p className="text-gray-600">Teléfono:</p>
            <p>{order.customer.phone}</p>
            <p className="text-gray-600">Email:</p>
            <p>{order.customer.email}</p>
            {order.customer.address && (
              <>
                <p className="text-gray-600">Dirección:</p>
                <p>{order.customer.address}</p>
              </>
            )}
          </div>
        </div>

        {/* Productos */}
        <div className="border-t border-gray-200 pt-4">
          <h3 className="font-medium mb-2">Productos</h3>
          <div className="space-y-2">
            {order.items.map((item) => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <span>
                  {item.quantity}x {item.product.name}
                </span>
                <span className="font-medium">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span className="text-primary-dark">{formatPrice(order.total)}</span>
          </div>
        </div>

        {/* Método de entrega y pago */}
        <div className="border-t border-gray-200 pt-4 text-sm">
          <p>
            <span className="text-gray-600">Método de entrega: </span>
            <span className="font-medium capitalize">
              {order.deliveryMethod === 'pickup' ? 'Recoger en tienda' : 'Entrega a domicilio'}
            </span>
          </p>
          <p>
            <span className="text-gray-600">Método de pago: </span>
            <span className="font-medium capitalize">{order.paymentMethod}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderReceipt;