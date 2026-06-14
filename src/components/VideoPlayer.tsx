import { useState, useEffect, memo } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles } from 'lucide-react';

interface VideoPlayerProps {
  videoId: 'landing' | 'sales';
  onFinished?: () => void;
  countdownSeconds?: number;
}

function VideoPlayer({ videoId, onFinished, countdownSeconds }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState(videoId === 'landing' ? '1:15' : '3:45');
  const [activeSlide, setActiveSlide] = useState(0);

  // Dynamic script injection for SmartPlayer on landing/sales page
  useEffect(() => {
    const scriptId = 'converteai-sdk-main';
    if (!document.getElementById(scriptId)) {
      const s = document.createElement("script");
      s.id = scriptId;
      s.src = "https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js";
      s.async = true;
      document.head.appendChild(s);
    }
  }, []);

  if (videoId === 'landing') {
    const embedSrc = `https://scripts.converteai.net/ceaefeeb-feef-4b52-8911-9ec9de0d5b6b/players/6a2c3ecad33ef46eda9bfbc7/v4/embed.html${window.location.search || '?'}&vl=${encodeURIComponent(window.location.href)}`;
    
    return (
      <div id="ifr_6a2c3ecad33ef46eda9bfbc7_wrapper" className="mx-auto w-full rounded-2xl overflow-hidden shadow-xl border-2 border-rose-100 bg-black"> 
        <div className="relative pt-[56.33802816901409%] w-full h-0" id="ifr_6a2c3ecad33ef46eda9bfbc7_aspect"> 
          <iframe 
            frameBorder="0" 
            allowFullScreen 
            src={embedSrc} 
            id="ifr_6a2c3ecad33ef46eda9bfbc7" 
            className="absolute top-0 left-0 w-full h-full" 
            referrerPolicy="origin"
          /> 
        </div> 
      </div>
    );
  }

  if (videoId === 'sales') {
    const embedSrc = `https://scripts.converteai.net/ceaefeeb-feef-4b52-8911-9ec9de0d5b6b/players/6a2f32175e877cc41917a181/v4/embed.html${window.location.search || '?'}&vl=${encodeURIComponent(window.location.href)}`;
    
    return (
      <div id="ifr_6a2f32175e877cc41917a181_wrapper" className="mx-auto w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-pink-100 bg-black"> 
        <div className="relative pt-[75%] w-full h-0" id="ifr_6a2f32175e877cc41917a181_aspect"> 
          <iframe 
            frameBorder="0" 
            allowFullScreen 
            src={embedSrc} 
            id="ifr_6a2f32175e877cc41917a181" 
            className="absolute top-0 left-0 w-full h-full" 
            referrerPolicy="origin"
          /> 
        </div> 
      </div>
    );
  }

  // Simple slides for the custom video simulation to make it look active & real!
  const landingSlides = [
    { title: "MÉTODO NATURAL", highlight: "Descoberta Científica", subtitle: "Reorganização das fibras profundas da pele por dentro" },
    { title: "TRUQUE COLÁGENO", highlight: "Gelatina Lisa", subtitle: "Como repor 420% mais eficácia de absorção cellular" },
    { title: "TRANSFORMAÇÃO", highlight: "Barriga Lisa em Dias", subtitle: "Efeito lifting imediato e duradouro sem cirurgia" }
  ];

  const salesSlides = [
    { title: "APLICAÇÃO PRÁTICA", highlight: "Protocolo Diário", subtitle: "Preparos de 5 minutos que reativam o tecido mole" },
    { title: "O SEGREDO", highlight: "Ingredientes Sinérgicos", subtitle: "Como multiplicar a firmeza acelerando a derme" },
    { title: "DIAGNÓSTICO LIBERADO", highlight: "Seu Guia Pronto", subtitle: "Cronograma de aplicação por nível de flacidez" },
    { title: "GARANTIA TOTAL", highlight: "Risco Zero", subtitle: "Sua pele rejuvenescida ou seu dinheiro de volta" }
  ];

  const slides = salesSlides;
  const totalDurationSeconds = 225;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            if (onFinished) onFinished();
            return 100;
          }
          const nextProgress = prev + (100 / totalDurationSeconds);
          
          // Speed up slide changes dynamically based on progress
          const sliceSize = 100 / slides.length;
          const currentSlideIndex = Math.floor(nextProgress / sliceSize);
          if (currentSlideIndex < slides.length) {
            setActiveSlide(currentSlideIndex);
          }

          // Format current time
          const elapsedSecs = Math.floor((nextProgress / 100) * totalDurationSeconds);
          const mins = Math.floor(elapsedSecs / 60);
          const secs = elapsedSecs % 60;
          setCurrentTime(`${mins}:${secs < 10 ? '0' : ''}${secs}`);

          return nextProgress;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative w-full aspect-video bg-neutral-950 rounded-2xl overflow-hidden shadow-xl border-2 border-rose-100 flex flex-col justify-between group">
      
      {/* Dynamic Animated Content of the presentation video */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none bg-gradient-to-br from-rose-950 via-neutral-900 to-pink-950">
        
        {/* Animated Background Molecules for that scientific skin matrix look */}
        <div className="absolute inset-0 opacity-15 overflow-hidden pointer-events-none">
          <div className="absolute w-32 h-32 rounded-full border border-pink-500 top-4 left-4 animate-ping duration-[6s]"></div>
          <div className="absolute w-44 h-44 rounded-full border border-rose-400 bottom-6 right-8 animate-pulse duration-[8s]"></div>
          <div className="absolute w-20 h-20 rounded-full bg-pink-500 top-1/2 left-1/3 filter blur-2xl animate-pulse"></div>
        </div>

        {/* Video stream content */}
        {isPlaying ? (
          <div className="relative z-10 space-y-3 transition-all duration-500 transform scale-100">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold bg-rose-500/95 text-white animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span> TRANSMISSÃO EXCLUSIVA
            </span>
            <div className="space-y-1">
              <div className="text-rose-300 text-xs font-semibold tracking-wide uppercase font-sans">
                {slides[activeSlide]?.title}
              </div>
              <h4 className="text-xl md:text-2xl font-serif text-white font-semibold">
                "{slides[activeSlide]?.highlight}"
              </h4>
              <p className="text-neutral-300 text-xs font-light max-w-xs mx-auto">
                {slides[activeSlide]?.subtitle}
              </p>
            </div>

            {/* Simulated molecular skin cross-section illustration */}
            <div className="flex justify-center gap-3 mt-2">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full border border-rose-400 bg-rose-500/20 flex items-center justify-center text-rose-300 text-[10px] font-bold animate-spin duration-[10s]">
                  H₂O
                </div>
                <span className="text-[8px] text-neutral-400 mt-0.5">Hidratação</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full border border-pink-400 bg-pink-500/20 flex items-center justify-center text-pink-300 text-[10px] font-bold animate-pulse">
                  🧬
                </div>
                <span className="text-[8px] text-neutral-400 mt-0.5">Colágeno</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full border border-white/20 bg-rose-600/30 flex items-center justify-center text-white text-[10px] font-bold">
                  <Sparkles className="w-4.5 h-4.5 text-pink-300 animate-bounce" />
                </div>
                <span className="text-[8px] text-neutral-400 mt-0.5">Gelatina</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative z-10 flex flex-col items-center justify-center space-y-4">
            <button
              onClick={togglePlay}
              className="w-16 h-16 rounded-full bg-rose-500 hover:bg-rose-600 flex items-center justify-center ml-1 text-white shadow-lg shadow-rose-500/50 hover:scale-105 transition active:scale-95 cursor-pointer glow-btn"
              id={`${videoId}-play-trigger`}
            >
              <Play className="w-7 h-7 fill-white translate-x-0.5" />
            </button>
            <div className="space-y-1">
              <div className="text-sm font-semibold text-rose-200 tracking-wide">
                CLIQUE PARA ASSISTIR
              </div>
              <p className="text-xs text-neutral-400 max-w-xs px-4">
                Assista para liberar o cronograma prático calculado para o seu perfil.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Warning watermark */}
      <div className="p-3 absolute top-0 left-0 w-full flex justify-between items-center pointer-events-none z-10">
        <div className="bg-black/40 backdrop-blur-md px-2 py-0.5 rounded text-[9px] font-mono text-pink-200">
          CONTEÚDO INDIVIDUAL
        </div>
        {isMuted && (
          <div className="bg-red-500/80 px-2 py-0.5 rounded text-[9px] font-bold text-white uppercase tracking-wider animate-bounce">
            Sem Áudio? Clique no alto-falante abaixo!
          </div>
        )}
      </div>

      {/* Video Controls bar at the bottom */}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-black/0 px-3 py-2.5 flex flex-col gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity z-10">
        {/* Progress Bar */}
        <div className="relative w-full h-1 bg-neutral-700 rounded-full overflow-hidden cursor-pointer" onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const pct = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
          setProgress(pct);
          setIsPlaying(true);
        }}>
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Action controls */}
        <div className="flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-3">
            <button onClick={togglePlay} className="hover:text-pink-300 transition-colors cursor-pointer" id={`${videoId}-play-btn`}>
              {isPlaying ? <Pause className="w-4.5 h-4.5 text-white" /> : <Play className="w-4.5 h-4.5 text-white fill-white" />}
            </button>
            <span className="font-mono text-[10px] text-neutral-300">
              {currentTime} / {duration}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={toggleMute} className="hover:text-pink-300 transition-colors cursor-pointer" id={`${videoId}-mute-btn`}>
              {isMuted ? <VolumeX className="w-4.5 h-4.5 text-rose-400" /> : <Volume2 className="w-4.5 h-4.5 text-white" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(VideoPlayer, (prev, next) => prev.videoId === next.videoId);
