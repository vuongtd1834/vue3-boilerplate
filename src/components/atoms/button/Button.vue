<script lang="ts">
/**
 * Common Button Component
 *
 * @description
 * A common button component that can be used to create buttons in the application.
 *
 * @example
 * ```vue
 * <Button>Click me</Button>
 * ```
 *
 * @component
 * @since 1.0.0
 */
</script>

<script setup lang="ts">
import { Loader } from "lucide-vue-next";

import { cn } from "@/utils/helpers";

import { buttonVariants } from "./variants";

export type Props = {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "success"
    | "warning"
    | "error"
    | "info";
  size?: "default" | "sm" | "lg" | "icon" | "auto";
  isLoading?: boolean;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

withDefaults(defineProps<Props>(), {
  variant: "default",
  size: "default",
  disabled: false,
  isLoading: false,
  className: "",
  type: "button",
});
</script>

<template>
  <button :class="cn(buttonVariants({ variant, size, className }))" :disabled="disabled" :type="type">
    <template v-if="isLoading">
      <Loader class="animate-spin" />
    </template>
    <slot />
  </button>
</template>
