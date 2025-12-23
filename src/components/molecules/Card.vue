<script setup lang="ts">
interface Props {
  title?: string;
}

defineProps<Props>();
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h3 v-if="title" class="text-xl font-semibold mb-4">
      {{ title }}
    </h3>
    <slot />
  </div>
</template>
