import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

const categories: Category[] = [
  {
    id: 'panes',
    name: 'Panes Artesanales',
    description: 'Elaborados con harinas seleccionadas y fermentación lenta para un sabor excepcional.',
    imageUrl: 'https://images.pexels.com/photos/1387075/pexels-photo-1387075.jpeg'
  },
  {
    id: 'bolleria',
    name: 'Bollería',
    description: 'Croissants, napolitanas y más, hechos con mantequilla de primera calidad.',
    imageUrl: 'https://images.pexels.com/photos/3892469/pexels-photo-3892469.jpeg'
  },
  {
    id: 'dulces',
    name: 'Dulces y Pasteles',
    description: 'Deliciosos dulces y pasteles para celebraciones o para darte un capricho.',
    imageUrl: 'https://images.pexels.com/photos/5386641/pexels-photo-5386641.jpeg'
  },
  {
    id: 'tartas',
    name: 'Tartas',
    description: 'Tartas tradicionales elaboradas con frutas frescas y los mejores ingredientes.',
    imageUrl: 'https://images.pexels.com/photos/6341608/pexels-photo-6341608.jpeg'
  }
];

const CategorySection: React.FC = () => {
  return (
    <section id="categorias" className="py-16 bg-cream-light">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">
            Nuestras Categorías
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Explora nuestra variedad de productos artesanales para encontrar el perfecto para cada ocasión.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div 
              key={category.id}
              className="card group hover:shadow-lg hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={category.imageUrl} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <h3 className="absolute bottom-0 left-0 right-0 p-4 font-serif text-xl font-bold text-white">
                  {category.name}
                </h3>
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-4 h-20">{category.description}</p>
                <Link 
                  to={`/#${category.id}`} 
                  className="inline-flex items-center text-primary font-medium hover:text-primary-dark"
                >
                  Ver productos
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;