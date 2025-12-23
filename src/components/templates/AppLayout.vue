<script setup lang="ts">
import { RouterView } from "vue-router";

import Navbar from "@/components/organisms/headers/Navbar.vue";
import SubHeader from "@/components/organisms/headers/SubHeader.vue";
import { useLocaleSync } from "@/composables/useLocaleSync";

// Sync locale with route params
useLocaleSync();
</script>

<template>
  <div class="min-h-screen bg-background">
    <Navbar />
    <SubHeader />
    <main class="px-4">
      <RouterView />
    </main>
  </div>
</template>
