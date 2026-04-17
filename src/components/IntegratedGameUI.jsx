import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ShieldAlert, Cpu, Volume2, VolumeX, Fingerprint, Activity, Crosshair, Skull, Search, Dna } from 'lucide-react';

// --- ПОДГОТОВКА КАРТИНОК ---
import tempImg from '../assets/hero.png'; 
// !!! УБЕДИСЬ, ЧТО ava.jpg ЛЕЖИТ В ПАПКЕ assets !!!
import imgWelcome from '../assets/ava.jpg'; 

const imgMain = tempImg; const imgShy = tempImg; const imgScared = tempImg; const imgCool = tempImg;

// --- 1. УМНЫЙ КИБЕР-КУРСОР ---
const SmartCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateCursor = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (e.target.closest('.clickable')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    window.addEventListener('mousemove', updateCursor);
    return () => window.removeEventListener('mousemove', updateCursor);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center"
      animate={{ 
        x: pos.x - 16, 
        y: pos.y - 16,
        scale: isHovering ? 1.5 : 1,
        rotate: isHovering ? 90 : 0
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
    >
      <div className={`w-8 h-8 border border-dashed rounded-full flex items-center justify-center transition-colors duration-300 ${isHovering ? 'border-red-500' : 'border-cyan-400'}`}>
        <div className={`w-1 h-1 rounded-full transition-colors duration-300 ${isHovering ? 'bg-red-500' : 'bg-cyan-400'}`} />
      </div>
    </motion.div>
  );
};

// --- 2. ЭФФЕКТ РАСШИФРОВКИ ТЕКСТА (CYBER SCRAMBLE) ---
const CyberScramble = ({ text, speed = 1 }) => {
  const [displayed, setDisplayed] = useState('');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_\\/[]{}—=+*^?#';

  useEffect(() => {
    if (!text) return;
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayed(text.split('').map((letter, index) => {
        if (index < iteration) return text[index];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(''));

      if (iteration >= text.length) clearInterval(interval);
      iteration += speed / 3; 
    }, 30);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{displayed}</span>;
};

// --- ЖИВОЙ СИСТЕМНЫЙ ЛОГ ---
const LiveSystemLog = ({ isRedAlert }) => {
  const [logs, setLogs] = useState([]);
  useEffect(() => {
    const normalPhrases = ["PACKET_RECEIVED: 0x9A", "DECRYPT_THREAD_ACTIVE", "PORT_SCAN_INIT", "ANALYZE_PATTERN"];
    const alertPhrases = ["CRITICAL_BREACH_DETECTED", "UNAUTHORIZED_ACCESS", "SYSTEM_COMPROMISED", "INITIATING_WIPE"];
    
    const interval = setInterval(() => {
      const phrases = isRedAlert ? alertPhrases : normalPhrases;
      const newLog = `[${new Date().toISOString().substring(11, 19)}] ${phrases[Math.floor(Math.random() * phrases.length)]}`;
      setLogs(prev => [...prev.slice(-8), newLog]);
    }, 800);
    return () => clearInterval(interval);
  }, [isRedAlert]);

  return (
    <div className={`absolute left-[5%] bottom-[5%] font-mono text-[9px] md:text-[10px] flex flex-col gap-1 pointer-events-none z-10 w-64 ${isRedAlert ? 'text-red-500/80' : 'text-cyan-400/50'}`}>
      {logs.map((log, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="whitespace-nowrap">{log}</motion.div>
      ))}
    </div>
  );
};

const IntegratedGameUI = () => {
  const [systemState, setSystemState] = useState('idle');
  const [bootProgress, setBootProgress] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);
  const [activeTab, setActiveTab] = useState(null); 
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [ipClicks, setIpClicks] = useState(0);
  const [isRedAlert, setIsRedAlert] = useState(false);
  const videoRef = useRef(null);

  const playSound = (freq = 440, type = 'sine', duration = 0.1) => {
    if (isMuted || volume === 0 || systemState !== 'ready') return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(volume * 0.1, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  };

  const handleStart = () => {
    if (systemState !== 'idle') return;
    setSystemState('booting');
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15; 
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setSystemState('ready');
          if (videoRef.current) {
            videoRef.current.play().catch(() => {});
            videoRef.current.muted = isMuted;
            videoRef.current.volume = volume;
          }
          setTimeout(() => playSound(880, 'square', 0.2), 100);
        }, 500); 
      }
      setBootProgress(progress);
    }, 120);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      setVideoProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      if (newVolume > 0 && isMuted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
    }
    playSound(1000 + newVolume * 500, 'square', 0.05);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
      if (!newMuted && volume === 0) handleVolumeChange(0.5);
    }
  };

  const handleIpClick = () => {
    if (isRedAlert) return;
    const newClicks = ipClicks + 1;
    setIpClicks(newClicks);
    playSound(400 + newClicks * 200, 'square', 0.1);
    if (newClicks >= 3) {
      setIsRedAlert(true);
      playSound(150, 'sawtooth', 1.5);
      setActiveTab('classified');
    }
  };

  const baseTabs = [
    { id: 'about', label: 'OPERATOR_ID', code: '0x00A1', icon: Fingerprint, color: 'text-cyan-400', bgColor: 'bg-cyan-400', border: 'border-cyan-400', img: imgShy, 
      content: 'ИДЕНТИФИКАЦИЯ УСПЕШНА. Оператор: Создатель интерфейсов. Спецификация: Ломка стандартов UX/UI.' },
    { id: 'projects', label: 'DATABANK_SEC', code: '0x00B2', icon: ShieldAlert, color: 'text-pink-500', bgColor: 'bg-pink-500', border: 'border-pink-500', img: imgScared, 
      content: 'ДОСТУП РАЗРЕШЕН. Обнаружено 3 зашифрованных директории. Выгрузка визуальных данных для анализа.' },
    { id: 'skills', label: 'SYS_CAPACITY', code: '0x00C3', icon: Cpu, color: 'text-lime-400', bgColor: 'bg-lime-400', border: 'border-lime-400', img: imgCool, 
      content: 'ДИАГНОСТИКА СИСТЕМЫ. Ядро React.js: Стабильно (99%). Модуль Tailwind CSS: Перегрузка (MAX).' },
  ];

  const tabs = isRedAlert 
    ? [...baseTabs, { id: 'classified', label: 'CLASSIFIED', code: '0xDEAD', icon: Skull, color: 'text-red-500', bgColor: 'bg-red-600', border: 'border-red-500', img: imgMain, 
      content: 'ВНИМАНИЕ. ПРОТОКОЛ ОМЕГА. Вы нарушили периметр безопасности. Идет отслеживание вашего местоположения. Отключитесь немедленно.' }]
    : baseTabs;

  const activeTabData = tabs.find(t => t.id === activeTab);

  return (
    <div className="h-screen w-full bg-[#020202] flex items-center justify-center p-2 md:p-6 select-none overflow-hidden relative font-mono">
      <SmartCursor />

      {/* ЭЛТ-МОНИТОР */}
      <div className="relative w-full h-full crt-lens scanlines bg-[#05050a] overflow-hidden shadow-[0_0_50px_rgba(0,255,255,0.05)] border-2 border-white/5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] z-0 pointer-events-none"></div>
        <div className="noise-overlay"></div>

        <div className={`absolute inset-0 z-10 pointer-events-none mix-blend-overlay transition-colors duration-1000 ${isRedAlert ? 'bg-red-500/30' : 'bg-transparent'}`}></div>

        <video 
          ref={videoRef} loop playsInline muted={isMuted} onTimeUpdate={handleTimeUpdate}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] z-0 ${systemState === 'ready' ? 'opacity-[0.25]' : 'opacity-0'}`}
        >
          <source src="/background.mp4" type="video/mp4" />
        </video>

        <AnimatePresence mode="wait">
          
          {/* === ОБНОВЛЕННЫЙ ТЕРМИНАЛ «БИОМЕТРИЯ» === */}
          {systemState !== 'ready' && (
            <motion.div
              key="boot-screen"
              initial={{ opacity: 1 }} exit={{ opacity: 0, filter: "brightness(3)", scale: 1.05 }} transition={{ duration: 0.6 }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center p-10 md:p-24 bg-black font-mono clickable cursor-pointer"
              onClick={handleStart}
            >
              
              {/* Рамка досье */}
              <div className="relative p-10 flex flex-col items-center border-4 border-white/10 bg-black/60 backdrop-blur-sm">
                
                {/* Заголовок */}
                <div className="flex justify-between items-center w-full mb-10 border-b-2 border-white/10 pb-4 font-mono text-cyan-400">
                  <span className="text-xl flex gap-2 items-center"><Dna size={20} /> DOSSIER_CREATION // PROTOCOL:0825</span>
                  <span className="text-pink-500 tracking-[0.3em]">SECURE_FEED</span>
                </div>

                <div className="flex flex-row items-center gap-12 w-full max-w-7xl">
                  
                  {/* Левая часть: Картинка аватарки с круговым сканером */}
                  <div className="relative w-[400px] aspect-square flex items-center justify-center">
                    
                    {/* Твоя статичная картинка ава.jpg */}
                    <img src={imgWelcome} alt="Identity" className="absolute w-[350px] aspect-square object-cover filter contrast-125 saturate-[1.2] grayscale-[0.2]" />
                    
                    {/* Декоративный биометрический сканер сетчатки */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                      className="absolute w-[390px] h-[390px] border-4 border-dashed border-cyan-400/40 rounded-full"
                    ></motion.div>
                    
                    <motion.div
                      animate={{ scale: [1, 1.1, 1], rotate: -360 }}
                      transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                      className="absolute w-[370px] h-[370px] border-2 border-pink-500/60 rounded-full border-dotted"
                    ></motion.div>
                    
                    {/* Лазер сканера (полоса сверху вниз) */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400 animate-[scan_4s_linear_infinite] z-20 shadow-[0_0_20px_#22d3ee]"></div>
                    
                    {/* Метки в углах */}
                    <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-cyan-400"></div>
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-pink-500"></div>
                  </div>

                  {/* Правая часть: Расшифровка данных Мику */}
                  <div className="flex flex-col flex-1 h-[400px] justify-between text-lg md:text-xl font-mono text-white leading-relaxed">
                    <div className="space-y-3">
                      <p>{'>'} SEARCHING_FOR_DATA... <span className="text-lime-400">[FOUND]</span></p>
                      <br/>
                      <p>{'>'} OPERATOR: <span className="text-white font-bold"><CyberScramble text="KYRAHANG" speed={2} /></span></p>
                      <p>{'>'} SPECIES: <span className="text-white font-bold"><CyberScramble text="VOCALOID // DIGITAL_ENTITY" speed={2} /></span></p>
                      <p>{'>'} ASSIGNED_OS: <span className="text-cyan-400 font-bold">MikuOS v4.0.1</span></p>
                      <br/>
                      <p className="text-xs text-white/40">[{new Date().toLocaleTimeString()}] CONFIDENCE: 98.7% // PATTERN_MATCH_CONFIRMED</p>
                    </div>

                    {systemState === 'booting' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 space-y-2 border-t-2 border-white/10 pt-6">
                        <p>{'>'} MOUNTING_VFS... <span className="text-lime-400">OK</span></p>
                        <p>{'>'} ESTABLISHING_SECURE_LINK... <span className="text-lime-400">DONE</span></p>
                        <p className="text-pink-500 text-sm mt-2 animate-pulse">FIREWALL_BYPASS: INITIALIZED</p>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Кнопка Старта / Прогресс */}
                <div className="w-full mt-10 pt-6 border-t-2 border-white/10 flex justify-center items-center">
                  {systemState === 'idle' ? (
                    <motion.div
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="text-white hover:text-cyan-400 transition-colors flex items-center gap-4 text-4xl md:text-5xl font-black bg-white/5 px-8 py-3 border-2 border-white/10"
                    >
                      <Fingerprint size={48} /> ./ACCESS_LINK.sh <span className="animate-blink">_</span>
                    </motion.div>
                  ) : (
                    <div className="text-xl md:text-2xl font-bold text-white flex flex-col gap-4 bg-white/5 p-4 border border-white/10 max-w-2xl">
                      <span className="text-sm font-mono tracking-wider">CREATING_SECURE_TUNNEL...</span>
                      <span className="text-lime-400 tracking-tighter whitespace-nowrap overflow-hidden text-lg">
                        [{'#'.repeat(Math.floor((bootProgress / 100) * 20))}{'-'.repeat(20 - Math.floor((bootProgress / 100) * 20))}] {Math.floor(bootProgress)}%
                      </span>
                    </div>
                  )}
                </div>
                
              </div>
            </motion.div>
          )}

          {systemState === 'ready' && (
            <motion.div key="main-ui" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-20">
              <LiveSystemLog isRedAlert={isRedAlert} />
              <div className={`absolute top-10 right-10 opacity-30 flex items-center justify-center pointer-events-none z-10 ${isRedAlert ? 'text-red-500 animate-ping' : ''}`}>
                <div className={`w-32 h-32 border rounded-full animate-[spin_10s_linear_infinite] border-dashed ${isRedAlert ? 'border-red-500' : 'border-cyan-400'}`}></div>
                <div className={`absolute w-24 h-24 border rounded-full animate-[spin_15s_linear_infinite_reverse] ${isRedAlert ? 'border-red-600' : 'border-pink-500'}`}></div>
                <Crosshair size={32} className={`absolute ${isRedAlert ? 'text-red-500' : 'text-white'}`} />
              </div>

              <div className="absolute top-8 left-0 w-full px-12 flex justify-between font-mono text-[10px] md:text-xs tracking-[0.3em] text-white/50 border-b border-white/10 pb-4 bg-gradient-to-b from-black/50 to-transparent">
                <div className="flex gap-4 md:gap-8 items-center pointer-events-none">
                  <span className={`${isRedAlert ? 'text-red-500 animate-ping' : 'text-red-500 animate-pulse'} flex items-center gap-2`}>● REC</span>
                  <span className={isRedAlert ? 'text-red-500' : ''}>{isRedAlert ? 'SYS_BREACH' : 'SYS_ONLINE'}</span>
                </div>
                <div className="flex gap-8 items-center clickable cursor-pointer hover:text-white transition-colors font-mono" onClick={handleIpClick}>
                  <span className={isRedAlert ? 'text-red-500 font-bold animate-pulse font-mono' : 'font-mono'}>192.168.0.27_ROOT</span>
                </div>
              </div>

              <nav className="absolute left-[5%] top-[20%] md:top-[25%] z-30 flex flex-col gap-4 w-[350px] md:w-[450px]">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <div key={tab.id} onClick={() => { setActiveTab(isActive ? null : tab.id); playSound(1200, 'sine', 0.05); }} onMouseEnter={() => playSound(600, 'sine', 0.02)} className={`clickable relative border border-white/20 p-5 overflow-hidden group transition-all duration-300 ${isActive ? 'border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'bg-black/60 backdrop-blur-sm'}`}>
                      <div className={`absolute inset-0 w-0 transition-all duration-500 ease-out z-0 ${tab.bgColor} ${isActive ? 'w-full' : 'group-hover:w-full'}`}></div>
                      <div className="relative z-10">
                        <div className={`flex justify-between font-mono text-[10px] md:text-xs mb-2 transition-colors duration-300 ${isActive || 'group-hover:text-black text-white/40'}`}>
                          <span>[{tab.code}]</span>
                          <tab.icon size={16} className={isActive ? 'text-black' : `group-hover:text-black ${tab.color}`} />
                        </div>
                        <div className={`font-bebas text-4xl md:text-5xl uppercase tracking-wider transition-colors duration-300 ${isActive ? 'text-black' : 'group-hover:text-black text-white'}`}>
                          {tab.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className={`mt-4 font-mono text-[10px] md:text-xs text-white/50 w-full bg-black/60 p-3 border border-white/10 backdrop-blur-sm shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] ${isRedAlert ? 'border-red-500/50' : ''}`}>
                  <div className="flex justify-between mb-2 pointer-events-none font-mono text-[10px]">
                    <span className="flex items-center gap-2 font-mono"><Activity size={12} className={isRedAlert ? 'text-red-500' : 'text-cyan-400'}/> MEDIA_STREAM_SYNC</span>
                    <span className={isRedAlert ? 'text-red-500' : 'text-cyan-400'}>{Math.floor(videoProgress)}%</span>
                  </div>
                  <div className="w-full h-1 bg-white/10 relative overflow-hidden pointer-events-none">
                    <div className={`absolute top-0 left-0 h-full transition-all duration-100 ease-linear ${isRedAlert ? 'bg-red-500 shadow-[0_0_10px_#ef4444]' : 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]'}`} style={{ width: `${videoProgress}%` }}></div>
                  </div>
                </div>
              </nav>

              <div className="absolute right-[5%] bottom-[10%] w-[50%] h-[80%] z-20 flex justify-end items-center pointer-events-none font-mono text-base">
                <AnimatePresence mode="wait">
                  {!activeTab ? (
                    <motion.div key="main-miku" initial={{ opacity: 0, x: 50, filter: "blur(10px)" }} animate={{ opacity: 0.8, x: 0, filter: "blur(0px)" }} exit={{ opacity: 0, filter: "blur(10px)" }} transition={{ duration: 0.5 }} className="relative h-full w-full flex items-center justify-end">
                      <div className={`absolute w-[80%] h-[100%] border animate-pulse rounded-lg ${isRedAlert ? 'border-red-500/50 bg-red-500/10' : 'border-cyan-400/20 bg-cyan-400/5'}`}>
                        <div className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 ${isRedAlert ? 'border-red-500' : 'border-cyan-400'}`}></div>
                        <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 ${isRedAlert ? 'border-red-500' : 'border-cyan-400'}`}></div>
                        <div className={`absolute top-2 left-2 font-mono text-[10px] ${isRedAlert ? 'text-red-500' : 'text-cyan-400'}`}>{isRedAlert ? 'TARGET_LOCK: CRITICAL' : 'TARGET_LOCK: ENGAGED'}</div>
                      </div>
                      <img src={imgMain} alt="Main Target" className={`h-[95%] object-contain mix-blend-screen drop-shadow-[0_0_20px_rgba(0,229,255,0.2)] z-10 ${isRedAlert ? 'filter contrast-150 saturate-200 hue-rotate-[-30deg]' : ''}`} />
                    </motion.div>
                  ) : (
                    <motion.div key={activeTabData.id} initial={{ opacity: 0, x: 50, scale: 0.95 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 50, scale: 0.95 }} className="w-[500px] md:w-[600px] flex flex-col gap-6 pointer-events-auto">
                      <div className="relative w-full aspect-[4/3] border border-white/20 bg-black/60 p-4 overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)] group clickable">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0, 0.2] }} className={`absolute inset-0 mix-blend-overlay z-10 pointer-events-none ${activeTabData.id === 'classified' ? 'bg-red-500/30' : 'bg-cyan-400/20'}`} />
                        <img src={activeTabData.img} alt="target" className="w-full h-full object-contain filter contrast-125 mix-blend-screen" />
                        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/40"></div>
                        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/40"></div>
                        <div className="absolute bottom-4 left-4 font-mono text-[10px] text-white/50">{activeTabData.code} // ROOT</div>
                      </div>
                      <div className="bg-black/90 border-t-4 border-white border p-8 font-mono relative backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                        <div className={`absolute top-0 right-0 h-1 w-32 ${activeTabData.bgColor}`}></div>
                        <div className="text-[10px] md:text-xs text-white/40 mb-4 tracking-[0.2em] flex justify-between uppercase border-b border-white/10 pb-4">
                          <span>Status: Decrypted</span>
                          <span className={activeTabData.id === 'classified' ? 'text-red-500 animate-pulse AccessGrantedLink' : 'text-cyan-400'}>ACCESS_GRANTED</span>
                        </div>
                        <div className="text-base md:text-lg text-white leading-relaxed font-bold min-h-[80px]">
                          <CyberScramble text={activeTabData.content} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="fixed bottom-10 right-10 z-50 p-4 md:p-6 border border-white/20 bg-black/80 backdrop-blur-md flex flex-col gap-3 font-mono text-[10px] md:text-xs text-white/60 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                <div className="flex justify-between items-center mb-1">
                  <span className="flex items-center gap-2 font-mono text-[10px]"><Volume2 size={14} className={isRedAlert ? 'text-red-500 font-mono text-[10px]' : 'text-cyan-400 font-mono text-[10px]'}/> AUDIO_SYS</span>
                  <span className={isMuted ? 'text-red-500 font-mono text-[10px]' : (isRedAlert ? 'text-red-500 font-mono text-[10px]' : 'text-cyan-400 font-mono text-[10px]')}>{isMuted ? 'MUTED' : `${Math.round(volume * 100)}%`}</span>
                </div>
                <div className="flex gap-1 items-end h-8">
                  <button onClick={toggleMute} className="mr-3 hover:text-white transition-colors clickable font-mono text-[10px]">
                    {isMuted || volume === 0 ? <VolumeX size={20} className="text-red-500 font-mono text-[10px]" /> : <Volume2 size={20} className="font-mono text-[10px]" />}
                  </button>
                  {Array.from({ length: 10 }).map((_, i) => {
                    const barValue = (i + 1) / 10;
                    const isActive = !isMuted && volume >= barValue;
                    return (
                      <div key={i} onClick={() => handleVolumeChange(barValue)} className={`clickable w-4 h-full transition-all duration-150 border border-black/50 ${isActive ? isRedAlert ? 'bg-red-500 shadow-[0_0_8px_#ef4444]' : i > 7 ? 'bg-red-500 shadow-[0_0_8px_#ef4444]' : i > 4 ? 'bg-lime-400 shadow-[0_0_8px_#a3e635]' : 'bg-cyan-400 shadow-[0_0_8px_#22d3ee]' : 'bg-white/10 hover:bg-white/30'}`} style={{ height: `${30 + (i * 7)}%` }} />
                    );
                  })}
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default IntegratedGameUI;