import { motion } from 'framer-motion';
import Image from "next/image";
import React from 'react';

interface HomeSectionProps {
  displayedText: string;
  setActiveSection: (section: string) => void;
  setCursorVariant: (variant: string) => void;
}

const HomeSection: React.FC<HomeSectionProps> = ({ 
  displayedText, 
  setActiveSection,
  setCursorVariant
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="text-center space-y-12"
    >
      <div className="relative">
        <motion.div
          className="w-48 h-48 mx-auto relative"
          whileHover={{ scale: 1.1 }}
          onHoverStart={() => setCursorVariant('button')}
          onHoverEnd={() => setCursorVariant('default')}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full animate-spin-slow blur-sm opacity-75"></div>
          <div className="relative w-full h-full bg-black rounded-full border-4 border-cyan-400 overflow-hidden shadow-2xl">
            <div className="w-full h-full flex items-center justify-center">
              <Image
                src="/profile.png"
                alt="Profile Picture"
                width={192}
                height={192}
                className="rounded-full object-cover"
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="space-y-6">
        <h1 
          className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight min-h-[8rem]"
          onMouseEnter={() => setCursorVariant('text')}
          onMouseLeave={() => setCursorVariant('default')}
        >
          {displayedText}
          <motion.span
            className="inline-block w-1 h-12 md:h-16 bg-cyan-400 ml-2"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        </h1>
        
        <motion.p 
          className="text-gray-300 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.8 }}
        >
          With over 2 years of professional experience, I specialize in crafting impactful social media designs, highconverting UGC ads, and cinematic CGI visuals. Blending creativity with cutting-edge AI tools, I help brands stand out with designs that captivate, convert, and inspire.
        </motion.p>
      </div>

      <motion.div
        className="flex flex-col md:flex-row gap-6 justify-center items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4, duration: 0.8 }}
      >
        <motion.button
          className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-white font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setCursorVariant('button')}
          onHoverEnd={() => setCursorVariant('default')}
          onClick={() => setActiveSection('portfolio')}
        >
          View My Work
        </motion.button>
        <motion.button
          className="px-8 py-4 border-2 border-purple-500 rounded-full text-purple-400 font-semibold text-lg hover:bg-purple-500/20 hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setCursorVariant('button')}
          onHoverEnd={() => setCursorVariant('default')}
          onClick={() => setActiveSection('contact')}
        >
          Lets Connect
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default HomeSection;