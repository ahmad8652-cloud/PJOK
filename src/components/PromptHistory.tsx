import { Copy, Edit3, FolderOpen, Plus, Search, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { ALL_MEDIA_OPTIONS, KELAS_OPTIONS, MATERI_OPTIONS } from '../data/catalog';
import type { SavedPrompt } from '../types/pjok';

interface PromptHistoryProps {
  prompts: SavedPrompt[];
  onOpenInStudio: (prompt: SavedPrompt) => void;
  onEditInGenerator: (prompt: SavedPrompt) => void;
  onCopyPrompt: (text: string) => void;
  onDeletePrompt: (id: string, title: string) => void;
  onCreateNew: () => void;
}

export function PromptHistory({
  prompts,
  onOpenInStudio,
  onEditInGenerator,
  onCopyPrompt,
  onDeletePrompt,
  onCreateNew,
}: PromptHistoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [kelasFilter, setKelasFilter] = useState<string>('Semua');
  const [materiFilter, setMateriFilter] = useState<string>('Semua');
  const [mediaFilter, setMediaFilter] = useState<string>('Semua');

  const filteredPrompts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return prompts.filter((p) => {
      if (kelasFilter !== 'Semua' && String(p.kelas) !== kelasFilter) return false;
      if (materiFilter !== 'Semua' && p.materi !== materiFilter) return false;
      if (mediaFilter !== 'Semua' && p.jenisMedia !== mediaFilter) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.materi.toLowerCase().includes(q) ||
        p.generatedPrompt.toLowerCase().includes(q)
      );
    });
  }, [prompts, searchQuery, kelasFilter, materiFilter, mediaFilter]);

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          <div className="relative md:col-span-5">
            <label htmlFor="history-search" className="sr-only">
              Cari riwayat prompt
            </label>
            <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="history-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari judul, materi, atau isi prompt..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-10 text-sm text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="history-kelas-filter" className="sr-only">
              Filter Kelas
            </label>
            <select
              id="history-kelas-filter"
              value={kelasFilter}
              onChange={(e) => setKelasFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="Semua">Semua Kelas</option>
              {KELAS_OPTIONS.map((k) => (
                <option key={k} value={String(k)}>
                  Kelas {k} SD
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3">
            <label htmlFor="history-materi-filter" className="sr-only">
              Filter Materi
            </label>
            <select
              id="history-materi-filter"
              value={materiFilter}
              onChange={(e) => setMateriFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="Semua">Semua Materi</option>
              {MATERI_OPTIONS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="history-media-filter" className="sr-only">
              Filter Jenis Media
            </label>
            <select
              id="history-media-filter"
              value={mediaFilter}
              onChange={(e) => setMediaFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="Semua">Semua Media</option>
              {ALL_MEDIA_OPTIONS.map((opt) => (
                <option key={opt.label} value={opt.label}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Saved Prompts List */}
      {filteredPrompts.length > 0 ? (
        <div className="space-y-4">
          {filteredPrompts.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Kelas {item.kelas} SD · Fase {item.fase} · {item.materi} · {item.jenisMedia} ·{' '}
                    <span className="tabular-nums">
                      {new Date(item.updatedAt).toLocaleDateString('id-ID', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </p>
                  <h3 className="mt-1 truncate text-base font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                    {item.inputSnapshot.tujuanPembelajaran}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => onOpenInStudio(item)}
                    aria-label={`Buka prompt ${item.title}`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-blue-700"
                  >
                    <FolderOpen className="h-3.5 w-3.5" />
                    <span>Buka</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onEditInGenerator(item)}
                    aria-label={`Edit pengaturan ${item.title}`}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onCopyPrompt(item.generatedPrompt)}
                    aria-label={`Salin prompt ${item.title}`}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    <span>Salin</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeletePrompt(item.id, item.title)}
                    aria-label={`Hapus prompt ${item.title}`}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 px-3.5 py-2 text-xs font-semibold text-red-700 hover:bg-red-50 dark:border-red-900/60 dark:text-red-400 dark:hover:bg-red-950/40"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Hapus</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            {prompts.length === 0
              ? 'Belum ada prompt yang disimpan di riwayat.'
              : 'Tidak ada prompt yang sesuai dengan filter pencarian.'}
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {prompts.length === 0
              ? 'Buat prompt melalui Smart Generator lalu klik Simpan ke Riwayat.'
              : 'Ubah kata kunci pencarian atau reset filter di atas.'}
          </p>
          <div className="mt-4 flex justify-center gap-3">
            {prompts.length === 0 ? (
              <button
                type="button"
                onClick={onCreateNew}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
                <span>Buat Prompt Baru</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setKelasFilter('Semua');
                  setMateriFilter('Semua');
                  setMediaFilter('Semua');
                }}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Reset Filter
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
