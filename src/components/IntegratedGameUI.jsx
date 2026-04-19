import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ShieldAlert, Cpu, Volume2, VolumeX, Fingerprint, Activity, Crosshair, Skull, Camera, Folder, ChevronRight, Globe } from 'lucide-react';

// --- ПОДГОТОВКА КАРТИНОК ---
import tempImg from '../assets/hero.png'; 
import tempImg2 from '../assets/hero2.jpg';
import imgWelcome from '../assets/ava.jpg'; // Твой аватар

const imgMain = tempImg; 
const imgShy = tempImg2; 
const imgScared = tempImg2; 
const imgCool = tempImg2;

// --- СЛОВАРЬ ПЕРЕВОДОВ (i18n) ---
const LANGS = ['ru', 'en', 'uz', 'jp'];

const DICT = {
  ru: {
    scan: "SCANNING_SECTOR_7...", match: "MATCH_FOUND:", entity: "ENTITY_CLASS:", status: "STATUS:",
    anomaly: "S.O.K.A // ARCHITECT", monitoring: "MONITORING_ACTIVE", warn: "WARNING: UNAUTHORIZED ACCESS ATTEMPT DETECTED.",
    bypassing: "BYPASSING_SECURITY...", ok: "OK", init: "INITIATING_OVERRIDE...", done: "DONE",
    conn_est: "CONNECTION_ESTABLISHED", override: "OVERRIDE_SYSTEM", decrypting: "DECRYPTING_FEED...",
    sys_online: "SYS_ONLINE", sys_breach: "SYS_BREACH", media_sync: "MEDIA_STREAM_SYNC",
    target_lock: "TARGET_LOCK", engaged: "ENGAGED", critical: "CRITICAL",
    status_decrypted: "Status: Decrypted", access_granted: "ACCESS_GRANTED",
    mute: "MUTE", unmute: "UNMUTE", disconnect: "DISCONNECT", secure: "SECURE_CHANNEL",
    exported: "EXPORTED_DATA", modules: "SYSTEM_MODULES", extract: "EXTRACT_SOURCE_CODE",
    tab_about: "OPERATOR_ID", tab_projects: "DATABANK_SEC", tab_skills: "SYS_CAPACITY", tab_class: "CLASSIFIED",
    
    about_title: "ИДЕНТИФИКАЦИЯ: SOKA_CORE_IDENTIFIED",
    about_desc: "Оператор: Python Backend-разработчик. Спецификация: Архитектура Telegram-экосистем и Django-серверов. Специализация: Синтез надежной серверной логики и современной цифровой эстетики. Блендинг бэкенда с концепт-артом и Pixel Art.",
    proj_title: "РЕПОЗИТОРИИ ОБНАРУЖЕНЫ:",
    skill_title: "АКТИВНЫЕ МОДУЛИ ОПЕРАТОРА:",
    class_title: "ВНИМАНИЕ. ПРОТОКОЛ ОМЕГА.",
    class_desc: "Локализация: EN/RU/UZ. Доступ к нейросетевым агентам (LLM) получен. Система готова к интеграции ИИ и сложной автоматизации.",
    
    p1_desc: "KAWAII_MANGA: Система управления цифровыми библиотеками. Интеграция с Python-ядром для обработки и структурирования контента.",
    p2_desc: "BMI_APP: Аналитический модуль биометрических показателей. Высокая точность расчетов и кроссплатформенный интерфейс.",
    p3_desc: "ENF_CORE: Экспериментальный сетевой фреймворк. Оптимизация инфраструктурных запросов и сетевого взаимодействия.",
    p4_desc: "TG_FEEDBACK_BOT: Шифрованный канал связи на Aiogram. Система тикетов, модерация и полная анонимность данных."
  },
  en: {
    scan: "SCANNING_SECTOR_7...", match: "MATCH_FOUND:", entity: "ENTITY_CLASS:", status: "STATUS:",
    anomaly: "S.O.K.A // ARCHITECT", monitoring: "MONITORING_ACTIVE", warn: "WARNING: UNAUTHORIZED ACCESS ATTEMPT DETECTED.",
    bypassing: "BYPASSING_SECURITY...", ok: "OK", init: "INITIATING_OVERRIDE...", done: "DONE",
    conn_est: "CONNECTION_ESTABLISHED", override: "OVERRIDE_SYSTEM", decrypting: "DECRYPTING_FEED...",
    sys_online: "SYS_ONLINE", sys_breach: "SYS_BREACH", media_sync: "MEDIA_STREAM_SYNC",
    target_lock: "TARGET_LOCK", engaged: "ENGAGED", critical: "CRITICAL",
    status_decrypted: "Status: Decrypted", access_granted: "ACCESS_GRANTED",
    mute: "MUTE", unmute: "UNMUTE", disconnect: "DISCONNECT", secure: "SECURE_CHANNEL",
    exported: "EXPORTED_DATA", modules: "SYSTEM_MODULES", extract: "EXTRACT_SOURCE_CODE",
    tab_about: "OPERATOR_ID", tab_projects: "DATABANK_SEC", tab_skills: "SYS_CAPACITY", tab_class: "CLASSIFIED",
    
    about_title: "IDENTIFICATION: SOKA_CORE_IDENTIFIED",
    about_desc: "Operator: Python Backend Developer. Spec: Telegram Ecosystem Architecture & Django Systems. Specialization: Blending solid backend logic with modern digital aesthetics. Core: Logic meets Creativity.",
    proj_title: "REPOSITORIES DETECTED:",
    skill_title: "ACTIVE OPERATOR MODULES:",
    class_title: "WARNING. OMEGA PROTOCOL.",
    class_desc: "Localization: EN/RU/UZ. AI/LLM Agents integration access granted. System ready for neural expansion.",
    
    p1_desc: "KAWAII_MANGA: Digital library management system. High-performance Python core for content processing.",
    p2_desc: "BMI_APP: Biometric data analysis module. High-precision calculation engine with localized UI.",
    p3_desc: "ENF_CORE: Experimental network framework. Infrastructure request optimization.",
    p4_desc: "TG_FEEDBACK_BOT: Encrypted communication bridge. Aiogram-based moderation and anonymous messaging."
  },
  uz: {
    scan: "SCANNING_SECTOR_7...", match: "MATCH_FOUND:", entity: "ENTITY_CLASS:", status: "STATUS:",
    anomaly: "S.O.K.A // ME'MOR", monitoring: "MONITORING_ACTIVE", warn: "DIQQAT: RUXSATSIZ KIRISH ANIQLANDI.",
    bypassing: "BYPASSING_SECURITY...", ok: "OK", init: "INITIATING_OVERRIDE...", done: "DONE",
    conn_est: "ALOQA O'RNATILDI", override: "TIZIMNI BOSHQARISH", decrypting: "DECRYPTING_FEED...",
    sys_online: "SYS_ONLINE", sys_breach: "SYS_BREACH", media_sync: "MEDIA_STREAM_SYNC",
    target_lock: "TARGET_LOCK", engaged: "ENGAGED", critical: "CRITICAL",
    status_decrypted: "Status: Deciphered", access_granted: "ACCESS_GRANTED",
    mute: "MUTE", unmute: "UNMUTE", disconnect: "DISCONNECT", secure: "SECURE_CHANNEL",
    exported: "EXPORTED_DATA", modules: "SYSTEM_MODULES", extract: "EXTRACT_SOURCE_CODE",
    tab_about: "OPERATOR_ID", tab_projects: "DATABANK_SEC", tab_skills: "SYS_CAPACITY", tab_class: "CLASSIFIED",
    
    about_title: "IDENTIFIKATSIYA: SOKA_CORE",
    about_desc: "Operator: Python Backend Dasturchi. Telegram botlar arxitekturasi va Django tizimlari. Kuchli backend mantiqi va zamonaviy raqamli estetika uyg'unligi.",
    proj_title: "REPOZITORIYLAR TOPILDI:",
    skill_title: "FAOL TIZIM MODULLARI:",
    class_title: "DIQQAT. OMEGA PROTOKOLI.",
    class_desc: "Mahalliylashtirish: EN/RU/UZ. LLM agentlari integratsiyasi mavjud. Tizim sun'iy intellektga tayyor.",
    p1_desc: "KAWAII_MANGA: Raqamli kutubxona boshqaruv tizimi. Python-yadrosi asosida ishlaydi.",
    p2_desc: "BMI_APP: Biometrik ko'rsatkichlarni tahlil qilish moduli. Yuqori aniqlikdagi hisob-kitoblar.",
    p3_desc: "ENF_CORE: Tarmoq infratuzilmasi uchun eksperimental freymvork.",
    p4_desc: "TG_FEEDBACK_BOT: Maxfiy aloqa ko'prigi. Aiogram asosidagi ticket-tizimi."
  },
  jp: {
    scan: "セクター7_スキャン中...", match: "一致_検出:", entity: "エンティティ_クラス:", status: "ステータス:",
    anomaly: "S.O.K.A // 設計者", monitoring: "監視_アクティブ", warn: "警告：不正アクセス試行を検知。",
    bypassing: "セキュリティ_バイパス中...", ok: "OK", init: "オーバーライド_開始中...", done: "完了",
    conn_est: "接続_確立", override: "システム_オーバーライド", decrypting: "復号化中...",
    sys_online: "システム_オンライン", sys_breach: "システム_侵害", media_sync: "メディア_同期",
    target_lock: "ターゲット_ロック", engaged: "エンゲージ", critical: "クリティカル",
    status_decrypted: "ステータス: 復号化済み", access_granted: "アクセス許可",
    mute: "ミュート", unmute: "ミュート解除", disconnect: "切断", secure: "セキュア_チャネル",
    exported: "エクスポート_データ", modules: "システム_モジュール", extract: "ソースコード_抽出",
    tab_about: "オペレーター_ID", tab_projects: "データバンク", tab_skills: "システム容量", tab_class: "機密",
    
    about_title: "認証：SOKA_コア",
    about_desc: "オペレーター：Pythonバックエンド開発者。仕様：TelegramアーキテクチャおよびDjangoシステム。ロジックとデジタル美学の融合。",
    proj_title: "検出されたリポジトリ:",
    skill_title: "アクティブ_システム_モジュール:",
    class_title: "警告。オメガ_プロトコル。",
    class_desc: "ローカライズ：EN/RU/UZ。LLMエージェントの統合準備完了。ニューラル拡張の準備が整いました。",
    p1_desc: "KAWAII_MANGA: デジタル・ライブラリ管理システム。Pythonコア搭載。",
    p2_desc: "BMI_APP: 生体データ分析モジュール。高精度な計算エンジン。",
    p3_desc: "ENF_CORE: 実験的なネットワーク・フレームワーク。",
    p4_desc: "TG_FEEDBACK_BOT: 暗号化されたフィードバック・ブリッジ。Aiogramによる匿名通信。"
  }
};

