import React from 'react';
import { Link } from 'react-router-dom';
import { CakeSlice, Phone, Mail, MapPin, Clock, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Logo and About */}
          <div>
            <div className="flex items-center mb-4">
              <CakeSlice className="mr-2 text-secondary" size={24} />
              <span className="font-serif text-xl font-bold">Panadería Artesanal</span>
            </div>
            <p className="text-cream-light mb-6">
              Elaboramos pan y dulces artesanales con ingredientes de primera calidad 
              y técnicas tradicionales para ofrecerte sabores auténticos en cada bocado.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                className="text-cream-light hover:text-secondary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="text-cream-light hover:text-secondary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="text-cream-light hover:text-secondary transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Column 2: Contact Info */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-4 text-secondary">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone className="mr-2 mt-1 text-secondary" size={16} />
                <span>+34 555 123 456</span>
              </li>
              <li className="flex items-start">
                <Mail className="mr-2 mt-1 text-secondary" size={16} />
                <span>info@panaderiaartesanal.com</span>
              </li>
              <li className="flex items-start">
                <MapPin className="mr-2 mt-1 text-secondary" size={16} />
                <span>Calle Panadería 123, 28001 Madrid</span>
              </li>
              <li className="flex items-start">
                <Clock className="mr-2 mt-1 text-secondary" size={16} />
                <div>
                  <p>Lun-Vie: 7:00 - 20:00</p>
                  <p>Sáb-Dom: 8:00 - 14:00</p>
                </div>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-4 text-secondary">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-secondary transition-colors">Inicio</Link>
              </li>
              <li>
                <Link to="/#productos" className="hover:text-secondary transition-colors">Productos</Link>
              </li>
              <li>
                <Link to="/#categorias" className="hover:text-secondary transition-colors">Categorías</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-secondary transition-colors">Carrito</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="border-primary-light my-6" />
        
        {/* Copyright */}
        <div className="text-center text-sm text-cream-light">
          <p>&copy; {new Date().getFullYear()} Panadería Artesanal. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;