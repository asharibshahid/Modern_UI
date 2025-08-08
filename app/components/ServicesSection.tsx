import { motion } from 'framer-motion';
import React from 'react';

interface ServicesSectionProps {
  setCursorVariant: (variant: string) => void;
  setActiveSection: (section: string) => void;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ 
  setCursorVariant,
  setActiveSection
}) => {
  const services = [
    { 
      title: 'Social Media Posts', 
      icon: '📱', 
      description: 'Engaging social content design',
      portfolioCategory: 'Social Media Posts'
    },
    { 
      title: 'Amazon Listing Images', 
      icon: '📦', 
      description: 'Professional product photography',
      portfolioCategory: 'Amazon Listing Images'
    },
    { 
      title: 'AI Product & CGI Ads', 
      icon: '🤖', 
      description: 'AI-powered 3D advertising',
      portfolioCategory: 'AI Product and CGI Ads'
    },
    { 
      title: 'Logo & Branding', 
      icon: '✨', 
      description: 'Complete brand identity',
      portfolioCategory: 'Logo and Branding'
    }
  ];

  const handleSeeClick = (category: string) => {
    setActiveSection('portfolio');
    // Scroll to the specific category in portfolio
    setTimeout(() => {
      const element = document.getElementById(category.replace(/\s+/g, '-'));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-12"
    >
      <h2 className="text-5xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
        Services
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            className="group relative p-8 bg-black/40 backdrop-blur-xl border border-cyan-500/30 rounded-3xl hover:border-purple-500/50 transition-all duration-500"
            whileHover={{ scale: 1.02, y: -5 }}
            onHoverStart={() => setCursorVariant('button')}
            onHoverEnd={() => setCursorVariant('default')}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="text-6xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-gray-300 text-lg mb-6">{service.description}</p>
              
              <motion.button
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full text-white font-medium hover:shadow-xl hover:shadow-purple-500/30 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSeeClick(service.portfolioCategory)}
              >
                See Examples
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ServicesSection;