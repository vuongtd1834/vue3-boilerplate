<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from "@headlessui/vue";
import { CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-vue-next";

import Button from "@/components/atoms/button/Button.vue";

type Props = {
  variant?: "error" | "warning" | "success" | "info" | "default";
  description: string;
  title: string;
  className: string;
  open?: boolean;
  onClose?: () => void;
  onOk?: () => void;
  onCancel?: () => void;
};

const iconByVariant = {
  error: CircleAlert,
  warning: TriangleAlert,
  success: CircleCheck,
  info: Info,
  default: TriangleAlert,
};

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
});

const Icon = computed(() => iconByVariant[props.variant]);

const footer = computed(() => {
  switch (props.variant) {
    case "error":
      return [h(Button, { variant: "error", size: "sm", onClick: () => (open = false) }, { default: () => "OK" })];
    case "warning":
      return [
        h(Button, { variant: "warning", size: "sm", onClick: () => (open = false) }, { default: () => "Cancel" }),
        h(Button, { variant: "default", size: "sm", onClick: () => (open = false) }, { default: () => "Ok" }),
      ];
    case "success":
      return [h(Button, { variant: "success", size: "sm", onClick: () => (open = false) }, { default: () => "Close" })];
    case "info":
      return [h(Button, { variant: "info", size: "sm", onClick: () => (open = false) }, { default: () => "Close" })];
    default:
      return [h(Button, { variant: "default", size: "sm", onClick: () => (open = false) }, { default: () => "Close" })];
  }
});
const iconColor = computed(() => {
  switch (props.variant) {
    case "error":
      return ["text-error", "bg-error/10"];
    case "warning":
      return ["text-warning", "bg-warning/10"];
    case "success":
      return ["text-success", "bg-success/10"];
    case "info":
      return ["text-info", "bg-info/10"];
    default:
      return ["text-foreground", "bg-foreground/10"];
  }
});
</script>

<template>
  <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-10" @close="open = false">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to=""
        leave="ease-in duration-200"
        leave-from=""
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500/75 transition-opacity"></div>
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to=" translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from=" translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
            >
              <div class="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                <button
                  type="button"
                  class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600"
                  @click="open = false"
                >
                  <span class="sr-only">Close</span>
                  <X class="size-6" aria-hidden="true" />
                </button>
              </div>
              <div class="sm:flex sm:items-start">
                <div
                  class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full sm:mx-0 sm:size-10"
                  :class="iconColor[1]"
                >
                  <Icon class="size-6" :class="iconColor[0]" aria-hidden="true" />
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle as="h3" class="text-base font-semibold">{{ title }}</DialogTitle>
                  <div class="mt-2">
                    <p class="text-sm text-foreground">
                      {{ description }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                {{ footer }}
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
