import { computed } from "vue";
import { useRoute as useVueRoute } from "vue-router";

/**
 * Custom route composable that provides locale-aware route
 */
export function useRoute() {
  const route = useVueRoute();

  const locale = computed(() => {
    return (route.params.lang as string) || "en";
  });

  return {
    ...route,
    locale,
  };
}
