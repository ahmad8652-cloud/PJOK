import {
  AI_MOTION_ACTIVITIES,
  AI_MOTION_TECHNOLOGIES,
  DEEP_LEARNING_PILLARS,
  LOCAL_WISDOM_GAMES,
  MATERI_OPTIONS,
  MEDIA_GROUPS,
  PEDAGOGICAL_APPROACHES,
  SMART_QUIZ_TYPES,
  VISUAL_DESIGN_STYLES,
  VISUAL_THEMES,
} from '../data/catalog';
import type {
  FaseCode,
  KelasLevel,
  MediaCategoryGroup,
  PromptGeneratorInput,
  RandomIdeaFilters,
  RandomIdeaResult,
} from '../types/pjok';

export interface AdaptiveProfile {
  fase: FaseCode;
  faseLabel: string;
  ageRange: string;
  instructionStyle: string;
  uiGuidelines: string[];
  pacingAndChallenge: string[];
  recommendedFeedback: string;
}

export function getFaseFromKelas(kelas: KelasLevel): FaseCode {
  if (kelas <= 2) return 'A';
  if (kelas <= 4) return 'B';
  return 'C';
}

export function getFaseLabel(fase: FaseCode): string {
  switch (fase) {
    case 'A':
      return 'Fase A (Kelas 1–2 SD)';
    case 'B':
      return 'Fase B (Kelas 3–4 SD)';
    case 'C':
      return 'Fase C (Kelas 5–6 SD)';
  }
}

export function getAdaptiveProfile(fase: FaseCode): AdaptiveProfile {
  if (fase === 'A') {
    return {
      fase: 'A',
      faseLabel: 'Fase A (Kelas 1–2 SD)',
      ageRange: '6–8 tahun',
      instructionStyle:
        'Instruksi sangat sederhana, kalimat pendek (maksimal 8 kata per instruksi), didukung ikon visual besar dan audio panduan opsional.',
      uiGuidelines: [
        'Tombol interaktif berukuran ekstra besar (minimal 56x56 px) dengan jarak antar tombol lega.',
        'Palet warna cerah yang ramah anak dengan kontras tinggi agar mudah dibedakan.',
        'Karakter kartun ekspresif sebagai pemandu langkah demi langkah.',
        'Audio instruksi opsional dengan kontrol mute/unmute yang jelas.',
      ],
      pacingAndChallenge: [
        'Durasi tiap ronde permainan singkat (1–2 menit) untuk menjaga fokus anak.',
        'Tantangan level dasar dengan tingkat keberhasilan tinggi guna membangun rasa percaya diri.',
        'Navigasi linear tanpa menu bertingkat yang membingungkan.',
      ],
      recommendedFeedback:
        'Pujian hangat berbasis usaha (contoh: "Hebat, kamu berani mencoba!"), bintang apresiasi, dan tanpa hukuman skor negatif.',
    };
  }

  if (fase === 'B') {
    return {
      fase: 'B',
      faseLabel: 'Fase B (Kelas 3–4 SD)',
      ageRange: '9–10 tahun',
      instructionStyle:
        'Instruksi terstruktur dengan contoh visual singkat, misi bertahap, serta pengenalan aturan main yang adil dan sportif.',
      uiGuidelines: [
        'Antarmuka bersih dengan panel misi, indikator progres level, dan skor yang jelas.',
        'Kombinasi ilustrasi kartun dinamis dengan label teks yang mudah dipindai.',
        'Tombol aksi jelas (Mulai, Jeda, Ulangi) dengan umpan balik visual langsung.',
      ],
      pacingAndChallenge: [
        'Tantangan bertahap dari gerak tunggal ke kombinasi gerak dasar.',
        'Permainan kombinasi dengan kuis pengetahuan PJOK sederhana di sela level.',
        'Misi kelompok atau estafet kolaboratif untuk melatih kerja sama tim.',
        'Sistem skor berbasis ketepatan gerak, kejujuran, dan kekompakan.',
      ],
      recommendedFeedback:
        'Umpan balik formatif spesifik beserta tip perbaikan gerakan singkat dan lencana pencapaian.',
    };
  }

  return {
    fase: 'C',
    faseLabel: 'Fase C (Kelas 5–6 SD)',
    ageRange: '11–12 tahun',
    instructionStyle:
      'Instruksi analitis yang mendorong pengambilan keputusan taktis, evaluasi teknik gerak, dan refleksi kebugaran mandiri.',
    uiGuidelines: [
      'Tata letak dashboard permainan modern dengan statistik performa, indikator taktik, dan riwayat skor.',
      'Visual sporty dan dinamis yang tetap menjaga keterbacaan kontras tinggi.',
      'Panel analisis singkat setelah ronde untuk refleksi mandiri maupun diskusi kelompok.',
    ],
    pacingAndChallenge: [
      'Tantangan strategi dan simulasi situasi pertandingan mini yang realistis.',
      'Fitur analisis gerakan sederhana dan evaluasi pemahaman konsep aturan serta teknik.',
      'Tantangan pemecahan masalah (problem solving) dalam kerja sama tim dan sportivitas.',
    ],
    recommendedFeedback:
      'Umpan balik analitis berbasis kriteria teknik, strategi tim, dan refleksi kesiapan fisik siswa.',
  };
}

