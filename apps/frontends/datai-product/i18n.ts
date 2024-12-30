import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from './locales/en.json';
import zhTranslations from './locales/zh.json';
import frTranslations from './locales/fr.json'; // 新增法语翻译文件
import jaTranslations from './locales/ja.json'; // 新增日语翻译文件

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      zh: { translation: zhTranslations },
      fr: { translation: frTranslations }, // 添加法语资源
      ja: { translation: jaTranslations }, // 添加日语资源
    },
    lng: 'zh', // 默认语言
    fallbackLng: 'zh',
    supportedLngs: ['zh', 'en', 'fr', 'ja'], // 支持的语言列表
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;