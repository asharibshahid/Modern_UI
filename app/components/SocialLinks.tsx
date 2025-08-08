import { motion } from 'framer-motion';
import React from 'react';
import { FaInstagram, FaFacebookF, FaBehance } from 'react-icons/fa';

const SocialLinks: React.FC<{ setCursorVariant: (variant: string) => void }> = ({ setCursorVariant }) => {
  const socialLinks = [
    { icon: <FaInstagram />, url: 'https://www.instagram.com/affanvisuals99' },
    { icon: <FaFacebookF />, url: 'https://www.facebook.com/profile.php?id=61578157021777' },
    { icon: <FaBehance />, url: 'https://www.behance.net/affanvisuals' },
  ];

  return (
    <motion.div
      className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 space-y-4"
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
    >
      {socialLinks.map((item, index) => (
        <motion.a
          key={index}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-black/40 backdrop-blur-xl border border-cyan-500/30 rounded-full flex items-center justify-center text-xl hover:border-purple-500/50 cursor-pointer transition-all duration-300 text-white"
          whileHover={{ scale: 1.1, x: -5 }}
          onHoverStart={() => setCursorVariant('button')}
          onHoverEnd={() => setCursorVariant('default')}
        >
          {item.icon}
        </motion.a>
      ))}
    </motion.div>
  );
};

export default SocialLinks;