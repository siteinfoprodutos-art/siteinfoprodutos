import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  Download, 
  Upload, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  User, 
  Sparkles, 
  Check, 
  AlertTriangle,
  FileJson
} from 'lucide-react';
import { FitnessState, UserFitnessProfile, FitnessGoal, WorkoutLocation, ExperienceLevel, DaysPerWeek } from '../types';
import { FitnessStorageService } from '../services/fitnessStorage';
import { generateWorkoutRoutines } from '../services/workoutTemplates';

interface SettingsModalProps {
  state: FitnessState;
  onUpdateState: (newState: FitnessState) => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  state,
  onUpdateState,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'perfil' | 'dados' | 'sobre'>('perfil');

  // Form State
  const [name, setName] = useState<string>(state.profile.name);
  const [goal, setGoal] = useState<FitnessGoal>(state.profile.goal);
  const [targetWeightKg, setTargetWeightKg] = useState<number>(state.profile.targetWeightKg);
  const [experience, setExperience] = useState<ExperienceLevel>(state.profile.experience);
  const [location, setLocation] = useState<WorkoutLocation>(state.profile.location);
  const [daysPerWeek, setDaysPerWeek] = useState<DaysPerWeek>(state.profile.daysPerWeek);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(state.soundEnabled);

  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [importError, setImportError] = useState<string | null>(null);