// --- УМНЫЙ КИБЕР-КУРСОР ---
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
      className="fixed top-0 left-0 z-[999999] pointer-events-none flex items-center justify-center"
      animate={{ x: pos.x - 16, y: pos.y - 16, scale: isHovering ? 1.5 : 1, rotate: isHovering ? 90 : 0 }}
      transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
    >
      <div className={`w-8 h-8 border border-dashed rounded-full flex items-center justify-center transition-colors duration-300 ${isHovering ? 'border-red-500' : 'border-cyan-400'}`}>
        <div className={`w-1 h-1 rounded-full transition-colors duration-300 ${isHovering ? 'bg-red-500' : 'bg-cyan-400'}`} />
      </div>
    </motion.div>
  );
};

// --- ЭФФЕКТ ПЕЧАТНОЙ МАШИНКИ ---
const Typewriter = ({ text, speed = 20 }) => {
  const [displayed, setDisplayed] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setIsDone(false);
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.substring(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setIsDone(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span>
      {displayed}
      <span className={`inline-block w-[8px] h-[14px] bg-current ml-1 align-middle ${isDone ? 'animate-pulse opacity-50' : ''}`} />
    </span>
  );
};

// --- ЖИВОЙ СИСТЕМНЫЙ ЛОГ ---
const LiveSystemLog = ({ isRedAlert }) => {
  const [logs, setLogs] = useState([]);
  useEffect(() => {
    const normalPhrases = ["PYTHON_ENV_LOADED", "DJANGO_QUERY_OPTIMIZE", "REDIS_CACHE_SYNC", "AIOGRAM_POLLING_INIT"];
    const alertPhrases = ["CORE_OVERLOAD", "DATABASE_BREACH_SIM", "ACCESS_VIOLATION", "REBOOTING_NEURAL_LINK"];
    
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

const AudioWaveform = ({ active, isRedAlert }) => {
  const bars = [1, 2, 3, 4, 5];
  const colorClass = isRedAlert ? 'bg-red-500' : 'bg-cyan-400';
  return (
    <div className="flex items-center gap-[2px] h-6 w-6">
      {bars.map((bar) => (
        <motion.div
          key={bar}
          animate={active ? { height: ['20%', '100%', '40%', '80%', '20%'] } : { height: '10%' }}
          transition={active ? { repeat: Infinity, duration: 0.4 + Math.random() * 0.5, ease: "linear" } : { duration: 0.3 }}
          className={`w-[3px] ${colorClass}`}
        />
      ))}
    </div>
  );
};

// --- КОМПОНЕНТ ТЕРМИНАЛА ВНУТРИ ПРОЕКТА ---
const TerminalSimulation = ({ project, playSound, t }) => {
  const [stage, setStage] = useState('connecting'); 
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    setStage('connecting');
    setLogs([]);
    playSound(300, 'square', 0.1);
    
    const bootSequence = [
      "REQUESTING_GET_PROTOCOL...", "DATA_FRAME_DECODED.", "HANDSHAKING_WITH_GITHUB...",
      "SOURCE_CODE_PULLING...", "ANALYZING_CORE_DEPENDENCIES..."
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < bootSequence.length) {
        setLogs(prev => [...prev, bootSequence[i]]);
        playSound(800 + i * 50, 'square', 0.05);
        i++;
      } else {
        clearInterval(interval);
        playSound(1200, 'sine', 0.2);
        setTimeout(() => setStage('complete'), 400);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [project.name]); 

  if (stage !== 'complete') {
    return (
      <div className="text-sm text-white/70 space-y-2 relative z-20">
        {logs.map((log, index) => (
          <div key={index}>{'>'} {log}</div>
        ))}
        <div className="animate-pulse text-pink-500">{'>'} <span className="bg-pink-500 w-2 h-4 inline-block align-middle"></span></div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-20 h-full flex flex-col">
      <div className="flex items-start gap-6 border-b border-white/10 pb-6 mb-6">
        <div className="w-16 h-16 shrink-0 bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.2)]">
          <Folder size={32} />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-widest">{project.name}</h2>
          <div className="text-xs text-white/40 mt-2 flex gap-4">
            <span>{t('status')} <span className="text-lime-400">{project.status}</span></span>
            <span>REPO: <span className="text-cyan-400">GITHUB_SOURCE</span></span>
          </div>
        </div>
      </div>

      <div className="space-y-6 flex-1 max-h-[300px] overflow-y-auto pr-2 cyber-scroll">
        <div>
          <p className="text-pink-500 text-xs mb-2">{'//'} {t('exported')}</p>
          <p className="text-white/80 leading-relaxed text-sm md:text-base">
            <Typewriter text={project.description} speed={15} />
          </p>
        </div>

        <div>
          <p className="text-pink-500 text-xs mb-3">{'//'} {t('modules')}</p>
          <div className="flex gap-2 flex-wrap">
            {project.tech.map((tech, i) => (
              <motion.span 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + (i * 0.1) }}
                className="px-3 py-1 bg-white/5 border border-white/20 text-xs text-white/70 shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-white/10 flex justify-end gap-4">
        {project.url !== '#' && (
          <a 
            href={project.url} target="_blank" rel="noreferrer" 
            className="px-6 py-2 bg-pink-500/10 text-pink-500 border border-pink-500 hover:bg-pink-500 hover:text-white transition-all clickable shadow-[0_0_15px_rgba(236,72,153,0.2)]"
            onClick={() => playSound(800, 'square', 0.1)}
          >
            [ {t('extract')} ]
          </a>
        )}
      </div>
    </motion.div>
  );
};

// --- ГЛАВНЫЙ КОМПОНЕНТ ---
const IntegratedGameUI = () => {
  const [langIndex, setLangIndex] = useState(0);
  const lang = LANGS[langIndex];
  const t = (key) => DICT[lang][key] || key;

  const [systemState, setSystemState] = useState('idle');
  const [bootProgress, setBootProgress] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);
  const [activeTab, setActiveTab] = useState(null); 
  const [selectedProject, setSelectedProject] = useState(null); 
  
  const [volume, setVolume] = useState(0.1); 
  const [isMuted, setIsMuted] = useState(false);
  const [isVolumeExpanded, setIsVolumeExpanded] = useState(false);
  
  const [ipClicks, setIpClicks] = useState(0);
  const [isRedAlert, setIsRedAlert] = useState(false);
  const videoRef = useRef(null);

  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const playSound = (freq = 440, type = 'sine', duration = 0.1) => {
    if (volume === 0 || systemState !== 'ready') return;
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
    playSound(300, 'square', 0.1);
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

  const getBaseTabs = () => [
    { 
      id: 'about', label: t('tab_about'), code: '0x00A1', icon: Fingerprint, color: 'text-cyan-400', bgColor: 'bg-cyan-400', border: 'border-cyan-400', img: imgShy, 
      type: 'text', title: t('about_title'), content: t('about_desc') 
    },
    { 
      id: 'projects', label: t('tab_projects'), code: '0x00B2', icon: ShieldAlert, color: 'text-pink-500', bgColor: 'bg-pink-500', border: 'border-pink-500', img: imgScared, 
      type: 'projects', title: t('proj_title'),
      items: [
        { name: 'KAWAII_MANGA', status: 'STABLE', url: 'https://github.com/soka8imokenp/kawaii_manga', description: t('p1_desc'), tech: ['Python', 'Django', 'PostgreSQL'] },
        { name: 'BMI_ANALYZER', status: 'ONLINE', url: 'https://github.com/soka8imokenp/BMI_app', description: t('p2_desc'), tech: ['Python', 'Tkinter/Kivy', 'Logic'] },
        { name: 'ENF_CORE', status: 'STABLE', url: 'https://github.com/soka8imokenp/enf', description: t('p3_desc'), tech: ['Python', 'Network', 'Infrastructure'] },
        { name: 'TG_FEEDBACK_BOT', status: 'ONLINE', url: 'https://github.com/soka8imokenp/tg-feedback-bot', description: t('p4_desc'), tech: ['Aiogram', 'Redis', 'Docker'] }
      ]
    },
    { 
      id: 'skills', label: t('tab_skills'), code: '0x00C3', icon: Cpu, color: 'text-lime-400', bgColor: 'bg-lime-400', border: 'border-lime-400', img: imgCool, 
      type: 'skills', title: t('skill_title'),
      items: [
        { name: 'Python_Backend', value: 95, alert: false }, 
        { name: 'Django_Core', value: 90, alert: false },
        { name: 'Aiogram_Bot_Arch', value: 95, alert: true }, 
        { name: 'SQL_PostgreSQL', value: 85, alert: false },
        { name: 'React_Frontend', value: 75, alert: false }, 
        { name: 'Digital_PixelArt', value: 80, alert: false }
      ]
    },
  ];

  const tabs = isRedAlert 
    ? [...getBaseTabs(), { 
        id: 'classified', label: t('tab_class'), code: '0xDEAD', icon: Skull, color: 'text-red-500', bgColor: 'bg-red-600', border: 'border-red-500', img: tempImg2, 
        type: 'text', title: t('class_title'), content: t('class_desc') 
      }]
    : getBaseTabs();

  const activeTabData = tabs.find(t => t.id === activeTab);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .cyber-scroll::-webkit-scrollbar { width: 4px; }
        .cyber-scroll::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.2); }
        .cyber-scroll::-webkit-scrollbar-thumb { background: rgba(34, 211, 238, 0.4); border-radius: 2px; }
        .cyber-scroll:hover::-webkit-scrollbar-thumb { background: rgba(34, 211, 238, 0.8); }
        .cyber-scroll-red::-webkit-scrollbar { width: 4px; }
        .cyber-scroll-red::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.2); }
        .cyber-scroll-red::-webkit-scrollbar-thumb { background: rgba(239, 68, 68, 0.4); border-radius: 2px; }
        .cyber-scroll-red:hover::-webkit-scrollbar-thumb { background: rgba(239, 68, 68, 0.8); }
      `}} />

      <div className="h-screen w-full bg-[#020202] flex items-center justify-center p-2 md:p-6 select-none overflow-hidden relative font-mono">
        <SmartCursor />

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
            {systemState !== 'ready' && (
              <motion.div
                key="boot-screen"
                initial={{ opacity: 1 }} exit={{ opacity: 0, filter: "brightness(3)", scale: 1.05 }} transition={{ duration: 0.6 }}
                className="absolute inset-0 z-50 flex flex-col items-center justify-center p-10 md:p-24 bg-black font-mono clickable cursor-pointer"
                onClick={handleStart}
              >
                <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-40 brightness-100 mix-blend-screen pointer-events-none">
                  <source src="/no-signal.mp4" type="video/mp4" />
                </video>

                <div className="relative z-10 p-10 flex flex-col items-center border border-white/20 bg-black/70 backdrop-blur-sm w-full max-w-6xl shadow-[0_0_100px_rgba(0,0,0,0.9)]">
                  <div className="flex justify-between items-center w-full mb-10 border-b border-white/20 pb-4 font-mono text-white/80">
                    <span className="text-xl flex gap-3 items-center font-bold">
                      <Camera size={24} className="text-red-500 animate-pulse" /> CAM-01 // SECURITY_FEED
                    </span>
                    <div className="flex flex-col items-end">
                      <span className="text-red-500 tracking-[0.2em] font-bold animate-pulse text-sm">● REC</span>
                      <span className="text-white/40 tracking-[0.2em] text-xs mt-1">{currentTime.toLocaleTimeString()}</span>
                    </div>
                  </div>

                  <div className="flex flex-row items-center gap-12 w-full">
                    <div className="relative w-[400px] aspect-square flex items-center justify-center bg-black/50 border border-white/10 overflow-hidden shrink-0">
                      <img src={imgWelcome} alt="Target" className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 saturate-0 opacity-80" />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                        <div className="w-full h-[1px] bg-white"></div><div className="h-full w-[1px] bg-white absolute"></div>
                        <div className="w-64 h-64 border border-white rounded-full"></div>
                      </div>
                      <div className="absolute top-0 left-0 w-full h-1 bg-white/30 animate-[scan_4s_linear_infinite] z-20"></div>
                      <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-white"></div>
                      <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-white"></div>
                      <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-white"></div>
                      <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-white"></div>
                      <div className="absolute top-6 left-6 text-red-500 font-bold text-xs animate-pulse tracking-widest">[ {t('target_lock')} ]</div>
                    </div>

                    <div className="flex flex-col flex-1 h-[400px] justify-center text-base md:text-lg font-mono text-white/80 leading-relaxed overflow-hidden">
                      <div className="space-y-2 md:space-y-3">
                        <p className="text-white/50">{'>'} {t('scan')}</p>
                        <div className="h-1 md:h-2"></div>
                        <p>{'>'} {t('match')} <span className="text-white font-bold"><Typewriter text="S.O.K.A" speed={50} /></span></p>
                        <p>{'>'} {t('entity')} <span className="text-white font-bold"><Typewriter text={t('anomaly')} speed={40} /></span></p>
                        <p>{'>'} {t('status')} <span className="text-red-500 font-bold">{t('monitoring')}</span></p>
                        <div className="h-1 md:h-2"></div>
                        <p className="text-[10px] md:text-xs text-white/40 border-t border-white/10 pt-3 mt-3">{t('warn')}</p>
                      </div>
                      <div className="min-h-[120px] mt-4 md:mt-6 border-t border-white/10 pt-4 md:pt-6">
                        {systemState === 'booting' && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2 text-sm md:text-base">
                            <p className="text-white/60">{'>'} {t('bypassing')} <span className="text-lime-400">{t('ok')}</span></p>
                            <p className="text-white/60">{'>'} {t('init')} <span className="text-lime-400">{t('done')}</span></p>
                            <p className="text-red-500 font-bold mt-2 animate-pulse">{t('conn_est')}</p>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="w-full mt-10 pt-6 border-t border-white/20 flex justify-center items-center">
                    {systemState === 'idle' ? (
                      <motion.div
                        animate={{ opacity: [1, 0.7, 1] }} transition={{ repeat: Infinity, duration: 2 }}
                        className="text-white hover:text-black hover:bg-white transition-all flex items-center gap-4 text-3xl md:text-4xl font-bold bg-white/5 px-10 py-4 border border-white cursor-pointer"
                      >
                        <Terminal size={36} /> [ {t('override')} ]
                      </motion.div>
                    ) : (
                      <div className="text-xl md:text-2xl font-bold text-white flex flex-col gap-4 bg-white/5 p-4 border border-white/20 w-full">
                        <span className="text-sm font-mono tracking-wider text-white/50">{t('decrypting')}</span>
                        <span className="text-white tracking-tighter overflow-hidden text-lg">
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
                    <span className={isRedAlert ? 'text-red-500' : ''}>{isRedAlert ? t('sys_breach') : t('sys_online')}</span>
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
                            <span>[{tab.code}]</span><tab.icon size={16} className={isActive ? 'text-black' : `group-hover:text-black ${tab.color}`} />
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
                      <span className="flex items-center gap-2 font-mono"><Activity size={12} className={isRedAlert ? 'text-red-500' : 'text-cyan-400'}/> {t('media_sync')}</span>
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
                      <motion.div key="main-miku" initial={{ opacity: 0, x: 50, filter: "blur(10px)" }} animate={{ opacity: 0.8, x: 0, filter: "blur(0px)" }} exit={{ opacity: 0, filter: "blur(10px)" }} transition={{ duration: 0.5 }} className="relative h-full w-full flex items-center justify-center translate-x-60">
                        <div className={`absolute w-[62%] h-[100%] border animate-pulse rounded-lg ${isRedAlert ? 'border-red-500/50 bg-red-500/10' : 'border-cyan-400/20 bg-cyan-400/5'}`}>
                          <div className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 ${isRedAlert ? 'border-red-500' : 'border-cyan-400'}`}></div>
                          <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 ${isRedAlert ? 'border-red-500' : 'border-cyan-400'}`}></div>
                          <div className={`absolute top-2 left-2 font-mono text-[10px] ${isRedAlert ? 'text-red-500' : 'text-cyan-400'}`}>{t('target_lock')}: {isRedAlert ? t('critical') : t('engaged')}</div>
                        </div>
                        <img src={imgMain} alt="Main Target" className={`h-[95%] object-contain mix-blend-screen drop-shadow-[0_0_20px_rgba(0,229,255,0.2)] z-10 ${isRedAlert ? 'filter contrast-150 saturate-200 hue-rotate-[-30deg]' : ''}`} />
                      </motion.div>
                    ) : (
                      <motion.div key={activeTabData.id} initial={{ opacity: 0, x: 50, scale: 0.95 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 50, scale: 0.95 }} className="w-[500px] md:w-[600px] h-full py-10 flex flex-col pointer-events-auto">
                        <div className="relative w-full h-full border-t-4 border-white bg-black/80 p-8 font-mono flex flex-col overflow-hidden backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-x border-b border-white/20">
                          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                            <img src={activeTabData.img} alt="background" className="w-full h-full object-cover filter grayscale contrast-150 mix-blend-screen" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                          </div>
                          <div className={`absolute top-0 right-0 h-1 w-32 ${activeTabData.bgColor}`}></div>
                          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/20 z-10"></div>
                          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/20 z-10"></div>
                          <div className="relative z-10 flex-1 flex flex-col h-full">
                            <div className="text-[10px] md:text-xs text-white/40 mb-4 tracking-[0.2em] flex justify-between uppercase border-b border-white/10 pb-4">
                              <span>{t('status_decrypted')} // {activeTabData.code}</span>
                              <span className={activeTabData.id === 'classified' ? 'text-red-500 animate-pulse' : 'text-cyan-400'}>{t('access_granted')}</span>
                            </div>
                            <div className="text-base md:text-lg text-white leading-relaxed font-bold flex-1 flex flex-col">
                              <div className="mb-6 text-white/50 text-sm"><Typewriter text={activeTabData.title} speed={30} /></div>
                              {activeTabData.type === 'text' && <p className="text-white text-lg leading-loose"><Typewriter text={activeTabData.content} speed={15} /></p>}
                              {activeTabData.type === 'skills' && (
                                <div className={`mt-4 flex flex-col gap-6 flex-1 overflow-y-auto pr-4 ${isRedAlert ? 'cyber-scroll-red' : 'cyber-scroll'}`}>
                                  {activeTabData.items.map((skill, i) => (
                                    <div key={i} className="flex flex-col gap-2 w-full shrink-0">
                                      <div className="flex justify-between text-xs font-mono text-white/80">
                                        <span>{skill.name}</span>
                                        <span className={skill.alert ? "text-red-500 animate-pulse" : "text-lime-400"}>{skill.value}% {skill.alert && '[OVERLOAD]'}</span>
                                      </div>
                                      <div className="w-full h-2 bg-white/10 relative overflow-hidden">
                                        <motion.div
                                          initial={{ width: 0 }} animate={{ width: `${skill.value}%` }} transition={{ duration: 1, delay: 0.2 + (i * 0.1), ease: "easeOut" }}
                                          className={`absolute top-0 left-0 h-full ${skill.alert ? 'bg-red-500 shadow-[0_0_10px_#ef4444]' : 'bg-lime-400 shadow-[0_0_10px_#a3e635]'}`}
                                        />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                              {activeTabData.type === 'projects' && (
                                <div className={`mt-4 flex flex-col gap-4 flex-1 overflow-y-auto pr-4 ${isRedAlert ? 'cyber-scroll-red' : 'cyber-scroll'}`}>
                                  {activeTabData.items.map((proj, i) => (
                                    <motion.div
                                      key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.2 + (i * 0.1) }}
                                      className="group flex items-center justify-between p-4 border border-white/10 bg-black/40 hover:border-pink-500 hover:bg-pink-500/20 cursor-pointer transition-all clickable shrink-0 backdrop-blur-sm"
                                      onClick={() => { playSound(1000, 'square', 0.05); setSelectedProject(proj); }}
                                    >
                                      <div className="flex items-center gap-4">
                                        <Folder size={20} className="text-white/30 group-hover:text-pink-500 transition-colors" />
                                        <span className="text-white/90 group-hover:text-white font-mono text-base tracking-widest">{proj.name}</span>
                                      </div>
                                      <div className="flex items-center gap-4">
                                        <span className={`text-xs font-mono text-lime-400`}>[{proj.status}]</span>
                                        <ChevronRight size={16} className="text-white/20 group-hover:text-pink-500 transition-transform group-hover:translate-x-1" />
                                      </div>
                                    </motion.div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="fixed bottom-10 right-10 z-50 flex flex-row-reverse items-center gap-4">
                  <div className="flex flex-row-reverse items-center relative">
                    <div 
                      onClick={() => setIsVolumeExpanded(!isVolumeExpanded)}
                      className={`clickable flex items-center justify-center w-14 h-14 bg-black/90 border backdrop-blur-md transition-all z-20 ${isVolumeExpanded ? 'border-white text-white shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'border-white/60 text-white shadow-[0_0_10px_rgba(255,255,255,0.1)] hover:bg-white/10 hover:border-white'}`}
                    >
                      {isMuted || volume === 0 
                        ? <VolumeX size={24} strokeWidth={2.5} className={isRedAlert ? 'text-red-500' : 'text-white opacity-60'} />
                        : <Volume2 size={24} strokeWidth={2.5} className={isRedAlert ? 'text-red-500' : 'text-white'} />
                      }
                    </div>
                    <AnimatePresence>
                      {isVolumeExpanded && (
                        <motion.div initial={{ opacity: 0, width: 0, x: 20 }} animate={{ opacity: 1, width: 'auto', x: 0 }} exit={{ opacity: 0, width: 0, x: 20 }} className="overflow-hidden flex z-10">
                          <div className="flex h-14 bg-black/80 border-y border-l border-white/20 backdrop-blur-md items-center px-4 pr-6 gap-6 w-max whitespace-nowrap">
                            <div onClick={toggleMute} className={`clickable flex items-center gap-2 px-3 py-1.5 border transition-all ${isMuted ? 'border-red-500 bg-red-500/10 text-red-500' : 'border-white/20 hover:border-white/50 text-white/70 hover:text-white'}`}>
                              {isMuted || volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
                              <span className="font-mono text-[10px] font-bold tracking-widest">{isMuted || volume === 0 ? t('unmute') : t('mute')}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <AudioWaveform active={!isMuted && volume > 0} isRedAlert={isRedAlert} />
                              <span className={`font-mono text-[10px] w-6 font-bold ${isMuted || volume === 0 ? 'text-red-500' : 'text-white'}`}>{isMuted ? '0%' : `${Math.round(volume * 100)}%`}</span>
                            </div>
                            <div className="flex gap-[4px] items-center">
                              {Array.from({ length: 10 }).map((_, i) => {
                                const barValue = (i + 1) / 10;
                                const isActive = !isMuted && volume >= barValue;
                                let colorClass = 'bg-transparent border-white/20 hover:bg-white/20';
                                if (isActive) colorClass = isRedAlert ? 'bg-red-500 border-red-500 shadow-[0_0_10px_#ef4444]' : 'bg-cyan-400 border-cyan-400 shadow-[0_0_10px_#22d3ee]';
                                return <div key={i} onClick={(e) => { e.stopPropagation(); handleVolumeChange(barValue); }} className={`clickable h-6 w-3 transform -skew-x-12 transition-all duration-150 border ${colorClass}`} />;
                              })}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div 
                    onClick={() => { setLangIndex((prev) => (prev + 1) % LANGS.length); playSound(1000, 'square', 0.05); }}
                    className={`clickable flex items-center justify-center gap-2 h-14 px-4 bg-black/90 border transition-all z-20 ${isRedAlert ? 'border-red-500/50 hover:border-red-500 hover:bg-red-500/10 text-red-500' : 'border-white/20 hover:border-white/50 hover:bg-white/10 text-white/70 hover:text-white'} backdrop-blur-md font-mono text-[10px] md:text-xs tracking-widest uppercase shadow-[0_0_10px_rgba(0,0,0,0.5)]`}
                  >
                    <Globe size={16} className={isRedAlert ? "text-red-500" : "text-cyan-400"} />
                    [ {lang} ]
                  </div>
                </div>

                <AnimatePresence>
                  {selectedProject && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm pointer-events-auto" onClick={() => setSelectedProject(null)}>
                      <motion.div onClick={(e) => e.stopPropagation()} initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="relative w-full max-w-2xl bg-black border border-white/20 shadow-[0_0_50px_rgba(236,72,153,0.15)] font-mono flex flex-col overflow-hidden">
                        <div className="flex justify-between items-center bg-white/5 border-b border-white/10 px-4 py-3 relative z-20">
                          <div className="flex items-center gap-3">
                            <Terminal size={16} className="text-pink-500" />
                            <span className="text-xs text-white/50 tracking-widest">{t('secure')} // {selectedProject.name}</span>
                          </div>
                          <button onClick={() => setSelectedProject(null)} className="text-white/40 hover:text-red-500 transition-colors clickable text-xs tracking-widest">[ {t('disconnect')} ]</button>
                        </div>
                        <div className="p-6 md:p-8 min-h-[350px] relative">
                          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none z-10 opacity-30"></div>
                          <TerminalSimulation project={selectedProject} playSound={playSound} t={t} />
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default IntegratedGameUI;