import { buildMasterPrompt, createDefaultInput, getFaseFromKelas } from '../engine/promptEngine';
import type { ActivityLogItem, PromptGeneratorInput, SavedPrompt } from '../types/pjok';

const PROMPTS_STORAGE_KEY = 'pjok_saved_prompts_v1';
const ACTIVITIES_STORAGE_KEY = 'pjok_activity_log_v1';
const THEME_STORAGE_KEY = 'pjok_theme_v1';
const SEEDED_FLAG_KEY = 'pjok_seeded_v1';

function buildSeedPrompts(): SavedPrompt[] {
  const now = Date.now();

  const input1: PromptGeneratorInput = {
    ...createDefaultInput(),
    kelas: 2,
    fase: getFaseFromKelas(2),
    materi: 'Gerak Lokomotor',
    mediaGroup: 'Game Edukasi',
    jenisMedia: 'Adventure Game',
    tujuanPembelajaran:
      'Peserta didik Kelas 2 SD mampu mempraktikkan variasi gerak berjalan, berlari, dan melompat melewati rintangan rendah dengan aman.',
    gameSettings: {
      ...createDefaultInput().gameSettings,
      title: 'Petualangan Pulau Lokomotor',
      theme: 'Hutan Petualangan',
      mainCharacter: 'Bimo si Kelinci Tangkas',
      levelCount: 4,
      difficulty: 'Dasar',
    },
    visualDesign: {
      visualStyle: '2D Cartoon',
      visualTheme: 'Hutan Petualangan',
    },
  };

  const input2: PromptGeneratorInput = {
    ...createDefaultInput(),
    kelas: 4,
    fase: getFaseFromKelas(4),
    materi: 'Permainan Tradisional',
    mediaGroup: 'Game Aktivitas Fisik',
    jenisMedia: 'Balance Challenge',
    tujuanPembelajaran:
      'Peserta didik Kelas 4 SD mampu mempraktikkan keseimbangan satu kaki dan lompatan terarah melalui permainan tradisional Engklek.',
    localWisdom: {
      ...createDefaultInput().localWisdom,
      enabled: true,
      traditionalGame: 'Engklek',
      regionName: 'Gresik, Jawa Timur',
    },
    gameSettings: {
      ...createDefaultInput().gameSettings,
      title: 'Petualangan Engklek Nusantara',
      theme: 'Desa Permainan Tradisional',
      mainCharacter: 'Ayu & Kawan Kampung',
      levelCount: 4,
      difficulty: 'Menengah',
    },
    visualDesign: {
      visualStyle: '2D Cartoon',
      visualTheme: 'Desa Permainan Tradisional',
    },
  };

  return [
    {
      id: 'seed-prompt-1',
      title: input1.gameSettings.title,
      createdAt: new Date(now - 1000 * 60 * 120).toISOString(),
      updatedAt: new Date(now - 1000 * 60 * 120).toISOString(),
      kelas: input1.kelas,
      fase: input1.fase,
      materi: input1.materi,
      mediaGroup: input1.mediaGroup,
      jenisMedia: input1.jenisMedia,
      generatedPrompt: buildMasterPrompt(input1, 0),
      inputSnapshot: input1,
      sourceTemplateTitle: 'Petualangan Gerak Lokomotor',
    },
    {
      id: 'seed-prompt-2',
      title: input2.gameSettings.title,
      createdAt: new Date(now - 1000 * 60 * 45).toISOString(),
      updatedAt: new Date(now - 1000 * 60 * 45).toISOString(),
      kelas: input2.kelas,
      fase: input2.fase,
      materi: input2.materi,
      mediaGroup: input2.mediaGroup,
      jenisMedia: input2.jenisMedia,
      generatedPrompt: buildMasterPrompt(input2, 0),
      inputSnapshot: input2,
      sourceTemplateTitle: 'Petualangan Engklek',
    },
  ];
}

function buildSeedActivities(): ActivityLogItem[] {
  const now = Date.now();
  return [
    {
      id: 'act-seed-1',
      action: 'template',
      title: 'Petualangan Engklek Nusantara',
      detail: 'Kelas 4 · Permainan Tradisional · Balance Challenge',
      timestamp: new Date(now - 1000 * 60 * 45).toISOString(),
    },
    {
      id: 'act-seed-2',
      action: 'save',
      title: 'Petualangan Pulau Lokomotor',
      detail: 'Kelas 2 · Gerak Lokomotor · Adventure Game',
      timestamp: new Date(now - 1000 * 60 * 120).toISOString(),
    },
  ];
}

export function loadSavedPrompts(): SavedPrompt[] {
  try {
    const initialized = localStorage.getItem(SEEDED_FLAG_KEY);
    const raw = localStorage.getItem(PROMPTS_STORAGE_KEY);
    if (!initialized && !raw) {
      const seeds = buildSeedPrompts();
      localStorage.setItem(PROMPTS_STORAGE_KEY, JSON.stringify(seeds));
      localStorage.setItem(SEEDED_FLAG_KEY, '1');
      return seeds;
    }
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function persistSavedPrompts(prompts: SavedPrompt[]): void {
  try {
    localStorage.setItem(SEEDED_FLAG_KEY, '1');
    localStorage.setItem(PROMPTS_STORAGE_KEY, JSON.stringify(prompts));
  } catch {
    // Ignore storage quota errors cleanly
  }
}

export function loadActivityLogs(): ActivityLogItem[] {
  try {
    const raw = localStorage.getItem(ACTIVITIES_STORAGE_KEY);
    if (!raw) {
      const seeds = buildSeedActivities();
      localStorage.setItem(ACTIVITIES_STORAGE_KEY, JSON.stringify(seeds));
      return seeds;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function persistActivityLogs(logs: ActivityLogItem[]): void {
  try {
    localStorage.setItem(ACTIVITIES_STORAGE_KEY, JSON.stringify(logs.slice(0, 25)));
  } catch {
    // Ignore storage quota errors
  }
}

export function loadThemePreference(): 'light' | 'dark' {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return saved === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export function persistThemePreference(theme: 'light' | 'dark'): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Ignore storage quota errors
  }
}
