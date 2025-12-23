import { useI18n } from "vue-i18n";
import { useRouter as useVueRouter } from "vue-router";

/**
 * Custom router composable that includes locale in routes
 */
export function useRouter() {
  const router = useVueRouter();
  const { locale } = useI18n();

  const push = (path: string) => {
    const localePath = path.startsWith("/") ? path : `/${path}`;
    router.push(`/${locale.value}${localePath}`);
  };

  const replace = (path: string) => {
    const localePath = path.startsWith("/") ? path : `/${path}`;
    router.replace(`/${locale.value}${localePath}`);
  };

  const resolve = (path: string) => {
    const localePath = path.startsWith("/") ? path : `/${path}`;
    return router.resolve(`/${locale.value}${localePath}`);
  };

  return {
    ...router,
    push,
    replace,
    resolve,
  };
}
