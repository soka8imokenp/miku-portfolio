import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ShieldAlert, Cpu, Volume2, VolumeX, Fingerprint, Activity, Crosshair, Skull, Camera, Folder, ChevronRight, Globe, Monitor, Smartphone, Send, Code, Briefcase, Mail } from 'lucide-react';

// --- ПОДГОТОВКА КАРТИНОК ---
import tempImg from '../assets/hero.png'; 
import tempImg2 from '../assets/hero2.jpg';
import imgWelcome from '../assets/ava.jpg'; 

// ИМПОРТ СКРИНШОТОВ ИЗ ПАПКИ ASSETS
import manga1 from '../assets/manga_1.webp';
import manga2 from '../assets/manga_2.webp';
import manga3 from '../assets/manga_3.webp';
import manga4 from '../assets/manga_4.webp';
import manga5 from '../assets/manga_5.webp';
import manga6 from '../assets/manga_6.webp';

import feed1 from '../assets/feedback_1.webp';
import feed2 from '../assets/feedback_2.webp';
import feed3 from '../assets/feedback_3.webp';
import feed4 from '../assets/feedback_4.webp';
import feed5 from '../assets/feedback_5.webp';
import feed6 from '../assets/feedback_6.webp';
import feed7 from '../assets/feedback_7.webp';
import feed8 from '../assets/feedback_8.webp';
import feed9 from '../assets/feedback_9.webp';

