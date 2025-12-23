import { createI18n, useI18n as useVueI18n } from "vue-i18n";

import en from "./en";
import ja from "./ja";

const messages = {
  en,
  ja,
};

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages,
});

// Helper to change language
export function changeLanguage(locale: "en" | "ja") {
  i18n.global.locale.value = locale;
}

// Helper to use namespace
export function useI18nNamespace(namespace: string) {
  const { t } = useVueI18n();
  return (key: string, params?: Record<string, unknown>) => {
    return t(`${namespace}.${key}`, params || {});
  };
}
