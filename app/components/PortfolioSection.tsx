import { motion } from 'framer-motion';
import Image from "next/image";
import React from 'react';

interface PortfolioSectionProps {
  setCursorVariant: (variant: string) => void;
}

const PortfolioSection: React.FC<PortfolioSectionProps> = ({ setCursorVariant }) => {
  // Portfolio data with image paths
  const portfolioCategories = [
    { 
      title: 'Social Media Posts', 
      items: Array(4).fill(null).map((_, i) => ({
        image: `/portfolio/social/sm${i+1}-min.png`,
        title: `Social Media Design #${i+1}`,
        description: 'Instagram & Facebook Content'
      }))
    },
    { 
      title: 'Amazon Listing Images', 
      items: Array(5).fill(null).map((_, i) => ({
        image: `/portfolio/amazon/amazon${i+1}-min.png`,
        title: `Product Listing #${i+1}`,
        description: 'E-commerce Photography'
      }))
    },
    { 
      title: 'AI Product and CGI Ads', 
      items: Array(5).fill(null).map((_, i) => ({
        image: `/portfolio/ai-cgi/ai${i+1}-min.png`,
        title: `CGI Ad #${i+1}`,
        description: '3D Product Visualization'
      }))
    },
    { 
      title: 'Logo and Branding', 
      items: Array(3).fill(null).map((_, i) => ({
        image: `/portfolio/branding/branding${i+1}.png`,
        title: `Brand Identity #${i+1}`,
        description: 'Logo & Visual Identity'
      }))
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-16"
    >
      <h2 className="text-5xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Portfolio
      </h2>
      
      <div className="space-y-20">
        {portfolioCategories.map((category, catIndex) => (
          <div key={catIndex} className="space-y-8" id={category.title.replace(/\s+/g, '-')}>
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {category.title}
              </h3>
              <span className="text-cyan-400 text-lg">{category.items.length} Projects</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.items.map((item, index) => (
                <motion.div
                  key={index}
                  className="group relative h-80 bg-gradient-to-br from-cyan-900/30 to-purple-900/30 rounded-3xl overflow-hidden border border-cyan-500/30 hover:border-purple-500/50 transition-all duration-500"
                  whileHover={{ scale: 1.03, rotateY: 5 }}
                  onHoverStart={() => setCursorVariant('button')}
                  onHoverEnd={() => setCursorVariant('default')}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                >
                  {/* Actual Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-all duration-500 group-hover:scale-105"
                    />
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default PortfolioSection;