import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const cursorCoreRef = useRef(null);
  const cursorOuterRef = useRef(null);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      // Прямое манипулирование DOM убирает лаги от ререндеров React
      if (cursorCoreRef.current) {
        cursorCoreRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      if (cursorOuterRef.current) {
        cursorOuterRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    // Вешаем слушатели
    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Принудительно скрываем системный курсор */}
      <style dangerouslySetInnerHTML={{__html: `* { cursor: none !important; }`}} />

      {/* ВНЕШНИЙ КОНТУР: Кибер-рамка (Cyan) */}
      <motion.div
        ref={cursorOuterRef}
        className="fixed top-0 left-0 pointer-events-none z-40 flex items-center justify-center mix-blend-difference"
        animate={{
          scale: isClicked ? 0.7 : 1, // При клике рамка сжимается
          rotate: isClicked ? 45 : 0, // И эффектно поворачивается
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        // Нулевая ширина и высота, чтобы координаты были ровно по центру
        style={{ width: 0, height: 0 }} 
      >
        <div className="absolute w-8 h-8 text-cyan-400 opacity-80">
          {/* 4 острых уголка */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t-[2px] border-l-[2px] border-current" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t-[2px] border-r-[2px] border-current" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b-[2px] border-l-[2px] border-current" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-[2px] border-r-[2px] border-current" />
        </div>
      </motion.div>

      {/* ВНУТРЕННЕЕ ЯДРО: Точный крестик (Pink) */}
      <motion.div
        ref={cursorCoreRef}
        className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center mix-blend-difference"
        animate={{ 
          scale: isClicked ? 1.5 : 1, // При клике крестик увеличивается
          opacity: isClicked ? 1 : 0.9 
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 15 }}
        style={{ width: 0, height: 0 }}
      >
        <div className="relative flex items-center justify-center text-pink-500 shadow-[0_0_8px_#ec4899]">
           <div className="w-4 h-[2px] bg-current" />
           <div className="absolute h-4 w-[2px] bg-current" />
        </div>
      </motion.div>
    </>
  );
};

export default CustomCursor;