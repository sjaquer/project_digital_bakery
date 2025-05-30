import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Customer, DeliveryMethod, PaymentMethod } from '../../types';
import { useOrder } from '../../context/OrderContext';

interface CheckoutFormProps {
  onOrderCreated?: (orderId: string) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onOrderCreated }) => {
  const [customer, setCustomer] = useState<Customer>({
    name: '',
    phone: '',
    email: '',
    address: '',
  });
  
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('pickup');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [notes, setNotes] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  const { createOrder, loading, error } = useOrder();
  const navigate = useNavigate();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomer(prev => ({ ...prev, [name]: value }));
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };
  
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!customer.name.trim()) {
      errors.name = 'El nombre es obligatorio';
    }
    
    if (!customer.phone.trim()) {
      errors.phone = 'El teléfono es obligatorio';
    } else if (!/^[0-9]{9,}$/.test(customer.phone)) {
      errors.phone = 'Introduce un número de teléfono válido';
    }
    
    if (!customer.email.trim()) {
      errors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
      errors.email = 'Introduce un email válido';
    }
    
    if (deliveryMethod === 'delivery' && !customer.address?.trim()) {
      errors.address = 'La dirección es obligatoria para envíos a domicilio';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // If delivery method is pickup, we don't need the address
    const customerData: Customer = deliveryMethod === 'pickup'
      ? { name: customer.name, phone: customer.phone, email: customer.email }
      : customer;
    
    const orderId = await createOrder(customerData, deliveryMethod, paymentMethod, notes);
    
    if (orderId) {
      if (onOrderCreated) {
        onOrderCreated(orderId);
      }
      
      navigate(`/confirmation/${orderId}`);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="font-serif text-xl font-bold mb-4 text-primary">Datos de contacto</h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="label">Nombre completo *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={customer.name}
              onChange={handleInputChange}
              className={`input ${validationErrors.name ? 'border-error' : ''}`}
              placeholder="Tu nombre completo"
            />
            {validationErrors.name && (
              <p className="text-error text-sm mt-1">{validationErrors.name}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="phone" className="label">Teléfono *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={customer.phone}
              onChange={handleInputChange}
              className={`input ${validationErrors.phone ? 'border-error' : ''}`}
              placeholder="Tu número de teléfono"
            />
            {validationErrors.phone && (
              <p className="text-error text-sm mt-1">{validationErrors.phone}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="email" className="label">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={customer.email}
              onChange={handleInputChange}
              className={`input ${validationErrors.email ? 'border-error' : ''}`}
              placeholder="Tu correo electrónico"
            />
            {validationErrors.email && (
              <p className="text-error text-sm mt-1">{validationErrors.email}</p>
            )}
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="font-serif text-xl font-bold mb-4 text-primary">Método de entrega</h2>
        
        <div className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="pickup"
                name="deliveryMethod"
                value="pickup"
                checked={deliveryMethod === 'pickup'}
                onChange={() => setDeliveryMethod('pickup')}
                className="mr-2"
              />
              <label htmlFor="pickup">Recoger en tienda</label>
            </div>
            
            <div className="flex items-center">
              <input
                type="radio"
                id="delivery"
                name="deliveryMethod"
                value="delivery"
                checked={deliveryMethod === 'delivery'}
                onChange={() => setDeliveryMethod('delivery')}
                className="mr-2"
              />
              <label htmlFor="delivery">Entrega a domicilio</label>
            </div>
          </div>
          
          {deliveryMethod === 'delivery' && (
            <div>
              <label htmlFor="address" className="label">Dirección de entrega *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={customer.address || ''}
                onChange={handleInputChange}
                className={`input ${validationErrors.address ? 'border-error' : ''}`}
                placeholder="Tu dirección completa"
              />
              {validationErrors.address && (
                <p className="text-error text-sm mt-1">{validationErrors.address}</p>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div>
        <h2 className="font-serif text-xl font-bold mb-4 text-primary">Método de pago</h2>
        
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="cash"
              name="paymentMethod"
              value="cash"
              checked={paymentMethod === 'cash'}
              onChange={() => setPaymentMethod('cash')}
              className="mr-2"
            />
            <label htmlFor="cash">Efectivo</label>
          </div>
          
          <div className="flex items-center">
            <input
              type="radio"
              id="card"
              name="paymentMethod"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={() => setPaymentMethod('card')}
              className="mr-2"
            />
            <label htmlFor="card">Tarjeta (al recoger o al recibir)</label>
          </div>
          
          <div className="flex items-center">
            <input
              type="radio"
              id="transfer"
              name="paymentMethod"
              value="transfer"
              checked={paymentMethod === 'transfer'}
              onChange={() => setPaymentMethod('transfer')}
              className="mr-2"
            />
            <label htmlFor="transfer">Transferencia bancaria</label>
          </div>
        </div>
      </div>
      
      <div>
        <label htmlFor="notes" className="label">Notas adicionales</label>
        <textarea
          id="notes"
          name="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="input"
          rows={3}
          placeholder="Instrucciones especiales, alergias, etc."
        />
      </div>
      
      {error && (
        <div className="p-3 bg-error-light text-error rounded-md">
          {error}
        </div>
      )}
      
      <button
        type="submit"
        className="btn-primary w-full"
        disabled={loading}
      >
        {loading ? 'Procesando...' : 'Completar pedido'}
      </button>
    </form>
  );
};

export default CheckoutForm;