import { type DefaultError, MutationCache, QueryCache, QueryClient } from "@tanstack/vue-query";
import axios from "axios";

import { getRouterWithLocale } from "@/composables/useRouteWithLocale";
import { i18n } from "@/locales";
import { useAlertStore } from "@/stores/alert.store";

const handleGlobalError = (error: DefaultError) => {
  if (!axios.isAxiosError(error) || !error.response?.status) {
    return;
  }

  const { status } = error.response;

  if (status >= 500 && status < 600) {
    const alertStore = useAlertStore();
    const t = i18n.global.t;

    alertStore.handleUpdateInfo({
      variant: "error",
      title: t("errors.E0000"),
      description: t("errors.E0000_DESCRIPTION"),
    });
    alertStore.handleShowAlert(true);
    return;
  }

  if (status === 400) {
    // TODO: maybe show some error special, which is not mapping to the form
    return;
  }

  switch (status) {
    case 401: {
      // Redirect to login page with current locale
      const router = getRouterWithLocale();
      router.push("/login");
      break;
    }
    case 403:
      // TODO: show error or redirect to access denied page
      break;
    case 404:
      // TODO: show error or redirect to not found page, etc
      break;
    default:
      break;
  }
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,
      retry: 3,
      retryDelay: 1000,
      refetchOnWindowFocus: false,
      retryOnMount: false,
      refetchOnMount: true,
    },
  },
  queryCache: new QueryCache({
    onError: handleGlobalError,
  }),
  mutationCache: new MutationCache({
    onError: handleGlobalError,
  }),
});
