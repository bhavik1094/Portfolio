import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/common.json';
import hi from './locales/hi/common.json';
import gu from './locales/gu/common.json';
import de from './locales/de/common.json';
import fr from './locales/fr/common.json';
import es from './locales/es/common.json';
import ja from './locales/ja/common.json';

export const supportedLanguages = [
  { value: 'en', label: 'English', nativeLabel: 'English', flag: '🇺🇸', dir: 'ltr' },
  { value: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी', flag: '🇮🇳', dir: 'ltr' },
  { value: 'gu', label: 'Gujarati', nativeLabel: 'ગુજરાતી', flag: '🇮🇳', dir: 'ltr' },
  { value: 'de', label: 'German', nativeLabel: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  { value: 'fr', label: 'French', nativeLabel: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { value: 'es', label: 'Spanish', nativeLabel: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { value: 'ja', label: 'Japanese', nativeLabel: '日本語', flag: '🇯🇵', dir: 'ltr' },
];

const resources = {
  en: { common: en },
  hi: { common: hi },
  gu: { common: gu },
  de: { common: de },
  fr: { common: fr },
  es: { common: es },
  ja: { common: ja },
};

const supportedCodes = supportedLanguages.map((language) => language.value);

const getInitialLanguage = () => {
  const savedLanguage = localStorage.getItem('portfolioLanguage');

  if (savedLanguage && supportedCodes.includes(savedLanguage)) {
    return savedLanguage;
  }

  const browserLanguage = navigator.language?.split('-')[0];
  return supportedCodes.includes(browserLanguage) ? browserLanguage : 'en';
};

const applyDocumentLanguage = (languageCode) => {
  const language = supportedLanguages.find((item) => item.value === languageCode) || supportedLanguages[0];
  document.documentElement.lang = language.value;
  document.documentElement.dir = language.dir;
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: 'en',
    supportedLngs: supportedCodes,
    ns: ['common'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    returnObjects: true,
  });

applyDocumentLanguage(i18n.language);

i18n.on('languageChanged', (languageCode) => {
  localStorage.setItem('portfolioLanguage', languageCode);
  applyDocumentLanguage(languageCode);
});

export default i18n;