  const handleSaveProfile = () => {
    const updatedProfile: UserFitnessProfile = {
      ...state.profile,
      name: name.trim() || 'Atleta',
      goal,
      targetWeightKg: Number(targetWeightKg) || state.profile.targetWeightKg,
      experience,
      location,
      daysPerWeek,
      updatedAt: new Date().toISOString(),
    };

    // If goal, location, or days changed, update workout routines
    const routinesChanged =
      goal !== state.profile.goal ||
      location !== state.profile.location ||
      daysPerWeek !== state.profile.daysPerWeek;

    const newRoutines = routinesChanged
      ? generateWorkoutRoutines(goal, experience, location, daysPerWeek)
      : state.routines;

    const updatedState: FitnessState = {
      ...state,
      profile: updatedProfile,
      routines: newRoutines,
      soundEnabled,
    };

    FitnessStorageService.saveState(updatedState);
    onUpdateState(updatedState);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleExportJSON = () => {
    const jsonStr = FitnessStorageService.exportDataAsJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `al-fitness-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = FitnessStorageService.importDataFromJSON(content);
      if (success) {
        const reloaded = FitnessStorageService.loadState();
        onUpdateState(reloaded);
        setSavedSuccess(true);
        setImportError(null);
      } else {
        setImportError('Arquivo JSON inválido. Certifique-se de usar um backup do AL Fitness.');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (
      window.confirm(
        'Tem certeza que deseja reiniciar seus dados do aplicativo Fitness? Isso apagará seu progresso e reabrirá o questionário inicial.'
      )
    ) {
      const reset = FitnessStorageService.resetState();
      onUpdateState(reset);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-lg bg-[#0b0f19] border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl relative my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-black text-white">Configurações do Fitness</h2>
              <p className="text-[11px] text-slate-400">Preferências, perfil e backup local</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Pills */}
        <div className="flex items-center gap-2 my-4 p-1 bg-slate-900/80 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab('perfil')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'perfil'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Meu Perfil
          </button>
          <button
            onClick={() => setActiveTab('dados')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'dados'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Backup & Dados
          </button>
          <button
            onClick={() => setActiveTab('sobre')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'sobre'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sobre o App
          </button>
        </div>

        {/* TAB 1: PERFIL */}
        {activeTab === 'perfil' && (
          <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-1">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Nome / Apelido</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Objetivo Físico</label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value as FitnessGoal)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 capitalize"
                >
                  <option value="emagrecer">Emagrecer</option>
                  <option value="hipertrofia">Ganhar Massa Muscular</option>
                  <option value="forca">Ficar Mais Forte</option>
                  <option value="definicao">Definir o Corpo</option>
                  <option value="condicionamento">Condicionamento Físico</option>
                  <option value="saude">Saúde & Disposição</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Peso Desejado (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={targetWeightKg}
                  onChange={(e) => setTargetWeightKg(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Onde Treina</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value as WorkoutLocation)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 capitalize"
                >
                  <option value="academia">Academia</option>
                  <option value="casa">Em Casa</option>
                  <option value="ar_livre">Ao Ar Livre</option>
                  <option value="estudio">Estúdio / Box</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Dias Disponíveis</label>
                <select
                  value={daysPerWeek}
                  onChange={(e) => setDaysPerWeek(Number(e.target.value) as DaysPerWeek)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value={2}>2 dias por semana</option>
                  <option value={3}>3 dias por semana</option>
                  <option value={4}>4 dias por semana</option>
                  <option value={5}>5 dias por semana</option>
                  <option value={6}>6 dias por semana</option>
                </select>
              </div>
            </div>

            {/* Sound toggle */}
            <div className="flex items-center justify-between p-3 bg-slate-900/60 border border-slate-800 rounded-2xl">
              <div className="flex items-center gap-2.5">
                {soundEnabled ? (
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <VolumeX className="w-4 h-4 text-slate-500" />
                )}
                <div>
                  <div className="text-xs font-bold text-white">Efeitos Sonoros & Timer</div>
                  <div className="text-[10px] text-slate-400">Alertas de descanso e conquistas</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  soundEnabled ? 'bg-emerald-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    soundEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <button
              type="button"
              id="fitness-save-profile-btn"
              onClick={handleSaveProfile}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/20 hover:opacity-95 transition-all flex items-center justify-center gap-2"
            >
              {savedSuccess ? <Check className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
              <span>{savedSuccess ? 'Perfil Salvo com Sucesso!' : 'Salvar Alterações'}</span>
            </button>
          </div>
        )}

        {/* TAB 2: DADOS & BACKUP */}
        {activeTab === 'dados' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-400">
              Todos os seus treinos, peso, medidas e fotos são salvos com privacidade total
              direto no armazenamento local do seu dispositivo.
            </p>

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={handleExportJSON}
                className="w-full flex items-center justify-between p-3.5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl text-left transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Download className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Exportar Backup Completo</div>
                    <div className="text-[10px] text-slate-400">Baixar arquivo JSON com histórico e dados</div>
                  </div>
                </div>
                <FileJson className="w-4 h-4 text-slate-500" />
              </button>

              <label className="w-full flex items-center justify-between p-3.5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl text-left transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <Upload className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Restaurar / Importar Backup</div>
                    <div className="text-[10px] text-slate-400">Carregar arquivo JSON previamente exportado</div>
                  </div>
                </div>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportJSON}
                  className="hidden"
                />
                <FileJson className="w-4 h-4 text-slate-500" />
              </label>
            </div>

            {importError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{importError}</span>
              </div>
            )}

            {/* Reset */}
            <div className="pt-3 border-t border-slate-800/80">
              <button
                type="button"
                onClick={handleReset}
                className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 text-xs font-bold transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reiniciar Aplicativo Fitness</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: SOBRE */}
        {activeTab === 'sobre' && (
          <div className="space-y-3 text-xs text-slate-300">
            <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-1.5">
              <div className="font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                AL Fitness & Evolução v1.0
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Aplicativo unissex de desenvolvimento físico e musculação gamificado. Criado para
                ajudar você a manter consistência, registrar treinos, progredir cargas e acompanhar
                sua evolução real com base em metas claras.
              </p>
            </div>

            <div className="space-y-1 text-[11px] text-slate-400">
              <div>• 100% Offline e Privado via Armazenamento Local</div>
              <div>• Sem custos operacionais ou APIs pagas</div>
              <div>• Compatível com Mobile-First e PWA</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
