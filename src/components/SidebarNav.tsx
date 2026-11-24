import {
  Compass,
  FolderClock,
  LayoutDashboard,
  Sparkles,
  Wand2,
  X,
} from 'lucide-react';
import type { ActiveWorkspace } from '../types/pjok';

interface SidebarNavProps {
  activeWorkspace: ActiveWorkspace;
  onSelectWorkspace: (workspace: ActiveWorkspace) => void;
  savedCount: number;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

const NAV_ITEMS: {
  id: ActiveWorkspace;
  label: string;
  subtitle: string;
  icon: typeof LayoutDashboard;
}[] = [
  {
    id: 'dashboard',
    label: 'Dashboard Guru',
    subtitle: 'Ringkasan & statistik',
    icon: LayoutDashboard,
  },
  {
    id: 'inspirasi',
    label: 'Dashboard Inspirasi',
    subtitle: '22+ ide & template siap pakai',
    icon: Compass,
  },
  {
    id: 'generator',
    label: 'Smart Generator',
    subtitle: 'Rancang prompt dinamis',
    icon: Wand2,
  },
  {
    id: 'studio',
    label: 'Prompt Studio',
    subtitle: 'Edit, salin, ekspor & cetak',
    icon: Sparkles,
  },
  {
    id: 'riwayat',
    label: 'Riwayat Prompt',
    subtitle: 'Arsip tersimpan lokal',
    icon: FolderClock,
  },
];

export function SidebarNav({
  activeWorkspace,
  onSelectWorkspace,
  savedCount,
  mobileOpen,
  onCloseMobile,
}: SidebarNavProps) {
  const handlePick = (id: ActiveWorkspace) => {
    onSelectWorkspace(id);
    onCloseMobile();
  };

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden no-print"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        aria-label="Navigasi Utama"
        className={`fixed inset-y-0 left-0 z-50 flex w-68 flex-col border-r border-slate-200 bg-white transition-transform duration-200 dark:border-slate-800 dark:bg-slate-900 lg:static lg:translate-x-0 no-print ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <div className="min-w-0">
            <span className="block truncate text-base font-bold tracking-tight text-blue-700 dark:text-blue-400">
              PJOK Prompt Studio
            </span>
            <span className="block truncate text-xs text-slate-500 dark:text-slate-400">
              Create, Play, Move, and Learn!
            </span>
          </div>
          <button
            type="button"
            onClick={onCloseMobile}
            aria-label="Tutup menu navigasi"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1.5 overflow-y-auto px-3 py-4">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeWorkspace === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handlePick(item.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <Icon
                  className={`h-5 w-5 shrink-0 ${
                    isActive ? 'text-white' : 'text-blue-600 dark:text-blue-400'
                  }`}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-semibold">{item.label}</span>
                    {item.id === 'riwayat' && (
                      <span
                        className={`tabular-nums text-xs font-semibold ${
                          isActive ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {savedCount}
                      </span>
                    )}
                  </div>
                  <p
                    className={`truncate text-xs ${
                      isActive ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {item.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </nav>

        <div className="border-t border-slate-200 p-4 dark:border-slate-800">
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            Kurikulum Merdeka SD
          </p>
          <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            Fase A (Kls 1–2) · Fase B (Kls 3–4) · Fase C (Kls 5–6)
          </p>
          <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-500">
            Penyimpanan lokal aktif (offline-ready).
          </p>
        </div>
      </aside>
    </>
  );
}
