import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Check, Clock, ShieldCheck, Heart, AlertCircle, ChevronDown, 
  ArrowRight, Lock, Calendar, Star, HelpCircle, Flame, Droplets, Info, RefreshCw, Smartphone
} from 'lucide-react';
import { QuizAnswers, ScreenState } from './types';
import VideoPlayer from './components/VideoPlayer';
import DiagnosticCharts from './components/DiagnosticCharts';
import Carrossel from './components/Carrossel';
import TestimonialVideo from './components/TestimonialVideo';

export default function App() {
  // Screen States
  const [screen, setScreen] = useState<ScreenState>('landing');
  
  // Answers State
  const [answers, setAnswers] = useState<QuizAnswers>({
    name: '',
    age: '',
    mainPreoccupation: '',
    bellyType: '',
    situation: '',
    timeSuffering: '',
    triedSolutions: [],
    feelLookingSide: '',
    restrictedActions: [],
    hydration: '',
    sleep: '',
    diet: '',
    activityLevel: '',
    commitment: ''
  });

  // Landing Countdown Timer (60s)
  const [landingTimer, setLandingTimer] = useState(60);
  const [isLandingTimerActive, setIsLandingTimerActive] = useState(true);

  // Sales Countdown Timer (3m / 180s)
  const [salesTimer, setSalesTimer] = useState(0);
  const [showDelayedSalesContent, setShowDelayedSalesContent] = useState(true);
  
  // Simulated Checkout and Recipe Delivery States
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutEmail, setCheckoutEmail] = useState('');
  const [checkoutPhone, setCheckoutPhone] = useState('');
  const [checkoutStep, setCheckoutStep] = useState<'info' | 'pix' | 'success'>('info');

  // Custom delay screen states for text-espelhos
  const [isDelaying, setIsDelaying] = useState(false);
  const [delayMessage, setDelayMessage] = useState('');
  const [delayPercent, setDelayPercent] = useState(0);
  const [nextDelayScreen, setNextDelayScreen] = useState<ScreenState>('landing');

  // Multi-choices temp states
  const [tempSolutions, setTempSolutions] = useState<string[]>([]);
  const [tempActions, setTempActions] = useState<string[]>([]);

  // FAQ Open details
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({});

  // Error validation
  const [nameError, setNameError] = useState('');

  // 60-second landing page countdown hook
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isLandingTimerActive && landingTimer > 0 && screen === 'landing') {
      timer = setInterval(() => {
        setLandingTimer((prev) => prev - 1);
      }, 1000);
    } else if (landingTimer === 0) {
      setIsLandingTimerActive(false);
    }
    return () => clearInterval(timer);
  }, [landingTimer, isLandingTimerActive, screen]);

  // 180-second sales page content delay countdown hook
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (screen === 'sales_page' && salesTimer > 0) {
      timer = setInterval(() => {
        setSalesTimer((prev) => {
          if (prev <= 1) {
            setShowDelayedSalesContent(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [screen, salesTimer]);

  // Reset scroll to top on screen change for excellent user experience
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [screen]);

  // Handle transition and programmatic loading delay for text-espehlos
  const triggerTransitionDelay = (message: string, durationSeconds: number, next: ScreenState) => {
    setIsDelaying(true);
    setDelayMessage(message);
    setDelayPercent(0);
    setNextDelayScreen(next);

    const steps = 100;
    const intervalTime = (durationSeconds * 1000) / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep += 1;
      setDelayPercent(currentStep);
      if (currentStep >= steps) {
        clearInterval(timer);
        setIsDelaying(false);
        setScreen(next);
      }
    }, intervalTime);
  };

  // Helper calculation for progressive progress bar (Always ahead of real)
  const getProgressValue = (current: ScreenState) => {
    switch (current) {
      case 'p1_age': return 15;
      case 'p2_concern': return 28;
      case 'p3_belly_type': return 40;
      case 'p4_situation': return 55;
      case 'ramo_a_1': return 62;
      case 'ramo_a_2': return 68;
      case 'ramo_b_1': return 62;
      case 'ramo_b_2': return 68;
      case 'ramo_c_1': return 65;
      case 'testimonials_carousel': return 75;
      case 'p5_time_suffering': return 80;
      case 'p6_tried_solutions': return 84;
      case 'p7_mirror_feeling': return 88;
      case 'p8_restricted_actions': return 91;
      case 'p9_hydration': return 93;
      case 'p9_sleep': return 95;
      case 'p9_diet': return 97;
      case 'p9_activity': return 98;
      case 'p10_commitment': return 99;
      case 'p11_name': return 99.5;
      default: return 0;
    }
  };

  // Toggle FAQ blocks
  const toggleFaq = (index: number) => {
    setFaqOpen(prev => ({ ...prev, [index]: !prev[index] }));
  };

  // Skip delay helper function for testing environment
  const handleSkipSalesDelay = () => {
    setSalesTimer(0);
    setShowDelayedSalesContent(true);
  };

  // Render header
  const renderHeader = () => {
    const showProgress = screen !== 'landing' && screen !== 'analyzing' && screen !== 'diagnosis' && screen !== 'sales_page';
    return (
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 px-5 py-4 border-b border-pink-100 flex flex-col items-center">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse"></span>
          <span className="font-sans text-base font-extrabold text-slate-900 tracking-wide uppercase">
            Truque da <span className="text-pink-600">Gelatina</span>
          </span>
          <Heart className="w-4 h-4 text-pink-550 fill-pink-100" />
        </div>
        
        {showProgress && (
          <div className="w-full max-w-sm mt-3.5 flex flex-col items-center gap-2">
            <div className="w-full bg-pink-100 h-5 rounded-full overflow-hidden border border-pink-200 p-[3px]">
              <div 
                className="bg-gradient-to-r from-pink-500 to-rose-600 h-full rounded-full transition-all duration-500 shadow-inner"
                style={{ width: `${getProgressValue(screen)}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-center w-full text-xs font-black text-rose-500 tracking-wider uppercase">
              <span>Análise em andamento</span>
            </div>
          </div>
        )}
      </header>
    );
  };

  // Dynamic label for the chosen problem to render nicely in UI
  const getProblemLabel = () => {
    if (answers.mainPreoccupation?.includes('Pele flácida')) return 'pele flácida e caída';
    if (answers.mainPreoccupation?.includes('Celulite')) return 'celulite profunda';
    if (answers.mainPreoccupation?.includes('Gordura')) return 'gordura abdominal persistente';
    if (answers.mainPreoccupation?.includes('Estrias')) return 'estrias aparentes';
    return 'flacidez abdominal';
  };

  // Determine the dynamic cause based on branch
  const getBellyCause = () => {
    if (answers.situation.includes('filho')) return 'estiramento excessivo das fibras musculares e de colágeno durante a gestação';
    if (answers.situation.includes('Emagreci')) return `perda rápida de peso que deixou a matriz celular da pele sem elasticidade residual`;
    if (answers.situation.includes('idade')) return 'queda acentuada de 1% ao ano na síntese natural de estrógeno e colágeno';
    return 'enfraquecimento precoce da derme profunda por falta de agentes bioestimuladores de sustentação';
  };

  return (
    <div className="min-h-screen bg-[#FFF5F7] font-sans text-slate-800 flex flex-col antialiased">
      
      {renderHeader()}

      {/* Main Container Wrapper */}
      <main className="flex-1 w-full sm:max-w-md mx-auto sm:px-4 sm:py-6 flex flex-col justify-start">
        
        {/* Main Card container - full screen on mobile, elegant card design on desktop */}
        <div className="flex-1 w-full bg-white rounded-none sm:rounded-3xl sm:border sm:border-pink-100 sm:shadow-lg overflow-hidden relative p-4 sm:p-8 flex flex-col min-h-[550px]">
        
        {/* Universal Loading Text-Espelho View */}
        {isDelaying ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center text-center space-y-6 py-12"
          >
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="48" cy="48" r="40" className="stroke-rose-100" strokeWidth="6" fill="transparent" />
                <circle 
                  cx="48" 
                  cy="48" 
                  r="40" 
                  className="stroke-rose-500 transition-all duration-300" 
                  strokeWidth="6" 
                  strokeDasharray={251} 
                  strokeDashoffset={251 - (251 * delayPercent) / 100}
                  strokeLinecap="round" 
                  fill="transparent" 
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-xs font-mono font-bold text-rose-600">
                {delayPercent}%
              </div>
            </div>

            <div className="p-6 bg-rose-50/50 rounded-3xl border border-pink-150 shadow-md space-y-4">
              <div className="flex justify-center">
                <span className="px-3 py-1 rounded-full bg-rose-500 text-white text-[11px] font-extrabold uppercase tracking-widest flex items-center gap-1.5 shadow-xs">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Processamento Especial...
                </span>
              </div>
              <p className="text-base sm:text-lg font-serif font-bold text-slate-900 leading-relaxed">
                "{delayMessage}"
              </p>
            </div>
            
            <p className="text-xs text-neutral-400 font-light animate-pulse">
              Aguarde enquanto preparamos a próxima etapa com as suas variáveis...
            </p>
          </motion.div>
        ) : (
          
          <AnimatePresence mode="wait">
            
            {/* 1. LANDING PAGE SCREEN */}
            {screen === 'landing' && (
              <motion.div 
                key="landing"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="text-center space-y-4">
                  <div className="bg-pink-50/50 p-5 rounded-3xl border border-pink-100 flex flex-col gap-3">
                    <div className="h-1 w-full bg-pink-100 rounded-full overflow-hidden">
                      <div className="h-full bg-pink-500 w-[15%]"></div>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold leading-tight text-slate-800">
                      Descubra como acabar com <span className="text-pink-600 underline decoration-pink-400">Pele Flácida em poucos dias</span> com esse tratamento natural do Truque Gelatina Lisa.
                    </h1>
                  </div>
                </div>

                {/* Simulated Video Player */}
                <div className="space-y-1">
                  <VideoPlayer videoId="landing" />
                  <p className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1 mt-1 font-medium uppercase tracking-wide">
                    <Info className="w-3.5 h-3.5 text-pink-400" /> Assista ao vídeo para desbloquear o diagnóstico exclusivo.
                  </p>
                </div>

                {/* Primary countdown call-to-action button right below the video */}
                <div className="space-y-2">
                  <button
                    disabled={landingTimer > 0}
                    onClick={() => setScreen('p1_age')}
                    className={`w-full text-white py-3.5 rounded-full font-bold text-xs shadow-lg active:scale-95 transition-transform tracking-widest uppercase flex items-center justify-center gap-2 ${
                      landingTimer > 0 
                        ? 'bg-slate-200 text-slate-400 border border-slate-300 shadow-none cursor-not-allowed' 
                        : 'bg-pink-500 hover:bg-pink-600 shadow-pink-200 cursor-pointer'
                    }`}
                    id="btn-iniciar-landing"
                  >
                    <span>
                      {landingTimer > 0 
                        ? `INICIAR DIAGNÓSTICO (${landingTimer}s)` 
                        : 'INICIAR DIAGNÓSTICO'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Bullet advantages list */}
                <ul className="bg-white rounded-3xl p-6 border-2 border-slate-100 space-y-4 text-sm sm:text-base text-slate-800 font-bold">
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-500 text-xl sm:text-2xl font-black shrink-0">✔</span>
                    <span className="leading-snug">Resolve flacidez abdominal em qualquer idade.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-500 text-xl sm:text-2xl font-black shrink-0">✔</span>
                    <span className="leading-snug">Sem precisar sair de casa ou fazer exercícios exaustivos.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-500 text-xl sm:text-2xl font-black shrink-0">✔</span>
                    <span className="leading-snug">Fácil de usar e aplicar no seu dia a dia corrido.</span>
                  </li>
                  <li className="pt-3.5 border-t border-slate-100 flex items-center gap-3 text-sm sm:text-base font-extrabold text-rose-600">
                    <Clock className="w-5 h-5 text-rose-500 shrink-0" />
                    <span>Duração do teste: 1 minuto!.</span>
                  </li>
                </ul>
              </motion.div>
            )}
                  {/* 2. P1: AGE QUESTION */}
            {screen === 'p1_age' && (
              <motion.div 
                key="p1_age"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 flex flex-col h-full"
              >
                <div className="text-center space-y-2">
                  <h2 className="text-xl sm:text-2xl font-bold font-sans text-slate-900 leading-snug">
                    Quantos anos você tem? 🤔
                  </h2>
                </div>

                <div className="space-y-3.5 flex-1 flex flex-col justify-center">
                  {[
                    { display: '👶 Menos de 30 anos', value: 'Menos de 30 anos' },
                    { display: '✨ 30 a 39 anos', value: '30-39' },
                    { display: '👩 40 a 49 anos', value: '40-49' },
                    { display: '👩‍🦱 50 a 59 anos', value: '50-59' },
                    { display: '👵 Mais de 60 anos', value: 'Mais de 60' }
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setAnswers(prev => ({ ...prev, age: opt.value }));
                        setScreen('p2_concern');
                      }}
                      className="w-full text-left p-4 sm:p-5 rounded-2xl border-2 border-b-4 border-slate-200 bg-white hover:border-pink-400 hover:border-b-pink-500 active:border-b-2 active:translate-y-[2px] shadow-sm hover:shadow-md transition-all cursor-pointer flex justify-between items-center group text-base sm:text-lg font-normal text-slate-800 hover:text-pink-900"
                      id={`p1-opt-${opt.value.replace(/\s+/g, '-').toLowerCase()}`}
                    >
                      <span className="tracking-wide">{opt.display}</span>
                      <span className="w-6 h-6 rounded-full border border-slate-200 group-hover:bg-pink-50 group-hover:border-pink-500 group-hover:text-pink-600 flex items-center justify-center text-slate-400 transition-colors">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 3. P2: DYNAMIC CONCERN MULTI-SELECT */}
            {screen === 'p2_concern' && (
              <motion.div 
                key="p2_concern"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 flex flex-col h-full"
              >
                <div className="text-center space-y-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-pink-50 text-pink-500 inline-block">
                    Múltipla Escolha
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold font-sans text-slate-900 leading-snug">
                    Qual é a sua principal preocupação quando se olha no espelho? 🤷‍♀️
                  </h2>
                </div>

                <div className="space-y-3.5 flex-1 flex flex-col justify-center">
                  {[
                    { display: '✨ Celulite (pele com buraquinhos e ondulações)', value: 'Celulite (marcas e irregularidade na pele)' },
                    { display: '😔 Pele flácida e caída (bexiga vazia / mole)', value: 'Pele flácida e caída que não firma mais' },
                    { display: '🔥 Gordura abdominal profunda e insolúvel', value: 'Gordura abdominal persistente sob a pele' },
                    { display: '⚡ Estrias visíveis e marcadas profundas', value: 'Estrias visíveis e aparentes' }
                  ].map((opt) => {
                    const isSelected = tempSolutions.includes(opt.value);
                    return (
                      <button
                        key={opt.value}
                        onClick={() => {
                          if (isSelected) {
                            setTempSolutions(prev => prev.filter(x => x !== opt.value));
                          } else {
                            setTempSolutions(prev => [...prev, opt.value]);
                          }
                        }}
                        className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 border-b-4 transition duration-200 flex gap-4 items-center cursor-pointer text-base sm:text-lg font-normal ${
                          isSelected 
                            ? 'border-pink-500 border-b-pink-600 bg-pink-50/40 text-pink-900 shadow-md translate-y-[2px]' 
                            : 'border-slate-200 border-b-slate-350 bg-white text-slate-800 hover:border-pink-300 hover:border-b-pink-400 active:border-b-2 shadow-sm'
                        }`}
                        id={`p2-opt-${opt.value.substring(0, 10).replace(/\s+/g, '-').toLowerCase()}`}
                      >
                        <div className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-pink-500 border-pink-500 text-white' : 'border-slate-350 bg-white'
                        }`}>
                          {isSelected && <Check className="w-4 h-4 stroke-[4]" />}
                        </div>
                        <span className="leading-snug">{opt.display}</span>
                      </button>
                    );
                  })}
                </div>

                <button
                  disabled={tempSolutions.length === 0}
                  onClick={() => {
                    setAnswers(prev => ({ 
                      ...prev, 
                      mainPreoccupation: tempSolutions.join(' • ') 
                    }));
                    setScreen('p3_belly_type');
                  }}
                  className={`w-full py-4 px-6 rounded-full font-bold text-xs sm:text-sm tracking-widest uppercase flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md ${
                    tempSolutions.length === 0
                      ? 'bg-slate-250 text-slate-400 border border-slate-300 shadow-none cursor-not-allowed'
                      : 'bg-pink-500 hover:bg-pink-600 text-white shadow-pink-200 cursor-pointer'
                  }`}
                  id="btn-p2-continuar"
                >
                  <span>CONTINUAR</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {/* 4. P3: BELLY TYPE SELECTION (IMAGE GRID) */}
            {screen === 'p3_belly_type' && (
              <motion.div 
                key="p3_belly_type"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 flex flex-col h-full"
              >
                <div className="text-center space-y-2">
                  <h2 className="text-xl sm:text-2xl font-bold font-sans text-slate-900 leading-snug">
                    Qual tipo de gordura abdominal é mais parecida com a sua?
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-3.5 flex-1 flex flex-col justify-center">
                  {[
                    {
                      label: "Bolsa na parte inferior",
                      url: "https://assets.prd.heyflow.com/flows/HdD9HJWAhxnD3fynDZsH/www/assets/41c3f3d0-4129-41b7-8e46-03e65430b4d8/large-icon.webp"
                    },
                    {
                      label: "Barriga Flácida e Solta",
                      url: "https://assets.prd.heyflow.com/flows/HdD9HJWAhxnD3fynDZsH/www/assets/fb19a16d-f2de-4902-bb91-4401f456cf0f/large-icon.webp"
                    },
                    {
                      label: "Gorduras no culote",
                      url: "https://assets.prd.heyflow.com/flows/HdD9HJWAhxnD3fynDZsH/www/assets/6d2fcb95-7a32-45ac-b7e7-06c124975bac/large-icon.webp"
                    },
                    {
                      label: "Gordura abdominal solta",
                      url: "https://assets.prd.heyflow.com/flows/HdD9HJWAhxnD3fynDZsH/www/assets/6dd0926a-9e2f-481a-95e7-64cc44f08ffa/original.jpeg"
                    }
                  ].map((opt) => {
                    const isSelected = answers.bellyType === opt.label;
                    return (
                      <button
                        key={opt.label}
                        onClick={() => {
                          setAnswers(prev => ({ ...prev, bellyType: opt.label }));
                          // Advance immediately to next step
                          setScreen('p4_situation');
                        }}
                        className={`text-left rounded-2xl overflow-hidden border-2 bg-white transition-all cursor-pointer flex flex-col group p-2.5 ${
                          isSelected 
                            ? 'border-pink-500 bg-pink-50 shadow-md' 
                            : 'border-slate-150 bg-white hover:border-pink-200'
                        }`}
                        id={`p3-opt-${opt.label.substring(0, 10).replace(/\s+/g, '-').toLowerCase()}`}
                      >
                        <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-50">
                          <img
                            src={opt.url}
                            alt={opt.label}
                            className="w-full h-full object-contain bg-slate-50 transition duration-300 group-hover:scale-102"
                            referrerPolicy="no-referrer"
                          />
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-md">
                              <Check className="w-3.5 h-3.5 stroke-[4]" />
                            </div>
                          )}
                        </div>
                        <div className="p-2 flex-1 flex flex-col justify-center items-center text-center">
                          <span className={`text-sm sm:text-base font-normal uppercase tracking-wide ${
                            isSelected ? 'text-pink-850' : 'text-slate-600'
                          }`}>
                            {opt.label}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* 5. P4: PRIMARY BRANCH TRIGGER */}
            {screen === 'p4_situation' && (
              <motion.div 
                key="p4_situation"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 flex flex-col h-full"
              >
                <div className="text-center space-y-2">
                  <h2 className="text-xl sm:text-2xl font-bold font-sans text-slate-900 leading-snug">
                    Qual situação mais combina com você hoje?
                  </h2>
                </div>

                <div className="space-y-3.5 flex-1 flex flex-col justify-center">
                  {[
                    {
                      text: "📉 Emagreci e sobrou excesso de pele na barriga",
                      raw: "Emagreci e a pele da barriga sobrou",
                      next: 'ramo_b_1'
                    },
                    {
                      text: "🤰 Tive gravidez e a barriga esticou e sobrou",
                      raw: "Após gestação a barriga não voltou",
                      next: 'ramo_a_1'
                    },
                    {
                      text: "👵 A idade deixou a pele mole e flácida",
                      raw: "A idade deixou a barriga mole e caída",
                      next: 'ramo_c_1'
                    },
                    {
                      text: "😩 As três alternativas acumuladas juntas",
                      raw: "As três alternativas juntas",
                      next: 'ramo_c_1'
                    }
                  ].map((opt) => (
                    <button
                      key={opt.raw}
                      onClick={() => {
                        setAnswers(prev => ({ ...prev, situation: opt.raw }));
                        setScreen(opt.next as ScreenState);
                      }}
                      className="w-full text-left p-4 sm:p-5 rounded-2xl border-2 border-b-4 border-slate-200 bg-white hover:border-pink-400 hover:border-b-pink-500 active:border-b-2 active:translate-y-[2px] shadow-sm hover:shadow-md transition-all cursor-pointer flex justify-between items-center group text-base sm:text-lg font-normal text-slate-800 hover:text-pink-900"
                      id={`p4-opt-${opt.raw.substring(0, 10).replace(/\s+/g, '-').toLowerCase()}`}
                    >
                      <span className="leading-snug pr-3">{opt.text}</span>
                      <span className="w-6 h-6 rounded-full border border-slate-200 group-hover:bg-pink-50 group-hover:border-pink-500 group-hover:text-pink-600 flex items-center justify-center text-slate-400 transition-colors shrink-0">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* RAMO A - SCREEN 1 (POST-PARTUM DEEP QUESTION) */}
            {screen === 'ramo_a_1' && (
              <motion.div 
                key="ramo_a_1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 flex flex-col h-full"
              >
                <div className="text-center space-y-2">
                  <h2 className="text-xl sm:text-2xl font-bold font-sans text-slate-900 leading-snug">
                    Há quanto tempo foi seu último parto?
                  </h2>
                </div>

                <div className="space-y-3.5 flex-1 flex flex-col justify-center">
                  {[
                    { display: '🤱 Menos de 6 meses', value: 'Menos de 6 meses' },
                    { display: '🍼 6 meses a 2 anos', value: '6 meses a 2 anos' },
                    { display: '🧸 Mais de 2 anos', value: 'Mais de 2 anos' },
                    { display: '🎒 Mais de 5 anos', value: 'Mais de 5 anos' }
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setAnswers(prev => ({ ...prev, lastBirthTime: opt.value }));
                        const textEspelho = opt.value === 'Menos de 6 meses'
                          ? "Seu corpo ainda está em fase de recuperação — essa é a melhor janela para reativar a firmeza antes que a pele 'acostume' no lugar errado."
                          : "Depois desse tempo, a pele já se acomodou estirada. Mas calma: dá pra reverter, só exige reativar o colágeno de dentro pra fora.";
                        triggerTransitionDelay(textEspelho, 4.5, 'ramo_a_2');
                      }}
                      className="w-full text-left p-4 sm:p-5 rounded-2xl border-2 border-b-4 border-slate-200 bg-white hover:border-pink-400 hover:border-b-pink-500 active:border-b-2 active:translate-y-[2px] shadow-sm hover:shadow-md transition-all cursor-pointer flex justify-between items-center group text-base sm:text-lg font-normal text-slate-800 hover:text-pink-900"
                      id={`ramo-a-1-opt-${opt.value.replace(/\s+/g, '-').toLowerCase()}`}
                    >
                      <span>{opt.display}</span>
                      <span className="w-6 h-6 rounded-full border border-slate-200 group-hover:bg-pink-50 group-hover:border-pink-500 group-hover:text-pink-600 flex items-center justify-center text-slate-400 transition-colors shrink-0">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* RAMO A - SCREEN 2 */}
            {screen === 'ramo_a_2' && (
              <motion.div 
                key="ramo_a_2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 flex flex-col h-full"
              >
                <div className="text-center space-y-2">
                  <h2 className="text-xl sm:text-2xl font-bold font-sans text-slate-900 leading-snug">
                    Como foi o seu parto?
                  </h2>
                </div>

                <div className="space-y-3.5 flex-1 flex flex-col justify-center">
                  {[
                    { display: '✂️ Cesárea (com cicatriz espessa)', value: 'Cesárea (com cicatriz espessa)' },
                    { display: '🌱 Parto Normal', value: 'Parto Normal' },
                    { display: '👩‍👧‍👦 Mais de um parto', value: 'Mais de um parto' },
                    { display: '👯 Gêmeos / gravidez múltipla', value: 'Gêmeos / barriga esticada' }
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setAnswers(prev => ({ ...prev, birthType: opt.value }));
                        setScreen('testimonials_carousel');
                      }}
                      className="w-full text-left p-4 sm:p-5 rounded-2xl border-2 border-b-4 border-slate-200 bg-white hover:border-pink-400 hover:border-b-pink-500 active:border-b-2 active:translate-y-[2px] shadow-sm hover:shadow-md transition-all cursor-pointer flex justify-between items-center group text-base sm:text-lg font-normal text-slate-800 hover:text-pink-900"
                      id={`ramo-a-2-opt-${opt.value.substring(0, 10).replace(/\s+/g, '-').toLowerCase()}`}
                    >
                      <span className="leading-snug pr-3">{opt.display}</span>
                      <span className="w-6 h-6 rounded-full border border-slate-200 group-hover:bg-pink-50 group-hover:border-pink-500 group-hover:text-pink-600 flex items-center justify-center text-slate-400 transition-colors shrink-0">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* RAMO B - SCREEN 1 (POST-DIET LOSS DEEP QUESTION) */}
            {screen === 'ramo_b_1' && (
              <motion.div 
                key="ramo_b_1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 flex flex-col h-full"
              >
                <div className="text-center space-y-2">
                  <h2 className="text-xl sm:text-2xl font-bold font-sans text-slate-900 leading-snug">
                    Quanto você emagreceu?
                  </h2>
                </div>

                <div className="space-y-3.5 flex-1 flex flex-col justify-center">
                  {[
                    { display: '📉 Até 10 kg perdidos', value: 'Até 10kg' },
                    { display: '📉 10 a 20 kg perdidos', value: '10 a 20kg' },
                    { display: '📉 Mais de 20 kg perdidos', value: 'Mais de 20kg' },
                    { display: '📉 Mais de 30 kg perdidos', value: 'Mais de 30kg' }
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setAnswers(prev => ({ ...prev, weightLost: opt.value }));
                        const textEspelho = opt.value === 'Até 10kg'
                          ? "Mesmo emagrecimentos menores deixam a pele sobrando quando o colágeno não acompanha. É reversível e relativamente rápido no seu caso."
                          : "Emagrecer tanto é uma vitória enorme — mas a pele não 'encolheu' junto porque faltou colágeno pra ela se reorganizar. É exatamente isso que dá pra corrigir.";
                        triggerTransitionDelay(textEspelho, 4.5, 'ramo_b_2');
                      }}
                      className="w-full text-left p-4 sm:p-5 rounded-2xl border-2 border-b-4 border-slate-200 bg-white hover:border-pink-400 hover:border-b-pink-500 active:border-b-2 active:translate-y-[2px] shadow-sm hover:shadow-md transition-all cursor-pointer flex justify-between items-center group text-base sm:text-lg font-normal text-slate-800 hover:text-pink-900"
                      id={`ramo-b-1-opt-${opt.value.replace(/\s+/g, '-').toLowerCase()}`}
                    >
                      <span>{opt.display}</span>
                      <span className="w-6 h-6 rounded-full border border-slate-200 group-hover:bg-pink-50 group-hover:border-pink-500 group-hover:text-pink-600 flex items-center justify-center text-slate-400 transition-colors shrink-0">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* RAMO B - SCREEN 2 */}
            {screen === 'ramo_b_2' && (
              <motion.div 
                key="ramo_b_2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 flex flex-col h-full"
              >
                <div className="text-center space-y-2">
                  <h2 className="text-xl sm:text-2xl font-bold font-sans text-slate-900 leading-snug">
                    Como você emagreceu?
                  </h2>
                </div>

                <div className="space-y-3.5 flex-1 flex flex-col justify-center">
                  {[
                    { display: '🥗 Dieta e exercícios saudáveis', value: 'Dieta e exercício físico' },
                    { display: '💉 Uso de medicamentos (Ozempic/Mounjaro)', value: 'Medicamento (Ozempic/Mounjaro)' },
                    { display: '🏥 Cirurgia bariátrica (gastroplastia)', value: 'Cirurgia bariátrica' },
                    { display: '🕰️ Aos poucos, de forma gradual com os anos', value: 'Aos poucos, com os anos' }
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setAnswers(prev => ({ ...prev, weightLossMethod: opt.value }));
                        setScreen('testimonials_carousel');
                      }}
                      className="w-full text-left p-4 sm:p-5 rounded-2xl border-2 border-b-4 border-slate-200 bg-white hover:border-pink-400 hover:border-b-pink-500 active:border-b-2 active:translate-y-[2px] shadow-sm hover:shadow-md transition-all cursor-pointer flex justify-between items-center group text-base sm:text-lg font-normal text-slate-800 hover:text-pink-900"
                      id={`ramo-b-2-opt-${opt.value.substring(0, 10).replace(/\s+/g, '-').toLowerCase()}`}
                    >
                      <span className="leading-snug pr-3">{opt.display}</span>
                      <span className="w-6 h-6 rounded-full border border-slate-200 group-hover:bg-pink-50 group-hover:border-pink-500 group-hover:text-pink-600 flex items-center justify-center text-slate-400 transition-colors shrink-0">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* RAMO C - SCREEN 1 (AGE / GENERIC BRANCH DEEP QUESTION) */}
            {screen === 'ramo_c_1' && (
              <motion.div 
                key="ramo_c_1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 flex flex-col h-full"
              >
                <div className="text-center space-y-2">
                  <h2 className="text-xl sm:text-2xl font-bold font-sans text-slate-900 leading-snug">
                    Você percebe que sua pele:
                  </h2>
                </div>

                <div className="space-y-3.5 flex-1 flex flex-col justify-center">
                  {[
                    { display: '🩹 Pele demora para voltar ao puxar (falta elasticidade)', value: 'Demora pra voltar ao puxar' },
                    { display: '🍂 Pele muito fina, seca ou enrugada (desidratada)', value: 'Está mais fina e enrugada' },
                    { display: '🥀 Perdeu o viço, brilho e firmeza total', value: 'Perdeu o viço e a firmeza' },
                    { display: '💥 Todas as alternativas acumuladas juntas!', value: 'Todas as opções juntas!' }
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setAnswers(prev => ({ ...prev, ageSkinSymptoms: opt.value }));
                        const isYounger = answers.age === 'Menos de 30 anos' || answers.age === '30-39' || answers.age === '40-49';
                        const textEspelho = isYounger
                          ? "A partir dos 30 a produção de colágeno cai cerca de 1% ao ano. Na sua idade dá pra reativar com força total."
                          : "Sua pele já perdeu boa parte do colágeno natural — mas o corpo NÃO perde a capacidade de produzir de novo quando recebe o estímulo certo.";
                        triggerTransitionDelay(textEspelho, 4.5, 'testimonials_carousel');
                      }}
                      className="w-full text-left p-4 sm:p-5 rounded-2xl border-2 border-b-4 border-slate-200 bg-white hover:border-pink-400 hover:border-b-pink-500 active:border-b-2 active:translate-y-[2px] shadow-sm hover:shadow-md transition-all cursor-pointer flex justify-between items-center group text-base sm:text-lg font-normal text-slate-800 hover:text-pink-900"
                      id={`ramo-c-1-opt-${opt.value.substring(0, 10).replace(/\s+/g, '-').toLowerCase()}`}
                    >
                      <span className="leading-snug pr-3">{opt.display}</span>
                      <span className="w-6 h-6 rounded-full border border-slate-200 group-hover:bg-pink-50 group-hover:border-pink-500 group-hover:text-pink-600 flex items-center justify-center text-slate-400 transition-colors shrink-0">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 6. TESTIMONIALS CAROUSEL INTERMEDIATE PAGE */}
            {screen === 'testimonials_carousel' && (
              <motion.div 
                key="testimonials_carousel"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-6"
              >
                <div className="bg-rose-50/70 rounded-2xl p-5 sm:p-6 border border-pink-100 text-center space-y-2">
                  <h3 className="text-xl font-serif font-black text-rose-700">
                    Você está no lugar certo!
                  </h3>
                  <p className="text-sm font-sans font-light leading-relaxed text-neutral-700">
                    Mais de <strong className="font-semibold text-rose-600">30.000 mulheres</strong> já combateram com sucesso a <strong className="font-semibold text-rose-600">{getProblemLabel()}</strong> usando o tratamento natural do Truque Gelatina Lisa.
                  </p>
                </div>

                <div className="py-2">
                  <TestimonialVideo />
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-neutral-400 font-semibold tracking-wide uppercase text-center mb-1">
                    Arraste ou aguarde ver os resultados:
                  </p>
                  <Carrossel />
                </div>

                <button
                  onClick={() => setScreen('p5_time_suffering')}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold tracking-wide flex items-center justify-center gap-2 shadow-md shadow-pink-500/20 active:scale-95 cursor-pointer glow-btn hover:opacity-95"
                  id="btn-testimonials-continuar"
                >
                  <span>CONTINUAR DIAGNÓSTICO</span>
                  <ArrowRight className="w-4.5 h-4.5" />
                </button>
              </motion.div>
            )}

            {/* 7. P5: HOW LONG SUFFERING AND DYNAMIC RESPONSE DELAY */}
            {screen === 'p5_time_suffering' && (
              <motion.div 
                key="p5_time_suffering"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center space-y-2">
                  <span className="text-xs bg-rose-50 border border-pink-100 text-rose-500 font-bold px-3 py-1 rounded-full tracking-wide uppercase">
                    Histórico Clínico
                  </span>
                  <h2 className="text-xl font-sans text-slate-800 font-extrabold leading-snug">
                    Há quanto tempo você sofre com a flacidez abdominal?
                  </h2>
                </div>

                <div className="space-y-3.5">
                  {[
                    'Menos de 6 meses',
                    'De 6 meses a 1 ano',
                    'De 1 a 3 anos',
                    'Mais de 3 anos'
                  ].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setAnswers(prev => ({ ...prev, timeSuffering: opt }));

                        // Custom dynamic response based on selections
                        const isLongTime = opt === 'De 1 a 3 anos' || opt === 'Mais de 3 anos';
                        const textEspelho = isLongTime 
                          ? `Estar com flacidez abdominal há ${opt.toLowerCase()} é muito difícil, mas com o estímulo correto de colágeno dá para recuperar sim!`
                          : `Estar com flacidez abdominal há ${opt.toLowerCase()} significa que o tecido abdominal ainda responde muito rápido ao preenchimento de colágeno!`;

                        // Trigger 6 seconds loading delay
                        triggerTransitionDelay(textEspelho, 6.0, 'p6_tried_solutions');
                      }}
                      className="w-full text-left p-4 sm:p-5 rounded-2xl border-2 border-b-4 border-slate-200 bg-white hover:border-pink-400 hover:border-b-pink-500 active:border-b-2 active:translate-y-[2px] shadow-sm hover:shadow-md transition-all cursor-pointer flex justify-between items-center group text-base sm:text-lg font-normal text-slate-800 hover:text-pink-900"
                      id={`p5-opt-${opt.replace(/\s+/g, '-').toLowerCase()}`}
                    >
                      <span>{opt}</span>
                      <span className="w-6 h-6 rounded-full border border-slate-200 group-hover:bg-pink-50 group-hover:border-pink-500 group-hover:text-pink-600 flex items-center justify-center text-slate-400 transition-colors shrink-0">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 8. P6: TRIED SOLUTIONS (MULTI SELECT) */}
            {screen === 'p6_tried_solutions' && (
              <motion.div 
                key="p6_tried_solutions"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center space-y-2">
                  <span className="text-xs bg-rose-50 border border-pink-100 text-rose-500 font-bold px-3 py-1 rounded-full tracking-wide uppercase">
                    Múltipla Escolha
                  </span>
                  <h2 className="text-xl font-sans text-slate-800 font-extrabold leading-snug">
                    Você já tentou resolver isso com alguma dessas soluções abaixo antes?
                  </h2>
                  <p className="text-sm font-medium text-slate-500">Marque todas as que você já usou ou testou na sua rotina.</p>
                </div>

                <div className="space-y-2.5">
                  {[
                    'FAZENDO DIETA',
                    'MASSAGEM MODELADORA E OUTRAS',
                    'RECEITAS NATURAIS',
                    'CREMES',
                    'TRATAMENTOS ESTÉTICOS',
                    'NUNCA TENTEI FAZER NADA.'
                  ].map((opt) => {
                    const isSelected = tempActions.includes(opt);
                    return (
                      <button
                        key={opt}
                        onClick={() => {
                          if (isSelected) {
                            setTempActions(prev => prev.filter(x => x !== opt));
                          } else {
                            // If they select "Never tried", clear other selections and vice versa
                            if (opt.includes('NUNCA')) {
                              setTempActions([opt]);
                            } else {
                              setTempActions(prev => [...prev.filter(x => !x.includes('NUNCA')), opt]);
                            }
                          }
                        }}
                        className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 border-b-4 transition duration-200 flex gap-4 items-center cursor-pointer text-base sm:text-lg font-normal ${
                          isSelected 
                            ? 'border-pink-500 border-b-pink-600 bg-pink-50/40 text-pink-900 shadow-md translate-y-[2px]' 
                            : 'border-slate-200 border-b-slate-350 bg-white text-slate-800 hover:border-pink-300 hover:border-b-pink-400 active:border-b-2 shadow-sm'
                        }`}
                        id={`p6-opt-${opt.substring(0, 10).replace(/\s+/g, '-').toLowerCase()}`}
                      >
                        <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-rose-500 border-rose-500 text-white' : 'border-neutral-300 bg-white'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[4]" />}
                        </div>
                        <span className="leading-snug">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                <button
                  disabled={tempActions.length === 0}
                  onClick={() => {
                    setAnswers(prev => ({ ...prev, triedSolutions: tempActions }));
                    setScreen('p7_mirror_feeling');
                  }}
                  className={`w-full py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    tempActions.length === 0
                      ? 'bg-neutral-200 text-neutral-400 border border-neutral-300 cursor-not-allowed'
                      : 'bg-gradient-to-r from-pink-500 to-rose-600 text-white hover:opacity-95 shadow-md shadow-pink-500/20'
                  }`}
                  id="btn-p6-continuar"
                >
                  <span>CONTINUAR</span>
                  <ArrowRight className="w-4.5 h-4.5" />
                </button>
              </motion.div>
            )}

            {/* 9. P7: MIRROR EMOTIONAL FEELING */}
            {screen === 'p7_mirror_feeling' && (
              <motion.div 
                key="p7_mirror_feeling"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center space-y-2">
                  <span className="text-xs bg-rose-50 border border-pink-100 text-rose-500 font-bold px-3 py-1 rounded-full tracking-wide uppercase">
                    Impacto Emocional
                  </span>
                  <h2 className="text-xl font-sans text-slate-800 font-extrabold leading-snug">
                    "O que você sente quando se olha no espelho de lado?"
                  </h2>
                </div>

                <div className="space-y-3.5">
                  {[
                    'Frustração, porque emagreci mas não me sinto bem',
                    'Vergonha do meu próprio corpo',
                    'Me sinto mais velha do que realmente sou'
                  ].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setAnswers(prev => ({ ...prev, feelLookingSide: opt }));
                        setScreen('p8_restricted_actions');
                      }}
                      className="w-full text-left p-4 sm:p-5 rounded-2xl border-2 border-b-4 border-slate-200 bg-white hover:border-pink-400 hover:border-b-pink-500 active:border-b-2 active:translate-y-[2px] shadow-sm hover:shadow-md transition-all cursor-pointer flex justify-between items-center group text-base sm:text-lg font-normal text-slate-800 hover:text-pink-900"
                      id={`p7-opt-${opt.substring(0, 10).replace(/\s+/g, '-').toLowerCase()}`}
                    >
                      <span>{opt}</span>
                      <span className="w-6 h-6 rounded-full border border-slate-200 group-hover:bg-pink-50 group-hover:border-pink-500 group-hover:text-pink-600 flex items-center justify-center text-slate-400 transition-colors shrink-0">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 10. P8: RESTRICTED ACTIONS */}
            {screen === 'p8_restricted_actions' && (
              <motion.div 
                key="p8_restricted_actions"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 flex flex-col h-full"
              >
                <div className="text-center space-y-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-pink-50 text-pink-500 inline-block">
                    Múltipla Escolha
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold font-sans text-slate-900 leading-snug">
                    O que a flacidez já te fez deixar de fazer? 😔
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-550 leading-relaxed">Marque as opções que mais mexem com você:</p>
                </div>

                <div className="space-y-3 flex-1 flex flex-col justify-center">
                  {[
                    { display: '👙 Usar biquíni ou roupas mais coladas', value: 'Usar biquíni ou roupa colada' },
                    { display: '📸 Tirar fotos espontâneas sem prender a respiração', value: 'Tirar foto sem prender a barriga' },
                    { display: '❤️ Me sentir à vontade, segura e amada na intimidade', value: 'Me sentir à vontade na intimidade' },
                    { display: '💔 Infelizmente, todas as alternativas acima...', value: 'Tudo isso 💔' }
                  ].map((opt) => {
                    const isSelected = tempActions.includes(opt.value);
                    return (
                      <button
                        key={opt.value}
                        onClick={() => {
                          if (isSelected) {
                            setTempActions(prev => prev.filter(x => x !== opt.value));
                          } else {
                            if (opt.value.includes('Tudo')) {
                              setTempActions([opt.value]);
                            } else {
                              setTempActions(prev => [...prev.filter(x => !x.includes('Tudo')), opt.value]);
                            }
                          }
                        }}
                        className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 border-b-4 transition duration-200 flex gap-4 items-center cursor-pointer text-base sm:text-lg font-normal ${
                          isSelected 
                            ? 'border-pink-500 border-b-pink-600 bg-pink-50/40 text-pink-900 shadow-md translate-y-[2px]' 
                            : 'border-slate-200 border-b-slate-350 bg-white text-slate-800 hover:border-pink-300 hover:border-b-pink-400 active:border-b-2 shadow-sm'
                        }`}
                        id={`p8-opt-${opt.value.substring(0, 10).replace(/\s+/g, '-').toLowerCase()}`}
                      >
                        <div className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-pink-500 border-pink-500 text-white' : 'border-slate-350 bg-white'
                        }`}>
                          {isSelected && <Check className="w-4 h-4 stroke-[4]" />}
                        </div>
                        <span className="leading-snug">{opt.display}</span>
                      </button>
                    );
                  })}
                </div>

                <button
                  disabled={tempActions.length === 0}
                  onClick={() => {
                    setAnswers(prev => ({ ...prev, restrictedActions: tempActions }));
                    setScreen('p9_hydration');
                  }}
                  className={`w-full py-4 px-6 rounded-full font-bold text-xs sm:text-sm tracking-widest uppercase flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md ${
                    tempActions.length === 0
                      ? 'bg-slate-250 text-slate-400 border border-slate-300 shadow-none cursor-not-allowed'
                      : 'bg-pink-500 hover:bg-pink-600 text-white shadow-pink-200 cursor-pointer'
                  }`}
                  id="btn-p8-continuar"
                >
                  <span>CONTINUAR</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {/* 11-1. P9_HYDRATION INDEX */}
            {screen === 'p9_hydration' && (
              <motion.div 
                key="p9_hydration"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 flex flex-col h-full"
              >
                <div className="text-center space-y-2">
                  <h2 className="text-xl sm:text-2xl font-bold font-sans text-slate-900 leading-snug">
                    Como anda a sua hidratação no dia a dia? 💧
                  </h2>
                </div>

                <div className="space-y-3.5 flex-1 flex flex-col justify-center">
                  {[
                    { display: '🥛 Bebo pouca água (máximo 2 copos por dia)', value: 'Bebo pouca água (2 copos no máximo/dia)' },
                    { display: '☕ Geralmente só bebo quando lembro ou sinto sede', value: 'Bebo só quando lembro.' },
                    { display: '🥤 Bebo bastante água regulamente (+4 copos/dia)', value: 'Bebo bastante água (+4 copos/dia)' }
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setAnswers(prev => ({ ...prev, hydration: opt.value }));
                        setScreen('p9_sleep');
                      }}
                      className="w-full text-left p-4 sm:p-5 rounded-2xl border-2 border-b-4 border-slate-200 bg-white hover:border-pink-400 hover:border-b-pink-500 active:border-b-2 active:translate-y-[2px] shadow-sm hover:shadow-md transition-all cursor-pointer flex justify-between items-center group text-base sm:text-lg font-normal text-slate-800 hover:text-pink-900"
                      id={`p9-hydr-${opt.value.substring(0, 10).replace(/\s+/g, '-').toLowerCase()}`}
                    >
                      <span className="leading-snug pr-3">{opt.display}</span>
                      <span className="w-6 h-6 rounded-full border border-slate-200 group-hover:bg-pink-50 group-hover:border-pink-500 group-hover:text-pink-600 flex items-center justify-center text-slate-400 transition-colors shrink-0">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 11-2. P9_SLEEP INDEX */}
            {screen === 'p9_sleep' && (
              <motion.div 
                key="p9_sleep"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 flex flex-col h-full"
              >
                <div className="text-center space-y-2">
                  <h2 className="text-xl sm:text-2xl font-bold font-sans text-slate-900 leading-snug">
                    Como anda a qualidade do seu sono? 💤
                  </h2>
                </div>

                <div className="space-y-3.5 flex-1 flex flex-col justify-center">
                  {[
                    { display: '🥱 Durmo mal e sempre acordo cansada', value: 'Durmo mal, acordo cansada' },
                    { display: '⏱️ Durmo muito pouco (menos de 6 horas por noite)', value: 'Durmo pouco (máximo 6 horas/dia)' },
                    { display: '😴 Durmo super bem (+7 horas relaxantes por noite)', value: 'Durmo bem (+ 7 horas/dia)' }
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setAnswers(prev => ({ ...prev, sleep: opt.value }));
                        setScreen('p9_diet');
                      }}
                      className="w-full text-left p-4 sm:p-5 rounded-2xl border-2 border-b-4 border-slate-200 bg-white hover:border-pink-400 hover:border-b-pink-500 active:border-b-2 active:translate-y-[2px] shadow-sm hover:shadow-md transition-all cursor-pointer flex justify-between items-center group text-base sm:text-lg font-normal text-slate-800 hover:text-pink-900"
                      id={`p9-sleep-${opt.value.substring(0, 10).replace(/\s+/g, '-').toLowerCase()}`}
                    >
                      <span className="leading-snug pr-3">{opt.display}</span>
                      <span className="w-6 h-6 rounded-full border border-slate-200 group-hover:bg-pink-50 group-hover:border-pink-500 group-hover:text-pink-600 flex items-center justify-center text-slate-400 transition-colors shrink-0">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 11-3. P9_DIET INDEX */}
            {screen === 'p9_diet' && (
              <motion.div 
                key="p9_diet"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 flex flex-col h-full"
              >
                <div className="text-center space-y-2">
                  <h2 className="text-xl sm:text-2xl font-bold font-sans text-slate-900 leading-snug">
                    Sua alimentação costuma ter: 🍏
                  </h2>
                </div>

                <div className="space-y-3.5 flex-1 flex flex-col justify-center">
                  {[
                    { display: '🥩 Bastante proteína (carnes, ovos, frangos)', value: 'Bastante proteína (carne, ovo, frango)' },
                    { display: '🥐 Preferência por carboidratos, pães e doces', value: 'Mais carboidrato e doce' },
                    { display: '🥗 Alimentação vegetariana ou focada em vegetais', value: 'Vegetariana' },
                    { display: '🍕 Bem desregrada (doces, lanches, frituras)', value: 'Bem desregrada (doces/lanches/pizza)' }
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setAnswers(prev => ({ ...prev, diet: opt.value }));
                        setScreen('p9_activity');
                      }}
                      className="w-full text-left p-4 sm:p-5 rounded-2xl border-2 border-b-4 border-slate-200 bg-white hover:border-pink-400 hover:border-b-pink-500 active:border-b-2 active:translate-y-[2px] shadow-sm hover:shadow-md transition-all cursor-pointer flex justify-between items-center group text-base sm:text-lg font-normal text-slate-800 hover:text-pink-900"
                      id={`p9-diet-${opt.value.substring(0, 10).replace(/\s+/g, '-').toLowerCase()}`}
                    >
                      <span className="leading-snug pr-3">{opt.display}</span>
                      <span className="w-6 h-6 rounded-full border border-slate-200 group-hover:bg-pink-50 group-hover:border-pink-500 group-hover:text-pink-600 flex items-center justify-center text-slate-400 transition-colors shrink-0">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 11-4. P9_ACTIVITY INDEX */}
            {screen === 'p9_activity' && (
              <motion.div 
                key="p9_activity"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 flex flex-col h-full"
              >
                <div className="text-center space-y-2">
                  <h2 className="text-xl sm:text-2xl font-bold font-sans text-slate-900 leading-snug">
                    Como está seu nível de atividade física hoje? 🏃‍♀️
                  </h2>
                </div>

                <div className="space-y-3.5 flex-1 flex flex-col justify-center">
                  {[
                    { display: '🛋️ Parada (sedentária, sem tempo ou quase nada)', value: 'Parada, quase nada' },
                    { display: '🚶‍♀️ Caminho ou faço passeios leves de vez em quando', value: 'Caminho de vez em quando' },
                    { display: '🏋️‍♀️ Treino na academia ou pratico esportes pesados', value: 'Treino na academia' }
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setAnswers(prev => ({ ...prev, activityLevel: opt.value }));
                        setScreen('p10_commitment');
                      }}
                      className="w-full text-left p-4 sm:p-5 rounded-2xl border-2 border-b-4 border-slate-200 bg-white hover:border-pink-400 hover:border-b-pink-500 active:border-b-2 active:translate-y-[2px] shadow-sm hover:shadow-md transition-all cursor-pointer flex justify-between items-center group text-base sm:text-lg font-normal text-slate-800 hover:text-pink-900"
                      id={`p9-act-${opt.value.substring(0, 10).replace(/\s+/g, '-').toLowerCase()}`}
                    >
                      <span className="leading-snug pr-3">{opt.display}</span>
                      <span className="w-6 h-6 rounded-full border border-slate-200 group-hover:bg-pink-50 group-hover:border-pink-500 group-hover:text-pink-600 flex items-center justify-center text-slate-400 transition-colors shrink-0">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 12. P10: COMMITMENT QUESTION */}
            {screen === 'p10_commitment' && (
              <motion.div 
                key="p10_commitment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 flex flex-col h-full"
              >
                <div className="text-center space-y-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-rose-50 text-rose-500 inline-block">
                    Compromisso Coletivo
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold font-sans text-slate-905 leading-snug">
                    "Se eu te mostrar uma receita natural que você faz em casa em 5 minutos por dia, você se compromete a fazer por 7 dias?" 🤝
                  </h2>
                </div>

                <div className="space-y-3.5 flex-1 flex flex-col justify-center">
                  {[
                    { display: '🌸 Sim, me comprometo totalmente todo dia!', value: 'Sim, faço todo dia!' },
                    { display: '✨ Com certeza, desde que seja prática!', value: 'Sim, se for simples!' },
                    { display: '🔥 Já estou pronta para começar agora!', value: 'Com certeza, já tentei coisas piores!' }
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setAnswers(prev => ({ ...prev, commitment: opt.value }));
                        setScreen('p11_name');
                      }}
                      className="w-full text-left p-4 sm:p-5 rounded-2xl border-2 border-b-4 border-slate-200 bg-white hover:border-pink-400 hover:border-b-pink-500 active:border-b-2 active:translate-y-[2px] shadow-sm hover:shadow-md transition-all cursor-pointer flex justify-between items-center group text-base sm:text-lg font-normal text-slate-800 hover:text-pink-900"
                      id={`p10-opt-${opt.value.substring(0, 10).replace(/\s+/g, '-').toLowerCase()}`}
                    >
                      <span className="leading-snug pr-3">{opt.display}</span>
                      <span className="w-6 h-6 rounded-full border border-slate-200 group-hover:bg-pink-50 group-hover:border-pink-500 group-hover:text-pink-600 flex items-center justify-center text-slate-400 transition-colors shrink-0">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 13. P11: FIRST NAME REQUIRED */}
            {screen === 'p11_name' && (
              <motion.div 
                key="p11_name"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 flex flex-col h-full justify-between"
              >
                <div className="text-center space-y-3">
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-600 inline-block font-sans">
                    Diagnóstico Finalizado 🎉
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold font-sans text-slate-800 leading-snug">
                    Temos todas as informações necessárias para gerar seu relatório personalizado! 🎉
                  </h2>
                  <p className="text-sm sm:text-base text-rose-500 font-bold leading-relaxed">Qual é o seu primeiro nome?</p>
                </div>

                <div className="bg-white rounded-2xl border border-pink-100 p-6 space-y-4 shadow-sm my-auto">
                  <div className="space-y-2 text-left">
                    <label className="text-xs font-black text-rose-500 tracking-wider uppercase">
                      Digite seu Primeiro Nome:
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Maria"
                      value={answers.name}
                      onChange={(e) => {
                        setNameError('');
                        setAnswers(prev => ({ ...prev, name: e.target.value }));
                      }}
                      className="w-full bg-[#FCF8F8] border-2 border-pink-50 rounded-2xl px-5 py-4 text-base focus:outline-none focus:border-pink-400 text-slate-800 font-extrabold placeholder-slate-400"
                      id="name-input"
                    />
                    {nameError && (
                      <p className="text-xs text-rose-600 font-bold flex items-center gap-1.5 mt-2 animate-pulse">
                        <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" /> {nameError}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (!answers.name.trim()) {
                      setNameError('Por favor, informe seu primeiro nome para personalizar o seu diagnóstico.');
                      return;
                    }
                    // Proceed to analysis loading page (10s delay)
                    setScreen('analyzing');
                  }}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold tracking-wide flex items-center justify-center gap-2 hover:opacity-95 shadow-md shadow-pink-500/20 cursor-pointer glow-btn"
                  id="btn-gerar-diagnostico"
                >
                  <span>GERAR MEU DIAGNÓSTICO</span>
                  <ArrowRight className="w-4.5 h-4.5" />
                </button>
              </motion.div>
            )}

            {/* 14. COMPREHENSIVE LOADING SCREEN (10 SECONDS) */}
            {screen === 'analyzing' && (
              <motion.div 
                key="analyzing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col justify-center py-12"
              >
                {/* 10 seconds counting loop */}
                <QuizLoadingSequence 
                  answers={answers} 
                  onComplete={() => setScreen('diagnosis')} 
                />
              </motion.div>
            )}

            {/* 15. CLINICAL DIAGNOSIS LAUDO SCREEN */}
            {screen === 'diagnosis' && (
              <motion.div 
                key="diagnosis"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8 flex flex-col h-full"
              >
                <div className="text-center space-y-3">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block animate-pulse mr-2"></span>
                  <span className="text-xs sm:text-sm font-extrabold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-4 py-1.5 rounded-full border-2 border-emerald-100">
                    Laudo Científico Concluído
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-sans text-slate-900 leading-snug pt-1">
                    {answers.name}, seu diagnóstico está pronto! 📋
                  </h2>
                </div>

                {/* Patient Laudo Table Card */}
                <div className="bg-white rounded-3xl border-2 border-pink-100 shadow-md p-5 sm:p-6 text-left space-y-5">
                  <div className="border-b-2 border-pink-50 pb-3 flex items-center justify-between">
                    <span className="text-rose-600 font-sans text-base sm:text-lg font-black tracking-wide">
                      📋 SEUS DADOS DA COMPOSIÇÃO
                    </span>
                  </div>

                  {/* Simple Patient Details Table */}
                  <div className="overflow-hidden border border-pink-100 rounded-2xl text-base bg-white">
                    <div className="grid grid-cols-2 bg-rose-50/10 p-4 border-b border-pink-50">
                      <span className="font-bold text-slate-500">Nome:</span>
                      <span className="font-extrabold text-slate-800 uppercase text-right">{answers.name}</span>
                    </div>
                    <div className="grid grid-cols-2 p-4 border-b border-pink-50">
                      <span className="font-bold text-slate-500">Idade:</span>
                      <span className="font-extrabold text-slate-800 text-right">{answers.age === 'Menos de 30 anos' ? 'Menos de 30' : answers.age} anos</span>
                    </div>
                    <div className="grid grid-cols-2 bg-rose-50/10 p-4 border-b border-pink-50">
                      <span className="font-bold text-slate-500">Sofre com isso há:</span>
                      <span className="font-extrabold text-slate-800 text-right uppercase text-sm">{answers.timeSuffering}</span>
                    </div>
                    <div className="grid grid-cols-2 p-4 border-b border-pink-50">
                      <span className="font-bold text-slate-500">Motivo de começar:</span>
                      <span className="font-extrabold text-rose-700 text-right font-sans">
                        {answers.situation.includes('filho') ? 'Pós-Gestação' : answers.situation.includes('Emagreci') ? 'Reduziu de Peso' : 'Queda de Proteína da Pele'}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 bg-rose-50/10 p-4 border-b border-pink-50">
                      <span className="font-bold text-slate-500 font-sans">Já tentou usar:</span>
                      <span className="font-extrabold text-slate-800 text-right truncate">
                        {answers.triedSolutions && answers.triedSolutions.length > 0 && !answers.triedSolutions.some(s => s.toUpperCase().includes('NUNCA'))
                          ? answers.triedSolutions.join(', ').toLowerCase()
                          : 'Nenhum (nunca tentou)'}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 p-4 bg-rose-50">
                      <span className="font-black text-rose-800 text-base">Grau de flacidez:</span>
                      <span className="font-black text-rose-600 text-right uppercase text-base">
                        {answers.age.includes('60') || answers.timeSuffering.includes('3') ? '🔍 GRAU SEVERO' : answers.age.includes('50') || answers.age.includes('40') ? '🔍 GRAU MODERADO' : '🔍 GRAU INICIAL'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Simplified Diagnosis Blocks in common Portuguese */}
                <div className="bg-white rounded-3xl border border-pink-100 p-6 shadow-sm text-left space-y-5 text-sm sm:text-base leading-relaxed font-semibold text-slate-700">
                  <h3 className="font-sans font-black text-slate-800 text-lg border-b border-rose-50 pb-2.5 flex items-center gap-2">
                    💡 O que está acontecendo com a sua pele:
                  </h3>
                  
                  <p className="text-base sm:text-lg">
                    A flacidez da sua barriga acontece porque as fibras que seguram e esticam a pele estão frouxas, causado principalmente por <strong className="text-rose-600 font-extrabold">{getBellyCause()}</strong>.
                  </p>

                  <p className="text-base sm:text-lg border-l-4 border-pink-500 pl-4 bg-pink-50/10 py-2">
                    Como a pele ficou <strong className="text-slate-900 font-extrabold">{answers.timeSuffering.toLowerCase()}</strong> sem receber a nutrição certa, as fibras se acostumaram a ficar moles — por isso que não voltam mais ao lugar original sozinhas.
                  </p>

                  <div className="p-4 bg-rose-50/50 rounded-2xl border border-pink-100 space-y-3.5 text-slate-800 text-sm sm:text-base">
                    <p className="font-bold flex items-center gap-1.5 text-rose-800 text-base">
                      👤 Seus Dados de Saúde:
                    </p>
                    <p>
                      • <strong>Bebe água:</strong> {answers.hydration}
                    </p>
                    <p>
                      • <strong>Como dorme:</strong> {answers.sleep}
                    </p>
                    <p>
                      • <strong>Exercícios:</strong> {answers.activityLevel}
                    </p>
                    <p className="border-t border-pink-100 pt-3 text-slate-700 font-bold">
                      {answers.triedSolutions && answers.triedSolutions.length > 0 && !answers.triedSolutions.some(s => s.toUpperCase().includes('NUNCA')) ? (
                        <>
                          Como você já tentou <strong className="text-slate-950 font-black">{answers.triedSolutions.slice(0, 2).map(s => s.toLowerCase()).join(' e ')}</strong> sem resolver de verdade, isso prova de uma vez por todas que o problema não é com a sua dedicação, mas sim com a falta de colágeno interno que esses métodos normais não conseguem alcançar.
                        </>
                      ) : (
                        <>
                          Como você ainda <strong className="text-emerald-700 font-black">nunca ficou tentando receitas milagrosas ou usando tratamentos perigosos</strong> na pele, isso é uma excelente notícia! A pele da sua barriga está novinha e vai responder muito mais rápido ao preenchimento natural do nosso Truque da Gelatina caseiro.
                        </>
                      )}
                    </p>
                  </div>

                  <p className="text-emerald-750 font-black flex items-center gap-2 text-sm sm:text-base bg-emerald-50 px-4 py-3.5 rounded-2xl border border-emerald-100">
                    <Check className="w-5 h-5 text-emerald-600 shrink-0 stroke-[4]" /> O seu perfil clínico foi aprovado por nossa equipe de receitas para usar o Truque do Gelatina Lisa com as doses que seu caso precisa!
                  </p>
                </div>

                {/* Scientific analytical charts and gauges */}
                <DiagnosticCharts 
                  name={answers.name} 
                  age={answers.age} 
                  situation={answers.situation} 
                  timeSuffering={answers.timeSuffering} 
                  triedSolutions={answers.triedSolutions} 
                />

                {/* Final Warning indicator */}
                <div className="bg-amber-50/60 rounded-3xl p-5 border-2 border-amber-200 text-left text-sm font-semibold text-amber-900 leading-relaxed space-y-2">
                  <div className="font-extrabold text-amber-800 flex items-center gap-1.5 text-base uppercase tracking-wider">
                    <AlertCircle className="w-5 h-5 text-amber-650 shrink-0" /> IMPORTANTE: Protocolo Personalizado
                  </div>
                  <p className="text-sm sm:text-base">
                    Atenção: Esse diagnóstico é individual e intransferível. O protocolo de reconstrução profunda do Truque da Gelatina varia de dosagem de acordo com o seu grau de flacidez ({answers.age.includes('60') || answers.timeSuffering.includes('3') ? 'Grau Severo' : answers.age.includes('50') || answers.age.includes('40') ? 'Grau Moderado' : 'Grau Inicial'}). Siga o protocolo recomendado exatamente como detalhado a seguir.
                  </p>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setSalesTimer(240);
                      setShowDelayedSalesContent(false);
                      setScreen('sales_page');
                    }}
                    className="w-full py-4.5 px-6 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-extrabold tracking-widest uppercase text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-pink-200 active:scale-95 transition-transform cursor-pointer"
                    id="btn-gerar-tratamento-individual"
                  >
                    <span>VER PROTOCOLO EXCLUSIVO</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* 16. THE FINAL COMPLEX CONVERTING SALES CHANNELS / CHECKOUT PAGE */}
            {screen === 'sales_page' && (
              <motion.div 
                key="sales_page"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8 text-left p-1 sm:p-2"
              >
                {/* Visual Header Offer Notification */}
                <div className="text-center space-y-4">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-emerald-50 border-2 border-emerald-200 text-emerald-700 animate-pulse">
                    <Sparkles className="w-4 h-4 text-emerald-600" /> Prescrição Escolhida Disponível!
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                    🔥 {answers.name}, seu tratamento detalhado já está pronto para o seu caso!
                  </h1>
                  <p className="text-base sm:text-lg text-slate-700 font-bold max-w-lg mx-auto leading-relaxed">
                    Assista ao curto vídeo explicativo abaixo para ver como preparar as receitas e liberar o seu acesso completo às receitas secretas da gelatina:
                  </p>
                </div>

                {/* Mock presentation player for Sales Page VSL */}
                <div className="space-y-2">
                  <VideoPlayer videoId="sales" />
                  <p className="text-xs sm:text-sm text-slate-500 text-center flex items-center justify-center gap-1.5 font-bold">
                    <Info className="w-4.5 h-4.5 text-rose-500 shrink-0" /> Após o vídeo, o cronograma e os bônus grátis carregarão abaixo.
                  </p>
                </div>

                {/* Proof testimonials image galleries - Antes/Depois */}
                <div className="space-y-4 pt-6 border-t border-slate-100">
                  <div className="text-center space-y-1.5">
                    <span className="text-xs uppercase font-black text-rose-500 tracking-widest">Compromisso Real</span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">Resultados de Quem Seguiu o Truque</h3>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {[
                      {
                        url: "https://sculpiflex.com/wp-content/uploads/2025/09/bfa05.jpg.webp",
                        cap: "Melhora incrível da firmeza da barriga em 12 dias."
                      },
                      {
                        url: "https://sculpiflex.com/wp-content/uploads/2025/09/bfa03.jpg.webp",
                        cap: "Lifting da pele solta e eliminação de rugas pós emagrecimento."
                      },
                      {
                        url: "https://sculpiflex.com/wp-content/uploads/2025/03/010-02-Notext-768x768.jpg.webp",
                        cap: "Correção de flacidez severa e marcas de expressão de anos."
                      }
                    ].map((img, idx) => (
                      <div key={idx} className="bg-white rounded-3xl overflow-hidden border-2 border-pink-100 shadow-sm">
                        <div className="aspect-square relative bg-white">
                          <img
                            src={img.url}
                            alt=""
                            className="w-full h-full object-contain bg-white"
                            referrerPolicy="no-referrer"
                          />
                          <span className="absolute bottom-3 left-3 bg-rose-600 text-white text-[10px] px-3 py-1 rounded-full font-sans uppercase font-bold tracking-widest shadow-xs">
                            Caso Real #{idx + 1}
                          </span>
                        </div>
                        <div className="p-4 bg-rose-50/20 text-center font-bold text-slate-800 text-sm sm:text-base border-t border-pink-50">
                          "{img.cap}"
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recipes Unveiled section */}
                {!showDelayedSalesContent ? null : (
                  <div className="pt-6 border-t border-rose-100 space-y-6">
                    <motion.div 
                      key="recipes-unveiled"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                    <div className="bg-emerald-555 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-3xl p-6 shadow-md text-center space-y-3.5">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mx-auto text-white">
                        <Check className="w-6 h-6 stroke-[4]" />
                      </div>
                      <h4 className="font-extrabold text-lg sm:text-xl tracking-wide uppercase">
                        Receitas Liberadas do Truque!
                      </h4>
                      <p className="text-sm text-white/95 font-bold leading-relaxed">
                        Sua receita foi personalizada de acordo com o seu perfil, calculando as porções exatas para a sua idade e tipo de barriga! (Grau do perfil: {answers.age.includes('60') || answers.timeSuffering.includes('3') ? 'Severo' : answers.age.includes('50') || answers.age.includes('40') ? 'Moderado' : 'Inicial'})
                      </p>
                    </div>

                    <div className="bg-white rounded-3xl border-2 border-pink-100 p-6 shadow-sm space-y-5">
                      <h3 className="font-sans font-black text-rose-700 text-lg sm:text-xl border-b border-rose-50 pb-3">
                        Conteúdo do seu Protocolo Truque da Gelatina:
                      </h3>

                      <div className="space-y-4">
                        {[
                          { title: 'Receita do Truque da Gelatina Prática', desc: 'A fórmula secreta combinando frações de gelatinas caseiras fáceis de ingerir que repovoam o colágeno da barriga.' },
                          { title: 'Fórmula Externa de Creme Corporal Caseiro', desc: 'Aplicação externa que estimula o fluxo elástico por fora, melhorando a textura enrugada da pele.' },
                          { title: 'Cronograma Passo a Passo de 7 Dias', desc: 'Guia definitivo com horários e quantidades simples calculadas para o seu dia a dia.' },
                          { title: 'Ingredientes de Supermercado muito Baratos', desc: 'Tudo simples, prático, saudável de achar e custando menos de R$ 15 no total.' }
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-start gap-3 bg-rose-50/10 p-3 rounded-2xl border border-pink-50/50">
                            <span className="w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0 mt-0.5 text-sm font-black shadow-xs">
                              {idx + 1}
                            </span>
                            <div className="space-y-0.5">
                              <h5 className="font-extrabold text-slate-800 text-base leading-snug">{item.title}</h5>
                              <p className="text-sm text-slate-600 font-bold leading-relaxed">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Highly Converting Bonus Details */}
                    <div className="space-y-5 pt-4">
                      <h3 className="font-sans font-black text-slate-800 text-xl text-center">
                        BÔNUS COMPLEMENTARES GRÁTIS HOJE:
                      </h3>

                      {/* Core Guide Block rendered beautifully */}
                      <div className="bg-white rounded-3xl border-2 border-pink-200 p-6 shadow-sm text-left space-y-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-rose-600 text-white text-[10px] font-black py-1.5 px-4 rounded-bl-2xl uppercase tracking-wider">
                          Guia Principal
                        </div>
                        <span className="text-3xl">📘</span>
                        <h4 className="font-sans font-black text-slate-900 text-lg uppercase tracking-tight">
                          TRUQUE DA GELATINA LISA — PROTOCOLO COMPLETO
                        </h4>
                        <p className="text-sm text-slate-600 font-bold leading-relaxed">
                          O manual oficial com o passo a passo completo, as frações exatas e as misturas que criam o preenchimento de colágeno elástico de dentro para fora.
                        </p>
                      </div>

                      {/* Bonus 1 Block */}
                      <div className="bg-white rounded-3xl border-2 border-pink-100 p-6 shadow-sm text-left space-y-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-black py-1.5 px-4 rounded-bl-2xl uppercase tracking-wider">
                          Grátis Hoje
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-3xl shrink-0">🎁</span>
                          <h4 className="font-sans font-black text-slate-900 text-lg">
                            BÔNUS #1 — Creme Caseiro Corporal para Varizes
                          </h4>
                        </div>
                        <p className="text-sm text-slate-600 font-bold leading-relaxed">
                          Uma maravilhosa receita adicional caseira de aplicação externa para aliviar o cansaço das pernas e melhorar o aspecto visual de varizes e vasinhos de forma totalmente natural.
                        </p>
                        
                        <div className="w-full rounded-2xl overflow-hidden border border-pink-100 bg-white shadow-xs">
                          <img 
                            src="https://rpfqtfsdfmxgdlzxtkhd.supabase.co/storage/v1/object/public/videos/bonus%202%20Varizes.jpeg" 
                            alt="Creme para Varizes" 
                            className="w-full h-auto max-h-[220px] object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        <div className="bg-rose-50/40 p-4 rounded-2xl border border-pink-50 space-y-2">
                          <span className="text-[11px] font-black text-rose-600 uppercase tracking-wider block">Benefícios Práticos:</span>
                          <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 font-semibold">
                            <li>• Alívio imediato do cansaço e do inchaço nas pernas</li>
                            <li>• Ajuda a suavizar a aparência de vasinhos aparentes</li>
                            <li>• Deixa as pernas mais uniformes, hidratadas e macias</li>
                          </ul>
                        </div>
                        <div className="flex justify-between items-center text-xs sm:text-sm pt-1">
                          <span className="text-slate-400 line-through font-bold">Valor Normal: R$ 47</span>
                          <span className="text-emerald-700 font-black bg-emerald-50 px-3 py-1 rounded-full text-xs">GRÁTIS HOJE</span>
                        </div>
                      </div>

                      {/* Bonus 2 Block */}
                      <div className="bg-white rounded-3xl border-2 border-pink-100 p-6 shadow-sm text-left space-y-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-black py-1.5 px-4 rounded-bl-2xl uppercase tracking-wider">
                          Grátis Hoje
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-3xl shrink-0">🎁</span>
                          <h4 className="font-sans font-black text-slate-900 text-lg">
                            BÔNUS #2 — Manual Caseiro Suavizador de Estrias
                          </h4>
                        </div>
                        <p className="text-sm text-slate-600 font-bold leading-relaxed">
                          Receitas práticas e caseiras desenvolvidas para massagear as estrias e rugas do corpo, promovendo nutrição tópica e acelerando o alongamento uniforme da derme de forma natural.
                        </p>

                        <div className="w-full rounded-2xl overflow-hidden border border-pink-100 bg-white shadow-xs">
                          <img 
                            src="https://rpfqtfsdfmxgdlzxtkhd.supabase.co/storage/v1/object/public/videos/bonus%201%20estrias.png" 
                            alt="Suavizador de Estrias" 
                            className="w-full h-auto max-h-[220px] object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        <div className="bg-rose-50/40 p-4 rounded-2xl border border-pink-50 space-y-2">
                          <span className="text-[11px] font-black text-rose-600 uppercase tracking-wider block">Benefícios Práticos:</span>
                          <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 font-semibold">
                            <li>• Suaviza estrias visíveis brancas e vermelhas</li>
                            <li>• Melhora a hidratação profunda em áreas exigidas</li>
                            <li>• Aplicação caseira de rápida absorção</li>
                          </ul>
                        </div>
                        <div className="flex justify-between items-center text-xs sm:text-sm pt-1">
                          <span className="text-slate-400 line-through font-bold">Valor Normal: R$ 47</span>
                          <span className="text-emerald-700 font-black bg-emerald-50 px-3 py-1 rounded-full text-xs">GRÁTIS HOJE</span>
                        </div>
                      </div>
                    </div>

                    {/* VALUE BREAKDOWN SUMMARY CARD */}
                    <div className="bg-rose-50/30 rounded-3xl p-6 border-2 border-pink-100 text-center space-y-4">
                      <span className="text-xs uppercase font-black tracking-widest text-slate-400 block mb-1">Resumo do seu Acesso Recomentado</span>
                      
                      <div className="space-y-2 text-sm sm:text-base text-slate-700 font-bold">
                        <div className="flex justify-between">
                          <span>TRUQUE DA GELATINA (RECEITA)</span>
                          <span className="font-black text-slate-900">R$ 97</span>
                        </div>
                        <div className="flex justify-between">
                          <span>BÔNUS PARA VARIZES</span>
                          <span className="font-bold text-slate-400 line-through">R$ 47</span>
                        </div>
                        <div className="flex justify-between">
                          <span>BÔNUS PARA ESTRIAS</span>
                          <span className="font-bold text-slate-400 line-through">R$ 47</span>
                        </div>
                        <div className="flex justify-between border-t-2 border-pink-100 pt-3 text-base text-slate-500 font-black">
                          <span>Soma Original Completa:</span>
                          <span className="line-through font-black text-rose-600">R$ 191,00</span>
                        </div>
                      </div>

                      {/* Premium Highlight Special Price Offer */}
                      <div className="bg-white rounded-2xl p-5 border-3 border-rose-500 shadow-md space-y-1">
                        <span className="text-[11px] uppercase font-black tracking-widest text-white bg-rose-600 px-3.5 py-1 rounded-full inline-block shadow-xs">
                          🔴 OFERTA COM DESCONTO DE HOJE
                        </span>
                        <div className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
                          Apenas R$ 27
                        </div>
                        <p className="text-xs text-slate-600 font-bold">
                          Sem juros ou taxas escondidas. Pagamento único com acesso permanente.
                        </p>
                      </div>

                      {/* Giant Checkout Action Button */}
                      <div className="space-y-2 pt-2">
                        <a
                          href="https://pay.kiwify.com.br/ps8vmrd"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-4.5 px-6 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-95 text-white font-extrabold text-sm sm:text-base tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/35 hover:scale-[1.01] active:translate-y-0.5 transition cursor-pointer"
                          id="btn-checkout-1"
                        >
                          <ShieldCheck className="w-6 h-6 text-white shrink-0" />
                          <span>QUERO MEU TRATAMENTO DE GELATINA</span>
                        </a>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block text-center">
                          🔒 Site 100% Criptografado e Seguro • Links Liberados no WhatsApp
                        </p>
                      </div>
                    </div>

                    {/* REFUND Guarantee box */}
                    <div className="bg-white rounded-3xl border-2 border-emerald-100 p-6 shadow-sm text-left flex gap-4 items-start bg-emerald-50/10">
                      <div className="w-14 h-14 shrink-0 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-2xl font-black shadow-xs">
                        7
                      </div>
                      <div className="space-y-1.5">
                        <h4 className="font-sans font-black text-emerald-800 text-base leading-snug">
                          GARANTIA INCONDICIONAL DE 7 DIAS
                        </h4>
                        <p className="text-sm text-slate-700 font-bold leading-relaxed">
                          Use, leia e aplique as receitas do Truque da Gelatina em casa sem nenhum medo. Se por qualquer motivo você achar que não serviu para o seu caso ou não gostar dos cremes corporais, basta nos enviar um e-mail para receber todo o seu dinheiro de volta sem nenhuma burocracia. O seu risco é zero.
                        </p>
                      </div>
                    </div>

                    {/* Beautifully readable big Accordion FAQ dropdowns */}
                    <div className="space-y-4 pt-4">
                      <h3 className="font-sans font-black text-slate-800 text-xl text-center">
                        PERGUNTAS REPROVADAS COM RESPOSTAS:
                      </h3>

                      <div className="space-y-3 text-sm sm:text-base">
                        {[
                          { q: 'Como vou receber as receitas do truque?', a: 'As receitas, cronogramas de porção diária e cremes de varizes/estrias são enviados imediatamente de forma digital após a compra diretamente no seu E-mail e no WhatsApp que preencher no cadastro.' },
                          { q: 'É preciso receitas difíceis ou caras?', a: 'Não mesmo. Todas as receitas usam gelatinas simples e componentes populares muito baratos que você compra em qualquer mercadinho ou feira local de forma prática.' },
                          { q: 'Quanto tempo necessito para preparar?', a: 'Você gasta cerca de 3 a 5 minutos por dia na preparação matinal única das colheradas estimuladoras do Truque. Tudo muito fácil!' },
                          { q: 'O acesso ao material do Truque é vitalício?', a: 'Sim! Com a compra, o material é seu por tempo ilimitado para ler e baixar quando bem quiser.' },
                          { q: 'Consigo acessar pelo celular fácil?', a: 'Com certeza. O material completo é totalmente formatado de modo leve e otimizado para abrir em qualquer celular Android ou iPhone.' }
                        ].map((item, idx) => {
                          const isOpen = faqOpen[idx];
                          return (
                            <div key={idx} className="bg-white rounded-2xl border-2 border-pink-100 overflow-hidden shadow-xs">
                              <button
                                onClick={() => toggleFaq(idx)}
                                className="w-full font-extrabold text-slate-800 p-4.5 text-left flex justify-between items-center transition hover:bg-rose-50/20 cursor-pointer text-sm sm:text-base leading-snug"
                                id={`faq-btn-${idx}`}
                              >
                                <span>{item.q}</span>
                                <ChevronDown className={`w-5 h-5 text-rose-500 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                              </button>
                              {isOpen && (
                                <div className="px-5 pb-5 font-bold text-slate-600 leading-relaxed pt-2 border-t border-rose-50 bg-rose-50/10">
                                  {item.a}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Outro CTA Box */}
                    <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-3xl p-6 sm:p-8 text-center space-y-5 shadow-md">
                      <h4 className="font-sans font-black text-white text-xl uppercase tracking-tight">
                        🌟 GARANTA SEU PROTOCOLO AGORA
                      </h4>
                      <p className="text-sm text-white font-bold leading-relaxed max-w-sm mx-auto">
                        Sua receita exclusiva já está calculada e reservada para o seu nome ({answers.name}).
                      </p>
                      <p className="text-sm text-white/95 font-bold leading-relaxed max-w-sm mx-auto">
                        Aproveite essa promoção de liberação de apenas <strong>R$ 27</strong> por tempo extremamente limitado e receba o material agora mesmo!
                      </p>

                      <div className="pt-2">
                        <a
                          href="https://pay.kiwify.com.br/ps8vmrd"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full block py-4 px-6 rounded-full bg-white text-rose-600 font-extrabold text-sm sm:text-base tracking-widest shadow-md hover:scale-[1.01] active:scale-95 transition cursor-pointer text-center"
                          id="btn-checkout-2"
                        >
                          QUERO MEU PROTOCOLO AGORA
                        </a>
                      </div>

                      <div className="text-[11px] text-pink-200 mt-2 font-mono flex items-center justify-center gap-1.5 font-bold uppercase tracking-wider">
                        <Lock className="w-4 h-4 inline text-pink-200 shrink-0" /> Pagamento Único • Envio Imediato • Risco Zero
                      </div>
                    </div>

                  </motion.div>
                </div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        )}

        {/* Dynamic Simulated Checkout Modal with Custom Unveiled Recipes */}
        {showCheckoutModal && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex flex-col justify-end p-0">
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white rounded-t-[32px] max-h-[92%] overflow-y-auto p-5 space-y-4 shadow-2xl relative text-slate-800"
            >
              
              {/* Header */}
              <div className="flex justify-between items-center pb-2 border-b border-pink-100">
                <div>
                  <h3 className="text-xs font-bold text-slate-850 uppercase tracking-widest">
                    {checkoutStep === 'info' && '1. Seus Dados de Acesso'}
                    {checkoutStep === 'pix' && '2. Pagamento Seguro'}
                    {checkoutStep === 'success' && '✨ Prescritor Liberado!'}
                  </h3>
                  <p className="text-[10px] text-pink-500 font-semibold font-mono">
                    Valor a ser pago: R$ 27,00
                  </p>
                </div>
                <button 
                  onClick={() => setShowCheckoutModal(false)}
                  className="text-slate-400 hover:text-slate-600 font-bold p-1 text-[10px] bg-slate-100 hover:bg-slate-200 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Step 1: Info */}
              {checkoutStep === 'info' && (
                <div className="space-y-4 pt-1 text-left">
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Informe onde deseja receber o cronograma, as receitas exclusivas e os bônus do <strong>Truque da Gelatina Lisa</strong>:
                  </p>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Seu melhor E-mail:</label>
                      <input 
                        type="email" 
                        placeholder="Ex: maria@gmail.com" 
                        value={checkoutEmail}
                        onChange={(e) => setCheckoutEmail(e.target.value)}
                        className="w-full bg-[#FCF8F8] border border-pink-100 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-pink-400 text-slate-850 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Seu WhatsApp (com DDD):</label>
                      <input 
                        type="tel" 
                        placeholder="Ex: (11) 99999-9999" 
                        value={checkoutPhone}
                        onChange={(e) => setCheckoutPhone(e.target.value)}
                        className="w-full bg-[#FCF8F8] border border-pink-100 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-pink-400 text-slate-850 font-medium"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (!checkoutEmail.includes('@') || checkoutPhone.trim().length < 8) {
                        alert('Por favor, digite um e-mail válido e o WhatsApp para continuar.');
                        return;
                      }
                      setCheckoutStep('pix');
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs tracking-widest uppercase shadow-md shadow-pink-200 transition active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Gerar Pagamento Seguro</span>
                    <ShieldCheck className="w-4 h-4" />
                  </button>
                  
                  <div className="text-[9px] text-slate-400 text-center font-light leading-normal flex items-center justify-center gap-1">
                    <Lock className="w-3 h-3 text-emerald-500" /> Seus dados pessoais estão 100% protegidos e criptografados.
                  </div>
                </div>
              )}

              {/* Step 2: PIX */}
              {checkoutStep === 'pix' && (
                <div className="space-y-4 pt-1 text-center">
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Escaneie o QR Code ou copie o código Pix abaixo para liberar seu laudo sob medida da Gelatina Lisa.
                  </p>

                  <div className="flex flex-col items-center justify-center p-3.5 bg-neutral-50 rounded-2xl border border-neutral-100 space-y-2">
                    {/* Fake QR Code */}
                    <div className="w-24 h-24 bg-white p-2 border border-neutral-200 rounded-lg shadow-inner flex flex-col items-center justify-center relative overflow-hidden select-none">
                      <div className="grid grid-cols-4 gap-1.5 opacity-80 w-full h-full">
                        {Array.from({ length: 16 }).map((_, i) => (
                          <div key={i} className={`rounded-xs ${i % 3 === 0 || i % 5 === 2 ? 'bg-slate-900' : 'bg-transparent'}`}></div>
                        ))}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center bg-transparent">
                        <div className="bg-white p-1 rounded border border-neutral-100">
                          <span className="text-[9px] font-bold text-rose-500">PIX</span>
                        </div>
                      </div>
                    </div>

                    <div className="w-full space-y-1">
                      <span className="text-[8px] font-mono text-slate-400 select-all font-bold tracking-widest leading-none block break-all">
                        00020101021226870014br.gov.bcb.pix25650227gelatinalisa97r27v1.0
                      </span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText('00020101021226870014br.gov.bcb.pix25650227gelatinalisa97r27v1.0');
                          alert('Código Pix copiado para a área de transferência!');
                        }}
                        className="text-[9px] text-pink-500 hover:underline font-bold uppercase tracking-wider cursor-pointer"
                      >
                        [Copiar código Copia e Cola]
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 pt-1">
                    <button
                      onClick={() => setCheckoutStep('success')}
                      className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs tracking-widest uppercase shadow-md transition active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Confirmar Pagamento Simulado</span>
                      <Check className="w-4 h-4 stroke-[3]" />
                    </button>
                    <p className="text-[9px] text-neutral-400">
                      * Clique acima para conferir a liberação das receitas simuladas.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 3: Success Unveiled */}
              {checkoutStep === 'success' && (
                <div className="space-y-4 pt-1 text-left">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center space-y-1.5">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-xs font-bold">
                      ✓
                    </div>
                    <h4 className="font-bold text-[11px] text-emerald-800 uppercase tracking-widest">
                      Diagnóstico Unlocked!
                    </h4>
                    <p className="text-xs text-emerald-700 leading-snug font-light">
                      Parabéns, {answers.name}! Ativamos seu cronograma alimentar. Guarde essas proporções indicadas:
                    </p>
                  </div>

                  <div className="space-y-4 bg-[#FCF8F8] border border-pink-100 rounded-2xl p-4 text-xs leading-relaxed max-h-[220px] overflow-y-auto">
                    <div className="border-b border-pink-100 pb-1.5 flex items-center justify-between">
                      <span className="font-bold text-slate-800">📋 PROTOCOLO DIÁRIO</span>
                      <span className="text-[8px] font-mono bg-pink-100 text-pink-700 px-2 py-0.5 rounded font-bold uppercase">
                        {answers.age.includes('60') || answers.timeSuffering.includes('3') ? 'Grau Severo' : answers.age.includes('50') || answers.age.includes('40') ? 'Grau Moderado' : 'Grau Inicial'}
                      </span>
                    </div>

                    <div className="space-y-3 font-light text-slate-700">
                      <div className="space-y-0.5">
                        <span className="font-bold text-pink-600 block text-[10px] uppercase tracking-wide">🥣 O TRUQUE DE MANHÃ:</span>
                        <p>
                          Dissolver <strong>15g de gelatina neutra sem sabor</strong> em <strong>120ml de água morna</strong>. Adicione <strong>4 gotas de suco de limão puro</strong> (rico em vitamina C que duplica a absorção da prolina e lisina na derme). Consumir em jejum imediato todo dia pela manhã.
                        </p>
                      </div>

                      <div className="space-y-0.5">
                        <span className="font-bold text-pink-600 block text-[10px] uppercase tracking-wide">🧴 COMPRESSA PLÁSTICA NOTURNA:</span>
                        <p>
                          Misturar 2 colheres de sopa de <strong>gelatina solúvel hidratada</strong> com 1 colher de <strong>óleo de rosa mosqueta</strong>. Aplicar suavemente na barriga em movimentos circulares ascendentes por 5 minutos à noite, cobrindo com plástico filme por 15 minutos antes de remover com água fria.
                        </p>
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-pink-100 space-y-1 text-[11px]">
                        <span className="font-semibold text-rose-700 uppercase block">💡 RECOMENDAÇÃO EXCLUSIVA PARA {answers.name.toUpperCase()}:</span>
                        <p className="font-light text-neutral-600 leading-snug">
                          {answers.situation.includes('filho') 
                            ? "Por ter histórico de gestação, o colágeno deve ser tomado de estômago totalmente vazio e você deve evitar massagear forte a derme cicatrizada." 
                            : answers.situation.includes('Emagreci') 
                            ? "Para sustentação pós-emagrecimento rápido, priorize as compressas externas 3x por semana para forçar o recolhimento natural do excesso de pele." 
                            : "Por ser flacidez de origem etária, reduza o consumo de açúcar refinado nos próximos 14 dias para mitigar a glicação das novas fibras."}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setShowCheckoutModal(false);
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs tracking-widest uppercase shadow-md transition active:scale-95 cursor-pointer text-center"
                  >
                    Fechar e Ver Meu Painel
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        )}

        </div>
      </main>

      {/* Footer information section */}
      <footer className="mt-auto bg-neutral-900 text-neutral-400 text-[11px] font-light py-8 px-4 border-t border-neutral-800 text-center space-y-4 font-mono">
        <div className="max-w-md mx-auto space-y-2">
          <p>© 2026 Truque da Gelatina. Todos os direitos reservados.</p>
          <div className="flex justify-center gap-3 text-[10px] text-neutral-500 font-sans pt-1">
            <a href="#termos" className="hover:underline">Termos de Uso</a>
            <span>•</span>
            <a href="#privacidade" className="hover:underline">Privacidade</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Collating dynamic age loss index representation
function collagenDeficitPercentage(age: string): number {
  if (age === 'Menos de 30 anos') return 18;
  if (age === '30-39') return 34;
  if (age === '40-49') return 48;
  if (age === '50-59') return 67;
  return 82; // 60+
}

// Interactive dynamic Loading screen sequence for 10 seconds
interface LoadingProps {
  answers: QuizAnswers;
  onComplete: () => void;
}

function QuizLoadingSequence({ answers, onComplete }: LoadingProps) {
  const [progress, setProgress] = useState(0);
  const [activePhraseIdx, setActivePhraseIdx] = useState(0);

  const phrases = [
    `Conectando com o banco de dados de diagnóstico...`,
    "Cruzando faixa de idade com taxa de déficit de colágeno...",
    "Mapeando o estiramento das fibras de elastina na derme profunda...",
    "Analisando fatores de impacto diários (hidratação, sono e alimentação)...",
    "Fidelizando parâmetros e estruturando seu laudo científico...",
    "Processando dosagem individual da fórmula natural do Truque...",
    "Quase pronto! Liberando acesso para impressão do laudo..."
  ];

  useEffect(() => {
    // Progress goes from 0 to 100 over exactly 10 seconds
    const totalTimeMs = 10000;
    const intervalMs = 100;
    const increment = 100 / (totalTimeMs / intervalMs);

    let currentProgress = 0;
    const timer = setInterval(() => {
      currentProgress += increment;
      if (currentProgress >= 100) {
        clearInterval(timer);
        setProgress(100);
        onComplete();
      } else {
        setProgress(Math.floor(currentProgress));
        
        // Change phrase dynamically based on progress milestones
        const index = Math.floor((currentProgress / 100) * phrases.length);
        if (index < phrases.length) {
          setActivePhraseIdx(index);
        }
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6 text-center max-w-md mx-auto p-4 flex flex-col items-center justify-center">
      
      {/* Round clinical pink loader */}
      <div className="relative w-36 h-36 flex items-center justify-center bg-rose-50 rounded-full border-4 border-pink-100 shadow-md animate-pulse">
        <div className="w-28 h-28 rounded-full border-4 border-dashed border-rose-400 animate-spin flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-rose-500 animate-bounce" />
        </div>
        <div className="absolute inset-x-0 bottom-4 text-center">
          <span className="text-xs font-black text-rose-800 tracking-wider uppercase bg-pink-100/80 px-2.5 py-1 rounded-full">
            Processando
          </span>
        </div>
      </div>

      <div className="space-y-4 w-full bg-white border border-pink-100 rounded-3xl p-6 shadow-md">
        <h3 className="font-sans font-black text-slate-800 text-lg sm:text-xl leading-snug">
          Análise de Flacidez Ativa 🧠
        </h3>

        {/* Dynamic sliding phrase */}
        <p className="text-sm text-pink-600 font-bold tracking-wide h-12 flex items-center justify-center transition-all px-2 bg-pink-50/30 rounded-xl leading-relaxed">
          {phrases[activePhraseIdx]}
        </p>

        {/* Outer and Inner Progress visual */}
        <div className="space-y-2">
          <div className="w-full bg-rose-50 h-4 rounded-full overflow-hidden border-2 border-pink-100 p-0.5">
            <div 
              className="bg-gradient-to-r from-pink-500 to-rose-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center text-xs font-mono font-bold text-slate-450">
            <span>AVALIAÇÃO INTEGRADA</span>
            <span className="text-sm font-black text-rose-600 font-sans">{progress}% OK</span>
          </div>
        </div>
      </div>

      {/* Dynamic Results showing up on-the-fly while loading */}
      <div className="w-full text-left bg-white border-2 border-pink-100/70 rounded-3xl p-5 space-y-4 shadow-sm">
        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-pink-50 pb-2 flex items-center gap-1.5">
          <Check className="w-4 h-4 text-emerald-500 stroke-[3]" /> Resultados Detectados em Tempo Real:
        </h4>
        
        <div className="space-y-3 font-sans text-sm sm:text-base">
          {/* Result 1: Patient Name */}
          <div className="flex items-center justify-between text-slate-700 bg-pink-50/20 px-3 py-1.5 rounded-xl border border-pink-50/50">
            <span className="font-semibold flex items-center gap-1.5">
              👤 Paciente Identificado:
            </span>
            <span className="font-black text-slate-900 uppercase">{answers.name}</span>
          </div>

          {/* Result 2: Collagen Deficiency based on age */}
          {progress >= 15 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between text-slate-700 bg-pink-50/20 px-3 py-1.5 rounded-xl border border-pink-50/50 transition-all font-sans"
            >
              <span className="font-semibold flex items-center gap-1.5">
                📉 Perda Celular de Colágeno:
              </span>
              <span className="font-black text-rose-600">{collagenDeficitPercentage(answers.age)}% (Crítico)</span>
            </motion.div>
          )}

          {/* Result 3: Belly type identified */}
          {progress >= 38 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between text-slate-700 bg-pink-50/20 px-3 py-1.5 rounded-xl border border-pink-50/50 transition-all"
            >
              <span className="font-semibold flex items-center gap-1.5">
                👙 Tipo de Flacidez Corporal:
              </span>
              <span className="font-black text-rose-800">
                {answers.bellyType ? answers.bellyType.split('(')[0].trim() : "Flacidez Típica"}
              </span>
            </motion.div>
          )}

          {/* Result 4: Root Cause analyzed */}
          {progress >= 65 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between text-slate-700 bg-pink-55/20 px-3 py-1.5  rounded-xl border border-pink-50/50 transition-all text-xs sm:text-sm"
            >
              <span className="font-semibold flex items-center gap-1.5 leading-snug">
                🧬 Agente Causador da Flacidez:
              </span>
              <span className="font-black text-slate-800 text-right leading-snug max-w-[200px]">
                {answers.situation.includes('filho') ? 'Fatores Pós-Parto/Gestação' : answers.situation.includes('Emagreci') ? 'Redução Rápida de Peso' : 'Sintoma Etário Natural'}
              </span>
            </motion.div>
          )}

          {/* Result 5: Healthy lifestyle audit completed */}
          {progress >= 85 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between text-emerald-700 bg-emerald-50/40 px-3 py-2 rounded-xl border border-emerald-100 transition-all text-sm font-bold"
            >
              <span className="flex items-center gap-1.5">
                ⚡ Plano de Dosagem Personalizado:
              </span>
              <span className="uppercase font-black text-emerald-600">Calculado 100% ✅</span>
            </motion.div>
          )}
        </div>
      </div>

      <div className="text-[10px] sm:text-xs text-neutral-400 font-medium flex items-center gap-1 justify-center">
        <Smartphone className="w-3.5 h-3.5 text-neutral-300" /> Truque da Gelatina Labs • IA Diagnostic Integrator v2.7
      </div>
    </div>
  );
}
