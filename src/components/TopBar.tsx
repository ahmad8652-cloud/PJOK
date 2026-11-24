import { Menu, Moon, Plus, Sun } from 'lucide-react';
import type { ActiveWorkspace } from '../types/pjok';

interface TopBarProps {
  activeWorkspace: ActiveWorkspace;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onCreateNewPrompt: () => void;
  onOpenMobileMenu: () => void;
}

const WORKSPACE_TITLES: Record<ActiveWorkspace, string> = {
  dashboard: 'Dashboard Guru PJOK',
  inspirasi: 'Dashboard Inspirasi & Template',
  generator: 'Smart Prompt Generator',
  studio: 'Dashboard Prompt Studio',
  riwayat: 'Riwayat Prompt Tersimpan',
};

export function TopBar({
  activeWorkspace,
  theme,
  onToggleTheme,
  onCreateNewPrompt,
  onOpenMobileMenu,
}: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/95 sm:px-6 no-print">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          aria-label="Buka menu navigasi"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="min-w-0">
          <h1 className="truncate text-base font-bold text-slate-900 dark:text-white sm:text-lg">
            {WORKSPACE_TITLES[activeWorkspace]}
          </h1>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Aktifkan Light Mode' : 'Aktifkan Dark Mode'}
          className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 whitespace-nowrap shrink-0 sm:px-3"
        >
          {theme === 'dark' ? (
            <>
              <Sun className="h-4 w-4 text-orange-400" />
              <span className="hidden sm:inline">Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="h-4 w-4 text-blue-600" />
              <span className="hidden sm:inline">Dark Mode</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onCreateNewPrompt}
          aria-label="Buat Prompt Baru"
          className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-blue-600 px-3 text-xs font-semibold text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 whitespace-nowrap shrink-0 sm:gap-2 sm:px-4 sm:text-sm"
        >
          <Plus className="h-4 w-4" />
          <span className="sm:hidden">Buat Baru</span>
          <span className="hidden sm:inline">Buat Prompt Baru</span>
        </button>
      </div>
    </header>
  );
}
