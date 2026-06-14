import { AlertCircle, Sparkles, TrendingUp, Trophy } from 'lucide-react';

interface DiagnosticChartsProps {
  name: string;
  age: string;
  situation: string;
  timeSuffering: string;
  triedSolutions: string[];
}

export default function DiagnosticCharts({
  name,
  age,
  situation,
  timeSuffering,
  triedSolutions,
}: DiagnosticChartsProps) {
  // Age-based collagen deficit calculation
  let collagenDeficit = 30;
  if (age === 'Menos de 30 anos') collagenDeficit = 18;
  else if (age === '30-39') collagenDeficit = 34;
  else if (age === '40-49') collagenDeficit = 48;
  else if (age === '50-59') collagenDeficit = 67;
  else if (age === 'Mais de 60') collagenDeficit = 82;

  // Elasticity level
  const elasticityScore = Math.max(10, 100 - collagenDeficit - (timeSuffering.includes('3') ? 15 : 5));

  // Ramo diagnostic values
  let recommendationPrefix = "Protocolo Firmeza Moderada";
  let recoveryTimeDays = 14;
  if (collagenDeficit > 60) {
    recommendationPrefix = "Protocolo de Extrema Firmeza";
    recoveryTimeDays = 21;
  } else if (collagenDeficit < 30) {
    recommendationPrefix = "Protocolo Preenchimento Suave";
    recoveryTimeDays = 7;
  }

  return (
    <div className="space-y-6">
      
      {/* Chart 1: Collagen Deficit Gauge */}
      <div className="bg-white rounded-3xl p-5 border border-pink-100 shadow-xs flex flex-col items-center">
        <h4 className="text-base sm:text-lg font-black text-slate-800 tracking-tight text-center mb-1">
          📊 Perda de Sustentação da sua Pele
        </h4>
        <p className="text-xs text-slate-500 text-center mb-5 font-medium">
          Déficit estimado de fisionomia elástica para quem tem {age === 'Menos de 30 anos' ? 'menos de 30' : age} anos
        </p>

        <div className="relative w-40 h-40 flex items-center justify-center bg-pink-50/10 rounded-full p-2">
          {/* Circular SVG Gauge with correct viewBox */}
          <svg viewBox="0 0 160 160" className="w-full h-full transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="68"
              className="stroke-pink-100"
              strokeWidth="10"
              fill="transparent"
            />
            <circle
              cx="80"
              cy="80"
              r="68"
              className="stroke-rose-550 transition-all duration-1000 ease-out"
              strokeWidth="10"
              strokeDasharray={427}
              strokeDashoffset={427 - (427 * collagenDeficit) / 100}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-black text-slate-800 tracking-tight">
              {collagenDeficit}%
            </span>
            <span className="text-[10px] text-rose-600 uppercase tracking-widest font-black mt-0.5">
              Menos Firmeza
            </span>
          </div>
        </div>

        <div className="w-full mt-5 bg-rose-50/50 border border-pink-100 rounded-2xl p-4 text-xs sm:text-sm flex items-start gap-2.5 text-slate-800 font-bold">
          <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Sua situação atual:</strong> A pele da sua barriga está funcionando hoje com apenas <span className="text-rose-600 font-black text-sm">{100 - collagenDeficit}%</span> da sua firmeza original de antes do problema.
          </p>
        </div>
      </div>

      {/* Chart 2: Comparative Elasticity bar (Before vs After) */}
      <div className="bg-white rounded-3xl p-5 border border-pink-100 space-y-4 shadow-xs">
        <h4 className="text-base sm:text-lg font-black text-slate-800 tracking-tight">
          🔋 Firmeza Esperada nos Próximos Dias
        </h4>
        
        <div className="space-y-4">
          {/* current state bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-600">Sua Pele Hoje (Antes do Truque):</span>
              <span className="text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-full font-black">{elasticityScore}%</span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200">
              <div 
                className="bg-slate-400 h-full transition-all duration-1000 rounded-full"
                style={{ width: `${elasticityScore}%` }}
              />
            </div>
          </div>

          {/* projected state bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-rose-600 flex items-center gap-1">
                Após usar o Truque da Gelatina: <Sparkles className="w-4 h-4 text-pink-500 animate-pulse fill-pink-100" />
              </span>
              <span className="text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full font-black">{Math.min(99, elasticityScore + 45)}%</span>
            </div>
            <div className="w-full bg-rose-50 h-3 rounded-full overflow-hidden border border-rose-200">
              <div 
                className="bg-gradient-to-r from-pink-500 via-rose-500 to-rose-600 h-full rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(99, elasticityScore + 45)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-xs sm:text-sm font-bold text-slate-800 flex items-start gap-2.5">
          <TrendingUp className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Recuperação de +{Math.min(99, elasticityScore + 45) - elasticityScore}%:</strong> O efeito dos ingredientes caseiros do Truque da Gelatina ajuda a esticar e recuperar de forma acelerada a sustentação da pele.
          </p>
        </div>
      </div>

      {/* Recommended protocol recommendation */}
      <div className="bg-gradient-to-b from-white to-pink-50/20 rounded-3xl p-5 border border-pink-150 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-rose-100/30 rounded-full translate-x-8 -translate-y-8 pointer-events-none"></div>
        <div className="relative z-10 flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-pink-550/10 flex items-center justify-center text-pink-600 shrink-0 border border-pink-200">
            <Trophy className="w-5 h-5 text-pink-500" />
          </div>
          <div className="space-y-1 w-full text-left">
            <h5 className="text-[10px] tracking-wider uppercase font-black text-rose-500">
              SEU PROTOCOLO RECOMENDADO
            </h5>
            <h4 className="text-base font-black text-slate-800 tracking-tight">
              {recommendationPrefix}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 font-bold leading-relaxed">
              Doses práticas calculadas de acordo com as respostas da sua rotina. Seus primeiros resultados de barriga firme estão previstos para acontecer em apenas <strong>{recoveryTimeDays} dias</strong> usando o protocolo.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
