import React, { useState } from 'react';
import { X, Scale, Ruler, Sparkles, Check } from 'lucide-react';
import { WeightEntry, BodyMeasurements } from '../types';
import { getTodayDateString } from '../services/fitnessStorage';

interface QuickLogModalProps {
  currentWeight: number;
  onSaveWeight: (entry: WeightEntry) => void;
  onSaveMeasurements: (entry: BodyMeasurements) => void;
  onClose: () => void;
}

export const QuickLogModal: React.FC<QuickLogModalProps> = ({
  currentWeight,
  onSaveWeight,
  onSaveMeasurements,
  onClose,
}) => {
  const [tab, setTab] = useState<'peso' | 'medidas'>('peso');
  const [date, setDate] = useState<string>(getTodayDateString());
  const [weightKg, setWeightKg] = useState<number>(currentWeight || 75);
  const [weightNotes, setWeightNotes] = useState<string>('');

  // Measurements
  const [chestCm, setChestCm] = useState<number | undefined>(undefined);
  const [waistCm, setWaistCm] = useState<number | undefined>(undefined);
  const [hipsCm, setHipsCm] = useState<number | undefined>(undefined);
  const [armCm, setArmCm] = useState<number | undefined>(undefined);
  const [thighCm, setThighCm] = useState<number | undefined>(undefined);

  const handleSave = () => {
    if (tab === 'peso') {
      onSaveWeight({
        id: `w-${Date.now()}`,
        date,
        weightKg: Number(weightKg) || currentWeight,
        notes: weightNotes.trim() || undefined,
      });
    } else {
      onSaveMeasurements({
        id: `m-${Date.now()}`,
        date,
        chestCm: chestCm ? Number(chestCm) : undefined,
        waistCm: waistCm ? Number(waistCm) : undefined,
        hipsCm: hipsCm ? Number(hipsCm) : undefined,
        rightArmCm: armCm ? Number(armCm) : undefined,
        leftArmCm: armCm ? Number(armCm) : undefined,
        rightThighCm: thighCm ? Number(thighCm) : undefined,
        leftThighCm: thighCm ? Number(thighCm) : undefined,
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-md bg-[#0b0f19] border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl relative my-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              {tab === 'peso' ? <Scale className="w-4 h-4" /> : <Ruler className="w-4 h-4" />}
            </div>
            <div>
              <h2 className="text-sm font-black text-white">Registrar Evolução</h2>
              <p className="text-[11px] text-slate-400">Acompanhe seus dados na balança e fita métrica</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="grid grid-cols-2 gap-2 my-4 p-1 bg-slate-900 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setTab('peso')}
            className={`py-1.5 rounded-lg text-xs font-bold transition-colors ${
              tab === 'peso'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Peso na Balança
          </button>
          <button
            type="button"
            onClick={() => setTab('medidas')}
            className={`py-1.5 rounded-lg text-xs font-bold transition-colors ${
              tab === 'medidas'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Medidas Corporais
          </button>
        </div>

        {/* Form */}
        <div className="space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Data do Registro</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          {tab === 'peso' ? (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Peso Atual (kg)</label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm font-bold text-white focus:outline-none focus:border-emerald-500"
                  />
                  <span className="absolute right-3 top-2 text-xs text-slate-500">kg</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Observações (opcional)</label>
                <input
                  type="text"
                  value={weightNotes}
                  onChange={(e) => setWeightNotes(e.target.value)}
                  placeholder="Ex: Em jejum, pós-treino, etc."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-2.5 max-h-[40vh] overflow-y-auto pr-1">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">Cintura (cm)</label>
                <input
                  type="number"
                  step="0.5"
                  value={waistCm || ''}
                  onChange={(e) => setWaistCm(e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="Ex: 82"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">Peitoral (cm)</label>
                <input
                  type="number"
                  step="0.5"
                  value={chestCm || ''}
                  onChange={(e) => setChestCm(e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="Ex: 100"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">Braço (cm)</label>
                <input
                  type="number"
                  step="0.5"
                  value={armCm || ''}
                  onChange={(e) => setArmCm(e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="Ex: 37"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">Coxa (cm)</label>
                <input
                  type="number"
                  step="0.5"
                  value={thighCm || ''}
                  onChange={(e) => setThighCm(e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="Ex: 58"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-[11px] font-bold text-slate-300 mb-1">Quadril (cm)</label>
                <input
                  type="number"
                  step="0.5"
                  value={hipsCm || ''}
                  onChange={(e) => setHipsCm(e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="Ex: 98"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={handleSave}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 hover:opacity-95 transition-all flex items-center justify-center gap-2 mt-2"
          >
            <Check className="w-4 h-4" />
            <span>Salvar Registro (+30 XP)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
