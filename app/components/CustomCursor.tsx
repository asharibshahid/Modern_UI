import { motion, useMotionValue, useSpring } from 'framer-motion';
import React from 'react';

interface CustomCursorProps {
  cursorVariant: string;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ cursorVariant }) => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  React.useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  const cursorVariants = {
    default: {
      height: 32,
      width: 32,
      backgroundColor: ' #0f2638  #fcb514',
      border: '2px solid rgb(0, 255, 255)',
      boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)'
    },
    text: {
      height: 64,
      width: 64,
      backgroundColor: ' #0f2638  #fcb514',
      border: '2px solid rgb(255, 0, 255)',
      boxShadow: '0 0 30px rgba(255, 0, 255, 0.7)'
    },
    button: {
      height: 80,
      width: 80,
      backgroundColor: 'rgba(0, 255, 0, 0.2)',
      border: '3px solid rgb(0, 255, 0)',
      boxShadow: '0 0 40px rgba(0, 255, 0, 0.8)'
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 rounded-full mix-blend-difference"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      variants={cursorVariants}
      animate={cursorVariant}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    />
  );
};

export default CustomCursor;