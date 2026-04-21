import React from 'react';
// Нам больше не нужны BocchiMenu и Projects, мы используем один мастер-компонент
import IntegratedGameUI from './components/IntegratedGameUI';


function App() {
  return (
    <div className="relative">
      
      
      {/* Теперь мы показываем только один, полностью интегрированный интерфейс */}
      <IntegratedGameUI />
    </div>
  )
}

// ВОТ ЗДЕСЬ ДОЛЖЕН БЫТЬ App!
export default App;