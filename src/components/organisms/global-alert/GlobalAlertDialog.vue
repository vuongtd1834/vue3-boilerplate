<script setup lang="ts">
import { computed } from "vue";

import { storeToRefs } from "pinia";

import Alert from "@/components/atoms/alert/Alert.vue";
import { useAlertStore } from "@/stores/alert.store";

const alertStore = useAlertStore();
const { info, showAlert } = storeToRefs(alertStore);
const { handleShowAlert } = alertStore;

const isOpen = computed({
  get: () => showAlert.value,
  set: (value: boolean) => {
    handleShowAlert(value);
  },
});

const handleOk = () => {
  info.value.onOk?.();
  handleShowAlert(false);
};

const handleCancel = () => {
  info.value.onCancel?.();
  handleShowAlert(false);
};

const handleClose = () => {
  info.value.onClose?.();
  handleShowAlert(false);
};
</script>

<template>
  <Alert
    v-model:open="isOpen"
    :title="info.title"
    :description="info.description"
    :variant="info.variant"
    :width="info.width ? String(info.width) : undefined"
    :custom-footer="info.customFooter"
    @close="handleClose"
    @ok="handleOk"
    @cancel="handleCancel"
  />
</template>