import bmi1 from '../assets/bmi1.webp';
import bmi2 from '../assets/bmi2.webp';
import bmi3 from '../assets/bmi3.webp';
import bmi4 from '../assets/bmi4.webp';
import bmi5 from '../assets/bmi5.webp';
import bmi6 from '../assets/bmi6.webp';
import bmi7 from '../assets/bmi7.webp';
import bmi8 from '../assets/bmi8.webp';
import bmi9 from '../assets/bmi9.webp';


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
    about_desc: "ОПЕРАТОР_ПРОФИЛЬ: Разработчик Python Backend-инфраструктур. ПРОТОКОЛЫ: Проектирование масштабируемых Django-серверов и комплексных Telegram-экосистем. СИНТЕЗ_ДАННЫХ: Объединение отказоустойчивой серверной логики с современными UI/UX интерфейсами. ДОП_МОДУЛИ: Интеграция цифровой эстетики (Concept Art, Pixel Art в Aseprite), геймдев-подход и мульти-лингвальная локализация (EN/RU/UZ). ЦЕЛЬ: Разработка систем, где холодный машинный код симбиозирует с творческим видением.",
    proj_title: "РЕПОЗИТОРИИ ОБНАРУЖЕНЫ:",
    skill_title: "АКТИВНЫЕ МОДУЛИ ОПЕРАТОРА:",
    class_title: "ВНИМАНИЕ. ПРОТОКОЛ ОМЕГА.",
    class_desc: "Локализация: EN/RU/UZ. Доступ к нейросетевым агентам (LLM) получен. Система готова к интеграции ИИ и сложной автоматизации.",
    
    p1_desc: "KAWAII_MANGA: Подсистема экосистемы KAWAII_UZ. Ридер графических новелл с эксклюзивной UI-архитектурой. Статус: Предрелизная интеграция, ожидание синхронизации с главным ядром.",
    p2_desc: "BMI_ANALYZER: Биометрический сканер с интерфейсом Glassmorphism. Вектор развития: Интеграция ИИ-модуля для премиум-анализа питания и генерации персональных метаболических логов.",
    p3_desc: "ENF_CORE: Коммерческий шлюз (E-commerce). Стек: HTMX, Django, Docker. Интегрированы модули оплаты (включая crypto). Узел полностью готов к развертыванию в боевой среде.",
    p4_desc: "TG_FEEDBACK_BOT: WebApp-модуль связи для KAWAII_UZ (эстетика Neobrutalism). Двухконтурная архитектура: Клиент/Админ. Защищенный канал поддержки на базе Python/Django.",

    view_visuals: "DECRYPT_VISUAL_FEED", back_to_data: "ВЕРНУТЬСЯ_В_ТЕРМИНАЛ", decoding: "ДЕКОДИРОВАНИЕ_СИГНАЛА...", signal_stable: "СИГНАЛ_СТАБИЛЕН",
    
    mobile_warn_title: "В ДОСТУПЕ ОТКАЗАНО",
    mobile_warn_desc: "Обнаружено неавторизованное мобильное устройство. Протоколы безопасности S.O.K.A. требуют для подключения полноформатную рабочую станцию (Desktop). Пожалуйста, переподключитесь с ПК для доступа к зашифрованным файлам.",

    net_title: "КАНАЛЫ СВЯЗИ", net_desc: "ВЫБЕРИТЕ БЕЗОПАСНЫЙ ПРОТОКОЛ ПЕРЕДАЧИ ДАННЫХ."
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
    about_desc: "OPERATOR_PROFILE: Python Backend Engineer. PROTOCOLS: Architecting scalable Django servers and complex Telegram bot ecosystems. SYNTHESIS: Bridging fault-tolerant backend logic with modern, intuitive UI/UX. AUX_MODULES: Deep integration of digital aesthetics (Concept & Pixel Art via Aseprite) and multi-regional localization (EN/RU/UZ). STATUS: Forging digital constructs where cold machine code achieves seamless synergy with creative vision.",
    proj_title: "REPOSITORIES DETECTED:",
    skill_title: "ACTIVE OPERATOR MODULES:",
    class_title: "WARNING. OMEGA PROTOCOL.",
    class_desc: "Localization: EN/RU/UZ. AI/LLM Agents integration access granted. System ready for neural expansion.",
    
    p1_desc: "KAWAII_MANGA: Subsystem of the KAWAII_UZ ecosystem. Graphic novel rendering module with an exclusive UI architecture. Status: Awaiting sync with the main core.",
    p2_desc: "BMI_ANALYZER: Biometric scanner featuring a Glassmorphism UI. Development vector: AI integration for premium diet analysis and personalized metabolic logging.",
    p3_desc: "ENF_CORE: Fully operational E-commerce gateway. Tech: HTMX, Django, Docker. Includes crypto and fiat payment systems. Module ready for live deployment.",
    p4_desc: "TG_FEEDBACK_BOT: WebApp support module for KAWAII_UZ (Neobrutalism UI). Dual-access architecture (Client/Admin). Encrypted comms channel powered by Python/Django.",

    view_visuals: "DECRYPT_VISUAL_FEED", back_to_data: "RETURN_TO_TERMINAL", decoding: "DECODING_SIGNAL...", signal_stable: "SIGNAL_STABLE",
    
    mobile_warn_title: "ACCESS DENIED",
    mobile_warn_desc: "Unauthorized mobile device detected. S.O.K.A. security protocols require a full-scale workstation (Desktop) for connection. Please reconnect using a PC to access encrypted databanks.",

    net_title: "COMMUNICATION CHANNELS", net_desc: "SELECT A SECURE DATA TRANSFER PROTOCOL."
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
    about_desc: "OPERATOR_PROFILI: Python Backend Muhandis. PROTOKOLLAR: Masshtablanuvchi Django serverlari va murakkab Telegram eko-tizimlarini loyihalash. SINTEZ: Ishonchli backend mantiqini zamonaviy UI/UX bilan birlashtirish. QO'SHIMCHA_MODULLAR: Raqamli estetika (Concept & Pixel Art) va ko'p tilli lokalizatsiya (EN/RU/UZ). MAQSAD: Qattiq mashina kodi va ijodiy yondashuv mukammal uyg'unlashgan ruxsat etilgan raqamli tizimlarni yaratish.",
    proj_title: "REPOZITORIYLAR TOPILDI:",
    skill_title: "FAOL TIZIM MODULLARI:",
    class_title: "DIQQAT. OMEGA PROTOKOLI.",
    class_desc: "Mahalliylashtirish: EN/RU/UZ. LLM agentlari integratsiyasi mavjud. Tizim sun'iy intellektga tayyor.",
    p1_desc: "KAWAII_MANGA: KAWAII_UZ ekotizimining quyi tizimi. Eksklyuziv UI arxitekturasiga ega grafik romanlar o'qish moduli. Holati: Asosiy yadro bilan sinxronizatsiya kutilmoqda.",
    p2_desc: "BMI_ANALYZER: Glassmorphism interfeysli biometrik skaner. Rivojlanish vektori: premium ovqatlanish tahlili va shaxsiy tavsiyalar uchun AI integratsiyasi.",
    p3_desc: "ENF_CORE: E-commerce tijorat shlyuzi. HTMX, Django, Docker. Kripto to'lovlari o'rnatilgan. Modul jangovar ishga tushirishga tayyor.",
    p4_desc: "TG_FEEDBACK_BOT: KAWAII_UZ uchun WebApp aloqa moduli (Neobrutalism UI). Mijoz va Admin uchun ikki tomonlama arxitektura. Python/Django asosidagi shifrlangan aloqa.",

    view_visuals: "DECRYPT_VISUAL_FEED", back_to_data: "TERMINALGA_QAYTISH", decoding: "SIGNAL_DEKODLANMOQDA...", signal_stable: "SIGNAL_BARQAROR",
    
    mobile_warn_title: "KIRISH RAD ETILDI",
    mobile_warn_desc: "Ruxsat etilmagan mobil qurilma aniqlandi. S.O.K.A. xavfsizlik protokollari ulanish uchun to'liq formatli ish stansiyasini (Desktop) talab qiladi. Shifrlangan fayllarga kirish uchun shaxsiy kompyuter orqali qayta ulaning.",

    net_title: "ALOQA KANALLARI", net_desc: "XAVFSIZ MA'LUMOT UZATISH PROTOKOLINI TANLANG."
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
    about_desc: "オペレーター_プロファイル：Pythonバックエンドエンジニア。プロトコル：拡張可能なDjangoサーバーと複雑なTelegramエコシステムの構築。データ合成：耐障害性の高いバックエンド・ロジックと最新のUI/UXの融合。補助モジュール：デジタル・アート（コンセプト＆ピクセルアート）と多言語ローカライズ（EN/RU/UZ）の統合。ミッション：冷徹なマシンコードと創造的なビジョンが完璧に共鳴するシステムの開発。",
    proj_title: "検出されたリポジトリ:",
    skill_title: "アクティブ_システム_モジュール:",
    class_title: "警告。オメガ_プロトコル。",
    class_desc: "ローカライズ：EN/RU/UZ。LLMエージェントの統合準備完了。ニューラル拡張の準備が整いました。",
    p1_desc: "KAWAII_MANGA: KAWAII_UZエコシステムのサブシステム。独自のUIアーキテクチャを持つグラフィックノベル・リーダー。ステータス：メインコアとの同期待機中。",
    p2_desc: "BMI_ANALYZER: Glassmorphism UIを備えた生体スキャナー。開発ベクトル：プレミアム食事分析とパーソナライズのためのAI（人工知能）統合。",
    p3_desc: "ENF_CORE: Eコマース・ゲートウェイ。HTMX、Django、Docker実装。暗号資産決済モジュール統合済み。本番デプロイの準備完了。",
    p4_desc: "TG_FEEDBACK_BOT: KAWAII_UZ用WebApp通信モジュール（Neobrutalism UI）。クライアント/管理者のデュアル・アーキテクチャ。Python/Django駆動の保護されたサポート・チャネル。",

    view_visuals: "ビジュアル復号化", back_to_data: "端末に戻る", decoding: "信号デコード中...", signal_stable: "信号安定",
    
    mobile_warn_title: "アクセス拒否",
    mobile_warn_desc: "未承認のモバイルデバイスを検出しました。S.O.K.A.セキュリティプロトコルでは、接続にフルスケールのワークステーション（PC）が必要です。暗号化データにアクセスするには、PC環境から再接続してください。",

    net_title: "通信チャネル", net_desc: "セキュアなデータ転送プロトコルを選択してください。"
  }
};

