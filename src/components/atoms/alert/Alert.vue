<script setup lang="ts">
import { computed, h, type VNode } from "vue";

import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from "@headlessui/vue";
import { CircleAlert, CircleCheck, Info, TriangleAlert, X } from "lucide-vue-next";

import Button from "@/components/atoms/button/Button.vue";
import { cn } from "@/utils/helpers";

export type Props = {
  variant?: "error" | "warning" | "success" | "info" | "default";
  description?: string | VNode;
  title: string | VNode;
  className?: string;
  open?: boolean;
  onClose?: () => void;
  onOk?: () => void;
  onCancel?: () => void;
  customFooter?: VNode;
  width?: string;
};

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  open: false,
  className: "",
  description: undefined,
  onClose: undefined,
  onOk: undefined,
  onCancel: undefined,
  customFooter: undefined,
  width: undefined,
});

const emit = defineEmits<{
  "update:open": [value: boolean];
  close: [];
}>();

const iconByVariant = {
  error: CircleAlert,
  warning: TriangleAlert,
  success: CircleCheck,
  info: Info,
  default: TriangleAlert,
};

const Icon = computed(() => iconByVariant[props.variant]);

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

const handleClose = () => {
  emit("update:open", false);
  emit("close");
  props.onClose?.();
};

const handleOk = () => {
  props.onOk?.();
  handleClose();
};

const handleCancel = () => {
  props.onCancel?.();
  handleClose();
};

const footer = computed(() => {
  if (props.customFooter) {
    return props.customFooter;
  }

  switch (props.variant) {
    case "error":
      return h(Button, { variant: "error", size: "sm", class: "w-30", onClick: handleOk }, { default: () => "OK" });
    case "warning":
      return h("div", { class: "flex gap-2" }, [
        h(
          Button,
          { variant: "warning", size: "sm", class: "w-30", onClick: handleCancel },
          { default: () => "Cancel" }
        ),
        h(Button, { variant: "default", size: "sm", class: "w-30", onClick: handleOk }, { default: () => "Ok" }),
      ]);
    case "success":
      return h(
        Button,
        { variant: "success", size: "sm", class: "w-30", onClick: handleClose },
        { default: () => "Close" }
      );
    case "info":
      return h(
        Button,
        { variant: "info", size: "sm", class: "w-30", onClick: handleClose },
        { default: () => "Close" }
      );
    default:
      return h(
        Button,
        { variant: "default", size: "sm", class: "w-50", onClick: handleClose },
        { default: () => "Close" }
      );
  }
});
</script>

<template>
  <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-10" @close="handleClose">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
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
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              :class="
                cn(
                  'relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6',
                  className
                )
              "
            >
              <div class="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                <button
                  type="button"
                  class="rounded-md cursor-pointer bg-white text-muted hover:text-muted-foreground focus:outline-2 focus:outline-offset-2 focus:outline-primary"
                  @click="handleClose"
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
                  <component :is="Icon" class="size-6" :class="iconColor[0]" aria-hidden="true" />
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle as="h3" class="text-base font-semibold">
                    <template v-if="typeof title === 'string'">{{ title }}</template>
                    <component :is="title" v-else />
                  </DialogTitle>
                  <div v-if="description" class="mt-2">
                    <p v-if="typeof description === 'string'" class="text-sm text-foreground">
                      {{ description }}
                    </p>
                    <component :is="description" v-else />
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <component :is="footer" />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
