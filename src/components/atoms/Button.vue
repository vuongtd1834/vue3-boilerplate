<script setup lang="ts">
interface Props {
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  variant: "primary",
  disabled: false,
});
</script>

<template>
  <button
    :class="[
      'px-4 py-2 rounded font-medium transition-colors',
      {
        'bg-blue-500 text-white hover:bg-blue-600': variant === 'primary',
        'bg-gray-500 text-white hover:bg-gray-600': variant === 'secondary',
        'bg-red-500 text-white hover:bg-red-600': variant === 'danger',
        'opacity-50 cursor-not-allowed': disabled,
      },
    ]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