// ==========================================
// НЕРУШИМЫЙ VANILLA JS КУРСОР (ТОЧНЫЙ СНАЙПЕРСКИЙ РЕЖИМ)
// ==========================================
const VanillaCyberCursor = () => {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const requestRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const previousMouse = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);

  useEffect(() => {
    // Отключаем на мобилках
    if (window.innerWidth < 768) return;

    const onMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!hasMoved.current) {
        hasMoved.current = true;
        if (outerRef.current) outerRef.current.style.opacity = 1;
        if (innerRef.current) innerRef.current.style.opacity = 1;
      }
    };

    const onMouseDown = () => {
      if (outerRef.current) outerRef.current.classList.add('cursor-clicked');
      if (innerRef.current) innerRef.current.classList.add('cursor-inner-clicked');
    };

    const onMouseUp = () => {
      if (outerRef.current) outerRef.current.classList.remove('cursor-clicked');
      if (innerRef.current) innerRef.current.classList.remove('cursor-inner-clicked');
    };

    const onMouseOver = (e) => {
      if (e.target.closest('button, a, .clickable')) {
        if (outerRef.current) outerRef.current.classList.add('cursor-hover');
        if (innerRef.current) innerRef.current.classList.add('cursor-inner-hover');
      } else {
        if (outerRef.current) outerRef.current.classList.remove('cursor-hover');
        if (innerRef.current) innerRef.current.classList.remove('cursor-inner-hover');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', onMouseOver);

    const updateCursor = () => {
      // Центральная точка следует за мышью мгновенно (для идеальной точности)
      if (innerRef.current && hasMoved.current) {
        innerRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0)`;
      }

      // Кольцо слегка отстает (физика "резинки")
      previousMouse.current.x += (mouse.current.x - previousMouse.current.x) * 0.25;
      previousMouse.current.y += (mouse.current.y - previousMouse.current.y) * 0.25;

      if (outerRef.current && hasMoved.current) {
        outerRef.current.style.transform = `translate3d(${previousMouse.current.x}px, ${previousMouse.current.y}px, 0)`;
      }

      requestRef.current = requestAnimationFrame(updateCursor);
    };

    requestRef.current = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        * { cursor: none !important; }
        
        /* Внешнее кольцо в обычном состоянии */
        .cyber-cursor-outer {
          position: fixed; top: -15px; left: -15px; width: 30px; height: 30px;
          border: 1px solid rgba(34, 211, 238, 0.6); border-radius: 50%; opacity: 0;
          pointer-events: none; z-index: 9999999; mix-blend-mode: screen;
          transition: width 0.2s ease, height 0.2s ease, border-color 0.2s ease, margin 0.2s ease, opacity 0.3s;
        }

        /* Центральная точка (мушка) - всегда видна */
        .cyber-cursor-inner {
          position: fixed; top: -3px; left: -3px; width: 6px; height: 6px;
          background-color: #22d3ee; border-radius: 50%; opacity: 0;
          pointer-events: none; z-index: 9999999; box-shadow: 0 0 8px #22d3ee;
          mix-blend-mode: screen; transition: transform 0.1s ease, background-color 0.2s ease, box-shadow 0.2s ease;
        }

        /* НАВЕДЕНИЕ (Снайперский фокус - кольцо сужается вокруг точки) */
        .cyber-cursor-outer.cursor-hover {
          width: 16px; height: 16px; border-color: #ec4899;
          margin-top: 7px; margin-left: 7px; border-width: 1.5px;
        }
        .cyber-cursor-inner.cursor-inner-hover { 
          background-color: #ec4899; box-shadow: 0 0 10px #ec4899; 
        }

        /* КЛИК */
        .cyber-cursor-outer.cursor-clicked { 
          width: 12px; height: 12px; margin-top: 9px; margin-left: 9px; border-width: 2px; 
        }
        .cyber-cursor-inner.cursor-inner-clicked { transform: scale(0.5); }
      `}} />
      <div ref={outerRef} className="cyber-cursor-outer" />
      <div ref={innerRef} className="cyber-cursor-inner" />
    </>
  );
};
// ==========================================

// --- ОПТИМИЗАЦИЯ 1: Изолированный компонент часов ---
const CyberClock = React.memo(() => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return <>{time.toLocaleTimeString()}</>;
});

// --- ОПТИМИЗАЦИЯ 2: Изолированный прогресс-бар видео ---
const MediaSyncBar = React.memo(({ videoRef, isRedAlert, t }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef?.current;
    if (!video) return;
    
    const handleUpdate = () => {
      setProgress((video.currentTime / video.duration) * 100);
    };

    video.addEventListener('timeupdate', handleUpdate);
    return () => video.removeEventListener('timeupdate', handleUpdate);
  }, [videoRef]);

  return (
    <div className={`mt-4 font-mono text-[10px] md:text-xs text-white/50 w-full bg-black/60 p-3 border border-white/10 backdrop-blur-sm shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] ${isRedAlert ? 'border-red-500/50' : ''}`}>
      <div className="flex justify-between mb-2 pointer-events-none font-mono text-[10px]">
        <span className="flex items-center gap-2 font-mono"><Activity size={12} className={isRedAlert ? 'text-red-500' : 'text-cyan-400'}/> {t('media_sync')}</span>
        <span className={isRedAlert ? 'text-red-500' : 'text-cyan-400'}>{Math.floor(progress)}%</span>
      </div>
      <div className="w-full h-1 bg-white/10 relative overflow-hidden pointer-events-none">
        <div className={`absolute top-0 left-0 h-full transition-all duration-100 ease-linear ${isRedAlert ? 'bg-red-500 shadow-[0_0_10px_#ef4444]' : 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]'}`} style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
});

// --- ЭФФЕКТ ПЕЧАТНОЙ МАШИНКИ (МЕМОИЗИРОВАН) ---
const Typewriter = React.memo(({ text, speed = 20 }) => {
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
});

// --- ЖИВОЙ СИСТЕМНЫЙ ЛОГ (МЕМОИЗИРОВАН) ---
const LiveSystemLog = React.memo(({ isRedAlert }) => {
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
});

const AudioWaveform = React.memo(({ active, isRedAlert }) => {
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
});

