import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import langEn from './lang.en.json';
import langKo from './lang.ko.json';
import langJp from './lang.jp.json';

const resource = {
  'en-US': {
    translation: langEn,
  },
  'ko-KR': {
    translation: langKo,
  },
  'jp-JP': {
    translation: langJp,
  },
};

i18n.use(initReactI18next).init({
  resources: resource,
  // 초기 설정 언어
  lng: 'ko-KR',
  fallbackLng: {
    'jp-JP': ['jp-JP'],
    'en-US': ['en-US'],
    default: ['ko-KR'],
  },
  debug: true,
  defaultNS: 'translation',
  ns: 'translation',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
