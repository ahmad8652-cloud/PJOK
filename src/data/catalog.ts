import type { MediaCategoryGroup } from '../types/pjok';

export const KELAS_OPTIONS = [1, 2, 3, 4, 5, 6] as const;

export const SEMESTER_OPTIONS = ['Ganjil', 'Genap'] as const;

export const MATERI_OPTIONS = [
  'Gerak Lokomotor',
  'Gerak Non-Lokomotor',
  'Gerak Manipulatif',
  'Kombinasi Gerak Dasar',
  'Permainan Bola Besar',
  'Permainan Bola Kecil',
  'Atletik',
  'Senam Lantai',
  'Senam Irama',
  'Kebugaran Jasmani',
  'Aktivitas Air',
  'Bela Diri',
  'Permainan Tradisional',
  'Pola Hidup Sehat',
  'Gizi Seimbang',
  'P3K',
  'Keselamatan Aktivitas Jasmani',
  'Materi lainnya',
] as const;

export const MEDIA_GROUPS: Record<MediaCategoryGroup, string[]> = {
  'Media Interaktif': [
    'Buku digital',
    'Komik digital',
    'Presentasi interaktif',
    'Infografis',
    'Video interaktif',
    'Simulasi olahraga',
    'Virtual tour',
  ],
  'Game Edukasi': [
    'Adventure Game',
    'Platformer Game',
    'Drag and Drop',
    'Puzzle Game',
    'Matching Game',
    'Memory Card',
    'Quiz Game',
    'Board Game',
    'Endless Runner',
    'Mission Challenge',
    'Simulation Game',
    'Role Playing Game',
  ],
  'Game Aktivitas Fisik': [
    'Follow the Movement',
    'Movement Challenge',
    'Balance Challenge',
    'Coordination Game',
    'Fitness Challenge',
    'Group Movement Game',
  ],
  'AI dan Coding': [
    'AI Motion Detection',
    'AI Personal Coach',
    'Pose Estimation',
    'Camera-Based Game',
    'Scratch-Based Game',
    'AI Movement Feedback',
    'Sensor-Based Game',
  ],
};

export const ALL_MEDIA_OPTIONS: { group: MediaCategoryGroup; label: string }[] = (
  Object.entries(MEDIA_GROUPS) as [MediaCategoryGroup, string[]][]
).flatMap(([group, items]) => items.map((label) => ({ group, label })));

export const AI_MOTION_TECHNOLOGIES = [
  'MediaPipe Pose Landmarker',
  'TensorFlow.js',
  'MoveNet',
  'Scratch AI Extension',
] as const;

export const AI_MOTION_ACTIVITIES = [
  'Gerakan berjalan di tempat',
  'Gerakan mengangkat tangan',
  'Gerakan melompat',
  'Gerakan keseimbangan',
  'Gerakan koordinasi tangan dan kaki',
  'Gerakan lokomotor sederhana',
] as const;

export const SMART_QUIZ_TYPES = [
  'Pilihan ganda',
  'Benar atau salah',
  'Tebak gambar',
  'Menjodohkan',
  'Drag and Drop',
  'Susun kata',
  'Puzzle',
  'Tebak gerakan',
] as const;

export const LOCAL_WISDOM_GAMES = [
  'Gobak Sodor',
  'Engklek',
  'Egrang',
  'Bentengan',
  'Lompat Tali',
  'Congklak',
  'Hadang',
  'Permainan tradisional daerah',
] as const;

export const PEDAGOGICAL_APPROACHES = [
  'Game Based Learning',
  'Problem Based Learning',
  'Project Based Learning',
  'Discovery Learning',
  'Cooperative Learning',
  'TPACK',
  'Pembelajaran Berdiferensiasi',
] as const;

export const DEEP_LEARNING_PILLARS = {
  berkesadaran: [
    'Siswa memahami tujuan aktivitas',
    'Siswa mengenali kemampuan diri',
    'Siswa memahami aturan keselamatan',
  ],
  bermakna: [
    'Materi berkaitan dengan kehidupan sehari-hari',
    'Aktivitas memiliki manfaat nyata',
    'Menghubungkan olahraga dengan kesehatan',
  ],
  menggembirakan: [
    'Game menarik',
    'Tantangan menyenangkan',
    'Reward positif',
    'Interaksi aktif',
    'Kolaborasi antarsiswa',
  ],
} as const;

export const VISUAL_DESIGN_STYLES = [
  '2D Cartoon',
  '3D Cartoon',
  'Pixel Art',
  'Flat Illustration',
  'Anime Education',
  'Futuristic Sport',
  'Adventure World',
  'Minimalist',
] as const;

export const VISUAL_THEMES = [
  'Dunia Olahraga',
  'Hutan Petualangan',
  'Galaksi Olahraga',
  'Dunia Bawah Laut',
  'Stadion Mini',
  'Sekolah Sehat',
  'Desa Permainan Tradisional',
] as const;

export const INSPIRATION_CATEGORIES = [
  'Game Gerak Lokomotor',
  'Game Gerak Non-Lokomotor',
  'Game Gerak Manipulatif',
  'Game Kebugaran Jasmani',
  'Game Permainan Bola Besar',
  'Game Permainan Bola Kecil',
  'Game Atletik',
  'Game Senam',
  'Game Permainan Tradisional',
  'Game Pola Hidup Sehat',
  'Game Gizi Seimbang',
  'Game Keselamatan Olahraga',
  'Game AI Motion Detection',
  'Game Petualangan PJOK',
] as const;
