import axios from 'axios';
import { Product, Order, ApiResponse } from '../types';

// Usar variables de entorno para la URL del webhook
const API_BASE_URL = import.meta.env.VITE_MAKE_WEBHOOK_URL || 'https://hook.us2.make.com/llodtafhm0mlig6bm4ykexbbkixq7l8y';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // Eliminar Accept header ya que no es necesario
  }
});

// Añade un interceptor para ver las peticiones
apiClient.interceptors.request.use(request => {
  console.log('Request:', request);
  return request;
});

apiClient.interceptors.response.use(
  response => {
    console.log('Respuesta exitosa:', {
      status: response.status,
      headers: response.headers,
      data: response.data
    });
    return response;
  },
  error => {
    console.error('Error de red detallado:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers
    });
    return Promise.reject(error);
  }
);

export const productApi = {
  getAll: async (): Promise<ApiResponse<Product[]>> => {
    try {
      console.log('Intentando obtener productos desde:', API_BASE_URL);
      const response = await apiClient.get('/products');
      console.log('Respuesta recibida:', response);
      return { data: response.data };
    } catch (error) {
      console.error('Error completo:', error);
      return { data: [], error: 'Error al cargar los productos. Por favor, intente de nuevo.' };
    }
  },
  
  getById: async (id: string): Promise<ApiResponse<Product>> => {
    try {
      const response = await apiClient.get(`/products/${id}`);
      return { data: response.data };
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      return { data: {} as Product, error: 'Error al cargar el producto. Por favor, intente de nuevo.' };
    }
  },
  
  checkStock: async (productId: string): Promise<ApiResponse<number>> => {
    try {
      const response = await apiClient.get(`/products/${productId}/stock`);
      return { data: response.data.stock };
    } catch (error) {
      console.error(`Error checking stock for product ${productId}:`, error);
      return { data: 0, error: 'Error al verificar el stock. Por favor, intente de nuevo.' };
    }
  },
};

const MAX_PAYLOAD_SIZE = 5 * 1024 * 1024; // 5MB en bytes

export const orderApi = {
  create: async (order: Order): Promise<ApiResponse<Order>> => {
    try {
      console.log('Enviando orden:', order);
      
      const response = await apiClient.post('', order, {
        timeout: 180000
      });
      
      console.log('Respuesta del webhook:', response.data);
      
      // Verifica la estructura de la respuesta
      if (!response.data?.data?.id) {
        console.error('Respuesta inválida:', response.data);
        throw new Error('Respuesta del servidor no contiene ID');
      }

      return { 
        data: {
          ...order,
          id: response.data.data.id,
          status: response.data.data.status || 'pending'
        },
        success: true 
      };
    } catch (error) {
      console.error('Error creating order:', error);
      // Manejar específicamente errores de cola llena
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        return {
          data: {} as Order,
          error: 'Sistema ocupado. Por favor, intente más tarde.'
        };
      }
      return { 
        data: {} as Order, 
        error: 'Error al crear el pedido. Por favor, intente de nuevo.' 
      };
    }
  },
  
  getById: async (id: string): Promise<ApiResponse<Order>> => {
    try {
      const response = await apiClient.get(`/orders/${id}`);
      return { data: response.data };
    } catch (error) {
      console.error(`Error fetching order ${id}:`, error);
      return { data: {} as Order, error: 'Error al cargar el pedido. Por favor, intente de nuevo.' };
    }
  },
  
  getStatus: async (id: string): Promise<ApiResponse<string>> => {
    try {
      const response = await apiClient.get(`/orders/${id}/status`);
      return { data: response.data.status };
    } catch (error) {
      console.error(`Error fetching status for order ${id}:`, error);
      return { data: '', error: 'Error al verificar el estado del pedido. Por favor, intente de nuevo.' };
    }
  },
};

// For development/testing purposes only
export const mockApi = {
  getProducts: (): Product[] => [
    {
      id: '1',
      name: 'Pan Artesanal de Masa Madre',
      description: 'Pan de masa madre con fermentación lenta por 24 horas, corteza crujiente y miga alveolada.',
      price: 6.50,
      imageUrl: 'https://images.pexels.com/photos/2286776/pexels-photo-2286776.jpeg',
      category: 'panes',
      stock: 20,
      featured: true
    },
    {
      id: '2',
      name: 'Croissant Tradicional',
      description: 'Croissant tradicional francés hecho con mantequilla de primera calidad, hojaldre perfecto.',
      price: 3.25,
      imageUrl: 'https://images.pexels.com/photos/3892469/pexels-photo-3892469.jpeg',
      category: 'bollería',
      stock: 15,
      featured: true
    },
    {
      id: '3',
      name: 'Baguette Francesa',
      description: 'Baguette tradicional francesa con corteza crujiente y miga tierna y alveolada.',
      price: 4.75,
      imageUrl: 'https://images.pexels.com/photos/1387075/pexels-photo-1387075.jpeg',
      category: 'panes',
      stock: 10
    },
    {
      id: '4',
      name: 'Cookies de Chocolate',
      description: 'Cookies con trozos de chocolate belga y nueces, horneadas diariamente.',
      price: 2.50,
      imageUrl: 'https://images.pexels.com/photos/5386641/pexels-photo-5386641.jpeg',
      category: 'dulces',
      stock: 25
    },
    {
      id: '5',
      name: 'Tarta de Manzana',
      description: 'Tarta de manzana casera con canela y masa quebrada, perfecta para el postre.',
      price: 18.90,
      imageUrl: 'https://images.pexels.com/photos/6341608/pexels-photo-6341608.jpeg',
      category: 'tartas',
      stock: 8,
      featured: true
    },
    {
      id: '6',
      name: 'Pan de Centeno',
      description: 'Pan de centeno tradicional, perfecto para acompañar quesos y embutidos.',
      price: 5.25,
      imageUrl: 'https://images.pexels.com/photos/137103/pexels-photo-137103.jpeg',
      category: 'panes',
      stock: 12
    },
  ]
};