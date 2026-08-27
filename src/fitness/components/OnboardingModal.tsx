import React, { useState } from 'react';
import { 
  Sparkles, 
  Flame, 
  Target, 
  Dumbbell, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Zap, 
  Heart, 
  Activity, 
  TrendingDown, 
  ShieldCheck,
  Building,
  Home as HomeIcon,
  Sun
} from 'lucide-react';
import { FitnessGoal, Gender, ExperienceLevel, WorkoutLocation, DaysPerWeek, UserFitnessProfile } from '../types';

interface OnboardingModalProps {
  onComplete: (profile: Partial<UserFitnessProfile>) => void;
  initialProfile?: UserFitnessProfile;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ onComplete, initialProfile }) => {
  const [step, setStep] = useState<number>(1);

  // Form State
  const [goal, setGoal] = useState<FitnessGoal>(initialProfile?.goal || 'emagrecer');
  const [name, setName] = useState<string>(initialProfile?.name || '');
  const [gender, setGender] = useState<Gender>(initialProfile?.gender || 'masculino');
  const [age, setAge] = useState<number>(initialProfile?.age || 26);
  const [heightCm, setHeightCm] = useState<number>(initialProfile?.heightCm || 175);
  const [startWeightKg, setStartWeightKg] = useState<number>(initialProfile?.startWeightKg || 78);
  const [targetWeightKg, setTargetWeightKg] = useState<number>(initialProfile?.targetWeightKg || 72);
  const [experience, setExperience] = useState<ExperienceLevel>(initialProfile?.experience || 'iniciante');
  const [location, setLocation] = useState<WorkoutLocation>(initialProfile?.location || 'academia');
  const [daysPerWeek, setDaysPerWeek] = useState<DaysPerWeek>(initialProfile?.daysPerWeek || 4);

  const totalSteps = 4;

  const goalOptions = [
    {
      id: 'emagrecer' as FitnessGoal,
      title: 'Emagrecer',
      subtitle: 'Reduzir gordura corporal e afinar medidas com saúde',
      icon: TrendingDown,
      color: 'from-amber-500/20 to-orange-500/20 text-orange-400 border-orange-500/30',
    },
    {
      id: 'hipertrofia' as FitnessGoal,
      title: 'Ganhar Massa Muscular',
      subtitle: 'Aumentar volume, densidade e definição muscular',
      icon: Dumbbell,
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
    },
    {
      id: 'forca' as FitnessGoal,
      title: 'Ficar Mais Forte',
      subtitle: 'Progressão expressiva de cargas e recordes pessoais',
      icon: Zap,
      color: 'from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/30',
    },
    {
      id: 'definicao' as FitnessGoal,
      title: 'Definir o Corpo',
      subtitle: 'Evidenciar o abdômen e linhas musculares desenhadas',
      icon: Flame,
      color: 'from-pink-500/20 to-rose-500/20 text-pink-400 border-pink-500/30',
    },
    {
      id: 'condicionamento' as FitnessGoal,
      title: 'Condicionamento Físico',
      subtitle: 'Resistência aeróbica, fôlego e agilidade funcional',
      icon: Activity,
      color: 'from-cyan-500/20 to-sky-500/20 text-cyan-400 border-cyan-500/30',
    },
    {
      id: 'saude' as FitnessGoal,
      title: 'Saúde & Disposição',
      subtitle: 'Mais energia diária, longevidade e bem-estar total',
      icon: Heart,
      color: 'from-violet-500/20 to-purple-500/20 text-violet-400 border-violet-500/30',
    },
  ];

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete({
        name: name.trim() || 'Atleta',
        gender,
        age: Number(age) || 25,
        heightCm: Number(heightCm) || 175,
        startWeightKg: Number(startWeightKg) || 75,
        currentWeightKg: Number(startWeightKg) || 75,
        targetWeightKg: Number(targetWeightKg) || (goal === 'emagrecer' ? Number(startWeightKg) - 5 : Number(startWeightKg) + 5),
        goal,
        experience,
        location,
        daysPerWeek,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-lg bg-[#0b0f19] border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl relative my-auto">
        {/* Progress header */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold mb-2">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" />
              Configuração da Sua Jornada
            </span>
            <span>Passo {step} de {totalSteps}</span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300 rounded-full"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* STEP 1: OBJETIVO */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Qual é o seu objetivo principal?
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                O aplicativo e suas missões diárias se adaptarão automaticamente à sua meta.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[50vh] overflow-y-auto pr-1">
              {goalOptions.map((opt) => {
                const Icon = opt.icon;
                const isSelected = goal === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setGoal(opt.id)}
                    className={`flex items-start gap-3 p-3.5 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? `bg-gradient-to-br ${opt.color} border-emerald-500 ring-2 ring-emerald-500/20`
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className={`p-2 rounded-xl bg-slate-950/60 border border-slate-800 shrink-0 ${isSelected ? 'text-emerald-400' : 'text-slate-400'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-white block">{opt.title}</span>
                        {isSelected && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">{opt.subtitle}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: DADOS CORPORAIS */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Seus dados corporais
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Usados para calcular sua linha do tempo e marcos de evolução.
              </p>
            </div>

            <div className="space-y-3.5 max-h-[55vh] overflow-y-auto pr-1">
              {/* Nome */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Como quer ser chamado?</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome ou apelido"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Sexo */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Sexo Biológico</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'masculino', label: 'Masculino' },
                    { id: 'feminino', label: 'Feminino' },
                    { id: 'outro', label: 'Outro / Neutro' },
                  ].map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setGender(g.id as Gender)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                        gender === g.id
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Idade e Altura */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Idade</label>
                  <div className="relative">
                    <input
                      type="number"
                      min={12}
                      max={99}
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-slate-500">anos</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Altura</label>
                  <div className="relative">
                    <input
                      type="number"
                      min={100}
                      max={240}
                      value={heightCm}
                      onChange={(e) => setHeightCm(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-slate-500">cm</span>
                  </div>
                </div>
              </div>

              {/* Peso Inicial e Meta */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Peso Atual</label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={startWeightKg}
                      onChange={(e) => setStartWeightKg(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-slate-500">kg</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Peso Desejado</label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={targetWeightKg}
                      onChange={(e) => setTargetWeightKg(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-slate-500">kg</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: EXPERIÊNCIA & LOCAL */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Nível & Local de Treino
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Personalizamos as rotinas para os equipamentos que você tem.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Experiência com Treinos</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'iniciante', label: 'Iniciante', desc: 'Até 6 meses' },
                    { id: 'intermediario', label: 'Intermediário', desc: '6m a 2 anos' },
                    { id: 'avancado', label: 'Avançado', desc: '2+ anos' },
                  ].map((exp) => (
                    <button
                      key={exp.id}
                      type="button"
                      onClick={() => setExperience(exp.id as ExperienceLevel)}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        experience === exp.id
                          ? 'bg-emerald-500/20 border-emerald-500 text-white'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold">{exp.label}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{exp.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Onde você vai treinar?</label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: 'academia', label: 'Academia', icon: Building, desc: 'Aparelhos, barras e halteres' },
                    { id: 'casa', label: 'Em Casa', icon: HomeIcon, desc: 'Peso do corpo / elásticos' },
                    { id: 'ar_livre', label: 'Ao Ar Livre', icon: Sun, desc: 'Parques, barras e calistenia' },
                    { id: 'estudio', label: 'Estúdio / Box', icon: Dumbbell, desc: 'Funcional e pesos livres' },
                  ].map((loc) => {
                    const LocIcon = loc.icon;
                    const isSelected = location === loc.id;
                    return (
                      <button
                        key={loc.id}
                        type="button"
                        onClick={() => setLocation(loc.id as WorkoutLocation)}
                        className={`flex items-center gap-2.5 p-3 rounded-2xl border text-left transition-all ${
                          isSelected
                            ? 'bg-emerald-500/20 border-emerald-500 text-white'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <LocIcon className={`w-5 h-5 ${isSelected ? 'text-emerald-400' : 'text-slate-400'}`} />
                        <div>
                          <div className="text-xs font-bold">{loc.label}</div>
                          <div className="text-[10px] text-slate-400">{loc.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: FREQUÊNCIA & CONFIRMAÇÃO */}
        {step === 4 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Disponibilidade Semanal
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Quantos dias por semana você consegue se comprometer a treinar?
              </p>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {([2, 3, 4, 5, 6] as DaysPerWeek[]).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDaysPerWeek(d)}
                  className={`py-3.5 rounded-2xl border text-center transition-all ${
                    daysPerWeek === d
                      ? 'bg-emerald-500 border-emerald-400 text-slate-950 font-black shadow-lg shadow-emerald-500/25 scale-105'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 font-bold'
                  }`}
                >
                  <div className="text-base sm:text-lg">{d}x</div>
                  <div className="text-[10px] opacity-80">semana</div>
                </button>
              ))}
            </div>

            {/* Summary card */}
            <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-4 space-y-2 mt-4">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <ShieldCheck className="w-4 h-4" />
                Resumo da Sua Estratégia
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 pt-1">
                <div>• Objetivo: <strong className="text-white capitalize">{goal}</strong></div>
                <div>• Frequência: <strong className="text-white">{daysPerWeek} dias/sem</strong></div>
                <div>• Peso: <strong className="text-white">{startWeightKg}kg ➔ {targetWeightKg}kg</strong></div>
                <div>• Local: <strong className="text-white capitalize">{location}</strong></div>
              </div>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex items-center justify-between gap-3 mt-7 pt-3 border-t border-slate-800/80">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white text-xs font-bold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            id="fitness-onboarding-next-btn"
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/25 hover:opacity-95 transition-all"
          >
            <span>{step === totalSteps ? 'Começar Minha Evolução' : 'Continuar'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
