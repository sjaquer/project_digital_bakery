import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, CakeSlice, ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const { items } = useCart();
  const location = useLocation();
  
  const cartItemsCount = items.reduce((count, item) => count + item.quantity, 0);
  
  const categories = [
    { id: 'panes', name: 'Panes Artesanales' },
    { id: 'bolleria', name: 'Bollería' },
    { id: 'dulces', name: 'Dulces y Pasteles' },
    { id: 'tartas', name: 'Tartas' }
  ];

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsCategoryMenuOpen(false);
      setIsMobileMenuOpen(false);
    }
  };
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <CakeSlice className={`mr-2 ${isScrolled ? 'text-primary' : 'text-primary-dark'}`} size={28} />
            <span className="font-serif text-xl sm:text-2xl font-bold text-primary">Panadería Artesanal</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium hover:text-primary transition-colors">
              Inicio
            </Link>
            
            <button 
              onClick={() => scrollToSection('productos-por-categoria')} 
              className="font-medium hover:text-primary transition-colors"
            >
              Productos
            </button>
            
            {/* Categorías con menú desplegable */}
            <div className="relative group">
              <button 
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="flex items-center font-medium hover:text-primary transition-colors"
              >
                Categorías
                <ChevronDown size={16} className="ml-1" />
              </button>
              
              {/* Menú desplegable */}
              <div className={`absolute top-full left-0 mt-2 py-2 bg-white rounded-lg shadow-lg w-48 transition-all duration-200 ${
                isCategoryMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}>
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => scrollToSection(category.id)}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-cream-light hover:text-primary transition-colors"
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Cart Icon */}
            <Link to="/cart" className="relative p-2">
              <ShoppingCart className="text-primary" size={24} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <Link to="/cart" className="relative p-2 mr-2">
              <ShoppingCart className="text-primary" size={24} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            
            <button 
              onClick={toggleMobileMenu}
              className="p-2 text-primary focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-lg animate-fade-in">
            <nav className="flex flex-col space-y-4 px-6">
              <Link to="/" className="font-medium hover:text-primary transition-colors py-2">Inicio</Link>
              <Link to="/#productos" className="font-medium hover:text-primary transition-colors py-2">Productos</Link>
              <Link to="/#categorias" className="font-medium hover:text-primary transition-colors py-2">Categorías</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;