// --- КОМПОНЕНТ ТЕРМИНАЛА ВНУТРИ ПРОЕКТА ---
const TerminalSimulation = ({ project, playSound, t, viewMode, setViewMode }) => {
  const [stage, setStage] = useState('connecting'); 
  const [logs, setLogs] = useState([]);
  
  const [imgIndex, setImgIndex] = useState(0);
  const [isDecoding, setIsDecoding] = useState(false);
  const [decodeProgress, setDecodeProgress] = useState(0);

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
  }, [project.name, playSound]); 

  const handleViewVisuals = () => {
    setViewMode('visuals'); 
    setIsDecoding(true);
    setDecodeProgress(0);
    playSound(150, 'sawtooth', 0.8);

    let p = 0;
    const decInterval = setInterval(() => {
      p += Math.random() * 12;
      if (p >= 100) {
        p = 100;
        clearInterval(decInterval);
        setTimeout(() => {
          setIsDecoding(false);
          playSound(1000, 'sine', 0.4);
        }, 500);
      }
      setDecodeProgress(p);
    }, 80);
  };

  if (stage !== 'complete') {
    return (
      <div className="text-sm text-white/70 space-y-2 relative z-20 font-mono p-6">
        {logs.map((log, index) => (
          <div key={index}>{'>'} {log}</div>
        ))}
        <div className="animate-pulse text-pink-500">{'>'} <span className="bg-pink-500 w-2 h-4 inline-block align-middle"></span></div>
      </div>
    );
  }

  if (viewMode === 'visuals') {
    return (
      <div className="w-full h-full flex flex-col font-mono bg-[#020202] text-white overflow-hidden relative">
        {isDecoding ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 gap-6 z-50 bg-black">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
            <Crosshair size={80} className="text-red-500 animate-[spin_3s_linear_infinite]" />
            <div className="text-2xl md:text-5xl text-red-500 tracking-[0.5em] font-bold animate-pulse text-center">OVERRIDING_CCTV_GRID...</div>
            <div className="w-full max-w-2xl h-2 bg-white/10 relative overflow-hidden mt-8">
               <div className="absolute top-0 left-0 h-full bg-red-500 shadow-[0_0_30px_#ef4444]" style={{ width: `${decodeProgress}%` }}></div>
            </div>
            <div className="text-white/50 tracking-widest text-sm md:text-base">[{Math.floor(decodeProgress)}%] BYPASSING_SECURITY_PROTOCOLS</div>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex w-full h-full flex-col md:flex-row relative z-10">
            <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-white/20 bg-[#05050a] flex flex-col z-20 shrink-0">
               <div className="p-4 md:p-6 border-b border-white/20 flex justify-between items-center bg-white/5">
                  <span className="text-cyan-400 font-bold tracking-[0.2em] text-xs md:text-sm flex items-center gap-3">
                    <Camera size={18}/> CCTV_NODES
                  </span>
                  <span className="text-white/30 text-[10px] tracking-widest animate-pulse border border-white/20 px-2 py-1">LIVE</span>
               </div>
               
               <div className="flex-1 overflow-y-auto cyber-scroll p-4 space-y-4 flex flex-row md:flex-col gap-4 md:gap-0 overflow-x-auto md:overflow-x-hidden">
                  {project.images?.map((img, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => { setImgIndex(idx); playSound(600, 'square', 0.05); }} 
                        className={`clickable shrink-0 md:shrink border transition-all duration-300 ${imgIndex === idx ? 'border-red-500 bg-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-white/10 opacity-50 hover:opacity-100 hover:border-white/30'} p-3 relative group w-40 md:w-full`}
                      >
                         <div className="flex justify-between items-center mb-3 font-mono text-[10px] text-white/70 tracking-widest">
                             <span className={imgIndex === idx ? "text-red-500 font-bold" : ""}>CAM_0{idx + 1}</span>
                             {imgIndex === idx && <span className="animate-pulse text-red-500">● REC</span>}
                         </div>
                         <div className="relative w-full h-20 md:h-28 overflow-hidden border border-white/10">
                            <img src={img} className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500" alt={`CAM_${idx+1}`} />
                            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
                         </div>
                      </div>
                  ))}
               </div>

               <div className="p-6 border-t border-white/20 bg-black">
                  <button 
                    onClick={() => { setViewMode('data'); playSound(400, 'square', 0.1); }} 
                    className="w-full py-4 bg-red-500/10 text-red-500 border border-red-500/50 hover:bg-red-500 hover:text-white transition-all tracking-[0.2em] text-xs shadow-[0_0_15px_rgba(239,68,68,0.1)] hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] clickable"
                  >
                     [ DISCONNECT_FEED ]
                  </button>
               </div>
            </div>

            <div className="flex-1 relative bg-[#020202] flex items-center justify-center p-4 md:p-8 overflow-hidden">
               <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] z-20"></div>
               <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.9)] z-20"></div>
               
               <div className="absolute top-6 left-6 md:top-10 md:left-10 z-30 flex gap-4 items-center bg-black/60 px-4 py-2 border border-white/10 backdrop-blur-sm">
                   <span className="text-red-500 font-bold tracking-widest text-sm md:text-lg animate-pulse">● REC</span>
                   <span className="text-white/70 tracking-widest text-xs md:text-sm">CAM_0{imgIndex + 1} // {project.name}</span>
               </div>
               
               <div className="absolute top-6 right-6 md:top-10 md:right-10 z-30 font-mono text-white/50 tracking-widest text-xs md:text-sm bg-black/60 px-4 py-2 border border-white/10 backdrop-blur-sm">
                   <CyberClock />
               </div>

               <div className="absolute top-8 left-8 w-16 h-16 border-t-4 border-l-4 border-white/20 z-10 hidden md:block"></div>
               <div className="absolute top-8 right-8 w-16 h-16 border-t-4 border-r-4 border-white/20 z-10 hidden md:block"></div>
               <div className="absolute bottom-8 left-8 w-16 h-16 border-b-4 border-l-4 border-white/20 z-10 hidden md:block"></div>
               <div className="absolute bottom-8 right-8 w-16 h-16 border-b-4 border-r-4 border-white/20 z-10 hidden md:block"></div>

               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-48 h-48 border border-white/10 rounded-full flex items-center justify-center pointer-events-none opacity-50">
                   <div className="w-full h-[1px] bg-white/20"></div>
                   <div className="absolute h-full w-[1px] bg-white/20"></div>
                   <div className="absolute w-2 h-2 border border-red-500"></div>
               </div>

               {project.images && project.images.length > 0 ? (
                  <motion.img 
                    key={imgIndex} 
                    initial={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
                    animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                    transition={{ duration: 0.4 }}
                    src={project.images[imgIndex]} 
                    className="max-w-full max-h-full object-contain z-10 filter contrast-125 saturate-50 drop-shadow-[0_0_30px_rgba(255,255,255,0.05)]" 
                    alt="Main Feed"
                  />
               ) : (
                  <div className="text-white/30 text-lg tracking-[0.2em] animate-pulse z-10">NO_VISUAL_DATA_FOUND</div>
               )}
            </div>
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-20 h-full flex flex-col font-mono w-full p-6 md:p-8">
      <div className="flex items-start gap-4 md:gap-6 border-b border-white/10 pb-4 mb-4 md:mb-6 shrink-0">
        <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.2)]">
          <Folder size={24} className="md:w-8 md:h-8" />
        </div>
        <div className="flex-1">
          <h2 className="text-xl md:text-3xl font-bold text-white tracking-widest truncate">{project.name}</h2>
          <div className="text-[10px] md:text-xs text-white/40 mt-1 md:mt-2 flex gap-4">
            <span>{t('status')} <span className="text-cyan-400">{project.status}</span></span>
          </div>
        </div>
      </div>

      <div className="flex-1 relative w-full min-h-[300px]">
         <div className="absolute inset-0 flex flex-col space-y-6 overflow-y-auto pr-2 cyber-scroll">
            <div>
              <p className="text-pink-500 text-xs mb-2">{'//'} {t('exported')}</p>
              <p className="text-white/80 leading-relaxed text-sm md:text-base"><Typewriter text={project.description} speed={15} /></p>
            </div>
            <div>
              <p className="text-pink-500 text-xs mb-3">{'//'} {t('modules')}</p>
              <div className="flex gap-2 flex-wrap">
                {project.tech.map((tech, i) => (
                  <motion.span key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + (i * 0.1) }} className="px-3 py-1 bg-white/5 border border-white/20 text-xs text-white/70 shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]">
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
         </div>
      </div>

      <div className="mt-4 md:mt-6 pt-4 border-t border-white/10 flex flex-wrap justify-end gap-3 shrink-0">
         {project.images && project.images.length > 0 && (
            <button 
              onClick={handleViewVisuals}
              className="px-4 py-2 bg-cyan-400/10 text-cyan-400 border border-cyan-400 hover:bg-cyan-400 hover:text-black transition-all clickable shadow-[0_0_15px_rgba(34,211,238,0.2)] text-xs md:text-sm font-bold tracking-widest"
            >
              [ {t('view_visuals')} ]
            </button>
         )}
         {project.url !== '#' && (
            <a 
              href={project.url} target="_blank" rel="noreferrer" 
              className="px-4 py-2 bg-pink-500/10 text-pink-500 border border-pink-500 hover:bg-pink-500 hover:text-white transition-all clickable shadow-[0_0_15px_rgba(236,72,153,0.2)] text-xs md:text-sm font-bold tracking-widest"
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768); 
    checkMobile(); 
    window.addEventListener('resize', checkMobile); 
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [langIndex, setLangIndex] = useState(0);
  const lang = LANGS[langIndex];
  const t = useCallback((key) => DICT[lang][key] || key, [lang]);

  const [systemState, setSystemState] = useState('idle');
  const [bootProgress, setBootProgress] = useState(0);
  const [activeTab, setActiveTab] = useState(null); 
  
  const [selectedProject, setSelectedProject] = useState(null); 
  const [projectViewMode, setProjectViewMode] = useState('data'); 
  
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [preLoadProgress, setPreLoadProgress] = useState(0);
  
  const [volume, setVolume] = useState(0.1); 
  const [isMuted, setIsMuted] = useState(false);
  const [isVolumeExpanded, setIsVolumeExpanded] = useState(false);
  
  const [ipClicks, setIpClicks] = useState(0);
  const [isRedAlert, setIsRedAlert] = useState(false);
  const videoRef = useRef(null);
  const audioCtxRef = useRef(null);

  useEffect(() => {
    if (videoLoaded || isMobile) return; 
    const interval = setInterval(() => {
      setPreLoadProgress(prev => {
        if (prev >= 99) return 99;
        return Math.min(prev + Math.random() * 8, 99);
      });
    }, 250);
    return () => clearInterval(interval);
  }, [videoLoaded, isMobile]);

  const playSound = useCallback((freq = 440, type = 'sine', duration = 0.1) => {
    if (volume === 0 || systemState !== 'ready') return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const audioCtx = audioCtxRef.current;
      if (audioCtx.state === 'suspended') audioCtx.resume();

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
    } catch (e) {
      console.error("Audio block error:", e);
    }
  }, [volume, systemState]);

  const handleVideoCanPlay = () => {
    setPreLoadProgress(100);
    setTimeout(() => {
      setVideoLoaded(true);
      if (systemState === 'idle') playSound(600, 'square', 0.1); 
    }, 500); 
  };

  const handleStart = () => {
    if (systemState !== 'idle') return;
    setSystemState('booting');
    playSound(400, 'square', 0.2);
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

  const tabs = useMemo(() => {
    const baseTabs = [
      { id: 'about', label: t('tab_about'), code: '0x00A1', icon: Fingerprint, color: 'text-cyan-400', bgColor: 'bg-cyan-400', border: 'border-cyan-400', img: imgShy, type: 'text', title: t('about_title'), content: t('about_desc') },
      { id: 'projects', label: t('tab_projects'), code: '0x00B2', icon: ShieldAlert, color: 'text-pink-500', bgColor: 'bg-pink-500', border: 'border-pink-500', img: imgScared, type: 'projects', title: t('proj_title'),
        items: [
          { name: 'KAWAII_MANGA', status: 'STABLE', url: 'https://github.com/soka8imokenp/kawaii_manga', description: t('p1_desc'), tech: ['Python', 'Django', 'PostgreSQL'], images: [manga1, manga2, manga3, manga4, manga5, manga6] },
          { name: 'BMI_ANALYZER', status: 'ONLINE', url: 'https://github.com/soka8imokenp/BMI_app', description: t('p2_desc'), tech: ['Python', 'Tailwaind', 'Logic'], images: [bmi1, bmi2, bmi3, bmi4, bmi5,bmi6, bmi7, bmi8, bmi9] },
          { name: 'ENF_CORE', status: 'STABLE', url: 'https://github.com/soka8imokenp/enf', description: t('p3_desc'), tech: ['Python', 'Network', 'Infrastructure'], images: [imgScared] },
          { name: 'TG_FEEDBACK_BOT', status: 'ONLINE', url: 'https://github.com/soka8imokenp/tg-feedback-bot', description: t('p4_desc'), tech: ['Aiogram', 'HTMX', 'Django'], images: [feed1, feed2, feed3, feed4, feed5, feed6, feed7, feed8, feed9] }
        ]
      },
      { id: 'skills', label: t('tab_skills'), code: '0x00C3', icon: Cpu, color: 'text-lime-400', bgColor: 'bg-lime-400', border: 'border-lime-400', img: imgCool, type: 'skills', title: t('skill_title'),
        categories: [
          { name: 'BACKEND_CORE', hex: '0xBA11', items: ['Python', 'Django', 'FastAPI', 'Aiogram'] },
          { name: 'DATA_&_INFRA', hex: '0xDA22', items: ['PostgreSQL', 'Redis', 'SQL', 'Docker', 'Git'] },
          { name: 'FRONTEND_ENV', hex: '0xFE33', items: ['HTMX', 'JavaScript', 'Tailwind CSS', 'HTML5'] },
          { name: 'CREATIVE_ENG', hex: '0xCE44', items: ['Figma', 'Photoshop', 'Aseprite', 'Godot','Blender','Clip Studio Paint', ] }
        ]
      },
      { id: 'network', label: 'UPLINK_NODE', code: '0x00D4', icon: Globe, color: 'text-yellow-400', bgColor: 'bg-yellow-500', border: 'border-yellow-400', img: tempImg2, type: 'network', title: t('net_title'), content: t('net_desc'),
        links: [
          { name: 'TELEGRAM', url: 'https://t.me/soka8imokenp', icon: Send, color: 'text-[#0088cc]' },
          { name: 'GITHUB', url: 'https://github.com/soka8imokenp', icon: Code, color: 'text-white' },
          { name: 'LINKEDIN', url: 'https://www.linkedin.com/in/soka8imokenp/', icon: Briefcase, color: 'text-[#0077b5]' },
          { name: 'GMAIL', url: 'mailto:devvekaizen@gmail.com', icon: Mail, color: 'text-[#ea4335]' }
        ]
      }
    ];

    if (isRedAlert) return [...baseTabs, { id: 'classified', label: t('tab_class'), code: '0xDEAD', icon: Skull, color: 'text-red-500', bgColor: 'bg-red-600', border: 'border-red-500', img: tempImg2, type: 'text', title: t('class_title'), content: t('class_desc') }];
    return baseTabs;
  }, [lang, isRedAlert, t]);

  const activeTabData = useMemo(() => tabs.find(t => t.id === activeTab), [tabs, activeTab]);

  if (isMobile) {
    return (
      <div className="h-screen w-full bg-[#05050a] flex flex-col items-center justify-center p-6 font-mono overflow-hidden relative selection:bg-red-500/30 text-center">
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] z-20"></div>
        <div className="absolute inset-0 z-10 pointer-events-none bg-red-500/5 mix-blend-overlay"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-red-500/30 animate-[scan_3s_linear_infinite] z-20 shadow-[0_0_10px_red]"></div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative z-30 border border-red-500/50 bg-black/80 p-8 w-full max-w-sm shadow-[0_0_50px_rgba(239,68,68,0.2)]">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-500"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-500"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-500"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-500"></div>

          <ShieldAlert size={64} className="mx-auto text-red-500 mb-6 animate-pulse drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
          <h1 className="text-xl md:text-2xl font-bold text-red-500 tracking-widest mb-2 font-bebas uppercase">{t('mobile_warn_title')}</h1>
          <div className="w-full h-[1px] bg-red-500/30 mb-6 relative"><div className="absolute left-1/2 -translate-x-1/2 -top-[3px] w-8 h-[7px] bg-red-500/50"></div></div>

          <p className="text-white/70 text-xs leading-relaxed mb-8"><Typewriter text={t('mobile_warn_desc')} speed={20} /></p>

          <div className="flex justify-center items-center gap-6 text-white/30">
             <Smartphone size={32} className="text-red-500 opacity-50 relative line-through" />
             <span className="text-red-500 animate-pulse text-xl">→</span>
             <Monitor size={48} className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
          </div>

          <div className="mt-8 text-[10px] text-red-500/50 tracking-widest uppercase">ERR_CODE: 0xDEVICE_UNSUPPORTED</div>
          
          <div className="absolute -top-16 right-0">
             <div onClick={() => setLangIndex((prev) => (prev + 1) % LANGS.length)} className="flex items-center gap-2 text-white/50 border border-white/20 px-3 py-1 text-xs uppercase">
                <Globe size={12} /> {lang}
             </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <VanillaCyberCursor />
      <style dangerouslySetInnerHTML={{__html: `
        .cyber-scroll::-webkit-scrollbar { width: 4px; height: 4px; }
        .cyber-scroll::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.2); }
        .cyber-scroll::-webkit-scrollbar-thumb { background: rgba(34, 211, 238, 0.4); border-radius: 2px; }
        .cyber-scroll:hover::-webkit-scrollbar-thumb { background: rgba(34, 211, 238, 0.8); }
        .cyber-scroll-red::-webkit-scrollbar { width: 4px; height: 4px; }
        .cyber-scroll-red::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.2); }
        .cyber-scroll-red::-webkit-scrollbar-thumb { background: rgba(239, 68, 68, 0.4); border-radius: 2px; }
        .cyber-scroll-red:hover::-webkit-scrollbar-thumb { background: rgba(239, 68, 68, 0.8); }
      `}} />

      <div className="h-screen w-full bg-[#020202] flex items-center justify-center p-2 md:p-6 select-none overflow-hidden relative font-mono">
        <div className="relative w-full h-full crt-lens scanlines bg-[#05050a] overflow-hidden shadow-[0_0_50px_rgba(0,255,255,0.05)] border-2 border-white/5">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] z-0 pointer-events-none"></div>
          <div className="noise-overlay"></div>
          <div className={`absolute inset-0 z-10 pointer-events-none mix-blend-overlay transition-colors duration-1000 ${isRedAlert ? 'bg-red-500/30' : 'bg-transparent'}`}></div>

          <video ref={videoRef} loop playsInline muted={isMuted} onCanPlayThrough={handleVideoCanPlay} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] z-0 ${systemState === 'ready' ? 'opacity-[0.25]' : 'opacity-0'}`}>
            <source src="/background.mp4" type="video/mp4" />
          </video>

          <AnimatePresence mode="wait">
            {systemState !== 'ready' && (
              <motion.div key="boot-screen" initial={{ opacity: 1 }} exit={{ opacity: 0, filter: "brightness(3)", scale: 1.05 }} transition={{ duration: 0.6 }} className="absolute inset-0 z-50 flex flex-col items-center justify-center p-10 md:p-24 bg-black font-mono">
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
                      <span className="text-white/40 tracking-[0.2em] text-xs mt-1"><CyberClock /></span>
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

                  <div className="w-full mt-10 pt-6 border-t border-white/20 flex justify-center items-center h-24">
                    {systemState === 'idle' ? (
                      videoLoaded ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: [1, 0.7, 1], scale: 1 }} transition={{ opacity: { repeat: Infinity, duration: 2 }, scale: { duration: 0.3 } }}
                          className="text-white hover:text-black hover:bg-white transition-all flex items-center gap-4 text-3xl md:text-4xl font-bold bg-white/5 px-10 py-4 border border-white clickable"
                          onClick={handleStart}
                        >
                          <Terminal size={36} /> [ {t('override')} ]
                        </motion.div>
                      ) : (
                        <div className="flex flex-col items-center w-full max-w-md gap-3">
                          <div className="flex justify-between w-full text-white/50 font-mono text-xs tracking-widest uppercase">
                            <span className="animate-pulse">BUFFERING_VIDEO_FEED...</span>
                            <span className="text-cyan-400">{Math.floor(preLoadProgress)}%</span>
                          </div>
                          <div className="w-full h-2 bg-white/5 border border-white/10 relative overflow-hidden">
                            <motion.div className="absolute top-0 left-0 h-full bg-cyan-400 shadow-[0_0_15px_#22d3ee]" animate={{ width: `${preLoadProgress}%` }} transition={{ ease: "linear", duration: 0.2 }} />
                          </div>
                        </div>
                      )
                    ) : (
                      <div className="text-xl md:text-2xl font-bold text-white flex flex-col gap-4 bg-white/5 p-4 border border-white/20 w-full max-w-md">
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
                  <div className="flex gap-8 items-center clickable hover:text-white transition-colors font-mono" onClick={handleIpClick}>
                    <span className={isRedAlert ? 'text-red-500 font-bold animate-pulse font-mono' : 'font-mono'}>192.168.0.27_ROOT</span>
                  </div>
                </div>

                <div className="absolute top-24 left-[5%] z-50 flex flex-row items-center gap-4">
                  <div onClick={() => { setLangIndex((prev) => (prev + 1) % LANGS.length); playSound(1000, 'square', 0.05); }} className={`clickable flex items-center justify-center gap-2 h-14 px-4 bg-black/90 border transition-all z-20 ${isRedAlert ? 'border-red-500/50 hover:border-red-500 hover:bg-red-500/10 text-red-500' : 'border-white/20 hover:border-white/50 hover:bg-white/10 text-white/70 hover:text-white'} backdrop-blur-md font-mono text-[10px] md:text-xs tracking-widest uppercase shadow-[0_0_10px_rgba(0,0,0,0.5)]`}>
                    <Globe size={16} className={isRedAlert ? "text-red-500" : "text-cyan-400"} /> [ {lang} ]
                  </div>

                  <div className="flex flex-row items-center relative">
                    <div onClick={() => setIsVolumeExpanded(!isVolumeExpanded)} className={`clickable flex items-center justify-center w-14 h-14 bg-black/90 border backdrop-blur-md transition-all z-20 ${isVolumeExpanded ? 'border-white text-white shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'border-white/60 text-white shadow-[0_0_10px_rgba(255,255,255,0.1)] hover:bg-white/10 hover:border-white'}`}>
                      {isMuted || volume === 0 ? <VolumeX size={24} strokeWidth={2.5} className={isRedAlert ? 'text-red-500' : 'text-white opacity-60'} /> : <Volume2 size={24} strokeWidth={2.5} className={isRedAlert ? 'text-red-500' : 'text-white'} />}
                    </div>
                    <AnimatePresence>
                      {isVolumeExpanded && (
                        <motion.div initial={{ opacity: 0, width: 0, x: -20 }} animate={{ opacity: 1, width: 'auto', x: 0 }} exit={{ opacity: 0, width: 0, x: -20 }} className="overflow-hidden flex z-10">
                          <div className="flex h-14 bg-black/80 border-y border-r border-white/20 backdrop-blur-md items-center px-4 pl-6 gap-6 w-max whitespace-nowrap">
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
                  <MediaSyncBar videoRef={videoRef} isRedAlert={isRedAlert} t={t} />
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
                          
                          <div className="relative z-10 flex-1 flex flex-col h-full min-h-0 overflow-hidden">
                            <div className="text-[10px] md:text-xs text-white/40 mb-4 tracking-[0.2em] flex justify-between uppercase border-b border-white/10 pb-4 shrink-0">
                              <span>{t('status_decrypted')} // {activeTabData.code}</span>
                              <span className={activeTabData.id === 'classified' ? 'text-red-500 animate-pulse' : 'text-cyan-400'}>{t('access_granted')}</span>
                            </div>
                            
                            <div className="text-base md:text-lg text-white leading-relaxed font-bold flex-1 flex flex-col min-h-0">
                              <div className="mb-6 text-white/50 text-sm shrink-0"><Typewriter text={activeTabData.title} speed={30} /></div>
                              {activeTabData.type === 'text' && <div className="flex-1 overflow-y-auto cyber-scroll pr-4"><p className="text-white text-lg leading-loose"><Typewriter text={activeTabData.content} speed={15} /></p></div>}
                              
                              {activeTabData.type === 'skills' && (
                                <div className={`mt-2 flex flex-col gap-6 flex-1 overflow-y-auto pr-4 ${isRedAlert ? 'cyber-scroll-red' : 'cyber-scroll'}`}>
                                  {activeTabData.categories.map((cat, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.2 + (i * 0.1) }} className="flex flex-col gap-3 shrink-0">
                                      <div className="flex items-center gap-2 border-b border-white/10 pb-1">
                                        <span className={`text-[10px] font-mono ${isRedAlert ? 'text-red-500' : 'text-lime-400'}`}>[{cat.hex}]</span>
                                        <span className="text-sm font-bold text-white tracking-widest">{cat.name}</span>
                                      </div>
                                      <div className="grid grid-cols-2 gap-2">
                                        {cat.items.map((item, j) => (
                                          <div key={j} className={`flex items-center justify-between border border-white/10 bg-black/40 p-2 hover:border-white/30 transition-colors group ${isRedAlert ? 'hover:bg-red-500/10' : 'hover:bg-lime-400/10'}`} onMouseEnter={() => playSound(800, 'sine', 0.02)}>
                                            <span className="text-xs text-white/70 group-hover:text-white font-mono transition-colors truncate pr-2">{item}</span>
                                            <div className="flex items-center gap-2 shrink-0">
                                              <span className={`w-1.5 h-1.5 rounded-full ${isRedAlert ? 'bg-red-500 animate-pulse shadow-[0_0_5px_#ef4444]' : 'bg-lime-400 animate-[pulse_2s_ease-in-out_infinite] shadow-[0_0_5px_#a3e635]'}`}></span>
                                              <span className="text-[9px] text-white/30 hidden md:inline-block tracking-widest font-mono group-hover:text-white/50 transition-colors">SYNC</span>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </motion.div>
                                  ))}
                                </div>
                              )}

                              {activeTabData.type === 'projects' && (
                                <div className={`mt-2 flex flex-col gap-4 flex-1 overflow-y-auto pr-4 ${isRedAlert ? 'cyber-scroll-red' : 'cyber-scroll'}`}>
                                  {activeTabData.items.map((proj, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.2 + (i * 0.1) }} className="group flex items-center justify-between p-4 border border-white/10 bg-black/40 hover:border-pink-500 hover:bg-pink-500/20 cursor-pointer transition-all clickable shrink-0 backdrop-blur-sm" onClick={() => { playSound(1000, 'square', 0.05); setProjectViewMode('data'); setSelectedProject(proj); }}>
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

                              {activeTabData.type === 'network' && (
                                <div className="mt-2 flex flex-col gap-4 flex-1 overflow-y-auto pr-4 cyber-scroll">
                                  <div className="shrink-0 mb-4">
                                     <p className="text-sm text-white/70 leading-relaxed"><Typewriter text={activeTabData.content} speed={15} /></p>
                                  </div>
                                  <div className="grid grid-cols-1 gap-4 pb-4">
                                    {activeTabData.links.map((socialItem, i) => {
                                      const IconComponent = socialItem.icon;
                                      return (
                                        <motion.a key={i} href={socialItem.url} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 + (i * 0.1) }} onClick={() => playSound(1000, 'square', 0.1)} onMouseEnter={() => playSound(600, 'sine', 0.02)} className="group relative flex items-center justify-between p-5 border border-white/10 bg-black/40 hover:bg-white/5 transition-all clickable shrink-0 backdrop-blur-sm overflow-hidden">
                                          <div className="absolute inset-0 w-0 bg-yellow-400/10 group-hover:w-full transition-all duration-300 ease-out z-0"></div>
                                          <div className="relative z-10 flex items-center gap-6">
                                            <div className={`p-2 border border-white/20 bg-black group-hover:border-yellow-400 transition-colors flex items-center justify-center`}>
                                               <IconComponent size={24} className={`${socialItem.color} group-hover:text-yellow-400 transition-colors drop-shadow-[0_0_10px_currentColor]`} />
                                            </div>
                                            <span className="text-white/90 group-hover:text-white font-mono text-xl tracking-widest uppercase transition-colors">{socialItem.name}</span>
                                          </div>
                                          <div className="relative z-10 flex items-center gap-4">
                                            <span className="text-xs font-mono text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse">CONNECT_</span>
                                            <ChevronRight size={16} className="text-white/20 group-hover:text-yellow-400 transition-transform group-hover:translate-x-1" />
                                          </div>
                                        </motion.a>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <AnimatePresence>
                  {selectedProject && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-sm pointer-events-auto" onClick={() => { setSelectedProject(null); setProjectViewMode('data'); }}>
                      <motion.div 
                        onClick={(e) => e.stopPropagation()} 
                        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1, width: projectViewMode === 'visuals' ? '95vw' : '100%', height: projectViewMode === 'visuals' ? '90vh' : 'auto', maxWidth: projectViewMode === 'visuals' ? '1600px' : '42rem' }} exit={{ scale: 0.95, opacity: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="relative bg-black border border-white/20 shadow-[0_0_50px_rgba(236,72,153,0.15)] font-mono flex flex-col overflow-hidden"
                      >
                        {projectViewMode === 'data' && (
                          <div className="flex justify-between items-center bg-white/5 border-b border-white/10 px-4 py-3 relative z-20">
                            <div className="flex items-center gap-3"><Terminal size={16} className="text-pink-500" /><span className="text-xs text-white/50 tracking-widest">{t('secure')} // {selectedProject.name}</span></div>
                            <button onClick={() => { setSelectedProject(null); setProjectViewMode('data'); }} className="text-white/40 hover:text-red-500 transition-colors clickable text-xs tracking-widest">[ {t('disconnect')} ]</button>
                          </div>
                        )}
                        <div className={`relative flex flex-col ${projectViewMode === 'data' ? 'flex-1 min-h-[400px]' : 'w-full h-full flex-1'}`}>
                          {projectViewMode === 'data' && <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none z-10 opacity-30"></div>}
                          <TerminalSimulation project={selectedProject} playSound={playSound} t={t} viewMode={projectViewMode} setViewMode={setProjectViewMode} />
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