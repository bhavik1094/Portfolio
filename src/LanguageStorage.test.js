import { vi } from 'vitest';

let language;

beforeEach(() => {
  vi.resetModules();
  localStorage.clear();
  vi.spyOn(navigator, 'language', 'get').mockReturnValue('fr-FR');
});

afterEach(() => {
  language?.off('languageChanged');
  language = undefined;
  vi.restoreAllMocks();
  document.documentElement.lang = 'en';
});

test('uses the browser language when saved preferences cannot be read', async () => {
  vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
    throw new DOMException('Storage is blocked', 'SecurityError');
  });

  language = (await import('./i18n')).default;

  expect(language.language).toBe('fr');
  expect(document.documentElement).toHaveAttribute('lang', 'fr');
  expect(language.t('nav.about')).toBe('À propos');
});

test('switches content and document language when preferences cannot be saved', async () => {
  language = (await import('./i18n')).default;
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
    throw new DOMException('Storage is blocked', 'SecurityError');
  });

  await expect(language.changeLanguage('ja')).resolves.toBeTypeOf('function');

  expect(language.language).toBe('ja');
  expect(document.documentElement).toHaveAttribute('lang', 'ja');
  expect(document.documentElement).toHaveAttribute('dir', 'ltr');
  expect(language.t('achievements.title')).toBe('実績');
});
