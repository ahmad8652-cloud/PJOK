import {
  AlertCircle,
  Brain,
  Camera,
  Dices,
  Gamepad2,
  HelpCircle,
  Landmark,
  Palette,
  RotateCcw,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useState } from 'react';
import {
  AI_MOTION_ACTIVITIES,
  AI_MOTION_TECHNOLOGIES,
  DEEP_LEARNING_PILLARS,
  KELAS_OPTIONS,
  LOCAL_WISDOM_GAMES,
  MATERI_OPTIONS,
  MEDIA_GROUPS,
  PEDAGOGICAL_APPROACHES,
  SEMESTER_OPTIONS,
  SMART_QUIZ_TYPES,
  VISUAL_DESIGN_STYLES,
  VISUAL_THEMES,
} from '../data/catalog';
import {
  generateRandomIdea,
  getAdaptiveProfile,
  getFaseFromKelas,
  validateGeneratorInput,
} from '../engine/promptEngine';
import type {
  KelasLevel,
  MediaCategoryGroup,
  PromptGeneratorInput,
  RandomIdeaFilters,
  RandomIdeaResult,
} from '../types/pjok';

interface SmartGeneratorProps {
  input: PromptGeneratorInput;
  onChange: (next: PromptGeneratorInput) => void;
  onGenerate: () => void;
  onReset: () => void;
  onGenerateFromIdea: (idea: RandomIdeaResult) => void;
}

