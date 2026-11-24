import {
  BookmarkCheck,
  Check,
  Copy,
  Download,
  Edit3,
  Eye,
  Printer,
  RefreshCw,
  RotateCcw,
  SlidersHorizontal,
  Wand2,
} from 'lucide-react';
import { useState } from 'react';
import { copyTextToClipboard, downloadTextFile } from '../utils/exporters';
import type { PromptGeneratorInput } from '../types/pjok';

interface PromptStudioProps {
  promptText: string;
  input: PromptGeneratorInput;
  isSavedCurrent: boolean;
  onChangePromptText: (nextText: string) => void;
  onRegenerate: () => void;
  onSaveToHistory: () => void;
  onResetWorkspace: () => void;
  onBackToGenerator: () => void;
  onLogAction: (action: 'copy' | 'download', detail: string) => void;
}

export function PromptStudio({
  promptText,
  input,
  isSavedCurrent,
  onChangePromptText,
  onRegenerate,
  onSaveToHistory,
  onResetWorkspace,
  onBackToGenerator,
  onLogAction,
}: PromptStudioProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  const title = input.gameSettings.title.trim() || 'Prompt Pembelajaran PJOK SD';
  const wordCount = promptText.trim() ? promptText.trim().split(/\s+/).length : 0;
  const charCount = promptText.length;

  const handleCopy = async () => {
    if (!promptText.trim()) return;
    const ok = await copyTextToClipboard(promptText);
    if (ok) {
      setCopied(true);
      onLogAction('copy', `Disalin ke clipboard (${wordCount} kata)`);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadTxt = () => {
    if (!promptText.trim()) return;
    downloadTextFile(promptText, title, 'txt');
    onLogAction('download', 'Diunduh sebagai file TXT');
  };

  const handleDownloadMd = () => {
    if (!promptText.trim()) return;
    downloadTextFile(promptText, title, 'md');
    onLogAction('download', 'Diunduh sebagai file Markdown (.md)');
  };

  const handlePrint = () => {
    window.print();
  };

  if (!promptText.trim()) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">
        <Wand2 className="mx-auto h-10 w-10 text-blue-600 dark:text-blue-400" />
        <h2 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
          Prompt Studio Siap Digunakan
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-600 dark:text-slate-300">
          Belum ada prompt aktif di studio. Susun prompt baru di Smart Generator atau pilih salah
          satu template siap pakai.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            onClick={onBackToGenerator}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Buka Smart Generator</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Metadata & Action Toolbar */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 no-print">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Kelas {input.kelas} SD · Fase {input.fase} · {input.materi} · {input.jenisMedia}
            </p>
            <h2 className="mt-1 truncate text-lg font-bold text-slate-900 dark:text-white">
              {title}
            </h2>
            <p className="mt-1 text-xs tabular-nums text-slate-500 dark:text-slate-400">
              {wordCount} kata · {charCount} karakter · Struktur 20 Bagian Lengkap
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700 whitespace-nowrap"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? 'Tersalin!' : 'Copy Prompt'}</span>
            </button>

            <button
              type="button"
              onClick={onSaveToHistory}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-emerald-700 whitespace-nowrap"
            >
              <BookmarkCheck className="h-4 w-4" />
              <span>{isSavedCurrent ? 'Tersimpan di Riwayat' : 'Simpan ke Riwayat'}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsEditing((prev) => !prev)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 whitespace-nowrap"
            >
              {isEditing ? <Eye className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
              <span>{isEditing ? 'Preview Prompt' : 'Edit Prompt'}</span>
            </button>

            <button
              type="button"
              onClick={onRegenerate}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 whitespace-nowrap"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Generate Ulang</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadTxt}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 whitespace-nowrap"
            >
              <Download className="h-4 w-4" />
              <span>Download TXT</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadMd}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 whitespace-nowrap"
            >
              <Download className="h-4 w-4" />
              <span>Download MD</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 whitespace-nowrap"
            >
              <Printer className="h-4 w-4" />
              <span>Cetak</span>
            </button>

            <button
              type="button"
              onClick={onBackToGenerator}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 whitespace-nowrap"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>Ubah Pengaturan</span>
            </button>

            <button
              type="button"
              onClick={onResetWorkspace}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 whitespace-nowrap"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </section>

      {/* Editor or Structured Preview */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 print-only-content">
        {isEditing ? (
          <div>
            <label htmlFor="prompt-editor-textarea" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Editor Prompt (Anda dapat menyempurnakan isi prompt secara langsung)
            </label>
            <textarea
              id="prompt-editor-textarea"
              value={promptText}
              onChange={(e) => onChangePromptText(e.target.value)}
              rows={28}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs leading-relaxed text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800 no-print">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Preview Master Prompt Siap Pakai
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Salin ke ChatGPT, Gemini, atau Claude
              </span>
            </div>
            <pre
              data-testid="prompt-preview-output"
              className="max-h-[70vh] overflow-y-auto whitespace-pre-wrap rounded-xl bg-slate-50 p-5 font-mono text-xs leading-relaxed text-slate-800 dark:bg-slate-950 dark:text-slate-200 print:max-h-none print:bg-white print:p-0"
            >
              {promptText}
            </pre>
          </div>
        )}
      </section>
    </div>
  );
}
