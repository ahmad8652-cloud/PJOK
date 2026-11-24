import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildMasterPrompt,
  createDefaultInput,
  generateRandomIdea,
  getAdaptiveProfile,
  getFaseFromKelas,
  validateGeneratorInput,
} from './promptEngine';
import { INSPIRATION_TEMPLATES } from '../data/inspirations';
import { INSPIRATION_CATEGORIES } from '../data/catalog';

test('getFaseFromKelas maps SD classes 1-6 to Fase A, B, C accurately', () => {
  assert.equal(getFaseFromKelas(1), 'A');
  assert.equal(getFaseFromKelas(2), 'A');
  assert.equal(getFaseFromKelas(3), 'B');
  assert.equal(getFaseFromKelas(4), 'B');
  assert.equal(getFaseFromKelas(5), 'C');
  assert.equal(getFaseFromKelas(6), 'C');
});

test('getAdaptiveProfile returns distinct pedagogy per Fase', () => {
  const faseA = getAdaptiveProfile('A');
  const faseB = getAdaptiveProfile('B');
  const faseC = getAdaptiveProfile('C');

  assert.match(faseA.instructionStyle, /sederhana/i);
  assert.match(faseB.pacingAndChallenge.join(' '), /kombinasi/i);
  assert.match(faseC.pacingAndChallenge.join(' '), /strategi/i);
});

test('validateGeneratorInput catches empty required fields without silent bypass', () => {
  const invalid = createDefaultInput();
  invalid.tujuanPembelajaran = '   ';
  invalid.materi = 'Materi lainnya';
  invalid.customMateri = '';

  const res = validateGeneratorInput(invalid);
  assert.equal(res.valid, false);
  assert.ok(res.errors.length >= 2);
});

test('buildMasterPrompt includes all 20 required sections and special module guardrails', () => {
  const input = createDefaultInput();
  input.kelas = 5;
  input.fase = 'C';
  input.materi = 'Materi lainnya';
  input.customMateri = 'Renang Gaya Dada Dasar';
  input.aiMotion.enabled = true;
  input.localWisdom.enabled = true;
  input.localWisdom.regionName = 'Gresik, Jawa Timur';

  const output = buildMasterPrompt(input, 1);

  for (let i = 1; i <= 20; i += 1) {
    assert.ok(
      output.includes(`## ${i}.`),
      `Expected Master Prompt to include section ## ${i}.`
    );
  }

  assert.ok(output.includes('Renang Gaya Dada Dasar'));
  assert.ok(output.includes('Mode Alternatif Tanpa Kamera'));
  assert.ok(output.includes('[Perlu Verifikasi Guru]'));
  assert.ok(output.includes('Berkesadaran'));
  assert.ok(output.includes('Bermakna'));
  assert.ok(output.includes('Menggembirakan'));
});

test('generateRandomIdea respects filters and yields complete idea fields', () => {
  const idea = generateRandomIdea(
    {
      kelas: 3,
      materi: 'Atletik',
      jenisGame: 'Platformer Game',
      temaVisual: 'Stadion Mini',
    },
    42
  );

  assert.equal(idea.appliedKelas, 3);
  assert.equal(idea.appliedMateri, 'Atletik');
  assert.equal(idea.appliedMedia, 'Platformer Game');
  assert.equal(idea.appliedVisualTheme, 'Stadion Mini');
  assert.ok(idea.gameName.length > 5);
  assert.ok(idea.featuredCapabilities.length >= 2);
});

test('INSPIRATION_TEMPLATES includes at least 20 core templates and covers all 14 categories', () => {
  assert.ok(INSPIRATION_TEMPLATES.length >= 20);
  const coreCount = INSPIRATION_TEMPLATES.filter((t) => t.isCoreTemplate).length;
  assert.equal(coreCount, 20);

  const presentCategories = new Set(INSPIRATION_TEMPLATES.map((t) => t.category));
  for (const cat of INSPIRATION_CATEGORIES) {
    assert.ok(
      presentCategories.has(cat),
      `Expected at least one template for category: ${cat}`
    );
  }
});
