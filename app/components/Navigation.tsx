import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  setCursorVariant: (variant: string) => void;
}

const navItems = [
  { id: 'home', label: 'Home', icon: '' },
  { id: 'services', label: 'Services', icon: '⚡' },
  { id: 'portfolio', label: 'Portfolio', icon: '🎨' },
  { id: 'testimonials', label: 'Testimonials', icon: '💬' },
  { id: 'contact', label: 'Contact', icon: '📧' }
];

const Navigation: React.FC<NavigationProps> = ({ 
  activeSection, 
  setActiveSection, 
  isMenuOpen, 
  setIsMenuOpen,
  setCursorVariant
}) => {
  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 p-6"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="backdrop-blur-xl bg-black/20 border border-cyan-500/30 rounded-full px-8 py-4">
            <div className="flex items-center justify-between">
              <motion.div 
                className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                AFFAN BAQAI 
              </motion.div>
              
              <div className="hidden md:flex space-x-8">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    className={`px-4 py-2 rounded-full transition-all duration-300 ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    onHoverStart={() => setCursorVariant('button')}
                    onHoverEnd={() => setCursorVariant('default')}
                    onClick={() => setActiveSection(item.id)}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </motion.button>
                ))}
              </div>

              <motion.button
                className="md:hidden p-2 text-white"
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="space-y-1">
                  <div className="w-6 h-0.5 bg-cyan-400"></div>
                  <div className="w-6 h-0.5 bg-purple-400"></div>
                  <div className="w-6 h-0.5 bg-pink-400"></div>
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-30 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setIsMenuOpen(false)} />
            <motion.div
              className="absolute top-24 left-6 right-6 bg-black/90 border border-cyan-500/30 rounded-3xl p-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="space-y-4">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    className={`w-full text-left px-6 py-4 rounded-2xl transition-all duration-300 ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => {
                      setActiveSection(item.id);
                      setIsMenuOpen(false);
                    }}
                  >
                    <span className="mr-3 text-xl">{item.icon}</span>
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;