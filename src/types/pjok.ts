export type KelasLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type FaseCode = 'A' | 'B' | 'C';
export type SemesterType = 'Ganjil' | 'Genap';

export type MediaCategoryGroup =
  | 'Media Interaktif'
  | 'Game Edukasi'
  | 'Game Aktivitas Fisik'
  | 'AI dan Coding';

export interface AIMotionConfig {
  enabled: boolean;
  technology: string;
  activity: string;
  detectPose: boolean;
  giveInstructions: boolean;
  studentFollows: boolean;
  movementFeedback: boolean;
  showScore: boolean;
  cameraPermissionRequired: boolean;
  nonCameraAlternative: boolean;
  noAutoVideoSave: boolean;
  noPerfectDetectionClaim: boolean;
  safeInclusiveAlternative: boolean;
}

export interface SmartQuizConfig {
  enabled: boolean;
  quizType: string;
  questionCount: number;
  difficulty: 'Mudah' | 'Sedang' | 'Menantang';
  hasTimer: boolean;
  timerPerQuestionSeconds: number;
  autoAnswer: boolean;
  autoScore: boolean;
  showExplanation: boolean;
  positiveFeedback: boolean;
  showEvaluationResult: boolean;
}

export interface LocalWisdomConfig {
  enabled: boolean;
  traditionalGame: string;
  regionName: string;
  characterValues: string;
  includeStory: boolean;
  includeLocalCharacters: boolean;
  includeRulesAndMission: boolean;
  includeGroupChallenge: boolean;
}

export interface DeepLearningConfig {
  berkesadaran: string[];
  bermakna: string[];
  menggembirakan: string[];
  pedagogicalApproach: string;
}

export interface GameSettingsConfig {
  title: string;
  theme: string;
  mainCharacter: string;
  levelCount: number;
  difficulty: 'Dasar' | 'Menengah' | 'Lanjutan';
  mission: string;
  scoringSystem: string;
  rewardSystem: string;
  hasTimer: boolean;
  timerMinutes: number;
  feedbackStyle: string;
  hasLeaderboard: boolean;
  hasAudio: boolean;
  hasAnimation: boolean;
  hasStartButton: boolean;
  hasPauseButton: boolean;
  hasRestartButton: boolean;
}

export interface VisualDesignConfig {
  visualStyle: string;
  visualTheme: string;
}

export interface PromptGeneratorInput {
  jenjang: 'SD';
  kelas: KelasLevel;
  fase: FaseCode;
  semester: SemesterType;
  materi: string;
  customMateri: string;
  tujuanPembelajaran: string;
  alokasiWaktu: string;
  jumlahPesertaDidik: string;
  karakteristikPesertaDidik: string;
  catatanInklusif: string;
  mediaGroup: MediaCategoryGroup;
  jenisMedia: string;
  aiMotion: AIMotionConfig;
  smartQuiz: SmartQuizConfig;
  localWisdom: LocalWisdomConfig;
  deepLearning: DeepLearningConfig;
  gameSettings: GameSettingsConfig;
  visualDesign: VisualDesignConfig;
}

export interface SavedPrompt {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  kelas: KelasLevel;
  fase: FaseCode;
  materi: string;
  mediaGroup: MediaCategoryGroup;
  jenisMedia: string;
  generatedPrompt: string;
  inputSnapshot: PromptGeneratorInput;
  sourceTemplateTitle?: string;
}

export interface ActivityLogItem {
  id: string;
  action: 'generate' | 'save' | 'edit' | 'copy' | 'download' | 'template' | 'delete';
  title: string;
  detail: string;
  timestamp: string;
}

export interface InspirationTemplate {
  id: string;
  templateNumber?: number;
  title: string;
  description: string;
  materi: string;
  category: string;
  suitableClasses: KelasLevel[];
  gameConcept: string;
  isCoreTemplate: boolean;
  presetInput: Partial<PromptGeneratorInput>;
}

export interface RandomIdeaFilters {
  kelas: KelasLevel | 'Semua';
  materi: string;
  jenisGame: string;
  temaVisual: string;
}

export interface RandomIdeaResult {
  gameName: string;
  description: string;
  concept: string;
  learningObjective: string;
  featuredCapabilities: string[];
  appliedKelas: KelasLevel;
  appliedMateri: string;
  appliedMedia: string;
  appliedMediaGroup: MediaCategoryGroup;
  appliedVisualTheme: string;
  appliedVisualStyle: string;
}

export type ActiveWorkspace =
  | 'dashboard'
  | 'inspirasi'
  | 'generator'
  | 'studio'
  | 'riwayat';
