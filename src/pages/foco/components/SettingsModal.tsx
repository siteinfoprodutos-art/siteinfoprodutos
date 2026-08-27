import React, { useState } from 'react';
import { X, Settings, Download, Upload, RotateCcw, Volume2, Bell, Sparkles, Check, AlertCircle } from 'lucide-react';
import { FocoSettings, focoService } from '../../../services/focoStorage';
import { playTimerCompletionSound } from '../../../utils/audio';

interface SettingsModalProps {
  isOpen: boolean;
  settings: FocoSettings;
  onClose: () => void;
  onSave: (newSettings: FocoSettings) => void;
  onRefreshData: () => void;
}

const AVATAR_OPTIONS = ['🚀', '⚡', '🎓', '📚', '🧠', '🌟', '🎯', '🎧', '🔥', '🏆', '💎', '💡'];

export function SettingsModal({
  isOpen,
  settings,
  onClose,
  onSave,
  onRefreshData,
}: SettingsModalProps) {
  const [formData, setFormData] = useState<FocoSettings>({ ...settings });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [backupMsg, setBackupMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await focoService.saveSettings(formData);
    onSave(formData);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 800);
  };

  const handleTestSound = () => {
    playTimerCompletionSound();
  };

  const handleExportBackup = async () => {
    try {
      const json = await focoService.exportBackup();
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `al-studio-foco-backup-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setBackupMsg({ type: 'success', text: 'Backup exportado com sucesso!' });
      setTimeout(() => setBackupMsg(null), 3000);
    } catch {
      setBackupMsg({ type: 'error', text: 'Erro ao gerar backup.' });
      setTimeout(() => setBackupMsg(null), 3000);
    }
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target?.result as string;
      if (text) {
        const success = await focoService.importBackup(text);
        if (success) {
          setBackupMsg({ type: 'success', text: 'Dados restaurados com sucesso!' });
          onRefreshData();
          setTimeout(() => {
            setBackupMsg(null);
            onClose();
          }, 1500);
        } else {
          setBackupMsg({ type: 'error', text: 'Arquivo inválido ou corrompido.' });
        }
      }
    };
    reader.readAsText(file);
  };

  const handleResetData = async () => {
    if (window.confirm('Tem certeza de que deseja resetar os dados do aplicativo para o padrão inicial?')) {
      await focoService.resetAllData();
      onRefreshData();
      setBackupMsg({ type: 'success', text: 'Dados restaurados para o padrão.' });
      setTimeout(() => {
        setBackupMsg(null);
        onClose();
      }, 1200);
    }
  };

  return (
    <div
      id="foco-settings-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white">Configurações</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Personalize sua experiência no AL Studio Foco</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 dark:text-slate-200">
          {backupMsg && (
            <div
              className={`p-3.5 rounded-2xl text-xs font-bold flex items-center gap-2 ${
                backupMsg.type === 'success'
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                  : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
              }`}
            >
              {backupMsg.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              <span>{backupMsg.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* User Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Seu Nome ou Apelido
              </label>
              <input
                type="text"
                value={formData.userName}
                onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                className="w-full bg-slate-50 dark:bg-[#0b0f17] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                placeholder="Ex: Lucas, Sofia, etc."
                required
              />
            </div>

            {/* Avatar Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Escolha seu Avatar
              </label>
              <div className="grid grid-cols-6 gap-2">
                {AVATAR_OPTIONS.map((av) => (
                  <button
                    key={av}
                    type="button"
                    onClick={() => setFormData({ ...formData, avatar: av })}
                    className={`h-11 rounded-xl flex items-center justify-center text-xl transition-all ${
                      formData.avatar === av
                        ? 'bg-indigo-600 text-white shadow-md scale-105 ring-2 ring-indigo-400'
                        : 'bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            {/* Study Goals */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Meta Diária (Minutos)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="5"
                    max="600"
                    step="5"
                    value={formData.dailyGoalMinutes}
                    onChange={(e) => setFormData({ ...formData, dailyGoalMinutes: parseInt(e.target.value) || 30 })}
                    className="w-full bg-slate-50 dark:bg-[#0b0f17] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/50 pr-12"
                  />
                  <span className="absolute right-3.5 top-2.5 text-xs text-slate-400 font-bold">min</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Meta Semanal (Horas)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="100"
                    step="1"
                    value={formData.weeklyGoalHours}
                    onChange={(e) => setFormData({ ...formData, weeklyGoalHours: parseInt(e.target.value) || 5 })}
                    className="w-full bg-slate-50 dark:bg-[#0b0f17] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/50 pr-12"
                  />
                  <span className="absolute right-3.5 top-2.5 text-xs text-slate-400 font-bold">horas</span>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0b0f17] border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <Volume2 className="w-5 h-5 text-indigo-500" />
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">Som ao finalizar foco</div>
                    <div className="text-[11px] text-slate-500">Toca um sino agradável ao término</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleTestSound}
                    className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline px-2"
                  >
                    Testar
                  </button>
                  <input
                    type="checkbox"
                    checked={formData.soundEnabled}
                    onChange={(e) => setFormData({ ...formData, soundEnabled: e.target.checked })}
                    className="w-5 h-5 rounded-md text-indigo-600 focus:ring-indigo-500 accent-indigo-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-2xl transition-all shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2 text-sm"
            >
              {saveSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Salvo com sucesso!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Salvar Preferências</span>
                </>
              )}
            </button>
          </form>

          {/* Backup Section (Local / IndexedDB) */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <div className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Backup e Armazenamento Local
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Todos os seus dados estão salvos 100% de forma segura e privada no IndexedDB do seu navegador.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleExportBackup}
                className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4 text-indigo-500" />
                <span>Exportar Dados</span>
              </button>

              <label className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer">
                <Upload className="w-4 h-4 text-emerald-500" />
                <span>Importar Dados</span>
                <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
              </label>
            </div>

            <button
              type="button"
              onClick={handleResetData}
              className="w-full py-2 px-3 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors pt-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Resetar dados para o padrão inicial</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
