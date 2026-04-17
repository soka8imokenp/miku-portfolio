import React from 'react';
import { motion } from 'framer-motion';
// Импортируем иконку крестика для закрытия
import { X } from 'lucide-react'; 

const Projects = ({ onClose }) => {
  // Список твоих проектов (потом заменишь на свои реальные)
  const projectsList = [
    { id: 1, title: 'BOCCHI PORTFOLIO', desc: 'Мой личный сайт на React + Tailwind', color: 'bg-pink-400' },
    { id: 2, title: 'GUITAR APP', desc: 'Приложение для настройки гитары', color: 'bg-cyan-400' },
    { id: 3, title: 'ANIME TRACKER', desc: 'Сайт-база данных просмотренных тайтлов', color: 'bg-yellow-300' },
  ];

  return (
    <motion.div
      // Анимация: панель выезжает справа налево
      initial={{ x: '100%', skewX: -10 }}
      animate={{ x: 0, skewX: 0 }}
      exit={{ x: '100%', skewX: 10 }}
      transition={{ type: 'spring', damping: 20, stiffness: 100 }}
      // Фон: затемнение и размытие всего остального сайта
      className="fixed inset-0 z-40 flex justify-end bg-black/60 backdrop-blur-sm"
    >
      {/* Сама правая панель */}
      <div className="w-full max-w-3xl h-full bg-zinc-900 border-l-8 border-pink-500 p-10 overflow-y-auto relative flex flex-col">
        
        {/* Кнопка закрытия (Крестик) */}
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-white hover:text-pink-500 transition-colors"
        >
          <X size={48} strokeWidth={3} />
        </button>

        {/* Заголовок */}
        <h2 className="text-6xl lg:text-8xl font-black text-white uppercase italic -skew-x-6 mb-12 select-none">
          Мои <span className="text-pink-500">Проекты</span>
        </h2>

        {/* Сетка с карточками проектов */}
        <div className="flex flex-col gap-8">
          {projectsList.map((p, i) => (
            <motion.div
              key={p.id}
              // Карточки появляются по очереди (с задержкой)
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className={`relative p-8 border-4 border-black ${p.color} text-black -skew-x-2 group cursor-pointer hover:scale-[1.02] transition-transform shadow-[8px_8px_0px_#000]`}
            >
              {/* Эффект свечения при наведении */}
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
              
              <h3 className="text-4xl font-black uppercase mb-2">{p.title}</h3>
              <p className="text-xl font-bold opacity-80 mb-6">{p.desc}</p>
              
              <button className="px-6 py-2 bg-black text-white font-bold uppercase italic border-2 border-black group-hover:bg-transparent group-hover:text-black transition-colors">
                Смотреть код -{'>'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;