export function SmartGenerator({
  input,
  onChange,
  onGenerate,
  onReset,
  onGenerateFromIdea,
}: SmartGeneratorProps) {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [ideaFilters, setIdeaFilters] = useState<RandomIdeaFilters>({
    kelas: 'Semua',
    materi: 'Semua',
    jenisGame: 'Semua',
    temaVisual: 'Semua',
  });
  const [randomIdea, setRandomIdea] = useState<RandomIdeaResult>(() =>
    generateRandomIdea({
      kelas: 'Semua',
      materi: 'Semua',
      jenisGame: 'Semua',
      temaVisual: 'Semua',
    }, 101)
  );

  const adaptive = getAdaptiveProfile(input.fase);

  const handleKelasChange = (kelas: KelasLevel) => {
    const nextFase = getFaseFromKelas(kelas);
    const nextDifficulty =
      nextFase === 'A' ? 'Dasar' : nextFase === 'B' ? 'Menengah' : 'Lanjutan';
    onChange({
      ...input,
      kelas,
      fase: nextFase,
      gameSettings: {
        ...input.gameSettings,
        difficulty: nextDifficulty,
      },
    });
  };

  const handleMediaGroupChange = (group: MediaCategoryGroup) => {
    const firstOption = MEDIA_GROUPS[group][0];
    onChange({
      ...input,
      mediaGroup: group,
      jenisMedia: firstOption,
      aiMotion: {
        ...input.aiMotion,
        enabled: group === 'AI dan Coding' ? true : input.aiMotion.enabled,
      },
    });
  };

  const handleToggleDeepLearningItem = (
    pillar: 'berkesadaran' | 'bermakna' | 'menggembirakan',
    item: string
  ) => {
    const current = input.deepLearning[pillar];
    const exists = current.includes(item);
    const updated = exists ? current.filter((x) => x !== item) : [...current, item];
    onChange({
      ...input,
      deepLearning: {
        ...input.deepLearning,
        [pillar]: updated,
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateGeneratorInput(input);
    if (!result.valid) {
      setValidationErrors(result.errors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setValidationErrors([]);
    onGenerate();
  };

  const handleGenerateRandomIdea = () => {
    setRandomIdea(generateRandomIdea(ideaFilters));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      {validationErrors.length > 0 && (
        <div
          role="alert"
          className="rounded-2xl border border-red-300 bg-red-50 p-5 text-red-900 dark:border-red-800 dark:bg-red-950/50 dark:text-red-200"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />
            <div>
              <h2 className="text-sm font-bold">Periksa Kembali Input Anda</h2>
              <ul className="mt-1.5 list-disc space-y-1 pl-4 text-xs">
                {validationErrors.map((err) => (
                  <li key={err}>{err}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 01. Identitas Pembelajaran */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-100 pb-4 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            01. Identitas Pembelajaran SD
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Seluruh pengaturan jenjang, kelas, fase Kurikulum Merdeka, materi, dan kondisi peserta
            didik terhubung langsung dengan Smart Prompt Engine.
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <label htmlFor="jenjang-select" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Jenjang
            </label>
            <input
              id="jenjang-select"
              type="text"
              value="SD (Sekolah Dasar)"
              readOnly
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-100 px-3.5 py-2.5 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            />
          </div>

          <div>
            <label htmlFor="kelas-select" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Kelas (1–6 SD)
            </label>
            <select
              id="kelas-select"
              value={input.kelas}
              onChange={(e) => handleKelasChange(Number(e.target.value) as KelasLevel)}
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              {KELAS_OPTIONS.map((k) => (
                <option key={k} value={k}>
                  Kelas {k} SD
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="fase-display" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Fase Pembelajaran (Otomatis)
            </label>
            <input
              id="fase-display"
              type="text"
              readOnly
              value={adaptive.faseLabel}
              className="mt-1.5 w-full rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2.5 text-sm font-semibold text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
            />
          </div>

          <div>
            <label htmlFor="semester-select" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Semester
            </label>
            <select
              id="semester-select"
              value={input.semester}
              onChange={(e) =>
                onChange({ ...input, semester: e.target.value as 'Ganjil' | 'Genap' })
              }
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              {SEMESTER_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  Semester {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
          <div>
            <label htmlFor="materi-select" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Materi PJOK
            </label>
            <select
              id="materi-select"
              value={input.materi}
              onChange={(e) =>
                onChange({
                  ...input,
                  materi: e.target.value,
                  localWisdom: {
                    ...input.localWisdom,
                    enabled:
                      e.target.value === 'Permainan Tradisional'
                        ? true
                        : input.localWisdom.enabled,
                  },
                })
              }
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              {MATERI_OPTIONS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="alokasi-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Alokasi Waktu
            </label>
            <input
              id="alokasi-input"
              type="text"
              value={input.alokasiWaktu}
              onChange={(e) => onChange({ ...input, alokasiWaktu: e.target.value })}
              placeholder="Contoh: 2 x 35 menit"
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="jumlah-siswa-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Jumlah Peserta Didik
            </label>
            <input
              id="jumlah-siswa-input"
              type="text"
              value={input.jumlahPesertaDidik}
              onChange={(e) => onChange({ ...input, jumlahPesertaDidik: e.target.value })}
              placeholder="Contoh: 28 peserta didik"
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>

        {input.materi === 'Materi lainnya' && (
          <div className="mt-4">
            <label htmlFor="custom-materi-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Nama Materi Khusus
            </label>
            <input
              id="custom-materi-input"
              type="text"
              value={input.customMateri}
              onChange={(e) => onChange({ ...input, customMateri: e.target.value })}
              placeholder="Tuliskan materi PJOK spesifik..."
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        )}

        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div>
            <label htmlFor="tujuan-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Tujuan Pembelajaran
            </label>
            <textarea
              id="tujuan-input"
              rows={3}
              value={input.tujuanPembelajaran}
              onChange={(e) => onChange({ ...input, tujuanPembelajaran: e.target.value })}
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="karakteristik-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Karakteristik Peserta Didik
            </label>
            <textarea
              id="karakteristik-input"
              rows={3}
              value={input.karakteristikPesertaDidik}
              onChange={(e) => onChange({ ...input, karakteristikPesertaDidik: e.target.value })}
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="inklusif-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Catatan Kebutuhan Pembelajaran Inklusif
            </label>
            <textarea
              id="inklusif-input"
              rows={3}
              value={input.catatanInklusif}
              onChange={(e) => onChange({ ...input, catatanInklusif: e.target.value })}
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>
      </section>

      {/* 02. Jenis Media & 3 Fitur Unggulan Spesial */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-100 pb-4 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            02. Pilihan Jenis Media & Modul Unggulan
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Pilih kategori media digital/game lalu aktifkan modul AI Motion, Smart Quiz, atau
            Kearifan Lokal sesuai kebutuhan kelas.
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <span className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Kelompok Jenis Media
            </span>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {(Object.keys(MEDIA_GROUPS) as MediaCategoryGroup[]).map((group) => (
                <button
                  key={group}
                  type="button"
                  onClick={() => handleMediaGroupChange(group)}
                  className={`rounded-xl border px-3 py-2.5 text-left text-xs font-semibold transition-colors ${
                    input.mediaGroup === group
                      ? 'border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-950/50 dark:text-blue-300'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                  }`}
                >
                  {group}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="jenis-media-select" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Jenis Media Spesifik ({input.mediaGroup})
            </label>
            <select
              id="jenis-media-select"
              value={input.jenisMedia}
              onChange={(e) => onChange({ ...input, jenisMedia: e.target.value })}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              {MEDIA_GROUPS[input.mediaGroup].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 3 Specialized Modules */}
        <div className="mt-6 space-y-4">
          {/* Modul 1: AI Motion Game Generator */}
          <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Camera className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Fitur Unggulan 1: AI Motion Game Generator
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Deteksi pose tubuh via kamera (dengan izin & alternatif tanpa kamera).
                  </p>
                </div>
              </div>
              <label className="inline-flex cursor-pointer items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                <input
                  type="checkbox"
                  checked={input.aiMotion.enabled}
                  onChange={(e) =>
                    onChange({
                      ...input,
                      aiMotion: { ...input.aiMotion, enabled: e.target.checked },
                    })
                  }
                  className="h-4 w-4 rounded border-slate-300 text-blue-600"
                />
                <span>Aktifkan AI Motion</span>
              </label>
            </div>

            {input.aiMotion.enabled && (
              <div className="mt-4 space-y-4 border-t border-slate-100 pt-4 dark:border-slate-800">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="ai-tech-select" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Pilihan Teknologi Deteksi
                    </label>
                    <select
                      id="ai-tech-select"
                      value={input.aiMotion.technology}
                      onChange={(e) =>
                        onChange({
                          ...input,
                          aiMotion: { ...input.aiMotion, technology: e.target.value },
                        })
                      }
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    >
                      {AI_MOTION_TECHNOLOGIES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="ai-activity-select" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Pilihan Aktivitas Gerak
                    </label>
                    <select
                      id="ai-activity-select"
                      value={input.aiMotion.activity}
                      onChange={(e) =>
                        onChange({
                          ...input,
                          aiMotion: { ...input.aiMotion, activity: e.target.value },
                        })
                      }
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    >
                      {AI_MOTION_ACTIVITIES.map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="rounded-xl bg-blue-50/70 p-3 text-xs text-blue-900 dark:bg-blue-950/40 dark:text-blue-200">
                  <p className="font-semibold">Ketentuan Keamanan & Privasi Wajib (Otomatis Disertakan):</p>
                  <p className="mt-1 leading-relaxed">
                    Kamera hanya aktif setelah izin pengguna · Alternatif tanpa kamera tersedia ·
                    Tidak menyimpan video siswa secara otomatis · Tidak mengklaim deteksi gerakan
                    sempurna · Gerakan aman & inklusif.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Modul 2: Smart Quiz Generator */}
          <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <HelpCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Fitur Unggulan 2: Smart Quiz Generator
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Kuis PJOK otomatis dengan skor, pembahasan, feedback positif, dan evaluasi.
                  </p>
                </div>
              </div>
              <label className="inline-flex cursor-pointer items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                <input
                  type="checkbox"
                  checked={input.smartQuiz.enabled}
                  onChange={(e) =>
                    onChange({
                      ...input,
                      smartQuiz: { ...input.smartQuiz, enabled: e.target.checked },
                    })
                  }
                  className="h-4 w-4 rounded border-slate-300 text-emerald-600"
                />
                <span>Aktifkan Smart Quiz</span>
              </label>
            </div>

            {input.smartQuiz.enabled && (
              <div className="mt-4 grid grid-cols-1 gap-4 border-t border-slate-100 pt-4 dark:border-slate-800 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <label htmlFor="quiz-type-select" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Jenis Kuis
                  </label>
                  <select
                    id="quiz-type-select"
                    value={input.smartQuiz.quizType}
                    onChange={(e) =>
                      onChange({
                        ...input,
                        smartQuiz: { ...input.smartQuiz, quizType: e.target.value },
                      })
                    }
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    {SMART_QUIZ_TYPES.map((qt) => (
                      <option key={qt} value={qt}>
                        {qt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="quiz-count-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Jumlah Soal
                  </label>
                  <input
                    id="quiz-count-input"
                    type="number"
                    min={3}
                    max={25}
                    value={input.smartQuiz.questionCount}
                    onChange={(e) =>
                      onChange({
                        ...input,
                        smartQuiz: {
                          ...input.smartQuiz,
                          questionCount: Math.max(3, Number(e.target.value) || 5),
                        },
                      })
                    }
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm tabular-nums dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="quiz-diff-select" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Level Kesulitan Kuis
                  </label>
                  <select
                    id="quiz-diff-select"
                    value={input.smartQuiz.difficulty}
                    onChange={(e) =>
                      onChange({
                        ...input,
                        smartQuiz: {
                          ...input.smartQuiz,
                          difficulty: e.target.value as 'Mudah' | 'Sedang' | 'Menantang',
                        },
                      })
                    }
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    <option value="Mudah">Mudah</option>
                    <option value="Sedang">Sedang</option>
                    <option value="Menantang">Menantang</option>
                  </select>
                </div>

                <div className="flex flex-col justify-end">
                  <label className="inline-flex cursor-pointer items-center gap-2 py-2 text-xs font-medium text-slate-700 dark:text-slate-200">
                    <input
                      type="checkbox"
                      checked={input.smartQuiz.hasTimer}
                      onChange={(e) =>
                        onChange({
                          ...input,
                          smartQuiz: { ...input.smartQuiz, hasTimer: e.target.checked },
                        })
                      }
                      className="h-4 w-4 rounded border-slate-300 text-emerald-600"
                    />
                    <span>Timer Opsional ({input.smartQuiz.timerPerQuestionSeconds} dtk/soal)</span>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Modul 3: Local Wisdom Game Generator */}
          <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Landmark className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Fitur Unggulan 3: Local Wisdom Game Generator
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Integrasi permainan tradisional & budaya lokal daerah Indonesia.
                  </p>
                </div>
              </div>
              <label className="inline-flex cursor-pointer items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                <input
                  type="checkbox"
                  checked={input.localWisdom.enabled}
                  onChange={(e) =>
                    onChange({
                      ...input,
                      localWisdom: { ...input.localWisdom, enabled: e.target.checked },
                    })
                  }
                  className="h-4 w-4 rounded border-slate-300 text-orange-600"
                />
                <span>Aktifkan Kearifan Lokal</span>
              </label>
            </div>

            {input.localWisdom.enabled && (
              <div className="mt-4 space-y-4 border-t border-slate-100 pt-4 dark:border-slate-800">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <label htmlFor="trad-game-select" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Permainan Tradisional
                    </label>
                    <select
                      id="trad-game-select"
                      value={input.localWisdom.traditionalGame}
                      onChange={(e) =>
                        onChange({
                          ...input,
                          localWisdom: { ...input.localWisdom, traditionalGame: e.target.value },
                        })
                      }
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    >
                      {LOCAL_WISDOM_GAMES.map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="region-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Nama Daerah / Budaya Lokal
                    </label>
                    <input
                      id="region-input"
                      type="text"
                      value={input.localWisdom.regionName}
                      onChange={(e) =>
                        onChange({
                          ...input,
                          localWisdom: { ...input.localWisdom, regionName: e.target.value },
                        })
                      }
                      placeholder="Contoh: Gresik, Jawa Timur"
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="char-values-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Nilai Karakter Utama
                    </label>
                    <input
                      id="char-values-input"
                      type="text"
                      value={input.localWisdom.characterValues}
                      onChange={(e) =>
                        onChange({
                          ...input,
                          localWisdom: { ...input.localWisdom, characterValues: e.target.value },
                        })
                      }
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                </div>

                <p className="rounded-xl bg-orange-50/70 p-3 text-xs text-orange-900 dark:bg-orange-950/40 dark:text-orange-200">
                  Catatan Etika Budaya: Prompt menginstruksikan AI agar tidak mengarang fakta budaya
                  daerah dan menandai detail lokal yang belum terverifikasi dengan label{' '}
                  <strong>[Perlu Verifikasi Guru]</strong>.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 03. Deep Learning & Adaptive Learning */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-100 pb-4 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              03. Pembelajaran Mendalam & Adaptif (Kelas {input.kelas} · Fase {input.fase})
            </h2>
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Integrasi prinsip Berkesadaran, Bermakna, dan Menggembirakan serta penyesuaian otomatis
            tingkat perkembangan usia siswa.
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <div>
              <label htmlFor="approach-select" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Pendekatan Pedagogis
              </label>
              <select
                id="approach-select"
                value={input.deepLearning.pedagogicalApproach}
                onChange={(e) =>
                  onChange({
                    ...input,
                    deepLearning: {
                      ...input.deepLearning,
                      pedagogicalApproach: e.target.value,
                    },
                  })
                }
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                {PEDAGOGICAL_APPROACHES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <p className="text-xs font-bold text-blue-700 dark:text-blue-400">1. Berkesadaran</p>
                <div className="mt-2 space-y-2">
                  {DEEP_LEARNING_PILLARS.berkesadaran.map((item) => (
                    <label key={item} className="flex cursor-pointer items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <input
                        type="checkbox"
                        checked={input.deepLearning.berkesadaran.includes(item)}
                        onChange={() => handleToggleDeepLearningItem('berkesadaran', item)}
                        className="mt-0.5 h-3.5 w-3.5 rounded text-blue-600"
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">2. Bermakna</p>
                <div className="mt-2 space-y-2">
                  {DEEP_LEARNING_PILLARS.bermakna.map((item) => (
                    <label key={item} className="flex cursor-pointer items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <input
                        type="checkbox"
                        checked={input.deepLearning.bermakna.includes(item)}
                        onChange={() => handleToggleDeepLearningItem('bermakna', item)}
                        className="mt-0.5 h-3.5 w-3.5 rounded text-emerald-600"
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-orange-600 dark:text-orange-400">3. Menggembirakan</p>
                <div className="mt-2 space-y-2">
                  {DEEP_LEARNING_PILLARS.menggembirakan.map((item) => (
                    <label key={item} className="flex cursor-pointer items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <input
                        type="checkbox"
                        checked={input.deepLearning.menggembirakan.includes(item)}
                        onChange={() => handleToggleDeepLearningItem('menggembirakan', item)}
                        className="mt-0.5 h-3.5 w-3.5 rounded text-orange-600"
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-800/50">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Penyesuaian Otomatis: {adaptive.faseLabel}
              </h3>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              {adaptive.instructionStyle}
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-4 text-xs text-slate-600 dark:text-slate-300">
              {adaptive.uiGuidelines.slice(0, 3).map((g) => (
                <li key={g}>{g}</li>
              ))}
              {adaptive.pacingAndChallenge.slice(0, 2).map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 04. Pengaturan Game & Desain Visual */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-100 pb-4 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Gamepad2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              04. Pengaturan Game & Desain Visual
            </h2>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <label htmlFor="game-title-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Judul Game
            </label>
            <input
              id="game-title-input"
              type="text"
              value={input.gameSettings.title}
              onChange={(e) =>
                onChange({
                  ...input,
                  gameSettings: { ...input.gameSettings, title: e.target.value },
                })
              }
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="game-theme-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Tema Game
            </label>
            <input
              id="game-theme-input"
              type="text"
              value={input.gameSettings.theme}
              onChange={(e) =>
                onChange({
                  ...input,
                  gameSettings: { ...input.gameSettings, theme: e.target.value },
                })
              }
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="game-char-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Karakter Utama
            </label>
            <input
              id="game-char-input"
              type="text"
              value={input.gameSettings.mainCharacter}
              onChange={(e) =>
                onChange({
                  ...input,
                  gameSettings: { ...input.gameSettings, mainCharacter: e.target.value },
                })
              }
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="game-levels-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Jumlah Level
            </label>
            <input
              id="game-levels-input"
              type="number"
              min={1}
              max={10}
              value={input.gameSettings.levelCount}
              onChange={(e) =>
                onChange({
                  ...input,
                  gameSettings: {
                    ...input.gameSettings,
                    levelCount: Math.max(1, Number(e.target.value) || 3),
                  },
                })
              }
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm tabular-nums dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="game-diff-select" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Tingkat Kesulitan
            </label>
            <select
              id="game-diff-select"
              value={input.gameSettings.difficulty}
              onChange={(e) =>
                onChange({
                  ...input,
                  gameSettings: {
                    ...input.gameSettings,
                    difficulty: e.target.value as 'Dasar' | 'Menengah' | 'Lanjutan',
                  },
                })
              }
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="Dasar">Dasar</option>
              <option value="Menengah">Menengah</option>
              <option value="Lanjutan">Lanjutan</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="visual-style-select" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Desain Visual
              </label>
              <select
                id="visual-style-select"
                value={input.visualDesign.visualStyle}
                onChange={(e) =>
                  onChange({
                    ...input,
                    visualDesign: { ...input.visualDesign, visualStyle: e.target.value },
                  })
                }
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                {VISUAL_DESIGN_STYLES.map((vs) => (
                  <option key={vs} value={vs}>
                    {vs}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="visual-theme-select" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Tema Dunia
              </label>
              <select
                id="visual-theme-select"
                value={input.visualDesign.visualTheme}
                onChange={(e) =>
                  onChange({
                    ...input,
                    visualDesign: { ...input.visualDesign, visualTheme: e.target.value },
                  })
                }
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                {VISUAL_THEMES.map((vt) => (
                  <option key={vt} value={vt}>
                    {vt}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="game-mission-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Misi Permainan
            </label>
            <input
              id="game-mission-input"
              type="text"
              value={input.gameSettings.mission}
              onChange={(e) =>
                onChange({
                  ...input,
                  gameSettings: { ...input.gameSettings, mission: e.target.value },
                })
              }
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="game-scoring-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Sistem Skor & Reward
            </label>
            <input
              id="game-scoring-input"
              type="text"
              value={input.gameSettings.scoringSystem}
              onChange={(e) =>
                onChange({
                  ...input,
                  gameSettings: { ...input.gameSettings, scoringSystem: e.target.value },
                })
              }
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="game-reward-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Bentuk Reward Siswa
            </label>
            <input
              id="game-reward-input"
              type="text"
              value={input.gameSettings.rewardSystem}
              onChange={(e) =>
                onChange({
                  ...input,
                  gameSettings: { ...input.gameSettings, rewardSystem: e.target.value },
                })
              }
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="game-feedback-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Gaya Feedback Otomatis
            </label>
            <input
              id="game-feedback-input"
              type="text"
              value={input.gameSettings.feedbackStyle}
              onChange={(e) =>
                onChange({
                  ...input,
                  gameSettings: { ...input.gameSettings, feedbackStyle: e.target.value },
                })
              }
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-slate-100 pt-4 dark:border-slate-800">
          {(
            [
              ['hasTimer', 'Timer Permainan'],
              ['hasLeaderboard', 'Leaderboard Kelas'],
              ['hasAudio', 'Efek Audio'],
              ['hasAnimation', 'Animasi Ringan'],
              ['hasStartButton', 'Tombol Mulai'],
              ['hasPauseButton', 'Tombol Jeda'],
              ['hasRestartButton', 'Tombol Ulangi'],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="inline-flex cursor-pointer items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={input.gameSettings[key]}
                onChange={(e) =>
                  onChange({
                    ...input,
                    gameSettings: { ...input.gameSettings, [key]: e.target.checked },
                  })
                }
                className="h-4 w-4 rounded border-slate-300 text-blue-600"
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </section>

      {/* 05. Random Idea Generator */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                05. Random Idea Generator
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Temukan inspirasi game PJOK segar secara acak lalu langsung ubah menjadi Master Prompt.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGenerateRandomIdea}
            className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-orange-700"
          >
            <Dices className="h-4 w-4" />
            <span>Acak Ide Game</span>
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label htmlFor="idea-kelas-select" className="block text-xs font-medium text-slate-600 dark:text-slate-400">
              Filter Kelas
            </label>
            <select
              id="idea-kelas-select"
              value={ideaFilters.kelas}
              onChange={(e) =>
                setIdeaFilters({
                  ...ideaFilters,
                  kelas: e.target.value === 'Semua' ? 'Semua' : (Number(e.target.value) as KelasLevel),
                })
              }
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="Semua">Semua Kelas (1–6)</option>
              {KELAS_OPTIONS.map((k) => (
                <option key={k} value={k}>
                  Kelas {k} SD
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="idea-materi-select" className="block text-xs font-medium text-slate-600 dark:text-slate-400">
              Filter Materi
            </label>
            <select
              id="idea-materi-select"
              value={ideaFilters.materi}
              onChange={(e) => setIdeaFilters({ ...ideaFilters, materi: e.target.value })}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="Semua">Semua Materi</option>
              {MATERI_OPTIONS.filter((m) => m !== 'Materi lainnya').map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="idea-game-select" className="block text-xs font-medium text-slate-600 dark:text-slate-400">
              Filter Jenis Game
            </label>
            <select
              id="idea-game-select"
              value={ideaFilters.jenisGame}
              onChange={(e) => setIdeaFilters({ ...ideaFilters, jenisGame: e.target.value })}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="Semua">Semua Jenis Game</option>
              {(Object.keys(MEDIA_GROUPS) as MediaCategoryGroup[]).map((group) => (
                <option key={group} value={group}>
                  Kelompok: {group}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="idea-theme-select" className="block text-xs font-medium text-slate-600 dark:text-slate-400">
              Filter Tema Visual
            </label>
            <select
              id="idea-theme-select"
              value={ideaFilters.temaVisual}
              onChange={(e) => setIdeaFilters({ ...ideaFilters, temaVisual: e.target.value })}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="Semua">Semua Tema</option>
              {VISUAL_THEMES.map((vt) => (
                <option key={vt} value={vt}>
                  {vt}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-800/50">
          <p className="text-xs font-semibold text-orange-600 dark:text-orange-400">
            Kelas {randomIdea.appliedKelas} SD · {randomIdea.appliedMateri} · {randomIdea.appliedMedia} ·{' '}
            {randomIdea.appliedVisualTheme}
          </p>
          <h3 className="mt-1 text-base font-bold text-slate-900 dark:text-white">
            {randomIdea.gameName}
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
            {randomIdea.description}
          </p>
          <div className="mt-3 grid grid-cols-1 gap-3 text-xs md:grid-cols-2">
            <div>
              <span className="font-semibold text-slate-800 dark:text-slate-200">Konsep:</span>{' '}
              <span className="text-slate-600 dark:text-slate-300">{randomIdea.concept}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-800 dark:text-slate-200">Tujuan Belajar:</span>{' '}
              <span className="text-slate-600 dark:text-slate-300">
                {randomIdea.learningObjective}
              </span>
            </div>
          </div>
          <div className="mt-3 text-xs text-slate-600 dark:text-slate-300">
            <span className="font-semibold text-slate-800 dark:text-slate-200">Fitur Unggulan:</span>{' '}
            {randomIdea.featuredCapabilities.join(' · ')}
          </div>
          <div className="mt-4">
            <button
              type="button"
              onClick={() => onGenerateFromIdea(randomIdea)}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              <Sparkles className="h-4 w-4" />
              <span>Generate Prompt dari Ide Ini</span>
            </button>
          </div>
        </div>
      </section>

      {/* Generator Submit Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Smart Prompt Engine akan menyusun 20 bagian spesifikasi lengkap siap tempel ke ChatGPT,
          Gemini, atau Claude.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setValidationErrors([]);
              onReset();
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset</span>
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            <Sparkles className="h-4 w-4" />
            <span>Generate Prompt</span>
          </button>
        </div>
      </div>
    </form>
  );
}