export function resolveMateriLabel(input: Pick<PromptGeneratorInput, 'materi' | 'customMateri'>): string {
  if (input.materi === 'Materi lainnya') {
    return input.customMateri.trim() || 'Materi PJOK Khusus';
  }
  return input.materi;
}

export function createDefaultInput(): PromptGeneratorInput {
  return {
    jenjang: 'SD',
    kelas: 4,
    fase: 'B',
    semester: 'Ganjil',
    materi: 'Kombinasi Gerak Dasar',
    customMateri: '',
    tujuanPembelajaran:
      'Peserta didik mampu mempraktikkan dan menganalisis kombinasi gerak lokomotor, non-lokomotor, dan manipulatif melalui permainan interaktif yang aman, sportif, dan kolaboratif.',
    alokasiWaktu: '2 x 35 menit',
    jumlahPesertaDidik: '28 peserta didik',
    karakteristikPesertaDidik:
      'Aktif bergerak, menyukai tantangan beregu, memiliki tingkat keterampilan motorik beragam, dan antusias terhadap media visual interaktif.',
    catatanInklusif:
      'Sediakan alternatif gerakan berdampak rendah (low-impact), instruksi visual + teks jelas, opsi tanpa kamera, dan durasi fleksibel bagi siswa dengan kebutuhan khusus.',
    mediaGroup: 'Game Edukasi',
    jenisMedia: 'Mission Challenge',
    aiMotion: {
      enabled: false,
      technology: AI_MOTION_TECHNOLOGIES[0],
      activity: AI_MOTION_ACTIVITIES[4],
      detectPose: true,
      giveInstructions: true,
      studentFollows: true,
      movementFeedback: true,
      showScore: true,
      cameraPermissionRequired: true,
      nonCameraAlternative: true,
      noAutoVideoSave: true,
      noPerfectDetectionClaim: true,
      safeInclusiveAlternative: true,
    },
    smartQuiz: {
      enabled: true,
      quizType: SMART_QUIZ_TYPES[0],
      questionCount: 8,
      difficulty: 'Sedang',
      hasTimer: true,
      timerPerQuestionSeconds: 25,
      autoAnswer: true,
      autoScore: true,
      showExplanation: true,
      positiveFeedback: true,
      showEvaluationResult: true,
    },
    localWisdom: {
      enabled: false,
      traditionalGame: LOCAL_WISDOM_GAMES[1],
      regionName: 'Gresik, Jawa Timur',
      characterValues: 'Kejujuran, sportivitas, gotong royong, dan menghargai budaya lokal',
      includeStory: true,
      includeLocalCharacters: true,
      includeRulesAndMission: true,
      includeGroupChallenge: true,
    },
    deepLearning: {
      berkesadaran: [...DEEP_LEARNING_PILLARS.berkesadaran],
      bermakna: [...DEEP_LEARNING_PILLARS.bermakna],
      menggembirakan: [...DEEP_LEARNING_PILLARS.menggembirakan],
      pedagogicalApproach: PEDAGOGICAL_APPROACHES[0],
    },
    gameSettings: {
      title: 'Misi Jawara Gerak Nusantara',
      theme: 'Sekolah Sehat & Lapangan Hijau',
      mainCharacter: 'Raka dan Sinta (Siswa SD Penggerak Sehat)',
      levelCount: 4,
      difficulty: 'Menengah',
      mission:
        'Menyelesaikan pos tantangan gerak dasar sambil mengumpulkan lencana kebugaran dan sportivitas bersama tim.',
      scoringSystem: 'Poin ketuntasan misi (+100), bonus kerja sama (+50), dan bintang refleksi.',
      rewardSystem: 'Lencana Jawara Gerak, sertifikat digital kelas, dan apresiasi verbal positif.',
      hasTimer: true,
      timerMinutes: 15,
      feedbackStyle: 'Umpan balik positif konstruktif dengan panduan perbaikan gerak singkat.',
      hasLeaderboard: true,
      hasAudio: true,
      hasAnimation: true,
      hasStartButton: true,
      hasPauseButton: true,
      hasRestartButton: true,
    },
    visualDesign: {
      visualStyle: VISUAL_DESIGN_STYLES[0],
      visualTheme: VISUAL_THEMES[5],
    },
  };
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateGeneratorInput(input: PromptGeneratorInput): ValidationResult {
  const errors: string[] = [];

  if (!input.tujuanPembelajaran.trim()) {
    errors.push('Tujuan Pembelajaran wajib diisi agar prompt selaras dengan target capaian belajar.');
  }
  if (!input.alokasiWaktu.trim()) {
    errors.push('Alokasi Waktu wajib diisi (contoh: 2 x 35 menit).');
  }
  if (!input.jumlahPesertaDidik.trim()) {
    errors.push('Jumlah Peserta Didik wajib diisi.');
  }
  if (input.materi === 'Materi lainnya' && !input.customMateri.trim()) {
    errors.push('Tuliskan nama materi khusus karena Anda memilih "Materi lainnya".');
  }
  if (!input.gameSettings.title.trim()) {
    errors.push('Judul Game / Media pada Pengaturan Game wajib diisi.');
  }
  if (!input.gameSettings.mainCharacter.trim()) {
    errors.push('Karakter Utama wajib diisi.');
  }
  if (input.localWisdom.enabled && !input.localWisdom.regionName.trim()) {
    errors.push('Nama Daerah wajib diisi saat fitur Local Wisdom Game diaktifkan.');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function buildMasterPrompt(input: PromptGeneratorInput, variationSeed = 0): string {
  const materiAktif = resolveMateriLabel(input);
  const adaptive = getAdaptiveProfile(input.fase);
  const gameTitle = input.gameSettings.title.trim() || `Petualangan ${materiAktif}`;
  const isAiMotionActive =
    input.aiMotion.enabled || input.mediaGroup === 'AI dan Coding';
  const isSmartQuizActive =
    input.smartQuiz.enabled ||
    input.jenisMedia === 'Quiz Game' ||
    input.jenisMedia === 'Drag and Drop' ||
    input.jenisMedia === 'Puzzle Game';
  const isLocalWisdomActive =
    input.localWisdom.enabled || input.materi === 'Permainan Tradisional';

  const variationAngles = [
    'Pendekatan eksplorasi misi berurutan dengan tantangan gerak individu dan kelompok yang seimbang.',
    'Pendekatan tantangan pos petualangan (station-based challenge) dengan refleksi singkat di setiap akhir ronde.',
    'Pendekatan kolaborasi tim lintas peran sehingga setiap siswa berkontribusi aktif sesuai kemampuan motoriknya.',
  ];
  const selectedVariation = variationAngles[variationSeed % variationAngles.length];

  const controlButtons: string[] = [];
  if (input.gameSettings.hasStartButton) controlButtons.push('Tombol Mulai');
  if (input.gameSettings.hasPauseButton) controlButtons.push('Tombol Jeda');
  if (input.gameSettings.hasRestartButton) controlButtons.push('Tombol Ulangi');

  const berkesadaranList =
    input.deepLearning.berkesadaran.length > 0
      ? input.deepLearning.berkesadaran
      : [...DEEP_LEARNING_PILLARS.berkesadaran];
  const bermaknaList =
    input.deepLearning.bermakna.length > 0
      ? input.deepLearning.bermakna
      : [...DEEP_LEARNING_PILLARS.bermakna];
  const menggembirakanList =
    input.deepLearning.menggembirakan.length > 0
      ? input.deepLearning.menggembirakan
      : [...DEEP_LEARNING_PILLARS.menggembirakan];

  const aiMotionSection = isAiMotionActive
    ? `
### Modul Khusus AI Motion Detection
- **Teknologi Deteksi**: ${input.aiMotion.technology} (berjalan langsung di browser klien).
- **Aktivitas Gerakan Utama**: ${input.aiMotion.activity}.
- **Alur Sistem Deteksi**:
  ${input.aiMotion.cameraPermissionRequired ? '- Meminta izin kamera secara eksplisit dari pengguna sebelum stream kamera diaktifkan.' : '- Aktivasi kamera harus didahului dialog persetujuan pengguna.'}
  ${input.aiMotion.detectPose ? '- Kamera mendeteksi titik pose tubuh (pose landmark) secara lokal di perangkat.' : ''}
  ${input.aiMotion.giveInstructions ? '- Sistem menampilkan dan membacakan instruksi gerakan bertahap sebelum hitungan dimulai.' : ''}
  ${input.aiMotion.studentFollows ? '- Siswa mengikuti peragaan gerakan di depan layar dengan ruang gerak yang aman.' : ''}
  ${input.aiMotion.movementFeedback ? '- Sistem memberikan umpan balik visual & teks sesuai pose yang terbaca (misal: "Angkat tangan lebih tinggi" atau "Bagus, pertahankan keseimbangan!").' : ''}
  ${input.aiMotion.showScore ? '- Sistem mencatat progres pengulangan gerak dan lencana pencapaian.' : ''}
- **Ketentuan Wajib Privasi & Keamanan AI Motion**:
  1. Kamera HANYA aktif setelah memperoleh izin eksplisit pengguna (guru/wali/siswa) melalui tombol konfirmasi.
  2. Wajib menyediakan **Mode Alternatif Tanpa Kamera** (kontrol tombol layar, keyboard, atau mode simulasi guru) agar tetap berfungsi di perangkat tanpa webcam atau ketika kamera tidak diizinkan.
  3. Dilarang merekam atau menyimpan file video/foto siswa secara otomatis ke server maupun penyimpanan lokal.
  4. Dilarang mengklaim akurasi deteksi gerakan 100% sempurna; sertakan pesan bahwa deteksi bersifat pendamping latihan yang dipandu guru.
  5. Sediakan variasi gerakan alternatif yang aman dan inklusif untuk berbagai kondisi fisik siswa.`
    : '';

  const smartQuizSection = isSmartQuizActive
    ? `
### Modul Khusus Smart Quiz PJOK
- **Jenis Kuis Interaktif**: ${input.smartQuiz.quizType}.
- **Jumlah Soal & Level**: ${input.smartQuiz.questionCount} soal dengan tingkat kesulitan ${input.smartQuiz.difficulty} (disesuaikan dengan Kelas ${input.kelas} SD / ${adaptive.faseLabel}).
- **Pengaturan Waktu**: ${input.smartQuiz.hasTimer ? `Timer opsional aktif (${input.smartQuiz.timerPerQuestionSeconds} detik per soal, dapat dijeda guru).` : 'Tanpa batas waktu per soal agar siswa dapat berpikir tenang.'}
- **Fitur Otomatis Kuis**:
  - Soal kontekstual berbasis situasi nyata pembelajaran ${materiAktif}.
  ${input.smartQuiz.autoAnswer ? '- Validasi jawaban otomatis seketika setelah siswa memilih/menyusun jawaban.' : ''}
  ${input.smartQuiz.autoScore ? '- Perhitungan skor otomatis yang transparan.' : ''}
  ${input.smartQuiz.showExplanation ? '- Pembahasan edukatif singkat di setiap soal untuk memperkuat konsep PJOK.' : ''}
  ${input.smartQuiz.positiveFeedback ? '- Umpan balik positif yang memotivasi baik saat jawaban benar maupun saat perlu mencoba lagi.' : ''}
  ${input.smartQuiz.showEvaluationResult ? '- Ringkasan hasil evaluasi akhir beserta rekomendasi penguatan materi untuk guru dan siswa.' : ''}`
    : '';

  const localWisdomSection = isLocalWisdomActive
    ? `
### Modul Khusus Kearifan Lokal (Local Wisdom Game)
- **Permainan Tradisional**: ${input.localWisdom.traditionalGame}.
- **Asal / Konteks Daerah**: ${input.localWisdom.regionName}.
- **Nilai Karakter Budaya**: ${input.localWisdom.characterValues}.
- **Komponen Cerita & Budaya**:
  ${input.localWisdom.includeStory ? '- Alur cerita pembuka yang mengenalkan latar permainan rakyat secara ramah anak.' : ''}
  ${input.localWisdom.includeLocalCharacters ? `- Karakter lokal dengan busana/atribut sopan yang terinspirasi budaya ${input.localWisdom.regionName}.` : ''}
  ${input.localWisdom.includeRulesAndMission ? '- Aturan permainan tradisional yang diadaptasi ke mekanik game digital & aktivitas lapangan SD.' : ''}
  ${input.localWisdom.includeGroupChallenge ? '- Tantangan kelompok untuk menumbuhkan kekompakan, musyawarah, dan kejujuran.' : ''}
- **Ketentuan Akurasi Budaya (Wajib)**: Jangan mengarang fakta sejarah, istilah daerah, atau asal-usul budaya secara fiktif. Setiap informasi lokal spesifik daerah ${input.localWisdom.regionName} yang belum terverifikasi oleh sumber resmi wajib diberi tanda **[Perlu Verifikasi Guru]** di dalam teks materi maupun catatan guru.`
    : '';

  return `# MASTER PROMPT PENGEMBANGAN MEDIA PEMBELAJARAN PJOK SD

## 1. Peran AI (Role & Persona)
Bertindaklah sebagai **Senior Educational Game Developer**, **UI/UX Designer EdTech Ramah Anak**, sekaligus **Ahli Media Pembelajaran Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK) Sekolah Dasar (Kurikulum Merdeka Indonesia)**. Kamu ahli merancang aplikasi web interaktif berbasis HTML5, CSS3, dan JavaScript yang aman secara fisik, inklusif, bermakna, menyenangkan, dan siap langsung digunakan oleh guru SD di kelas maupun lapangan.

## 2. Identitas Pembelajaran
- **Judul Media / Game**: ${gameTitle}
- **Jenjang Pendidikan**: ${input.jenjang} (Sekolah Dasar)
- **Kelas / Fase**: Kelas ${input.kelas} SD · ${adaptive.faseLabel}
- **Semester**: ${input.semester}
- **Materi Pokok PJOK**: ${materiAktif}
- **Alokasi Waktu Pembelajaran**: ${input.alokasiWaktu}
- **Pendekatan Pedagogis Utama**: ${input.deepLearning.pedagogicalApproach}
- **Desain Variasi Pembelajaran**: ${selectedVariation}

## 3. Target Pengguna
- **Peserta Didik**: ${input.jumlahPesertaDidik} kelas ${input.kelas} SD (rentang usia ${adaptive.ageRange}).
- **Karakteristik Peserta Didik**: ${input.karakteristikPesertaDidik}
- **Peran Guru**: Guru PJOK sebagai fasilitator utama yang mengoperasikan mode demonstrasi/kelas, memantau keselamatan gerak, dan memandu refleksi akhir.

## 4. Tujuan Pembelajaran
Media/game harus membantu peserta didik mencapai tujuan pembelajaran berikut secara terukur:
> ${input.tujuanPembelajaran}

## 5. Materi Pembelajaran
- Susun konten materi **${materiAktif}** yang akurat secara pedagogis untuk Kelas ${input.kelas} SD (${adaptive.faseLabel}).
- Pecah materi menjadi konsep inti yang mudah dipahami siswa: pengertian sederhana, teknik/posisi tubuh yang aman, contoh penerapan gerak dalam kehidupan sehari-hari, serta kesalahan umum yang perlu dihindari tanpa membuat siswa merasa gagal.
- Sediakan bagian pemanasan singkat (3–5 menit) sebelum inti aktivitas dan pendinginan/refleksi setelah aktivitas selesai.

## 6. Konsep Media
- **Kategori Media**: ${input.mediaGroup}
- **Jenis Media Spesifik**: ${input.jenisMedia}
- **Tema Utama**: ${input.gameSettings.theme} (${input.visualDesign.visualTheme})
- **Gaya Visual**: ${input.visualDesign.visualStyle}
- **Konsep Inti**: Menggabungkan pemahaman konsep **${materiAktif}** dengan aksi nyata peserta didik melalui ${input.jenisMedia} berjumlah ${input.gameSettings.levelCount} level (${input.gameSettings.difficulty}).
${aiMotionSection}${smartQuizSection}${localWisdomSection}

## 7. Cerita Permainan (Narrative & Worldbuilding)
- **Karakter Utama**: ${input.gameSettings.mainCharacter}.
- **Misi Utama**: ${input.gameSettings.mission}
- **Alur Narasi**: Siswa diajak masuk ke dunia **${input.visualDesign.visualTheme}** bersama ${input.gameSettings.mainCharacter} untuk menaklukkan ${input.gameSettings.levelCount} pos tantangan bertahap pada materi **${materiAktif}**. Setiap tantangan yang selesai membuka bagian peta petualangan berikutnya hingga misi utama berhasil dituntaskan bersama teman sekelas.

## 8. Alur Penggunaan (User Flow)
Rancang alur penggunaan yang jelas dari awal hingga akhir sesi pembelajaran (${input.alokasiWaktu}):
1. **Layar Pembuka (Welcome & Safety Briefing)**: Menampilkan judul "${gameTitle}", pilihan nama/kelompok siswa, pengingat pemanasan dan area aman, serta tombol **Mulai**.
2. **Tahap Persiapan & Tujuan (Berkesadaran)**: Menyampaikan tujuan belajar hari ini dengan bahasa ramah anak dan cek kesiapan fisik siswa.
3. **Inti Interaksi (${input.gameSettings.levelCount} Level / Ronde)**: Siswa menjalani tantangan ${input.jenisMedia} secara bertahap dengan instruksi jelas, indikator progres, serta kontrol **Jeda** dan **Ulangi**.
4. **Refleksi & Evaluasi Bermakna**: Menampilkan ringkasan capaian, refleksi perasaan/manfaat olahraga, serta pertanyaan pemantik untuk diskusi singkat bersama guru.
5. **Layar Penutup & Apresiasi**: Memberikan reward positif dan tombol main ulang atau ganti mode kelompok.

## 9. Desain UI/UX
- **Arah Desain**: Antarmuka modern, bersih, ramah anak SD dengan dominasi warna biru cerah, hijau segar, putih bersih, dan aksen oranye energik.
- **Tipografi & Keterbacaan**: Gunakan font sans-serif yang jelas (seperti Poppins / Nunito), kontras teks memenuhi standar WCAG AA, dan hindari teks terlalu padat dalam satu layar.
- **Kontrol Navigasi**: Sediakan ${controlButtons.length > 0 ? controlButtons.join(', ') : 'Tombol Mulai, Jeda, dan Ulangi'} dengan ukuran tombol responsif minimal 44x44 px untuk sentuhan jari di tablet/smartphone maupun klik mouse di proyektor kelas.
- **Responsivitas**: Tata letak wajib adaptif pada layar desktop/proyektor sekolah, tablet, dan smartphone tanpa pergeseran horizontal.

## 10. Karakter dan Ilustrasi
- **Gaya Ilustrasi**: ${input.visualDesign.visualStyle} bertema **${input.visualDesign.visualTheme}**.
- **Desain Karakter**: Gambarkan ${input.gameSettings.mainCharacter} menggunakan pakaian olahraga yang rapi, sopan, dan proporsional bagi anak SD Indonesia, dengan ekspresi ceria, antusias, dan sportif.
- **Aset Visual Mandiri**: Gunakan ilustrasi SVG vektor kustom atau elemen Canvas 2D yang tajam dan ringan agar aplikasi berjalan lancar secara offline tanpa bergantung pada gambar eksternal yang berisiko gagal muat.

## 11. Mekanisme Permainan
- **Struktur Level**: ${input.gameSettings.levelCount} level progresif dengan tingkat kesulitan **${input.gameSettings.difficulty}**.
- **Aturan Main**:
  - Setiap level memiliki target misi yang jelas dan batas upaya yang aman (tidak memaksakan kecepatan ekstrem).
  - ${input.gameSettings.hasTimer ? `Dilengkapi timer permainan (${input.gameSettings.timerMinutes} menit / dapat dijeda guru) untuk menjaga ritme pembelajaran.` : 'Berbasis ketuntasan misi tanpa tekanan waktu agar siswa fokus pada kualitas gerak.'}
  - Mendukung mode permainan individu maupun mode tantangan kelompok/bergantian di depan kelas (${input.jumlahPesertaDidik}).

## 12. Fitur Interaktif
- Kontrol utama aktif: ${controlButtons.join(', ')}.
- ${input.gameSettings.hasAudio ? 'Efek suara & panduan audio ramah anak dengan tombol Mute/Unmute yang mudah diakses.' : 'Mode visual tenang tanpa efek suara otomatis (dapat ditambahkan indikator visual).'}
- ${input.gameSettings.hasAnimation ? 'Animasi transisi ringan yang halus (menghormati preferensi reduced-motion).' : 'Transisi instan bebas animasi berlebih untuk fokus maksimal.'}
- ${input.gameSettings.hasLeaderboard ? 'Papan apresiasi kelompok / pencapaian kelas yang menonjolkan sportivitas dan kemajuan diri.' : 'Ringkasan pencapaian pribadi tanpa papan peringkat kompetitif.'}
- Mode Guru (Teacher Quick Panel) untuk melompati level saat demonstrasi atau mengatur ulang sesi dengan cepat.

## 13. Sistem Penilaian
- **Mekanisme Skor**: ${input.gameSettings.scoringSystem}
- **Bentuk Reward**: ${input.gameSettings.rewardSystem}
- **Aspek Penilaian Holistik PJOK**: Tidak hanya menilai skor ketepatan digital, tetapi juga menyertakan rubrik observasi singkat bagi guru untuk menilai sikap sportif, kerja sama, dan kepatuhan keselamatan gerak.

## 14. Feedback Otomatis
- **Karakteristik Feedback**: ${input.gameSettings.feedbackStyle}
- Berikan umpan balik visual dan teks secara langsung setiap kali siswa menyelesaikan aksi atau menjawab tantangan.
- Pada jawaban/gerakan yang belum tepat, tampilkan petunjuk perbaikan yang membimbing dan penuh empati (bukan pesan kesalahan yang menjatuhkan semangat siswa).

## 15. Integrasi Pembelajaran Mendalam (Deep Learning)
Pastikan ketiga prinsip Pembelajaran Mendalam berikut terwujud nyata dalam alur aplikasi dan diimplementasikan dengan pendekatan **${input.deepLearning.pedagogicalApproach}**:
- **Berkesadaran**:
${berkesadaranList.map((item) => `  - ${item}.`).join('\n')}
- **Bermakna**:
${bermaknaList.map((item) => `  - ${item}.`).join('\n')}
- **Menggembirakan**:
${menggembirakanList.map((item) => `  - ${item}.`).join('\n')}

## 16. Adaptasi Tingkat Kesulitan (Adaptive Learning — ${adaptive.faseLabel})
Sesuaikan pengalaman aplikasi secara khusus untuk usia **${adaptive.ageRange}**:
- **Gaya Instruksi**: ${adaptive.instructionStyle}
- **Ketentuan Antarmuka**:
${adaptive.uiGuidelines.map((item) => `  - ${item}`).join('\n')}
- **Pacing & Kompleksitas Tantangan**:
${adaptive.pacingAndChallenge.map((item) => `  - ${item}`).join('\n')}
- **Pola Apresiasi**: ${adaptive.recommendedFeedback}

## 17. Diferensiasi dan Inklusivitas
- **Catatan Kebutuhan Khusus & Inklusivitas**: ${input.catatanInklusif}
- Sediakan opsi tingkat tantangan (Dasar / Reguler / Pengayaan) sehingga siswa dengan kemampuan motorik berbeda tetap merasa berhasil.
- Sediakan mode dukungan aksesibilitas: ukuran teks terbaca jelas, ikon selalu berpasangan dengan label teks (tidak mengandalkan warna semata), serta alternatif tugas gerak aman untuk siswa yang memiliki keterbatasan fisik sementara maupun permanen.

## 18. Petunjuk Penggunaan
Sertakan panel atau modal **"Panduan Guru & Siswa"** di dalam aplikasi yang berisi:
1. Langkah persiapan alat/ruang sebelum membuka aplikasi di kelas atau lapangan.
2. Cara memainkan game dalam mode individu, berpasangan, atau proyektor kelas.
3. Pertanyaan pemantik diskusi refleksi setelah permainan selesai.

## 19. Ketentuan Keselamatan Aktivitas Fisik
- Wajib menampilkan **Checklist Keselamatan Sebelum Bergerak**: pastikan lantai/lapangan tidak licin, bebas benda tajam/penghalang, jarak antar siswa aman minimal 1,5 meter, menggunakan pakaian/sepatu olahraga yang sesuai, serta melakukan pemanasan terlebih dahulu.
- Sertakan tombol pengingat istirahat/minum air putih di antara sesi aktivitas berintensitas sedang-tinggi.
- Tegaskan bahwa siswa dapat berhenti atau memilih gerakan alternatif kapan saja jika merasa lelah, pusing, atau tidak nyaman.
${isAiMotionActive ? '- Patuhi etika privasi kamera: tidak merekam video siswa, wajib meminta izin, dan menyediakan mode tanpa kamera.' : ''}
${isLocalWisdomActive ? `- Tandai informasi budaya lokal spesifik daerah ${input.localWisdom.regionName} yang belum diverifikasi dengan label [Perlu Verifikasi Guru].` : ''}

## 20. Spesifikasi Teknis HTML, CSS, dan JavaScript
Bangun seluruh media pembelajaran ini dengan spesifikasi teknis berikut agar andal, ringan, dan siap pakai di sekolah:
- **Arsitektur File**: Aplikasi web front-end lengkap dalam **satu file HTML5 mandiri** (embedded CSS3 dan Vanilla JavaScript ES6+) yang dapat langsung dibuka di browser modern tanpa perlu server, login, atau instalasi tambahan.
- **Styling & Layout**: Gunakan CSS Grid dan Flexbox modern dengan variabel warna (:root) untuk konsistensi tema, sudut membulat yang ramah anak, serta media query responsif untuk desktop, tablet, dan smartphone.
- **State & Penyimpanan Lokal**: Kelola state permainan (level aktif, skor, progres misi, mode suara, dan preferensi aksesibilitas) secara terstruktur di JavaScript dan simpan progres terbaik secara opsional di \`localStorage\` tanpa menyimpan data pribadi sensitif siswa.
- **Kualitas Kode**: Pastikan tidak ada error pada console browser, setiap tombol memiliki event listener yang bekerja nyata, elemen interaktif memiliki atribut aksesibilitas (\`aria-label\`, fokus keyboard jelas), dan seluruh teks antarmuka menggunakan Bahasa Indonesia yang baku namun ramah untuk siswa Kelas ${input.kelas} SD.`;
}

const IDEA_PREFIXES = [
  'Petualangan',
  'Misi Jawara',
  'Ekspedisi',
  'Arena Ceria',
  'Jelajah',
  'Tantangan',
];

const IDEA_SUFFIXES = [
  'Nusantara',
  'Sekolah Sehat',
  'Juara Muda',
  'Sahabat Gerak',
  'Energi Positif',
  'Generasi Bugar',
];

export function generateRandomIdea(
  filters: RandomIdeaFilters,
  seed = Math.floor(Math.random() * 10000)
): RandomIdeaResult {
  const kelasPool: KelasLevel[] =
    filters.kelas === 'Semua' ? [1, 2, 3, 4, 5, 6] : [filters.kelas];
  const appliedKelas = kelasPool[seed % kelasPool.length];
  const fase = getFaseFromKelas(appliedKelas);

  const materiPool =
    filters.materi === 'Semua'
      ? MATERI_OPTIONS.filter((m) => m !== 'Materi lainnya')
      : [filters.materi];
  const appliedMateri = materiPool[(seed + 3) % materiPool.length];

  const allMedia = (
    Object.entries(MEDIA_GROUPS) as [MediaCategoryGroup, string[]][]
  ).flatMap(([group, items]) => items.map((label) => ({ group, label })));

  const mediaPool =
    filters.jenisGame === 'Semua'
      ? allMedia
      : allMedia.filter((m) => m.label === filters.jenisGame || m.group === filters.jenisGame);
  const pickedMedia =
    mediaPool.length > 0 ? mediaPool[(seed + 7) % mediaPool.length] : allMedia[0];

  const themePool =
    filters.temaVisual === 'Semua' ? [...VISUAL_THEMES] : [filters.temaVisual];
  const appliedVisualTheme = themePool[(seed + 5) % themePool.length];
  const appliedVisualStyle = VISUAL_DESIGN_STYLES[(seed + 2) % VISUAL_DESIGN_STYLES.length];

  const prefix = IDEA_PREFIXES[seed % IDEA_PREFIXES.length];
  const suffix = IDEA_SUFFIXES[(seed + 1) % IDEA_SUFFIXES.length];
  const gameName = `${prefix} ${appliedMateri} ${suffix}`;

  const adaptive = getAdaptiveProfile(fase);
  const featuredCapabilities: string[] = [
    `Adaptasi ${adaptive.faseLabel}`,
    'Integrasi Pembelajaran Mendalam (Berkesadaran, Bermakna, Menggembirakan)',
  ];

  if (pickedMedia.group === 'AI dan Coding') {
    featuredCapabilities.push('AI Motion Detection (MediaPipe / MoveNet) + Mode Tanpa Kamera');
  } else if (appliedMateri === 'Permainan Tradisional') {
    featuredCapabilities.push('Kearifan Lokal Nusantara & Nilai Gotong Royong');
  } else {
    featuredCapabilities.push('Smart Quiz Refleksi & Apresiasi Sportivitas');
  }

  return {
    gameName,
    description: `Media ${pickedMedia.label} bertema ${appliedVisualTheme} untuk melatih ${appliedMateri} siswa Kelas ${appliedKelas} SD melalui tantangan bertahap yang aman dan kolaboratif.`,
    concept: `Siswa berperan sebagai penjelajah ${appliedVisualTheme} yang menyelesaikan pos aktivitas ${appliedMateri}. Setiap pos menggabungkan demonstrasi gerak aman, mini-tantangan interaktif berbasis ${pickedMedia.label}, serta refleksi singkat tentang manfaat kesehatan tubuh.`,
    learningObjective: `Peserta didik Kelas ${appliedKelas} SD mampu memahami konsep, mempraktikkan variasi gerak dasar pada materi ${appliedMateri} secara aman dan benar, serta menunjukkan sikap sportif dan kerja sama selama permainan berlangsung.`,
    featuredCapabilities,
    appliedKelas,
    appliedMateri,
    appliedMedia: pickedMedia.label,
    appliedMediaGroup: pickedMedia.group,
    appliedVisualTheme,
    appliedVisualStyle,
  };
}
