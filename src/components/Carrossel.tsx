import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Eye, Sparkles } from 'lucide-react';

export default function Carrossel() {
  const images = [
    {
      url: 'https://rpfqtfsdfmxgdlzxtkhd.supabase.co/storage/v1/object/public/videos/infogelatina/1depogelatina.jpeg',
      label: "Caso Real 1 - Menos flacidez e pele rejuvenescida"
    },
    {
      url: 'https://rpfqtfsdfmxgdlzxtkhd.supabase.co/storage/v1/object/public/videos/infogelatina/2depogelatina.jpeg',
      label: "Caso Real 2 - Recuperação de firmeza na barriga"
    },
    {
      url: 'https://rpfqtfsdfmxgdlzxtkhd.supabase.co/storage/v1/object/public/videos/infogelatina/3depogelatina.jpeg',
      label: "Caso Real 3 - Pele envelhecida e flácida regenerada"
    },
    {
      url: 'https://rpfqtfsdfmxgdlzxtkhd.supabase.co/storage/v1/object/public/videos/infogelatina/4depogelatina.jpg',
      label: "Caso Real 4 - Restauração da sustentabilidade"
    },
    {
      url: 'https://rpfqtfsdfmxgdlzxtkhd.supabase.co/storage/v1/object/public/videos/infogelatina/5depogelatina.jpg',
      label: "Caso Real 5 - Redução expressiva de flacidez"
    },
    {
      url: 'https://rpfqtfsdfmxgdlzxtkhd.supabase.co/storage/v1/object/public/videos/infogelatina/6depogelatina.jpg',
      label: "Caso Real 6 - Firmeza profunda reestabelecida"
    },
    {
      url: 'https://rpfqtfsdfmxgdlzxtkhd.supabase.co/storage/v1/object/public/videos/infogelatina/7depogelatina.jpg',
      label: "Caso Real 7 - Recuperação da pele pós-parto"
    },
    {
      url: 'https://rpfqtfsdfmxgdlzxtkhd.supabase.co/storage/v1/object/public/videos/infogelatina/8depogelatina.jpg',
      label: "Caso Real 8 - Nutrição elástica restaurada"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scrolling interval that does NOT stop, keeps scrolling indefinitely
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [images.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-pink-100 bg-white p-3 shadow-md">
      
      {/* Floating Sparkle Badge */}
      <div className="absolute top-5 right-5 z-20 flex items-center gap-1 bg-rose-500 text-white text-[10px] uppercase font-bold py-1 px-2.5 rounded-full shadow-sm">
        <Sparkles className="w-3 h-3 text-yellow-200 animate-spin" />
        <span>Casos Reais</span>
      </div>

      <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-neutral-900 group">
        
        {/* Images sliding container */}
        <div 
          className="flex h-full w-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, idx) => (
            <div key={idx} className="relative h-full w-full shrink-0">
              <img
                src={img.url}
                alt={img.label}
                className="h-full w-full object-contain bg-neutral-950"
                referrerPolicy="no-referrer"
              />
              
              {/* Soft overlay on images bottom has been removed as requested */}
            </div>
          ))}
        </div>

        {/* Swipe arrow controls */}
        <button 
          onClick={handlePrev}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-rose-600 transition shadow hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>
        <button 
          onClick={handleNext}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-rose-600 transition shadow hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

      {/* Manual Indicator selection dots */}
      <div className="flex justify-center items-center gap-1.5 mt-3">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              idx === currentIndex 
                ? 'w-5 h-2 bg-rose-500' 
                : 'w-2 h-2 bg-pink-200 hover:bg-pink-300'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
