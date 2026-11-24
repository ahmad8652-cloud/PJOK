import { ArrowRight, Search, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import { INSPIRATION_CATEGORIES } from '../data/catalog';
import { INSPIRATION_TEMPLATES } from '../data/inspirations';
import type { InspirationTemplate } from '../types/pjok';

interface DashboardInspirasiProps {
  onUseTemplate: (template: InspirationTemplate) => void;
}

export function DashboardInspirasi({ onUseTemplate }: DashboardInspirasiProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyCoreTemplates, setOnlyCoreTemplates] = useState<boolean>(false);

  const filteredTemplates = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return INSPIRATION_TEMPLATES.filter((item) => {
      if (onlyCoreTemplates && !item.isCoreTemplate) return false;
      if (selectedCategory !== 'Semua' && item.category !== selectedCategory) return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.materi.toLowerCase().includes(q) ||
        item.gameConcept.toLowerCase().includes(q)
      );
    });
  }, [selectedCategory, searchQuery, onlyCoreTemplates]);

  const aiMotionTemplate = INSPIRATION_TEMPLATES.find((t) => t.id === 'tpl-12-ai-motion');
  const engklekTemplate = INSPIRATION_TEMPLATES.find((t) => t.id === 'tpl-16-engklek');

  return (
    <div className="space-y-8">
      {/* Spotlight Banners for Featured Innovations */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="grid grid-cols-1 items-stretch overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 sm:grid-cols-12">
          <div className="min-h-44 bg-blue-50 dark:bg-slate-800 sm:col-span-5">
            <img
              src="/src/assets/images/ai_motion_student_1795485892483.jpg"
              alt="Siswa SD melakukan gerakan melompat di depan tablet deteksi gerak AI"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-between p-5 sm:col-span-7">
            <div>
              <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                Sorotan Teknologi · AI Motion Detection
              </p>
              <h2 className="mt-1 text-base font-bold text-slate-900 dark:text-white">
                Game Deteksi Gerak Tubuh Ramah Anak
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                Menggunakan MediaPipe atau MoveNet dengan izin kamera eksplisit, tanpa menyimpan
                video siswa, serta menyediakan mode alternatif tanpa kamera.
              </p>
            </div>
            {aiMotionTemplate && (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => onUseTemplate(aiMotionTemplate)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-blue-700"
                >
                  <span>Gunakan Template AI Motion</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 items-stretch overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 sm:grid-cols-12">
          <div className="min-h-44 bg-orange-50 dark:bg-slate-800 sm:col-span-5">
            <img
              src="/src/assets/images/local_wisdom_games_1795485891308.jpg"
              alt="Anak SD Indonesia bermain permainan tradisional engklek dan egrang di halaman sekolah"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-between p-5 sm:col-span-7">
            <div>
              <p className="text-xs font-semibold text-orange-600 dark:text-orange-400">
                Sorotan Budaya · Kearifan Lokal Nusantara
              </p>
              <h2 className="mt-1 text-base font-bold text-slate-900 dark:text-white">
                Integrasi Permainan Tradisional Daerah
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                Menghidupkan Gobak Sodor, Engklek, Egrang, dan Bentengan dengan cerita lokal, nilai
                sportivitas, dan penandaan fakta budaya untuk verifikasi guru.
              </p>
            </div>
            {engklekTemplate && (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => onUseTemplate(engklekTemplate)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-orange-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-orange-700"
                >
                  <span>Gunakan Template Engklek</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Search and Category Filters */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1">
            <label htmlFor="inspirasi-search" className="sr-only">
              Cari inspirasi atau template PJOK
            </label>
            <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="inspirasi-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari judul game, materi, atau konsep permainan..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="flex shrink-0 items-center gap-2 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
            <button
              type="button"
              onClick={() => setOnlyCoreTemplates(false)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
                !onlyCoreTemplates
                  ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-700 dark:text-white'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300'
              }`}
            >
              Semua ({INSPIRATION_TEMPLATES.length})
            </button>
            <button
              type="button"
              onClick={() => setOnlyCoreTemplates(true)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
                onlyCoreTemplates
                  ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-700 dark:text-white'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300'
              }`}
            >
              20 Template Inti
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5" role="group" aria-label="Filter Kategori Game">
          <button
            type="button"
            onClick={() => setSelectedCategory('Semua')}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
              selectedCategory === 'Semua'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            Semua Kategori
          </button>
          {INSPIRATION_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Inspiration Cards Grid */}
      <section aria-label="Daftar Inspirasi dan Template">
        {filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredTemplates.map((item) => (
              <article
                key={item.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 transition-colors hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-700"
              >
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {item.templateNumber ? `Template ${item.templateNumber} · ` : ''}
                    {item.category}
                  </p>
                  <h3 className="mt-1.5 text-lg font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    Materi: {item.materi} · Kelas {item.suitableClasses.join(', ')} SD
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {item.description}
                  </p>
                  <div className="mt-4 border-t border-slate-100 pt-3 dark:border-slate-800">
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                      Konsep Permainan
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                      {item.gameConcept}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-2">
                  <button
                    type="button"
                    onClick={() => onUseTemplate(item)}
                    aria-label={`Gunakan Template ${item.title}`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>Gunakan Template</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              Tidak ada inspirasi yang cocok dengan pencarian Anda.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('Semua');
                setSearchQuery('');
                setOnlyCoreTemplates(false);
              }}
              className="mt-4 rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Reset Filter Inspirasi
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
