import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Отслеживаем координаты мыши
  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
    <>
      {/* Главная точка курсора (розовая) */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-pink-500 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 8, // -8 чтобы курсор был ровно по центру круга
          y: mousePosition.y - 8,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
      />
      
      {/* Отстающий контур курсора (голубой, для эффекта скорости) */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border-2 border-cyan-400 rounded-full pointer-events-none z-40"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.5 }}
      />
    </>
  );
};

export default CustomCursor;