import { CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DashboardGuru } from './components/DashboardGuru';
import { DashboardInspirasi } from './components/DashboardInspirasi';
import { Footer } from './components/Footer';
import { PromptHistory } from './components/PromptHistory';
import { PromptStudio } from './components/PromptStudio';
import { SidebarNav } from './components/SidebarNav';
import { SmartGenerator } from './components/SmartGenerator';
import { TopBar } from './components/TopBar';
import {
  buildMasterPrompt,
  createDefaultInput,
  getFaseFromKelas,
  resolveMateriLabel,
} from './engine/promptEngine';
import type {
  ActiveWorkspace,
  ActivityLogItem,
  InspirationTemplate,
  PromptGeneratorInput,
  RandomIdeaResult,
  SavedPrompt,
} from './types/pjok';
import { copyTextToClipboard } from './utils/exporters';
import {
  loadActivityLogs,
  loadSavedPrompts,
  loadThemePreference,
  persistActivityLogs,
  persistSavedPrompts,
  persistThemePreference,
} from './utils/storage';

export default function App() {
  const [activeWorkspace, setActiveWorkspace] = useState<ActiveWorkspace>('dashboard');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => loadThemePreference());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>(() => loadSavedPrompts());
  const [activities, setActivities] = useState<ActivityLogItem[]>(() => loadActivityLogs());

  const [generatorInput, setGeneratorInput] = useState<PromptGeneratorInput>(() => {
    const existing = loadSavedPrompts();
    return existing[0]?.inputSnapshot ?? createDefaultInput();
  });
  const [variationSeed, setVariationSeed] = useState<number>(0);
  const [studioPromptText, setStudioPromptText] = useState<string>(() => {
    const existing = loadSavedPrompts();
    return existing[0]?.generatedPrompt ?? buildMasterPrompt(createDefaultInput(), 0);
  });
  const [activePromptId, setActivePromptId] = useState<string | null>(() => {
    const existing = loadSavedPrompts();
    return existing[0]?.id ?? null;
  });
  const [isSavedCurrent, setIsSavedCurrent] = useState<boolean>(() => {
    const existing = loadSavedPrompts();
    return existing.length > 0;
  });

  const [toast, setToast] = useState<{ message: string; actionLabel?: string; onAction?: () => void } | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    persistThemePreference(theme);
  }, [theme]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  const showToast = (message: string, actionLabel?: string, onAction?: () => void) => {
    setToast({ message, actionLabel, onAction });
  };

  const appendActivity = (
    action: ActivityLogItem['action'],
    title: string,
    detail: string
  ) => {
    const nextItem: ActivityLogItem = {
      id: `act-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      action,
      title,
      detail,
      timestamp: new Date().toISOString(),
    };
    setActivities((prev) => {
      const next = [nextItem, ...prev].slice(0, 25);
      persistActivityLogs(next);
      return next;
    });
  };

  const navigateTo = (workspace: ActiveWorkspace) => {
    setActiveWorkspace(workspace);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCreateNewPrompt = () => {
    setGeneratorInput(createDefaultInput());
    setActivePromptId(null);
    setIsSavedCurrent(false);
    navigateTo('generator');
  };

  const handleUseTemplate = (template: InspirationTemplate) => {
    const base = createDefaultInput();
    const merged: PromptGeneratorInput = {
      ...base,
      ...template.presetInput,
      aiMotion: { ...base.aiMotion, ...template.presetInput.aiMotion },
      smartQuiz: { ...base.smartQuiz, ...template.presetInput.smartQuiz },
      localWisdom: { ...base.localWisdom, ...template.presetInput.localWisdom },
      deepLearning: { ...base.deepLearning, ...template.presetInput.deepLearning },
      gameSettings: { ...base.gameSettings, ...template.presetInput.gameSettings },
      visualDesign: { ...base.visualDesign, ...template.presetInput.visualDesign },
    };
    merged.fase = getFaseFromKelas(merged.kelas);

    const generated = buildMasterPrompt(merged, 0);
    setGeneratorInput(merged);
    setStudioPromptText(generated);
    setActivePromptId(null);
    setIsSavedCurrent(false);
    setVariationSeed(0);

    appendActivity(
      'template',
      template.title,
      `Template dimuat · Kelas ${merged.kelas} SD · ${merged.materi}`
    );

    navigateTo('generator');
    showToast(
      `Template "${template.title}" dimuat ke Smart Generator.`,
      'Buka Studio',
      () => navigateTo('studio')
    );
  };

  const handleGeneratePrompt = () => {
    const generated = buildMasterPrompt(generatorInput, variationSeed);
    setStudioPromptText(generated);
    setActivePromptId(null);
    setIsSavedCurrent(false);

    const title = generatorInput.gameSettings.title.trim() || 'Prompt PJOK SD';
    const materi = resolveMateriLabel(generatorInput);
    appendActivity(
      'generate',
      title,
      `Kelas ${generatorInput.kelas} · ${materi} · ${generatorInput.jenisMedia}`
    );

    navigateTo('studio');
    showToast('Master Prompt 20 bagian berhasil dibuat!');
  };

  const handleGenerateFromIdea = (idea: RandomIdeaResult) => {
    const nextFase = getFaseFromKelas(idea.appliedKelas);
    const nextInput: PromptGeneratorInput = {
      ...generatorInput,
      kelas: idea.appliedKelas,
      fase: nextFase,
      materi: idea.appliedMateri,
      customMateri: '',
      mediaGroup: idea.appliedMediaGroup,
      jenisMedia: idea.appliedMedia,
      tujuanPembelajaran: idea.learningObjective,
      aiMotion: {
        ...generatorInput.aiMotion,
        enabled: idea.appliedMediaGroup === 'AI dan Coding',
      },
      localWisdom: {
        ...generatorInput.localWisdom,
        enabled: idea.appliedMateri === 'Permainan Tradisional',
      },
      gameSettings: {
        ...generatorInput.gameSettings,
        title: idea.gameName,
        theme: idea.appliedVisualTheme,
        difficulty: nextFase === 'A' ? 'Dasar' : nextFase === 'B' ? 'Menengah' : 'Lanjutan',
      },
      visualDesign: {
        visualStyle: idea.appliedVisualStyle,
        visualTheme: idea.appliedVisualTheme,
      },
    };

    const generated = buildMasterPrompt(nextInput, variationSeed);
    setGeneratorInput(nextInput);
    setStudioPromptText(generated);
    setActivePromptId(null);
    setIsSavedCurrent(false);

    appendActivity(
      'generate',
      idea.gameName,
      `Ide acak · Kelas ${nextInput.kelas} · ${nextInput.materi}`
    );

    navigateTo('studio');
    showToast(`Prompt dari ide "${idea.gameName}" berhasil dibuat!`);
  };

  const handleRegeneratePrompt = () => {
    const nextSeed = variationSeed + 1;
    setVariationSeed(nextSeed);
    const regenerated = buildMasterPrompt(generatorInput, nextSeed);
    setStudioPromptText(regenerated);
    setIsSavedCurrent(false);
    appendActivity(
      'generate',
      generatorInput.gameSettings.title || 'Prompt PJOK SD',
      `Generate ulang variasi #${nextSeed + 1}`
    );
    showToast('Prompt berhasil di-generate ulang dengan variasi baru.');
  };

  const handleSaveToHistory = () => {
    if (!studioPromptText.trim()) return;
    const nowIso = new Date().toISOString();
    const title = generatorInput.gameSettings.title.trim() || 'Prompt Pembelajaran PJOK SD';
    const materi = resolveMateriLabel(generatorInput);

    if (activePromptId) {
      const updatedList = savedPrompts.map((item) =>
        item.id === activePromptId
          ? {
              ...item,
              title,
              updatedAt: nowIso,
              kelas: generatorInput.kelas,
              fase: generatorInput.fase,
              materi,
              mediaGroup: generatorInput.mediaGroup,
              jenisMedia: generatorInput.jenisMedia,
              generatedPrompt: studioPromptText,
              inputSnapshot: generatorInput,
            }
          : item
      );
      setSavedPrompts(updatedList);
      persistSavedPrompts(updatedList);
      setIsSavedCurrent(true);
      appendActivity('save', title, `Riwayat diperbarui · Kelas ${generatorInput.kelas}`);
      showToast('Perubahan prompt disimpan ke Riwayat.');
      return;
    }

    const newId = `prompt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const newEntry: SavedPrompt = {
      id: newId,
      title,
      createdAt: nowIso,
      updatedAt: nowIso,
      kelas: generatorInput.kelas,
      fase: generatorInput.fase,
      materi,
      mediaGroup: generatorInput.mediaGroup,
      jenisMedia: generatorInput.jenisMedia,
      generatedPrompt: studioPromptText,
      inputSnapshot: generatorInput,
    };

    const nextList = [newEntry, ...savedPrompts];
    setSavedPrompts(nextList);
    persistSavedPrompts(nextList);
    setActivePromptId(newId);
    setIsSavedCurrent(true);
    appendActivity('save', title, `Disimpan · Kelas ${generatorInput.kelas} · ${materi}`);
    showToast('Prompt berhasil disimpan ke Riwayat!');
  };

  const handleOpenPromptInStudio = (prompt: SavedPrompt) => {
    setGeneratorInput(prompt.inputSnapshot);
    setStudioPromptText(prompt.generatedPrompt);
    setActivePromptId(prompt.id);
    setIsSavedCurrent(true);
    navigateTo('studio');
  };

  const handleEditPromptInGenerator = (prompt: SavedPrompt) => {
    setGeneratorInput(prompt.inputSnapshot);
    setStudioPromptText(prompt.generatedPrompt);
    setActivePromptId(prompt.id);
    setIsSavedCurrent(true);
    navigateTo('generator');
  };

  const handleDeletePrompt = (id: string, title: string) => {
    const nextList = savedPrompts.filter((p) => p.id !== id);
    setSavedPrompts(nextList);
    persistSavedPrompts(nextList);
    if (activePromptId === id) {
      setActivePromptId(null);
      setIsSavedCurrent(false);
    }
    appendActivity('delete', title, 'Dihapus dari riwayat lokal');
    showToast(`Prompt "${title}" dihapus dari riwayat.`);
  };

  const handleCopyPromptText = async (text: string) => {
    const ok = await copyTextToClipboard(text);
    if (ok) {
      showToast('Prompt berhasil disalin ke clipboard!');
    }
  };

  const handleResetStudio = () => {
    const defaults = createDefaultInput();
    setGeneratorInput(defaults);
    setStudioPromptText('');
    setActivePromptId(null);
    setIsSavedCurrent(false);
    showToast('Workspace direset ke pengaturan awal.');
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <SidebarNav
        activeWorkspace={activeWorkspace}
        onSelectWorkspace={navigateTo}
        savedCount={savedPrompts.length}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar
          activeWorkspace={activeWorkspace}
          theme={theme}
          onToggleTheme={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
          onCreateNewPrompt={handleCreateNewPrompt}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {activeWorkspace === 'dashboard' && (
            <DashboardGuru
              savedPrompts={savedPrompts}
              activities={activities}
              onCreateNew={handleCreateNewPrompt}
              onOpenInspirasi={() => navigateTo('inspirasi')}
              onUseTemplate={handleUseTemplate}
              onOpenPromptInStudio={handleOpenPromptInStudio}
              onCopyPromptText={handleCopyPromptText}
            />
          )}

          {activeWorkspace === 'inspirasi' && (
            <DashboardInspirasi onUseTemplate={handleUseTemplate} />
          )}

          {activeWorkspace === 'generator' && (
            <SmartGenerator
              input={generatorInput}
              onChange={(next) => {
                setGeneratorInput(next);
                setIsSavedCurrent(false);
              }}
              onGenerate={handleGeneratePrompt}
              onReset={() => {
                setGeneratorInput(createDefaultInput());
                setActivePromptId(null);
                setIsSavedCurrent(false);
                showToast('Formulir generator direset.');
              }}
              onGenerateFromIdea={handleGenerateFromIdea}
            />
          )}

          {activeWorkspace === 'studio' && (
            <PromptStudio
              promptText={studioPromptText}
              input={generatorInput}
              isSavedCurrent={isSavedCurrent}
              onChangePromptText={(nextText) => {
                setStudioPromptText(nextText);
                setIsSavedCurrent(false);
              }}
              onRegenerate={handleRegeneratePrompt}
              onSaveToHistory={handleSaveToHistory}
              onResetWorkspace={handleResetStudio}
              onBackToGenerator={() => navigateTo('generator')}
              onLogAction={(action, detail) =>
                appendActivity(
                  action,
                  generatorInput.gameSettings.title || 'Prompt PJOK SD',
                  detail
                )
              }
            />
          )}

          {activeWorkspace === 'riwayat' && (
            <PromptHistory
              prompts={savedPrompts}
              onOpenInStudio={handleOpenPromptInStudio}
              onEditInGenerator={handleEditPromptInGenerator}
              onCopyPrompt={handleCopyPromptText}
              onDeletePrompt={handleDeletePrompt}
              onCreateNew={handleCreateNewPrompt}
            />
          )}
        </main>

        <Footer />
      </div>

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed right-5 bottom-5 z-50 flex max-w-sm items-center gap-3 rounded-xl border border-emerald-200 bg-white px-4 py-3 text-xs font-medium text-slate-800 shadow-lg dark:border-emerald-800 dark:bg-slate-900 dark:text-slate-100 no-print"
        >
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <span className="flex-1">{toast.message}</span>
          {toast.actionLabel && toast.onAction && (
            <button
              type="button"
              onClick={() => {
                toast.onAction?.();
                setToast(null);
              }}
              className="shrink-0 font-bold text-blue-600 hover:underline dark:text-blue-400"
            >
              {toast.actionLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
