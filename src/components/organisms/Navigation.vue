<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useRouter as useVueRouter } from "vue-router";

import Button from "@/components/atoms/Button.vue";
import { useRoute } from "@/composables/useRoute";
import { useRouter } from "@/composables/useRouter";

const { locale, availableLocales, t } = useI18n();
const route = useRoute();
const router = useRouter();
const vueRouter = useVueRouter();

const switchLocale = (newLocale: string) => {
  // Extract current path without locale
  const currentPath = route.path.replace(`/${route.locale.value}`, "") || "/";
  // Use vue-router directly to avoid double locale prefix
  vueRouter.push(`/${newLocale}${currentPath}`);
};

const navigateTo = (path: string) => {
  router.push(path);
};
</script>

<template>
  <nav class="bg-white shadow-md p-4">
    <div class="container mx-auto flex justify-between items-center">
      <div class="flex gap-4">
        <button
          :class="[
            'px-4 py-2 rounded transition-colors',
            route.name === 'home'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300',
          ]"
          @click="navigateTo('/')"
        >
          {{ t("common.home") }}
        </button>
        <button
          :class="[
            'px-4 py-2 rounded transition-colors',
            route.name === 'about'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300',
          ]"
          @click="navigateTo('/about')"
        >
          About
        </button>
      </div>
      <div class="flex gap-2">
        <Button
          v-for="loc in availableLocales"
          :key="loc"
          :variant="locale === loc ? 'primary' : 'secondary'"
          @click="switchLocale(loc)"
        >
          {{ loc.toUpperCase() }}
        </Button>
      </div>
    </div>
  </nav>
</template>
