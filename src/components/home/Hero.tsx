import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-cream-dark overflow-hidden">
      <div className="container-custom py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="order-2 md:order-1 text-center md:text-left">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight mb-4 animate-fade-in">
              Pan Artesanal,<br />
              <span className="text-secondary">Sabor Tradicional</span>
            </h1>
            <p className="text-gray-700 text-lg mb-8 max-w-md mx-auto md:mx-0 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Descubre nuestros productos horneados diariamente con ingredientes naturales y recetas tradicionales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-slide-up" style={{ animationDelay: '0.4s' }}>
              {/* Modificar el enlace de "Ver Productos" */}
              <Link 
                to="/#productos" 
                className="btn-primary btn-lg"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <ShoppingBag size={20} className="mr-2" />
                Ver Productos
              </Link>
              <Link to="/cart" className="btn-outline btn-lg">
                Ir al Carrito
              </Link>
            </div>
          </div>
          
          {/* Image */}
          <div className="order-1 md:order-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <img 
              src="https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg" 
              alt="Panadería artesanal" 
              className="rounded-lg shadow-xl w-full max-h-96 object-cover"
            />
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-secondary opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-primary opacity-10 rounded-full blur-3xl"></div>
    </div>
  );
};

export default Hero;