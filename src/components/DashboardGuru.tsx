import {
  ArrowRight,
  BookOpen,
  Compass,
  Copy,
  FileText,
  Gamepad2,
  Layers,
  Plus,
  Sparkles,
} from 'lucide-react';
import { INSPIRATION_CATEGORIES, MEDIA_GROUPS } from '../data/catalog';
import { INSPIRATION_TEMPLATES } from '../data/inspirations';
import type { ActivityLogItem, InspirationTemplate, SavedPrompt } from '../types/pjok';

interface DashboardGuruProps {
  savedPrompts: SavedPrompt[];
  activities: ActivityLogItem[];
  onCreateNew: () => void;
  onOpenInspirasi: () => void;
  onUseTemplate: (template: InspirationTemplate) => void;
  onOpenPromptInStudio: (prompt: SavedPrompt) => void;
  onCopyPromptText: (text: string) => void;
}

function formatRelativeDate(iso: string): string {
  try {
    const date = new Date(iso);
    return date.toLocaleString('id-ID', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

export function DashboardGuru({
  savedPrompts,
  activities,
  onCreateNew,
  onOpenInspirasi,
  onUseTemplate,
  onOpenPromptInStudio,
  onCopyPromptText,
}: DashboardGuruProps) {
  const latestPrompt = savedPrompts[0] ?? null;

  // Deterministic daily highlight based on calendar day
  const dayIndex = new Date().getDate() % INSPIRATION_TEMPLATES.length;
  const dailyInspiration = INSPIRATION_TEMPLATES[dayIndex];

  const totalMediaTypes = Object.values(MEDIA_GROUPS).reduce(
    (sum, list) => sum + list.length,
    0
  );

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 items-stretch lg:grid-cols-12">
          <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-7">
            <div>
              <p className="text-xs font-semibold tracking-wide text-orange-600 dark:text-orange-400">
                Create, Play, Move, and Learn!
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl [text-wrap:balance]">
                PJOK INTERACTIVE GAME PROMPT GENERATOR
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
                Platform kreatif berbasis AI untuk membantu guru PJOK Sekolah Dasar menciptakan
                media pembelajaran digital, game edukasi, simulasi olahraga, serta aktivitas fisik
                yang aktif, interaktif, aman, dan menyenangkan.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onCreateNew}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 whitespace-nowrap shrink-0"
              >
                <Plus className="h-4 w-4" />
                <span>Buat Prompt Baru</span>
              </button>
              <button
                type="button"
                onClick={onOpenInspirasi}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 whitespace-nowrap shrink-0"
              >
                <Compass className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>Jelajahi 22+ Template</span>
              </button>
            </div>
          </div>

          <div className="relative min-h-56 bg-gradient-to-br from-blue-50 via-emerald-50 to-orange-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 lg:col-span-5">
            <img
              src="/src/assets/images/hero_pjok_students_1795485891112.jpg"
              alt="Ilustrasi kartun anak SD Indonesia berolahraga ceria di lapangan sekolah"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* KPI Metrics Row */}
      <section aria-label="Ringkasan Statistik Studio">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Total Prompt Dibuat
              </span>
              <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="mt-3 text-3xl font-bold tabular-nums text-slate-900 dark:text-white">
              {savedPrompts.length}
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Tersimpan aman di browser
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Total Template Tersedia
              </span>
              <BookOpen className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="mt-3 text-3xl font-bold tabular-nums text-slate-900 dark:text-white">
              {INSPIRATION_TEMPLATES.length}
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Siap pakai untuk Kelas 1–6 SD
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Total Kategori Media
              </span>
              <Layers className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            <p className="mt-3 text-3xl font-bold tabular-nums text-slate-900 dark:text-white">
              {Object.keys(MEDIA_GROUPS).length}
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Mencakup {totalMediaTypes} jenis media digital
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Total Kategori Game
              </span>
              <Gamepad2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="mt-3 text-3xl font-bold tabular-nums text-slate-900 dark:text-white">
              {INSPIRATION_CATEGORIES.length}
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Dari Lokomotor hingga AI Motion
            </p>
          </div>
        </div>
      </section>

      {/* Main Dashboard 2-Column Content */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Latest Prompt + Platform Vision */}
        <div className="space-y-6 lg:col-span-7">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Prompt Terakhir Dibuat
              </h3>
              {latestPrompt && (
                <span className="text-xs tabular-nums text-slate-500 dark:text-slate-400">
                  {formatRelativeDate(latestPrompt.updatedAt)}
                </span>
              )}
            </div>

            {latestPrompt ? (
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Kelas {latestPrompt.kelas} SD · Fase {latestPrompt.fase} · {latestPrompt.materi} ·{' '}
                    {latestPrompt.jenisMedia}
                  </p>
                  <h4 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                    {latestPrompt.title}
                  </h4>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {latestPrompt.inputSnapshot.tujuanPembelajaran}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => onOpenPromptInStudio(latestPrompt)}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>Buka di Prompt Studio</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onCopyPromptText(latestPrompt.generatedPrompt)}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    <Copy className="h-4 w-4" />
                    <span>Salin Prompt</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-5 py-6 text-center">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Belum ada prompt tersimpan.
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Mulai buat prompt pertama Anda dari Smart Generator atau pilih Template siap pakai.
                </p>
                <button
                  type="button"
                  onClick={onCreateNew}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4" />
                  <span>Buat Prompt Pertama</span>
                </button>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Visi Transformasi Guru PJOK Digital
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Menjadi platform kreatif digital yang membantu guru PJOK Indonesia bertransformasi dari
              pengguna media pembelajaran menjadi pencipta media pembelajaran interaktif berbasis AI,
              Coding, dan Game-Based Learning.
            </p>
          </div>
        </div>

        {/* Right Column: Daily Inspiration + Activity Log */}
        <div className="space-y-6 lg:col-span-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              Inspirasi Game PJOK Hari Ini
            </p>
            <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
              {dailyInspiration.title}
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {dailyInspiration.materi} · Kelas {dailyInspiration.suitableClasses.join(', ')} SD
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {dailyInspiration.description}
            </p>
            <div className="mt-4">
              <button
                type="button"
                onClick={() => onUseTemplate(dailyInspiration)}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-emerald-700"
              >
                <span>Gunakan Template Ini</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Aktivitas Terakhir
            </h3>
            {activities.length > 0 ? (
              <ul className="mt-4 divide-y divide-slate-100 dark:divide-slate-800">
                {activities.slice(0, 5).map((act) => (
                  <li key={act.id} className="py-3 first:pt-0 last:pb-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                          {act.title}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
                          {act.detail}
                        </p>
                      </div>
                      <span className="shrink-0 text-[11px] tabular-nums text-slate-400 dark:text-slate-500">
                        {formatRelativeDate(act.timestamp)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                Belum ada riwayat aktivitas di sesi ini.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
