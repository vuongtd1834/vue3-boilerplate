<script setup lang="ts">
import { RouterView } from "vue-router";

import Navigation from "@/components/organisms/Navigation.vue";
import { useLocaleSync } from "@/composables/useLocaleSync";

// Sync locale with route params
useLocaleSync();
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Navigation />
    <main>
      <RouterView />
    </main>
  </div>
</template>
