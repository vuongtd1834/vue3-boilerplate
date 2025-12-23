import { watch } from "vue";
import { useRoute } from "vue-router";

import { changeLanguage } from "@/locales";

const supportedLocales = ["en", "ja"] as const;

/**
 * Composable to sync i18n locale with route params
 */
export function useLocaleSync() {
  const route = useRoute();

  watch(
    () => route.params.lang,
    (lang) => {
      if (
        lang &&
        typeof lang === "string" &&
        supportedLocales.includes(lang as "en" | "ja")
      ) {
        changeLanguage(lang as "en" | "ja");
      }
    },
    { immediate: true, flush: "sync" }
  );
}
