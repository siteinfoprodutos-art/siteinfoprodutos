import React, { useState } from 'react';
import { 
  TrendingUp, 
  Scale, 
  Ruler, 
  Camera, 
  Trophy, 
  Plus, 
  Calendar, 
  Trash2, 
  Sparkles,
  ArrowRight,
  TrendingDown
} from 'lucide-react';
import { FitnessState, WeightEntry, BodyMeasurements, EvolutionPhoto } from '../types';

interface EvolutionViewProps {
  state: FitnessState;
  onAddWeight: (entry: WeightEntry) => void;
  onAddMeasurements: (entry: BodyMeasurements) => void;
  onAddPhoto: (photo: EvolutionPhoto) => void;
  onDeletePhoto: (photoId: string) => void;
  onOpenQuickLog: () => void;
}

export const EvolutionView: React.FC<EvolutionViewProps> = ({
  state,
  onAddWeight,
  onAddMeasurements,
  onAddPhoto,
  onDeletePhoto,
  onOpenQuickLog,
}) => {
  const [subTab, setSubTab] = useState<'peso' | 'medidas' | 'fotos' | 'forca'>('peso');
  const [photoCaption, setPhotoCaption] = useState<string>('');
  const [photoType, setPhotoType] = useState<'frente' | 'lado' | 'costas' | 'outro'>('frente');

  // Before & After comparison state
  const [compareBeforeId, setCompareBeforeId] = useState<string | null>(state.photos[0]?.id || null);
  const [compareAfterId, setCompareAfterId] = useState<string | null>(
    state.photos[state.photos.length - 1]?.id || null
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const newPhoto: EvolutionPhoto = {
        id: `photo-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        imageDataUrl: dataUrl,
        caption: photoCaption.trim() || undefined,
        weightKg: state.weightHistory[state.weightHistory.length - 1]?.weightKg,
        type: photoType,
      };
      onAddPhoto(newPhoto);
      setPhotoCaption('');
    };
    reader.readAsDataURL(file);
  };

  const weights = state.weightHistory;
  const currentWeight = weights[weights.length - 1]?.weightKg || state.profile.currentWeightKg;
  const startWeight = state.profile.startWeightKg;
  const targetWeight = state.profile.targetWeightKg;

  // Measurement latest vs first
  const measurements = state.measurementsHistory;
  const latestMeasure = measurements[measurements.length - 1];

  const beforePhoto = state.photos.find((p) => p.id === compareBeforeId) || state.photos[0];
  const afterPhoto = state.photos.find((p) => p.id === compareAfterId) || state.photos[state.photos.length - 1];

  return (
    <div className="space-y-5 pb-20 max-w-4xl mx-auto px-3 sm:px-4 pt-3">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">Evolução & Métricas</h2>
              <p className="text-xs text-slate-400">
                Acompanhe dados corporais, registros de força e fotos de transformação
              </p>
            </div>
          </div>
        </div>

        {/* Sub-tabs selector */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-2xl border border-slate-800 self-start sm:self-auto overflow-x-auto max-w-full">
          {[
            { id: 'peso', label: 'Balança & Peso', icon: Scale },
            { id: 'medidas', label: 'Medidas', icon: Ruler },
            { id: 'fotos', label: 'Galeria de Fotos', icon: Camera },
            { id: 'forca', label: 'Recordes de Força', icon: Trophy },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = subTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSubTab(tab.id as 'peso' | 'medidas' | 'fotos' | 'forca')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors shrink-0 ${
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. ABA PESO */}
      {subTab === 'peso' && (
        <div className="space-y-4">
          {/* Summary Bento */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="bg-[#0c111e] border border-slate-800 rounded-2xl p-3.5 text-center">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Inicial</span>
              <div className="text-base sm:text-xl font-black text-slate-300 mt-0.5">{startWeight} kg</div>
            </div>
            <div className="bg-[#0c111e] border-2 border-emerald-500/40 rounded-2xl p-3.5 text-center bg-emerald-950/10">
              <span className="text-[10px] font-black text-emerald-400 uppercase">Atual</span>
              <div className="text-base sm:text-xl font-black text-white mt-0.5">{currentWeight} kg</div>
            </div>
            <div className="bg-[#0c111e] border border-slate-800 rounded-2xl p-3.5 text-center">
              <span className="text-[10px] font-bold text-indigo-400 uppercase">Meta Final</span>
              <div className="text-base sm:text-xl font-black text-indigo-300 mt-0.5">{targetWeight} kg</div>
            </div>
          </div>

          {/* Simple CSS Bar Chart for Weight Timeline */}
          <div className="bg-[#0c111e] border border-slate-800 rounded-3xl p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Scale className="w-4 h-4 text-emerald-400" />
                Histórico de Pesagens ({weights.length} registros)
              </h3>
              <button
                onClick={onOpenQuickLog}
                className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold hover:bg-emerald-500/30 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Nova Pesagem
              </button>
            </div>

            {/* Visual chart bars */}
            <div className="pt-4 pb-2">
              <div className="h-32 flex items-end gap-2 overflow-x-auto pb-2 border-b border-slate-800">
                {weights.slice(-10).map((w, idx) => {
                  const minW = Math.min(...weights.map((i) => i.weightKg)) - 2;
                  const maxW = Math.max(...weights.map((i) => i.weightKg)) + 2;
                  const heightPercent = Math.max(
                    15,
                    Math.round(((w.weightKg - minW) / (maxW - minW || 1)) * 100)
                  );

                  return (
                    <div
                      key={w.id || idx}
                      className="flex-1 min-w-[36px] flex flex-col items-center gap-1.5 group"
                    >
                      <span className="text-[10px] font-mono font-bold text-emerald-400 group-hover:scale-110 transition-transform">
                        {w.weightKg}
                      </span>
                      <div
                        className="w-full rounded-t-lg bg-gradient-to-t from-emerald-600 to-teal-400 opacity-85 group-hover:opacity-100 transition-opacity"
                        style={{ height: `${heightPercent}%` }}
                      />
                      <span className="text-[9px] text-slate-500 truncate w-full text-center">
                        {w.date.slice(5)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* List */}
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {weights.slice().reverse().map((w) => (
                <div
                  key={w.id}
                  className="flex items-center justify-between p-2.5 bg-slate-900/60 rounded-xl border border-slate-800 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">{w.date}</span>
                    {w.notes && <span className="text-slate-500 italic text-[11px]">• {w.notes}</span>}
                  </div>
                  <strong className="text-white font-bold">{w.weightKg} kg</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. ABA MEDIDAS */}
      {subTab === 'medidas' && (
        <div className="bg-[#0c111e] border border-slate-800 rounded-3xl p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-white">Medidas Corporais (Fita Métrica)</h3>
              <p className="text-xs text-slate-400">Acompanhe a redução de cintura e aumento de braços</p>
            </div>
            <button
              onClick={onOpenQuickLog}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold hover:bg-emerald-500/30 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Registrar Medidas
            </button>
          </div>

          {latestMeasure ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {[
                { label: 'Cintura', value: latestMeasure.waistCm, desc: 'Perímetro umbilical' },
                { label: 'Peitoral', value: latestMeasure.chestCm, desc: 'Linha dos mamilos' },
                { label: 'Braço Direito', value: latestMeasure.rightArmCm, desc: 'Bíceps contraído' },
                { label: 'Coxa Direita', value: latestMeasure.rightThighCm, desc: 'Ponto médio da coxa' },
                { label: 'Quadril', value: latestMeasure.hipsCm, desc: 'Maior projeção dos glúteos' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 space-y-1"
                >
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{item.label}</span>
                  <div className="text-lg font-black text-white">
                    {item.value ? `${item.value} cm` : '—'}
                  </div>
                  <p className="text-[10px] text-slate-500">{item.desc}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-slate-900/40 rounded-2xl border border-slate-800/80 space-y-2">
              <Ruler className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-xs text-slate-400">Nenhuma medida corporal registrada ainda.</p>
              <button
                onClick={onOpenQuickLog}
                className="text-xs text-emerald-400 font-bold hover:underline"
              >
                Clique aqui para cadastrar suas primeiras medidas
              </button>
            </div>
          )}
        </div>
      )}

      {/* 3. ABA FOTOS (GALERIA & COMPARADOR ANTES/DEPOIS) */}
      {subTab === 'fotos' && (
        <div className="space-y-4">
          {/* Upload Card */}
          <div className="bg-[#0c111e] border border-slate-800 rounded-3xl p-4 sm:p-5 space-y-3">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <Camera className="w-4 h-4 text-emerald-400" />
              Adicionar Foto de Evolução
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">Ângulo da Foto</label>
                <select
                  value={photoType}
                  onChange={(e) => setPhotoType(e.target.value as 'frente' | 'lado' | 'costas' | 'outro')}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 capitalize"
                >
                  <option value="frente">Frente</option>
                  <option value="lado">Lado (Perfil)</option>
                  <option value="costas">Costas</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">Legenda (Opcional)</label>
                <input
                  type="text"
                  value={photoCaption}
                  onChange={(e) => setPhotoCaption(e.target.value)}
                  placeholder="Ex: Mês 1 - 78kg"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-end">
                <label className="w-full py-2 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs shadow-md shadow-emerald-500/20 hover:opacity-95 transition-all cursor-pointer flex items-center justify-center gap-2 text-center">
                  <Camera className="w-4 h-4" />
                  <span>Escolher Foto</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Before & After Comparative Viewer */}
          {state.photos.length >= 2 && beforePhoto && afterPhoto && (
            <div className="bg-[#0c111e] border border-emerald-500/30 rounded-3xl p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-emerald-400 uppercase tracking-wider">
                  🔥 Comparador Antes & Depois
                </span>
                <span className="text-[11px] text-slate-400">Transformação real lado a lado</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                {/* Before */}
                <div className="space-y-1.5 text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">ANTES</span>
                  <div className="aspect-[3/4] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800">
                    <img
                      src={beforePhoto.imageDataUrl}
                      alt="Antes"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono">{beforePhoto.date}</p>
                </div>

                {/* After */}
                <div className="space-y-1.5 text-center">
                  <span className="text-[10px] font-black text-emerald-400 uppercase">DEPOIS</span>
                  <div className="aspect-[3/4] bg-slate-950 rounded-2xl overflow-hidden border border-emerald-500/40">
                    <img
                      src={afterPhoto.imageDataUrl}
                      alt="Depois"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-[10px] text-emerald-400 font-mono font-bold">{afterPhoto.date}</p>
                </div>
              </div>
            </div>
          )}

          {/* Photo Gallery Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {state.photos.map((photo) => (
              <div
                key={photo.id}
                className="bg-[#0c111e] border border-slate-800 rounded-2xl overflow-hidden group relative"
              >
                <div className="aspect-[3/4] bg-slate-950 relative">
                  <img
                    src={photo.imageDataUrl}
                    alt={photo.caption || 'Evolução'}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => onDeletePhoto(photo.id)}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-950/80 text-slate-400 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Excluir foto"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-2.5 space-y-0.5">
                  <div className="flex items-center justify-between text-[10px] font-bold">
                    <span className="text-emerald-400 capitalize">{photo.type}</span>
                    <span className="text-slate-500">{photo.date}</span>
                  </div>
                  {photo.caption && (
                    <p className="text-[11px] text-white truncate font-medium">{photo.caption}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. ABA RECORDES DE FORÇA (PRs) */}
      {subTab === 'forca' && (
        <div className="bg-[#0c111e] border border-slate-800 rounded-3xl p-4 sm:p-5 space-y-4">
          <div>
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              Recordes Pessoais de Carga (PRs)
            </h3>
            <p className="text-xs text-slate-400">
              Sua evolução em peso máximo nos exercícios fundamentais
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { name: 'Supino Reto', target: 'Peitoral & Tríceps', pr: 40, icon: '🏋️' },
              { name: 'Agachamento Livre', target: 'Pernas & Glúteos', pr: 60, icon: '🦵' },
              { name: 'Levantamento Terra', target: 'Costas & Posterior', pr: 70, icon: '⚡' },
              { name: 'Desenvolvimento Militar', target: 'Ombros', pr: 20, icon: '💪' },
            ].map((lift) => (
              <div
                key={lift.name}
                className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{lift.icon}</span>
                  <div>
                    <h4 className="text-xs font-black text-white">{lift.name}</h4>
                    <p className="text-[10px] text-slate-400">{lift.target}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-base font-black text-emerald-400 font-mono">
                    {lift.pr} <span className="text-xs font-normal text-slate-400">kg</span>
                  </div>
                  <span className="text-[9px] font-bold text-amber-400 uppercase">Recorde PR</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
