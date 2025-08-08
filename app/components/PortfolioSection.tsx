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
      items: [
        {
          image: 'https://ucarecdn.com/70d6c0a2-78e9-4455-ac81-3d6ba0b96020/sm1min.png', // Mock URL for #1
          title: 'Social Media Design #1',
          description: 'Instagram & Facebook Content'
        },
        {
          image: 'https://res.cloudinary.com/djskedmbr/image/upload/v1754636941/sm2-min_h8nhhz.png',
          title: 'Social Media Design #2',
          description: 'Instagram & Facebook Content'
        },
        {
          image: 'https://res.cloudinary.com/djskedmbr/image/upload/v1754636960/sm3-min_e5snag.png',
          title: 'Social Media Design #3',
          description: 'Instagram & Facebook Content'
        },
        {
          image: 'https://res.cloudinary.com/djskedmbr/image/upload/v1754636969/sm4-min_ostnyx.png',
          title: 'Social Media Design #4',
          description: 'Instagram & Facebook Content'
        }
        
      ]
    },
    { 
      title: 'Amazon Listing Images', 
      items: [
        {
          image: 'https://res.cloudinary.com/djskedmbr/image/upload/v1754636929/amazon1-min_fipanx.png',
          title: 'Product Listing #1',
          description: 'E-commerce Photography'
        },
        {
          image: 'https://res.cloudinary.com/djskedmbr/image/upload/v1754636930/amazon2-min_smcvbc.png',
          title: 'Product Listing #2',
          description: 'E-commerce Photography'
        },
        {
          image: 'https://res.cloudinary.com/djskedmbr/image/upload/v1754636927/amazon3-min_mqdfbi.png',
          title: 'Product Listing #3',
          description: 'E-commerce Photography'
        },
        {
          image: 'https://res.cloudinary.com/djskedmbr/image/upload/v1754636926/amazon4-min_glng3n.png',
          title: 'Product Listing #4',
          description: 'E-commerce Photography'
        },
        {
          image: 'https://res.cloudinary.com/djskedmbr/image/upload/v1754636928/amazon5-min_fs90va.png',
          title: 'Product Listing #5',
          description: 'E-commerce Photography'
        }
      ]
    },
    { 
      title: 'AI Product and CGI Ads', 
      items: [
        {
          image: 'https://res.cloudinary.com/djskedmbr/image/upload/v1754636928/ai1-min_mhbjag.png',
          title: 'CGI Ad #1',
          description: '3D Product Visualization'
        },
        {
          image: 'https://res.cloudinary.com/djskedmbr/image/upload/v1754636926/ai2-min_yttfmt.png',
          title: 'CGI Ad #2',
          description: '3D Product Visualization'
        },
        {
          image: 'https://res.cloudinary.com/djskedmbr/image/upload/v1754636926/ai3-min_ryiakh.png',
          title: 'CGI Ad #3',
          description: '3D Product Visualization'
        },
        {
          image: 'https://res.cloudinary.com/djskedmbr/image/upload/v1754636927/ai4-min_y17o26.png',
          title: 'CGI Ad #4',
          description: '3D Product Visualization'
        },
        {
          image: 'https://res.cloudinary.com/djskedmbr/image/upload/v1754636928/ai5-min_n3yopk.png',
          title: 'CGI Ad #5',
          description: '3D Product Visualization'
        }
      ]
    },
    { 
      title: 'Logo and Branding', 
      items: [
        {
          image: 'https://res.cloudinary.com/djskedmbr/image/upload/v1754636931/branding1_pzio8f.png',
          title: 'Brand Identity #1',
          description: 'Logo & Visual Identity'
        },
        {
          image: 'https://res.cloudinary.com/djskedmbr/image/upload/v1754636929/branding2_q4rlgm.png',
          title: 'Brand Identity #2',
          description: 'Logo & Visual Identity'
        },
        {
          image: 'https://res.cloudinary.com/djskedmbr/image/upload/v1754636930/branding3_qdhsrc.png',
          title: 'Brand Identity #3',
          description: 'Logo & Visual Identity'
        }
      ]
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
