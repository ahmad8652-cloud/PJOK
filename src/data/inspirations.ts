import { createDefaultInput, getFaseFromKelas } from '../engine/promptEngine';
import type { InspirationTemplate, KelasLevel, PromptGeneratorInput } from '../types/pjok';

function buildPreset(
  overrides: Partial<PromptGeneratorInput> & { kelas: KelasLevel }
): Partial<PromptGeneratorInput> {
  const base = createDefaultInput();
  return {
    ...base,
    ...overrides,
    fase: getFaseFromKelas(overrides.kelas),
    aiMotion: { ...base.aiMotion, ...overrides.aiMotion },
    smartQuiz: { ...base.smartQuiz, ...overrides.smartQuiz },
    localWisdom: { ...base.localWisdom, ...overrides.localWisdom },
    deepLearning: { ...base.deepLearning, ...overrides.deepLearning },
    gameSettings: { ...base.gameSettings, ...overrides.gameSettings },
    visualDesign: { ...base.visualDesign, ...overrides.visualDesign },
  };
}

export const INSPIRATION_TEMPLATES: InspirationTemplate[] = [
  {
    id: 'tpl-1-lokomotor',
    templateNumber: 1,
    title: 'Petualangan Gerak Lokomotor',
    description:
      'Game petualangan interaktif melatih berjalan, berlari zig-zag, melompat, dan meloncat melewati rintangan pulau sehat.',
    materi: 'Gerak Lokomotor',
    category: 'Game Gerak Lokomotor',
    suitableClasses: [1, 2],
    gameConcept:
      'Siswa membantu karakter kartun melewati 4 pulau rintangan dengan memperagakan pola langkah dan lompatan aman di kelas maupun lapangan.',
    isCoreTemplate: true,
    presetInput: buildPreset({
      kelas: 1,
      materi: 'Gerak Lokomotor',
      mediaGroup: 'Game Edukasi',
      jenisMedia: 'Adventure Game',
      tujuanPembelajaran:
        'Peserta didik mampu mempraktikkan variasi gerak dasar lokomotor (berjalan, berlari, dan melompat) dengan koordinasi tubuh yang seimbang dan aman.',
      gameSettings: {
        ...createDefaultInput().gameSettings,
        title: 'Petualangan Pulau Lokomotor',
        theme: 'Hutan Petualangan',
        mainCharacter: 'Bimo si Kelinci Tangkas',
        levelCount: 4,
        difficulty: 'Dasar',
        mission: 'Mengumpulkan 4 buah bintang gerak dengan berjalan lurus, lari pelan, dan melompat dua kaki.',
      },
      visualDesign: { visualStyle: '2D Cartoon', visualTheme: 'Hutan Petualangan' },
    }),
  },
  {
    id: 'tpl-2-non-lokomotor',
    templateNumber: 2,
    title: 'Misi Gerak Non-Lokomotor',
    description:
      'Tantangan gerak di tempat seperti menekuk lutut, memutar lengan, mengayun, dan meregangkan otot dengan panduan visual.',
    materi: 'Gerak Non-Lokomotor',
    category: 'Game Gerak Non-Lokomotor',
    suitableClasses: [1, 2, 3],
    gameConcept:
      'Pemain menirukan pose peregangan dan kelenturan karakter di layar sebelum indikator energi hijau penuh.',
    isCoreTemplate: true,
    presetInput: buildPreset({
      kelas: 2,
      materi: 'Gerak Non-Lokomotor',
      mediaGroup: 'Game Aktivitas Fisik',
      jenisMedia: 'Follow the Movement',
      tujuanPembelajaran:
        'Peserta didik mampu mempraktikkan gerak non-lokomotor (mengayun, menekuk, dan memutar sendi) secara terkontrol untuk kelenturan tubuh.',
      gameSettings: {
        ...createDefaultInput().gameSettings,
        title: 'Misi Robot Lentur Sehat',
        theme: 'Sekolah Sehat',
        mainCharacter: 'Lala & Robot Lentur',
        levelCount: 3,
        difficulty: 'Dasar',
        mission: 'Mengisi baterai energi pagi lewat gerakan memutar bahu, menekuk lutut, dan peregangan aman.',
      },
      visualDesign: { visualStyle: '2D Cartoon', visualTheme: 'Sekolah Sehat' },
    }),
  },
  {
    id: 'tpl-3-lempar-tangkap',
    templateNumber: 3,
    title: 'Lempar Tangkap Bola',
    description:
      'Game koordinasi mata dan tangan untuk melatih teknik melempar bola melambung, mendatar, dan menangkap dua tangan.',
    materi: 'Gerak Manipulatif',
    category: 'Game Gerak Manipulatif',
    suitableClasses: [2, 3, 4],
    gameConcept:
      'Simulasi arah lemparan dan tantangan pasangan di lapangan nyata dengan pencatatan skor kerja sama.',
    isCoreTemplate: true,
    presetInput: buildPreset({
      kelas: 3,
      materi: 'Gerak Manipulatif',
      mediaGroup: 'Game Edukasi',
      jenisMedia: 'Simulation Game',
      tujuanPembelajaran:
        'Peserta didik mampu mempraktikkan variasi gerak manipulatif melempar dan menangkap bola lunak secara akurat dan kooperatif.',
      gameSettings: {
        ...createDefaultInput().gameSettings,
        title: 'Akademi Lempar Tangkap Bintang',
        theme: 'Stadion Mini',
        mainCharacter: 'Tim Tunas Bola SD',
        levelCount: 4,
        difficulty: 'Menengah',
        mission: 'Menuntaskan 10 operan bersih berpasangan tanpa menjatuhkan bola sambil menjaga jarak aman.',
      },
      visualDesign: { visualStyle: 'Flat Illustration', visualTheme: 'Stadion Mini' },
    }),
  },
  {
    id: 'tpl-4-kebugaran',
    templateNumber: 4,
    title: 'Petualangan Kebugaran',
    description:
      'Misi sirkuit latihan kebugaran jasmani ramah anak: daya tahan, kelincahan, kekuatan otot inti, dan pemulihan napas.',
    materi: 'Kebugaran Jasmani',
    category: 'Game Kebugaran Jasmani',
    suitableClasses: [4, 5, 6],
    gameConcept:
      'Setiap pos sirkuit membuka kartu tantangan kebugaran berdurasi 30 detik diikuti jeda hidrasi dan cek denyut nadi sederhana.',
    isCoreTemplate: true,
    presetInput: buildPreset({
      kelas: 5,
      materi: 'Kebugaran Jasmani',
      mediaGroup: 'Game Aktivitas Fisik',
      jenisMedia: 'Fitness Challenge',
      tujuanPembelajaran:
        'Peserta didik mampu memahami komponen kebugaran jasmani dan mempraktikkan latihan daya tahan serta kelincahan sesuai kapasitas diri.',
      gameSettings: {
        ...createDefaultInput().gameSettings,
        title: 'Ekspedisi Sirkuit Bugar Ceria',
        theme: 'Dunia Olahraga',
        mainCharacter: 'Kapten Bugar & Regu Sehat',
        levelCount: 5,
        difficulty: 'Menengah',
        mission: 'Menyelesaikan 5 pos kebugaran sirkuit dengan teknik aman serta mencatat denyut nadi istirahat dan aktivitas.',
      },
      visualDesign: { visualStyle: 'Futuristic Sport', visualTheme: 'Dunia Olahraga' },
    }),
  },
  {
    id: 'tpl-5-kuis',
    templateNumber: 5,
    title: 'Kuis Pengetahuan PJOK',
    description:
      'Kuis interaktif lengkap dengan pembahasan jawaban otomatis, level bertingkat, dan umpan balik positif.',
    materi: 'Kombinasi Gerak Dasar',
    category: 'Game Petualangan PJOK',
    suitableClasses: [3, 4, 5, 6],
    gameConcept:
      'Arena tanya-jawab cepat yang memadukan soal konsep olahraga, gambar gerak, dan studi kasus keselamatan di lapangan.',
    isCoreTemplate: true,
    presetInput: buildPreset({
      kelas: 4,
      materi: 'Kombinasi Gerak Dasar',
      mediaGroup: 'Game Edukasi',
      jenisMedia: 'Quiz Game',
      smartQuiz: {
        ...createDefaultInput().smartQuiz,
        enabled: true,
        quizType: 'Pilihan ganda',
        questionCount: 10,
        difficulty: 'Sedang',
      },
      tujuanPembelajaran:
        'Peserta didik mampu mengidentifikasi prinsip gerak dasar, aturan keselamatan, dan manfaat aktivitas jasmani melalui kuis interaktif.',
      gameSettings: {
        ...createDefaultInput().gameSettings,
        title: 'Cerdas Cermat PJOK Nusantara',
        theme: 'Sekolah Sehat',
        mainCharacter: 'Kak Dika & Kawan SD',
        levelCount: 3,
        difficulty: 'Menengah',
        mission: 'Menjawab tantangan kuis PJOK lintas materi dengan diskusi kelompok yang sportif.',
      },
      visualDesign: { visualStyle: '2D Cartoon', visualTheme: 'Sekolah Sehat' },
    }),
  },
  {
    id: 'tpl-6-sepak-bola',
    templateNumber: 6,
    title: 'Simulasi Sepak Bola',
    description:
      'Simulasi strategi dan teknik dasar sepak bola mini: menggiring, mengoper kaki bagian dalam, dan kerja sama tim.',
    materi: 'Permainan Bola Besar',
    category: 'Game Permainan Bola Besar',
    suitableClasses: [4, 5, 6],
    gameConcept:
      'Papan taktik interaktif plus latihan lapangan mini yang mengajarkan posisi pemain, umpan akurat, dan fair play.',
    isCoreTemplate: true,
    presetInput: buildPreset({
      kelas: 5,
      materi: 'Permainan Bola Besar',
      mediaGroup: 'Media Interaktif',
      jenisMedia: 'Simulasi olahraga',
      tujuanPembelajaran:
        'Peserta didik mampu menganalisis dan mempraktikkan variasi gerak dasar menggiring serta mengoper bola dalam permainan sepak bola mini.',
      gameSettings: {
        ...createDefaultInput().gameSettings,
        title: 'Taktik Juara Sepak Bola Mini',
        theme: 'Stadion Mini',
        mainCharacter: 'Garuda Muda SD',
        levelCount: 4,
        difficulty: 'Lanjutan',
        mission: 'Merancang alur 3 umpan akurat dan menuntaskan tantangan tendangan ke gawang target.',
      },
      visualDesign: { visualStyle: '3D Cartoon', visualTheme: 'Stadion Mini' },
    }),
  },
  {
    id: 'tpl-7-voli-mini',
    templateNumber: 7,
    title: 'Bola Voli Mini',
    description:
      'Latihan interaktif passing bawah dan passing atas bola voli mini dengan simulasi sudut pantulan lengan.',
    materi: 'Permainan Bola Besar',
    category: 'Game Permainan Bola Besar',
    suitableClasses: [4, 5, 6],
    gameConcept:
      'Siswa berlatih mengatur posisi kaki, ayunan lengan, dan komunikasi tim ("Bola saya!") lewat tantangan rally berpasangan.',
    isCoreTemplate: true,
    presetInput: buildPreset({
      kelas: 6,
      materi: 'Permainan Bola Besar',
      mediaGroup: 'Game Edukasi',
      jenisMedia: 'Mission Challenge',
      tujuanPembelajaran:
        'Peserta didik mampu mempraktikkan passing bawah dan passing atas bola voli mini dengan koordinasi tubuh dan komunikasi tim yang baik.',
      gameSettings: {
        ...createDefaultInput().gameSettings,
        title: 'Misi Rally Voli Mini SD',
        theme: 'Dunia Olahraga',
        mainCharacter: 'Sinta & Regu Net Ceria',
        levelCount: 4,
        difficulty: 'Menengah',
        mission: 'Menjaga bola tetap melambung bersama tim hingga 8 pantulan beruntun dengan teknik lengan lurus.',
      },
      visualDesign: { visualStyle: 'Anime Education', visualTheme: 'Dunia Olahraga' },
    }),
  },
  {
    id: 'tpl-8-atletik-kids',
    templateNumber: 8,
    title: 'Atletik Kids',
    description:
      'Kombinasi lari cepat jarak pendek, lompat katak/rintangan rendah, dan lempar roket busa yang seru untuk anak SD.',
    materi: 'Atletik',
    category: 'Game Atletik',
    suitableClasses: [3, 4, 5, 6],
    gameConcept:
      'Estafet formula kids di lintasan mini dengan penghitung putaran kelompok dan kartu teknik start jongkok/berdiri.',
    isCoreTemplate: true,
    presetInput: buildPreset({
      kelas: 4,
      materi: 'Atletik',
      mediaGroup: 'Game Aktivitas Fisik',
      jenisMedia: 'Group Movement Game',
      tujuanPembelajaran:
        'Peserta didik mampu mempraktikkan kombinasi gerak lari, lompat, dan lempar dalam format Atletik Kids yang aman dan sportif.',
      gameSettings: {
        ...createDefaultInput().gameSettings,
        title: 'Festival Atletik Kids Nusantara',
        theme: 'Stadion Mini',
        mainCharacter: 'Tim Pelari Cilik',
        levelCount: 3,
        difficulty: 'Menengah',
        mission: 'Menuntaskan estafet formula lari-lompat-lempar tanpa menjatuhkan tongkat estafet.',
      },
      visualDesign: { visualStyle: '2D Cartoon', visualTheme: 'Stadion Mini' },
    }),
  },
  {
    id: 'tpl-9-senam-lantai',
    templateNumber: 9,
    title: 'Senam Lantai',
    description:
      'Panduan bertahap sikap lilin, keseimbangan satu kaki, dan guling depan dengan matras serta pengawasan keselamatan ketat.',
    materi: 'Senam Lantai',
    category: 'Game Senam',
    suitableClasses: [4, 5, 6],
    gameConcept:
      'Kartu urutan gerak bertahap (Drag and Drop) sebelum praktik di matras dengan checklist keselamatan wajib bersama guru.',
    isCoreTemplate: true,
    presetInput: buildPreset({
      kelas: 5,
      materi: 'Senam Lantai',
      mediaGroup: 'Game Edukasi',
      jenisMedia: 'Drag and Drop',
      tujuanPembelajaran:
        'Peserta didik mampu mengurutkan tahapan teknik dasar senam lantai dan mempraktikkan gerak keseimbangan di atas matras dengan aman.',
      gameSettings: {
        ...createDefaultInput().gameSettings,
        title: 'Studio Pose Senam Lantai Aman',
        theme: 'Sekolah Sehat',
        mainCharacter: 'Nadia & Coach Senam',
        levelCount: 4,
        difficulty: 'Menengah',
        mission: 'Menyusun urutan teknik yang aman sebelum mempraktikkan pose keseimbangan 10 detik di matras.',
      },
      visualDesign: { visualStyle: 'Flat Illustration', visualTheme: 'Sekolah Sehat' },
    }),
  },
  {
    id: 'tpl-10-hidup-sehat',
    templateNumber: 10,
    title: 'Dunia Hidup Sehat',
    description:
      'Role playing kebiasaan hidup bersih dan sehat: cuci tangan, tidur cukup, sikat gigi, kebersihan diri, dan aktif bergerak.',
    materi: 'Pola Hidup Sehat',
    category: 'Game Pola Hidup Sehat',
    suitableClasses: [1, 2, 3, 4],
    gameConcept:
      'Siswa mengatur jadwal harian karakter dari bangun pagi hingga tidur malam agar indikator kebugaran dan kebersihan tetap optimal.',
    isCoreTemplate: true,
    presetInput: buildPreset({
      kelas: 2,
      materi: 'Pola Hidup Sehat',
      mediaGroup: 'Game Edukasi',
      jenisMedia: 'Role Playing Game',
      tujuanPembelajaran:
        'Peserta didik mampu memilih kebiasaan pola hidup bersih dan sehat dalam rutinitas harian serta menjelaskan manfaatnya.',
      gameSettings: {
        ...createDefaultInput().gameSettings,
        title: 'Seharian Bersama Anak Sehat',
        theme: 'Sekolah Sehat',
        mainCharacter: 'Adi & Keluarga Sehat',
        levelCount: 4,
        difficulty: 'Dasar',
        mission: 'Menyelesaikan 6 misi kebersihan diri dan aktivitas gerak harian dengan penuh semangat.',
      },
      visualDesign: { visualStyle: '2D Cartoon', visualTheme: 'Sekolah Sehat' },
    }),
  },
  {
    id: 'tpl-11-tradisional',
    templateNumber: 11,
    title: 'Permainan Tradisional Indonesia',
    description:
      'Eksplorasi Gobak Sodor dan Bentengan berbasis kearifan lokal untuk kelincahan, strategi regu, dan nilai gotong royong.',
    materi: 'Permainan Tradisional',
    category: 'Game Permainan Tradisional',
    suitableClasses: [3, 4, 5, 6],
    gameConcept:
      'Papan strategi digital dan panduan lapangan permainan Gobak Sodor/Hadang lengkap dengan nilai karakter budaya lokal.',
    isCoreTemplate: true,
    presetInput: buildPreset({
      kelas: 4,
      materi: 'Permainan Tradisional',
      mediaGroup: 'Game Edukasi',
      jenisMedia: 'Board Game',
      localWisdom: {
        ...createDefaultInput().localWisdom,
        enabled: true,
        traditionalGame: 'Gobak Sodor',
        regionName: 'Jawa Timur',
        characterValues: 'Kejujuran, sportivitas, komunikasi tim, dan kepatuhan pada aturan bersama',
      },
      tujuanPembelajaran:
        'Peserta didik mampu mempraktikkan kelincahan dan kerja sama regu melalui permainan tradisional Gobak Sodor secara jujur dan sportif.',
      gameSettings: {
        ...createDefaultInput().gameSettings,
        title: 'Kampung Gobak Sodor Nusantara',
        theme: 'Desa Permainan Tradisional',
        mainCharacter: 'Regu Penjaga & Penyerang Cilik',
        levelCount: 4,
        difficulty: 'Menengah',
        mission: 'Melewati garis penjagaan lawan menggunakan gerak tipu yang aman tanpa kontak fisik keras.',
      },
      visualDesign: { visualStyle: 'Adventure World', visualTheme: 'Desa Permainan Tradisional' },
    }),
  },
  {
    id: 'tpl-12-ai-motion',
    templateNumber: 12,
    title: 'AI Motion Challenge',
    description:
      'Game aktivitas fisik berbasis deteksi pose tubuh (MediaPipe/MoveNet) dengan izin kamera dan mode alternatif tanpa kamera.',
    materi: 'Kebugaran Jasmani',
    category: 'Game AI Motion Detection',
    suitableClasses: [3, 4, 5, 6],
    gameConcept:
      'Kamera perangkat membaca pose mengangkat tangan atau melompat di tempat secara lokal tanpa merekam video, dilengkapi tombol simulasi.',
    isCoreTemplate: true,
    presetInput: buildPreset({
      kelas: 4,
      materi: 'Kebugaran Jasmani',
      mediaGroup: 'AI dan Coding',
      jenisMedia: 'AI Motion Detection',
      aiMotion: {
        ...createDefaultInput().aiMotion,
        enabled: true,
        technology: 'MediaPipe Pose Landmarker',
        activity: 'Gerakan koordinasi tangan dan kaki',
      },
      tujuanPembelajaran:
        'Peserta didik mampu melakukan gerakan koordinasi tangan dan kaki secara ritmis mengikuti instruksi interaktif dengan aman.',
      gameSettings: {
        ...createDefaultInput().gameSettings,
        title: 'AI Motion Fit Challenge SD',
        theme: 'Galaksi Olahraga',
        mainCharacter: 'Kapten Gerak & Asisten Pose',
        levelCount: 3,
        difficulty: 'Menengah',
        mission: 'Mengikuti 3 ronde tantangan gerak aktif dengan skor kekompakan kelas dan alternatif tombol layar.',
      },
      visualDesign: { visualStyle: 'Futuristic Sport', visualTheme: 'Galaksi Olahraga' },
    }),
  },
  {
    id: 'tpl-13-gizi',
    templateNumber: 13,
    title: 'Detektif Gizi Seimbang',
    description:
      'Permainan menyusun isi piringku (karbohidrat, protein, sayur, buah, air putih) untuk energi sebelum berolahraga.',
    materi: 'Gizi Seimbang',
    category: 'Game Gizi Seimbang',
    suitableClasses: [2, 3, 4, 5],
    gameConcept:
      'Siswa menjadi detektif nutrisi yang mencocokkan menu bekal sehat dan kebutuhan cairan agar karakter siap bertanding.',
    isCoreTemplate: true,
    presetInput: buildPreset({
      kelas: 4,
      materi: 'Gizi Seimbang',
      mediaGroup: 'Game Edukasi',
      jenisMedia: 'Matching Game',
      tujuanPembelajaran:
        'Peserta didik mampu mengelompokkan zat gizi seimbang sesuai panduan Isi Piringku dan mengaitkannya dengan energi saat berolahraga.',
      gameSettings: {
        ...createDefaultInput().gameSettings,
        title: 'Detektif Piring Gizi Seimbang',
        theme: 'Sekolah Sehat',
        mainCharacter: 'Detektif Gizi Rara',
        levelCount: 4,
        difficulty: 'Menengah',
        mission: 'Menyusun 4 menu bekal sehat lengkap dengan air minum yang cukup sebelum jam pelajaran PJOK.',
      },
      visualDesign: { visualStyle: '2D Cartoon', visualTheme: 'Sekolah Sehat' },
    }),
  },
  {
    id: 'tpl-14-keselamatan',
    templateNumber: 14,
    title: 'Keselamatan Olahraga',
    description:
      'Simulasi pengambilan keputusan aman di lapangan: pengecekan sepatu, pemanasan, area aman, dan pertolongan pertama ringan.',
    materi: 'Keselamatan Aktivitas Jasmani',
    category: 'Game Keselamatan Olahraga',
    suitableClasses: [2, 3, 4, 5, 6],
    gameConcept:
      'Siswa menemukan potensi bahaya di lapangan sekolah lalu memilih tindakan pencegahan dan langkah P3K dasar yang tepat.',
    isCoreTemplate: true,
    presetInput: buildPreset({
      kelas: 5,
      materi: 'Keselamatan Aktivitas Jasmani',
      mediaGroup: 'Game Edukasi',
      jenisMedia: 'Puzzle Game',
      tujuanPembelajaran:
        'Peserta didik mampu mengidentifikasi potensi risiko cedera saat berolahraga serta mempraktikkan langkah pencegahan dan P3K sederhana.',
      gameSettings: {
        ...createDefaultInput().gameSettings,
        title: 'Penjaga Lapangan Aman SD',
        theme: 'Sekolah Sehat',
        mainCharacter: 'Tim Siaga UKS & PJOK',
        levelCount: 4,
        difficulty: 'Menengah',
        mission: 'Mengamankan 4 zona lapangan sekolah dari risiko terpeleset, alat berserakan, dan lupa pemanasan.',
      },
      visualDesign: { visualStyle: 'Flat Illustration', visualTheme: 'Sekolah Sehat' },
    }),
  },
  {
    id: 'tpl-15-kombinasi',
    templateNumber: 15,
    title: 'Kombinasi Gerak Dasar',
    description:
      'Endless runner edukatif yang memadukan lari, lompat rintangan, dan tangkap bola sasaran secara bertahap.',
    materi: 'Kombinasi Gerak Dasar',
    category: 'Game Petualangan PJOK',
    suitableClasses: [3, 4, 5],
    gameConcept:
      'Menggabungkan gerak lokomotor, non-lokomotor, dan manipulatif dalam misi estafet kelas yang penuh semangat.',
    isCoreTemplate: true,
    presetInput: buildPreset({
      kelas: 4,
      materi: 'Kombinasi Gerak Dasar',
      mediaGroup: 'Game Edukasi',
      jenisMedia: 'Endless Runner',
      tujuanPembelajaran:
        'Peserta didik mampu mengombinasikan gerak jalan, lari, lompat, dan lempar-tangkap secara terpadu dalam aktivitas bermain.',
      gameSettings: {
        ...createDefaultInput().gameSettings,
        title: 'Estafet Kombinasi Gerak Ceria',
        theme: 'Dunia Olahraga',
        mainCharacter: 'Pahlawan Gerak SD',
        levelCount: 4,
        difficulty: 'Menengah',
        mission: 'Menghubungkan 3 jenis gerak dasar dalam satu lintasan tantangan kelompok.',
      },
      visualDesign: { visualStyle: 'Pixel Art', visualTheme: 'Dunia Olahraga' },
    }),
  },
  {
    id: 'tpl-16-engklek',
    templateNumber: 16,
    title: 'Petualangan Engklek',
    description:
      'Adaptasi digital dan lapangan permainan Engklek Nusantara untuk keseimbangan satu kaki dan kelincahan lompatan.',
    materi: 'Permainan Tradisional',
    category: 'Game Permainan Tradisional',
    suitableClasses: [1, 2, 3, 4],
    gameConcept:
      'Pemain melempar gaco ke petak engklek digital lalu mempraktikkan lompatan satu kaki secara seimbang di lantai kelas/lapangan.',
    isCoreTemplate: true,
    presetInput: buildPreset({
      kelas: 3,
      materi: 'Permainan Tradisional',
      mediaGroup: 'Game Aktivitas Fisik',
      jenisMedia: 'Balance Challenge',
      localWisdom: {
        ...createDefaultInput().localWisdom,
        enabled: true,
        traditionalGame: 'Engklek',
        regionName: 'Gresik, Jawa Timur',
        characterValues: 'Keseimbangan, kesabaran antre, kejujuran tidak menginjak garis',
      },
      tujuanPembelajaran:
        'Peserta didik mampu mempraktikkan tumpuan dan lompatan satu kaki dengan seimbang melalui permainan tradisional Engklek.',
      gameSettings: {
        ...createDefaultInput().gameSettings,
        title: 'Petualangan Engklek Ceria',
        theme: 'Desa Permainan Tradisional',
        mainCharacter: 'Ayu & Kawan Kampung',
        levelCount: 5,
        difficulty: 'Dasar',
        mission: 'Menuntaskan petak engklek gunung hingga bintang dengan keseimbangan dan antrean tertib.',
      },
      visualDesign: { visualStyle: '2D Cartoon', visualTheme: 'Desa Permainan Tradisional' },
    }),
  },
  {
    id: 'tpl-17-keseimbangan',
    templateNumber: 17,
    title: 'Game Keseimbangan',
    description:
      'Tantangan mempertahankan sikap bangau, berjalan di garis lurus, dan keseimbangan dinamis dengan timer visual.',
    materi: 'Gerak Non-Lokomotor',
    category: 'Game Gerak Non-Lokomotor',
    suitableClasses: [1, 2, 3, 4],
    gameConcept:
      'Latihan bertahap menahan pose keseimbangan selama 5–15 detik sambil mendengarkan isyarat visual tenang.',
    isCoreTemplate: true,
    presetInput: buildPreset({
      kelas: 2,
      materi: 'Gerak Non-Lokomotor',
      mediaGroup: 'Game Aktivitas Fisik',
      jenisMedia: 'Balance Challenge',
      tujuanPembelajaran:
        'Peserta didik mampu mempertahankan keseimbangan statis dan dinamis dengan sikap tubuh yang tegak dan aman.',
      gameSettings: {
        ...createDefaultInput().gameSettings,
        title: 'Tantangan Keseimbangan Burung Bangau',
        theme: 'Dunia Bawah Laut',
        mainCharacter: 'Piko si Penjelajah Pantai',
        levelCount: 4,
        difficulty: 'Dasar',
        mission: 'Menjaga keseimbangan di atas jembatan batu karang tanpa goyah.',
      },
      visualDesign: { visualStyle: '2D Cartoon', visualTheme: 'Dunia Bawah Laut' },
    }),
  },
  {
    id: 'tpl-18-koordinasi',
    templateNumber: 18,
    title: 'Game Koordinasi',
    description:
      'Permainan ritmik mengikuti pola tepuk, langkah kaki, dan ayunan tangan untuk mengasah koordinasi neuromuskular.',
    materi: 'Senam Irama',
    category: 'Game Senam',
    suitableClasses: [3, 4, 5, 6],
    gameConcept:
      'Ketukan tempo visual menuntun siswa memadukan ayunan lengan dan langkah kaki serempak bersama kelas.',
    isCoreTemplate: true,
    presetInput: buildPreset({
      kelas: 4,
      materi: 'Senam Irama',
      mediaGroup: 'Game Aktivitas Fisik',
      jenisMedia: 'Coordination Game',
      tujuanPembelajaran:
        'Peserta didik mampu mempraktikkan variasi gerak langkah kaki dan ayunan lengan mengikuti irama dengan koordinasi yang selaras.',
      gameSettings: {
        ...createDefaultInput().gameSettings,
        title: 'Irama Koordinasi Anak Hebat',
        theme: 'Dunia Olahraga',
        mainCharacter: 'Kiki & Teman Irama',
        levelCount: 4,
        difficulty: 'Menengah',
        mission: 'Menyelesaikan 4 pola kombinasi langkah dan tepukan sesuai ketukan tempo yang meningkat bertahap.',
      },
      visualDesign: { visualStyle: '2D Cartoon', visualTheme: 'Dunia Olahraga' },
    }),
  },
  {
    id: 'tpl-19-tantangan-kelompok',
    templateNumber: 19,
    title: 'Game Tantangan Kelompok',
    description:
      'Permainan papan tantangan kolaboratif antarkelompok yang menggabungkan kuis cepat dan tugas gerak beregu.',
    materi: 'Permainan Bola Kecil',
    category: 'Game Permainan Bola Kecil',
    suitableClasses: [4, 5, 6],
    gameConcept:
      'Setiap kelompok melempar dadu digital untuk membuka tantangan pukul/tangkap bola kecil atau misi kekompakan.',
    isCoreTemplate: true,
    presetInput: buildPreset({
      kelas: 5,
      materi: 'Permainan Bola Kecil',
      mediaGroup: 'Game Aktivitas Fisik',
      jenisMedia: 'Group Movement Game',
      tujuanPembelajaran:
        'Peserta didik mampu menunjukkan kerja sama tim dan keterampilan manipulatif permainan bola kecil kasti/rounders mini.',
      gameSettings: {
        ...createDefaultInput().gameSettings,
        title: 'Misi Regu Bola Kecil Ceria',
        theme: 'Stadion Mini',
        mainCharacter: '4 Regu Bintang Sekolah',
        levelCount: 4,
        difficulty: 'Menengah',
        mission: 'Mengumpulkan poin kekompakan regu lewat lempar sasaran dan estafet lari aman.',
      },
      visualDesign: { visualStyle: 'Adventure World', visualTheme: 'Stadion Mini' },
    }),
  },
  {
    id: 'tpl-20-ai-coach',
    templateNumber: 20,
    title: 'AI Personal Coach PJOK',
    description:
      'Asisten pelatih kebugaran virtual ramah anak dengan pose estimation opsional, panduan pemanasan, dan refleksi mandiri.',
    materi: 'Kebugaran Jasmani',
    category: 'Game AI Motion Detection',
    suitableClasses: [5, 6],
    gameConcept:
      'Coach virtual memandu urutan pemanasan, latihan inti ringan, dan pendinginan dengan umpan balik postur serta mode klik tanpa kamera.',
    isCoreTemplate: true,
    presetInput: buildPreset({
      kelas: 6,
      materi: 'Kebugaran Jasmani',
      mediaGroup: 'AI dan Coding',
      jenisMedia: 'AI Personal Coach',
      aiMotion: {
        ...createDefaultInput().aiMotion,
        enabled: true,
        technology: 'MoveNet',
        activity: 'Gerakan keseimbangan',
      },
      tujuanPembelajaran:
        'Peserta didik mampu merancang dan mempraktikkan rutinitas latihan kebugaran pribadi berintensitas ringan-sedang secara sadar dan aman.',
      gameSettings: {
        ...createDefaultInput().gameSettings,
        title: 'Coach Pintar Kebugaran SD',
        theme: 'Galaksi Olahraga',
        mainCharacter: 'Coach Nala (Pelatih Virtual Ramah Anak)',
        levelCount: 4,
        difficulty: 'Lanjutan',
        mission: 'Menyelesaikan sesi latihan terpandu 10 menit dengan evaluasi postur dan catatan hidrasi.',
      },
      visualDesign: { visualStyle: 'Futuristic Sport', visualTheme: 'Galaksi Olahraga' },
    }),
  },
  {
    id: 'tpl-21-bola-kecil-kasti',
    title: 'Akademi Kasti & Ketepatan Sasaran',
    description:
      'Komik interaktif dan simulasi teknik melempar bola kecil ke sasaran serta aturan aman permainan kasti.',
    materi: 'Permainan Bola Kecil',
    category: 'Game Permainan Bola Kecil',
    suitableClasses: [4, 5, 6],
    gameConcept:
      'Siswa membaca cerita komik situasi permainan kasti lalu memilih keputusan taktis dan arah lemparan yang aman.',
    isCoreTemplate: false,
    presetInput: buildPreset({
      kelas: 4,
      materi: 'Permainan Bola Kecil',
      mediaGroup: 'Media Interaktif',
      jenisMedia: 'Komik digital',
      tujuanPembelajaran:
        'Peserta didik mampu memahami aturan keselamatan dan teknik dasar melempar serta menangkap dalam permainan bola kecil.',
      gameSettings: {
        ...createDefaultInput().gameSettings,
        title: 'Komik Interaktif Juara Kasti',
        theme: 'Sekolah Sehat',
        mainCharacter: 'Regu Kasti Melati',
        levelCount: 3,
        difficulty: 'Menengah',
      },
      visualDesign: { visualStyle: '2D Cartoon', visualTheme: 'Sekolah Sehat' },
    }),
  },
  {
    id: 'tpl-22-manipulatif-scratch',
    title: 'Tangkap Bintang Gerak (Scratch AI)',
    description:
      'Media edukatif berbasis coding blok Scratch untuk melatih gerak manipulatif dan refleks cepat yang aman.',
    materi: 'Gerak Manipulatif',
    category: 'Game Gerak Manipulatif',
    suitableClasses: [5, 6],
    gameConcept:
      'Proyek game edukasi bergaya blok Scratch dengan kontrol gerakan tangan atau tombol panah yang inklusif.',
    isCoreTemplate: false,
    presetInput: buildPreset({
      kelas: 6,
      materi: 'Gerak Manipulatif',
      mediaGroup: 'AI dan Coding',
      jenisMedia: 'Scratch-Based Game',
      aiMotion: {
        ...createDefaultInput().aiMotion,
        enabled: true,
        technology: 'Scratch AI Extension',
        activity: 'Gerakan mengangkat tangan',
      },
      tujuanPembelajaran:
        'Peserta didik mampu mengaitkan konsep koordinasi mata-tangan pada gerak manipulatif melalui simulasi interaktif berbasis logika coding.',
      gameSettings: {
        ...createDefaultInput().gameSettings,
        title: 'Scratch Sport Tangkap Bola',
        theme: 'Galaksi Olahraga',
        mainCharacter: 'Kiko & Bola Energi',
        levelCount: 3,
        difficulty: 'Lanjutan',
      },
      visualDesign: { visualStyle: 'Pixel Art', visualTheme: 'Galaksi Olahraga' },
    }),
  },
];
