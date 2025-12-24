import { computed } from "vue";
import { type RouteLocationRaw, useRoute, useRouter } from "vue-router";

import { i18n } from "@/locales";
import router from "@/router";

/**
 * Composable to extend vue-router with automatic locale prefix
 * Automatically adds current locale to routes
 *
 * @example
 * ```ts
 * const router = useRouteWithLocale();
 * router.push('/login'); // Will navigate to '/en/login' or '/ja/login' based on current locale
 * router.push({ name: 'home' }); // Will navigate with locale prefix
 * ```
 */
export function useRouteWithLocale() {
  const router = useRouter();
  const route = useRoute();

  const currentLocale = computed(() => {
    return i18n.global.locale.value || "en";
  });

  /**
   * Add locale prefix to a route path
   */
  const addLocalePrefix = (path: string): string => {
    // If path already starts with locale, return as is
    if (path.startsWith("/en/") || path.startsWith("/ja/")) {
      return path;
    }

    // If path is just "/", return with locale
    if (path === "/") {
      return `/${currentLocale.value}`;
    }

    // Add locale prefix
    return `/${currentLocale.value}${path.startsWith("/") ? path : `/${path}`}`;
  };

  /**
   * Process RouteLocationRaw to add locale prefix
   */
  const processRoute = (to: RouteLocationRaw): RouteLocationRaw => {
    if (typeof to === "string") {
      return addLocalePrefix(to);
    }

    if (typeof to === "object" && to !== null) {
      // If path is provided, add locale prefix
      if ("path" in to && typeof to.path === "string") {
        return {
          ...to,
          path: addLocalePrefix(to.path),
        };
      }

      // If name is provided, keep it as is (router will handle locale via route config)
      // But we can also add path if needed
      return to;
    }

    return to;
  };

  return {
    ...router,
    /**
     * Push a new route with automatic locale prefix
     */
    push: (to: RouteLocationRaw) => {
      return router.push(processRoute(to));
    },
    /**
     * Replace current route with automatic locale prefix
     */
    replace: (to: RouteLocationRaw) => {
      return router.replace(processRoute(to));
    },
    /**
     * Get current locale
     */
    currentLocale,
    /**
     * Get current route (from useRoute)
     */
    route,
  };
}

/**
 * Helper function to get router with locale support outside of component context
 * Use this when you need to navigate outside of component setup
 *
 * @example
 * ```ts
 * const router = getRouterWithLocale();
 * router.push('/login'); // Will navigate to '/en/login' or '/ja/login'
 * ```
 */
export function getRouterWithLocale() {
  const currentLocale = i18n.global.locale.value || "en";

  /**
   * Add locale prefix to a route path
   */
  const addLocalePrefix = (path: string): string => {
    // If path already starts with locale, return as is
    if (path.startsWith("/en/") || path.startsWith("/ja/")) {
      return path;
    }

    // If path is just "/", return with locale
    if (path === "/") {
      return `/${currentLocale}`;
    }

    // Add locale prefix
    return `/${currentLocale}${path.startsWith("/") ? path : `/${path}`}`;
  };

  return {
    push: (to: string | RouteLocationRaw) => {
      if (typeof to === "string") {
        return router.push(addLocalePrefix(to));
      }
      if (typeof to === "object" && to !== null && "path" in to && typeof to.path === "string") {
        return router.push({
          ...to,
          path: addLocalePrefix(to.path),
        });
      }
      return router.push(to);
    },
    replace: (to: string | RouteLocationRaw) => {
      if (typeof to === "string") {
        return router.replace(addLocalePrefix(to));
      }
      if (typeof to === "object" && to !== null && "path" in to && typeof to.path === "string") {
        return router.replace({
          ...to,
          path: addLocalePrefix(to.path),
        });
      }
      return router.replace(to);
    },
    currentLocale,
  };
}
